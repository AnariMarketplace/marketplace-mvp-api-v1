<!-- # Order Service APIs

For the complete API specification, please refer to the [OpenAPI YAML file](../Order%20Service/api-spec/order-v1.yaml).

---

## Create a new Checkout

{% swagger src="./api.yaml" path="/checkout" method="post" %}
[api.yaml](./api.yaml)
{% endswagger %}

---

## Update an existing Checkout

{% swagger src="./api.yaml" path="/checkout" method="put" %}
[api.yaml](./api.yaml)
{% endswagger %} -->

# Order Service APIs

For the complete API specification, please refer to the [OpenAPI YAML file](../order-service/api-spec/order-service.yaml).

## Checkouts

### Retrieve all checkouts

{% swagger src="./api.yaml" path="/checkouts" method="get" %}
[api.yaml](./api.yaml)
{% endswagger %}

### Create a new checkout

{% swagger src="./api.yaml" path="/checkouts" method="post" %}
[api.yaml](./api.yaml)
{% endswagger %}

### Retrieve a specific checkout

{% swagger src="./api.yaml" path="/checkouts/{checkoutId}" method="get" %}
[api.yaml](./api.yaml)
{% endswagger %}

### Update a checkout

{% swagger src="./api.yaml" path="/checkouts/{checkoutId}" method="put" %}
[api.yaml](./api.yaml)
{% endswagger %}

### Delete a checkout

{% swagger src="./api.yaml" path="/checkouts/{checkoutId}" method="delete" %}
[api.yaml](./api.yaml)
{% endswagger %}

## Orders

### Retrieve all orders

{% swagger src="./api.yaml" path="/orders" method="get" %}
[api.yaml](./api.yaml)
{% endswagger %}

### Create a new order

{% swagger src="./api.yaml" path="/orders" method="post" %}
[api.yaml](./api.yaml)
{% endswagger %}

### Retrieve a specific order

{% swagger src="./api.yaml" path="/orders/{orderId}" method="get" %}
[api.yaml](./api.yaml)
{% endswagger %}

### Update an order

{% swagger src="./api.yaml" path="/orders/{orderId}" method="put" %}
[api.yaml](./api.yaml)
{% endswagger %}

### Delete an order

{% swagger src="./api.yaml" path="/orders/{orderId}" method="delete" %}
[api.yaml](./api.yaml)
{% endswagger %}
