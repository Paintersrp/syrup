# Generated by Django 4.1.3 on 2023-05-29 21:14

import backend.customs
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("landing", "0003_remove_servicetier_features_and_more"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="heroheader",
            name="heading",
        ),
        migrations.RemoveField(
            model_name="heroheader",
            name="text",
        ),
        migrations.AddField(
            model_name="heroheader",
            name="description",
            field=backend.customs.CustomTextField(
                blank=True,
                help_text="Description",
                max_length=500,
                null=True,
                verbose_name="Description",
            ),
        ),
        migrations.AddField(
            model_name="heroheader",
            name="subtitle",
            field=backend.customs.CustomTextField(
                blank=True,
                help_text="Subtitle",
                max_length=500,
                null=True,
                verbose_name="Subtitle",
            ),
        ),
    ]
