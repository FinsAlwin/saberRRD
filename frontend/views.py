from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt
from api.models import Loans, CreditCard, Banks, Investments
from django.contrib.auth.models import User, auth
from django.http import HttpResponse
import json
import requests

def index(request, *args, **kwargs):
    return render(request, 'frontend/index.html')


def fastlink(request, *args, **kwargs):

    yodlee_client_id = "zUpZhenoA6ZTLqVUiN8Lgej0cLXZRl3y"
    yodlee_secret = "Gdk4RH7z3YaCsYL4"
    loginName = 'sbMem6041d34b2f5f41'

    url = f"https://sandbox.api.yodlee.com/ysl/auth/token"

    payload = {'clientId':yodlee_client_id,
                'secret':yodlee_secret}
    headers = {
        'Api-Version': '1.1',
        'Content-Type': 'application/x-www-form-urlencoded',
        'loginName': loginName
    }

    first_response = requests.request("POST", url, headers=headers, data=payload)

    frist_resData = first_response.json()

    dataToken = frist_resData['token']

    accessToken = dataToken['accessToken']

    #accessToken =""
    request.session['accessToken'] = accessToken

    print(accessToken)

    context = {
        'resToken': accessToken,
    }

    return render(request, 'frontend/fastlink.html', context)

@ensure_csrf_cookie
def dataInit(request):

#getting user
    authToken = request.COOKIES.get('token')
    url_login = "http://127.0.0.1:8000/user/api/auth/user"

    payload = {}
    headers = {
        'Api-Version': '1.1',
        'Content-Type': 'application/json',
        'Authorization': f"Token {authToken}"
    }

    response = requests.request("GET", url_login, headers=headers, data=payload)

    resData = response.json()

    dataResid = resData['id']
    username = resData['username']
    user_id = dataResid

    # getting info

    if 'accessToken' in request.session:
        accessToken = request.session['accessToken']

    body_data = json.loads(request.body.decode())
    data = body_data["resData"]

    providerId = data["providerId"]
    providerName = data["providerName"]
    providerAccountId = data["providerAccountId"]

    url = f"https://sandbox.api.yodlee.com/ysl/accounts?providerAccountId={providerAccountId}&include=fullAccountNumber,holder"

    payload = {}
    headers = {
        'Api-Version': '1.1',
        'Content-Type': 'application/vnd.yodlee+json',
        'Authorization': f"Bearer {accessToken}"
    }

    response = requests.request("GET", url, headers=headers, data=payload)

    resData = response.json()

    dataRes = resData['account']

    

    for p in dataRes:
        if p['CONTAINER'] == 'loan':
            accountId = p['id']
            providerAccountId = p['providerAccountId']
            accountName = p['accountName']
            accountStatus = p['accountStatus']
            accountNumber = p['accountNumber']
            aggregationSource = p['aggregationSource']
            isAsset = p['isAsset']

            balance = p['balance']
            balance_currency = balance['currency']
            balance_amount = balance['amount']

            includeInNetWorth = p['includeInNetWorth']
            providerId = p['providerId']
            providerName = p['providerName']
            isManual = p['isManual']
            accountType = p['accountType']
            displayedName = p['displayedName']
            createdDate = p['createdDate']
            interestRateType = p['interestRateType']
            
            lastUpdated = p['lastUpdated']

            originalLoanAmount = p['originalLoanAmount']
            originalLoanAmount_currency = originalLoanAmount['currency']
            originalLoanAmount_amount = originalLoanAmount['amount']

            principalBalance = p['principalBalance']
            principalBalance_currency = principalBalance['currency']
            principalBalance_amount = principalBalance['amount']

            if Loans.objects.filter(owner=user_id, accountId=accountId).exists():
                pass
            else:
                user = User.objects.get(id=user_id)
                save_to_db_loan = Loans(owner=user, 
                                        accountId=accountId,
                                        providerAccountId=providerAccountId,
                                        accountName=accountName, 
                                        accountStatus=accountStatus,
                                        accountNumber=accountNumber, 
                                        aggregationSource = aggregationSource,
                                        isAsset = isAsset,
                                        balance_currency=balance_currency,
                                        balance_amount=balance_amount, 
                                        includeInNetWorth = includeInNetWorth,
                                        isManual = isManual,
                                        providerId=providerId,
                                        providerName=providerName, 
                                        accountType=accountType,
                                        createdDate=createdDate, 
                                        interestRateType=interestRateType,
                                        lastUpdated=lastUpdated,
                                        originalLoanAmount_currency=originalLoanAmount_currency,
                                        originalLoanAmount_amount=originalLoanAmount_amount,
                                        principalBalance_currency=principalBalance_currency,
                                        principalBalance_amount=principalBalance_amount,
                                        displayedName=displayedName)
                save_to_db_loan.save()

        elif p['CONTAINER'] == 'investment':
            accountId = p['id']
            providerAccountId = p['providerAccountId']
            accountName = p['accountName']
            accountStatus = p['accountStatus']
            accountNumber = p['accountNumber']
            aggregationSource = p['aggregationSource']
            isAsset = p['isAsset']

            balance = p['balance']
            balance_currency = balance['currency']
            balance_amount  = balance['amount']

            includeInNetWorth = p['includeInNetWorth']
            providerId = p['providerId']
            providerName = p['providerName']
            accountType = p['accountType']
            createdDate = p['createdDate']
            isManual = p['isManual']

            cash_invs = 'cash'
            if cash_invs in p:
                cash_invs = p['cash']
                cash_invs_currency = cash_invs['currency']
                cash_invs_amount = cash_invs['amount']
            else:
                cash_invs = ""
                cash_invs_currency = ""
                cash_invs_amount = ""

            lastUpdated = p['lastUpdated']
            displayedName = p['displayedName']

            if Investments.objects.filter(owner=user_id, accountId=accountId).exists():
                pass
            else:
                user = User.objects.get(id=user_id)
                save_to_db_investment = Investments(owner=user,
                                                    accountId = accountId,
                                                    providerAccountId=providerAccountId,
                                                    accountName = accountName,
                                                    accountStatus = accountStatus,
                                                    accountNumber = accountNumber,
                                                    aggregationSource = aggregationSource,
                                                    isAsset = isAsset,
                                                    balance_currency = balance_currency,
                                                    balance_amount = balance_amount,
                                                    includeInNetWorth = includeInNetWorth,
                                                    providerId = providerId,
                                                    providerName = providerName,
                                                    isManual = isManual,
                                                    accountType = accountType,
                                                    displayedName = displayedName,
                                                    createdDate = createdDate,
                                                    cash_currency = cash_invs_currency,
                                                    cash_amount = cash_invs_amount,
                                                    lastUpdated = lastUpdated)
                                                                
                save_to_db_investment.save()

        elif p['CONTAINER'] == 'creditCard':
            accountId = p['id']
            providerAccountId = p['providerAccountId']
            accountName = p['accountName']
            accountStatus = p['accountStatus']
            accountNumber = p['accountNumber']
            aggregationSource = p['aggregationSource']
            isAsset = p['isAsset']

            balance = p['balance']
            balance_currency = balance['currency']
            balance_amount = balance['amount']

            includeInNetWorth = p['includeInNetWorth']
            isManual = p['isManual']
            providerId = p['providerId']
            providerName = p['providerName']
            accountType = p['accountType']
            createdDate = p['createdDate']
            cashApr = p['cashApr']

            availableCredit = p['availableCredit']
            availableCreditCurrency = availableCredit['currency']
            availableCreditAmount = availableCredit['amount']
            lastUpdated_cred = p['lastUpdated']

            runningBalance = p['runningBalance']
            runningBalanceCurrency = runningBalance['currency']
            runningBalanceamount = runningBalance['amount']

            if CreditCard.objects.filter(owner=user_id, accountId=accountId).exists():
                pass
            else:
                user = User.objects.get(id=user_id)
                save_to_db_creditCard = CreditCard(owner=user,
                                                    accountId = accountId,
                                                    providerAccountId = providerAccountId,
                                                    accountName = accountName,
                                                    accountStatus = accountStatus,
                                                    accountNumber =accountNumber,
                                                    aggregationSource = aggregationSource,
                                                    isAsset = isAsset,
                                                    balance_currency = balance_currency,
                                                    balance_amount = balance_amount,
                                                    includeInNetWorth = includeInNetWorth,
                                                    providerId = providerId,
                                                    providerName = providerName,
                                                    isManual = isManual,
                                                    accountType = accountType,
                                                    createdDate = createdDate,
                                                    cashApr = cashApr,
                                                    availableCreditCurrency = availableCreditCurrency,
                                                    availableCreditAmount = availableCreditAmount,
                                                    lastUpdated = lastUpdated,
                                                    runningBalanceCurrency = runningBalanceCurrency,
                                                    runningBalanceamount = runningBalanceamount)
                                                                
                save_to_db_creditCard.save()

        elif p['CONTAINER'] == 'bank':
            accountId = p['id']
            providerAccountId = p['providerAccountId']
            accountName = p['accountName']
            accountStatus = p['accountStatus']
            accountNumber = p['accountNumber']
            aggregationSource = p['aggregationSource']
            isAsset = p['isAsset']

            balance = p['balance']
            balance_currency = balance['currency']
            balance_amount = balance['amount']

            includeInNetWorth = p['includeInNetWorth']
            isManual = p['isManual']
            providerId = p['providerId']
            providerName = p['providerName']
            accountType = p['accountType']
            createdDate = p['createdDate']

            currentBalance = p['currentBalance']
            balance_current_currency = currentBalance['currency']
            balance_current_amount = currentBalance['amount']

            lastUpdated = p['lastUpdated']
            displayedName = p['displayedName']

            if Banks.objects.filter(owner=user_id, accountId=accountId).exists():
                pass
            else:
                user = User.objects.get(id=user_id)
                save_to_db_bank = Banks(owner=user, 
                                        accountId = accountId,
                                        providerAccountId = providerAccountId ,
                                        accountName = accountName,
                                        accountStatus = accountStatus,
                                        accountNumber = accountNumber,
                                        aggregationSource = aggregationSource,
                                        isAsset = isAsset,
                                        balance_currency = balance_currency,
                                        balance_amount = balance_amount,
                                        includeInNetWorth = includeInNetWorth,
                                        providerId = providerId,
                                        providerName = providerName,
                                        isManual = isManual,
                                        accountType = accountType,
                                        createdDate = createdDate,
                                        balance_current_currency = balance_current_currency,
                                        balance_current_amount = balance_current_amount,
                                        lastUpdated = lastUpdated,
                                        displayedName = displayedName)
                                                        
                save_to_db_bank.save()



    return HttpResponse(status=200)
