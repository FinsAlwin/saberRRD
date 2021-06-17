from rest_framework import routers
from .api import LeadViewset, LoanViewset, CreditCardViewset,BanksViewset

router = routers.DefaultRouter()
router.register('api/leads', LeadViewset, 'leads')
router.register('api/loan', LoanViewset, 'loan')
router.register('api/creditcard', CreditCardViewset, 'creditcard')
router.register('api/banks', BanksViewset, 'banks')

urlpatterns = router.urls