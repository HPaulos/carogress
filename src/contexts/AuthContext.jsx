import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  updatePassword
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);

  // Sign up function
  const signup = async (email, password, displayName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update display name
      await updateProfile(userCredential.user, {
        displayName: displayName
      });

      // Create user profile in Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        uid: userCredential.user.uid,
        email: email,
        displayName: displayName,
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString(),
        profile: {
          bio: '',
          avatar: '',
          skills: [],
          experience: [],
          education: [],
          goals: []
        }
      });

      return userCredential.user;
    } catch (error) {
      throw error;
    }
  };

  // Sign in function
  const signin = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Update last login
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        lastLogin: new Date().toISOString()
      }, { merge: true });

      return userCredential.user;
    } catch (error) {
      throw error;
    }
  };

  // Sign out function
  const signout = () => {
    return signOut(auth);
  };

  // Password reset function
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // Get user profile from Firestore
  const getUserProfile = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        return userDoc.data();
      }
      return null;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  };

  // Update user profile
  const updateUserProfile = async (uid, profileData) => {
    try {
      await setDoc(doc(db, 'users', uid), {
        profile: profileData
      }, { merge: true });
      
      // Update local state
      if (userProfile) {
        setUserProfile({
          ...userProfile,
          profile: profileData
        });
      }
    } catch (error) {
      throw error;
    }
  };

  // Update password function
  const updatePassword = async (newPassword) => {
    try {
      if (!currentUser) {
        throw new Error('No user is currently signed in');
      }
      
      await updatePassword(currentUser, newPassword);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        // Fetch user profile
        const profile = await getUserProfile(user.uid);
        setUserProfile(profile);
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userProfile,
    signup,
    signin,
    signout,
    resetPassword,
    getUserProfile,
    updateUserProfile,
    updatePassword,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
