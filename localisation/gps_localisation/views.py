from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Users, GPS
from .serializers import GPSSerializer,UserSerializer
from django.contrib.auth import logout,login,authenticate
from rest_framework.authtoken.models import Token
# Create your views here.




class GPSInfo(APIView):
    def post(self, request, *args, **kwargs):
        serializer = GPSSerializer(data=request.data)
        if serializer.is_valid():
            # Récupérez l'instance `Users` à partir de `personneSuivi_id`
            personne_suivi = serializer.validated_data['personneSuivi_id']
            
            # Vérifiez et supprimez l'ancienne position GPS pour cette `personneSuivi_id`
            previous_gps = GPS.objects.filter(personneSuivi_id=personne_suivi).first()
            if previous_gps:
                previous_gps.delete()
            
            # Sauvegardez la nouvelle position GPS après avoir supprimé l'ancienne
            serializer.save()
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request, format=None):
        gps_info = GPS.objects.all()
        serializer = GPSSerializer(gps_info, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)    
        
        
class UsersInfo(APIView):
    def post(self,request,*args,**kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
                serializer.save()
        return Response({"status": "success"}, status=status.HTTP_201_CREATED)
    
    def get(self,request):
        get_users=Users.objects.all()
        serializer=UserSerializer(get_users,many=True)
        return Response(serializer.data)    
    
    
class LOGIN(APIView):   
    
    def post(self,request):
        print("koko")
        username = request.data.get('username')
        print("username: ",username)
        print("nono")
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)
        print("user contient",user)
        #sa verifi si il y a un valeur dans user on conitnu lalgo
        if user :
            print("on entre dans la parti token")
            token,created=Token.objects.get_or_create(user=user)
            print("token : ",token)
            return Response({'token': token.key}, status=status.HTTP_200_OK)
        else:
            # Si l'authentification échoue, vous devez renvoyer une réponse d'erreur.
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST) 
        
class Logout(APIView):
    def post(self,request):
        logout(request)
        return Response({"tu es bien deconnecter"}, status=status.HTTP_200_OK)            
       
            

        