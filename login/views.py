from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework.decorators import api_view
from validate_email_address import validate_email
import json

@ensure_csrf_cookie
def get_csrf_token(request):
    return JsonResponse({'csrfToken': get_token(request)})

def login_view(request):
    return render(request, 'login.html')

# @csrf_exempt
def Register(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data['Email']
            password = data['Password']
            first_name = data['FirstName']
            last_name = data['LastName']

            #Check for valid email id
            if not validate_email(email, verify=True):
                return JsonResponse({'error': 'Invalid email id'}, status=400)
            # Check if email already exists
            if User.objects.filter(email=email).exists():
                return JsonResponse({'error': 'Account with this email already exists!'}, status=400)

            # Create a new user
            user = User.objects.create_user(username=email, email=email, password=password, first_name=first_name, last_name=last_name)
            user.save()

            login(request, user)
            return redirect('/home/')


        except KeyError as e:
            return JsonResponse({'error': f'Missing key in JSON data: {e}'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)

# @csrf_exempt
def Login(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            email = data['email']
            password = data['password']

            user = authenticate(request, username=email, password=password)
            print("Im here 333")

            if user is not None:
                login(request, user)
                print("Im here 222")
                return redirect('/home/')
            else:
                return JsonResponse({'error': 'Invalid credentials'}, status=400)
        except KeyError as e:
            return JsonResponse({'error': f'Missing key in JSON data: {e}'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)
    
@api_view(['POST'])
def Logout(request):

    if request.method == 'POST':
        print("holaa")
        logout(request)
        return JsonResponse({'message': 'Logged out successfully'}, status=200)
    
    return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)
