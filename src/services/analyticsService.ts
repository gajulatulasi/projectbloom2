import { 
  collection, 
  getDocs, 
  query, 
  where, 
  orderBy,
  Timestamp,
  getCountFromServer
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Analytics } from '../types';

export class AnalyticsService {
  static async getPlatformAnalytics(): Promise<Analytics> {
    try {
      // Get total users count
      const usersSnapshot = await getCountFromServer(collection(db, 'users'));
      const totalUsers = usersSnapshot.data().count;

      // Get total courses count
      const coursesSnapshot = await getCountFromServer(collection(db, 'courses'));
      const totalCourses = coursesSnapshot.data().count;

      // Get active users (users who were active in the last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const activeUsersQuery = query(
        collection(db, 'users'),
        where('lastActive', '>=', Timestamp.fromDate(thirtyDaysAgo))
      );
      const activeUsersSnapshot = await getCountFromServer(activeUsersQuery);
      const activeUsers = activeUsersSnapshot.data().count;

      // Get enrollments for completion rate calculation
      const enrollmentsSnapshot = await getDocs(collection(db, 'enrollments'));
      const enrollments = enrollmentsSnapshot.docs.map(doc => doc.data());
      
      const completedCourses = enrollments.filter(enrollment => enrollment.progress >= 100).length;
      const courseCompletionRate = enrollments.length > 0 ? (completedCourses / enrollments.length) * 100 : 0;

      // Mock data for revenue and growth (you can implement actual payment tracking)
      const totalRevenue = 89432; // This would come from payment records
      
      // Generate mock user growth data for the last 12 months
      const userGrowth = [];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      for (let i = 0; i < 12; i++) {
        userGrowth.push({
          month: months[i],
          users: Math.floor(Math.random() * 200) + 50
        });
      }

      // Get course popularity data
      const coursesQuery = query(collection(db, 'courses'), orderBy('studentsEnrolled', 'desc'));
      const coursesSnapshot = await getDocs(coursesQuery);
      const coursePopularity = coursesSnapshot.docs.slice(0, 10).map(doc => ({
        course: doc.data().title,
        enrollments: doc.data().studentsEnrolled || 0
      }));

      // Generate mock revenue data
      const revenueData = [];
      for (let i = 0; i < 6; i++) {
        revenueData.push({
          month: months[i],
          revenue: Math.floor(Math.random() * 20000) + 50000
        });
      }

      return {
        totalUsers,
        totalCourses,
        totalRevenue,
        activeUsers,
        courseCompletionRate,
        userGrowth,
        coursePopularity,
        revenueData
      };
    } catch (error: any) {
      throw new Error(error.message || 'Failed to get analytics');
    }
  }

  static async getUserAnalytics(userId: string): Promise<any> {
    try {
      // Get user's enrollments
      const enrollmentsQuery = query(
        collection(db, 'enrollments'),
        where('studentId', '==', userId)
      );
      const enrollmentsSnapshot = await getDocs(enrollmentsQuery);
      const enrollments = enrollmentsSnapshot.docs.map(doc => doc.data());

      const totalCourses = enrollments.length;
      const completedCourses = enrollments.filter(e => e.progress >= 100).length;
      const averageProgress = enrollments.length > 0 
        ? enrollments.reduce((sum, e) => sum + (e.progress || 0), 0) / enrollments.length 
        : 0;

      // Calculate total learning time (mock data - you'd track this in real implementation)
      const totalHours = Math.floor(Math.random() * 100) + 20;

      return {
        totalCourses,
        completedCourses,
        averageProgress,
        totalHours,
        enrollments
      };
    } catch (error: any) {
      throw new Error(error.message || 'Failed to get user analytics');
    }
  }

  static async getTeacherAnalytics(teacherId: string): Promise<any> {
    try {
      // Get teacher's courses
      const coursesQuery = query(
        collection(db, 'courses'),
        where('teacherId', '==', teacherId)
      );
      const coursesSnapshot = await getDocs(coursesQuery);
      const courses = coursesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      const totalCourses = courses.length;
      const publishedCourses = courses.filter(c => c.isPublished).length;
      const totalStudents = courses.reduce((sum, course) => sum + (course.studentsEnrolled || 0), 0);
      const averageRating = courses.length > 0 
        ? courses.reduce((sum, course) => sum + (course.rating || 0), 0) / courses.length 
        : 0;

      // Calculate total revenue (mock data)
      const totalRevenue = totalStudents * 50; // Assuming average course price

      return {
        totalCourses,
        publishedCourses,
        totalStudents,
        averageRating,
        totalRevenue,
        courses
      };
    } catch (error: any) {
      throw new Error(error.message || 'Failed to get teacher analytics');
    }
  }
}