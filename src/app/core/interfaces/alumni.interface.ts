export interface Alumni {
  id: number;
  name: string;
  graduationYear: number;
  degree: string;
  currentPosition: string;
  company: string;
  profileImage: string;
  bio: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
  careerCategory: string; // e.g., 'Engineering', 'Healthcare', 'Business'
}
