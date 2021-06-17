from django.contrib import admin
from .models import Loans, Investments, CreditCard, Banks
# Register your models here.

admin.site.register(Loans)
admin.site.register(Investments)
admin.site.register(CreditCard)
admin.site.register(Banks)


