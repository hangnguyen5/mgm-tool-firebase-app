/**
 * Admin Panel Service
 * 
 * This module provides the AdminPanel class for managing admin-related features
 * in the Firebase management tool web app. It handles authentication, admin status
 * checks, user management (granting/removing admin privileges), and rendering
 * admin statistics and user lists. Usage: Instantiate AdminPanel after DOMContentLoaded.
 */

// Prevent redeclaration of AdminPanel class
if (typeof window.AdminPanel === 'undefined') {
    window.AdminPanel = class AdminPanel {
        constructor() {
            this.currentUser = null;
            this.isAdmin = false;
            this.users = [];
            this.init();
        }

    async init() {
        try {
            console.log('🔧 Initializing admin panel...');
            
            // Wait for Firebase Auth
            await this.waitForAuth();
            
            // Check authentication and admin status
            window.auth.onAuthStateChanged(async (user) => {
                if (user) {
                    this.currentUser = user;
                    console.log('👤 User authenticated:', user.email);
                    
                    // Check if user is admin
                    await this.checkAdminStatus();
                    
                    if (this.isAdmin) {
                        await this.loadAdminPanel();
                    } else {
                        this.showAccessDenied();
                    }
                } else {
                    console.log('❌ User not authenticated');
                    this.showAccessDenied();
                }
            });
            
        } catch (error) {
            console.error('❌ Failed to initialize admin panel:', error);
            this.showError('Failed to initialize admin panel: ' + error.message);
        }
    }

    async waitForAuth() {
        return new Promise((resolve) => {
            // Use the global waitForFirebase function if available, otherwise fallback
            if (window.waitForFirebase) {
                window.waitForFirebase().then(() => {
                    if (window.auth) {
                        resolve();
                    } else {
                        setTimeout(() => this.waitForAuth().then(resolve), 100);
                    }
                });
            } else if (window.auth) {
                resolve();
            } else {
                setTimeout(() => this.waitForAuth().then(resolve), 100);
            }
        });
    }

    async checkAdminStatus() {
        try {
            // Fetch real admin status from Firestore management-users collection
            if (!window.management_db && !window.firestoreModule) {
                console.warn('⚠️ Management database not available for admin check');
                this.isAdmin = false;
                return;
            }

            const { getFirestore, doc, getDoc } = window.firestoreModule;
            const managementDb = window.management_db || getFirestore(window.firebaseApp, 'management-data');
            
            // Get user document from management-users collection
            const userDocRef = doc(managementDb, 'management-users', this.currentUser.uid);
            const userDoc = await getDoc(userDocRef);
            
            if (userDoc.exists()) {
                const userData = userDoc.data();
                this.isAdmin = userData.role === 'admin';
                console.log('🔐 Admin status from Firestore:', this.isAdmin, 'Role:', userData.role);
            } else {
                // User doesn't exist in management-users collection yet
                console.log('👤 User not found in management-users collection, calling handleUserSignIn');
                this.isAdmin = false;
                
                // Call the Cloud Function to handle user sign-in and create management record
                if (window.functionsModule && window.functions) {
                    try {
                        const { httpsCallable } = window.functionsModule;
                        const handleUserSignIn = httpsCallable(window.functions, 'handleUserSignIn');
                        const result = await handleUserSignIn({
                            uid: this.currentUser.uid,
                            email: this.currentUser.email,
                            displayName: this.currentUser.displayName
                        });
                        console.log('✅ User sign-in handled:', result.data);
                        
                        // Re-check admin status after creating the record
                        await this.checkAdminStatus();
                    } catch (functionError) {
                        console.error('❌ Error calling handleUserSignIn function:', functionError);
                    }
                }
            }
            
        } catch (error) {
            console.error('❌ Error checking admin status:', error);
            this.isAdmin = false;
        }
    }

    async loadAdminPanel() {
        try {
            console.log('📊 Loading admin panel data...');

            // Check if we're actually on an admin page
            const loadingState = document.getElementById('loading-state');
            const adminContent = document.getElementById('admin-content');
            
            if (!loadingState && !adminContent) {
                console.log('📋 Not on admin page, skipping admin panel load');
                return;
            }

            // Hide loading, show content (add null checks)
            if (loadingState) loadingState.classList.add('hidden');
            if (adminContent) adminContent.classList.remove('hidden');

            // Load initial data
            await this.loadStats();
            await this.loadUsers();

            // Setup event listeners
            this.setupEventListeners();

            console.log('✅ Admin panel loaded successfully');

        } catch (error) {
            console.error('❌ Error loading admin panel:', error);
            this.showError('Error loading admin panel: ' + error.message);
        }
    }

    async loadStats() {
        try {
            // Get actual stats from management-data database
            if (!window.management_db && !window.firestoreModule) {
                console.warn('⚠️ Management database not available for stats');
                return;
            }

            // Use the same pattern as projects: get database reference
            const { getFirestore, collection, getDocs } = window.firestoreModule;
            
            let managementDb;
            if (window.management_db) {
                managementDb = window.management_db;
            } else if (window.firebaseApp) {
                managementDb = getFirestore(window.firebaseApp, 'management-data');
            } else {
                throw new Error('Neither window.management_db nor window.firebaseApp is available');
            }
            
            // Get all users and calculate stats in JavaScript to avoid index requirements
            const usersSnapshot = await getDocs(collection(managementDb, 'management-users'));
            const totalUsers = usersSnapshot.size;
            
            let adminUsers = 0;
            let totalEmployees = 0;
            let recentLogins = 0;
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            
            usersSnapshot.forEach((doc) => {
                const userData = doc.data();
                
                // Count admin users
                if (userData.role === 'admin') {
                    adminUsers++;
                }
                
                // Count employees (users with any role)
                if (['admin', 'editor', 'subscriber'].includes(userData.role)) {
                    totalEmployees++;
                }
                
                // Count recent logins
                if (userData.lastSignIn && userData.lastSignIn.toDate && userData.lastSignIn.toDate() >= weekAgo) {
                    recentLogins++;
                } else if (userData.lastSignIn && userData.lastSignIn >= weekAgo) {
                    recentLogins++;
                }
            });
            
            // Update DOM elements
            const totalUsersEl = document.getElementById('total-users');
            const adminUsersEl = document.getElementById('admin-users');
            const totalEmployeesEl = document.getElementById('total-employees');
            const recentLoginsEl = document.getElementById('recent-logins');
            
            if (totalUsersEl) totalUsersEl.textContent = totalUsers.toString();
            if (adminUsersEl) adminUsersEl.textContent = adminUsers.toString();
            if (totalEmployeesEl) totalEmployeesEl.textContent = totalEmployees.toString();
            if (recentLoginsEl) recentLoginsEl.textContent = recentLogins.toString();
            
        } catch (error) {
            console.error('❌ Error loading stats:', error);
            // Fallback to zeros if error
            const totalUsersEl = document.getElementById('total-users');
            const adminUsersEl = document.getElementById('admin-users');
            const totalEmployeesEl = document.getElementById('total-employees');
            const recentLoginsEl = document.getElementById('recent-logins');
            
            if (totalUsersEl) totalUsersEl.textContent = '0';
            if (adminUsersEl) adminUsersEl.textContent = '0';
            if (totalEmployeesEl) totalEmployeesEl.textContent = '0';
            if (recentLoginsEl) recentLoginsEl.textContent = '0';
        }
    }

    async loadUsers() {
        try {
            if (!window.management_db && !window.firestoreModule) {
                console.warn('⚠️ Management database not available for user list');
                return;
            }

            // Use the same pattern as projects: get database reference
            const { getFirestore, collection, getDocs } = window.firestoreModule;
            const managementDb = window.management_db || getFirestore(window.firebaseApp, 'management-data');
            
            // Get all users without complex ordering to avoid index requirements
            const usersSnapshot = await getDocs(collection(managementDb, 'management-users'));
            const users = [];
            
            usersSnapshot.forEach((doc) => {
                const userData = doc.data();
                users.push({
                    uid: doc.id,
                    ...userData
                });
            });
            
            // Sort in JavaScript instead of Firestore query to avoid index requirements
            users.sort((a, b) => {
                // Admin users first, then by display name
                if (a.role === 'admin' && b.role !== 'admin') return -1;
                if (b.role === 'admin' && a.role !== 'admin') return 1;
                return (a.displayName || '').localeCompare(b.displayName || '');
            });

            this.users = users;
            this.renderUsers();

        } catch (error) {
            console.error('❌ Error loading users:', error);
            this.showUsersErrorMessage('Failed to load users');
        }
    }

renderUsers() {
    const tbody = document.getElementById('users-tbody');
    const table = document.getElementById('users-table');
    if (!tbody || !table) {
        console.error('❌ Admin panel table elements not found');
        return;
    }
    if (this.users.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; color: #666;">No users found</td></tr>';
    } else {
        tbody.innerHTML = this.users.map(user => {
            // Handle Firestore Timestamp objects for createdAt
            let createdAtDisplay = '-';
            if (user.createdAt) {
                try {
                    if (user.createdAt.toDate && typeof user.createdAt.toDate === 'function') {
                        // Firestore Timestamp object
                        createdAtDisplay = user.createdAt.toDate().toLocaleDateString();
                    } else if (user.createdAt instanceof Date) {
                        // Regular Date object
                        createdAtDisplay = user.createdAt.toLocaleDateString();
                    } else if (typeof user.createdAt === 'string') {
                        // String date
                        createdAtDisplay = new Date(user.createdAt).toLocaleDateString();
                    }
                } catch (dateError) {
                    console.warn('Error formatting createdAt date:', dateError);
                    createdAtDisplay = '-';
                }
            }
            
            return `
                <tr>
                    <td>${user.email}</td>
                    <td>${user.displayName || '-'}</td>
                    <td>
                        <span class="status-badge status-${user.role}">
                            ${user.role}
                        </span>
                    </td>
                    <td>${createdAtDisplay}</td>
                    <td>
                        ${user.role !== 'admin' ? 
                            `<button class="admin-button success" onclick="adminPanel.makeAdmin('${user.uid}')">Make Admin</button>` :
                            `<button class="admin-button danger" onclick="adminPanel.removeAdmin('${user.uid}')">Remove Admin</button>`
                        }
                    </td>
                </tr>
            `;
        }).join('');
        table.classList.remove('hidden');
    }
}


    setupEventListeners() {
        // Grant admin form
        const grantAdminForm = document.getElementById('grant-admin-form');
        if (grantAdminForm) {
            grantAdminForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const emailInput = document.getElementById('admin-email');
                const email = emailInput ? emailInput.value : '';
                await this.grantAdminPrivileges(email);
            });
        }

        // Refresh users button
        const refreshUsersBtn = document.getElementById('refresh-users-btn');
        if (refreshUsersBtn) {
            refreshUsersBtn.addEventListener('click', () => {
                this.loadUsers();
            });
        }
    }

    async grantAdminPrivileges(email) {
        try {
            if (!window.management_db && !window.firestoreModule) {
                console.warn('⚠️ Management database not available');
                return false;
            }

            // Use the same pattern as projects: get database reference
            const { getFirestore, collection, getDocs, doc, updateDoc } = window.firestoreModule;
            const managementDb = window.management_db || getFirestore(window.firebaseApp, 'management-data');
            
            // Find user by email
            const usersSnapshot = await getDocs(collection(managementDb, 'management-users'));
            let userId = null;
            usersSnapshot.forEach((docSnap) => {
                const userData = docSnap.data();
                if (userData.email === email) {
                    userId = docSnap.id;
                }
            });

            if (!userId) {
                alert('User with the specified email not found.');
                return false;
            }

            const userDocRef = doc(managementDb, 'management-users', userId);
            await updateDoc(userDocRef, {
                role: 'admin',
                lastUpdated: new Date(),
                updatedBy: this.currentUser?.uid || 'system'
            });
            
            console.log(`✅ Successfully granted admin privileges to user ${email}`);
            await this.loadUsers(); // Refresh the user list
            return true;
            
        } catch (error) {
            console.error('❌ Error granting admin privileges:', error);
            alert('Failed to grant admin privileges. Check console for details.');
            return false;
        }
    }
    async makeAdmin(userId) {
        // Find user by uid and get their email
        const user = this.users.find(u => u.uid === userId);
        if (!user) {
            alert('User not found.');
            return;
        }
        if (confirm(`Grant admin privileges to user: ${user.email}?`)) {
            await this.grantAdminPrivileges(user.email);
        }
    }

    async removeAdmin(userId) {
        try {
            if (!window.management_db && !window.firestoreModule) {
                console.warn('⚠️ Management database not available');
                return false;
            }

            // Use the same pattern as projects: get database reference
            const { getFirestore, doc, updateDoc } = window.firestoreModule;
            const managementDb = window.management_db || getFirestore(window.firebaseApp, 'management-data');
            
            const userDocRef = doc(managementDb, 'management-users', userId);
            await updateDoc(userDocRef, {
                role: 'subscriber', // Default role
                lastUpdated: new Date(),
                updatedBy: this.currentUser?.uid || 'system'
            });
            console.log(`✅ Successfully removed admin privileges from user ${userId}`);
            await this.loadUsers(); // Refresh the user list
            return true;
            
        } catch (error) {
            console.error('❌ Error removing admin privileges:', error);
            alert('Failed to remove admin privileges. Check console for details.');
            return false;
        }
    }

    showAccessDenied() {
    const loadingState = document.getElementById('loading-state');
    const adminContent = document.getElementById('admin-content');
    const authError = document.getElementById('auth-error');
    if (loadingState) loadingState.classList.add('hidden');
    if (adminContent) adminContent.classList.add('hidden');
    if (authError) authError.classList.remove('hidden');
    }

    showUsersLoading(show) {
    const usersLoading = document.getElementById('users-loading');
    const refreshSpinner = document.getElementById('refresh-spinner');
    const refreshUsersBtn = document.getElementById('refresh-users-btn');
    if (usersLoading) usersLoading.classList.toggle('hidden', !show);
    if (refreshSpinner) refreshSpinner.classList.toggle('hidden', !show);
    if (refreshUsersBtn) refreshUsersBtn.disabled = show;
    }

    showGrantAdminLoading(show) {
    const grantAdminSpinner = document.getElementById('grant-admin-spinner');
    const grantAdminButton = document.querySelector('#grant-admin-form button');
    if (grantAdminSpinner) grantAdminSpinner.classList.toggle('hidden', !show);
    if (grantAdminButton) grantAdminButton.disabled = show;
    }

    showAdminMessage(message, type = 'success') {
        const container = document.getElementById('admin-message');
        if (container) {
            container.innerHTML = `<div class="message ${type}">${message}</div>`;
            setTimeout(() => container.innerHTML = '', 5000);
        }
    }

    showUsersMessage(message, type = 'success') {
        const container = document.getElementById('users-message');
        if (container) {
            container.innerHTML = `<div class="message ${type}">${message}</div>`;
            setTimeout(() => container.innerHTML = '', 5000);
        }
    }

    showError(message) {
        const loadingState = document.getElementById('loading-state');
        if (loadingState) {
            loadingState.innerHTML = `
                <div class="message error">
                    <strong>Error:</strong> ${message}
                </div>
            `;
        }
    }

        showUsersErrorMessage(message) {
            const usersTableContainer = document.getElementById('users-table-container');
            if (usersTableContainer) {
                usersTableContainer.innerHTML = `
                    <div class="message error">
                        <strong>Error:</strong> ${message}
                    </div>
                `;
            }
        }
    }; // End of AdminPanel class
}

// Initialize admin panel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (!window.adminPanel) {
        window.adminPanel = new window.AdminPanel();
    }
});
