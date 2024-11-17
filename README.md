# Portfolio Platform

## Description
This project is a portfolio management platform built using **Node.js** and related technologies. It supports user registration, login, CRUD operations for portfolio items, and API integration for data visualization.

## Features
- **User Registration**: Supports secure registration with hashed passwords and optional two-factor authentication (2FA).
- **Authentication**: Login with JWT-based authentication.
- **Role-based Access Control**:
  - **Admin**: Full access to create, update, and delete portfolio items.
  - **Editor**: Limited access to creating portfolio items only.
- **Portfolio Management**: Admins can manage portfolio items, including a carousel of images.
- **Email Notifications**: Sends welcome emails and event-based notifications.
- **Responsive Design**: Built with EJS and CSS for an attractive and mobile-friendly interface.

## Technology Stack
**Node.js**: Server-side runtime
**Express**: Web framework
**MongoDB**: Database
**EJS**: Template engine
**CSS**: Styling
**bcrypt**: Password hashing
**jsonwebtoken**: Authentication tokens
**nodemailer**: Email notifications