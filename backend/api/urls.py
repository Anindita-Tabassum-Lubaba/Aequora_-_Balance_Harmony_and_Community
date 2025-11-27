from django.urls import path
from .views import ExampleView

urlpatterns = [
    # This exposes the endpoint at: http://localhost:8000/api/examples/
    path('examples/', ExampleView.as_view(), name='example-list'),
]
