// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const dropdown = document.querySelector('.dropdown');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Dropdown Toggle for Mobile
if (dropdown) {
    const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
    
    dropdownToggle.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            dropdown.classList.toggle('active');
        }
    });
}

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target) && window.innerWidth <= 768) {
        dropdown.classList.remove('active');
    }
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Dynamic Rating System
const stars = document.querySelectorAll('.rating i');
stars.forEach((star, index) => {
    star.addEventListener('click', () => {
        stars.forEach((s, i) => {
            if (i <= index) {
                s.classList.remove('far');
                s.classList.add('fas');
            } else {
                s.classList.remove('fas');
                s.classList.add('far');
            }
        });
    });
});

// Search Functionality
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const searchResults = document.getElementById('searchResults');
const resultsGrid = document.querySelector('.results-grid');

// Sample book data (replace with actual data from backend)
const books = [
    {
        title: 'The Enigma Code',
        author: 'Jane D. Miller',
        genre: 'Mystery',
        rating: 4,
        description: 'The thrilling mystery that keeps readers guessing until the last page.'
    },
    {
        title: 'Beyond the Stars',
        author: 'Robert Johnson',
        genre: 'Science Fiction',
        rating: 5,
        description: 'An epic space adventure that will take you to the edges of the universe.'
    },
    {
        title: 'The Hidden Garden',
        author: 'Sarah Williams',
        genre: 'Fiction',
        rating: 4,
        description: 'A heartwarming tale of discovery and growth.'
    }
];

function performSearch(query) {
    query = query.toLowerCase();
    return books.filter(book => 
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.genre.toLowerCase().includes(query) ||
        book.description.toLowerCase().includes(query)
    );
}

function displayResults(results) {
    resultsGrid.innerHTML = '';
    
    if (results.length === 0) {
        resultsGrid.innerHTML = '<p class="no-results">No books found matching your search.</p>';
        return;
    }

    results.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        
        const stars = '★'.repeat(book.rating) + '☆'.repeat(5 - book.rating);
        
        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p class="author">By ${book.author}</p>
            <p class="genre">${book.genre}</p>
            <div class="rating">${stars}</div>
            <p class="description">${book.description}</p>
            <a href="#" class="btn primary">Read Reviews</a>
        `;
        
        resultsGrid.appendChild(bookCard);
    });

    searchResults.classList.add('active');
}

searchBtn.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        const results = performSearch(query);
        displayResults(results);
    }
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const query = searchInput.value.trim();
        if (query) {
            const results = performSearch(query);
            displayResults(results);
        }
    }
});

// Form Validation
const validateForm = (formElement) => {
    const inputs = formElement.querySelectorAll('input[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value) {
            isValid = false;
            input.classList.add('error');
        } else {
            input.classList.remove('error');
        }
    });

    return isValid;
};

// Handle Form Submission
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateForm(form)) {
            // Add form submission logic here
            console.log('Form submitted successfully');
        }
    });
});

// Responsive Navigation
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Check if user is logged in
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const loginBtn = document.querySelector('.login-btn');
    const registerBtn = document.querySelector('.register-btn');
    const logoutBtn = document.getElementById('logoutBtn');

    if (isLoggedIn) {
        loginBtn.style.display = 'none';
        registerBtn.style.display = 'none';
        logoutBtn.style.display = 'flex';
    } else {
        loginBtn.style.display = 'flex';
        registerBtn.style.display = 'flex';
        logoutBtn.style.display = 'none';
    }
}

// Handle logout
function handleLogout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    checkLoginStatus();

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            handleLogout();
        });
    }

    // ... rest of your existing event listeners ...
}); 