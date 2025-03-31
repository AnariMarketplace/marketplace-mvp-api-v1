# Payment Service APIs

For the complete API specification, please refer to the [OpenAPI YAML file](../payment-service/api-spec/payment-service.yaml).

## Payment

### Create Payment Intent

{% swagger src="./api.yaml" path="/start-payment-intent" method="post" %}
[api.yaml](./api.yaml)
{% endswagger %}

## Stripe

### Process Stripe Webhook

{% swagger src="./api.yaml" path="/stripe-webhook" method="post" %}
[api.yaml](./api.yaml)
{% endswagger %}
