# API Documentation

- [Users](#users)
- [User Skills](#user-skills)
- [User Interests](#user-interests)
- [Skills](#skills)
- [Skill Requests](#skill-requests)
- [Notifications](#notifications)
- [Courses](#courses)
- [Authentication](#authentication)

## Users

### 1. Get User Details

- **Endpoint URL**: `/users/user`
- **HTTP Method**: GET
- **Authorization**: JWT Required
- **Description**: Retrieves the details of the currently authenticated user.
- **Responses**:
    - `200 OK`: User details returned.
    - `404 Not Found`: User not found.

### 2. Get All Users

- **Endpoint URL**: `/users/all`
- **HTTP Method**: GET
- **Description**: Retrieves a list of all users.
- **Response**:
    - `200 OK`: Array of user objects returned.

### 3. Create User

- **Endpoint URL**: `/users/create`
- **HTTP Method**: POST
- **Description**: Creates a new user. Requires a request body with user details.
- **Request Body** (`CreateUserDto`):
    - `email`: string (required, must be a valid email)
    - `password`: string (required)
    - `age`: integer (required, minimum 0)
    - `gender`: integer (required)
    - `startYear`: integer (required, minimum 1900, maximum current year)
    - `course`: string (required)
- **Example Request Body**:
  ```json
  {
  "email": "newuser@example.com",
  "password": "SecurePassword123",
  "age": 21,
  "gender": 1,
  "startYear": 2022,
  "course": "Computer Science"
  }
  ```
- **Response**:
    - `201 Created`: User created successfully.

### 4. Update User

- **Endpoint URL**: `/users/update`
- **HTTP Method**: PATCH
- **Authorization**: JWT Required
- **Description**: Updates details of the currently authenticated user. Requires certain parameters in the request body.
- **Request Body**:
    - `age`: number (required)
    - `gender`: number (required)
    - `yearOfStudy`: number (required)
    - `course`: string (required)
- **Example Request Body**:
  ```json
  {
  "age": 22,
  "gender": 1,
  "yearOfStudy": 3,
  "course": "Information Technology"
  }
  ```
- **Response**:
    - `200 OK`: User updated successfully.

---

## User Skills

### 1. Get All User Skills

- **Endpoint URL**: `/user-skills/all`
- **HTTP Method**: GET
- **Description**: Retrieves a list of all user skills.
- **Responses**:
    - `200 OK`: List of user skills returned.

### 2. Get User Skills By User ID

- **Endpoint URL**: `/user-skills/user`
- **HTTP Method**: GET
- **Authorization**: JWT Required
- **Description**: Retrieves the skills of the currently authenticated user.
- **Responses**:
    - `200 OK`: User skills returned.

### 3. Get Advanced Skills

- **Endpoint URL**: `/user-skills/dashboard`
- **HTTP Method**: GET
- **Authorization**: JWT Required
- **Description**: Retrieves skills that match the interests of the currently authenticated user.
- **Responses**:
    - `200 OK`: Matching skills returned.

### 4. Get Skills By Search Input

- **Endpoint URL**: `/user-skills/dashboard/:searchInput`
- **HTTP Method**: GET
- **Authorization**: JWT Required
- **Description**: Searches for skills based on a given input.
- **Parameter**:
    - `searchInput`: string (required)
- **Responses**:
    - `200 OK`: Search results returned.

### 5. Create User Skill

- **Endpoint URL**: `/user-skills/create`
- **HTTP Method**: POST
- **Authorization**: JWT Required
- **Description**: Creates a new user skill for the authenticated user.
- **Request Body** (`CreateUserSkillDto`):
    - `skillId`: integer (required)
    - `note`: string (required)
    - `skillLevel`: integer (required, min: 0, max: 4)
- **Example Request Body**:
  ```json
  {
  "skillId": 1,
  "note": "Interested in this skill",
  "skillLevel": 2
  }
  ```
- **Responses**:
    - `201 Created`: User skill created successfully.

### 6. Update User Skill

- **Endpoint URL**: `/user-skills/update`
- **HTTP Method**: PATCH
- **Authorization**: JWT Required
- **Description**: Updates a specific skill for the authenticated user.
- **Request Body**:
    - `id`: integer (required)
    - `note`: string (required)
    - `skillLevel`: integer (required)
- **Example Request Body**:
  ```json
  {
  "id": 1,
  "note": "Updated interest in this skill",
  "skillLevel": 3
  }
  ```
- **Responses**:
    - `200 OK`: User skill updated successfully.

### 7. Delete User Skill

- **Endpoint URL**: `/user-skills/delete`
- **HTTP Method**: DELETE
- **Authorization**: JWT Required
- **Description**: Deletes a specific skill for the authenticated user.
- **Request Body**:
    - `id`: integer (required)
- **Example Request Body**:
  ```json
  {
  "id": 1
  }
  ```
- **Responses**:
    - `200 OK`: User skill deleted successfully.

---

## User Interests

### 1. Get All User Interests

- **Endpoint URL**: `/user-interests/all`
- **HTTP Method**: GET
- **Description**: Retrieves a list of all user interests.
- **Responses**:
    - `200 OK`: List of user interests returned.

### 2. Get User Interests By User ID

- **Endpoint URL**: `/user-interests/user`
- **HTTP Method**: GET
- **Authorization**: JWT Required
- **Description**: Retrieves the interests of the currently authenticated user.
- **Responses**:
    - `200 OK`: User interests returned.

### 3. Create User Interest

- **Endpoint URL**: `/user-interests/create`
- **HTTP Method**: POST
- **Authorization**: JWT Required
- **Description**: Creates a new user interest for the authenticated user.
- **Request Body** (`CreateUserInterestDto`):
    - `skillId`: integer (required)
    - `skillLevel`: integer (required, min: 0, max: 4)
- **Example Request Body**:
  ```json
  {
  "skillId": 2,
  "skillLevel": 3
  }
  ```
- **Responses**:
    - `201 Created`: User interest created successfully.

### 4. Update User Interest

- **Endpoint URL**: `/user-interests/update`
- **HTTP Method**: PATCH
- **Authorization**: JWT Required
- **Description**: Updates a specific interest for the authenticated user.
- **Request Body**:
    - `id`: integer (required)
    - `skillLevel`: integer (required, min: 0, max: 4)
- **Example Request Body**:
  ```json
  {
  "id": 1,
  "skillLevel": 2
  }
  ```
- **Responses**:
    - `200 OK`: User interest updated successfully.

### 5. Delete User Interest

- **Endpoint URL**: `/user-interests/delete`
- **HTTP Method**: DELETE
- **Authorization**: JWT Required
- **Description**: Deletes a specific interest for the authenticated user.
- **Request Body**:
    - `id`: integer (required)
- **Example Request Body**:
  ```json
  {
  "id": 1
  }
  ```
- **Responses**:
    - `200 OK`: User interest deleted successfully.

---

## Skills

### 1. Get All Skills

- **Endpoint URL**: `/skills/all`
- **HTTP Method**: GET
- **Description**: Retrieves a list of all skills.
- **Responses**:
    - `200 OK`: List of skills returned.

### 2. Get Skills By Search Input

- **Endpoint URL**: `/skills/search/:input`
- **HTTP Method**: GET
- **Description**: Searches for skills based on a given input string.
- **Parameter**:
    - `input`: string (required, part of URL)
- **Responses**:
    - `200 OK`: Skills matching the search input returned.

---

## Skill Requests

### 1. Get All Skill Requests

- **Endpoint URL**: `/skill-requests/all`
- **HTTP Method**: GET
- **Description**: Retrieves a list of all skill requests.
- **Responses**:
    - `200 OK`: List of skill requests returned.

### 2. Get Skill Requests By User ID

- **Endpoint URL**: `/skill-requests/user`
- **HTTP Method**: GET
- **Authorization**: JWT Required
- **Description**: Retrieves skill requests associated with the currently authenticated user.
- **Responses**:
    - `200 OK`: Skill requests for the user returned.

### 3. Create Skill Request

- **Endpoint URL**: `/skill-requests/create`
- **HTTP Method**: POST
- **Authorization**: JWT Required
- **Description**: Creates a new skill request.
- **Request Body**:
    - `skillId`: integer (required)
    - `recipientId`: integer (required)
    - `note`: string (required)
- **Example Request Body**:
  ```json
  {
  "skillId": 3,
  "recipientId": 2,
  "note": "Interested in learning this skill"
  }
  ```
- **Responses**:
    - `200 OK`: Skill request created successfully.

### 4. Accept Skill Request

- **Endpoint URL**: `/skill-requests/accept`
- **HTTP Method**: POST
- **Authorization**: JWT Required
- **Description**: Accepts a skill request.
- **Request Body**:
    - `requestId`: integer (required)
- **Example Request Body**:
  ```json
  {
  "requestId": 1
  }
  ```
- **Responses**:
    - `200 OK`: Skill request accepted successfully.

### 5. Reject Skill Request

- **Endpoint URL**: `/skill-requests/reject`
- **HTTP Method**: POST
- **Authorization**: JWT Required
- **Description**: Rejects a skill request.
- **Request Body**:
    - `requestId`: integer (required)
- **Example Request Body**:
  ```json
  {
  "requestId": 1
  }
  ```
- **Responses**:
    - `200 OK`: Skill request rejected successfully.

### 6. Report Skill Request

- **Endpoint URL**: `/skill-requests/report`
- **HTTP Method**: POST
- **Authorization**: JWT Required
- **Description**: Reports a skill request.
- **Request Body**:
    - `requestId`: integer (required)
- **Example Request Body**:
  ```json
  {
  "requestId": 1
  }
  ```
- **Responses**:
    - `200 OK`: Skill request reported successfully.

---

## Notifications

### 1. Get All Notifications

- **Endpoint URL**: `/notifications/all`
- **HTTP Method**: GET
- **Description**: Retrieves a list of all notifications.
- **Responses**:
    - `200 OK`: List of notifications returned.

### 2. Get Notifications By User ID

- **Endpoint URL**: `/notifications/user`
- **HTTP Method**: GET
- **Authorization**: JWT Required
- **Description**: Retrieves notifications for the currently authenticated user. If the notification is accepted, it
  includes the sender's name, skill name, and sender's email. Otherwise, it includes only the sender's name and skill
  name.
- **Responses**:
    - `200 OK`: Notifications for the user returned.

### 3. Delete Notification

- **Endpoint URL**: `/notifications/delete`
- **HTTP Method**: POST
- **Authorization**: JWT Required
- **Description**: Deletes a specific notification for the authenticated user.
- **Request Body**:
    - `notificationId`: integer (required)
- **Example Request Body**:
  ```json
  {
  "notificationId": 1
  }
  ```
- **Responses**:
    - `200 OK`: Notification deleted successfully.

---

## Courses

### 1. Get All Courses

- **Endpoint URL**: `/courses`
- **HTTP Method**: GET
- **Description**: Retrieves a list of all available courses.
- **Responses**:
    - `200 OK`: List of courses returned.

### 2. Get Courses By Search

- **Endpoint URL**: `/courses/:search`
- **HTTP Method**: GET
- **Description**: Searches for courses based on a given search string.
- **Parameter**:
    - `search`: string (required, part of URL)
- **Responses**:
    - `200 OK`: List of courses matching the search criteria returned.

---

## Authentication

### 1. Login

- **Endpoint URL**: `/auth/login`
- **HTTP Method**: POST
- **Description**: Authenticates a user and provides an access token.
- **Request Body**:
    - `email`: string (required)
    - `password`: string (required)
- **Example Request Body**:
  ```json
  {
  "email": "user@example.com",
  "password": "password123"
  }
  ```
- **Responses**:
    - `200 OK`: Authentication successful, access token returned.
    - `401 Unauthorized`: Authentication failed.

### 2. Send Email

- **Endpoint URL**: `/auth/send-email`
- **HTTP Method**: POST
- **Description**: Sends an email to the specified recipient for email verification.
- **Request Body**:
    - `recipient`: string (required, email address)
- **Example Request Body**:
  ```json
  {
  "recipient": "recipient@example.com"
  }
  ```
- **Responses**:
    - `200 OK`: Email sent successfully.

### 3. Verify Token

- **Endpoint URL**: `/auth/verify-token`
- **HTTP Method**: POST
- **Description**: Verifies the provided token from the email verification link.
- **Request Body**:
    - `token`: string (required, JWT token)
- **Example Request Body**:
  ```json
  {
  "token": "your-jwt-token-here"
  }
  ```
- **Responses**:
    - `200 OK`: Token is valid, returns decoded data.
    - `400 Bad Request`: Token is invalid.



