# Generated by Django 5.0.2 on 2024-07-11 18:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='note',
            name='content',
            field=models.CharField(default='', max_length=10000),
        ),
        migrations.AddField(
            model_name='note',
            name='isEditing',
            field=models.BooleanField(default=0),
        ),
        migrations.AddField(
            model_name='note',
            name='pinStatus',
            field=models.BooleanField(default=0),
        ),
        migrations.AlterField(
            model_name='note',
            name='name',
            field=models.CharField(default='untitled', max_length=1000),
        ),
    ]
