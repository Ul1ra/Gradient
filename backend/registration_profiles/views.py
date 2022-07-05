from django.contrib.auth import get_user_model, authenticate
from django.http import HttpResponse
from rest_framework.generics import GenericAPIView, RetrieveAPIView
from rest_framework.response import Response
from .models import Registration_Profile
from .serializers import RegistrationProfilesSerializer
from rest_framework import status

User = get_user_model()


# Create your views here.
class RegisterUserAPIView(GenericAPIView):
    """
    post:
    Register a new user by asking for an email (send email validation code)
    """
    queryset = Registration_Profile
    serializer_class = RegistrationProfilesSerializer
    permission_classes = []

    def post(self, request, *args, **kwargs):
        #get provided email
        email = request.data.get('email')
        exisiting_users = User.objects.filter(email=email)
        existing_regprofiles = Registration_Profile.objects.filter(email=email)
        #check it exists in users or registration profiles before creating new entry
        if exisiting_users:
            return HttpResponse("User profile already exists, please log in to your account")
        elif existing_regprofiles:
            return HttpResponse(f'Registration code already sent: {existing_regprofiles[0].code}')
        else:
            # add new entry to registration profiles and create codes on new entry automatically
            profile, created = Registration_Profile.objects.get_or_create(email=email)
            if created:
                # RUN HERE: trigger email that sends validation code
                return Response(int(profile.code), status=status.HTTP_201_CREATED)
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)


class ValidateUserAPIView(GenericAPIView):
    """
    post:
    Validate a new registered user with a validation code sent by email
    """
    queryset = Registration_Profile
    serializer_class = RegistrationProfilesSerializer
    permission_classes = []

    def post(self, request, *args, **kwargs):

        # get provided data
        email = request.data.get('email')
        username = request.data.get('username')
        code = request.data.get('code')
        password = request.data.get('password')
        password_repeat = request.data.get('password_repeat')
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')

        verification_entry = Registration_Profile.objects.filter(email=email)
        # verify email and code against EmailVerification
        if not password == password_repeat:
            return HttpResponse("Repeated password and password do not match")
        # if verified, add user to database
        if verification_entry and code==verification_entry[0].code:
            user = User.objects.create_user(username, email, password)
            user.first_name = first_name
            user.last_name = last_name
            user.save()
            Registration_Profile.objects.filter(code=code).delete()
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)