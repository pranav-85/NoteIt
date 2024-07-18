from django.contrib import admin
from django.urls import path, include
from login.views import Login, Register, get_csrf_token
urlpatterns = [
    path('login/', Login, name="Login"),
    path('register/', Register, name="Register"),
    path('get_csrf_token/', get_csrf_token, name='get_csrf_token'),
]