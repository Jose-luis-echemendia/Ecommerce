from django.contrib.auth.models import Group
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status




class GetPermissionsGroupView(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        email_user = request.query_params.get('email_user')
        try:
            # Filtra los grupos que contienen al usuario con el correo electrónico especificado
            groups = Group.objects.filter(user__email=email_user)
            permissions = [group.name for group in groups]
    
            return Response({'permissions': permissions}, status=status.HTTP_200_OK)
        except Group.DoesNotExist:
            return Response({'error': f"error loading permission"}, status=status.HTTP_404_NOT_FOUND)
