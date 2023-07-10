from typing import Optional
import jwt
import logging

from django.http import JsonResponse, HttpResponseForbidden, HttpRequest, HttpResponse
from django.contrib.auth import get_user_model
from django.conf import settings
from django.core.cache import cache


User = get_user_model()


class SyMiddleware:
    """
    Base middleware class that provides common functionality.
    """

    def __init__(self, get_response: callable):
        self.get_response = get_response

    def check_headers_for_user(self, request: HttpRequest) -> Optional[User]:
        """
        Check the request headers for user information.
        Returns the User object if found, else None.
        """

        auth_header = request.headers.get("Authorization")

        if auth_header:
            token = auth_header.split(" ")[1]

            decoded_token = jwt.decode(
                jwt=token, key=settings.SECRET_KEY, algorithms=["HS256"]
            )
            username = decoded_token["user"]
            user = User.objects.get(username=username)

            return user

        return None

    def __call__(self, request: HttpRequest) -> HttpResponse:
        self.process_request(request)
        response = self.get_response(request)

        return response


class JWTMiddleware(SyMiddleware):
    """
    Middleware for JWT authentication.

    This middleware checks the request headers for a JWT token. If found, it decodes the token and
    retrieves the corresponding user from the database. The user object is then added to the request
    as `request.user` for further processing.
    """

    def process_request(self, request: HttpRequest) -> None:
        """
        Process the request and authenticate the user based on JWT token.
        """

        user = self.check_headers_for_user(request)

        if user:
            request.username = user


class RequestLoggingMiddleware(SyMiddleware):
    """
    Middleware for logging incoming requests.

    This middleware logs the details of each incoming request, including the HTTP method, path, and
    user information. The log messages are written to a logger named 'request_logger'.
    """

    def process_request(self, request: HttpRequest) -> None:
        """
        Process the request and log the details.
        """

        user = self.check_headers_for_user(request)

        if not user:
            user = "Anonymous"

        logger = logging.getLogger("request_logger")
        log_message = f"Received request - Method: {request.method}, Path: {request.path}, User: {user}"
        logger.info(log_message)


class RateLimitingMiddleware(SyMiddleware):
    """
    Middleware for rate limiting requests.

    This middleware applies rate limiting to incoming requests. It keeps track of the request count
    for each client IP address within a specified time window. If the request count exceeds a maximum
    limit, a 403 Forbidden response is returned.
    """

    def process_request(self, request: HttpRequest) -> Optional[HttpResponse]:
        """
        Process the request and apply rate limiting.
        Returns 403 Forbidden response if rate limit is exceeded.
        """

        max_requests = 100
        time_window = 60
        cache_key = f"rate_limit:{request.META['REMOTE_ADDR']}"
        request_count = cache.get(cache_key, 0)

        if request_count >= max_requests:
            return HttpResponseForbidden("Rate limit exceeded")

        request_count += 1
        cache.set(cache_key, request_count, time_window)


class Default404ResponseMiddleware:
    """
    Middleware to handle default 404 responses.

    This middleware checks if the response status code is 404 and the content type is 'text/html; charset=utf-8'.
    If so, it constructs a custom JSON response with error details and returns it.
    """

    def __init__(self, get_response: callable):
        self.get_response = get_response

    def __call__(self, request):
        """
        Process the request and handle default 404 responses.
        Returns a custom JSON response for 404 errors.
        """

        response = self.get_response(request)

        if (
            response.status_code == 404
            and response["Content-Type"] == "text/html; charset=utf-8"
        ):
            requested_url = request.build_absolute_uri()
            error_message = (
                f"The requested resource '{request.path_info}' was not found."
            )
            error_description = (
                f"No view function could be found for the URL '{request.path_info}'."
            )
            error_instructions = f"This error may have occurred due to a temporary outage or maintenance. Please check back later or contact our support team if the issue persists."
            error_thanks = "Thank you for using Edgelords!"
            error_response = {
                "error": {
                    "message": error_message,
                    "description": error_description,
                    "instructions": error_instructions,
                    "thanks": error_thanks,
                }
            }

            return JsonResponse(error_response, status=404)

        return response
