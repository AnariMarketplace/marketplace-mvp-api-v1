# Delivery Service APIs

For the complete API specification, please refer to the [OpenAPI YAML file](../delivery-service/api-spec/delivery-service.yaml).

## Pricing Requests

### Retrieve all pricing requests

{% swagger src="./api.yaml" path="/pricing-requests" method="get" %}
[api.yaml](./api.yaml)
{% endswagger %}

### Create a new pricing request

{% swagger src="./api.yaml" path="/pricing-requests" method="post" %}
[api.yaml](./api.yaml)
{% endswagger %}

### Retrieve a specific pricing request

{% swagger src="./api.yaml" path="/pricing-requests/{pricingRequestId}" method="get" %}
[api.yaml](./api.yaml)
{% endswagger %}

### Update a pricing request

{% swagger src="./api.yaml" path="/pricing-requests/{pricingRequestId}" method="put" %}
[api.yaml](./api.yaml)
{% endswagger %}

### Delete a pricing request

{% swagger src="./api.yaml" path="/pricing-requests/{pricingRequestId}" method="delete" %}
[api.yaml](./api.yaml)
{% endswagger %}

## Deliveries

### Retrieve all deliveries

{% swagger src="./api.yaml" path="/deliveries" method="get" %}
[api.yaml](./api.yaml)
{% endswagger %}

### Create a new delivery

{% swagger src="./api.yaml" path="/deliveries" method="post" %}
[api.yaml](./api.yaml)
{% endswagger %}

### Retrieve a specific delivery

{% swagger src="./api.yaml" path="/deliveries/{deliveryId}" method="get" %}
[api.yaml](./api.yaml)
{% endswagger %}

### Update a delivery

{% swagger src="./api.yaml" path="/deliveries/{deliveryId}" method="put" %}
[api.yaml](./api.yaml)
{% endswagger %}

### Delete a delivery

{% swagger src="./api.yaml" path="/deliveries/{deliveryId}" method="delete" %}
[api.yaml](./api.yaml)
{% endswagger %}
