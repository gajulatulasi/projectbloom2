import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { User } from '../types';

export class AuthService {
  static async signUp(email: string, password: string, name: string, role: 'student' | 'teacher'): Promise<User> {
    try {
      // Create user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Update the user's display name
      await updateProfile(firebaseUser, { displayName: name });

      // Create user document in Firestore
      const userData: Omit<User, 'id'> = {
        email,
        name,
        role,
        badges: [],
        xp: 0,
        level: 1,
        streak: 0,
        joinedAt: new Date(),
        lastActive: new Date()
      };

      await setDoc(doc(db, 'users', firebaseUser.uid), {
        ...userData,
        joinedAt: serverTimestamp(),
        lastActive: serverTimestamp()
      });

      return {
        id: firebaseUser.uid,
        ...userData
      };
    } catch (error: any) {
      throw new Error(error.message || 'Failed to create account');
    }
  }

  static async signIn(email: string, password: string): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;

      // Get user data from Firestore
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
      
      if (!userDoc.exists()) {
        throw new Error('User data not found');
      }

      const userData = userDoc.data();
      
      // Update last active timestamp
      await updateDoc(doc(db, 'users', firebaseUser.uid), {
        lastActive: serverTimestamp()
      });

      return {
        id: firebaseUser.uid,
        email: userData.email,
        name: userData.name,
        role: userData.role,
        avatar: userData.avatar,
        bio: userData.bio,
        badges: userData.badges || [],
        xp: userData.xp || 0,
        level: userData.level || 1,
        streak: userData.streak || 0,
        joinedAt: userData.joinedAt?.toDate() || new Date(),
        lastActive: new Date()
      };
    } catch (error: any) {
      throw new Error(error.message || 'Failed to sign in');
    }
  }

  static async signOut(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error: any) {
      throw new Error(error.message || 'Failed to sign out');
    }
  }

  static onAuthStateChanged(callback: (user: User | null) => void): () => void {
    return onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        try {
          // Get user data from Firestore
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            const user: User = {
              id: firebaseUser.uid,
              email: userData.email,
              name: userData.name,
              role: userData.role,
              avatar: userData.avatar,
              bio: userData.bio,
              badges: userData.badges || [],
              xp: userData.xp || 0,
              level: userData.level || 1,
              streak: userData.streak || 0,
              joinedAt: userData.joinedAt?.toDate() || new Date(),
              lastActive: userData.lastActive?.toDate() || new Date()
            };
            callback(user);
          } else {
            callback(null);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          callback(null);
        }
      } else {
        callback(null);
      }
    });
  }

  static async updateUserProfile(userId: string, updates: Partial<User>): Promise<void> {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        ...updates,
        lastActive: serverTimestamp()
      });
    } catch (error: any) {
      throw new Error(error.message || 'Failed to update profile');
    }
  }

  static async getUserById(userId: string): Promise<User | null> {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      
      if (!userDoc.exists()) {
        return null;
      }

      const userData = userDoc.data();
      return {
        id: userId,
        email: userData.email,
        name: userData.name,
        role: userData.role,
        avatar: userData.avatar,
        bio: userData.bio,
        badges: userData.badges || [],
        xp: userData.xp || 0,
        level: userData.level || 1,
        streak: userData.streak || 0,
        joinedAt: userData.joinedAt?.toDate() || new Date(),
        lastActive: userData.lastActive?.toDate() || new Date()
      };
    } catch (error: any) {
      throw new Error(error.message || 'Failed to get user');
    }
  }
}