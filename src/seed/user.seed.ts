function generateRandomName(): string {
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
  ];
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
  ];

  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${firstName} ${lastName}`;
}

function generateRandomEmail(name: string): string {
  const domains = ['example.com', 'mail.com', 'test.org'];
  const emailName = name.toLowerCase().replace(' ', '.');
  const domain = domains[Math.floor(Math.random() * domains.length)];
  return `${emailName}@${domain}`;
}

function generateRandomUser(): any {
  const name = generateRandomName();
  const email = generateRandomEmail(name);
  const password = 'defaultPassword'; // You might want to generate a more secure password
  const age = Math.floor(Math.random() * 30) + 18; // Random age between 18 and 48
  const gender = Math.floor(Math.random() * 2) + 1; // Random gender 1 or 2
  const startYear = Math.floor(Math.random() * 3) + 2020; // Random start year between 2020 and 2023
  const courses = ['Course 1', 'Course 2', 'Course 3'];
  const course = courses[Math.floor(Math.random() * courses.length)];
  const reports = Math.floor(Math.random() * 10); // Random reports count between 0 and 9

  return {
    email,
    name,
    password,
    age,
    gender,
    startYear,
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
