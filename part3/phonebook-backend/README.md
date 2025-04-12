# Phonebook Backend

This is a backend service for a phonebook application built with Node.js and Express. The application provides REST API endpoints to manage contact information.

## Live Demo

The application is deployed on Fly.io: https://phonebook-backend-valentino.fly.dev

## Features

- Get all contacts
- Get contact by ID
- Add new contacts
- Delete contacts
- Basic validation for contact creation
- CORS enabled for frontend integration

## API Endpoints

- `GET /` - Welcome message
- `GET /info` - Shows the total number of contacts and current timestamp
- `GET /api/persons` - Returns all contacts
- `GET /api/persons/:id` - Returns a specific contact by ID
- `POST /api/persons` - Creates a new contact
- `DELETE /api/persons/:id` - Deletes a contact

## Technologies Used

- Node.js
- Express.js
- Morgan (for logging)
- CORS

## Development

To run this project locally:

1. Clone the repository
2. Install dependencies:
```bash
npm install