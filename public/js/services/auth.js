// Wait for Firebase to be ready, then initialize auth
function initializeAuth() {
    console.log('🔐 Initializing authentication service...');
    
    // Check if Firebase components are available
    if (!window.auth || !window.authModule) {
        console.error('❌ Firebase Auth not available');
        return;
    }

    const auth = window.auth;
    const { 
        onAuthStateChanged, 
        signInWithEmailAndPassword, 
        signInWithPopup,
        GoogleAuthProvider,
        signOut 
    } = window.authModule;

    // DOM Elements - check if they exist
    const loginButton = document.getElementById('login-button');
    const logoutButton = document.getElementById('logout-button');
    const userDisplay = document.getElementById('user-display');
    const loginModal = document.getElementById('login-modal');
    const closeModal = document.querySelector('.close-button');
    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginError = document.getElementById('login-error');
    const googleSigninBtn = document.getElementById('google-signin-btn');
    
    // Validate required elements exist
    if (!loginButton || !logoutButton || !loginModal) {
        console.error('❌ Required DOM elements not found for authentication');
        return;
    }
    
    let currentUser = null;
    
    console.log('✅ Auth DOM elements found, setting up authentication...');
    
    // Debug function to check modal visibility
    function debugModalVisibility() {
        const modal = document.getElementById('login-modal');
        if (modal) {
            const computed = window.getComputedStyle(modal);
            console.log('🐛 Modal Debug:', {
                display: modal.style.display,
                computedDisplay: computed.display,
                zIndex: modal.style.zIndex,
                computedZIndex: computed.zIndex,
                visibility: computed.visibility,
                opacity: computed.opacity,
                transform: computed.transform
            });
        }
    }
    
    // Make debug function available globally
    window.debugModal = debugModalVisibility;
    
    // Create login overlay for login-first functionality
    function createLoginOverlay() {
        console.log('🔧 Creating login overlay...');
        // Remove existing overlay if any
        const existingOverlay = document.getElementById('login-overlay');
        if (existingOverlay) {
            existingOverlay.remove();
        }
        
        const overlay = document.createElement('div');
        overlay.id = 'login-overlay';
        overlay.className = 'login-overlay';
        overlay.innerHTML = `
            <div class="login-required-message">
                <h2>Welcome to Management Platform</h2>
                <p>Please sign in to access the application.</p>
                <button id="show-login-btn" class="auth-button">Sign In</button>
                <br><br>
                <button id="debug-modal-btn" class="auth-button" style="background-color: #dc3545;">Debug Modal</button>
            </div>
        `;
        document.body.appendChild(overlay);
        
        // Use setTimeout to ensure the button is in the DOM
        setTimeout(() => {
            const showLoginBtn = document.getElementById('show-login-btn');
            if (showLoginBtn) {
                console.log('✅ Sign In button found, attaching event listener');
                showLoginBtn.addEventListener('click', (e) => {
                    console.log('🔐 Sign In button clicked in overlay');
                    e.preventDefault();
                    e.stopPropagation();
                    
                    const modal = document.getElementById('login-modal');
                    if (modal) {
                        console.log('✅ Login modal found, showing...');
                        modal.style.display = 'flex';
                        modal.style.zIndex = '10001'; // Higher than overlay
                        console.log('📱 Modal display:', modal.style.display);
                        console.log('📱 Modal z-index:', modal.style.zIndex);
                        console.log('📱 Modal computed style:', window.getComputedStyle(modal).display);
                        
                        // Also temporarily hide the overlay to see if modal is behind it
                        const currentOverlay = document.getElementById('login-overlay');
                        if (currentOverlay) {
                            currentOverlay.style.zIndex = '10000';
                            console.log('📱 Overlay z-index set to:', currentOverlay.style.zIndex);
                        }
                    } else {
                        console.error('❌ Login modal not found');
                    }
                });
            } else {
                // Only log error if user is not authenticated (overlay should be visible)
                if (!currentUser) {
                    console.error('❌ Sign In button not found in overlay');
                }
            }
            
            // Add debug button handler
            const debugBtn = document.getElementById('debug-modal-btn');
            if (debugBtn) {
                debugBtn.addEventListener('click', () => {
                    console.log('🐛 Debug button clicked');
                    debugModalVisibility();
                    
                    // Force show modal with inline styles
                    const modal = document.getElementById('login-modal');
                    if (modal) {
                        modal.style.cssText = 'display: flex !important; position: fixed !important; z-index: 99999 !important; left: 0; top: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.5); justify-content: center; align-items: center;';
                        console.log('🐛 Modal forced visible with inline styles');
                    }
                });
            }
        }, 100);
        
        return overlay;
    }
    
    function hideLoginOverlay() {
        const overlay = document.getElementById('login-overlay');
        if (overlay) {
            overlay.remove();
        }
        // Remove blur from main content
        const appContainer = document.querySelector('.app-container');
        if (appContainer) {
            appContainer.classList.remove('app-content-hidden');
        }
    }
    
    function showLoginOverlay() {
        const overlay = document.getElementById('login-overlay') || createLoginOverlay();
        // Add blur to main content
        const appContainer = document.querySelector('.app-container');
        if (appContainer) {
            appContainer.classList.add('app-content-hidden');
        }
    }
    
    // Initialize - show login overlay by default
    showLoginOverlay();
    
    // Global event delegation for dynamically created login buttons
    document.addEventListener('click', (e) => {
        if (e.target && e.target.id === 'show-login-btn') {
            console.log('🔐 Sign In button clicked (via delegation)');
            e.preventDefault();
            e.stopPropagation();
            
            const modal = document.getElementById('login-modal');
            if (modal) {
                console.log('✅ Login modal found via delegation, showing...');
                modal.style.display = 'flex';
            } else {
                console.error('❌ Login modal not found via delegation');
            }
        }
    });

    // Handle Auth State Changes
    onAuthStateChanged(auth, user => {
        currentUser = user;
        console.log('🔐 Auth state changed:', user ? `User: ${user.email}` : 'No user');
        
        if (user) {
            // User is signed in
            console.log('✅ User signed in:', user.email);
            if (userDisplay) {
                userDisplay.textContent = user.email || user.displayName || 'User';
            }
            if (loginButton) loginButton.style.display = 'none';
            if (logoutButton) logoutButton.style.display = 'block';
            
            // Hide login modal and overlay
            if (loginModal && loginModal.style.display === 'flex') {
                loginModal.style.display = 'none';
            }
            hideLoginOverlay();
            
        } else {
            // User is signed out
            console.log('📤 User signed out');
            if (userDisplay) userDisplay.textContent = '';
            if (loginButton) loginButton.style.display = 'block';
            if (logoutButton) logoutButton.style.display = 'none';
            
            // Show login overlay to force authentication
            showLoginOverlay();
        }
    });

    // Event Listeners
    if (loginButton) {
        loginButton.addEventListener('click', () => {
            console.log('🔐 Login button clicked');
            if (loginModal) {
                loginModal.style.display = 'flex';
            }
        });
    }    if (closeModal) {
        closeModal.addEventListener('click', () => {
            if (loginModal) {
                loginModal.style.display = 'none';
            }
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === loginModal && loginModal) {
            loginModal.style.display = 'none';
        }
    });

    // Google Sign-in
    if (googleSigninBtn) {
        googleSigninBtn.addEventListener('click', async () => {
            try {
                // Check if GoogleAuthProvider is available
                if (!GoogleAuthProvider) {
                    throw new Error('GoogleAuthProvider not available');
                }
                
                const provider = new GoogleAuthProvider();
                provider.addScope('email');
                provider.addScope('profile');
                
                const result = await signInWithPopup(auth, provider);
                console.log('✅ Google sign-in successful:', result.user.email);
                
                // Clear any error messages
                if (loginError) {
                    loginError.style.display = 'none';
                }
                
            } catch (error) {
                console.error('❌ Google sign-in error:', error);
                
                let errorMessage = 'Google sign-in failed: ';
                if (error.code === 'auth/operation-not-allowed') {
                    errorMessage += 'Google sign-in is not enabled. Please contact administrator.';
                } else if (error.code === 'auth/popup-closed-by-user') {
                    errorMessage += 'Sign-in was cancelled.';
                } else if (error.code === 'auth/popup-blocked') {
                    errorMessage += 'Popup was blocked by browser.';
                } else {
                    errorMessage += error.message;
                }
                
                if (loginError) {
                    loginError.textContent = errorMessage;
                    loginError.style.display = 'block';
                }
            }
        });
    }

    // Email/Password Login
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (!emailInput || !passwordInput) {
                console.error('❌ Email or password input not found');
                return;
            }
            
            const email = emailInput.value;
            const password = passwordInput.value;
            
            if (!email || !password) {
                if (loginError) {
                    loginError.textContent = 'Please enter both email and password.';
                    loginError.style.display = 'block';
                }
                return;
            }

            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                console.log('✅ Email sign-in successful:', userCredential.user.email);
                
                // Clear form and error messages
                loginForm.reset();
                if (loginError) {
                    loginError.style.display = 'none';
                }
                
            } catch (error) {
                console.error('❌ Email sign-in error:', error);
                
                let errorMessage = '';
                switch (error.code) {
                    case 'auth/user-not-found':
                        errorMessage = 'No account found with this email address.';
                        break;
                    case 'auth/wrong-password':
                        errorMessage = 'Incorrect password.';
                        break;
                    case 'auth/invalid-email':
                        errorMessage = 'Invalid email address format.';
                        break;
                    case 'auth/too-many-requests':
                        errorMessage = 'Too many failed attempts. Please try again later.';
                        break;
                    default:
                        errorMessage = error.message;
                }
                
                if (loginError) {
                    loginError.textContent = errorMessage;
                    loginError.style.display = 'block';
                }
            }
        });
    }

    // Logout
    if (logoutButton) {
        logoutButton.addEventListener('click', async () => {
            try {
                await signOut(auth);
                console.log('✅ User signed out successfully');
            } catch (error) {
                console.error('❌ Sign out error:', error);
            }
        });
    }
    
    // Function to check if user is authenticated (for use by other modules)
    window.isAuthenticated = () => !!currentUser;
    window.getCurrentUser = () => currentUser;
    
    console.log('✅ Authentication service fully initialized');
}

// Initialize auth when Firebase is ready
document.addEventListener('firebaseReady', () => {
    console.log('🔥 Firebase ready event received, initializing auth...');
    initializeAuth();
});

// Fallback: try to initialize after a delay if Firebase is already ready
setTimeout(() => {
    if (window.auth && window.authModule && !window.authInitialized) {
        console.log('🔄 Firebase already ready, initializing auth...');
        initializeAuth();
        window.authInitialized = true;
    }
}, 2000);

