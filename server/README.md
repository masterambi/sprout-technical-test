# Server

An application to manage user. This app has :

- RESTful endpoint for user operation
- JSON formatted response

&nbsp;

## User Endpoints

---

## POST /users/login

> Login user

_Request Header_

```
not needed
```

_Request Body_

```
{
  "email": "<email to get insert into>",
  "password": "<password to get insert into>"
}
```

_Response (200 - OK)_

```
{
  "_id": "<user id>",
  "name": "<user name>",
  "phone": "<user phone>",
  "email": "<user email>",
  "access_token": "<user access token given by system>"
}
```

_Response (400 - Bad Request)_

```
{
  "errors": [
    "Invalid email or password"
  ]
}
```

_Response (500 - Internal Server Error)_

```
{
  "errors": [
    "Internal server error"
  ]
}
```

---

## POST /users

> Create new user

_Request Header_

```
not needed
```

_Request Body_

```
{
  "email": "<email to get insert into>",
  "password": "<password to get insert into>",
  "name": "<name to get insert into>",
  "phone": "<phone to get insert into>"
}
```

_Response (201 - Created)_

```
{
  "_id": <given id by system>,
  "name": "<posted name>",
  "phone": "<posted phone>"
  "email": "<posted email>",
  "access_token": "<user access token given by system>"
}
```

_Response (400 - Bad Request)_

```
{
  "errors": [
      "User already exists",
      "Email is required",
      "Password is required",
      "Name is required",
      "Phone is required"
  ]
}
```

_Response (500 - Internal Server Error)_

```
{
  "errors": [
    "Internal server error"
  ]
}
```

---

## GET /users

> Get all users

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
not needed
```

_Response (200 - OK)_

```
[
  {
    "_id": <user id>,
    "name": "<user name>",
    "phone": "<user phone>",
    "email": "<user email>",
    "__v": <user version key>
  },
  ...
]
```

_Response (401 - Unauthorized)_

```
{
  "errors": [
    "Authentication failed"
  ]
}
```

_Response (500 - Internal Server Error)_

```
{
  "errors": [
    "Internal server error"
  ]
}
```

---

## DELETE /users/:id

> Delete user by id

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Params_

```
id: <user id>
```

_Request Body_

```
not needed
```

_Response (200 - OK)_

```
{
  "_id": "<deleted user id>",
  "name": "<deleted user name>",
  "phone": "<deleted user phone>",
  "email": "<deleted user email>",
  "__v": "<deleted user version key>"
}
```

_Response (401 - Unauthorized)_

```
{
  "errors": [
    "Authentication failed"
  ]
}
```

_Response (404 - Not Found)_

```
{
  "errors": [
    "User not found"
  ]
}
```

_Response (500 - Internal Server Error)_

```
{
  "errors": [
    "Internal server error"
  ]
}
```

---
