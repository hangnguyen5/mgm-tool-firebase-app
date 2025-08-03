// Basic JavaScript for single-page navigation
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('.nav-link');

    // Function to load view based on hash or default to dashboard
    const loadInitialView = () => {
        const hash = window.location.hash;
        const viewId = hash ? hash.substring(1) : 'dashboard';
        
        // Update active link
        links.forEach(link => {
            if (link.getAttribute('href') === `#${viewId}`) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        viewLoader.loadView(viewId);
    };

    // Load initial view
    loadInitialView();

    // Handle navigation clicks
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            // Update URL hash without triggering hashchange
            history.pushState(null, '', `#${targetId}`);

            // Update active link
            links.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            // Load the target view
            viewLoader.loadView(targetId);
        });
    });

    // Handle browser back/forward buttons
    window.addEventListener('popstate', loadInitialView);
});
