function getFirstNameFromEmail(email: string): string {
  return email[0].toUpperCase() + email.slice(1).split('.')[0];
}

function generateRandomEmail(): string {
  const domains = ['example.com', 'mail.com', 'test.org'];
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

  const domain = domains[Math.floor(Math.random() * domains.length)];
  return `${firstName}.${lastName}@${domain}`;
}

function generateRandomUser(): any {
  const email = generateRandomEmail();
  const name = getFirstNameFromEmail(email);
  const password = 'defaultPassword'; // You might want to generate a more secure password
  const age = Math.floor(Math.random() * 10) + 18; // Random age between 18 and 48
  const gender = Math.floor(Math.random() * 2) + 1; // Random gender 1 or 2
  const yearOfStudy = Math.floor(Math.random() * 5) + 1; // Random start year between 2020 and 2023
  const courses = ['Course 1', 'Course 2', 'Course 3'];
  const course = courses[Math.floor(Math.random() * courses.length)];
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

function generateUserSeed(): any[] {
  const users: any[] = [];
  for (let i = 0; i < 250; i++) {
    users.push(generateRandomUser());
  }
  return users;
}

export const userSeed = generateUserSeed();
