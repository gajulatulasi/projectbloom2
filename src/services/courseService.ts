import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit,
  serverTimestamp,
  increment
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Course, Lesson } from '../types';

export class CourseService {
  static async createCourse(courseData: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, 'courses'), {
        ...courseData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to create course');
    }
  }

  static async updateCourse(courseId: string, updates: Partial<Course>): Promise<void> {
    try {
      const courseRef = doc(db, 'courses', courseId);
      await updateDoc(courseRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
    } catch (error: any) {
      throw new Error(error.message || 'Failed to update course');
    }
  }

  static async deleteCourse(courseId: string): Promise<void> {
    try {
      await deleteDoc(doc(db, 'courses', courseId));
    } catch (error: any) {
      throw new Error(error.message || 'Failed to delete course');
    }
  }

  static async getCourseById(courseId: string): Promise<Course | null> {
    try {
      const courseDoc = await getDoc(doc(db, 'courses', courseId));
      
      if (!courseDoc.exists()) {
        return null;
      }

      const data = courseDoc.data();
      return {
        id: courseDoc.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date()
      } as Course;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to get course');
    }
  }

  static async getCourses(filters?: {
    teacherId?: string;
    category?: string;
    level?: string;
    isPublished?: boolean;
    limit?: number;
  }): Promise<Course[]> {
    try {
      let q = query(collection(db, 'courses'));

      if (filters?.teacherId) {
        q = query(q, where('teacherId', '==', filters.teacherId));
      }
      
      if (filters?.category) {
        q = query(q, where('category', '==', filters.category));
      }
      
      if (filters?.level) {
        q = query(q, where('level', '==', filters.level));
      }
      
      if (filters?.isPublished !== undefined) {
        q = query(q, where('isPublished', '==', filters.isPublished));
      }

      q = query(q, orderBy('createdAt', 'desc'));

      if (filters?.limit) {
        q = query(q, limit(filters.limit));
      }

      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date()
      })) as Course[];
    } catch (error: any) {
      throw new Error(error.message || 'Failed to get courses');
    }
  }

  static async enrollStudent(courseId: string, studentId: string): Promise<void> {
    try {
      // Add enrollment record
      await addDoc(collection(db, 'enrollments'), {
        courseId,
        studentId,
        enrolledAt: serverTimestamp(),
        progress: 0,
        completedLessons: []
      });

      // Update course enrollment count
      const courseRef = doc(db, 'courses', courseId);
      await updateDoc(courseRef, {
        studentsEnrolled: increment(1)
      });
    } catch (error: any) {
      throw new Error(error.message || 'Failed to enroll student');
    }
  }

  static async getStudentEnrollments(studentId: string): Promise<any[]> {
    try {
      const q = query(
        collection(db, 'enrollments'),
        where('studentId', '==', studentId)
      );
      
      const querySnapshot = await getDocs(q);
      
      const enrollments = [];
      for (const doc of querySnapshot.docs) {
        const enrollmentData = doc.data();
        const course = await this.getCourseById(enrollmentData.courseId);
        
        if (course) {
          enrollments.push({
            id: doc.id,
            course,
            progress: enrollmentData.progress || 0,
            enrolledAt: enrollmentData.enrolledAt?.toDate() || new Date(),
            completedLessons: enrollmentData.completedLessons || []
          });
        }
      }
      
      return enrollments;
    } catch (error: any) {
      throw new Error(error.message || 'Failed to get enrollments');
    }
  }

  static async updateProgress(enrollmentId: string, progress: number, completedLessons: string[]): Promise<void> {
    try {
      const enrollmentRef = doc(db, 'enrollments', enrollmentId);
      await updateDoc(enrollmentRef, {
        progress,
        completedLessons,
        lastAccessed: serverTimestamp()
      });
    } catch (error: any) {
      throw new Error(error.message || 'Failed to update progress');
    }
  }
}