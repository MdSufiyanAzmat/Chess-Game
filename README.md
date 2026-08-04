# Chess Game - Multiplayer Chess Platform

A full-featured chess platform inspired by Chess.com, built with real-time multiplayer capabilities, complete game rules enforcement, and persistent game storage.

## ✨ Features

- **Real-time Multiplayer:** Play chess with friends or random opponents using Socket.io
- **Full Chess Rules:** Complete chess logic including:
  - All piece movements (Pawn, Knight, Bishop, Rook, Queen, King)
  - Castling (King-side and Queen-side)
  - En passant
  - Pawn promotion
  - Check, checkmate, and stalemate detection
- **Game Rooms:** Create or join private game rooms
- **Move History:** Track all moves made during the game
- **Player Authentication:** Sign up and login system
- **Persistent Storage:** Games and user data saved in MongoDB
- **Responsive Design:** Play on desktop, tablet, or mobile

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Socket.io** - Real-time bidirectional communication
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM for data modeling

### Frontend
- **EJS** - Server-side rendering template engine
- **Chess.js** - Chess move validation and game logic
- **CSS3** - Styling (with responsive design)
- **JavaScript** - Client-side interactivity

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (local or cloud instance like MongoDB Atlas)
- npm or yarn package manager

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/chess-game.git
   cd chess-game
