A responsive dashboard to visualize and filter transactions using React, TypeScript, and TailwindCSS.

## 🚀 Getting Started

### Clone the repository
```bash
git clone https://github.com/cristianlunachavarro/wallex-app.git
cd transactions-dashboard
```

### Install dependencies
```bash
npm install
```

### Run the development server
```bash
npm run dev
```

---

## 📁 Project Structure

```
src/
│
├── api/         # API call logic
├── assets/      # Images
├── components/  # Reusable UI components
├── hooks/       # Custom React hooks
├── pages/       # Main app pages
├── store/       # Global state with Redux or Context
├── types/       # TypeScript interfaces and types
└── utils/       # Utility functions
```

---

## 🛠️ Technologies Used

- **React + TypeScript** – Modern frontend stack
- **TailwindCSS** – Utility-first CSS framework
- **Dayjs** – Lightweight date library
- **Jest** – Testing framework
- **Manual CSV Export** – No external CSV library
- **Skeleton Loaders** – Animated placeholders for better UX

---

## ✨ Features

- 🔍 **Filter Transactions**  
  Filter by date, card, installments, amount, and payment method (multi-select supported).

- 📅 **Time Range Filters**  
  View transactions by day, week, or month.

- 📊 **Analytics Chart**  
  Visualizes number of transactions and total amounts per day for selected range (week/month).

- 📁 **CSV Export**  
  Export filtered transactions to a `.csv` file.

- ⚡ **Skeleton Loading States**  
  While fetching data, animated placeholders are displayed.

---

## ✅ Testing with Jest

### Run tests
```bash
npx jest
```

### Test Coverage

- ✅ Validates correct transaction data is displayed.
- ✅ Ensures multiple transactions render properly.
- ✅ Displays "No results to show..." when no data is available.
- ✅ Shows loading skeletons while data is being fetched.
- ✅ Renders saved payment methods from the Store.

---