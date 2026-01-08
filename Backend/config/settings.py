"""
Django settings for config project.
"""

from pathlib import Path
import environ

# --------------------------------------------------
# BASE DIR
# --------------------------------------------------
BASE_DIR = Path(__file__).resolve().parent.parent

# --------------------------------------------------
# ENV CONFIG
# --------------------------------------------------
env = environ.Env(
    DEBUG=(bool, False)
)

environ.Env.read_env(BASE_DIR / ".env")

# --------------------------------------------------
# SECURITY
# --------------------------------------------------
SECRET_KEY = env("SECRET_KEY")
DEBUG = env("DEBUG")

ALLOWED_HOSTS = env.list("ALLOWED_HOSTS", default=[])

# --------------------------------------------------
# APPLICATION DEFINITION
# --------------------------------------------------
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / "templates"],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'

# --------------------------------------------------
# DATABASE (AIVEN MYSQL + SSL)
# --------------------------------------------------
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': env("DB_NAME"),
        'USER': env("DB_USER"),
        'PASSWORD': env("DB_PASSWORD"),
        'HOST': env("DB_HOST"),
        'PORT': env("DB_PORT"),
        'OPTIONS': {
            'ssl': {'ssl-mode': 'REQUIRED'},
            'charset': 'utf8mb4',
            'init_command': "SET sql_mode='STRICT_TRANS_TABLES'",
        }
    }
}

# --------------------------------------------------
# PASSWORD VALIDATION
# --------------------------------------------------
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# --------------------------------------------------
# INTERNATIONALIZATION
# --------------------------------------------------
LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True
USE_TZ = True

# --------------------------------------------------
# STATIC FILES
# --------------------------------------------------
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / "staticfiles"

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / "media"

# --------------------------------------------------
# DEFAULT PRIMARY KEY
# --------------------------------------------------
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
