from django.contrib import admin
from django.urls import path, include
from app.views import home
from django.views.generic import TemplateView
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('app.urls')),
    path('', home),
    path('', TemplateView.as_view(template_name='index.html')),
]
