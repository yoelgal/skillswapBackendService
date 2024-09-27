import { courses } from '../src/utils/courses.data';

function getFirstNameFromEmail(email: string): string {
  return email[0].toUpperCase() + email.slice(1).split('.')[0];
}

function generateRandomEmail(): string {
  const firstNames = [
    'John',
    'Jane',
    'Chris',
    'Laura',
    'Mike',
    'Lily',
    'Robert',
    'Anna',
    'Sarah',
    'David',
    'Emily',
    'Daniel',
    'Sophia',
    'James',
    'Olivia',
    'Michael',
    'Benjamin',
    'Charlotte',
    'Jacob',
    'Amelia',
    'Mason',
    'Mia',
    'Ethan',
    'Harper',
    'Alexander',
    'Evelyn',
  ].map((name) => name.toLowerCase());
  const lastNames = [
    'Smith',
    'Johnson',
    'Williams',
    'Brown',
    'Jones',
    'Garcia',
    'Miller',
    'Davis',
    'Rodriguez',
    'Martinez',
    'Hernandez',
    'Lopez',
    'Gonzalez',
    'Wilson',
    'Anderson',
    'Thomas',
    'Taylor',
    'Moore',
    'Jackson',
    'Martin',
    'Lee',
    'Perez',
    'Thompson',
    'White',
    'Harris',
    'Sanchez',
    'Clark',
    'Ramirez',
    'Lewis',
    'Robinson',
  ].map((name) => name.toLowerCase());

  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

  return `${firstName}.${lastName}@student.manchester.ac.uk`;
}

function pickRandomCourse(): string {
  let course: string;
  while (true) {
    course = courses[Math.floor(Math.random() * courses.length)];
    if (course.slice(-7) !== 'COURSES') {
      break;
    }
  }
  return course;
}

function generateRandomUser(): any {
  const email = generateRandomEmail();
  const name = getFirstNameFromEmail(email);
  const password = 'defaultPassword'; // You might want to generate a more secure password
  const age = Math.floor(Math.random() * 10) + 18; // Random age between 18 and 48
  const gender = Math.floor(Math.random() * 2) + 1; // Random gender 1 or 2
  const yearOfStudy = Math.floor(Math.random() * 5) + 1; // Random start year between 2020 and 2023;
  const course = pickRandomCourse();
  const reports = Math.floor(Math.random() * 10); // Random number of reports between 0 and 9

  return {
    email,
    name,
    password,
    age,
    gender,
    yearOfStudy,
    course,
    reports,
  };
}

const customUser = {
  email: 'chuck.norris@student.manchester.ac.uk',
  name: 'Chuck',
  password: '123',
  age: 20,
  gender: 1,
  yearOfStudy: 1,
  course: 'Cognitive Neuroscience and Psychology (BSc)',
  reports: 0,
};

const customUser1 = {
  email: 'manuel.chester@student.manchester.ac.uk',
  name: 'Manuel',
  password: '123',
  age: 20,
  gender: 1,
  yearOfStudy: 1,
  course: 'Geography (BSc)',
  reports: 0,
};

const yoelUser = {
  email: 'yoel.gal@student.manchester.ac.uk',
  name: 'Yoel',
  password: '123',
  age: 19,
  gender: 1,
  yearOfStudy: 1,
  course: 'Computer Science (BSc)',
  reports: 0,
};

function generateUserSeed(): any[] {
  const users: any[] = [];
  users.push(customUser, customUser1, yoelUser);
  for (let i = 0; i < 250; i++) {
    users.push(generateRandomUser());
  }
  return users;
}

export const userSeed = generateUserSeed();
