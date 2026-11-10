export interface Profile {
  name: string
  professionalTitle: string
  college: string
  university: string
  location: string
  github: string
  linkedin: string
  email: string
  primaryInterests: string[]
  introduction: string[]
  academics: {
    degree: string
    branch: string
    institution: string
    university: string
    academicFocus: string[]
    learningInterests: string[]
  }
  hardwareProjects: {
    title: string
    components: string
    purpose: string
  }[]
  careerInterests: string[]
}

export const profile: Profile = {
  name: "Shreyash Mane",
  professionalTitle: "Computer Science & Engineering Student",
  college: "D.Y. Patil College of Engineering, Kolhapur",
  university: "Shivaji University, Kolhapur",
  location: "Maharashtra, India",
  github: "https://github.com/shreyashmane-dev",
  linkedin: "https://www.linkedin.com/in/shreyashmane-7675a4385",
  email: "shreyashmane649@gmail.com",
  primaryInterests: [
    "AI/ML",
    "Full-Stack Development",
    "Automation",
    "Software Engineering",
    "IoT",
    "3D Development"
  ],
  introduction: [
    "Computer Science and Engineering student interested in building practical software products, AI-powered applications, developer tools, intelligent automation systems, and hardware-integrated solutions.",
    "Focused on exploring modern technologies, designing complete software architectures, and turning ideas into functional applications."
  ],
  academics: {
    degree: "B.Tech",
    branch: "Computer Science & Engineering",
    institution: "D.Y. Patil College of Engineering, Kolhapur",
    university: "Shivaji University",
    academicFocus: [
      "Programming",
      "Computer Networks",
      "Object-Oriented Concepts",
      "AI/ML",
      "Software Development"
    ],
    learningInterests: [
      "Full-stack engineering",
      "AI agents",
      "Cloud technologies",
      "IoT",
      "System architecture"
    ]
  },
  hardwareProjects: [
    {
      title: "RFID Attendance System",
      components: "ESP32, RC522, OLED",
      purpose: "RFID-based attendance recording."
    },
    {
      title: "Smart Water-Level Monitoring",
      components: "ESP32, HC-SR04, OLED, relay, buzzer",
      purpose: "Water-level monitoring and pump-control experimentation."
    },
    {
      title: "Smart Classroom System",
      components: "Arduino UNO, dual RC522 readers",
      purpose: "Attendance and emergency headcount management."
    }
  ],
  careerInterests: [
    "AI Engineer",
    "Full-Stack Developer",
    "Software Engineer",
    "Machine Learning Engineer",
    "AI Agent Developer",
    "IoT Developer",
    "Developer Tools Engineer"
  ]
}
