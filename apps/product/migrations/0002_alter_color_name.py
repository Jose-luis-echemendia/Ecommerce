# Generated by Django 4.2 on 2024-04-09 01:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='color',
            name='name',
            field=models.CharField(choices=[('black', 'black'), ('while', 'while'), ('red', 'red'), ('gray', 'gray'), ('stone', 'stone'), ('yellow', 'yellow'), ('rose', 'rose'), ('purpura', 'purpura')], default='black', max_length=10, unique=True),
        ),
    ]
