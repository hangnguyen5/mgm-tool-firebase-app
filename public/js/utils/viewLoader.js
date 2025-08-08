// View loader utility
const viewLoader = {
    maxRetries: 2,
    retryDelay: 1000, // 1 second

    async fetchWithRetry(url, retriesLeft = this.maxRetries) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response;
        } catch (error) {
            if (retriesLeft > 0) {
                console.log(`Retrying... ${retriesLeft} attempts left`);
                await new Promise(resolve => setTimeout(resolve, this.retryDelay));
                return this.fetchWithRetry(url, retriesLeft - 1);
            }
            throw error;
        }
    },

    getViewPath(viewId) {
        // In production, we don't need /public/ prefix as it's the root
        const basePath = '/views/';
        // To local testing, you might need to adjust this
        // const basePath = window.location.pathname.includes('/public/') ? 'views/' : '/public/views/';

        // Handle settings sub-views
        if (viewId.startsWith('settings-')) {
            const subView = viewId.replace('settings-', '');
            return `${basePath}settings/${subView}/index.html`;
        }
        return `${basePath}${viewId}/index.html`;
    },

    // Wait for Firebase to be ready (updated for v10 modular)
    async waitForFirebase(timeout = 15000) {
        return new Promise((resolve, reject) => {
            // Check if Firebase v10 modular is ready
            if (window.db && window.firestoreModule && window.firebaseApp) {
                resolve(true);
                return;
            }

            let resolved = false;

            const checkFirebase = (event) => {
                if (resolved) return;
                
                // Check all required Firebase components
                if (window.db && window.firestoreModule && window.firebaseApp) {
                    resolved = true;
                    resolve(true);
                } else if (event?.detail?.error) {
                    resolved = true;
                    reject(new Error(event.detail.error));
                }
            };

            // Listen for firebaseReady event
            window.addEventListener('firebaseReady', checkFirebase, { once: true });

            // Periodic check as fallback with more frequent checks
            let checkCount = 0;
            const maxChecks = Math.floor(timeout / 200);
            
            const periodicCheck = () => {
                if (resolved) return;
                checkCount++;
                
                if (window.db && window.firestoreModule && window.firebaseApp) {
                    resolved = true;
                    window.removeEventListener('firebaseReady', checkFirebase);
                    resolve(true);
                } else if (checkCount < maxChecks) {
                    setTimeout(periodicCheck, 200);
                } else {
                    resolved = true;
                    window.removeEventListener('firebaseReady', checkFirebase);
                    resolve(false);
                }
            };

            // Start periodic check immediately
            setTimeout(periodicCheck, 200);
        });
    },

    async loadView(viewId) {
        const viewContainer = document.getElementById('view-container');
        if (!viewId) {
            console.error('No view ID provided');
            return;
        }

        try {
            console.log(`Loading view: ${viewId}`);
            const viewPath = this.getViewPath(viewId);
            console.log(`Fetching from path: ${viewPath}`);
            
            const response = await this.fetchWithRetry(viewPath);
            if (!response.ok) {
                throw new Error(`Failed to load view: ${response.status} ${response.statusText}`);
            }
            
            const content = await response.text();
            if (!content || content.trim().length === 0) {
                throw new Error('Empty content received');
            }
            
            // Clear and set new content
            viewContainer.innerHTML = content;
            
            // Check if this view needs Firebase (member-directory specifically)
            if (viewId === 'member-directory') {
                console.log('Member Directory view detected, ensuring Firebase is ready...');
                
                // Wait for Firebase before executing scripts
                const firebaseReady = await this.waitForFirebase();
                if (!firebaseReady) {
                    console.warn('Firebase not ready, but proceeding with view load');
                }
            }
            
            // Initialize any scripts in the view
            const scripts = viewContainer.getElementsByTagName('script');
            
            Array.from(scripts).forEach((script, index) => {
                const newScript = document.createElement('script');
                Array.from(script.attributes).forEach(attr => {
                    newScript.setAttribute(attr.name, attr.value);
                });
                newScript.textContent = script.textContent;
                
                script.parentNode.replaceChild(newScript, script);
            });
            
            console.log(`Successfully loaded view: ${viewId}`);
            
            // Dispatch event for successful view load
            window.dispatchEvent(new CustomEvent('viewLoaded', { detail: { viewId } }));
        } catch (error) {
            console.error(`Error loading view ${viewId}:`, error);
            viewContainer.innerHTML = `
                <div class="error-message" style="padding: 20px; color: #721c24; background-color: #f8d7da; border: 1px solid #f5c6cb; border-radius: 4px;">
                    <h2>Error Loading View</h2>
                    <p>Sorry, we couldn't load the requested view. Please try again later.</p>
                    <p>Details: ${error.message}</p>
                    <button onclick="viewLoader.loadView('${viewId}')" 
                            style="margin-top: 10px; padding: 8px 16px; background-color: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer;">
                        Retry
                    </button>
                </div>
            `;
            
            // Dispatch event for failed view load
            window.dispatchEvent(new CustomEvent('viewLoadError', { 
                detail: { viewId, error: error.message } 
            }));
        }
    }
};