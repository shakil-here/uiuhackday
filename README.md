# Unspoken - Emotion-Aware Communication Platform

Unspoken is a next-generation communication platform that understands human emotion, facial expression, and the power of silence. Built for privacy-conscious users who want to communicate with emotional awareness.

## 🌟 Features

### Core Functionality
- **Emotion-Aware Messaging**: Communicate with emotions that dynamically change the chat interface theme
- **Emoji-Enhanced Messages**: Each message displays an emotion emoji (😊😢😠😐😨) based on the active emotion theme
- **Multi-User Chat System**: WhatsApp/Messenger-style interface supporting multiple conversations
- **Community-Based Chatting**: Select and filter chats by community (UIU 🏛️, NSU 🎓)
- **Real-Time Emotion Theming**: Dynamic color themes applied to chat area based on emotions (Happy, Sad, Angry, Calm, Fear)
- **Facial Emotion Detection**: Visual representation of emotions through facial landmarks on homepage
- **Privacy-First Design**: Secure authentication with JWT tokens and encrypted messaging

### 🤖 Machine Learning Features (ml-dev branch)
> **⚠️ IMPORTANT**: Advanced ML features are available in the `ml-dev` branch!

- **🎭 Face Recognition Model**: Advanced facial recognition system for user identification and authentication
- **📝 Text Emotion Recognition Model**: AI-powered emotion detection from text messages
  - Analyzes message content to detect emotional sentiment
  - Automatically suggests appropriate emotion themes
  - Enhances communication with intelligent emotion understanding

**To use ML features, checkout the `ml-dev` branch:**
```bash
git checkout ml-dev
```

### User Features
- **User Authentication**: Secure registration and login with JWT access/refresh tokens
- **User Profile Management**: View and edit user profiles (username, full name, email)
- **Account Dashboard**: User account page with profile management
- **Chat Management**: Create, search, and manage multiple conversations
- **Compact Emotion Controls**: Quick-access emotion theme switcher (emoji-only buttons)
- **Auto-Redirect**: Smart routing - logged-in users go to messaging, others to home/login
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

### Frontend
- **React 19.2.0** - Modern UI library with hooks
- **Vite 7.2.4** - Fast build tool and dev server
- **React Router DOM 7.12.0** - Client-side routing with protected routes
- **Axios 1.13.2** - HTTP client for API requests
- **CSS3** - Modern styling with gradients, animations, and glassmorphism effects
- **Context API** - Global state management for authentication and emotions

### Backend
- **Django 6.0.1** - Python web framework
- **Django REST Framework 3.16.1** - RESTful API
- **Django REST Framework Simple JWT 5.5.1** - JWT authentication (access & refresh tokens)
- **Django CORS Headers 4.9.0** - Cross-origin resource sharing
- **MySQL** - Database (via mysqlclient)
- **UUID** - Unique identifiers for users and communities

### 🤖 Machine Learning (ml-dev branch)
> **📌 ML features available in `ml-dev` branch**

- **Face Recognition Model** - Deep learning model for facial recognition
- **Text Emotion Recognition Model** - NLP model for emotion detection from text
- **TensorFlow/PyTorch** - ML framework (check ml-dev branch for specifics)
- **Model Integration** - Seamless integration with Django backend

## 📁 Project Structure

```
uiuhackday/
├── Backend/                 # Django backend
│   ├── config/             # Django settings and configuration
│   │   ├── settings.py     # Project settings
│   │   ├── urls.py         # Main URL configuration
│   │   └── wsgi.py         # WSGI configuration
│   ├── users/              # User authentication and profiles app
│   │   ├── models.py       # User and Community models
│   │   ├── views.py        # API views (Register, Login, Profile)
│   │   └── urls.py         # User app URLs
│   ├── manage.py           # Django management script
│   └── requirements.txt    # Python dependencies
│
└── unspoken/               # React frontend
    ├── src/
    │   ├── pages/          # Page components
    │   │   ├── Home.jsx    # Landing page with emotion visualization
    │   │   ├── Login.jsx   # User login page
    │   │   ├── Register.jsx # User registration page
    │   │   ├── Messaging.jsx # Main chat interface
    │   │   └── Account.jsx  # User account/profile page
    │   ├── context/         # React contexts
    │   │   ├── EmotionContext.jsx # Emotion state management
    │   │   └── AuthContext.jsx    # Authentication state management
    │   ├── hook/            # Custom hooks
    │   │   └── axiosPublic.jsx # Axios instance with base URL
    │   ├── App.jsx          # Main app component with routing
    │   └── main.jsx          # Application entry point
    ├── public/              # Static assets (favicon, etc.)
    └── package.json        # Node.js dependencies
```

## 🚀 Getting Started

> **💡 Note**: The main branch contains the core application. For ML features (face recognition & text emotion recognition), checkout the `ml-dev` branch.

### Prerequisites
- Node.js (v18 or higher)
- Python 3.11 or higher
- MySQL database
- npm or yarn
- (For ml-dev branch) ML dependencies: TensorFlow/PyTorch, OpenCV, etc.

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

## 🔌 API Endpoints

### Authentication
- `POST /users/register/` - User registration
- `POST /users/login/` - User login (returns access & refresh tokens)
- `GET /users/me/` - Get current user profile (requires authentication)
- `GET /users/profile/` - Get user profile

### Request Format
- **Registration**: `{ username, full_name, email, password, password_confirm }`
- **Login**: `{ email, password }`

### Response Format
- **Login Success**: `{ access: "token", refresh: "token" }`
- **Profile**: `{ id, username, full_name, email, community }`

## 🎨 Emotion Themes

Unspoken supports five distinct emotion themes that dynamically change the chat interface:

- **😊 Happy (Yellow)**: Warm, positive energy - `#fef9c3` to `#fde047`
- **😢 Sad (Blue)**: Calm, low-energy, emotional - `#dbeafe` to `#93c5fd`
- **😠 Angry (Red)**: Strong emotion, intensity, alert - `#fee2e2` to `#fca5a5`
- **😐 Calm/Neutral (Green)**: Balanced, relaxed, normal state - `#d1fae5` to `#6ee7b7`
- **😨 Fear/Confusion (Purple)**: Mystery, uncertainty, tension - `#e9d5ff` to `#c4b5fd`

### Emotion Features
- **Dynamic Background**: Chat area background changes based on selected emotion
- **Message Emojis**: Each message displays the corresponding emotion emoji
- **Theme Persistence**: Emotion state persists across page navigation
- **Compact Controls**: Quick-access emotion switcher in top-right corner

## 🔐 Authentication Flow

1. **Registration**: User creates account with username, full name, email, and password
2. **Login**: User authenticates and receives JWT access/refresh tokens
3. **Token Storage**: Tokens stored in localStorage
4. **Auto-Login**: System checks for existing session on app load
5. **Protected Routes**: Messaging and account pages require authentication
6. **Auto-Redirect**: Logged-in users automatically redirected to messaging page

## 📱 Usage Guide

### For New Users
1. **Register**: Navigate to registration page and create an account
2. **Login**: Sign in with your email and password
3. **Auto-Redirect**: You'll be automatically taken to the messaging page

### Using the Messaging Interface
1. **Select Community**: Choose UIU or NSU community using the toggle buttons
2. **Start Chatting**: Click on a user from the chat list or create a new chat
3. **Change Emotions**: Use the compact emotion controls (top-right) to switch themes
4. **Send Messages**: Type your message and send - it will include the current emotion emoji
5. **Search Chats**: Use the search bar to find specific conversations

### Emotion Controls
- Located in the top-right corner of the messaging page
- Click any emotion emoji to change the chat theme
- Active emotion is highlighted
- Hover over emojis to see emotion names

## 🎯 Key Features Explained

### Emotion-Aware UI
The chat interface dynamically adapts based on selected emotions. Only the messages area changes color - the sidebar and other UI elements remain consistent for better UX.

### Community-Based Organization
Users can filter and organize chats by community (UIU or NSU), making it easy to manage conversations within specific groups. Each chat is tagged with its community.

### Message Emotion Tracking
Each message stores the emotion that was active when it was sent, and displays the corresponding emoji. This allows users to see the emotional context of past conversations.

### Smart Routing
The app intelligently routes users:
- Logged-in users visiting `/` → Redirected to `/messaging`
- Non-authenticated users visiting `/messaging` → Redirected to `/login`
- Seamless navigation based on authentication state

## 🗄️ Database Models

### User Model
- UUID primary key
- Email (unique, used for login)
- Username (unique)
- Full name
- Optional community association
- Active/staff flags

### Community Model
- UUID primary key
- Name and short code
- Privacy settings
- Creator reference

## 🔒 Security Features

- JWT-based authentication with access and refresh tokens
- Secure password handling (backend validation)
- CORS configuration for API security
- Protected API endpoints requiring authentication
- Token-based session management

## 📦 Dependencies

### Frontend
- React 19.2.0
- React Router DOM 7.12.0
- Axios 1.13.2
- Vite 7.2.4

### Backend
- Django 6.0.1
- Django REST Framework 3.16.1
- Django REST Framework Simple JWT 5.5.1
- Django CORS Headers 4.9.0
- MySQL client libraries

## 🎨 Design Philosophy

- **Minimalistic**: Clean, modern interface without clutter
- **Emotion-First**: Emotions drive the visual experience
- **Privacy-Conscious**: Secure by default
- **User-Friendly**: Intuitive navigation and clear feedback
- **Responsive**: Works on all device sizes

## 🤖 Machine Learning Integration

### ml-dev Branch Features

The `ml-dev` branch contains advanced machine learning capabilities:

#### Face Recognition Model
- **Purpose**: User identification and authentication through facial recognition
- **Integration**: Seamlessly integrated with the authentication system
- **Use Cases**: 
  - Secure login using face recognition
  - User profile photo verification
  - Enhanced security features

#### Text Emotion Recognition Model
- **Purpose**: Automatic emotion detection from message text
- **Capabilities**:
  - Analyzes message content in real-time
  - Detects emotional sentiment (Happy, Sad, Angry, Calm, Fear)
  - Suggests appropriate emotion themes
  - Enhances user experience with intelligent emotion understanding

#### How to Use ML Features

1. **Checkout the ml-dev branch:**
```bash
git checkout ml-dev
```

2. **Install ML dependencies:**
```bash
cd Backend
pip install -r requirements-ml.txt  # If separate requirements file exists
# Or install manually: tensorflow, torch, opencv-python, etc.
```

3. **Run ML-enabled backend:**
```bash
python manage.py runserver
```

4. **Access ML features:**
   - Face recognition available in login/authentication
   - Text emotion recognition active in messaging interface

> **⚠️ Note**: ML models require additional computational resources and may need GPU support for optimal performance.

## 🚧 Future Enhancements

Potential improvements for production:
- Real-time messaging with WebSockets
- File and media sharing
- Group chats
- Push notifications
- **ML Model Optimization**: Improve accuracy and performance of face/text recognition models
- Message encryption
- User presence indicators
- Message reactions and replies
- **Real-time Emotion Detection**: Live emotion analysis during video calls

## 🤝 Contributing

This project was developed for UIU Hackday. Contributions and improvements are welcome!

## 📄 License

This project is part of the UIU Hackday competition.

## 👥 Team

Developed with ❤️ for UIU Hackday

---

**Note**: This is a hackathon project. For production use, additional security measures, error handling, real-time features, and optimizations would be recommended.
