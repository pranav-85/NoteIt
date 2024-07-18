from django.urls import path
from .views import notes_list, note_detail, get_user_details
from login.views import Logout
urlpatterns = [
    path('notes/', notes_list, name='notes_list'),
    path('notes/<int:pk>/', note_detail, name='note_detail'),
    path('get_user_details/',get_user_details, name='user_details'),
    path('logout/', Logout, name="logout"),

]