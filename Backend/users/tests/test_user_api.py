import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from users.models import User


@pytest.mark.django_db
class TestUserAuth:

    def test_user_registration(self):
        client = APIClient()
        payload = {
            "email": "test@example.com",
            "username": "testuser",
            "full_name": "Test User",
            "password": "strongpassword123"
        }

        response = client.post("/users/register/", payload)
        assert response.status_code == 201
        assert User.objects.filter(email="test@example.com").exists()

    def test_user_login(self):
        user = User.objects.create_user(
            email="login@test.com",
            username="loginuser",
            full_name="Login User",
            password="password123"
        )

        client = APIClient()
        response = client.post("/users/login/", {
            "email": "login@test.com",
            "password": "password123"
        })

        assert response.status_code == 200
        assert "access" in response.data

    def test_user_profile_authenticated(self):
        user = User.objects.create_user(
            email="me@test.com",
            username="meuser",
            full_name="Me User",
            password="password123"
        )

        client = APIClient()
        login = client.post("/users/login/", {
            "email": "me@test.com",
            "password": "password123"
        })

        token = login.data["access"]
        client.credentials(HTTP_AUTHORIZATION=f"Bearer {token}")

        response = client.get("/users/me/")
        assert response.status_code == 200
        assert response.data["email"] == "me@test.com"
