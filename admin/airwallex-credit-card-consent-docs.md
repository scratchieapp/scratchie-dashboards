========================
CODE SNIPPETS
========================
TITLE: Pay with Saved Card (Consent Object) - Swift
DESCRIPTION: Initiates a payment using a saved card by providing a payment consent object. This method confirms the payment intent with the consent details.

SOURCE: https://www.airwallex.com/docs/payments__mobile-sdk__guest-user-checkout__ios-airwallex-sdk__low-level-api-integration

LANGUAGE: swift
CODE:
```
paymentSessionHandler.startConsentPayment(with: "payment consent")
```

----------------------------------------

TITLE: CardElement: Create Payment Consent
DESCRIPTION: Creates a Payment Consent, which is an agreement for subsequent payments using a specific payment method. It requires payment consent request data and returns a Promise resolving to a PaymentConsentResponse.

SOURCE: https://www.airwallex.com/docs/js/payments/card

LANGUAGE: TypeScript
CODE:
```
element.createPaymentConsent({
  client_secret: 'replace-with-your-client-secret',
});
```

----------------------------------------

TITLE: Pay with Saved Card (Consent ID) - Swift
DESCRIPTION: Initiates a payment using a saved card by providing a valid payment consent ID. This is applicable when the card is saved as a network token.

SOURCE: https://www.airwallex.com/docs/payments__mobile-sdk__guest-user-checkout__ios-airwallex-sdk__low-level-api-integration

LANGUAGE: swift
CODE:
```
paymentSessionHandler.startConsentPayment(withId: "consent ID")
```

----------------------------------------

TITLE: CardElement: Verify Consent
DESCRIPTION: Verifies a payment consent using the provided request payload. It returns a Promise resolving to a boolean or PaymentConsentResponse.

SOURCE: https://www.airwallex.com/docs/js/payments/card

LANGUAGE: TypeScript
CODE:
```
element.verifyConsent({
  client_secret: 'replace-with-your-client-secret',
  currency: 'replace-with-your-currency',
});
```

----------------------------------------

TITLE: Verify Payment Consent
DESCRIPTION: Verifies a payment consent. The `payment_method` payload can be provided directly in this request. If an existing VERIFIED PaymentConsent references the same card or bank account, the request will be declined.

SOURCE: https://www.airwallex.com/docs/api/Supporting_Services/Reference_Data/Intro

LANGUAGE: HTTP
CODE:
```
POST /api/v1/pa/payment_consents/{id}/verify
```

----------------------------------------

TITLE: Verify Payment Consent
DESCRIPTION: Verifies a payment consent. The `payment_method` payload can be provided directly in this request. If an existing VERIFIED PaymentConsent references the same card or bank account, the request will be declined.

SOURCE: https://www.airwallex.com/docs/api_v=2021-02-28

LANGUAGE: HTTP
CODE:
```
POST /api/v1/pa/payment_consents/{id}/verify
```

----------------------------------------

TITLE: Verify Payment Consent API - Airwallex
DESCRIPTION: Verifies a payment consent through authorization. This can be a zero/supplementary amount for cards or an email verification for direct debit. It can also be completed by confirming a payment intent.

SOURCE: https://www.airwallex.com/docs/payments__native-api__registered-user-checkout

LANGUAGE: JavaScript
CODE:
```
airwallex.paymentConsents.verify("pay_consent_id", {
  transactionType: "VERIFICATION",
  amount: 0,
  currency: "USD"
});
```

LANGUAGE: Java
CODE:
```
Airwallex.paymentConsents().verify("pay_consent_id", VerificationRequest.builder()
  .transactionType(TransactionType.VERIFICATION)
  .amount(0)
  .currency("USD")
  .build());
```

LANGUAGE: Python
CODE:
```
airwallex.payment_consents.verify(
  "pay_consent_id",
  transaction_type="VERIFICATION",
  amount=0,
  currency="USD"
)
```

LANGUAGE: Ruby
CODE:
```
Airwallex.payment_consents.verify("pay_consent_id", {
  transaction_type: "VERIFICATION",
  amount: 0,
  currency: "USD"
})
```

LANGUAGE: PHP
CODE:
```
$airwallex->paymentConsents()->verify(
  "pay_consent_id",
  [
    'transaction_type' => 'VERIFICATION',
    'amount' => 0,
    'currency' => 'USD'
  ]
);
```

----------------------------------------

TITLE: Verify Payment Consent
DESCRIPTION: Verifies a payment consent. The `payment_method` payload can be provided directly in this request. If an existing VERIFIED PaymentConsent references the same card or bank account, the request will be declined.

SOURCE: https://www.airwallex.com/docs/api_v=2020-04-30

LANGUAGE: HTTP
CODE:
```
POST /api/v1/pa/payment_consents/{id}/verify
```

----------------------------------------

TITLE: Verify Payment Consent
DESCRIPTION: Verifies a payment consent. The `payment_method` payload can be provided directly in this request. If an existing VERIFIED PaymentConsent references the same card or bank account, the request will be declined.

SOURCE: https://www.airwallex.com/docs/api_v=2022-02-16

LANGUAGE: HTTP
CODE:
```
POST /api/v1/pa/payment_consents/{id}/verify
```

----------------------------------------

TITLE: Verify Payment Consent
DESCRIPTION: Verifies a payment consent. The `payment_method` payload can be provided directly in this request. If an existing VERIFIED PaymentConsent references the same card or bank account, the request will be declined.

SOURCE: https://www.airwallex.com/docs/api_v=2024-01-31

LANGUAGE: HTTP
CODE:
```
POST /api/v1/pa/payment_consents/{id}/verify
```

----------------------------------------

TITLE: Verify Payment Consent
DESCRIPTION: Verifies a payment consent. The `payment_method` payload can be provided directly in this request. If an existing VERIFIED PaymentConsent references the same card or bank account, the request will be declined.

SOURCE: https://www.airwallex.com/docs/api_v=2024-09-27

LANGUAGE: HTTP
CODE:
```
POST /api/v1/pa/payment_consents/{id}/verify
```

----------------------------------------

TITLE: Verify Payment Consent
DESCRIPTION: Verifies a payment consent. The `payment_method` payload can be provided directly in this request. If an existing VERIFIED PaymentConsent references the same card or bank account, the request will be declined.

SOURCE: https://www.airwallex.com/docs/api_v=2024-04-30

LANGUAGE: HTTP
CODE:
```
POST /api/v1/pa/payment_consents/{id}/verify
```

----------------------------------------

TITLE: Verify Payment Consent
DESCRIPTION: Verifies a payment consent. The `payment_method` payload can be provided directly in this request. If an existing VERIFIED PaymentConsent references the same card or bank account, the request will be declined.

SOURCE: https://www.airwallex.com/docs/api_v=2023-08-31

LANGUAGE: HTTP
CODE:
```
POST /api/v1/pa/payment_consents/{id}/verify
```

----------------------------------------

TITLE: Verify Payment Consent
DESCRIPTION: Verifies a payment consent. The `payment_method` payload can be provided directly in this request. If an existing VERIFIED PaymentConsent references the same card or bank account, the request will be declined.

SOURCE: https://www.airwallex.com/docs/api_v=2024-08-07

LANGUAGE: HTTP
CODE:
```
POST /api/v1/pa/payment_consents/{id}/verify
```

----------------------------------------

TITLE: Verify Payment Consent (TypeScript)
DESCRIPTION: Verifies payment consent by sending necessary data, including a client secret and currency, to the Airwallex API. This function returns a Promise that resolves to a boolean or a `PaymentConsentResponse`.

SOURCE: https://www.airwallex.com/docs/js/payments/card-number

LANGUAGE: TypeScript
CODE:
```
element.verifyConsent({
  client_secret: 'replace-with-your-client-secret',
  currency: 'replace-with-your-currency',
});
```

----------------------------------------

TITLE: CardNumberElement createPaymentConsent()
DESCRIPTION: Creates a Payment Consent, enabling subsequent payments with the provided payment method. It requires a client secret and returns a Promise resolving to PaymentConsentResponse.

SOURCE: https://www.airwallex.com/docs/js/payments/card-number

LANGUAGE: TypeScript
CODE:
```
element.createPaymentConsent({
  client_secret: 'replace-with-your-client-secret',
});
```

----------------------------------------

TITLE: Enable Credit Card Payments in Magento
DESCRIPTION: This snippet outlines the configuration steps within the Magento Admin panel to enable credit card payments via the Airwallex plugin. It involves setting specific options related to credit card acceptance and display.

SOURCE: https://www.airwallex.com/docs/payments__plugins__magento__enable-and-configure-payment-methods__enable-credit-cards-with-apple-pay-and-google-pay

LANGUAGE: PHP
CODE:
```
1. Select **Yes** under **Enable Credit Card**
2. Enter a **Title (required)** and **Description (optional)** seen by the shopper during checkout.
3. Select a Payment Action of an order when the payment associated with the order is to be captured. Select **Authorize only** if you wish to manually capture the payment.
4. Save Config to complete the configuration.
```

----------------------------------------

TITLE: Payment Consent Verified Webhook Payload
DESCRIPTION: This JSON payload represents a successful payment consent verification during the migration process. It includes details like external customer and card IDs, migration source, and timestamps.

SOURCE: https://www.airwallex.com/docs/payments__card-data-migration

LANGUAGE: JSON
CODE:
```
{
  "id": "evt_sgstbz9cvgyb4hrujql_hru85w",
  "name": "payment_consent.created",
  "account_id": "acct_RC1bEJdkPrKHOJp3ilTB5Q",
  "accountId": "acct_RC1bEJdkPrKHOJp3ilTB5Q",
  "data": {
    "object": {
      "additional_info": {
        "external_card_id": "card_edf162abc222",
        "external_customer_id": "cus_abc162def456",
        "migrated_from": "STRIPE"
      },
      "created_at": "2024-07-23T15:33:51+0000",
      "customer_id": "cus_sgstbz9cvgyb4hq327n",
      "id": "cst_sgstbz9cvgyb4hru85w",
      "merchant_trigger_reason": "unscheduled",
      "next_triggered_by": "merchant",
      "payment_method": {
        "card": {
          "billing": {
            "address": {
              "city": "Springfield",
              "country_code": "US",
              "postcode": "01101",
              "state": "MA",
              "street": "162 Main St."
            },
            "first_name": "",
            "last_name": ""
          }
        }
      }
    }
  }
}
```

----------------------------------------

TITLE: Confirm Payment Intent with Payment Consent Reference
DESCRIPTION: This API call is used to charge a cardholder after a payment consent has been created. It references the payment consent ID and includes payment method options with a cryptogram.

SOURCE: https://www.airwallex.com/docs/payments__native-api__network-tokenization

LANGUAGE: json
CODE:
```
{
  "request_id": "88bf9327-0c10-4e87-b050-7c74ef11e1c7",
  "payment_consent_reference": {
    "id": "{{payment_consent_id}}"
  },
  "payment_method_options": {
    "card": {
      "cryptogram": "AgAAAAAAPRpgCwAAmdDBgskAAAA="
    }
  }
}
```

----------------------------------------

TITLE: Credit Card Payment Flow in Magento
DESCRIPTION: Describes the step-by-step process for a shopper to complete a payment using a credit card within the Magento checkout, including 3DS authentication if required.

SOURCE: https://www.airwallex.com/docs/payments__plugins__magento

LANGUAGE: plaintext
CODE:
```
1. Enter credit card details for their chosen Credit Card payment method, and click Complete order or Place order to proceed. 
2. When 3DS is used, the shopper will see the following pop-up window to complete OTP verification.
3. The shopper completes payment successfully and will be redirected to the success page.
```

----------------------------------------

TITLE: Create Payment Consent Request
DESCRIPTION: Creates a payment consent for a customer, specifying the trigger reason and any relevant metadata. This is a prerequisite for verifying the payment.

SOURCE: https://www.airwallex.com/docs/payments__global__apple-pay__native-api

LANGUAGE: json
CODE:
```
{
"request_id": "c2fc30c4-4a3a-4f7d-ad00-d0e5604335da",
"customer_id": "cus_nlstst8r2gakaxp8zcu",
"next_triggered_by": "merchant",
"merchant_trigger_reason": "scheduled",
"metadata": {
      "schedule": "1st of month"
            }
}
```

----------------------------------------

TITLE: Enable Saved Cards Functionality in Magento
DESCRIPTION: This section details how to enable the feature that allows shoppers to save their credit card details for future purchases within the Magento store using the Airwallex plugin. It requires a simple configuration change in the admin panel.

SOURCE: https://www.airwallex.com/docs/payments__plugins__magento__enable-and-configure-payment-methods__enable-credit-cards-with-apple-pay-and-google-pay

LANGUAGE: PHP
CODE:
```
From **Magento Admin** **> Stores > Configuration > Sales > Payment Methods > Airwallex > Configure > Credit Card**
Ensure **Allow shoppers to save cards** is selected as "Yes"
```

----------------------------------------

TITLE: Payment Consent Verification Failed Webhook Payload
DESCRIPTION: This JSON payload indicates a failed payment consent verification during the migration process, likely due to invalid or expired card details provided by the issuer bank.

SOURCE: https://www.airwallex.com/docs/payments__card-data-migration

LANGUAGE: JSON
CODE:
```
{
  "id": "evt_sgstwp7xqgp10aderqo_aaiu8h",
  "name": "payment_consent.verification_failed",
  "version": "2019-09-09",
  "account_id": "acct_9x9hoBr3O9qAZ9KXOWyyPw",
  "created_at": "2023-09-24T14:34:04+0000",
  "data": {
    "object": {
    }
  }
}
```

----------------------------------------

TITLE: Enable Saved Cards in WooCommerce
DESCRIPTION: Instructions for enabling the saved cards feature in WooCommerce via the Airwallex plugin. This allows shoppers to save their card details for future purchases, enhancing the checkout experience.

SOURCE: https://www.airwallex.com/docs/payments__plugins__woocommerce__enable-and-configure-payment-methods__enable-embedded-credit-cards-with-apple-pay-and-google-pay

LANGUAGE: PHP
CODE:
```
Tick **Enable Saved Cards**
Tick **Enable CVV** (if applicable)
```

----------------------------------------

TITLE: Confirm Payment Intent with Payment Consent
DESCRIPTION: Confirms a Payment Intent using a previously created Payment Consent ID. This step is necessary for shoppers who wish to pay for their first order within a payment method binding process.

SOURCE: https://www.airwallex.com/docs/payments__global__apple-pay__use-your-own-certificate

LANGUAGE: JSON
CODE:
```
    {
      "request_id": "c2fc30c4-4a3a-4f7d-ad00-d0e5604335db",
      "payment_consent_id": "cst_nlstst8r2gakb4l54nq"
    }
```

----------------------------------------

TITLE: Enable Airwallex Card Payments in WooCommerce
DESCRIPTION: This section details how to enable Airwallex card payments within the WooCommerce plugin settings. It covers selecting the option to enable card payments, setting the display title, and choosing the capture method.

SOURCE: https://www.airwallex.com/docs/payments__plugins__woocommerce__enable-and-configure-payment-methods__enable-embedded-credit-cards-with-apple-pay-and-google-pay

LANGUAGE: PHP
CODE:
```
Select **Enable Airwallex Card Payments** to enable card payments.
Enter the payment method to be displayed on the payment page in the **Title** field.
Select the checkout form as **Embedded capture immediately** to capture the amount as soon as the shopper pays.
Fill in any other relevant configuration. Click **Save changes** to save your configuration.
```

----------------------------------------

TITLE: Create Payment Consent
DESCRIPTION: Creates a new payment consent. The `payment_method` payload is no longer accepted directly in this request.

SOURCE: https://www.airwallex.com/docs/api/Supporting_Services/Reference_Data/Intro

LANGUAGE: HTTP
CODE:
```
POST /api/v1/pa/payment_consents/create
```

----------------------------------------

TITLE: Create Payment Consent Request
DESCRIPTION: Creates a payment consent for a customer, linking it to a specific payment method and defining merchant trigger reasons and metadata for scheduled payments.

SOURCE: https://www.airwallex.com/docs/payments__global__apple-pay__native-api

LANGUAGE: JSON
CODE:
```
{
      "request_id": "c2fc30c4-4a3a-4f7d-ad00-d0e5604335da",
      "customer_id": "cus_nlstst8r2gakaxp8zcu",
      "payment_method": {
        "type": "applepay",
        "id": "mtd_nlstst8r2gakaxux44g"
      },
      "next_triggered_by": "merchant",
      "merchant_trigger_reason": "scheduled",
      "metadata": {
        "schedule": "1st of month"
      }
    }
```

----------------------------------------

TITLE: Verify Payment Consent (Google Pay)
DESCRIPTION: Example of verifying a payment consent for Google Pay through the Airwallex API. This includes the request ID, verification options specifying currency, and a return URL.

SOURCE: https://www.airwallex.com/docs/payments__global__google-paytm__native-api

LANGUAGE: JSON
CODE:
```
{
   "request_id": "c2fc30c4-4a3a-4f7d-ad00-d0e5604335da",
   "verification_options": {
       "googlepay": {
           "currency": "EUR"
       }
   },
   "return_url": "https://requestbin.net/r/4qu6jux0"
}
```

----------------------------------------

TITLE: Create Payment Consent with Network Tokenization
DESCRIPTION: This API call is used to create a PaymentConsent when a merchant uses Airwallex to store recurring transaction information. It includes card details with network tokenization for future transactions.

SOURCE: https://www.airwallex.com/docs/payments__native-api__network-tokenization

LANGUAGE: json
CODE:
```
{
  "request_id": "88bf9327-0c10-4e87-b050-7c74ef11e1c6",
  "customer_id": "cus_aag4MsYdcgHc9UTjVUS15WPvmoX",
  "payment_method": {
    "type": "card",
    "card": {
      "number": "5442268206556191",
      "expiry_month": "09",
      "expiry_year": "2025",
      "number_type": "EXTERNAL_NETWORK_TOKEN",
      "name": "Adam"
    }
  },
  "currency": "EUR",
  "next_triggered_by": "merchant",
  "requires_cvc": false,
  "merchant_trigger_reason": "unscheduled",
  "metadata": {
    "schedule": "1st of month",
    "amount": "100.0",
    "currency": "CNY"
  }
}
```

----------------------------------------

TITLE: CVC Element Methods - Create Payment Consent
DESCRIPTION: Creates a Payment Consent, which is an agreement for subsequent payments using a provided payment method.

SOURCE: https://www.airwallex.com/docs/js/payments/card-cvc

LANGUAGE: TypeScript
CODE:
```
element.createPaymentConsent({
  client_secret: 'replace-with-your-client-secret',
});
```

----------------------------------------

TITLE: Create Payment Consent
DESCRIPTION: Creates a new payment consent. The `payment_method` payload is no longer accepted directly in this request.

SOURCE: https://www.airwallex.com/docs/api_v=2022-02-16

LANGUAGE: HTTP
CODE:
```
POST /api/v1/pa/payment_consents/create
```

----------------------------------------

TITLE: Accept Payments with Airwallex Gateway
DESCRIPTION: This option allows you to accept credit card payments and other methods through the Airwallex gateway. Airwallex supports a wide range of international and local payment methods for global businesses.

SOURCE: https://www.airwallex.com/docs/payments-for-platforms__understanding-payments-for-platforms



----------------------------------------

TITLE: Confirm Payment Intent - Airwallex API
DESCRIPTION: Confirms a payment intent by submitting the buyer's payment method details, such as card number, expiry, and CVC. This API call requests authorization for the payment.

SOURCE: https://www.airwallex.com/docs/payments__native-api__guest-user-checkout

LANGUAGE: Shell
CODE:
```
curl -X POST \
  https://pci-api.airwallex.com/api/v1/pa/payment_intents/int_kaAB2ImTzoHeHG8TAzNtdr17x7C/confirm \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer your_bearer_token' \
  -d '{ \
  "request_id": "ed11e38a-7234-11ea-aa94-7fd44ffd1b81", \
  "payment_method": { \
        "type": "card", \
        "card": { \
          "number": "4012000300001003", \
          "expiry_month": "01", \
          "expiry_year": "2023",  \
          "cvc": "123", \
          "name": "Adam" \
        } \
    } \
}'
```

----------------------------------------

TITLE: Create Payment Consent
DESCRIPTION: Creates a new payment consent. The `payment_method` payload is no longer accepted directly in this request.

SOURCE: https://www.airwallex.com/docs/api_v=2024-04-30

LANGUAGE: HTTP
CODE:
```
POST /api/v1/pa/payment_consents/create
```

----------------------------------------

TITLE: Create Payment Consent
DESCRIPTION: Creates a new payment consent. The `payment_method` payload is no longer accepted directly in this request.

SOURCE: https://www.airwallex.com/docs/api_v=2023-08-31

LANGUAGE: HTTP
CODE:
```
POST /api/v1/pa/payment_consents/create
```

========================
QUESTIONS AND ANSWERS
========================
TOPIC: Enable Embedded Credit Cards with Apple Pay & Google Pay - Airwallex
Q: What is the shopper experience for Airwallex embedded credit card payments on WooCommerce?
A: Shoppers will see a 'Credit card' payment option directly on the checkout page, where they can enter their card details and complete the payment without leaving the store. If saved cards are enabled, they can also select previously stored cards.


SOURCE: https://www.airwallex.com/docs/payments__plugins__woocommerce__enable-and-configure-payment-methods__enable-embedded-credit-cards-with-apple-pay-and-google-pay

----------------------------------------

TOPIC: Registered User Checkout - Airwallex API Documentation
Q: How can a payment consent be verified when capturing a stored credential for the first time with Airwallex?
A: When capturing a stored credential for the first time with Airwallex, payment consent can be verified in two ways. Option 1 is verification only, where zero or supplementary amounts are submitted for cards, or an email is sent for Direct Debit. Option 2 is verification by completing the first payment using a pre-created payment intent.


SOURCE: https://www.airwallex.com/docs/payments__native-api__registered-user-checkout

----------------------------------------

TOPIC: Enable Credit Cards with Apple Pay & Google Pay - Airwallex
Q: How is the 'Credit Card' payment method configured within the Airwallex Magento plugin?
A: To configure credit card payments, select 'Yes' under 'Enable Credit Card' in the Airwallex payment settings. You must also provide a title that shoppers will see during checkout and optionally a description. You can choose to capture payments immediately or authorize only for manual capture later.


SOURCE: https://www.airwallex.com/docs/payments__plugins__magento__enable-and-configure-payment-methods__enable-credit-cards-with-apple-pay-and-google-pay

----------------------------------------

TOPIC: Airwallex Naver Pay Recurring Payments API Integration
Q: What information is required when confirming a Payment Intent with consent info for Naver Pay?
A: When confirming a Payment Intent with consent info for Naver Pay, you need to include the request ID, customer ID, payment method type set to 'naver_pay', and payment consent details including 'next_triggered_by' and 'merchant_trigger_reason'.


SOURCE: https://www.airwallex.com/docs/payments__apac__naver-pay-beta__naver-pay-recurring-payments

----------------------------------------

TOPIC: Enable Credit Cards with Apple Pay & Google Pay - Airwallex
Q: What is the shopper experience for completing a payment with a credit card via Airwallex on Magento?
A: Shoppers enter their credit card details and proceed to complete the order. If 3D Secure is required, a pop-up window will appear for OTP verification. Shoppers have the option to save their card for future use during this process.


SOURCE: https://www.airwallex.com/docs/payments__plugins__magento__enable-and-configure-payment-methods__enable-credit-cards-with-apple-pay-and-google-pay

----------------------------------------

TOPIC: Desktop Website Browser - Korean Local Cards - Airwallex API
Q: How can merchants accept Korean Local Cards payments on their desktop websites using Airwallex?
A: Merchants can accept Korean Local Cards payments by initializing a Payment Intent with the Create a Payment Intent API, then confirming it with the Confirm a Payment Intent API to obtain a redirect URL. The shopper is then redirected to the Korean Local Cards page via this URL.


SOURCE: https://www.airwallex.com/docs/payments__apac__korean-local-cards-beta__desktop-website-browser-korean-local-cards