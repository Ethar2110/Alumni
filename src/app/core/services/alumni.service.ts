import { Injectable, signal, computed } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Alumni } from '../interfaces/alumni.interface';

@Injectable({
  providedIn: 'root'
})
export class AlumniService {
  private alumniSignal = signal<Alumni[]>([
    {
      id: 1,
      name: 'John Doe',
      graduationYear: 2018,
      degree: 'B.Sc. Computer Science',
      currentPosition: 'Senior Software Engineer',
      company: 'Google',
      profileImage: 'https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff',
      bio: 'John represents the excellence of our CS department with his rapid growth in the tech industry.',
      careerCategory: 'Engineering',
      email: 'john.doe@example.com'
    },
    {
      id: 2,
      name: 'Jane Smith',
      graduationYear: 2019,
      degree: 'B.A. Graphic Design',
      currentPosition: 'UX Designer',
      company: 'Apple',
      profileImage: 'https://ui-avatars.com/api/?name=Jane+Smith&background=E91E63&color=fff',
      bio: 'Jane has won multiple awards for her innovative design approaches.',
      careerCategory: 'Design',
      email: 'jane.smith@example.com'
    },
    {
      id: 3,
      name: 'Michael Brown',
      graduationYear: 2015,
      degree: 'MBA',
      currentPosition: 'Product Manager',
      company: 'Microsoft',
      profileImage: 'https://ui-avatars.com/api/?name=Michael+Brown&background=9C27B0&color=fff',
      bio: 'Michael leads a team of 50 people delivering cloud solutions.',
      careerCategory: 'Business',
      email: 'michael.brown@example.com'
    },
    {
      id: 4,
      name: 'Emily Davis',
      graduationYear: 2020,
      degree: 'B.Sc. Nursing',
      currentPosition: 'Registered Nurse',
      company: 'Mayo Clinic',
      profileImage: 'https://ui-avatars.com/api/?name=Emily+Davis&background=009688&color=fff',
      bio: 'Emily is dedicated to patient care and has been recognized for her service.',
      careerCategory: 'Healthcare',
      email: 'emily.davis@example.com'
    },
    {
        id: 5,
        name: 'David Wilson',
        graduationYear: 2016,
        degree: 'B.Eng. Mechanical Engineering',
        currentPosition: 'Mechanical Engineer',
        company: 'Tesla',
        profileImage: 'https://ui-avatars.com/api/?name=David+Wilson&background=FF5722&color=fff',
        bio: 'David works on the next generation of electric vehicles.',
        careerCategory: 'Engineering',
        email: 'david.wilson@example.com'
    },
    {
        id: 6,
        name: 'Sarah Johnson',
        graduationYear: 2017,
        degree: 'B.Sc. Biology',
        currentPosition: 'Research Scientist',
        company: 'Pfizer',
        profileImage: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=673AB7&color=fff',
        bio: 'Sarah is contributing to ground-breaking research in immunology.',
        careerCategory: 'Science',
        email: 'sarah.johnson@example.com'
    },
    {
        id: 7,
        name: 'Robert Miller',
        graduationYear: 2018,
        degree: 'B.A. Education',
        currentPosition: 'High School Teacher',
        company: 'City High School',
        profileImage: 'https://ui-avatars.com/api/?name=Robert+Miller&background=FFC107&color=fff',
        bio: 'Robert is inspiring the next generation of students.',
        careerCategory: 'Education',
        email: 'robert.miller@example.com'
    },
    {
        id: 8,
        name: 'Jessica Taylor',
        graduationYear: 2021,
        degree: 'B.Sc. Data Science',
        currentPosition: 'Data Analyst',
        company: 'Amazon',
        profileImage: 'https://ui-avatars.com/api/?name=Jessica+Taylor&background=3F51B5&color=fff',
        bio: 'Jessica analyzes big data to drive business decisions.',
        careerCategory: 'Technology',
        email: 'jessica.taylor@example.com'
    },
    {
        id: 9,
        name: 'William Anderson',
        graduationYear: 2014,
        degree: 'B.A. Journalism',
        currentPosition: 'Journalist',
        company: 'The New York Times',
        profileImage: 'https://ui-avatars.com/api/?name=William+Anderson&background=795548&color=fff',
        bio: 'William covers international politics and human rights.',
        careerCategory: 'Media',
        email: 'william.anderson@example.com'
    },
    {
        id: 10,
        name: 'Olivia Thomas',
        graduationYear: 2019,
        degree: 'B.Fine Arts',
        currentPosition: 'Art Director',
        company: 'Creative Agency',
        profileImage: 'https://ui-avatars.com/api/?name=Olivia+Thomas&background=E91E63&color=fff',
        bio: 'Olivia oversees creative direction for major brand campaigns.',
        careerCategory: 'Arts',
        email: 'olivia.thomas@example.com'
    }
  ]);

  // Expose signal as read-only
  alumni = this.alumniSignal.asReadonly();

  constructor() { }

  getAlumni(): Observable<Alumni[]> {
    return of(this.alumniSignal());
  }

  getAlumniById(id: number): Observable<Alumni | undefined> {
    const alumni = this.alumniSignal().find(a => a.id === id);
    return of(alumni);
  }

  getCareerCategories(): Observable<string[]> {
    const categories = new Set(this.alumniSignal().map(a => a.careerCategory));
    return of(Array.from(categories));
  }

  addAlumni(alumni: Omit<Alumni, 'id'>): Observable<Alumni> {
    const newAlumni: Alumni = {
      ...alumni,
      id: this.alumniSignal().length > 0 ? Math.max(...this.alumniSignal().map(a => a.id)) + 1 : 1
    };
    this.alumniSignal.update(list => [...list, newAlumni]);
    return of(newAlumni);
  }

  updateAlumni(id: number, data: Partial<Alumni>): Observable<Alumni | undefined> {
    let updatedAlumni: Alumni | undefined;
    this.alumniSignal.update(list => {
      return list.map(a => {
        if (a.id === id) {
          updatedAlumni = { ...a, ...data };
          return updatedAlumni;
        }
        return a;
      });
    });
    return of(updatedAlumni);
  }

  deleteAlumni(id: number): Observable<boolean> {
    this.alumniSignal.update(list => list.filter(a => a.id !== id));
    return of(true);
  }
}
