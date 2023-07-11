from rest_framework.authentication import TokenAuthentication
from rest_framework import exceptions
from django.conf import settings
import jwt
from .models import User
from typing import Tuple, Optional


class JWTTokenAuthentication(TokenAuthentication):
    def authenticate(self, request) -> Tuple[Optional[User], None]:
        """
        Authenticate the request using JWT token.
        """

        authorization_header = request.headers.get("Authorization")

        if not authorization_header:
            raise exceptions.AuthenticationFailed("Missing authorization header")

        try:
            token = authorization_header.split(" ")[1]
            username = jwt.decode(
                jwt=token, key=settings.SECRET_KEY, algorithms=["HS256"]
            )

        except jwt.exceptions.InvalidTokenError:
            raise exceptions.AuthenticationFailed("Invalid token")

        user = User.objects.get(username=username["user"])

        if not user:
            raise exceptions.AuthenticationFailed("User not found")

        return (user, None)
