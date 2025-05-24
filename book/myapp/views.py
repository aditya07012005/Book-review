from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from .models import Review, Book, Genre
from django.db.models import Avg

def home(request):
    featured_books = Book.objects.filter(is_featured=True)
    new_releases = Book.objects.filter(is_new_release=True).order_by('-release_date')
    genres = Genre.objects.all()
    
    # Get review data for featured books
    for book in featured_books:
        book.reviews = Review.objects.filter(book_title=book.title)
        book.avg_rating = book.reviews.aggregate(Avg('rating'))['rating__avg'] or 0
        book.review_count = book.reviews.count()
    
    # Get review data for new releases
    for book in new_releases:
        book.reviews = Review.objects.filter(book_title=book.title)
        book.avg_rating = book.reviews.aggregate(Avg('rating'))['rating__avg'] or 0
        book.review_count = book.reviews.count()
    
    # Create a list of tuples containing genre and its books
    genre_books = []
    for genre in genres:
        books = Book.objects.filter(genre=genre)[:4]
        for book in books:
            book.reviews = Review.objects.filter(book_title=book.title)
            book.avg_rating = book.reviews.aggregate(Avg('rating'))['rating__avg'] or 0
            book.review_count = book.reviews.count()
        genre_books.append((genre, books))
    
    return render(request, 'index.html', {
        'featured_books': featured_books,
        'new_releases': new_releases,
        'genre_books': genre_books,
    })

def register_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        email = request.POST['email']
        password = request.POST['password']
        confirm_password = request.POST['confirm_password']
        if password == confirm_password:
            if User.objects.filter(username=username).exists():
                return render(request, 'register.html', {'error': 'Username already exists'})
            user = User.objects.create_user(username, email, password)
            user.save()
            return redirect('login')
        else:
            return render(request, 'register.html', {'error': 'Passwords do not match'})
    return render(request, 'register.html')

def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('submit')
        else:
            return render(request, 'login.html', {'error': 'Invalid username or password'})
    return render(request, 'login.html')

def submit(request):
    if not request.user.is_authenticated:
        return redirect('login')
    
    # Get pre-filled book information from URL parameters
    initial_data = {
        'book_title': request.GET.get('book_title', ''),
        'author': request.GET.get('author', ''),
        'genre': request.GET.get('genre', '')
    }
    
    if request.method == 'POST':
        # Validate required fields
        required_fields = ['book_title', 'author', 'genre', 'rating', 'review']
        missing = [field for field in required_fields if field not in request.POST]
        if missing:
            return render(request, 'submit-review.html', {
                'error': f'Missing fields: {", ".join(missing)}',
                'initial_data': initial_data
            })
        
        try:
            rating = int(request.POST['rating'])
            if not (1 <= rating <= 5):
                raise ValueError()
        except ValueError:
            return render(request, 'submit-review.html', {
                'error': 'Please select a valid rating between 1-5',
                'initial_data': initial_data
            })
        
        Review.objects.create(
            user=request.user,
            book_title=request.POST['book_title'],
            author=request.POST['author'],
            genre=request.POST['genre'],
            rating=rating,
            review=request.POST['review']
        )
        return redirect('home')
    
    return render(request, 'submit-review.html', {'initial_data': initial_data})

def logout_view(request):
    logout(request)
    return redirect('home')

def genre_view(request, genre_slug):
    genre = get_object_or_404(Genre, slug=genre_slug)
    books = Book.objects.filter(genre=genre)
    all_genres = Genre.objects.all()
    
    # Get review data for each book
    for book in books:
        book.reviews = Review.objects.filter(book_title=book.title)
        book.avg_rating = book.reviews.aggregate(Avg('rating'))['rating__avg'] or 0
        book.review_count = book.reviews.count()
    
    return render(request, 'genre.html', {
        'genre': genre,
        'books': books,
        'all_genres': all_genres,
    })


