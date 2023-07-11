from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager
from api.sy_fields import *
from .metadata import *


class CustomUserManager(UserManager):
    def create_user_with_settings(
        self,
        username: str,
        email: str,
        password: str,
        first_name: str,
        last_name: str,
        phone_number: str,
        address: str,
        city: str,
        state: str,
        zip_code: str,
        country: str,
        salt: str,
    ) -> AbstractUser:
        """
        Create a user with the provided settings.

        Args:
            username (str): The username of the user.
            email (str): The email address of the user.
            password (str): The password of the user.
            first_name (str): The first name of the user.
            last_name (str): The last name of the user.
            phone_number (str): The phone number of the user.
            address (str): The address of the user.
            city (str): The city of the user.
            state (str): The state of the user.
            zip_code (str): The zip code of the user.
            country (str): The country of the user.
            salt (str): The salt of the user.

        Returns:
            User: The created user object.
        """

        user = self.create_user(
            username,
            email,
            password,
        )
        user.first_name = first_name
        user.last_name = last_name
        user.phone_number = phone_number
        user.address = address
        user.city = city
        user.state = state
        user.zip_code = zip_code
        user.country = country
        user.salt = salt
        user.save()

        return user


@metadata(**USER_METADATA)
class User(AbstractUser):
    """
    Model representing a user.
    """

    username = SyCharField(
        max_length=255,
        unique=True,
        md_column_count=6,
        verbose_name="Username",
        help_text="Username",
        db_index=True,
    )

    email = SyEmailField(
        unique=True,
        md_column_count=6,
        verbose_name="Email",
        help_text="Email Address",
    )

    first_name = SyCharField(
        max_length=255,
        md_column_count=6,
        verbose_name="First Name",
        help_text="First Name",
    )

    last_name = SyCharField(
        max_length=255,
        md_column_count=6,
        verbose_name="Last Name",
        help_text="Last Name",
    )

    password = SyCharField(
        max_length=255,
        md_column_count=6,
        verbose_name="Password",
        help_text="",
    )

    salt = SyCharField(
        max_length=255,
        null=True,
        md_column_count=6,
        verbose_name="Salt",
        help_text="",
    )

    phone_number = SyCharField(
        max_length=20,
        blank=True,
        md_column_count=6,
        verbose_name="Phone Number",
        help_text="Phone Number",
    )

    address = SyCharField(
        max_length=255,
        blank=True,
        md_column_count=6,
        verbose_name="Address",
        help_text="Address",
    )

    city = SyCharField(
        max_length=100,
        blank=True,
        md_column_count=6,
        verbose_name="City",
        help_text="City",
    )

    state = SyCharField(
        max_length=100,
        blank=True,
        md_column_count=6,
        verbose_name="State",
        help_text="State",
    )

    zip_code = SyCharField(
        max_length=20,
        blank=True,
        md_column_count=6,
        verbose_name="Zipcode",
        help_text="Zip Code",
    )

    country = SyCharField(
        max_length=100,
        blank=True,
        md_column_count=6,
        verbose_name="Country",
        help_text="Country",
    )

    objects = CustomUserManager()

    def __str__(self) -> str:
        return self.username

    class Meta:
        verbose_name = "User"
        verbose_name_plural = "Users"


@metadata(**TOKEN_BLACKLIST_METADATA)
class TokenBlacklist(models.Model):
    """
    Model representing a blacklisted token.
    """

    token = SyTextField(
        max_length=500,
        unique=True,
        md_column_count=12,
        verbose_name="Token",
        help_text="Token",
    )

    blacklisted_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Blacklisted At",
        help_text="",
    )

    def __str__(self) -> str:
        return self.token

    class Meta:
        verbose_name = "Token Blacklist"
        verbose_name_plural = "Token Blacklist"
