// SIH26044 - Portal for Academia-Industry Collaboration Mock Data

export const INITIAL_STUDENT = {
  id: "std-2026-001",
  name: "Aryan Sharma",
  rollNo: "22BCS1084",
  college: "All India Institute of Technology & Ayurveda Sciences, New Delhi",
  department: "Computer Science & Biomedical Informatics",
  semester: "7th Semester (Final Year)",
  cgpa: 8.84,
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  readinessScore: 84, // out of 100
  nepCredits: 148,
  verifiedBadgesCount: 6,
  skills: [
    { name: "Python", category: "Programming", level: 90, verified: true, source: "NPTEL Gold" },
    { name: "React.js", category: "Frontend", level: 85, verified: true, source: "Industry Capstone" },
    { name: "Node.js & Express", category: "Backend", level: 78, verified: true, source: "Lab Evaluation" },
    { name: "Ayush Data Informatics", category: "Domain", level: 75, verified: true, source: "AIIA Research Lab" },
    { name: "Machine Learning (Scikit-Learn)", category: "AI/ML", level: 72, verified: true, source: "Coursera / IITM" },
    { name: "SQL & PostgreSQL", category: "Database", level: 82, verified: true, source: "College Assessment" },
    { name: "Docker & Containerization", category: "DevOps", level: 50, verified: false, source: "Self-Study" },
    { name: "Clinical Data Standards (CDISC/FHIR)", category: "Domain", level: 40, verified: false, source: "Workshop" },
    { name: "Cloud Architecture (AWS)", category: "Cloud", level: 45, verified: false, source: "In-Progress" }
  ],
  certifications: [
    { id: "c1", title: "Ayush Health Informatics & AI Analytics", issuer: "Ministry of Ayush & AIIA", date: "Aug 2026", credentialId: "AYU-AI-8892-IN", verified: true },
    { id: "c2", title: "Full Stack Cloud Development Professional", issuer: "IBM / AICTE Digital Skill Initiative", date: "May 2026", credentialId: "IBM-CS-99120", verified: true },
    { id: "c3", title: "Data Science with Python & Biomedical ML", issuer: "NPTEL (IIT Madras)", date: "Jan 2026", credentialId: "NPTEL26CS44", verified: true }
  ],
  projects: [
    {
      title: "AyurHerb-AI: Automated Medicinal Herb Recognition System",
      description: "Computer vision and NLP platform mapping traditional Ayurvedic botanical traits to modern pharmacopeia taxonomies using deep learning.",
      techStack: ["Python", "TensorFlow", "FastAPI", "React"],
      industryPartner: "Himalaya Wellness & CCRAS",
      verified: true
    },
    {
      title: "CampusCare: Tele-consultation & Clinical Trial Scheduler",
      description: "HIPAA/ABDM compliant hospital triage system connecting academic clinics with rural health centers.",
      techStack: ["React.js", "Node.js", "PostgreSQL", "Tailwind"],
      industryPartner: "Apollo TeleHealth MoU",
      verified: true
    }
  ]
};

export const TARGET_ROLE_BENCHMARKS = [
  {
    id: "role-1",
    title: "Ayush Informatics & Biomedical AI Engineer",
    domain: "Ayush & Healthcare Tech",
    avgPackage: "₹9.5 - ₹16.0 LPA",
    demandLevel: "Very High",
    description: "Build computational pipelines that integrate traditional Ayurvedic medicinal formulations, clinical trial analytics, and modern biomedical data lakes.",
    requiredSkills: [
      { name: "Python", minRequired: 80, weight: 20 },
      { name: "Ayush Data Informatics", minRequired: 70, weight: 20 },
      { name: "Machine Learning (Scikit-Learn)", minRequired: 75, weight: 20 },
      { name: "Clinical Data Standards (CDISC/FHIR)", minRequired: 65, weight: 15 },
      { name: "SQL & PostgreSQL", minRequired: 70, weight: 15 },
      { name: "Cloud Architecture (AWS)", minRequired: 60, weight: 10 }
    ],
    bridgeCourses: [
      {
        skill: "Clinical Data Standards (CDISC/FHIR)",
        courseName: "Biomedical & Ayush Data Standardization (FHIR 4.0)",
        provider: "Swayam / CDAC Pune",
        duration: "4 Weeks",
        type: "Free AICTE Certified",
        link: "https://swayam.gov.in"
      },
      {
        skill: "Cloud Architecture (AWS)",
        courseName: "Cloud Infrastructure & High-Performance Genomic Pipelines",
        provider: "AWS Educate / AICTE Portal",
        duration: "3 Weeks",
        type: "Industry Fast-Track",
        link: "https://aws.amazon.com/education"
      }
    ]
  },
  {
    id: "role-2",
    title: "Full Stack Cloud Application Engineer",
    domain: "Information Technology",
    avgPackage: "₹8.0 - ₹14.5 LPA",
    demandLevel: "High",
    description: "Design and implement scalable microservices, interactive responsive SPAs, and event-driven architectures for enterprise SaaS.",
    requiredSkills: [
      { name: "React.js", minRequired: 80, weight: 25 },
      { name: "Node.js & Express", minRequired: 75, weight: 25 },
      { name: "SQL & PostgreSQL", minRequired: 75, weight: 20 },
      { name: "Docker & Containerization", minRequired: 70, weight: 15 },
      { name: "Cloud Architecture (AWS)", minRequired: 65, weight: 15 }
    ],
    bridgeCourses: [
      {
        skill: "Docker & Containerization",
        courseName: "Hands-on Microservices with Docker & Kubernetes",
        provider: "Infosys Springboard",
        duration: "3 Weeks",
        type: "Partner Certified",
        link: "https://infyspringboard.onwingspan.com"
      },
      {
        skill: "Cloud Architecture (AWS)",
        courseName: "Enterprise Cloud Practitioner & Serverless Architecture",
        provider: "NPTEL / IIT Roorkee",
        duration: "4 Weeks",
        type: "Academic Credit Aligned",
        link: "https://nptel.ac.in"
      }
    ]
  },
  {
    id: "role-3",
    title: "Healthcare Data Analyst & Predictive Modeler",
    domain: "Data Science & Clinical Analytics",
    avgPackage: "₹7.5 - ₹13.0 LPA",
    demandLevel: "Very High",
    description: "Analyze epidemiological registries, patient telemetry, and clinical efficacy metrics using statistical modelling and BI dashboards.",
    requiredSkills: [
      { name: "Python", minRequired: 85, weight: 30 },
      { name: "SQL & PostgreSQL", minRequired: 80, weight: 25 },
      { name: "Machine Learning (Scikit-Learn)", minRequired: 70, weight: 25 },
      { name: "Clinical Data Standards (CDISC/FHIR)", minRequired: 60, weight: 20 }
    ],
    bridgeCourses: [
      {
        skill: "Clinical Data Standards (CDISC/FHIR)",
        courseName: "Healthcare Interoperability & Medical Informatics Bootcamp",
        provider: "NITI Aayog / ABDM Sandbox",
        duration: "2 Weeks",
        type: "Govt. Initiative",
        link: "https://abdm.gov.in"
      }
    ]
  }
];

export const INITIAL_INTERNSHIPS = [
  {
    id: "job-101",
    company: "All India Institute of Ayurveda (AIIA)",
    title: "Ayush Informatics & Herbal Big-Data Intern",
    location: "New Delhi (Hybrid)",
    stipend: "₹25,000 / month",
    duration: "6 Months",
    type: "Research & Placement Track",
    openings: 8,
    deadline: "30 Sept 2026",
    tags: ["Ayush Domain", "Python", "Machine Learning", "Research"],
    matchScore: 92,
    description: "Work under senior scientists at AIIA to develop national botanical AI classification models and validate Ayurvedic clinical datasets.",
    requirements: ["Python", "Ayush Data Informatics", "Machine Learning (Scikit-Learn)", "SQL & PostgreSQL"],
    featured: true,
    hiringBatch: "2026 & 2027",
    partnerMoU: "Ministry of Ayush / AICTE Co-Funded"
  },
  {
    id: "job-102",
    company: "Tata Consultancy Services (TCS Digital Labs)",
    title: "Full-Stack Enterprise Cloud Engineer Intern",
    location: "Bengaluru / Pune (Hybrid)",
    stipend: "₹32,000 / month",
    duration: "6 Months PPO",
    type: "Placement Pre-Offer",
    openings: 25,
    deadline: "05 Oct 2026",
    tags: ["React.js", "Node.js", "PostgreSQL", "Cloud"],
    matchScore: 86,
    description: "Develop enterprise next-gen portals for banking and healthcare clients. Opportunity for direct PPO at 9.0 LPA upon milestone completion.",
    requirements: ["React.js", "Node.js & Express", "SQL & PostgreSQL", "Docker & Containerization"],
    featured: true,
    hiringBatch: "2026 Batch",
    partnerMoU: "TCS Academic Interface Program (AIP)"
  },
  {
    id: "job-103",
    company: "Himalaya Wellness & Bio-Tech Innovations",
    title: "Pharmacovigilance & Herbal Formulations Analyst",
    location: "Bengaluru (On-site)",
    stipend: "₹22,000 / month",
    duration: "4 Months",
    type: "Industrial Internship",
    openings: 6,
    deadline: "12 Oct 2026",
    tags: ["Data Analytics", "Ayush Domain", "Python"],
    matchScore: 81,
    description: "Analyze clinical trial feedback on herbal remedies and automate batch formulation variance testing using data processing pipelines.",
    requirements: ["Python", "SQL & PostgreSQL", "Ayush Data Informatics"],
    featured: false,
    hiringBatch: "Final & Pre-Final Year",
    partnerMoU: "Active College MoU (Since 2024)"
  },
  {
    id: "job-104",
    company: "Apollo TeleHealth Technologies",
    title: "Clinical IoT & Healthcare Platform Developer",
    location: "Hyderabad (Remote-friendly)",
    stipend: "₹28,000 / month",
    duration: "6 Months",
    type: "Placement Track",
    openings: 12,
    deadline: "20 Oct 2026",
    tags: ["React.js", "Cloud Architecture", "FHIR Standards"],
    matchScore: 74,
    description: "Build doctor-facing dashboards and telemedicine streaming gateways aligned with Ayushman Bharat Digital Mission (ABDM).",
    requirements: ["React.js", "Node.js & Express", "Clinical Data Standards (CDISC/FHIR)", "Cloud Architecture (AWS)"],
    featured: false,
    hiringBatch: "2026 Passouts",
    partnerMoU: "National Healthcare Skills Council"
  },
  {
    id: "job-105",
    company: "Infosys Springboard AI Lab",
    title: "AI Solutions & Knowledge Graph Intern",
    location: "Mysuru / Remote",
    stipend: "₹30,000 / month",
    duration: "6 Months",
    type: "Research & Capstone",
    openings: 15,
    deadline: "25 Oct 2026",
    tags: ["Python", "Machine Learning", "Graph DB"],
    matchScore: 88,
    description: "Construct knowledge graphs mapping traditional Sanskrit herbal manuscripts to modern botanical scientific names.",
    requirements: ["Python", "Machine Learning (Scikit-Learn)", "SQL & PostgreSQL"],
    featured: true,
    hiringBatch: "All Engg & Science",
    partnerMoU: "Infosys Campus Connect Hub"
  }
];

export const INITIAL_APPLICATIONS = [
  {
    id: "app-301",
    jobId: "job-101",
    company: "All India Institute of Ayurveda (AIIA)",
    title: "Ayush Informatics & Herbal Big-Data Intern",
    appliedDate: "14 Sept 2026",
    status: "Shortlisted for Interview",
    stage: 2, // 1: Applied, 2: Shortlisted, 3: Technical Round, 4: Offer
    nextStep: "Technical Interview on Sept 22, 2026 at 11:30 AM IST",
    matchScore: 92
  },
  {
    id: "app-302",
    jobId: "job-102",
    company: "Tata Consultancy Services (TCS Digital Labs)",
    title: "Full-Stack Enterprise Cloud Engineer Intern",
    appliedDate: "10 Sept 2026",
    status: "Application Under Review",
    stage: 1,
    nextStep: "Aptitude & Coding Assessment scheduled for Sept 25",
    matchScore: 86
  }
];

export const INDUSTRY_CANDIDATES = [
  {
    id: "cand-1",
    name: "Aryan Sharma",
    college: "All India Institute of Tech & Ayurveda Sciences",
    cgpa: 8.84,
    degree: "B.Tech Computer Science & Bio-Informatics",
    readinessScore: 84,
    matchWithActiveJob: 92,
    topSkills: ["Python (90%)", "React.js (85%)", "Ayush Informatics (75%)", "SQL (82%)"],
    nepCredits: 148,
    status: "Shortlisted",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "cand-2",
    name: "Pooja Verma",
    college: "Delhi Technological University (DTU)",
    cgpa: 9.12,
    degree: "B.Tech Information Technology",
    readinessScore: 91,
    matchWithActiveJob: 89,
    topSkills: ["React.js (92%)", "Node.js (88%)", "AWS (78%)", "Docker (80%)"],
    nepCredits: 154,
    status: "Under Review",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "cand-3",
    name: "Devendra Kulkarni",
    college: "College of Engineering, Pune (COEP)",
    cgpa: 8.45,
    degree: "B.Tech Electronics & Data Systems",
    readinessScore: 78,
    matchWithActiveJob: 82,
    topSkills: ["Python (85%)", "Machine Learning (80%)", "IoT Telemetry (75%)"],
    nepCredits: 142,
    status: "Invited",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "cand-4",
    name: "Ananya Iyer",
    college: "IIT Madras - Bio-Computational Center",
    cgpa: 9.40,
    degree: "Integrated M.Tech Bio-Engineering",
    readinessScore: 95,
    matchWithActiveJob: 96,
    topSkills: ["Ayush Informatics (95%)", "Bio-Python (92%)", "Machine Learning (90%)", "FHIR (85%)"],
    nepCredits: 160,
    status: "Offer Extended",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80"
  }
];

export const CAPSTONE_PROJECTS = [
  {
    id: "cap-1",
    title: "AI-Powered Sanskrit Ayurvedic Manuscript Decryption & Entity Extraction",
    company: "Ministry of Ayush & CCRAS",
    stipend: "₹1,50,000 Institutional Grant",
    duration: "4 Months (Academic Capstone)",
    teamsEnrolled: 14,
    difficulty: "Advanced",
    tags: ["NLP", "OCR", "Ayurvedic Pharmacopeia", "AICTE Aligned"],
    mentor: "Dr. K. S. Murthy (Chief Scientist, CCRAS)",
    status: "Accepting Student Teams"
  },
  {
    id: "cap-2",
    title: "Decentralized Clinical Trial Ledger & Patient Consent Management",
    company: "Apollo Hospitals & HealthBlock Labs",
    stipend: "₹2,00,000 Team Sponsorship + PPO",
    duration: "6 Months",
    teamsEnrolled: 8,
    difficulty: "Intermediate",
    tags: ["Blockchain", "FHIR Standards", "Full Stack"],
    mentor: "Suresh Narayanan (VP Engineering, Apollo)",
    status: "Accepting Student Teams"
  },
  {
    id: "cap-3",
    title: "Microservices Framework for High-Throughput Remote Patient Telemetry",
    company: "TCS Research & Innovation",
    stipend: "₹1,20,000 Grant",
    duration: "3 Months",
    teamsEnrolled: 22,
    difficulty: "Intermediate",
    tags: ["Node.js", "Docker", "Kafka", "Cloud"],
    mentor: "Ritika Sen (Principal Architect, TCS)",
    status: "In Progress"
  }
];

export const ACADEMIA_ANALYTICS = {
  collegeName: "All India Institute of Technology & Ayurveda Sciences",
  totalStudents: 1420,
  eligibleBatch: 380,
  placedPercentage: 86.8,
  avgPackageLPA: 8.4,
  highestPackageLPA: 24.5,
  activeMoUsCount: 18,
  industryProjectsLive: 24,
  departmentBreakdown: [
    { department: "Computer Science & Bio-Informatics", enrolled: 120, placed: 108, readinessAvg: 88, topHiringCompany: "TCS / AIIA Labs" },
    { department: "Ayush Data Sciences & Pharmacy", enrolled: 90, placed: 78, readinessAvg: 82, topHiringCompany: "Himalaya Wellness" },
    { department: "Biomedical & Electronics Engg", enrolled: 100, placed: 84, readinessAvg: 79, topHiringCompany: "Apollo Health / Philips" },
    { department: "Information Technology", enrolled: 70, placed: 60, readinessAvg: 84, topHiringCompany: "Infosys / Wipro" }
  ],
  curriculumGaps: [
    {
      courseSubject: "CS-402: Traditional Medical Informatics",
      syllabusCoverage: "Covers standard Ayurvedic nomenclature & basic relational DBMS",
      industryDemand: "Requires CDISC/FHIR 4.0 data exchange, HL7 standards & Python Bio-pipelines",
      gapDeficitPercent: 44,
      actionStatus: "Curriculum Revision Board Draft Approved (Sept 2026)",
      recommendedIndustryPartners: ["Ministry of Ayush", "Apollo TeleHealth", "CDAC"]
    },
    {
      courseSubject: "CS-305: Cloud & Enterprise Computing",
      syllabusCoverage: "Covers legacy monolithic client-server & basic XML/SOAP web services",
      industryDemand: "Requires Docker microservices, Kubernetes, AWS Lambda serverless",
      gapDeficitPercent: 38,
      actionStatus: "Infosys Springboard Workshop Integrated as 2 Academic Credits",
      recommendedIndustryPartners: ["AWS Educate", "Infosys Campus Connect"]
    },
    {
      courseSubject: "CS-308: Machine Learning & Statistical Analytics",
      syllabusCoverage: "Linear regression, decision trees, standard MNIST image tests",
      industryDemand: "Time-series clinical trial sensor analytics & Transformer-based medical NLP",
      gapDeficitPercent: 32,
      actionStatus: "Joint Lab Setup with IIT Madras in Progress",
      recommendedIndustryPartners: ["Google Cloud Education", "NPTEL"]
    }
  ],
  activeMoUs: [
    {
      partner: "Ministry of Ayush (All India Institute of Ayurveda)",
      scope: "Joint Bio-Informatics Research, 20 Student Fellowships/Yr, Lab Equipment Sponsorship",
      signedDate: "Jan 2024",
      validUntil: "Jan 2029",
      status: "Active & High Impact"
    },
    {
      partner: "Tata Consultancy Services (TCS)",
      scope: "Curriculum Co-design, Digital Hiring Drives, Faculty Development Programs",
      signedDate: "Aug 2023",
      validUntil: "Aug 2027",
      status: "Active"
    },
    {
      partner: "Himalaya Wellness Company",
      scope: "Industrial internships, live clinical trial data sandboxes, capstone grants",
      signedDate: "Nov 2024",
      validUntil: "Nov 2027",
      status: "Active"
    },
    {
      partner: "Apollo TeleHealth Hospitals",
      scope: "Hospital telemetry IoT testbed, remote patient monitoring internships",
      signedDate: "Feb 2025",
      validUntil: "Feb 2028",
      status: "Active"
    }
  ]
};

export const NATIONAL_ANALYTICS = {
  nationalSkillReadinessIndex: 78.4,
  participatingInstitutions: 1480,
  registeredStudents: 420000,
  industryPartnersJoined: 2850,
  internshipsCompletedThisYear: 94200,
  topSurgingSkills: [
    { skill: "Ayush Healthcare Informatics", growthPercent: "+148%", demandVolume: "Very High" },
    { skill: "AI & Transformer Machine Learning", growthPercent: "+112%", demandVolume: "High" },
    { skill: "FHIR / HL7 Clinical Interoperability", growthPercent: "+96%", demandVolume: "High" },
    { skill: "Cloud Native & Container Orchestration", growthPercent: "+74%", demandVolume: "Moderate" },
    { skill: "Cybersecurity & Data Privacy (DPDP Act)", growthPercent: "+68%", demandVolume: "Moderate" }
  ],
  districtReadinessTiers: [
    { district: "New Delhi & NCR", colleges: 84, avgReadiness: 86.2, placementRate: 89.4 },
    { district: "Bengaluru Urban", colleges: 112, avgReadiness: 88.5, placementRate: 91.2 },
    { district: "Pune & Western Maharashtra", colleges: 94, avgReadiness: 83.1, placementRate: 85.6 },
    { district: "Varanasi & Eastern UP (Ayush Hub)", colleges: 62, avgReadiness: 76.8, placementRate: 79.5 },
    { district: "Ernakulam & Thrissur (Ayurveda Biotech)", colleges: 48, avgReadiness: 81.4, placementRate: 84.1 }
  ]
};

export const MENTORS_LIST = [
  {
    id: "m-1",
    name: "Dr. K. S. Murthy",
    role: "Chief Scientist & Informatics Director",
    company: "Ministry of Ayush / AIIA",
    domains: ["Ayush Informatics", "Biomedical AI", "Research Grants"],
    availableSlots: "Tomorrow at 4:00 PM | Friday at 2:30 PM",
    rating: 4.9,
    sessionsConducted: 42,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "m-2",
    name: "Priyanka Saxena",
    role: "Staff Engineering Lead",
    company: "TCS Enterprise Digital",
    domains: ["Full Stack Cloud", "System Design", "Mock Tech Interviews"],
    availableSlots: "Saturday at 11:00 AM | Sunday at 5:00 PM",
    rating: 4.95,
    sessionsConducted: 88,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "m-3",
    name: "Vikram Singhania",
    role: "Head of Talent Acquisition & Campus Partnerships",
    company: "Himalaya Wellness",
    domains: ["Resume Review", "Pharma/Biotech Careers", "Industry Expectations"],
    availableSlots: "Monday at 3:00 PM",
    rating: 4.88,
    sessionsConducted: 65,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
  }
];
