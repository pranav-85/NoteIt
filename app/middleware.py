from django.shortcuts import redirect

class RedirectAuthenticatedUserMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.user.is_authenticated and request.path == '/':
            return redirect('/home/')
        if not request.user.is_authenticated and request.path == '/home/':
            return redirect('/')
        return self.get_response(request)
    
