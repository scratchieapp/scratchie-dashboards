import type { User, UserActivity } from '../types/user';

const firstNames = ['James', 'Sarah', 'Michael', 'Emma', 'David', 'Lisa', 'John', 'Jessica', 'Robert', 'Jennifer', 
                    'William', 'Linda', 'Richard', 'Patricia', 'Joseph', 'Mary', 'Thomas', 'Barbara', 'Christopher', 'Elizabeth',
                    'Daniel', 'Susan', 'Matthew', 'Margaret', 'Anthony', 'Dorothy', 'Mark', 'Sandra', 'Donald', 'Ashley',
                    'Paul', 'Kimberly', 'Steven', 'Donna', 'Andrew', 'Emily', 'Kenneth', 'Michelle', 'Joshua', 'Carol'];

const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
                   'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin',
                   'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson',
                   'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores'];

const departments = ['Kitchen', 'Front Counter', 'Drive-Thru', 'Maintenance', 'Management', 'Training'];

const sites = ['McDonald\'s Chisholm', 'McDonald\'s Newtown', 'McDonald\'s Riverside', 'McDonald\'s Central', 
               'McDonald\'s Westfield', 'McDonald\'s Airport'];

function generatePhone(): string {
  return `04${Math.floor(10000000 + Math.random() * 90000000)}`;
}

function generateEmail(firstName: string, lastName: string): string {
  return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;
}

function randomDate(start: Date, end: Date): Date {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function generateCompanyUsers(count: number): User[] {
  const users: User[] = [];
  const roles: Array<User['role']> = ['Company Owner', 'Company Admin', 'Site Superadmin', 'Site Admin', 'Site Manager', 'Site Worker'];
  const roleWeights = [1, 2, 3, 10, 20, 64]; // Percentage weights for each role
  
  for (let i = 0; i < count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const createdDate = randomDate(new Date(2022, 0, 1), new Date());
    const lastActiveDate = randomDate(createdDate, new Date());
    
    // Determine status based on last active date
    const daysSinceActive = Math.floor((new Date().getTime() - lastActiveDate.getTime()) / (1000 * 60 * 60 * 24));
    let status: User['status'] = 'active';
    if (daysSinceActive > 30) status = 'inactive';
    else if (daysSinceActive > 7 && Math.random() > 0.7) status = 'inactive';
    
    // Weighted role selection
    const rand = Math.random() * 100;
    let cumWeight = 0;
    let selectedRole: User['role'] = 'Site Worker';
    for (let j = 0; j < roles.length; j++) {
      cumWeight += roleWeights[j];
      if (rand <= cumWeight) {
        selectedRole = roles[j];
        break;
      }
    }
    
    // Assign sites based on role
    let assignedSites: string[] = [];
    if (selectedRole === 'Company Owner' || selectedRole === 'Company Admin') {
      assignedSites = [...sites]; // Access to all sites
    } else {
      // Assign 1-3 random sites
      const siteCount = Math.floor(Math.random() * 3) + 1;
      const shuffled = [...sites].sort(() => 0.5 - Math.random());
      assignedSites = shuffled.slice(0, siteCount);
    }
    
    users.push({
      id: `user-${i + 1}`,
      firstName,
      lastName,
      email: generateEmail(firstName, lastName),
      mobile: generatePhone(),
      role: selectedRole,
      status,
      sites: assignedSites,
      department: departments[Math.floor(Math.random() * departments.length)],
      lastActive: lastActiveDate,
      createdAt: createdDate,
      updatedAt: lastActiveDate,
      convoCardsCreated: Math.floor(Math.random() * 10),
      normalScratchiesReceived: Math.floor(Math.random() * 30),
      turboScratchiesReceived: Math.floor(Math.random() * 5),
    });
  }
  
  return users;
}

function generateSiteUsers(count: number, siteName: string): User[] {
  const users: User[] = [];
  const siteRoles: Array<User['role']> = ['Site Superadmin', 'Site Admin', 'Site Manager', 'Site Worker'];
  const roleWeights = [2, 5, 15, 78]; // Percentage weights for site-specific roles
  
  for (let i = 0; i < count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const createdDate = randomDate(new Date(2022, 0, 1), new Date());
    const lastActiveDate = randomDate(createdDate, new Date());
    
    // Site users are more likely to be active
    const daysSinceActive = Math.floor((new Date().getTime() - lastActiveDate.getTime()) / (1000 * 60 * 60 * 24));
    let status: User['status'] = 'active';
    if (daysSinceActive > 14) status = 'inactive';
    else if (daysSinceActive > 3 && Math.random() > 0.9) status = 'inactive';
    
    // Weighted role selection for site
    const rand = Math.random() * 100;
    let cumWeight = 0;
    let selectedRole: User['role'] = 'Site Worker';
    for (let j = 0; j < siteRoles.length; j++) {
      cumWeight += roleWeights[j];
      if (rand <= cumWeight) {
        selectedRole = siteRoles[j];
        break;
      }
    }
    
    users.push({
      id: `site-user-${i + 1}`,
      firstName,
      lastName,
      email: generateEmail(firstName, lastName),
      mobile: generatePhone(),
      role: selectedRole,
      status,
      sites: [siteName],
      department: departments[Math.floor(Math.random() * departments.length)],
      lastActive: lastActiveDate,
      createdAt: createdDate,
      updatedAt: lastActiveDate,
      convoCardsCreated: selectedRole !== 'Site Worker' ? Math.floor(Math.random() * 8) : Math.floor(Math.random() * 3),
      normalScratchiesReceived: Math.floor(Math.random() * 15),
      turboScratchiesReceived: Math.floor(Math.random() * 3),
    });
  }
  
  return users;
}

export const companyUsers = generateCompanyUsers(342);
export const siteUsers = generateSiteUsers(53, 'McDonald\'s Chisholm'); // 47 workers + 6 supervisors

export const userActivityData: UserActivity[] = [
  { month: 'Aug 2024', activeUsers: 285, newUsers: 12, inactiveUsers: 45 },
  { month: 'Sep 2024', activeUsers: 298, newUsers: 18, inactiveUsers: 32 },
  { month: 'Oct 2024', activeUsers: 312, newUsers: 22, inactiveUsers: 28 },
  { month: 'Nov 2024', activeUsers: 325, newUsers: 15, inactiveUsers: 25 },
  { month: 'Dec 2024', activeUsers: 318, newUsers: 8, inactiveUsers: 32 },
  { month: 'Jan 2025', activeUsers: 330, newUsers: 20, inactiveUsers: 22 },
];

// Known users for email lookup simulation
export const knownUserEmails = [
  'john.doe@example.com',
  'jane.smith@example.com',
  'mike.wilson@example.com',
  'sarah.johnson@example.com',
  'david.brown@example.com',
];