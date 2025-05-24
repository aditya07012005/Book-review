from django.contrib import admin
from .models import Review, Book, Genre
from django.db.models import Avg
from django.utils.html import format_html

class BookInline(admin.TabularInline):
    model = Book
    extra = 1
    fields = ('title', 'author', 'cover', 'release_date', 'is_new_release', 'is_featured')

@admin.register(Genre)
class GenreAdmin(admin.ModelAdmin):
    list_display = ('name', 'book_count', 'review_count')
    search_fields = ('name', 'description')
    prepopulated_fields = {'slug': ('name',)}
    inlines = [BookInline]
    
    def book_count(self, obj):
        return obj.books.count()
    book_count.short_description = 'Number of Books'
    
    def review_count(self, obj):
        return obj.reviews.count()
    review_count.short_description = 'Number of Reviews'

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    # Show review content in list view
    list_display = ('id', 'user', 'book_title', 'truncated_review', 'rating', 'created_at')
    list_filter = ('genre', 'rating', 'created_at')
    search_fields = ('book_title', 'author', 'user__username', 'review')
    readonly_fields = ('created_at',)
    
    # Reorganized fieldsets for better layout
    fieldsets = (
        (None, {
            'fields': ('user', 'book_title', 'author')
        }),
        ('Review Details', {
            'fields': ('genre', 'rating', 'review'),
            'classes': ('wide',)
        }),
        ('Metadata', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )
    ordering = ('-created_at',)

    def truncated_review(self, obj):
        """Display first 50 characters of the review"""
        return f"{obj.review[:50]}..." if len(obj.review) > 50 else obj.review
    truncated_review.short_description = 'Review Preview'

@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'genre', 'release_date', 'is_new_release', 'is_featured', 'average_rating', 'review_count')
    list_filter = ('genre', 'is_new_release', 'is_featured', 'release_date')
    search_fields = ('title', 'author', 'genre__name')
    readonly_fields = ('average_rating', 'review_count')
    actions = ['mark_as_new_release', 'mark_as_featured', 'unmark_as_new_release', 'unmark_as_featured']
    list_per_page = 20

    def average_rating(self, obj):
        """Calculate and display the average rating for the book"""
        avg = Review.objects.filter(book_title=obj.title).aggregate(Avg('rating'))['rating__avg']
        if avg is None:
            return "No ratings"
        color = 'green' if avg >= 4 else 'orange' if avg >= 3 else 'red'
        formatted_rating = f"{float(avg):.1f}"
        return format_html('<span style="color: {};">{} ⭐</span>', color, formatted_rating)
    average_rating.short_description = 'Average Rating'

    def review_count(self, obj):
        """Display the number of reviews for the book"""
        count = Review.objects.filter(book_title=obj.title).count()
        color = 'green' if count > 0 else 'gray'
        text = f"{count} review{'s' if count != 1 else ''}"
        return format_html('<span style="color: {};">{}</span>', color, text)
    review_count.short_description = 'Reviews'

    def mark_as_new_release(self, request, queryset):
        queryset.update(is_new_release=True)
    mark_as_new_release.short_description = "Mark selected books as new releases"

    def mark_as_featured(self, request, queryset):
        queryset.update(is_featured=True)
    mark_as_featured.short_description = "Mark selected books as featured"

    def unmark_as_new_release(self, request, queryset):
        queryset.update(is_new_release=False)
    unmark_as_new_release.short_description = "Unmark selected books as new releases"

    def unmark_as_featured(self, request, queryset):
        queryset.update(is_featured=False)
    unmark_as_featured.short_description = "Unmark selected books as featured"

    fieldsets = (
        (None, {
            'fields': ('title', 'author', 'cover', 'genre')
        }),
        ('Release Information', {
            'fields': ('release_date', 'is_new_release', 'is_featured')
        }),
        ('Review Statistics', {
            'fields': ('average_rating', 'review_count'),
            'classes': ('collapse',)
        }),
    )
