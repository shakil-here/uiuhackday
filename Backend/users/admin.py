from django.contrib import admin
from .models import User

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ("email", "username", "full_name", "is_active")
    search_fields = ("email", "username")
    readonly_fields = ()

