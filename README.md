# Margam Esports: The Futuristic Esports Ecosystem

**Margam Esports** (Sanskrit for "The Path") is a next-generation, data-driven esports platform designed to professionalize the grassroots gaming scene in India. It serves as a bridge between amateur gamers and the professional esports industry, offering a structured competitive environment, verifiable stats, and a premium user experience.

---

## 🚀 Key Features

### 1. 🎮 For Gamers (User Centric)

*   **Player Self-Registration**: Users can create their own "Player Profile" with IGN, game specialization (BGMI, Valorant, etc.), and region.

*   **User Dashboard**: A personal command center to view player stats, rank, and a history of joined tournaments.

*   **Tournament Joining**: One-click registration for active tournaments directly from the tournament feed.

*   **Live Leaderboards**: Global player rankings based on a custom Skill Score algorithm (K/D + Win Rate + Tier).

*   **Profile Analytics**: Visual charts displaying performance metrics (Wins, K/D, Headshot %).

### 2. 🏆 Tournament Ecosystem

*   **Dynamic Filtering**: Search tournaments by game, status (Live/Upcoming), and sort by prize pool.

*   **Pagination**: scalable lists handling hundreds of tournaments and players effortlessly.

*   **Smart Status**: Real-time status indicators (Live, Completed, Upcoming) with neon visual cues.

### 3. 🎨 Premium UI/UX ("The Purple Theme")

*   **Futuristic Aesthetic**: A deep space purple theme with neon accents (Cyan/Pink) and glassmorphism.
*   **Micro-Animations**: `framer-motion` powered interactions for buttons, cards, and page transitions.
*   **3D Elements**: Tilt effects on cards and floating ambient animations.
*   **Responsive Design**: Fully optimized for mobile and desktop screens.

### 4. 👔 For Sponsors (Business Value)

*   **ROI Dashboard**: Dedicated analytics page showing growth, engagement, and user demographics.
*   **Tiered Showcases**: Platinum, Gold, and Silver sponsor slots with distinct visual hierarchy.

### 5. 🛠 Administrative Control
*   **CMS for Esports**: Admins can Create, Update, and Delete tournaments and players.
*   **User Management**: Ability to ban users and manage platform access.

---

## 🏗️ Technical Stack

### Frontend
*   **Framework**: React.js (Vite)
*   **Styling**: Vanilla CSS (CSS Variables, Flexbox/Grid) with `App.css` global theme.
*   **Animation**: `framer-motion`
*   **Charts**: `recharts` for data visualization.
*   **Routing**: `react-router-dom` (Protected Routes).

### Backend
*   **Runtime**: Node.js
*   **Framework**: Express.js
*   **Database**: MongoDB (Mongoose ODM).
*   **Authentication**: JWT (JSON Web Tokens) with secure cookie/localStorage handling.
*   **API Design**: RESTful architecture with pagination, sorting, and filtering.

---

## ⚙️ Setup Instructions

### Prerequisites
*   Node.js (v14+)
*   MongoDB Atlas URI (or local instance)

### Installation

1.  **Clone the Repository**
    ```bash
    git clone https://github.com/your-repo/margam-esports.git
    cd margam-esports
    ```

2.  **Backend Setup**
    ```bash
    cd backend
    npm install
    # Create .env file with:
    # PORT=5000
    # MONGO_URI=your_mongodb_connection_string
    # JWT_SECRET=your_jwt_secret
    npm run dev
    ```

3.  **Frontend Setup**
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

4.  **Access the App**
    *   Frontend: `http://localhost:5173`
    *   Backend API: `http://localhost:5000`

---

## 🧪 API Endpoints

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/tournaments` | List all tournaments (with pagination) | Public |
| **POST** | `/api/tournaments/:id/join` | Join a tournament | User |
| **GET** | `/api/players` | Leaderboard (with sort/filter) | Public |
| **POST** | `/api/players` | Create Player Profile | User |
| **POST** | `/api/auth/login` | User Login | Public |
| **GET** | `/api/auth/users` | List all users | Admin |

---

## 👥 The Team
*   **Kumar Sanu (CEO)**: Vision & Strategy
*   **Meghna Nair (COO/CTO)**: Technical Execution
*   **Gauri Jindal (CFO/CMO)**: Growth & Finance

---
*Built with ❤️ for the Indian Esports Community.*
