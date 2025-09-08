/**
 * Authentication Guard - Ensures users are logged in before accessing any view
 */

class AuthGuard {
    constructor() {
        this.isInitialized = false;
        this.currentUser = null;
        this.redirectUrl = '/'; // Redirect to main page for login
        
        this.init();
    }
    
    init() {
        // Wait for Firebase to be ready
        document.addEventListener('firebaseReady', () => {
            this.setupAuthGuard();
        });
        
        // If Firebase is already ready
        if (window.auth && window.authModule) {
            this.setupAuthGuard();
        }
    }
    
    setupAuthGuard() {
        if (this.isInitialized) return;
        
        const { onAuthStateChanged } = window.authModule;
        const auth = window.auth;
        
        // Monitor authentication state
        onAuthStateChanged(auth, (user) => {
            this.currentUser = user;
            this.handleAuthChange(user);
        });
        
        this.isInitialized = true;
    }
    
    handleAuthChange(user) {
        if (!user) {
            // User is not authenticated, redirect to main page
            this.redirectToLogin();
        } else {
            // User is authenticated, allow access
            this.allowAccess();
        }
    }
    
    redirectToLogin() {
        // Only redirect if we're not already on the main page
        if (window.location.pathname !== '/' && window.location.pathname !== '/index.html') {
            console.log('User not authenticated, redirecting to login...');
            window.location.href = this.redirectUrl;
        }
    }
    
    allowAccess() {
        // Remove any blocking overlays that might exist
        const overlay = document.getElementById('auth-guard-overlay');
        if (overlay) {
            overlay.remove();
        }
        
        // Remove blur from content
        document.body.classList.remove('auth-blocked');
        
        console.log('User authenticated, access granted');
    }
    
    blockAccess() {
        // Create blocking overlay
        if (!document.getElementById('auth-guard-overlay')) {
            const overlay = document.createElement('div');
            overlay.id = 'auth-guard-overlay';
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(255, 255, 255, 0.95);
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
            `;
            
            overlay.innerHTML = `
                <div style="
                    text-align: center;
                    background: white;
                    padding: 40px;
                    border-radius: 10px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
                    max-width: 400px;
                ">
                    <h2 style="margin-top: 0; color: #4682b4;">Authentication Required</h2>
                    <p>Please log in to access this page.</p>
                    <button onclick="window.location.href='/'" style="
                        background-color: #007bff;
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 5px;
                        cursor: pointer;
                        font-size: 16px;
                    ">Go to Login</button>
                </div>
            `;
            
            document.body.appendChild(overlay);
        }
        
        // Blur the main content
        document.body.classList.add('auth-blocked');
    }
    
    // Public methods
    isAuthenticated() {
        return !!this.currentUser;
    }
    
    getCurrentUser() {
        return this.currentUser;
    }
    
    requireAuth() {
        if (!this.isAuthenticated()) {
            this.blockAccess();
            return false;
        }
        return true;
    }
}

// CSS for auth blocking
const authGuardCSS = `
.auth-blocked {
    filter: blur(3px);
    pointer-events: none;
}
`;

// Add CSS to document
const styleSheet = document.createElement('style');
styleSheet.textContent = authGuardCSS;
document.head.appendChild(styleSheet);

// Initialize auth guard
const authGuard = new AuthGuard();

// Make it globally available
window.authGuard = authGuard;

export default authGuard;
