# 🎵 Spotify Clone

A full-stack music streaming application inspired by Spotify, built with **React**, **Node.js/Express**, **MongoDB**, and **Socket.io** for real-time features.

![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?logo=socket.io&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-06B6D4?logo=tailwindcss&logoColor=white)

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the App](#running-the-app)
- [API Endpoints](#api-endpoints)
- [Database Models](#database-models)
- [Authentication](#authentication)
- [Real-time Features](#real-time-features)
- [Admin Dashboard](#admin-dashboard)
- [Frontend Pages](#frontend-pages)
- [State Management](#state-management)

---

## Features

- **Music Playback** — Play, pause, next/previous track, seek, volume control, queue management
- **Album & Song Browsing** — Featured songs, trending songs, "Made for You" playlists
- **Real-time Chat** — Socket.io powered messaging between users
- **Friend Activity** — See what friends are listening to in real-time
- **Online Status** — Live online/offline indicators
- **Admin Dashboard** — Full CRUD for songs and albums, statistics overview
- **Authentication** — Clerk-based OAuth (Google) with admin role support
- **File Uploads** — Cloudinary integration for audio and image storage
- **Responsive UI** — Resizable panels, dark theme, Spotify-inspired design
- **Scheduled Tasks** — Cron job for automatic temporary file cleanup

---

## Tech Stack

### Frontend

| Technology              | Purpose                    |
| ----------------------- | -------------------------- |
| React 19                | UI framework               |
| TypeScript              | Type safety                |
| Vite                    | Build tool & dev server    |
| Tailwind CSS 4          | Styling                    |
| shadcn/ui (Radix UI)    | UI component library       |
| Zustand                 | State management           |
| React Router DOM        | Client-side routing        |
| Axios                   | HTTP client                |
| Socket.io Client        | Real-time communication    |
| Clerk React             | Authentication             |
| Lucide React            | Icons                      |
| React Resizable Panels  | Resizable layout           |
| React Hot Toast         | Toast notifications        |

### Backend

| Technology           | Purpose                   |
| -------------------- | ------------------------- |
| Node.js              | Runtime                   |
| Express 5            | Web framework             |
| MongoDB (Mongoose)   | Database & ODM            |
| Socket.io            | WebSocket server          |
| Clerk Express        | Authentication middleware |
| Cloudinary           | Media file storage        |
| Express Fileupload   | File upload handling      |
| Node Cron            | Scheduled tasks           |
| dotenv               | Environment variables     |
| CORS                 | Cross-origin requests     |

---

## Project Structure

```
spotify-clone/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── adminControllers.js      # Admin CRUD operations
│   │   │   ├── albumControllers.js      # Album fetching
│   │   │   ├── authControllers.js       # Auth callback handling
│   │   │   ├── songControllers.js       # Song fetching
│   │   │   ├── statsControllers.js      # Dashboard statistics
│   │   │   └── userControllers.js       # User & message operations
│   │   ├── models/
│   │   │   ├── albumModel.js            # Album schema
│   │   │   ├── messageModel.js          # Chat message schema
│   │   │   ├── songModel.js             # Song schema
│   │   │   └── userModel.js             # User schema
│   │   ├── routes/
│   │   │   ├── adminRoutes.js           # /api/admin
│   │   │   ├── albumRoutes.js           # /api/albums
│   │   │   ├── authRoutes.js            # /api/auth
│   │   │   ├── songRoutes.js            # /api/songs
│   │   │   ├── statRoutes.js            # /api/stats
│   │   │   └── userRoutes.js            # /api/users
│   │   ├── middleware/
│   │   │   └── authMiddleware.js        # protectRoute, requireAdmin
│   │   ├── lib/
│   │   │   ├── cloudinary.js            # Cloudinary config
│   │   │   ├── db.js                    # MongoDB connection
│   │   │   └── socket.js               # Socket.io setup
│   │   ├── seeds/
│   │   │   ├── albums.js               # Album seed data
│   │   │   └── songs.js                # Song seed data
│   │   └── server.js                   # Entry point
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/                     # shadcn/ui components
│   │   │   ├── skeletons/              # Loading skeleton components
│   │   │   ├── Topbar.tsx              # Navigation bar
│   │   │   └── SignInOAuthButtons.tsx   # OAuth sign-in buttons
│   │   ├── layout/
│   │   │   ├── MainLayout.tsx          # 3-panel resizable layout
│   │   │   └── components/
│   │   │       ├── AudioPlayer.tsx     # Audio element controller
│   │   │       ├── LeftSidebar.tsx     # Albums & navigation
│   │   │       ├── PlaybackControls.tsx # Bottom player bar
│   │   │       └── FriendActivity.tsx  # Right sidebar
│   │   ├── pages/
│   │   │   ├── home/                   # Home page
│   │   │   ├── album/                  # Album detail page
│   │   │   ├── chat/                   # Chat page
│   │   │   ├── admin/                  # Admin dashboard
│   │   │   ├── auth-callback/          # OAuth callback
│   │   │   └── notFound/              # 404 page
│   │   ├── store/
│   │   │   ├── usePlayerStore.ts       # Playback state
│   │   │   ├── useMusicStore.ts        # Music data state
│   │   │   ├── useAuthStore.ts         # Auth state
│   │   │   └── useChatStore.ts         # Chat & socket state
│   │   ├── providers/
│   │   │   └── AuthProvider.tsx        # Auth context provider
│   │   ├── lib/
│   │   │   ├── axios.ts               # Axios instance
│   │   │   └── utils.ts               # Utility functions
│   │   ├── types/
│   │   │   └── index.ts               # TypeScript definitions
│   │   ├── App.tsx                     # Root component & routes
│   │   ├── main.tsx                    # Entry point
│   │   └── index.css                   # Global styles
│   ├── .env
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── components.json                 # shadcn/ui config
│   └── package.json
│
└── README.md
```

---

## Getting Started

### Prerequisites

- **Node.js** v18.17.0 or higher
- **npm** or **yarn**
- **MongoDB** (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- **Clerk** account — [clerk.com](https://clerk.com)
- **Cloudinary** account — [cloudinary.com](https://cloudinary.com)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/spotify-clone.git
cd spotify-clone

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Environment Variables

#### Backend (`backend/.env`)

```env
PORT=5000
NODE_ENV=development
MONGODB_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>
ADMIN_EMAIL=your-admin-email@example.com
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx
```

#### Frontend (`frontend/.env`)

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
```

### Running the App

#### Development

```bash
# Terminal 1 — Start backend (port 5000)
cd backend
npm run dev

# Terminal 2 — Start frontend (port 3000)
cd frontend
npm run dev
```

#### Production Build

```bash
# Build frontend
cd frontend
npm run build

# Start backend (serves frontend dist in production mode)
cd ../backend
npm start
```

---

## API Endpoints

### Authentication — `/api/auth`

| Method | Endpoint              | Auth     | Description                              |
| ------ | --------------------- | -------- | ---------------------------------------- |
| POST   | `/api/auth/callback`  | Public   | Clerk OAuth callback, sync user to DB    |

### Users — `/api/users`

| Method | Endpoint                        | Auth       | Description                          |
| ------ | ------------------------------- | ---------- | ------------------------------------ |
| GET    | `/api/users`                    | Protected  | Get all users                        |
| GET    | `/api/users/messages/:userId`   | Protected  | Get messages with a specific user    |

### Songs — `/api/songs`

| Method | Endpoint                  | Auth     | Description                       |
| ------ | ------------------------- | -------- | --------------------------------- |
| GET    | `/api/songs`              | Admin    | Get all songs                     |
| GET    | `/api/songs/featured`     | Public   | Get 6 random featured songs       |
| GET    | `/api/songs/made-for-you` | Public   | Get 4 random "Made for You" songs |
| GET    | `/api/songs/trending`     | Public   | Get 4 random trending songs       |

### Albums — `/api/albums`

| Method | Endpoint                  | Auth     | Description                          |
| ------ | ------------------------- | -------- | ------------------------------------ |
| GET    | `/api/albums`             | Public   | Get all albums                       |
| GET    | `/api/albums/:albumId`    | Public   | Get album by ID with songs populated |

### Admin — `/api/admin`

| Method | Endpoint                      | Auth   | Description                             |
| ------ | ----------------------------- | ------ | --------------------------------------- |
| GET    | `/api/admin/check`            | Admin  | Check if current user is admin          |
| POST   | `/api/admin/songs`            | Admin  | Create a new song (with file upload)    |
| DELETE | `/api/admin/songs/:songId`    | Admin  | Delete a song                           |
| POST   | `/api/admin/albums`           | Admin  | Create a new album (with image upload)  |
| DELETE | `/api/admin/albums/:albumId`  | Admin  | Delete album and all associated songs   |

### Statistics — `/api/stats`

| Method | Endpoint       | Auth   | Description                                    |
| ------ | -------------- | ------ | ---------------------------------------------- |
| GET    | `/api/stats`   | Admin  | Get total songs, albums, users, unique artists |

---

## Database Models

### User

| Field      | Type     | Required | Description            |
| ---------- | -------- | -------- | ---------------------- |
| fullName   | String   | Yes      | User's full name       |
| imageUrl   | String   | Yes      | Profile image URL      |
| clerkId    | String   | Yes      | Unique Clerk user ID   |
| createdAt  | Date     | Auto     | Timestamp              |
| updatedAt  | Date     | Auto     | Timestamp              |

### Song

| Field      | Type       | Required | Description                    |
| ---------- | ---------- | -------- | ------------------------------ |
| title      | String     | Yes      | Song title                     |
| artist     | String     | Yes      | Artist name                    |
| imageUrl   | String     | Yes      | Cover image URL (Cloudinary)   |
| audioUrl   | String     | Yes      | Audio file URL (Cloudinary)    |
| duration   | Number     | Yes      | Duration in seconds            |
| albumId    | ObjectId   | No       | Reference to Album             |
| createdAt  | Date       | Auto     | Timestamp                      |
| updatedAt  | Date       | Auto     | Timestamp                      |

### Album

| Field        | Type         | Required | Description                  |
| ------------ | ------------ | -------- | ---------------------------- |
| title        | String       | Yes      | Album title                  |
| artist       | String       | Yes      | Artist name                  |
| imageUrl     | String       | Yes      | Cover image URL (Cloudinary) |
| releaseYear  | Number       | Yes      | Release year                 |
| songs        | [ObjectId]   | No       | References to Song documents |
| createdAt    | Date         | Auto     | Timestamp                    |
| updatedAt    | Date         | Auto     | Timestamp                    |

### Message

| Field       | Type     | Required | Description            |
| ----------- | -------- | -------- | ---------------------- |
| senderId    | String   | Yes      | Clerk user ID (sender) |
| receiverId  | String   | Yes      | Clerk user ID (target) |
| content     | String   | Yes      | Message text           |
| createdAt   | Date     | Auto     | Timestamp              |
| updatedAt   | Date     | Auto     | Timestamp              |

---

## Authentication

Authentication is handled by [Clerk](https://clerk.com) with the following flow:

1. User clicks **Sign in with Google** on the frontend
2. Clerk handles the OAuth flow and returns a session token
3. `AuthProvider` on the frontend retrieves the token and attaches it to all Axios requests as a `Bearer` token
4. Backend `clerkMiddleware()` validates the token on every request
5. `protectRoute` middleware ensures the user is authenticated
6. `requireAdmin` middleware checks if the user's email matches the `ADMIN_EMAIL` environment variable
7. On first login, a `POST /api/auth/callback` request syncs the user data to MongoDB

---

## Real-time Features

Powered by **Socket.io**, the app supports:

### Chat System
- Send and receive messages in real-time
- Messages are persisted in MongoDB
- Conversation history between any two users

### Online Status
- Users are tracked as online/offline
- Online indicators shown in the friend activity sidebar and chat page

### Activity Feed
- Users' current listening activity is broadcast in real-time
- Friends can see what song is currently playing
- Activity updates via `update_activity` / `activity_updated` events

### Socket Events

| Event               | Direction        | Description                          |
| ------------------- | ---------------- | ------------------------------------ |
| `user_connected`    | Server → Client  | User came online                     |
| `user_disconnected` | Server → Client  | User went offline                    |
| `send_message`      | Client → Server  | Send a chat message                  |
| `receive_message`   | Server → Client  | Receive a chat message               |
| `update_activity`   | Client → Server  | Update current listening activity    |
| `activity_updated`  | Server → Client  | Broadcast activity to other users    |

---

## Admin Dashboard

Accessible only to users whose email matches `ADMIN_EMAIL`. The admin dashboard provides:

- **Statistics Overview** — Total songs, albums, users, and unique artists
- **Songs Management** — Add new songs (with audio + image upload) and delete existing songs
- **Albums Management** — Add new albums (with image upload) and delete albums (cascading delete of associated songs)

File uploads are handled via **Cloudinary** with automatic resource type detection for audio and image files.

---

## Frontend Pages

| Route                | Page              | Description                                        |
| -------------------- | ----------------- | -------------------------------------------------- |
| `/`                  | Home              | Featured songs, trending, "Made for You" sections  |
| `/albums/:albumId`   | Album Detail      | Album info with full track listing                 |
| `/chat`              | Chat              | Real-time messaging with other users               |
| `/admin`             | Admin Dashboard   | Song/album management and stats (admin only)       |
| `/auth-callback`     | Auth Callback     | Handles OAuth redirect and user sync               |
| `/sso-callback`      | SSO Callback      | Clerk SSO redirect handler                         |
| `/*`                 | 404 Not Found     | Fallback for undefined routes                      |

---

## State Management

State is managed with **Zustand** across 4 stores:

### `usePlayerStore`
Manages music playback — current song, queue, play/pause, next/previous, volume, and progress seeking.

### `useMusicStore`
Handles music data fetching — albums, songs, featured/trending/made-for-you lists, stats, and admin CRUD operations.

### `useAuthStore`
Manages authentication state — admin status check via `/api/admin/check`.

### `useChatStore`
Manages chat and social features — Socket.io connection, user list, messages, online users, and activity feed.

---

## License

This project is for educational purposes.
