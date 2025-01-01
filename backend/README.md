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

## Ride Endpoints

### Create Ride
Endpoint for creating a new ride.

#### Endpoint
```http
POST /rides/create
```

#### Request Body
```json
{
    "pickup": "string",
    "destination": "string",
    "vehicleType": "string"
}
```

#### Validation Rules
- **Pickup**: Minimum 3 characters
- **Destination**: Minimum 3 characters
- **Vehicle Type**: Must be one of: 'auto', 'car', 'moto'

#### Example Request
```json
{
    "pickup": "123 Main St",
    "destination": "456 Elm St",
    "vehicleType": "car"
}
```

#### Success Response
**Code**: 201 Created

**Response Body**:
```json
{
    "ride": {
        "_id": "ride_id",
        "user": "user_id",
        "pickup": "123 Main St",
        "destination": "456 Elm St",
        "fare": 50,
        "status": "pending",
        "otp": "123456"
    }
}
```

#### Error Responses

#### Validation Error
**Code**: 400 Bad Request

**Response Body**:
```json
{
    "errors": [
        {
            "msg": "Invalid pickup address",
            "param": "pickup",
            "location": "body"
        }
    ]
}
```

---

### Get Fare
Endpoint for calculating the fare for a ride.

#### Endpoint
```http
GET /rides/get-fare
```

#### Query Parameters
- **pickup**: string (required)
- **destination**: string (required)

#### Example Request
```
GET /rides/get-fare?pickup=123 Main St&destination=456 Elm St
```

#### Success Response
**Code**: 200 OK

**Response Body**:
```json
{
    "fare": {
        "auto": 30,
        "car": 50,
        "moto": 20
    }
}
```

#### Error Responses

#### Validation Error
**Code**: 400 Bad Request

**Response Body**:
```json
{
    "errors": [
        {
            "msg": "Invalid pickup address",
            "param": "pickup",
            "location": "query"
        }
    ]
}
```

---

### Confirm Ride
Endpoint for confirming a ride.

#### Endpoint
```http
POST /rides/confirm
```

#### Request Body
```json
{
    "rideId": "string"
}
```

#### Validation Rules
- **Ride ID**: Must be a valid MongoDB ObjectId

#### Example Request
```json
{
    "rideId": "60d5ec49f1b2c8b1f8e4e1a1"
}
```

#### Success Response
**Code**: 200 OK

**Response Body**:
```json
{
    "ride": {
        "_id": "ride_id",
        "status": "accepted",
        "captain": "captain_id"
    }
}
```

#### Error Responses

#### Validation Error
**Code**: 400 Bad Request

**Response Body**:
```json
{
    "errors": [
        {
            "msg": "Invalid ride id",
            "param": "rideId",
            "location": "body"
        }
    ]
}
```

---

### Start Ride
Endpoint for starting a ride.

#### Endpoint
```http
GET /rides/start-ride
```

#### Query Parameters
- **rideId**: string (required)
- **otp**: string (required)

#### Example Request
```
GET /rides/start-ride?rideId=60d5ec49f1b2c8b1f8e4e1a1&otp=123456
```

#### Success Response
**Code**: 200 OK

**Response Body**:
```json
{
    "ride": {
        "_id": "ride_id",
        "status": "ongoing"
    }
}
```

#### Error Responses

#### Validation Error
**Code**: 400 Bad Request

**Response Body**:
```json
{
    "errors": [
        {
            "msg": "Invalid ride id",
            "param": "rideId",
            "location": "query"
        }
    ]
}
```

---

### End Ride
Endpoint for ending a ride.

#### Endpoint
```http
POST /rides/end-ride
```

#### Request Body
```json
{
    "rideId": "string"
}
```

#### Validation Rules
- **Ride ID**: Must be a valid MongoDB ObjectId

#### Example Request
```json
{
    "rideId": "60d5ec49f1b2c8b1f8e4e1a1"
}
```

#### Success Response
**Code**: 200 OK

**Response Body**:
```json
{
    "ride": {
        "_id": "ride_id",
        "status": "completed"
    }
}
```

#### Error Responses

#### Validation Error
**Code**: 400 Bad Request

**Response Body**:
```json
{
    "errors": [
        {
            "msg": "Invalid ride id",
            "param": "rideId",
            "location": "body"
        }
    ]
}
```

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

---

## Captain Registration
Endpoint for registering new captains (drivers) in the system.

### Endpoint
```http
POST /captains/register
```

### Request Body
```json
{
    "fullname": {
        "firstname": "string",
        "lastname": "string"
    },
    "email": "string",
    "password": "string",
    "vehicle": {
        "color": "string",
        "plate": "string",
        "capacity": "number",
        "vehicleType": "string"
    }
}
```

### Validation Rules
- **First Name**: Minimum 2 characters
- **Email**: Must be a valid email format
- **Password**: Minimum 8 characters
- **Vehicle Color**: Minimum 3 characters
- **Vehicle Plate**: Minimum 3 characters, must be unique
- **Vehicle Capacity**: Minimum 1
- **Vehicle Type**: Must be one of: 'car', 'bike', 'auto'

### Example Request
```json
{
    "fullname": {
        "firstname": "John",
        "lastname": "Driver"
    },
    "email": "john.driver@example.com",
    "password": "password123",
    "vehicle": {
        "color": "Black",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
    }
}
```

### Success Response
**Code**: 201 Created

**Response Body**:
```json
{
    "captain": {
        "fullname": {
            "firstname": "John",
            "lastname": "Driver"
        },
        "email": "john.driver@example.com",
        "vehicle": {
            "color": "Black",
            "plate": "ABC123",
            "capacity": 4,
            "vehicleType": "car"
        },
        "status": "inactive",
        "_id": "captain_id"
    },
    "token": "JWT_TOKEN_STRING"
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
            "msg": "Full name must be at least 2 characters long",
            "param": "fullname.firstname",
            "location": "body"
        }
    ]
}
```

#### Duplicate Captain
**Code**: 400 Bad Request

**Response Body**:
```json
{
    "message": "Captain already exists"
}
```

### Notes
- The password is automatically hashed before storage
- A JWT token is generated and returned upon successful registration
- The captain's initial status is set to 'inactive'
- Vehicle plate numbers must be unique in the system
- The response will not include the password field

---

## Captain Login
Endpoint for authenticating existing captains.

### Endpoint
```http
POST /captains/login
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
- **Password**: Minimum 8 characters

### Example Request
```json
{
    "email": "john.driver@example.com",
    "password": "password123"
}
```

### Success Response
**Code**: 200 OK

**Response Body**:
```json
{
    "captain": {
        "fullname": {
            "firstname": "John",
            "lastname": "Driver"
        },
        "email": "john.driver@example.com",
        "vehicle": {
            "color": "Black",
            "plate": "ABC123",
            "capacity": 4,
            "vehicleType": "car"
        },
        "status": "inactive",
        "_id": "captain_id"
    },
    "token": "JWT_TOKEN_STRING"
}
```

### Error Responses

#### Invalid Credentials
**Code**: 401 Unauthorized

**Response Body**:
```json
{
    "message": "Invalid email or password"
}
```

### Notes
- A JWT token is generated upon successful login
- The token is set in both the response body and as an HTTP-only cookie
- The response will not include the password field

---

## Get Captain Profile
Endpoint for retrieving the authenticated captain's profile information.

### Endpoint
```http
GET /captains/profile
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
    "captain": {
        "fullname": {
            "firstname": "John",
            "lastname": "Driver"
        },
        "email": "john.driver@example.com",
        "vehicle": {
            "color": "Black",
            "plate": "ABC123",
            "capacity": 4,
            "vehicleType": "car"
        },
        "status": "inactive",
        "_id": "captain_id"
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
- Returns the current authenticated captain's complete profile information
- The response will not include sensitive information like password

---

## Captain Logout
Endpoint for logging out the current captain and invalidating their token.

### Endpoint
```http
GET /captains/logout
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
    "message": "Logout successful"
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
- The token will be added to the blacklist to prevent reuse
- The token blacklist has a 24-hour expiration time
- Clears the authentication cookie if it exists