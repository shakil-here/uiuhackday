# Unspoken - Emotion-Aware Communication Platform

Unspoken is a next-generation communication platform that understands human emotion, facial expression, and the power of silence. Built for privacy-conscious users who want to communicate with emotional awareness.

## 🌟 Features

### Core Functionality
- **Emotion-Aware Messaging**: Communicate with emotions that dynamically change the interface theme
- **Multi-User Chat System**: WhatsApp/Messenger-style interface supporting multiple conversations
- **Community-Based Chatting**: Select and filter chats by community (UIU, NSU)
- **Real-Time Emotion Theming**: Dynamic color themes based on emotions (Happy, Sad, Angry, Calm, Fear)
- **Facial Emotion Detection**: Visual representation of emotions through facial landmarks
- **Privacy-First Design**: End-to-end encrypted messaging with secure authentication

### User Features
- **User Authentication**: Secure registration and login with JWT tokens
- **Profile Management**: User profiles with username, full name, and email
- **Chat Management**: Create, search, and manage multiple conversations
- **Emotion Controls**: Test and switch between different emotion themes
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

### Frontend
- **React 19.2.0** - Modern UI library
- **Vite 7.2.4** - Fast build tool and dev server
- **React Router DOM 7.12.0** - Client-side routing
- **Axios 1.13.2** - HTTP client for API requests
- **CSS3** - Modern styling with gradients and animations

### Backend
- **Django 6.0.1** - Python web framework
- **Django REST Framework 3.16.1** - RESTful API
- **Django REST Framework Simple JWT 5.5.1** - JWT authentication
- **Django CORS Headers 4.9.0** - Cross-origin resource sharing
- **MySQL** - Database (via mysqlclient)

## 📁 Project Structure

```
uiuhackday/
├── Backend/                 # Django backend
│   ├── config/             # Django settings and configuration
│   ├── users/              # User authentication and profiles
│   ├── manage.py           # Django management script
│   └── requirements.txt    # Python dependencies
│
└── unspoken/               # React frontend
    ├── src/
    │   ├── pages/          # Page components (Home, Login, Register, Messaging)
    │   ├── context/         # React contexts (Emotion, Auth)
    │   ├── hook/            # Custom hooks (axiosPublic)
    │   └── main.jsx         # Application entry point
    ├── public/              # Static assets
    └── package.json        # Node.js dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Python 3.11 or higher
- MySQL database
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd Backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Set up environment variables (create `.env` file):
```env
SECRET_KEY=your-secret-key
DEBUG=True
DATABASE_URL=mysql://user:password@localhost:3306/dbname
```

5. Run migrations:
```bash
python manage.py migrate
```

6. Start the development server:
```bash
python manage.py runserver
```

The backend will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd unspoken
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## 🎨 Emotion Themes

Unspoken supports five distinct emotion themes that dynamically change the interface:

- **😊 Happy (Yellow)**: Warm, positive energy
- **😢 Sad (Blue)**: Calm, low-energy, emotional
- **😠 Angry (Red)**: Strong emotion, intensity, alert
- **😐 Calm/Neutral (Green)**: Balanced, relaxed, normal state
- **😨 Fear/Confusion (Purple)**: Mystery, uncertainty, tension

## 🔐 Authentication

The platform uses JWT (JSON Web Tokens) for secure authentication:
- Access tokens for API requests
- Refresh tokens for session renewal
- Secure user profile management

## 📱 Usage

1. **Register**: Create a new account with username, full name, email, and password
2. **Login**: Sign in with your credentials
3. **Select Community**: Choose UIU or NSU community
4. **Start Chatting**: Select or create a conversation
5. **Change Emotions**: Use the emotion controls to test different themes
6. **Send Messages**: Communicate with emotion-aware messaging

## 🎯 Key Features Explained

### Emotion-Aware UI
The interface dynamically adapts based on selected emotions, changing background colors and visual elements to reflect the current emotional state.

### Community-Based Organization
Users can filter and organize chats by community (UIU or NSU), making it easy to manage conversations within specific groups.

### Privacy-First Design
Built with privacy in mind, ensuring secure communication and data protection.

## 🤝 Contributing

This project was developed for UIU Hackday. Contributions and improvements are welcome!

## 📄 License

This project is part of the UIU Hackday competition.

## 👥 Team

Developed with ❤️ for UIU Hackday

---

**Note**: This is a hackathon project. For production use, additional security measures, error handling, and optimizations would be recommended.
