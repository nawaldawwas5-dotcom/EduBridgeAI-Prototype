
export type Language = 'en' | 'ar';
export type DegreeLevel = 'undergraduate' | 'postgraduate';
export type AcademicYear = 'freshman' | 'sophomore' | 'junior' | 'senior' | 'graduate';

export type ThemeType = 'forest' | 'ocean' | 'classic';
export type MentorGender = 'male' | 'female';

export interface Recommendation {
  name: string;
  type: 'Course' | 'Documentation' | 'Project';
  url: string;
}

export interface SkillNode {
  id: string;
  labelEn: string;
  labelAr: string;
  status: 'mastered' | 'gap' | 'locked';
  x: number;
  y: number;
  descriptionEn?: string;
  descriptionAr?: string;
  recommendations?: Recommendation[];
}

export interface CompanyOpportunity {
  name: string;
  distance: string;
  role: string;
  salaryRange: string;
  type: 'Startup' | 'Corporate';
  cultureMatch: string;
}

export type ViewType = 'onboarding' | 'survey' | 'compass' | 'dashboard' | 'roadmap' | 'projects' | 'talent' | 'cv-sculptor' | 'job-market' | 'pricing' | 'profile' | 'virtual-lab';

export interface CareerInsight {
  title: string;
  description: string;
  salaryInsights: {
    entry: string;
    senior: string;
  };
}

export interface SurveyData {
  personaType: string;
  personaDescription: string;
  skillDNA: Record<string, number>;
  careerMapping?: CareerInsight[];
  companyCultureFit: 'Startup' | 'Corporate';
  marketGapInsight: string;
  majorSpecificQuestions?: Array<{id: string, qEn: string, qAr: string, category: string, options: any[]}>;
}

export interface UserProfile {
  name: string;
  university: string;
  major: string;
  degreeLevel: DegreeLevel;
  academicYear?: AcademicYear;
  email: string;
  bio?: string;
  profileImage?: string;
  cvName?: string;
  cvData?: string;
  skills: string[];
  projects: string;
  personality: string;
  isPremium: boolean;
  isOnboarded: boolean;
  trialStartDate?: number;
  surveyData?: SurveyData;
  mentorGender: MentorGender;
  theme: ThemeType;
  isDarkMode: boolean;
  streak: number;
  lastActiveDate?: string;
}

export interface ProjectCard {
  id: string;
  title: string;
  time: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  skillGain: string;
  partnerLogo: string;
}

export interface TalentProfile {
  id: string;
  name: string;
  university: string;
  major: string;
  readinessScore: number;
  projectsCompleted: number;
  lastActive: string;
  summaryTags: string[];
  invited?: boolean;
}

export interface VirtualTask {
  id: string;
  sender: string;
  subject: string;
  body: string;
  deadline: string;
  category: string;
}
