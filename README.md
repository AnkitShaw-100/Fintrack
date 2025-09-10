# FinTrack

**FinTrack** is a full-stack finance tracking application built with **MERN (MongoDB, Express, React, Node.js)**. It allows users to manage their expenses, visualize spending trends via charts, and securely sign up and log in.

---

## Features

* **User Authentication:** Signup and login functionality with password protection.
* **Expense Management:** Add, view, and categorize expenses.
* **Data Visualization:** Interactive expense charts to track spending trends.
* **Responsive UI:** Built with **React** and **Material-UI** for a modern interface.
* **API Driven:** Backend powered by **Express.js** and MongoDB.

---

## Tech Stack

**Frontend:**

* React with Vite
* Material-UI (MUI)
* React Router DOM for routing

**Backend:**

* Node.js & Express.js
* MongoDB for database
* Mongoose for object modeling

**Other Tools:**

* Axios for API requests
* dotenv for environment variables

---

## Project Structure

```
backend/
 ├─ config/         # DB and app configuration
 │   ├─ components/ # React components (Dashboard, Login, Signup, ExpenseChart)
 │   ├─ assets/     # Static assets

---

## Installation

1. Navigate to the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file with your MongoDB connection string:

```env
MONGO_URI=<your-mongodb-uri>
PORT=6000
```

4. Start the server:

```bash
npm start
```

### Frontend

1. Navigate to the frontend folder:

```bash
cd frontend/vite-project
```
```bash
npm install
npm run dev
```

4. Open the app in your browser at [http://localhost:5173](http://localhost:5173)

---

## Usage

1. Open the signup page and create a new account.
2. Log in using your credentials.
3. Add expenses with relevant categories and amounts.
4. Visualize your expenses via interactive charts on the dashboard.

---

## Future Improvements

* Add monthly/yearly expense reports.
* Implement user profile and settings.
* Add recurring expense management.
* Export data to CSV or PDF.

---
## License

This project is open source and free to use under the **MIT License**.

---
