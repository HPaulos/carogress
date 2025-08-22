// Mock user data for testing
const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    title: "Senior Software Engineer",
    level: 5,
    totalPoints: 450,
    streak: 7,
    achievements: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    skills: ["JavaScript", "React", "Node.js", "Python", "AWS", "Docker", "Kubernetes"],
    goals: ["Become Tech Lead", "Learn Machine Learning", "Contribute to Open Source"],
    socialLinks: [
      { label: "LinkedIn", url: "https://linkedin.com/in/johndoe" },
      { label: "GitHub", url: "https://github.com/johndoe" },
      { label: "Twitter", url: "https://twitter.com/johndoe" }
    ],
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-02-20T14:30:00Z"
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    title: "Product Manager",
    level: 4,
    totalPoints: 980,
    streak: 12,
    achievements: ["11", "12", "13"],
    skills: ["Product Strategy", "User Research", "Agile", "Data Analysis", "Figma"],
    goals: ["Lead Product Team", "Launch Successful Product", "Improve User Experience"],
    socialLinks: [
      { label: "LinkedIn", url: "https://linkedin.com/in/janesmith" }
    ],
    createdAt: "2024-01-20T09:00:00Z",
    updatedAt: "2024-02-18T16:45:00Z"
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    title: "Data Scientist",
    level: 3,
    totalPoints: 750,
    streak: 5,
    achievements: ["14", "15", "16"],
    skills: ["Python", "Machine Learning", "SQL", "TensorFlow", "Pandas"],
    goals: ["Publish Research Paper", "Lead ML Team", "Build AI Product"],
    socialLinks: [
      { label: "LinkedIn", url: "https://linkedin.com/in/mikejohnson" },
      { label: "GitHub", url: "https://github.com/mikejohnson" }
    ],
    createdAt: "2024-02-01T11:00:00Z",
    updatedAt: "2024-02-19T10:15:00Z"
  },
  {
    id: "4",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    title: "UX Designer",
    level: 6,
    totalPoints: 1200,
    streak: 15,
    achievements: ["17", "18", "19", "20"],
    skills: ["UI/UX Design", "Figma", "Adobe Creative Suite", "User Research", "Prototyping"],
    goals: ["Design Award Winner", "Lead Design Team", "Create Design System"],
    socialLinks: [
      { label: "LinkedIn", url: "https://linkedin.com/in/sarahwilson" },
      { label: "Dribbble", url: "https://dribbble.com/sarahwilson" }
    ],
    createdAt: "2024-01-10T08:00:00Z",
    updatedAt: "2024-02-21T12:00:00Z"
  },
  {
    id: "5",
    name: "Alex Chen",
    email: "alex@example.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    title: "DevOps Engineer",
    level: 4,
    totalPoints: 890,
    streak: 8,
    achievements: ["21", "22", "23"],
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD", "Terraform", "Linux"],
    goals: ["Cloud Architecture Expert", "Automate Everything", "Lead DevOps Team"],
    socialLinks: [
      { label: "LinkedIn", url: "https://linkedin.com/in/alexchen" },
      { label: "GitHub", url: "https://github.com/alexchen" }
    ],
    createdAt: "2024-01-25T13:00:00Z",
    updatedAt: "2024-02-17T09:30:00Z"
  }
];

// Get a random mock user
export const getRandomMockUser = () => {
  const randomIndex = Math.floor(Math.random() * mockUsers.length);
  return mockUsers[randomIndex];
};

// Get a specific mock user by ID
export const getMockUserById = (id) => {
  return mockUsers.find(user => user.id === id) || mockUsers[0];
};

// Get all mock users
export const getAllMockUsers = () => {
  return mockUsers;
};
