// Admin Panel Functionality
document.addEventListener('DOMContentLoaded', () => {
    // Menu Navigation
    const menuItems = document.querySelectorAll('.admin-menu li a');
    const sections = document.querySelectorAll('.admin-section');

    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('href').substring(1);
            
            // Hide all sections
            sections.forEach(section => {
                section.style.display = 'none';
            });
            
            // Show target section
            document.getElementById(targetId).style.display = 'block';
            
            // Update active menu item
            menuItems.forEach(menuItem => {
                menuItem.parentElement.classList.remove('active');
            });
            item.parentElement.classList.add('active');
        });
    });

    // Show dashboard by default
    document.getElementById('dashboard').style.display = 'block';

    // Search Functionality
    const searchInputs = document.querySelectorAll('.search-bar input');
    searchInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const tableBody = input.closest('.admin-section').querySelector('tbody');
            const rows = tableBody.querySelectorAll('tr');

            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(searchTerm) ? '' : 'none';
            });
        });
    });

    // Add Book Modal
    const addBookBtn = document.querySelector('.add-btn');
    if (addBookBtn) {
        addBookBtn.addEventListener('click', () => {
            // Implement add book modal functionality
            alert('Add book functionality to be implemented');
        });
    }

    // Edit and Delete Buttons
    document.addEventListener('click', (e) => {
        if (e.target.closest('.edit-btn')) {
            const row = e.target.closest('tr');
            // Implement edit functionality
            alert('Edit functionality to be implemented');
        }
        
        if (e.target.closest('.delete-btn')) {
            const row = e.target.closest('tr');
            if (confirm('Are you sure you want to delete this item?')) {
                // Implement delete functionality
                row.remove();
            }
        }
    });

    // Stats Animation
    const animateStats = () => {
        const stats = document.querySelectorAll('.stat-card p');
        stats.forEach(stat => {
            const value = parseInt(stat.textContent);
            let current = 0;
            const increment = value / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= value) {
                    clearInterval(timer);
                    stat.textContent = value;
                } else {
                    stat.textContent = Math.round(current);
                }
            }, 20);
        });
    };

    // Run stats animation on page load
    animateStats();
}); 