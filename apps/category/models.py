from django.db import models

# Create your models here.

class Category(models.Model):
    class Meta:
        db_table = ''
        managed = True
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'
        
    parent = models.ForeignKey('self', related_name='children', on_delete=models.CASCADE, blank=True, null=True)
    name = models.CharField(max_length=255, unique=True)

    def __str__(self) -> str:
        return self.name
    