# User Service APIs

For the complete API specification, please refer to the [OpenAPI YAML file](../user-service/api-spec/user-service.yaml).

## Users

### Retrieve all users

{% swagger src="./api.yaml" path="/users" method="get" %}
[api.yaml](./api.yaml)
{% endswagger %}

### Create a new user

{% swagger src="./api.yaml" path="/users" method="post" %}
[api.yaml](./api.yaml)
{% endswagger %}

### Retrieve a specific user

{% swagger src="./api.yaml" path="/users/{userId}" method="get" %}
[api.yaml](./api.yaml)
{% endswagger %}

### Update a user

{% swagger src="./api.yaml" path="/users/{userId}" method="put" %}
[api.yaml](./api.yaml)
{% endswagger %}

### Delete a user

{% swagger src="./api.yaml" path="/users/{userId}" method="delete" %}
[api.yaml](./api.yaml)
{% endswagger %}

## Sellers

### Retrieve all sellers

{% swagger src="./api.yaml" path="/sellers" method="get" %}
[api.yaml](./api.yaml)
{% endswagger %}

### Create a new seller

{% swagger src="./api.yaml" path="/sellers" method="post" %}
[api.yaml](./api.yaml)
{% endswagger %}

### Retrieve a specific seller

{% swagger src="./api.yaml" path="/sellers/{sellerId}" method="get" %}
[api.yaml](./api.yaml)
{% endswagger %}

### Update a seller

{% swagger src="./api.yaml" path="/sellers/{sellerId}" method="put" %}
[api.yaml](./api.yaml)
{% endswagger %}

### Delete a seller

{% swagger src="./api.yaml" path="/sellers/{sellerId}" method="delete" %}
[api.yaml](./api.yaml)
{% endswagger %}

## Drivers

### Retrieve all drivers

{% swagger src="./api.yaml" path="/drivers" method="get" %}
[api.yaml](./api.yaml)
{% endswagger %}

### Create a new driver

{% swagger src="./api.yaml" path="/drivers" method="post" %}
[api.yaml](./api.yaml)
{% endswagger %}

### Retrieve a specific driver

{% swagger src="./api.yaml" path="/drivers/{driverId}" method="get" %}
[api.yaml](./api.yaml)
{% endswagger %}

### Update a driver

{% swagger src="./api.yaml" path="/drivers/{driverId}" method="put" %}
[api.yaml](./api.yaml)
{% endswagger %}

### Delete a driver

{% swagger src="./api.yaml" path="/drivers/{driverId}" method="delete" %}
[api.yaml](./api.yaml)
{% endswagger %}

## Drivers Realtime Metadata

### Retrieve all drivers realtime metadata

{% swagger src="./api.yaml" path="/drivers-realtime-metadata" method="get" %}
[api.yaml](./api.yaml)
{% endswagger %}

### Create a driver realtime metadata entry

{% swagger src="./api.yaml" path="/drivers-realtime-metadata" method="post" %}
[api.yaml](./api.yaml)
{% endswagger %}
