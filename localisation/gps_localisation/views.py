from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Users, GPS
from .serializers import GPSSerializer,UserSerializer
# Create your views here.




class GPSInfo(APIView):
    def post(self,request,*args,**kwargs):
        serializer = GPSSerializer(data=request.data)
        if serializer.is_valid():
                serializer.save()
        return Response({"status": "success"}, status=status.HTTP_201_CREATED)
    
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
       
            

        