# API Documentation

## User Registration
Endpoint for registering new users in the system.

### Endpoint
```http
POST /users/register
```

### Request Body
```json
{
    "fullname": {
        "firstname": "string",
        "lastname": "string"
    },
    "email": "string",
    "password": "string"
}
```

### Validation Rules
- **Email**: Must be a valid email format
- **First Name**: Minimum 2 characters
- **Password**: Minimum 6 characters
- **Last Name**: Minimum 3 characters

### Example Request
```json
{
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "password123"
}
```

### Success Response
**Code**: 201 Created

**Response Body**:
```json
{
    "token": "JWT_TOKEN_STRING",
    "user": {
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.doe@example.com",
        "_id": "user_id"
    }
}
```

### Error Responses

#### Validation Error
**Code**: 400 Bad Request

**Response Body**:
```json
{
    "errors": [
        {
            "msg": "Invalid Email",
            "param": "email",
            "location": "body"
        }
    ]
}
```

### Notes
- The password is automatically hashed before storage
- A JWT token is generated and returned upon successful registration
- The response will not include the password field

---

## User Login
Endpoint for authenticating existing users.

### Endpoint
```http
POST /users/login
```

### Request Body
```json
{
    "email": "string",
    "password": "string"
}
```

### Validation Rules
- **Email**: Must be a valid email format
- **Password**: Minimum 6 characters

### Example Request
```json
{
    "email": "john.doe@example.com",
    "password": "password123"
}
```

### Success Response
**Code**: 200 OK

**Response Body**:
```json
{
    "token": "JWT_TOKEN_STRING",
    "user": {
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.doe@example.com",
        "_id": "user_id"
    }
}
```

### Error Responses

#### Validation Error
**Code**: 400 Bad Request

**Response Body**:
```json
{
    "errors": [
        {
            "msg": "Invalid Email",
            "param": "email",
            "location": "body"
        }
    ]
}
```

#### Authentication Error
**Code**: 401 Unauthorized

**Response Body**:
```json
{
    "message": "Invalid email or password"
}
```

### Notes
- The password is compared with the hashed password stored in the database
- A new JWT token is generated upon successful login
- The response will not include the password field

---

## Get User Profile
Endpoint for retrieving the authenticated user's profile information.

### Endpoint
```http
GET /users/profile
```

### Headers
```
Authorization: Bearer JWT_TOKEN_STRING
```

### Success Response
**Code**: 200 OK

**Response Body**:
```json
{
    "user": {
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.doe@example.com",
        "_id": "user_id"
    }
}
```

### Error Response

#### Authentication Error
**Code**: 401 Unauthorized

**Response Body**:
```json
{
    "message": "Unauthorized"
}
```

### Notes
- Requires a valid JWT token in the Authorization header or cookie
- Returns the current authenticated user's profile information

---

## User Logout
Endpoint for logging out the current user and invalidating their token.

### Endpoint
```http
GET /users/logout
```

### Headers
```
Authorization: Bearer JWT_TOKEN_STRING
```

### Success Response
**Code**: 200 OK

**Response Body**:
```json
{
    "message": "Logged out successfully"
}
```

### Error Response

#### Authentication Error
**Code**: 401 Unauthorized

**Response Body**:
```json
{
    "message": "Unauthorized"
}
```

### Notes
- Requires a valid JWT token in the Authorization header or cookie
- The token will be blacklisted to prevent further use
- Clears the authentication cookie if it exists 