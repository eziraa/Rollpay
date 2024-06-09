from django.db import models
from django.contrib.auth.models import User as UserBase
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType


class User(UserBase):
    content_type = models.OneToOneField(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('Employee', object_id)
    profile_picture = models.FileField(
        upload_to='profile_pictures/', null=True, blank=True)
