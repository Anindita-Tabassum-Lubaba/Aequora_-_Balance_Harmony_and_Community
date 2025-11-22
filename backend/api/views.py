from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Example
from .serializers import ExampleSerializer

class ExampleView(APIView):
    def get(self, request):
        examples = Example.objects.all()
        serializer = ExampleSerializer(examples, many=True)
        return Response(serializer.data)
