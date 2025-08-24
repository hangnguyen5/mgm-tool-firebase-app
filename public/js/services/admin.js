/**
 * Admin Panel Management Service
 * Handles user management, admin privileges, and system statistics
 */

class AdminPanel {
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
            // TEMPORARY: Hardcode current user as admin for testing
            // Remove this and uncomment the real logic below when ready for production
            this.isAdmin = true;
            console.log('🔐 Admin status (HARDCODED):', this.isAdmin, 'User:', this.currentUser.email);
            return;
            
            /* REAL ADMIN CHECK - Uncomment when ready:
            // Check if user email contains 'admin' or matches specific emails
            // In a real app, you'd check a users collection in Firestore
            const adminEmails = ['admin@example.com', 'nmhang.dee@gmail.com']; // Add your admin emails
            this.isAdmin = adminEmails.includes(this.currentUser.email) || 
                          this.currentUser.email.includes('admin');
            
            console.log('🔐 Admin status:', this.isAdmin);
            */
        } catch (error) {
            console.error('❌ Error checking admin status:', error);
            this.isAdmin = false;
        }
    }

    async loadAdminPanel() {
        try {
            console.log('📊 Loading admin panel data...');
            
            // Hide loading, show content
            document.getElementById('loading-state').classList.add('hidden');
            document.getElementById('admin-content').classList.remove('hidden');
            
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
            // Mock stats for now - replace with real data from Firestore
            document.getElementById('total-users').textContent = '12';
            document.getElementById('admin-users').textContent = '2';
            document.getElementById('total-employees').textContent = '45';
            document.getElementById('recent-logins').textContent = '8';
            
        } catch (error) {
            console.error('❌ Error loading stats:', error);
        }
    }

    async loadUsers() {
        try {
            this.showUsersLoading(true);
            
            // Mock user data - replace with real Firestore query
            const mockUsers = [
                {
                    email: 'nmhang.dee@gmail.com',
                    displayName: 'Nguyen Minh Hang',
                    role: 'admin',
                    createdAt: new Date('2024-01-15'),
                    lastSignIn: new Date('2024-08-24')
                },
                {
                    email: 'user@example.com',
                    displayName: 'Example User',
                    role: 'user',
                    createdAt: new Date('2024-02-01'),
                    lastSignIn: new Date('2024-08-20')
                }
            ];
            
            this.users = mockUsers;
            this.renderUsers();
            this.showUsersLoading(false);
            
        } catch (error) {
            console.error('❌ Error loading users:', error);
            this.showUsersLoading(false);
            this.showUsersError('Failed to load users: ' + error.message);
        }
    }

    renderUsers() {
        const tbody = document.getElementById('users-tbody');
        const table = document.getElementById('users-table');
        
        if (this.users.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; color: #666;">No users found</td></tr>';
        } else {
            tbody.innerHTML = this.users.map(user => `
                <tr>
                    <td>${user.email}</td>
                    <td>${user.displayName || '-'}</td>
                    <td>
                        <span class="status-badge status-${user.role}">
                            ${user.role}
                        </span>
                    </td>
                    <td>${user.createdAt ? user.createdAt.toLocaleDateString() : '-'}</td>
                    <td>${user.lastSignIn ? user.lastSignIn.toLocaleDateString() : '-'}</td>
                    <td>
                        ${user.role !== 'admin' ? 
                            `<button class="admin-button success" onclick="adminPanel.makeAdmin('${user.email}')">Make Admin</button>` :
                            `<button class="admin-button danger" onclick="adminPanel.removeAdmin('${user.email}')">Remove Admin</button>`
                        }
                    </td>
                </tr>
            `).join('');
        }
        
        table.classList.remove('hidden');
    }

    setupEventListeners() {
        // Grant admin form
        document.getElementById('grant-admin-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('admin-email').value;
            this.grantAdminPrivileges(email);
        });
        
        // Refresh users button
        document.getElementById('refresh-users-btn').addEventListener('click', () => {
            this.loadUsers();
        });
    }

    async grantAdminPrivileges(email) {
        try {
            this.showGrantAdminLoading(true);
            
            // Mock granting admin - replace with real Firestore update
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
            
            this.showAdminMessage(`Successfully granted admin privileges to ${email}`, 'success');
            this.showGrantAdminLoading(false);
            document.getElementById('admin-email').value = '';
            
            // Refresh users list
            await this.loadUsers();
            
        } catch (error) {
            console.error('❌ Error granting admin:', error);
            this.showAdminMessage('Failed to grant admin privileges: ' + error.message, 'error');
            this.showGrantAdminLoading(false);
        }
    }

    async makeAdmin(email) {
        if (confirm(`Grant admin privileges to ${email}?`)) {
            await this.grantAdminPrivileges(email);
        }
    }

    async removeAdmin(email) {
        if (confirm(`Remove admin privileges from ${email}?`)) {
            try {
                // Mock removing admin - replace with real Firestore update
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                this.showUsersMessage(`Successfully removed admin privileges from ${email}`, 'success');
                await this.loadUsers();
                
            } catch (error) {
                console.error('❌ Error removing admin:', error);
                this.showUsersMessage('Failed to remove admin privileges: ' + error.message, 'error');
            }
        }
    }

    showAccessDenied() {
        document.getElementById('loading-state').classList.add('hidden');
        document.getElementById('admin-content').classList.add('hidden');
        document.getElementById('auth-error').classList.remove('hidden');
    }

    showUsersLoading(show) {
        document.getElementById('users-loading').classList.toggle('hidden', !show);
        document.getElementById('refresh-spinner').classList.toggle('hidden', !show);
        document.getElementById('refresh-users-btn').disabled = show;
    }

    showGrantAdminLoading(show) {
        document.getElementById('grant-admin-spinner').classList.toggle('hidden', !show);
        document.querySelector('#grant-admin-form button').disabled = show;
    }

    showAdminMessage(message, type = 'success') {
        const container = document.getElementById('admin-message');
        container.innerHTML = `<div class="message ${type}">${message}</div>`;
        setTimeout(() => container.innerHTML = '', 5000);
    }

    showUsersMessage(message, type = 'success') {
        const container = document.getElementById('users-message');
        container.innerHTML = `<div class="message ${type}">${message}</div>`;
        setTimeout(() => container.innerHTML = '', 5000);
    }

    showError(message) {
        document.getElementById('loading-state').innerHTML = `
            <div class="message error">
                <strong>Error:</strong> ${message}
            </div>
        `;
    }
}

// Initialize admin panel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.adminPanel = new AdminPanel();
});
