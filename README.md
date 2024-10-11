# Community Web Application

Welcome to the repository for the **Community Web Application**. This project is a minimal viable product (MVP) designed to create a platform where users can engage in conversations, share ideas, and connect with other members. The application features user authentication, conversation feeds, commenting, notifications, and a member ranking system.

---

## Table of Contents

- [Community Web Application](#community-web-application)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Environment Variables](#environment-variables)
    - [Database Setup](#database-setup)
    - [Running the Application](#running-the-application)
  - [API Documentation](#api-documentation)
  - [Database Schema](#database-schema)
  - [Project Structure](#project-structure)
  - [Contributing](#contributing)
    - [Steps to Contribute](#steps-to-contribute)
    - [Guidelines](#guidelines)
  - [License](#license)
  - [Contact](#contact)

---

## Features

- **User Authentication**: Register, login, logout, and password recovery functionality.
- **User Profiles**: View and update personal profiles.
- **Conversation Feed**: Browse recent conversations and posts.
- **Create Conversations**: Start new conversations with topic tagging.
- **Commenting**: Engage in discussions by commenting on conversations.
- **Notifications**: Receive notifications about replies and interactions.
- **Members Ranking**: View top community members based on activity.
- **Responsive Design**: User interface optimized for mobile, tablet, and desktop devices.

---

## Technologies Used

- Frontend:
  - [React](https://reactjs.org/) & [Next](https://nextjs.org)
  - [TailwindCSS](https://tailwindcss.com/)
- Backend:
  - [Node.js](https://nodejs.org/)
  - [Express.js](https://expressjs.com/)
  - [Prisma ORM](https://www.prisma.io/)
- Database:
  - [PostgreSQL](https://www.postgresql.org/)
- Authentication:
  - [JSON Web Tokens (JWT)](https://jwt.io/)
- API Documentation:
  - OpenAPI (Swagger)
- Dev Tools:
  - [Nodemon](https://nodemon.io/)
  - [ESLint](https://eslint.org/)
  - [Prettier](https://prettier.io/)

---

## Getting Started

### Prerequisites

- **Node.js** (v20 or higher)
- **npm**
- **PostgreSQL** (v12 or higher)
- **Git**

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/community-app-mvp.git
   cd community-app-mvp
   ```

2. **Install Dependencies**

   ```bash
   # Using npm
   npm install
   ```

### Environment Variables

Create a `.env` file in the root directory of the project and add the following environment variables:

```env
# .env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE_NAME"
JWT_SECRET="your_jwt_secret_key"
PORT=3000
```

Replace `USER`, `PASSWORD`, `HOST`, `PORT`, and `DATABASE_NAME` with your PostgreSQL database credentials.

### Database Setup

1. **Initialize Prisma**

   ```bash
   npx prisma init
   ```

2. **Run Database Migrations**

   ```bash
   npx prisma migrate dev --name init
   ```

   This command will create the database tables as defined in the Prisma schema.

3. **Generate Prisma Client**

   ```bash
   npx prisma generate
   ```

### Running the Application

**Development Mode**

```bash
npm run dev
```

This command starts the server with hot reloading using Nodemon.

**Production Mode**

```bash
npm start
```

---

## API Documentation

The API follows RESTful principles and is documented using OpenAPI (Swagger).

- **Swagger UI**: Access the interactive API documentation at http://localhost:3000/api-docs when the server is running.
- **OpenAPI Specification**: The OpenAPI spec is located at `docs/openapi.yaml`.

For detailed information about the API endpoints, request/response formats, and error handling, refer to the [API Documentation](./docs/api.md).

---

## Database Schema

The database schema is designed using PostgreSQL and managed via Prisma ORM.

- **Schema File**: The Prisma schema is located at `prisma/schema.prisma`.

For an in-depth explanation of the database structure, entities, and relationships, refer to the [Database Schema Documentation](./docs/database.md)

---

## Project Structure

```plaintext
community-pro/
├── src/
│   ├── components/
│   │   ├── NavBar.jsx
│   │   ├── PostCard.jsx
│   │   ├── MembersRanking.jsx
│   │   ├── RegistrationForm.jsx
│   │   ├── LoginForm.jsx
│   │   ├── PasswordRecoveryForm.jsx
│   ├── pages/
│   │   ├── MainScreen.jsx
│   │   └── ...
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── index.js
│   └── app.js
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── public/
│   └── index.html
├── docs/
│   ├── api.md
│   ├── database.md
│   └── openapi.yaml
├── .env
├── .gitignore
├── package.json
├── README.md
└── LICENSE
```

- `src/`: Contains the application source code.
  - **`components/`**: Reusable React components.
  - **`pages/`**: Page-level components.
  - **`controllers/`**: Request handlers for the API.
  - **`routes/`**: API route definitions.
  - **`models/`**: Data models and ORM schemas.
  - **`services/`**: Business logic and service functions.
  - **`utils/`**: Utility functions and helpers.
- **`prisma/`**: Contains the Prisma schema and migration files.
- **`public/`**: Contains static assets.
- **`docs/`**: Contains documentation files.

---

## Contributing

We welcome contributions to improve this project!

### Steps to Contribute

1. **Fork the Repository**

   Click the "Fork" button at the top right of this page to create a copy of this repository under your GitHub account.

2. **Clone Your Fork**

   ```bash
   git clone https://github.com/yourusername/community-pro.git
   cd community-pro
   ```

3. **Create a New Branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make Changes**

   Implement your feature or fix.

5. **Commit Changes**

   ```bash
   git add .
   git commit -m "Add your commit message here"
   ```

6. **Push to Your Fork**

   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**

   Go to the original repository and click on [Pull Requests](https://github.com/carlosazaustre/community-pro/pulls), then "New Pull Request". Follow the prompts to submit your pull request.

### Guidelines

- Follow the existing code style.
- Write clear commit messages.
- Update documentation if necessary.
- Ensure that your code passes all tests and lints.

---

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

## Contact

If you have any questions or suggestions, feel free to open an issue or reach out directly.
