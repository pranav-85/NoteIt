from django.contrib import admin
from django.urls import path, include
from app.views import home
from login.views import login_view
urlpatterns = [
    path('admin/', admin.site.urls),
    path('home/api/', include('app.urls')),
    path('', login_view),
    path('register/', login_view),
    path('api/', include('login.urls')),
    path('register/api/', include('login.urls')),
    path('home/', home, name="home"),
]
