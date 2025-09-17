
export interface Course {
  id: string;
  name: string;
  day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri';
  startTime: string;
  endTime: string;
  room: string;
  faculty: string;
  color: string;
}

const sampleCourses: Course[] = [
  { id: '1', name: 'NEP 2020 Framework', day: 'Mon', startTime: '9:00', endTime: '10:00', room: 'A101', faculty: 'Dr. Sharma', color: '#FFADAD' },
  { id: '2', name: 'Data Structures', day: 'Tue', startTime: '10:00', endTime: '12:00', room: 'B203', faculty: 'Prof. Jones', color: '#FFD6A5' },
  { id: '3', name: 'AI in Education', day: 'Wed', startTime: '11:00', endTime: '12:00', room: 'C305', faculty: 'Dr. Verma', color: '#FDFFB6' },
  { id: '4', name: 'Machine Learning Lab', day: 'Mon', startTime: '14:00', endTime: '16:00', room: 'Lab 1', faculty: 'Dr. Smith', color: '#CAFFBF' },
  { id: '5', name: 'B.Ed. Pedagogy', day: 'Fri', startTime: '9:00', endTime: '11:00', room: 'D401', faculty: 'Prof. Patel', color: '#9BF6FF' },
  { id: '6', name: 'FYUP Curriculum Design', day: 'Thu', startTime: '13:00', endTime: '15:00', room: 'B203', faculty: 'Dr. Lee', color: '#A0C4FF' },
  { id: '7', name: 'ITEP Workshop', day: 'Tue', startTime: '14:00', endTime: '17:00', room: 'Hall 2', faculty: 'Guest Speaker', color: '#BDB2FF' },
];


export const fetchCourses = (): Promise<Course[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(sampleCourses);
    }, 500); // Simulate network delay
  });
};
