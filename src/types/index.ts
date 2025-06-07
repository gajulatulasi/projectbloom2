export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'teacher' | 'admin';
  avatar?: string;
  bio?: string;
  badges: Badge[];
  xp: number;
  level: number;
  streak: number;
  joinedAt: Date;
  lastActive: Date;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  teacherId: string;
  teacherName: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  studentsEnrolled: number;
  rating: number;
  price: number;
  lessons: Lesson[];
  createdAt: Date;
  updatedAt: Date;
  isPublished: boolean;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  videoUrl?: string;
  materials: Material[];
  assignments: Assignment[];
  quizzes: Quiz[];
  order: number;
  duration: number;
  isCompleted?: boolean;
}

export interface Material {
  id: string;
  title: string;
  type: 'pdf' | 'doc' | 'video' | 'link';
  url: string;
  size?: string;
}

export interface Assignment {
  id: string;
  lessonId: string;
  title: string;
  description: string;
  dueDate: Date;
  maxPoints: number;
  submissions: Submission[];
  createdAt: Date;
}

export interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  content: string;
  attachments: string[];
  submittedAt: Date;
  status: 'submitted' | 'graded' | 'pending';
  grade?: number;
  feedback?: string;
}

export interface Quiz {
  id: string;
  lessonId: string;
  title: string;
  questions: Question[];
  timeLimit: number;
  attempts: number;
  passingScore: number;
}

export interface Question {
  id: string;
  type: 'mcq' | 'subjective' | 'true-false';
  question: string;
  options?: string[];
  correctAnswer: string | number;
  points: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  earnedAt?: Date;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: Date;
}

export interface Analytics {
  totalUsers: number;
  totalCourses: number;
  totalRevenue: number;
  activeUsers: number;
  courseCompletionRate: number;
  userGrowth: { month: string; users: number }[];
  coursePopularity: { course: string; enrollments: number }[];
  revenueData: { month: string; revenue: number }[];
}