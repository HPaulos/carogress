import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase/config';

// User Profile Operations
export const userService = {
  // Get user profile
  async getUserProfile(uid) {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        return userDoc.data();
      }
      return null;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  },

  // Update user profile
  async updateUserProfile(uid, profileData) {
    try {
      await updateDoc(doc(db, 'users', uid), {
        ...profileData,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  },

  // Update user skills
  async updateUserSkills(uid, skills) {
    try {
      await updateDoc(doc(db, 'users', uid), {
        'profile.skills': skills,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating user skills:', error);
      throw error;
    }
  },

  // Update user experience
  async updateUserExperience(uid, experience) {
    try {
      await updateDoc(doc(db, 'users', uid), {
        'profile.experience': experience,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating user experience:', error);
      throw error;
    }
  }
};

// Career Goals Operations
export const goalsService = {
  // Get user goals
  async getUserGoals(uid) {
    try {
      const goalsQuery = query(
        collection(db, 'goals'),
        where('userId', '==', uid),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(goalsQuery);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching user goals:', error);
      throw error;
    }
  },

  // Add new goal
  async addGoal(goalData) {
    try {
      const docRef = await addDoc(collection(db, 'goals'), {
        ...goalData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding goal:', error);
      throw error;
    }
  },

  // Update goal
  async updateGoal(goalId, goalData) {
    try {
      await updateDoc(doc(db, 'goals', goalId), {
        ...goalData,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating goal:', error);
      throw error;
    }
  },

  // Delete goal
  async deleteGoal(goalId) {
    try {
      await deleteDoc(doc(db, 'goals', goalId));
    } catch (error) {
      console.error('Error deleting goal:', error);
      throw error;
    }
  }
};

// Progress Tracking Operations
export const progressService = {
  // Get user progress
  async getUserProgress(uid) {
    try {
      const progressQuery = query(
        collection(db, 'progress'),
        where('userId', '==', uid),
        orderBy('date', 'desc'),
        limit(30)
      );
      const querySnapshot = await getDocs(progressQuery);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching user progress:', error);
      throw error;
    }
  },

  // Add progress entry
  async addProgressEntry(progressData) {
    try {
      const docRef = await addDoc(collection(db, 'progress'), {
        ...progressData,
        createdAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding progress entry:', error);
      throw error;
    }
  },

  // Update progress entry
  async updateProgressEntry(entryId, progressData) {
    try {
      await updateDoc(doc(db, 'progress', entryId), {
        ...progressData,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating progress entry:', error);
      throw error;
    }
  }
};

// AI Chat History Operations
export const chatService = {
  // Get chat history
  async getChatHistory(uid) {
    try {
      const chatQuery = query(
        collection(db, 'chats'),
        where('userId', '==', uid),
        orderBy('createdAt', 'desc'),
        limit(50)
      );
      const querySnapshot = await getDocs(chatQuery);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching chat history:', error);
      throw error;
    }
  },

  // Save chat message
  async saveChatMessage(chatData) {
    try {
      const docRef = await addDoc(collection(db, 'chats'), {
        ...chatData,
        createdAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error saving chat message:', error);
      throw error;
    }
  },

  // Update chat session
  async updateChatSession(chatId, sessionData) {
    try {
      await updateDoc(doc(db, 'chats', chatId), {
        ...sessionData,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating chat session:', error);
      throw error;
    }
  }
};

// Resume and Documents Operations
export const documentsService = {
  // Get user documents
  async getUserDocuments(uid, type = null) {
    try {
      let documentsQuery = query(
        collection(db, 'documents'),
        where('userId', '==', uid),
        orderBy('createdAt', 'desc')
      );
      
      if (type) {
        documentsQuery = query(
          collection(db, 'documents'),
          where('userId', '==', uid),
          where('type', '==', type),
          orderBy('createdAt', 'desc')
        );
      }
      
      const querySnapshot = await getDocs(documentsQuery);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching user documents:', error);
      throw error;
    }
  },

  // Save document
  async saveDocument(documentData) {
    try {
      const docRef = await addDoc(collection(db, 'documents'), {
        ...documentData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error saving document:', error);
      throw error;
    }
  },

  // Update document
  async updateDocument(documentId, documentData) {
    try {
      await updateDoc(doc(db, 'documents', documentId), {
        ...documentData,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating document:', error);
      throw error;
    }
  },

  // Delete document
  async deleteDocument(documentId) {
    try {
      await deleteDoc(doc(db, 'documents', documentId));
    } catch (error) {
      console.error('Error deleting document:', error);
      throw error;
    }
  }
};
