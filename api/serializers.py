from rest_framework import serializers
from .models import Leads, Loans, CreditCard, Banks

#Lead Serialziser

class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Leads
        fields = "__all__"

class LoanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Loans
        fields = "__all__"

class CreditCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreditCard
        fields = "__all__"

class BanksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Banks
        fields = "__all__"