# Firebase Integration Setup Guide

This guide will help you set up Firebase for the AI Career Progress Tracker application.

## 🚀 Quick Start

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Enter your project name (e.g., "ai-career-progress-tracker")
4. Choose whether to enable Google Analytics (recommended)
5. Click "Create project"

### 2. Enable Authentication

1. In your Firebase project, go to "Authentication" in the left sidebar
2. Click "Get started"
3. Go to the "Sign-in method" tab
4. Enable "Email/Password" authentication
5. Click "Save"

### 3. Set Up Firestore Database

1. Go to "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" for development (you can secure it later)
4. Select a location for your database (choose the closest to your users)
5. Click "Done"

### 4. Get Your Firebase Configuration

1. Click the gear icon (⚙️) next to "Project Overview"
2. Select "Project settings"
3. Scroll down to "Your apps" section
4. Click the web icon (</>)
5. Register your app with a nickname (e.g., "ai-career-tracker-web")
6. Copy the configuration object

### 5. Set Up Environment Variables

1. Create a `.env` file in your project root
2. Copy the contents from `env.example`
3. Replace the placeholder values with your actual Firebase config:

```env
VITE_FIREBASE_API_KEY=your_actual_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 6. Set Up Firestore Security Rules

In your Firestore Database, go to the "Rules" tab and add these security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Goals - users can only access their own goals
    match /goals/{goalId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
    
    // Progress - users can only access their own progress
    match /progress/{progressId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
    
    // Chats - users can only access their own chats
    match /chats/{chatId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
    
    // Documents - users can only access their own documents
    match /documents/{documentId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
  }
}
```

## 📁 Database Structure

The application uses the following Firestore collections:

### Users Collection
```javascript
users/{userId} {
  uid: string,
  email: string,
  displayName: string,
  createdAt: timestamp,
  lastLogin: timestamp,
  profile: {
    bio: string,
    avatar: string,
    skills: array,
    experience: array,
    education: array,
    goals: array
  }
}
```

### Goals Collection
```javascript
goals/{goalId} {
  userId: string,
  title: string,
  description: string,
  targetDate: timestamp,
  status: string, // 'active', 'completed', 'paused'
  category: string,
  priority: string, // 'low', 'medium', 'high'
  progress: number, // 0-100
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### Progress Collection
```javascript
progress/{progressId} {
  userId: string,
  date: timestamp,
  activities: array,
  hoursSpent: number,
  goalsProgress: array,
  notes: string,
  mood: string,
  createdAt: timestamp
}
```

### Chats Collection
```javascript
chats/{chatId} {
  userId: string,
  sessionId: string,
  message: string,
  response: string,
  type: string, // 'career_advice', 'interview_prep', 'skill_development'
  createdAt: timestamp
}
```

### Documents Collection
```javascript
documents/{documentId} {
  userId: string,
  type: string, // 'resume', 'cover_letter', 'portfolio'
  title: string,
  content: string,
  version: number,
  isPublic: boolean,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

## 🔧 Features Implemented

### ✅ Authentication
- Email/password sign up and sign in
- Password reset functionality
- User profile management
- Protected routes

### ✅ User Management
- User profile creation and updates
- Skills and experience tracking
- Profile data persistence

### ✅ Database Operations
- CRUD operations for all collections
- Real-time data synchronization
- Secure data access with user-based permissions

### ✅ Error Handling
- Comprehensive error handling for Firebase operations
- User-friendly error messages
- Graceful fallbacks

## 🚀 Next Steps

### 1. Enable Additional Authentication Methods
- Google Sign-In
- GitHub Sign-In
- Phone number authentication

### 2. Set Up Storage
- Enable Firebase Storage for file uploads
- Configure storage rules for user avatars and documents

### 3. Enable Analytics
- Set up Firebase Analytics for user behavior tracking
- Configure custom events for career progress tracking

### 4. Set Up Hosting
- Deploy your app to Firebase Hosting
- Configure custom domain (optional)

### 5. Performance Monitoring
- Enable Firebase Performance Monitoring
- Monitor app performance and user experience

## 🔒 Security Best Practices

1. **Environment Variables**: Never commit your Firebase config to version control
2. **Security Rules**: Always implement proper Firestore security rules
3. **Authentication**: Use Firebase Auth for all user authentication
4. **Data Validation**: Validate data on both client and server side
5. **Rate Limiting**: Implement rate limiting for sensitive operations

## 🐛 Troubleshooting

### Common Issues

1. **"Firebase App named '[DEFAULT]' already exists"**
   - Make sure you're not initializing Firebase multiple times
   - Check that your config file is only imported once

2. **"Permission denied" errors**
   - Check your Firestore security rules
   - Ensure the user is authenticated
   - Verify the user has permission to access the data

3. **Environment variables not loading**
   - Make sure your `.env` file is in the project root
   - Restart your development server after adding environment variables
   - Check that variable names start with `VITE_`

4. **Authentication not working**
   - Verify your Firebase config is correct
   - Check that Email/Password authentication is enabled
   - Ensure your domain is authorized in Firebase Console

## 📞 Support

If you encounter any issues:
1. Check the [Firebase Documentation](https://firebase.google.com/docs)
2. Review the Firebase Console for error logs
3. Check the browser console for client-side errors
4. Verify your environment variables are correctly set

## 🎉 You're Ready!

Your Firebase integration is now complete! The application will:
- Handle user authentication securely
- Store and retrieve user data from Firestore
- Provide real-time updates
- Scale automatically with your user base

Start building amazing career tracking features! 🚀
