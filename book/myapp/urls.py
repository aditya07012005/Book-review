from django.contrib import admin
from django.urls import path, include


from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home, name="home"),
    path('register/', views.register_view, name="register"),
    path('login/', views.login_view, name="login"),
    path('submit/', views.submit, name="submit"),
    path('logout/', views.logout_view, name="logout"),
    path('genre/<slug:genre_slug>/', views.genre_view, name='genre'),
]