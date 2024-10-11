# REST API  Backend Documentation

This document provides detailed information about the REST API endpoints required for the backend of the MVP version of the web application. The API follows RESTful principles and communicates using JSON.

## Table of Contents

- [API Base URL](#api-base-url)
- [Authentication](#authentication)
- [Error Handling](#error-handling)
- [Endpoints](#endpoints)
  - [Authentication and User Management](#authentication-and-user-management)
    - [Register a New User](#register-a-new-user)
    - [User Login](#user-login)
    - [Password Recovery](#password-recovery)
    - [Get Current User Profile](#get-current-user-profile)
    - [Update User Profile](#update-user-profile)
    - [Logout](#logout)
  - [Conversations](#conversations)
    - [Get Conversation Feed](#get-conversation-feed)
    - [Create a New Conversation](#create-a-new-conversation)
    - [Get Conversation Details](#get-conversation-details)
  - [Comments](#comments)
    - [Get Comments for a Conversation](#get-comments-for-a-conversation)
    - [Add a Comment to a Conversation](#add-a-comment-to-a-conversation)
  - [Topics](#topics)
    - [Get List of Topics](#get-list-of-topics)
  - [Notifications](#notifications)
    - [Get Notifications](#get-notifications)
    - [Mark Notification as Read](#mark-notification-as-read)
  - [Members](#members)
    - [Get List of Members](#get-list-of-members)
    - [Get Member Profile](#get-member-profile)
- [Additional Notes](#additional-notes)

---

## API Base URL

All API endpoints are prefixed with the base URL:

https://yourdomain.com/api/v1

---



## Authentication

- Authentication is handled via JSON Web Tokens (JWT).
- Upon successful login or registration, the server returns a JWT token.
- Clients must include the JWT token in the `Authorization` header for endpoints that require authentication.

**Authorization Header Format:**

Authorization: Bearer <token>

---



## Error Handling

The API uses standard HTTP status codes to indicate the success or failure of an API request.

- `200 OK` - Successful GET, PUT, PATCH, or DELETE request.
- `201 Created` - Successful POST request that resulted in a new resource being created.
- `400 Bad Request` - The request was invalid or cannot be served.
- `401 Unauthorized` - Authentication failed or user does not have permissions.
- `403 Forbidden` - Authentication succeeded but authenticated user does not have access to the resource.
- `404 Not Found` - The requested resource could not be found.
- `500 Internal Server Error` - An error occurred on the server.

Error responses include a JSON object with an `error` message.

**Example Error Response:**

```json
{
  "error": "Invalid email or password."
}
```

---



## Endpoints

### Authentication and User Management

#### Register a New User

**Endpoint:**

```bash
POST /api/v1/auth/register
```

**Description:**

Registers a new user account.

**Request Body:**

```json
{
  "username": "johndoe",
  "email": "johndoe@example.com",
  "password": "SecurePassword123",
  "confirmPassword": "SecurePassword123"
}
```

**Response:**

- **Status Code:** `201 Created`
- **Body:**

```json
{
  "message": "Registration successful.",
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "johndoe@example.com",
    "dateJoined": "2023-10-10T12:00:00Z"
  },
  "token": "<jwt_token>"
}
```

**Notes:**

- Passwords must meet security requirements (e.g., minimum length).
- The `token` can be used for authenticated requests.

------

#### User Login

**Endpoint:**

```bash
POST /api/v1/auth/login
```

**Description:**

Authenticates a user and returns a JWT token.

**Request Body:**

```json
{
  "email": "johndoe@example.com",
  "password": "SecurePassword123"
}
```

**Response:**

- **Status Code:** `200 OK`
- **Body:**

```json
{
  "message": "Login successful.",
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "johndoe@example.com",
    "dateJoined": "2023-10-10T12:00:00Z"
  },
  "token": "<jwt_token>"
}
```

------

#### Password Recovery

**Request Password Reset**

**Endpoint:**

```
POST /api/v1/auth/password-reset/request
```

**Description:**

Sends a password reset email to the user.

**Request Body:**

```json
{
  "email": "johndoe@example.com"
}
```

**Response:**

- **Status Code:** `200 OK`
- **Body:**

```json
{
  "message": "Password reset instructions have been sent to your email."
}
```

------

**Reset Password**

**Endpoint:**

```bash
POST /api/v1/auth/password-reset/confirm
```

**Description:**

Resets the user's password using the token sent via email.

**Request Body:**

```json
{
  "token": "<reset_token>",
  "password": "NewSecurePassword123",
  "confirmPassword": "NewSecurePassword123"
}
```

**Response:**

- **Status Code:** `200 OK`
- **Body:**

```json
{
  "message": "Password has been reset successfully."
}
```

------

#### Get Current User Profile

**Endpoint:**

```bash
GET /api/v1/users/me
```

**Description:**

Retrieves the profile of the currently authenticated user.

**Authentication:**

- Required

**Response:**

- **Status Code:** `200 OK`
- **Body:**

```json
{
  "id": 1,
  "username": "johndoe",
  "email": "johndoe@example.com",
  "dateJoined": "2023-10-10T12:00:00Z",
  "profilePicture": null,
  "bio": "Software developer and tech enthusiast.",
  "lastLogin": "2023-10-15T08:30:00Z"
}
```

------

#### Update User Profile

**Endpoint:**

```bash
PUT /api/v1/users/me
```

**Description:**

Updates the profile information of the currently authenticated user.

**Authentication:**

- Required

**Request Body:**

- Any of the updatable fields.

```json
{
  "username": "john_doe_updated",
  "bio": "Updated bio.",
  "profilePicture": "https://example.com/images/profile.jpg"
}
```

**Response:**

- **Status Code:** `200 OK`
- **Body:**

```json
{
  "message": "Profile updated successfully.",
  "user": {
    "id": 1,
    "username": "john_doe_updated",
    "email": "johndoe@example.com",
    "dateJoined": "2023-10-10T12:00:00Z",
    "profilePicture": "https://example.com/images/profile.jpg",
    "bio": "Updated bio.",
    "lastLogin": "2023-10-15T08:30:00Z"
  }
}
```

------

#### Logout

**Endpoint:**

```bash
POST /api/v1/auth/logout
```

**Description:**

Logs out the currently authenticated user.

**Authentication:**

- Required

**Response:**

- **Status Code:** `200 OK`
- **Body:**

```json
{
  "message": "Logout successful."
}
```

------

### Conversations

#### Get Conversation Feed

**Endpoint:**

```bash
GET /api/v1/conversations
```

**Description:**

Retrieves a paginated list of recent conversations.

**Authentication:**

- Required

**Query Parameters:**

- `page` (integer): Page number (default: 1)
- `limit` (integer): Number of items per page (default: 20)
- `topic` (integer): Filter by topic ID

**Response:**

- **Status Code:** `200 OK`
- **Body:**

```json
{
  "conversations": [
    {
      "id": 10,
      "title": "Latest Tech Trends",
      "content": "Let's discuss the latest in tech...",
      "createdAt": "2023-10-15T10:00:00Z",
      "updatedAt": "2023-10-15T12:00:00Z",
      "user": {
        "id": 2,
        "username": "alice"
      },
      "topic": {
        "id": 1,
        "name": "Technology"
      },
      "commentCount": 5
    },
    // More conversations...
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 100
  }
}
```

------

#### Create a New Conversation

**Endpoint:**

```bash
POST /api/v1/conversations
```

**Description:**

Creates a new conversation.

**Authentication:**

- Required

**Request Body:**

```json
{
  "title": "Question about JavaScript",
  "content": "Can someone explain closures in JavaScript?",
  "topicId": 2
}
```

**Response:**

- **Status Code:** `201 Created`
- **Body:**

```json
{
  "message": "Conversation created successfully.",
  "conversation": {
    "id": 11,
    "title": "Question about JavaScript",
    "content": "Can someone explain closures in JavaScript?",
    "createdAt": "2023-10-15T13:00:00Z",
    "updatedAt": "2023-10-15T13:00:00Z",
    "user": {
      "id": 1,
      "username": "johndoe"
    },
    "topic": {
      "id": 2,
      "name": "Programming"
    }
  }
}
```

**Notes:**

- The `topicId` must be a valid ID of an existing topic.

------

#### Get Conversation Details

**Endpoint:**

```bash
GET /api/v1/conversations/{conversationId}
```

**Description:**

Retrieves details of a specific conversation.

**Authentication:**

- Required

**Path Parameters:**

- `conversationId` (integer): ID of the conversation

**Response:**

- **Status Code:** `200 OK`
- **Body:**

```json
{
  "id": 10,
  "title": "Latest Tech Trends",
  "content": "Let's discuss the latest in tech...",
  "createdAt": "2023-10-15T10:00:00Z",
  "updatedAt": "2023-10-15T12:00:00Z",
  "user": {
    "id": 2,
    "username": "alice"
  },
  "topic": {
    "id": 1,
    "name": "Technology"
  },
  "comments": [
    {
      "id": 101,
      "content": "I think AI is the biggest trend...",
      "createdAt": "2023-10-15T11:00:00Z",
      "user": {
        "id": 3,
        "username": "bob"
      }
    },
    // More comments...
  ]
}
```

**Notes:**

- The `comments` array may be paginated if there are many comments.

------

### Comments

#### Get Comments for a Conversation

**Endpoint:**

```bash
GET /api/v1/conversations/{conversationId}/comments
```

**Description:**

Retrieves comments for a specific conversation.

**Authentication:**

- Required

**Path Parameters:**

- `conversationId` (integer): ID of the conversation

**Query Parameters:**

- `page` (integer): Page number (default: 1)
- `limit` (integer): Number of items per page (default: 20)

**Response:**

- **Status Code:** `200 OK`
- **Body:**

```json
{
  "comments": [
    {
      "id": 101,
      "content": "I think AI is the biggest trend...",
      "createdAt": "2023-10-15T11:00:00Z",
      "user": {
        "id": 3,
        "username": "bob"
      }
    },
    // More comments...
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 3,
    "totalItems": 50
  }
}
```

------

#### Add a Comment to a Conversation

**Endpoint:**

```bash
POST /api/v1/conversations/{conversationId}/comments
```

**Description:**

Adds a new comment to a conversation.

**Authentication:**

- Required

**Path Parameters:**

- `conversationId` (integer): ID of the conversation

**Request Body:**

```json
{
  "content": "Here's my take on the topic..."
}
```

**Response:**

- **Status Code:** `201 Created`
- **Body:**

```json
{
  "message": "Comment added successfully.",
  "comment": {
    "id": 151,
    "content": "Here's my take on the topic...",
    "createdAt": "2023-10-15T14:00:00Z",
    "user": {
      "id": 1,
      "username": "johndoe"
    }
  }
}
```

------

### Topics

#### Get List of Topics

**Endpoint:**

```bash
GET /api/v1/topics
```

**Description:**

Retrieves a list of all available topics.

**Authentication:**

- Required

**Response:**

- **Status Code:** `200 OK`
- **Body:**

```json
{
  "topics": [
    {
      "id": 1,
      "name": "Technology",
      "description": "Discussions about technology."
    },
    {
      "id": 2,
      "name": "Programming",
      "description": "All about coding and development."
    },
    // More topics...
  ]
}
```

------

### Notifications

#### Get Notifications

**Endpoint:**

```bash
GET /api/v1/notifications
```

**Description:**

Retrieves a list of notifications for the authenticated user.

**Authentication:**

- Required

**Query Parameters:**

- `page` (integer): Page number (default: 1)
- `limit` (integer): Number of items per page (default: 20)
- `unread` (boolean): Filter by unread notifications (optional)

**Response:**

- **Status Code:** `200 OK`
- **Body:**

```json
{
  "notifications": [
    {
      "id": 201,
      "type": "reply",
      "message": "alice replied to your comment.",
      "isRead": false,
      "createdAt": "2023-10-15T13:30:00Z",
      "conversation": {
        "id": 10,
        "title": "Latest Tech Trends"
      },
      "comment": {
        "id": 151
      }
    },
    // More notifications...
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 2,
    "totalItems": 30
  }
}
```

------

#### Mark Notification as Read

**Endpoint:**

```bash
POST /api/v1/notifications/{notificationId}/read
```

**Description:**

Marks a notification as read.

**Authentication:**

- Required

**Path Parameters:**

- `notificationId` (integer): ID of the notification

**Response:**

- **Status Code:** `200 OK`
- **Body:**

```json
{
  "message": "Notification marked as read."
}
```

------

### Members

#### Get List of Members

**Endpoint:**

```bash
GET /api/v1/members
```

**Description:**

Retrieves a list of all community members.

**Authentication:**

- Required

**Query Parameters:**

- `page` (integer): Page number (default: 1)
- `limit` (integer): Number of items per page (default: 20)
- `search` (string): Search by username

**Response:**

- **Status Code:** `200 OK`
- **Body:**

```json
{
  "members": [
    {
      "id": 1,
      "username": "johndoe",
      "profilePicture": null,
      "bio": "Software developer and tech enthusiast."
    },
    {
      "id": 2,
      "username": "alice",
      "profilePicture": null,
      "bio": "Passionate about AI and machine learning."
    },
    // More members...
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 100
  }
}
```

------

#### Get Member Profile

**Endpoint:**

```bash
GET /api/v1/members/{memberId}
```

**Description:**

Retrieves the profile of a specific member.

**Authentication:**

- Required

**Path Parameters:**

- `memberId` (integer): ID of the member

**Response:**

- **Status Code:** `200 OK`
- **Body:**

```json
{
  "id": 2,
  "username": "alice",
  "profilePicture": null,
  "bio": "Passionate about AI and machine learning.",
  "dateJoined": "2023-09-20T09:00:00Z"
}
```

------

## Additional Notes

- All timestamps are in ISO 8601 format (`YYYY-MM-DDTHH:MM:SSZ`).
- For endpoints that support pagination, the `pagination` object includes `currentPage`, `totalPages`, and `totalItems`.
- Authentication is required for all endpoints except registration and login.
- The API uses secure HTTP (`https`) for all requests.
- Input validation errors return a `400 Bad Request` status with details about the invalid fields.
- For image uploads (e.g., profile pictures), endpoints may accept multipart form data (not covered in this MVP unless necessary).

------

## Example Usage with cURL

**Register a New User:**

```bash
curl -X POST https://yourdomain.com/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "johndoe@example.com",
    "password": "SecurePassword123",
    "confirmPassword": "SecurePassword123"
  }'
```

**Get Conversation Feed:**

```bash
curl -X GET https://yourdomain.com/api/v1/conversations \
  -H "Authorization: Bearer <jwt_token>"
```

------

## Future Extensions

- **Admin Endpoints:**
  - For topic management (add, edit, delete topics)
  - For managing conversations (pinning, editing, deleting)
- **Advanced Notification Preferences:**
  - Endpoints to update notification settings
- **Search Functionality:**
  - Endpoints to search conversations and comments
- **Gamification Features:**
  - Endpoints to retrieve user rankings and levels
- **Classroom Feature:**
  - Endpoints for courses and lessons

------