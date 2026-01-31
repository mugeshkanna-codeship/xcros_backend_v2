# Sequelize PostgreSQL Project

A production-grade Node.js application using Express.js and Sequelize ORM for PostgreSQL database.

## Features

- RESTful API for User management
- PostgreSQL database with Sequelize ORM
- Security middleware (Helmet, CORS)
- Compression
- Logging with Winston
- Environment-based configuration

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables in `.env` file
4. Run migrations: `npm run db:migrate`
5. Start the server: `npm start`

## Environment Variables

- `NODE_ENV`: development/production
- `PORT`: Server port (default 3000)
- `DATABASE_URL`: PostgreSQL connection string

## API Endpoints

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## Scripts

- `npm start` - Start the server
- `npm run dev` - Start with nodemon
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Run database seeders