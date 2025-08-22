#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔥 Firebase Setup Helper 🔥\n');

console.log('To complete your Firebase setup, follow these steps:\n');

console.log('1. Go to https://console.firebase.google.com/');
console.log('2. Create a new project or select an existing one');
console.log('3. Click the gear icon (⚙️) next to "Project Overview"');
console.log('4. Select "Project settings"');
console.log('5. Scroll down to "Your apps" section');
console.log('6. Click the web icon (</>)');
console.log('7. Register your app with a nickname');
console.log('8. Copy the configuration object\n');

console.log('Then create a .env file in your project root with the following content:\n');

const envTemplate = `# Firebase Configuration
# Replace these with your actual Firebase project values

VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Optional: Analytics
VITE_ENABLE_ANALYTICS=false`;

console.log(envTemplate);
console.log('\nAfter creating the .env file:');
console.log('1. Enable Authentication → Sign-in method → Email/Password');
console.log('2. Create Firestore Database → Start in test mode');
console.log('3. Copy the security rules from firestore.rules to your Firestore Rules tab');
console.log('4. Restart your development server: npm run dev');

console.log('\n🎉 Your Firebase integration will be complete!');
