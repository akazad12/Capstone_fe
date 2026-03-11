# Capstone Frontend

## [Backend Repository](https://github.com/akazad12/Capstone_be)
*Click here to view the backend API for this project.*

This is the **frontend** for the Capstone Stock Portfolio Tracker application.
It allows users to view and manage their stock watchlist, portfolio, and view live stock information.

---

## Features

* User authentication (Login / Signup)
* Search and add stocks to watchlist
* View live stock prices using Finnhub API
* Portfolio overview with current stock holdings
* Navigation between Watchlist, Portfolio, and individual stock info pages
* Responsive UI with modern React components

---

## Tech Stack

| Technology            | Purpose                      |
| --------------------- | ---------------------------- |
| React.js              | Frontend framework           |
| React Router          | Routing between pages        |
| Axios                 | HTTP client for API requests |
| Vite                  | Development build tool       |
| CSS                   | Styling                      |
| Environment Variables | Storing API keys securely    |

---

## ⚙️ Setup & Requirements

### Prerequisites

* Node.js (v18+ recommended)
* npm (comes with Node.js)
* Backend running locally or deployed ([Capstone Backend](https://github.com/akazad12/Capstone_be))
* Finnhub API key

---

###  Installation

1. **Clone the repository**

```bash
git clone https://github.com/akazad12/Capstone_fe.git
cd Capstone_fe
```

2. **Install dependencies**

```bash
npm install
```

3. **Create a `.env` file** in the root directory:

```env
VITE_FKEY=<your-finnhub-api-key>
```

* `VITE_FKEY`: Finnhub API key for fetching live stock prices

4. **Start the development server**

```bash
npm run dev
```

* The app will usually be available at `http://localhost:5173`.

---

## Usage

* Navigate between pages using the navbar.
* Login or Sign Up to access your watchlist and portfolio.
* Search for a stock using its ticker symbol or select from the dropdown.
* Click **Add** to add a stock to your watchlist.
* Click **Info** to view detailed stock information.
* Stocks in the watchlist will show live prices (updates every 30 seconds if market is open).

---

## API Routes (Overview)

The frontend communicates with the backend for all user, watchlist, and asset operations. These routes are defined in the backend ([Capstone Backend](https://github.com/akazad12/Capstone_be)).

| Route Prefix                   | Purpose                       |
| ------------------------------ | ----------------------------- |
| `/api/users`                   | User authentication & profile |
| `/api/assets`                  | Manage stock assets           |
| `/api/portfolio`               | Portfolio endpoints           |
| `/api/transactions`            | Transactions (buys/sells)     |
| `/api/users/:userId/watchlist` | User’s watchlist              |

### Examples

* `GET /api/users/:id/watchlist` – fetch a user’s watchlist
* `POST /api/assets` – add a new stock asset
* `GET /api/assets/:id` – get asset metadata
* `POST /api/users/:userId/watchlist/:assetId` – add asset to watchlist

---

## Sample Requests

**Get User Watchlist**

```http
GET /api/users/1234/watchlist
```

**Add Asset to Watchlist**

```http
POST /api/users/1234/watchlist/7890
```

**Get All Assets**

```http
GET /api/assets
```

---
