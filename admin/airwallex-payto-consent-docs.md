========================
CODE SNIPPETS
========================
TITLE: Accept PayTo Payments using Airwallex Native API
DESCRIPTION: This snippet demonstrates the process of accepting PayTo payments through the Airwallex Native API. It involves three main steps: creating and verifying a Payment Consent, confirming a Payment Intent with the verified Payment Consent, and finally querying the status of the Payment Consent.

SOURCE: https://www.airwallex.com/docs/payments__apac__payto-beta__accept-payto-payments

LANGUAGE: JavaScript
CODE:
```
// Step 1: Create and verify a Payment Consent
// This involves making an API call to create a payment consent.
// The response will contain details to verify the consent.

// Example placeholder for creating consent:
// airwallex.createPaymentConsent({
//   amount: '100.00',
//   currency: 'AUD',
//   customer_reference: 'customer-123',
//   payment_method_details: {
//     type: 'payto',
//     payto_details: {
//       payer_identifier: 'payer-id-from-auth'
//     }
//   }
// }).then(response => {
//   // Handle consent creation response and verification
// });

// Step 2: Confirm your Payment Intent with a verified Payment Consent
// Once the Payment Consent is verified, use its details to confirm the Payment Intent.

// Example placeholder for confirming intent:
// airwallex.confirmPaymentIntent({
//   payment_intent_id: 'payment-intent-id',
//   payment_consent_id: 'verified-consent-id'
// }).then(response => {
//   // Handle payment intent confirmation response
// });

// Step 3: Query Payment Consent status
// After confirmation, you can query the status of the Payment Consent.

// Example placeholder for querying status:
// airwallex.getPaymentConsentStatus('consent-id').then(response => {
//   // Handle payment consent status response
// });
```

----------------------------------------

TITLE: Create Airwallex Payment Consent Response
DESCRIPTION: This JSON response confirms the creation of a payment consent with Airwallex. It provides the consent ID, request ID, customer ID, status, timestamps, client secret, and the terms of use details.

SOURCE: https://www.airwallex.com/docs/payments__apac__payto-beta__accept-payto-payments

LANGUAGE: JSON
CODE:
```
{
    "id": "cst_sgstp25tzh02sf1sqw1",
    "request_id": "1095ab57-ef64-4120-9a84-8a451172184f",
    "customer_id": "cus_sgstpsxv8h02sf0bof8",
    "next_triggered_by": "merchant",
    "merchant_trigger_reason": "scheduled",
    "status": "REQUIRES_PAYMENT_METHOD",
    "created_at": "2024-09-19T09:24:11+0000",
    "updated_at": "2024-09-19T09:24:11+0000",
    "client_secret": "eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MjY3Mzc4NTEsImV4cCI6MTcyNjc0MTQ1MSwidHlwZSI6ImNsaWVudC1zZWNyZXQiLCJwYWRjIjoiU0ciLCJhY2NvdW50X2lkIjoiODNlNDYwZDYtYmJkMC00MmU3LTkzZDQtYTllOWVmMDIwNWZmIiwiY29uc2VudF9pZCI6ImNzdF9zZ3N0cDI1dHpoMDJzZjFzcXcxIn0.oFX2UMxZBDkkg-AvLOLVoLz2NrmTm7UWhalRIprlG2g",
    "terms_of_use": {
        "version": "1.0",
        "accepted_at": "2024-09-19T09:24:11+0000",
        "payment_amount_type": "VARIABLE",
        "max_payment_amount": 400,
        "payment_schedule": {
            "period": 1,
            "period_unit": "WEEK"
        },
        "billing_cycle_charge_day": 3,
        "start_date": "2024-10-20"
    },
    "purpose": "recurring"
}
```

----------------------------------------

TITLE: Verify Airwallex Payment Consent Request
DESCRIPTION: This JSON request is used to verify a payment consent with Airwallex, typically after a customer authorizes it. It includes the payment method details (type, payto information) and return URL.

SOURCE: https://www.airwallex.com/docs/payments__apac__payto-beta__accept-payto-payments

LANGUAGE: JSON
CODE:
```
{
    "request_id": "{{$guid}}",
    "payment_method": {
        "type": "payto",
        "payto": {
            "pay_id": {
                "owner_email": "testxyz@test.com"
            }
        }
    },
    "descriptor": "Airwallex",
    "return_url": "https://www.airwallex.com"
}
```

----------------------------------------

TITLE: Confirm Payment Intent with PayTo Request (JSON)
DESCRIPTION: Example JSON request to confirm a Payment Intent using the PayTo payment method. Includes payment consent ID and PayTo specific details.

SOURCE: https://www.airwallex.com/docs/payments__apac__payto-beta__accept-payto-payments

LANGUAGE: JSON
CODE:
```
{
  "request_id": "958e51a6-685e-4c8c-a4f7-e98fca26fc5e,
  "payment_consent_id": "cst_sgstp25tzh02smzbczv",
  "payment_method": {
    "type": "payto",
    "payto": {
        "pay_id": {
            "owner_email": "test@airwallex.com"
        }
    }
  }
}
```

----------------------------------------

TITLE: Create Airwallex Payment Consent Request
DESCRIPTION: This JSON request is used to create a payment consent with Airwallex. It includes details such as customer ID, merchant trigger reason, terms of use (payment amount type, schedule, billing cycle, dates), and the next trigger.

SOURCE: https://www.airwallex.com/docs/payments__apac__payto-beta__accept-payto-payments

LANGUAGE: JSON
CODE:
```
{
    "request_id": "1095ab57-ef64-4120-9a84-8a451172184f",
    "customer_id": "cus_sgstpsxv8h02sf0bof8",
    "merchant_trigger_reason": "scheduled",
    "terms_of_use": {
            "payment_amount_type": "VARIABLE",
            "payment_schedule": {
                "period": 1,
                "period_unit": "WEEK"
            },
            "billing_cycle_charge_day": 3,
            "max_payment_amount": 400,
            "start_date": "2024-10-20",
            "end_date": "2025-10-20"
    },
    "next_triggered_by": "merchant"
}
```

----------------------------------------

TITLE: Verify Airwallex Payment Consent Response
DESCRIPTION: This JSON response indicates the status of the payment consent verification. It includes the consent ID, request ID, customer ID, payment method details, status, and timestamps.

SOURCE: https://www.airwallex.com/docs/payments__apac__payto-beta__accept-payto-payments

LANGUAGE: JSON
CODE:
```
{
    "id": "cst_sgstp25tzh02sf1sqw1",
    "request_id": "bd5fdd47-4dd4-4371-ac85-3302c4f01900",
    "customer_id": "cus_sgstpsxv8h02sf0bof8",
    "payment_method": {
        "type": "payto",
        "id": "mtd_sgstp25tzh02sf2k5rv",
        "payto": {
            "pay_id": {
                "owner_email": "testxyz@test.com"
            }
        }
    },
    "next_triggered_by": "merchant",
    "merchant_trigger_reason": "scheduled",
    "status": "REQUIRES_CUSTOMER_ACTION",
    "created_at": "2024-09-19T09:24:11+0000",
    "updated_at": "2024-09-19T09:24:13+0000",
    "terms_of_use": {
        "type": "payto",
        "version": "1.0",
        "accepted_at": "2024-09-19T09:24:11+0000",
        "payment_amount_type": "VARIABLE",
        "max_payment_amount": 400,
        "payment_schedule": {
            "period": 1,
            "period_unit": "WEEK"
        },
        "billing_cycle_charge_day": 3,
        "start_date": "2024-10-20"
    }
}
```

----------------------------------------

TITLE: Sample Payment Consent Webhook Payload
DESCRIPTION: This JSON payload represents a sample webhook notification from Airwallex detailing a payment consent event. It includes information such as the creation timestamp, customer ID, consent ID, merchant trigger reason, payment method details, and terms of use.

SOURCE: https://www.airwallex.com/docs/payments__apac__payto-beta__accept-payto-payments

LANGUAGE: JSON
CODE:
```
{
  "data": {
    "object": {
      "created_at": "2024-09-26T07:08:24+0000",
      "customer_id": "cus_sgstwqw2kh0aeil11lh",
      "id": "cst_sgstwqw2kh0aeilaa5r",
      "merchant_trigger_reason": "scheduled",
      "next_triggered_by": "merchant",
      "payment_method": {
        "type": "payto",
        "id": "mtd_sgstwqw2kh0aeilf6ux",
        "payto": {
          "pay_id": {
            "owner_email": "testxyz@test.com"
          }
        }
      },
      "terms_of_use": {
        "type": "payto",
        "version": "1.0",
        "accepted_at": "2024-09-19T09:24:11+0000",
        "payment_amount_type": "VARIABLE",
        "max_payment_amount": 400,
        "payment_schedule": {
          "period": 1,
          "period_unit": "WEEK"
        },
        "billing_cycle_charge_day": 3,
        "start_date": "2024-10-20"
      }
    }
  }
}
```

----------------------------------------

TITLE: Confirm Payment Intent with PayTo Response (JSON)
DESCRIPTION: Example JSON response after confirming a Payment Intent with PayTo. Shows the payment intent status, details of the latest payment attempt, and associated IDs.

SOURCE: https://www.airwallex.com/docs/payments__apac__payto-beta__accept-payto-payments

LANGUAGE: JSON
CODE:
```
{
    "latest_payment_attempt": {
        "id": "att_sgstp25tzh02sn03fsw_mzg314",
        "amount": 100,
        "currency": "AUD",
        "payment_method": {
            "customer_id": "cus_sgstpsxv8h02smz6v8m",
            "type": "payto",
            "payto": {
                "pay_id": {
                    "owner_email": "test@airwallex.com"
                }
            }
        },
        "merchant_order_id": "f9bd2bb0-17ad-40e8-acef-da236490dc7c",
        "payment_intent_id": "int_sgstpsxv8h02smzg314",
        "payment_consent_id": "cst_sgstp25tzh02smzbczv",
        "status": "AUTHENTICATION_REDIRECTED",
        "captured_amount": 0,
        "refunded_amount": 0,
        "created_at": "2024-09-19T09:32:12+0000",
        "updated_at": "2024-09-19T09:32:12+0000",
        "settle_via": "airwallex",
        ...
    },
    "id": "int_sgstpsxv8h02smzg314",
    "request_id": "958e51a6-685e-4c8c-a4f7-e98fca26fc5e",
    "amount": 100,
    "currency": "AUD",
    "merchant_order_id": "f9bd2bb0-17ad-40e8-acef-da236490dc7c"
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

TITLE: Create Payment Consent
DESCRIPTION: Creates a new payment consent. The `payment_method` payload is no longer accepted directly in this request.

SOURCE: https://www.airwallex.com/docs/api_v=2023-08-31

LANGUAGE: HTTP
CODE:
```
POST /api/v1/pa/payment_consents/create
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

SOURCE: https://www.airwallex.com/docs/api_v=2024-09-27

LANGUAGE: HTTP
CODE:
```
POST /api/v1/pa/payment_consents/create
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

TITLE: Create Payment Consent
DESCRIPTION: Creates a new payment consent. The `payment_method` payload is no longer accepted directly in this request.

SOURCE: https://www.airwallex.com/docs/api_v=2022-02-16

LANGUAGE: HTTP
CODE:
```
POST /api/v1/pa/payment_consents/create
```

----------------------------------------

TITLE: Create Payment Consent
DESCRIPTION: Creates a new payment consent. The `payment_method` payload is no longer accepted directly in this request.

SOURCE: https://www.airwallex.com/docs/api_v=2024-01-31

LANGUAGE: HTTP
CODE:
```
POST /api/v1/pa/payment_consents/create
```

----------------------------------------

TITLE: Create Payment Consent
DESCRIPTION: Creates a new payment consent. The `payment_method` payload is no longer accepted directly in this request.

SOURCE: https://www.airwallex.com/docs/api_v=2021-02-28

LANGUAGE: HTTP
CODE:
```
POST /api/v1/pa/payment_consents/create
```

----------------------------------------

TITLE: Create Payment Consent
DESCRIPTION: Creates a new payment consent. The `payment_method` payload is no longer accepted directly in this request.

SOURCE: https://www.airwallex.com/docs/api_v=2024-08-07

LANGUAGE: HTTP
CODE:
```
POST /api/v1/pa/payment_consents/create
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

TITLE: Verify Payment Consent API
DESCRIPTION: API call to verify a payment consent. This is one of the authorization options for a consent, allowing verification before or during the first payment. It requires a request ID, payment method type, and a return URL.

SOURCE: https://www.airwallex.com/docs/payments__global__paypal__paypal-recurring-payments

LANGUAGE: JSON
CODE:
```
{
  "request_id": "139b8ee8-e306-47d6-8d6a-fa586967e5a9",
  "payment_method": {
    "type": "paypal"
  },
  "return_url": "http://return.url"
}
```

----------------------------------------

TITLE: Create Payment Consent
DESCRIPTION: Creates a new payment consent. The `payment_method` payload is no longer accepted directly in this request.

SOURCE: https://www.airwallex.com/docs/api_v=2020-04-30

LANGUAGE: HTTP
CODE:
```
POST /api/v1/pa/payment_consents/create
```

----------------------------------------

TITLE: Update Payment Consent
DESCRIPTION: Updates an existing payment consent. The `payment_method` payload is no longer accepted directly in this request.

SOURCE: https://www.airwallex.com/docs/api/Supporting_Services/Reference_Data/Intro

LANGUAGE: HTTP
CODE:
```
POST /api/v1/pa/payment_consents/{id}/update
```

----------------------------------------

TITLE: Update Payment Consent
DESCRIPTION: Updates an existing payment consent. The `payment_method` payload is no longer accepted directly in this request.

SOURCE: https://www.airwallex.com/docs/api_v=2024-09-27

LANGUAGE: HTTP
CODE:
```
POST /api/v1/pa/payment_consents/{id}/update
```

----------------------------------------

TITLE: Disable Payment Consent API
DESCRIPTION: API to disable a Payment Consent. This revokes the agreement for future payments associated with this consent.

SOURCE: https://www.airwallex.com/docs/api_v=2021-02-28

LANGUAGE: HTTP
CODE:
```
POST /api/v1/pa/payment_consents/{id}/disable
```

----------------------------------------

TITLE: Disable Payment Consent API
DESCRIPTION: API to disable a Payment Consent. This revokes the agreement for future payments associated with this consent.

SOURCE: https://www.airwallex.com/docs/api_v=2023-08-31

LANGUAGE: HTTP
CODE:
```
POST /api/v1/pa/payment_consents/{id}/disable
```

----------------------------------------

TITLE: Update Payment Consent
DESCRIPTION: Updates an existing payment consent. The `payment_method` payload is no longer accepted directly in this request.

SOURCE: https://www.airwallex.com/docs/api_v=2023-08-31

LANGUAGE: HTTP
CODE:
```
POST /api/v1/pa/payment_consents/{id}/update
```

----------------------------------------

TITLE: Pay with Saved Card (Consent Object) - Swift
DESCRIPTION: Initiates a payment using a saved card by providing a payment consent object. This method confirms the payment intent with the consent details.

SOURCE: https://www.airwallex.com/docs/payments__mobile-sdk__guest-user-checkout__ios-airwallex-sdk__low-level-api-integration

LANGUAGE: swift
CODE:
```
paymentSessionHandler.startConsentPayment(with: "payment consent")
```

----------------------------------------

TITLE: Disable Payment Consent API
DESCRIPTION: API to disable a Payment Consent. This revokes the agreement for future payments associated with this consent.

SOURCE: https://www.airwallex.com/docs/api_v=2024-01-31

LANGUAGE: HTTP
CODE:
```
POST /api/v1/pa/payment_consents/{id}/disable
```

----------------------------------------

TITLE: Create Payment Consent with GooglePayButtonElement
DESCRIPTION: Creates a payment consent for subsequent payments using a provided payment method. Requires a client secret.

SOURCE: https://www.airwallex.com/docs/js/payments/googlepaybutton

LANGUAGE: TypeScript
CODE:
```
element.createPaymentConsent({
  client_secret: 'replace-with-your-client-secret',
});
```

----------------------------------------

TITLE: Update Payment Consent
DESCRIPTION: Updates an existing payment consent. The `payment_method` payload is no longer accepted directly in this request.

SOURCE: https://www.airwallex.com/docs/api_v=2024-04-30

LANGUAGE: HTTP
CODE:
```
POST /api/v1/pa/payment_consents/{id}/update
```

----------------------------------------

TITLE: Update Payment Consent
DESCRIPTION: Updates an existing payment consent. The `payment_method` payload is no longer accepted directly in this request.

SOURCE: https://www.airwallex.com/docs/api_v=2021-02-28

LANGUAGE: HTTP
CODE:
```
POST /api/v1/pa/payment_consents/{id}/update
```

----------------------------------------

TITLE: Update Payment Consent
DESCRIPTION: Updates an existing payment consent. The `payment_method` payload is no longer accepted directly in this request.

SOURCE: https://www.airwallex.com/docs/api_v=2022-02-16

LANGUAGE: HTTP
CODE:
```
POST /api/v1/pa/payment_consents/{id}/update
```

----------------------------------------

TITLE: Update Payment Consent
DESCRIPTION: Updates an existing payment consent. The `payment_method` payload is no longer accepted directly in this request.

SOURCE: https://www.airwallex.com/docs/api_v=2024-01-31

LANGUAGE: HTTP
CODE:
```
POST /api/v1/pa/payment_consents/{id}/update
```

----------------------------------------

TITLE: Confirm Payment Intent with Consent Info for Naver Pay
DESCRIPTION: Confirm a Payment Intent with consent information to redirect the shopper for Naver Pay authorization. This includes the payment method type and consent details like trigger and reason.

SOURCE: https://www.airwallex.com/docs/payments__apac__naver-pay-beta__naver-pay-recurring-payments

LANGUAGE: JSON
CODE:
```
{
    "request_id": "{{$guid}}",
    "customer_id": "{{customer_id}}",
    "payment_method": {
        "type": "naver_pay"
    },
    "payment_consent": {
        "next_triggered_by": "merchant",
        "merchant_trigger_reason": "unscheduled"
    }
}
```

----------------------------------------

TITLE: Update Payment Consent
DESCRIPTION: Updates an existing payment consent. The `payment_method` payload is no longer accepted directly in this request.

SOURCE: https://www.airwallex.com/docs/api_v=2024-08-07

LANGUAGE: HTTP
CODE:
```
POST /api/v1/pa/payment_consents/{id}/update
```

----------------------------------------

TITLE: Update Payment Consent
DESCRIPTION: Updates an existing payment consent. The `payment_method` payload is no longer accepted directly in this request.

SOURCE: https://www.airwallex.com/docs/api_v=2020-04-30

LANGUAGE: HTTP
CODE:
```
POST /api/v1/pa/payment_consents/{id}/update
```

----------------------------------------

TITLE: Update Payment Consent
DESCRIPTION: Updates an existing Payment Consent using its unique identifier.

SOURCE: https://www.airwallex.com/docs/api/Supporting_Services/Reference_Data/Intro

LANGUAGE: REST
CODE:
```
POST /api/v1/pa/payment_consents/{id}/update
```

----------------------------------------

TITLE: Create Payment Consent (Google Pay Subscription)
DESCRIPTION: Sample request to create a payment consent for a Google Pay subscription payment. This includes customer details, the payment method ID, and metadata about the payment schedule.

SOURCE: https://www.airwallex.com/docs/payments__global__google-paytm__native-api

LANGUAGE: JSON
CODE:
```
{
"request_id": "c2fc30c4-4a3a-4f7d-ad00-d0e5604335da",
"customer_id": "cus_nlstst8r2gakaxp8zcu",
"payment_method": {
        "type": "googlepay",
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

TITLE: Update Payment Consent API
DESCRIPTION: API to update an existing payment consent. It is part of the Airwallex API.

SOURCE: https://www.airwallex.com/docs/api_v=2022-02-16

LANGUAGE: HTTP
CODE:
```
POST /api/v1/pa/payment_consents/{id}/update
```

----------------------------------------

TITLE: Create Airwallex Payment Consent
DESCRIPTION: Creates a payment consent for a customer, enabling future transactions. This API requires the Customer ID obtained from the customer creation step and specifies the reason for the consent. It returns a Consent ID.

SOURCE: https://www.airwallex.com/docs/payments__north-america-and-latam__eft-pre-authorized-debit__save-bank-details-for-future-payments

LANGUAGE: Shell
CODE:
```
curl --request POST \
--url 'https://api-demo.airwallex.com/api/v1/pa/payment_consents/create' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <your_bearer_token>' \
--data '
{
  "request_id": "8e14085c-7e8f-4a3c-ad19-0f4e2e8fc25e",
  "customer_id": "cus_sgstcsjwdgsxshryfnf",
  "next_triggered_by": "customer",
  "merchant_trigger_reason": "unscheduled"
}
'
```

----------------------------------------

TITLE: Create Payment Intent Request (JSON)
DESCRIPTION: Example JSON request for creating a Payment Intent. Includes details like amount, currency, merchant order ID, and order information with products and shipping.

SOURCE: https://www.airwallex.com/docs/payments__apac__payto-beta__accept-payto-payments

LANGUAGE: JSON
CODE:
```
{
    "request_id": "ac39d2cf-940c-4517-bac0-3601bf533a08",
    "amount": "100",
    "email": "joshua@airwallex.com",
    "phone": "+8617601215488",
    "currency": "AUD",
    "merchant_order_id":"f9bd2bb0-17ad-40e8-acef-da236490dc7c",
    "order": {
        "type": "v_goods",
        "products": [
            {
                "code": "3414314111",
                "name": "IPHONE7",
                "quantity": 5,
                "sku": "piece",
                "type": "physical",
                "unit_price": 100.01,
                "url": "test_url",
                "desc": "test desc"
            }
        ],
        "shipping": {
            "first_name":"violet",
            "last_name":"client",
            "shipping_method": "sameday",
            "address": {
                "country_code": "JP",
                "state": "Shanghai",
                "city": "Shanghai",
                "street": "Pudong District"
            }
        }
    }
}
```

----------------------------------------

TITLE: Create Payment Consent API Request - Shell
DESCRIPTION: This cURL command shows how to create a payment consent using the Airwallex API. It requires the customer ID obtained from the previous step, along with currency, and merchant-defined reasons for the consent.

SOURCE: https://www.airwallex.com/docs/payments__eu-and-uk__sepa-direct-debit__save-bank-details-for-future-payments

LANGUAGE: Shell
CODE:
```
curl --request POST \
--url 'https://api-demo.airwallex.com/api/v1/pa/payment_consents/create' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <your_bearer_token>' \
--data '{ 
    "request_id": "e06ba29c-aabc-4a17-accf-c08fe06f418d", 
    "customer_id": "cus_sgstpkhp5ga4vn7rqyo", 
    "currency": "USD", 
    "next_triggered_by": "merchant", 
    "merchant_trigger_reason": "unscheduled" 
}'
```

----------------------------------------

TITLE: Disable Payment Consent API
DESCRIPTION: API to disable a payment consent. It is part of the Airwallex API.

SOURCE: https://www.airwallex.com/docs/api_v=2022-02-16

LANGUAGE: HTTP
CODE:
```
POST /api/v1/pa/payment_consents/{id}/disable
```

----------------------------------------

TITLE: Manage Payment Consents
DESCRIPTION: Provides endpoints for creating, updating, verifying, and disabling payment consents. Payment consents represent agreements between a merchant and a customer for subsequent payments.

SOURCE: https://www.airwallex.com/docs/api_v=2024-09-27

LANGUAGE: bash
CODE:
```
POST /api/v1/pa/payment_consents/create
GET /api/v1/pa/payment_consents
POST /api/v1/pa/payment_consents/{id}/update
GET /api/v1/pa/payment_consents/{id}
POST /api/v1/pa/payment_consents/{id}/verify
POST /api/v1/pa/payment_consents/{id}/verify_continue
POST /api/v1/pa/payment_consents/{id}/disable
```

----------------------------------------

TITLE: Update Payment Consent API
DESCRIPTION: API to update an existing payment consent. It is part of the Airwallex API.

SOURCE: https://www.airwallex.com/docs/api_v=2020-04-30

LANGUAGE: HTTP
CODE:
```
POST /api/v1/pa/payment_consents/{id}/update
```

----------------------------------------

TITLE: Manage Payment Consents
DESCRIPTION: Provides endpoints for creating, updating, verifying, and disabling payment consents. Payment consents represent agreements between a merchant and a customer for subsequent payments.

SOURCE: https://www.airwallex.com/docs/api_v=2024-04-30

LANGUAGE: bash
CODE:
```
POST /api/v1/pa/payment_consents/create
GET /api/v1/pa/payment_consents
POST /api/v1/pa/payment_consents/{id}/update
GET /api/v1/pa/payment_consents/{id}
POST /api/v1/pa/payment_consents/{id}/verify
POST /api/v1/pa/payment_consents/{id}/verify_continue
POST /api/v1/pa/payment_consents/{id}/disable
```

----------------------------------------

TITLE: Integrate PayTo Direct Debit with Airwallex
DESCRIPTION: This section details the integration of PayTo Direct Debit with Airwallex, covering its availability in Australia and integration options like Hosted Payment Page, Drop-in Element, and Native API.

SOURCE: https://www.airwallex.com/docs/payments__payment-methods-overview

LANGUAGE: text
CODE:
```
| AU | AU | ✅ Hosted Payment Page
✅ Drop-in Element
⛔ Embedded Elements
⛔ Mobile SDK
✅ Native API
```

----------------------------------------

TITLE: List Payment Consents
DESCRIPTION: Retrieves a list of all Payment Consents.

SOURCE: https://www.airwallex.com/docs/api/Supporting_Services/Reference_Data/Intro

LANGUAGE: REST
CODE:
```
GET /api/v1/pa/payment_consents
```

----------------------------------------

TITLE: Manage Payment Consents
DESCRIPTION: Provides endpoints for creating, updating, verifying, and disabling payment consents. Payment consents represent agreements between a merchant and a customer for subsequent payments.

SOURCE: https://www.airwallex.com/docs/api_v=2024-08-07

LANGUAGE: bash
CODE:
```
POST /api/v1/pa/payment_consents/create
GET /api/v1/pa/payment_consents
POST /api/v1/pa/payment_consents/{id}/update
GET /api/v1/pa/payment_consents/{id}
POST /api/v1/pa/payment_consents/{id}/verify
POST /api/v1/pa/payment_consents/{id}/verify_continue
POST /api/v1/pa/payment_consents/{id}/disable
```

----------------------------------------

TITLE: Disable Payment Consent API
DESCRIPTION: API to disable a payment consent. It is part of the Airwallex API.

SOURCE: https://www.airwallex.com/docs/api_v=2020-04-30

LANGUAGE: HTTP
CODE:
```
POST /api/v1/pa/payment_consents/{id}/disable
```

----------------------------------------

TITLE: Verify Payment Consent API
DESCRIPTION: API to verify a payment consent. It is part of the Airwallex API.

SOURCE: https://www.airwallex.com/docs/api_v=2022-02-16

LANGUAGE: HTTP
CODE:
```
POST /api/v1/pa/payment_consents/{id}/verify
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

TITLE: Create Payment Consent API
DESCRIPTION: API to create a payment consent, representing an agreement for subsequent payments. It is part of the Airwallex API.

SOURCE: https://www.airwallex.com/docs/api_v=2022-02-16

LANGUAGE: HTTP
CODE:
```
POST /api/v1/pa/payment_consents/create
```

----------------------------------------

TITLE: Verify Payment Consent API
DESCRIPTION: API to verify a payment consent. It is part of the Airwallex API.

SOURCE: https://www.airwallex.com/docs/api_v=2020-04-30

LANGUAGE: HTTP
CODE:
```
POST /api/v1/pa/payment_consents/{id}/verify
```

----------------------------------------

TITLE: List Payment Consents API
DESCRIPTION: API to list all payment consents. It is part of the Airwallex API.

SOURCE: https://www.airwallex.com/docs/api_v=2022-02-16

LANGUAGE: HTTP
CODE:
```
GET /api/v1/pa/payment_consents
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

TITLE: Create Payment Consent API
DESCRIPTION: API to create a payment consent, representing an agreement for subsequent payments. It is part of the Airwallex API.

SOURCE: https://www.airwallex.com/docs/api_v=2020-04-30

LANGUAGE: HTTP
CODE:
```
POST /api/v1/pa/payment_consents/create
```

----------------------------------------

TITLE: Create Payment Consent for Google Pay
DESCRIPTION: This JSON request is used to create a payment consent with the Airwallex API, linking a customer to a specific payment method (Google Pay). It includes a request ID, customer ID, payment method details, and metadata for triggering future actions like scheduled payments.

SOURCE: https://www.airwallex.com/docs/payments__global__google-paytm__native-api

LANGUAGE: JSON
CODE:
```
{
  "request_id": "c2fc30c4-4a3a-4f7d-ad00-d0e5604335da",
  "customer_id": "cus_nlstst8r2gakaxp8zcu",
  "payment_method": {
    "type": "googlepay",
    "id": "mtd_nlstst8r2gakux44g"
  },
  "next_triggered_by": "merchant",
  "merchant_trigger_reason": "scheduled",
  "metadata": {
    "schedule": "1st of month"
  }
}
```

----------------------------------------

TITLE: Create Payment Intent Response (JSON)
DESCRIPTION: Example JSON response after creating a Payment Intent. Contains the payment intent ID, request ID, amount, currency, and detailed order information.

SOURCE: https://www.airwallex.com/docs/payments__apac__payto-beta__accept-payto-payments

LANGUAGE: JSON
CODE:
```
{
    "id": "int_sgstpsxv8h02smzg314",
    "request_id": "ac39d2cf-940c-4517-bac0-3601bf533a08",
    "amount": 100,
    "currency": "AUD",
    "merchant_order_id": "f9bd2bb0-17ad-40e8-acef-da236490dc7c",
    "order": {
        "type": "v_goods",
        "products": [
            {
                "type": "physical",
                "code": "3414314111",
                "name": "IPHONE7",
                "sku": "piece",
                "quantity": 5,
                "unit_price": 100.01,
                "desc": "test desc",
                "url": "test_url"
            }
        ],
        "shipping": {
            "first_name": "violet",
            "last_name": "client",
            "shipping_method": "sameday",
            "address": {
                "country_code": "JP",
                "state": "Shanghai",
                "city": "Shanghai",
                "street": "Pudong District",
                "postcode": "291201"
            }
        }
    }
}
```

----------------------------------------

TITLE: Retrieve Payment Consent by ID
DESCRIPTION: Retrieves a specific Payment Consent using its unique identifier.

SOURCE: https://www.airwallex.com/docs/api/Supporting_Services/Reference_Data/Intro

LANGUAGE: REST
CODE:
```
GET /api/v1/pa/payment_consents/{id}
```

----------------------------------------

TITLE: List Payment Consents API
DESCRIPTION: API to list all payment consents. It is part of the Airwallex API.

SOURCE: https://www.airwallex.com/docs/api_v=2020-04-30

LANGUAGE: HTTP
CODE:
```
GET /api/v1/pa/payment_consents
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

TITLE: Disable Payment Consent
DESCRIPTION: Disables a Payment Consent using its unique identifier, preventing future payments.

SOURCE: https://www.airwallex.com/docs/api/Supporting_Services/Reference_Data/Intro

LANGUAGE: REST
CODE:
```
POST /api/v1/pa/payment_consents/{id}/disable
```

----------------------------------------

TITLE: Create Payment Consent API Response - JSON
DESCRIPTION: This JSON response details the created payment consent. It includes a unique consent ID, customer ID, status, timestamps, and a client secret for further verification. It also contains mandate details if applicable.

SOURCE: https://www.airwallex.com/docs/payments__eu-and-uk__sepa-direct-debit__save-bank-details-for-future-payments

LANGUAGE: JSON
CODE:
```
{
    "id": "cst_sgstr8wqfga4vna9wc1",
    "request_id": "e06ba29c-aabc-4a17-accf-c08fe06f418d",
    "customer_id": "cus_sgstpkhp5ga4vn7rqyo",
    "next_triggered_by": "merchant",
    "merchant_trigger_reason": "unscheduled",
    "status": "PENDING_VERIFICATION",
    "created_at": "2022-05-26T08:12:30+0000",
    "updated_at": "2022-05-26T08:12:30+0000",
    "client_secret": "eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NTM1NTI3NTEsImV4cCI6MTY1MzU1NjM1MSwiYWNjb3VudF9pZCI6ImRiMGJkMDgzLTlkZDUtNDk3ZC05ZGFkLWI3NGNkOGNiMWE4ZiIsImRhdGFfY2VudGVyX3JlZ2lvbiI6IlNHIiwiY29uc2VudF9pZCI6ImNzdF9zZ3N0cjh3cWZnYTR2bmE5d2MxIiwicGFkYyI6IlNHIn0.gqCk3eANNbn5DX7UpsA6uG8JoXksn3Yy7JSJaVTcqZg",
    "mandate": {
        "accepted_at": "2022-05-26T08:12:30+0000",
        "version": "1.0"
    }
}
```

----------------------------------------

TITLE: Verify Payment Consent
DESCRIPTION: Verifies a Payment Consent using its unique identifier. This is a prerequisite for making payments.

SOURCE: https://www.airwallex.com/docs/api/Supporting_Services/Reference_Data/Intro

LANGUAGE: REST
CODE:
```
POST /api/v1/pa/payment_consents/{id}/verify
```

----------------------------------------

TITLE: Create Payment Consent API
DESCRIPTION: API to create a Payment Consent, representing an agreement for subsequent payments using a provided PaymentMethod. Supports MIT and CIT scenarios.

SOURCE: https://www.airwallex.com/docs/api_v=2024-01-31

LANGUAGE: HTTP
CODE:
```
POST /api/v1/pa/payment_consents/create
```

----------------------------------------

TITLE: Create Payment Consent API
DESCRIPTION: API to create a Payment Consent, representing an agreement for subsequent payments using a provided PaymentMethod. Supports MIT and CIT scenarios.

SOURCE: https://www.airwallex.com/docs/api_v=2023-08-31

LANGUAGE: HTTP
CODE:
```
POST /api/v1/pa/payment_consents/create
```

----------------------------------------

TITLE: Complete Subsequent Naver Pay Payment with Verified Consent
DESCRIPTION: Complete a subsequent recurring payment by confirming the Payment Intent using a verified Payment Consent ID. This API call finalizes the transaction after the shopper's consent is already established.

SOURCE: https://www.airwallex.com/docs/payments__apac__naver-pay-beta__naver-pay-recurring-payments

LANGUAGE: JSON
CODE:
```
{
    "request_id": "ed11e38a-7234-11ea-aa94-7fd44ffd1b89",
    "payment_consent_id": "cst_sgstjgzhsh7hhmj8hr0"
}
```

----------------------------------------

TITLE: Create Payment Consent
DESCRIPTION: Creates a Payment Consent, representing an agreement for subsequent payments. Used for Merchant Initiated Transactions (MIT) and Customer Initiated Transactions (CIT).

SOURCE: https://www.airwallex.com/docs/api/Supporting_Services/Reference_Data/Intro

LANGUAGE: REST
CODE:
```
POST /api/v1/pa/payment_consents/create
```

----------------------------------------

TITLE: Airwallex Payment Consent Creation Response
DESCRIPTION: Example JSON response after creating a payment consent with Airwallex. It includes the consent ID, customer ID, status, and timestamps, along with a client secret for further actions.

SOURCE: https://www.airwallex.com/docs/payments__north-america-and-latam__eft-pre-authorized-debit__save-bank-details-for-future-payments

LANGUAGE: JSON
CODE:
```
{
    "id": "cst_sgstcsjwdgsxshs4isd",
    "request_id": "8e14085c-7e8f-4a3c-ad19-0f4e2e8fc25e",
    "customer_id": "cus_sgstcsjwdgsxshryfnf",
    "next_triggered_by": "customer",
    "merchant_trigger_reason": "unscheduled",
    "metadata": {
        "foo": "bar"
    },
    "status": "PENDING_VERIFICATION",
    "created_at": "2024-01-30T07:07:06+0000",
    "updated_at": "2024-01-30T07:07:06+0000",
    "client_secret": "eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MDY1OTg0MjYsImV4cCI6MTcwNjYwMjAyNiwidHlwZSI6ImNsaWVudC1zZWNyZXQiLCJwYWRjIjoiU0ciLCJhY2NvdW50X2lkIjoiNjgwYjAyOWUtYzA5MC00MTI2LTkzYWMtZmZiYTUwYTZjNmQ3IiwiY29uc2VudF9pZCI6ImNzdF9zZ3N0Y3Nqd2Rnc3hzaHM0aXNkIn0.yctS8xP-vMjys0SJ_rz44g8wY96cDcN_iGIQFWn6BHE",
    "purpose": "recurring"
}
```

----------------------------------------

TITLE: Verify Payment Consent
DESCRIPTION: This API call is used to verify a payment consent without charging the cardholder. Any charged amount will be reversed. It includes verification options with amount, currency, and cryptogram.

SOURCE: https://www.airwallex.com/docs/payments__native-api__network-tokenization

LANGUAGE: json
CODE:
```
{
  "request_id": "88bf9327-0c10-4e87-b050-7c74ef11e1c8",
  "verification_options": {
    "card": {
      "amount": 0.01,
      "currency": "USD",
      "cryptogram": "AgAAAAAAPRpgCwAAmdDBgskAAAA="
    }
  },
  "return_url": "https://requestbin.net/r/b1bhqt2q"
}
```

----------------------------------------

TITLE: Create Payment Consent API
DESCRIPTION: API to create a Payment Consent, representing an agreement for subsequent payments using a provided PaymentMethod. Supports MIT and CIT scenarios.

SOURCE: https://www.airwallex.com/docs/api_v=2021-02-28

LANGUAGE: HTTP
CODE:
```
POST /api/v1/pa/payment_consents/create
```

----------------------------------------

TITLE: Create Payment Consent using Airwallex API
DESCRIPTION: This snippet shows how to create a payment consent using the Airwallex API. It involves a POST request to the payment_consents endpoint, including authentication and a JSON payload with customer details, request ID, next triggered action, connected account ID, and payment method information.

SOURCE: https://www.airwallex.com/docs/payments-for-platforms__process-payments-and-manage-funds__collect-payments-directly

LANGUAGE: shell
CODE:
```
$ curl --request POST \
'https://pci-api-demo.airwallex.com/api/v1/pa/payment_consents/create' \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0b20iLCJyb2xlcyI6WyJ1c2VyIl0sImlhdCI6MTQ4ODQxNTI1NywiZXhwIjoxNDg4NDE1MjY3fQ.UHqau03y5kEk5lFbTp7J4a-U6LXsfxIVNEsux85hj-Q' \
-d'{
  "customer_id": "cus_aag4MsYdcgHc9UTjVUS15WPvmoX",
  "request_id": "88bf9327-0c10-4e87-b050-7c74ef11e1c6",
  "next_triggered_by": "merchant",
  "connected_account_id": "acct_ad1KMcnQM2Wmo2PFSuvR2g"
  "payment_method": {
    "id": "mtd_0eUIICYocwY8prvHWgWoODiGxPP",
    "type": "card"
   }
}'
```

========================
QUESTIONS AND ANSWERS
========================
TOPIC: Accept PayTo Payments with Airwallex Native API
Q: What are the three main steps to accept PayTo payments using Airwallex's Native API integration?
A: The three steps are: 1. Create and verify a Payment Consent, 2. Confirm your Payment Intent with a verified Payment Consent, and 3. Query Payment Consent status.


SOURCE: https://www.airwallex.com/docs/payments__apac__payto-beta__accept-payto-payments

----------------------------------------

TOPIC: PayTo - BETA | Airwallex Docs
Q: Does PayTo support Payments for Platforms?
A: Yes, PayTo supports Payments for Platforms.


SOURCE: https://www.airwallex.com/docs/payments__apac__payto-beta

----------------------------------------

TOPIC: Accept PayTo Payments with Airwallex Native API
Q: Which integration method does Airwallex recommend for accepting PayTo payments?
A: Airwallex recommends using their Native API integration for accepting PayTo payments on your checkout page.


SOURCE: https://www.airwallex.com/docs/payments__apac__payto-beta__accept-payto-payments

----------------------------------------

TOPIC: Accept PayTo Payments with Airwallex Native API
Q: What is the purpose of Airwallex's guide on accepting PayTo payments?
A: This guide describes how to offer PayTo as a payment method on your checkout page using a Native API integration with Airwallex.


SOURCE: https://www.airwallex.com/docs/payments__apac__payto-beta__accept-payto-payments

----------------------------------------

TOPIC: PayTo - BETA | Airwallex Docs
Q: Are disputes (chargebacks) possible with PayTo payments?
A: No, disputes or chargebacks are not possible with PayTo payments.


SOURCE: https://www.airwallex.com/docs/payments__apac__payto-beta

----------------------------------------

TOPIC: PayTo - BETA | Airwallex Docs
Q: Does PayTo support recurring payments and refunds?
A: Yes, PayTo supports both recurring payments and refunds, including partial refunds.


SOURCE: https://www.airwallex.com/docs/payments__apac__payto-beta

----------------------------------------

TOPIC: PayTo - BETA | Airwallex Docs
Q: What is PayTo and what type of payments does it facilitate?
A: PayTo is a real-time Direct Debit payment method available in Australia, designed for both one-time and recurring payments. It allows businesses to collect high-value payments with a low chargeback risk.


SOURCE: https://www.airwallex.com/docs/payments__apac__payto-beta

----------------------------------------

TOPIC: PayTo - BETA | Airwallex Docs
Q: What is the settlement schedule for PayTo payments?
A: The settlement schedule for PayTo payments is T+0, meaning funds are settled on the same day the transaction occurs.


SOURCE: https://www.airwallex.com/docs/payments__apac__payto-beta

----------------------------------------

TOPIC: Airwallex Naver Pay Recurring Payments API Integration
Q: What information is required when confirming a Payment Intent with consent info for Naver Pay?
A: When confirming a Payment Intent with consent info for Naver Pay, you need to include the request ID, customer ID, payment method type set to 'naver_pay', and payment consent details including 'next_triggered_by' and 'merchant_trigger_reason'.


SOURCE: https://www.airwallex.com/docs/payments__apac__naver-pay-beta__naver-pay-recurring-payments

----------------------------------------

TOPIC: PayTo - BETA | Airwallex Docs
Q: Which countries is PayTo currently available for businesses and shoppers?
A: PayTo is available for businesses registered in Australia (AU) and is typically used by payers from Australia.


SOURCE: https://www.airwallex.com/docs/payments__apac__payto-beta