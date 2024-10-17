# Zita Shop

Zita Shop is a full-featured eCommerce web application built with React, SCSS, Redux, and Firebase. It provides a seamless shopping experience with features like product listings, a shopping cart, and secure payment processing via Stripe. The backend is managed using Express and hosted on Heroku.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Folder Structure](#folder-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication (registration and login)
- Product catalog with detailed views
- Shopping cart functionality
- Secure payment processing with Stripe
- Order history and management for users
- Admin panel for product management
- Responsive design for mobile and desktop

## Technologies Used

- **Frontend**:
  - React
  - Redux
  - SCSS
- **Backend**:
  - Firebase (Database & Hosting)
  - Express (Payment processing endpoint)
  - Stripe (Payment processing)
- **Other**:
  - EmailJS (Contact form)
  - Heroku (Backend hosting)

## Folder Structure

/
├── .dist/
├── .firebase/
├── build/
├── node_modules/
├── public/
├── src/
│ ├── App/
│ ├── assets/
│ ├── components/
│ │ ├── Admin/
│ │ ├── AdminOnlyRoute/
│ │ ├── Card/
│ │ ├── CheckoutForm/
│ │ ├── CheckoutSummary/
│ │ ├── Footer/
│ │ ├── Header/
│ │ ├── HiddenLink/
│ │ ├── infoBox/
│ │ ├── Loader/
│ │ ├── Pagination/
│ │ ├── Product/
│ │ ├── ProductRating/
│ │ ├── SearchBar/
│ │ └── index.js
│ ├── pages/
│ │ ├── AddProduct/
│ │ ├── Admin/
│ │ ├── Auth/
│ │ ├── Cart/
│ │ ├── Checkout/
│ │ ├── Contact/
│ │ ├── Home/
│ │ ├── OrderDetails/
│ │ └── OrderHistory/
│ ├── redux/
│ │ └── slice/
│ │ └── store.js
│ ├── index.css
│ └── index.js
├── .env
├── .firebaserc
├── .gitignore
├── firebase.json
├── package-lock.json
└── server.js

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/zita-shop.git
   cd zita-shop

2. Install dependencies:
   ```bash
    npm install

3. Set up your Firebase project and configure the environment variables.

    Environment Variables
    Create a .env file in the root directory and add the following variables:
```bash
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_DATABASE_URL=your_firebase_database_url
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_firebase_app_id

REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key

ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
EMAILJS_SERVICE_ID=your_emailjs_service_id
EMAILJS_TEMPLATE_ID=your_emailjs_template_id
EMAILJS_USER_ID=your_emailjs_user_id
```

Usage

Start the development server:
```bash
    npm start

Navigate to http://localhost:3000 in your browser.

Deployment
To deploy the backend, follow these steps:

Ensure your server code is in the server.js file.
Push your code to Heroku:
```bash
git add .
git commit -m "Deploy to Heroku"
git push heroku main   
```