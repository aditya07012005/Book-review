// Review Form Functionality
document.addEventListener('DOMContentLoaded', () => {
    const ratingStars = document.querySelectorAll('.rating-input i');
    const ratingInput = document.getElementById('rating');

    // Handle star rating
    ratingStars.forEach(star => {
        star.addEventListener('click', () => {
            const rating = star.getAttribute('data-rating');
            ratingInput.value = rating;
            highlightStars(rating);
        });
    });

    function highlightStars(rating) {
        ratingStars.forEach(star => {
            const starRating = star.getAttribute('data-rating');
            star.classList.toggle('fas', starRating <= rating);
            star.classList.toggle('far', starRating > rating);
        });
    }
});

    // // Form validation and submission
    // reviewForm.addEventListener('submit', (e) => {
    //     e.preventDefault();
        
    //     // Reset error states
    //     const inputs = reviewForm.querySelectorAll('input[required], select[required], textarea[required]');
    //     inputs.forEach(input => input.classList.remove('error'));
        
    //     // Validate form
    //     let isValid = true;
    //     inputs.forEach(input => {
    //         if (!input.value) {
    //             input.classList.add('error');
    //             isValid = false;
    //         }
    //     });

    //     if (!ratingInput.value) {
    //         document.querySelector('.rating-input').classList.add('error');
    //         isValid = false;
    //     }

    //     if (isValid) {
    //         // Create review object
    //         const reviewData = {
    //             bookTitle: document.getElementById('bookTitle').value,
    //             author: document.getElementById('author').value,
    //             genre: document.getElementById('genre').value,
    //             rating: ratingInput.value,
    //             review: document.getElementById('review').value,
    //             timestamp: new Date().toISOString()
    //         };

    //         // Store review in localStorage (for demo purposes)
    //         const reviews = JSON.parse(localStorage.getItem('bookReviews') || '[]');
    //         reviews.push(reviewData);
    //         localStorage.setItem('bookReviews', JSON.stringify(reviews));

    //         // Show success message
    //         const successMessage = document.createElement('div');
    //         successMessage.className = 'success-message';
    //         successMessage.textContent = 'Review submitted successfully!';
    //         reviewForm.insertBefore(successMessage, reviewForm.firstChild);

    //         // Reset form
    //         reviewForm.reset();
    //         highlightStars(0);
    //         ratingInput.value = '';

    //         // Remove success message after 3 seconds
    //         setTimeout(() => {
    //             successMessage.remove();
    //         }, 3000);
    //     }
    // });
 