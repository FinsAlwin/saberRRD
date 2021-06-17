from .models import Leads, Loans, CreditCard, Banks
from rest_framework import viewsets, permissions
from .serializers import LeadSerializer, LoanSerializer, CreditCardSerializer, BanksSerializer

#Lead Viewset
class LeadViewset(viewsets.ModelViewSet):
    queryset = Leads.objects.all()
    permissions = [
        permissions.IsAuthenticated,
    ]
    serializer_class = LeadSerializer

    def get_queryset(self):
        return self.request.user.leads.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
        
class LoanViewset(viewsets.ModelViewSet):
    queryset = Loans.objects.all()
    permissions = [
        permissions.IsAuthenticated,
    ]
    serializer_class = LoanSerializer

    def get_queryset(self):
        return self.request.user.loan.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class CreditCardViewset(viewsets.ModelViewSet):
    queryset = CreditCard.objects.all()
    permissions = [
        permissions.IsAuthenticated,
    ]
    serializer_class = CreditCardSerializer

    def get_queryset(self):
        return self.request.user.creditcard.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class BanksViewset(viewsets.ModelViewSet):
    queryset = Banks.objects.all()
    permissions = [
        permissions.IsAuthenticated,
    ]
    serializer_class = BanksSerializer

    def get_queryset(self):
        return self.request.user.banks.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)