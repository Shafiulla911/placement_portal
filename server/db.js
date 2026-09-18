const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

// Local JSON backup path in case MySQL is unreachable
const jsonBackupPath = path.join(__dirname, 'placement_db_backup.json');

const DB_CONFIG = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Password',
  port: process.env.DB_PORT || 3306,
  database: process.env.DB_NAME || 'placement',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

let pool = null;
let isMysqlConnected = false;

// Initial rich seed data
const initialData = {
  users: [
    {
      id: 1,
      email: 'admin459@sanjaygandhi.com',
      password: 'Admin@459',
      name: 'Admin',
      role: 'admin',
      college: 'Sanjay Gandhi Group of Institutions',
      phone: '+91 9876543210',
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      email: 'admin@edubridge.gov.in',
      password: 'admin123',
      name: 'National Directorate Admin',
      role: 'admin',
      college: 'Apex Skill Directorate, New Delhi',
      phone: '+91 1123456789',
      created_at: new Date().toISOString()
    },
    {
      id: 3,
      email: 'aryan.sharma@college.edu.in',
      password: 'student123',
      name: 'Aryan Sharma',
      role: 'student',
      college: 'All India Institute of Technology & Ayurveda Sciences, New Delhi',
      phone: '+91 9876500001',
      created_at: new Date().toISOString()
    },
    {
      id: 4,
      email: 'recruitment@apollo-tech.com',
      password: 'industry123',
      name: 'Suresh Narayanan',
      role: 'industry',
      college: 'Apollo TeleHealth & Healthcare AI Labs',
      phone: '+91 9876500002',
      created_at: new Date().toISOString()
    },
    {
      id: 5,
      email: 'tpo@university.ac.in',
      password: 'academia123',
      name: 'Prof. Radhika Rao',
      role: 'academia',
      college: 'All India Institute of Technology & Ayurveda Sciences',
      phone: '+91 9876500003',
      created_at: new Date().toISOString()
    }
  ],
  studentProfile: {
    id: 'std-2026-001',
    user_id: 3,
    name: 'Aryan Sharma',
    rollNo: '22BCS1084',
    college: 'All India Institute of Technology & Ayurveda Sciences, New Delhi',
    department: 'Computer Science & Biomedical Informatics',
    semester: '7th Semester (Final Year)',
    cgpa: 8.84,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    readinessScore: 84,
    nepCredits: 148,
    verifiedBadgesCount: 6,
    skills: [
      { name: 'Python', category: 'Programming', level: 90, verified: true, source: 'NPTEL Gold' },
      { name: 'React.js', category: 'Frontend', level: 85, verified: true, source: 'Industry Capstone' },
      { name: 'Node.js & Express', category: 'Backend', level: 78, verified: true, source: 'Lab Evaluation' },
      { name: 'Ayush Data Informatics', category: 'Domain', level: 75, verified: true, source: 'AIIA Research Lab' },
      { name: 'Machine Learning (Scikit-Learn)', category: 'AI/ML', level: 72, verified: true, source: 'Coursera / IITM' },
      { name: 'SQL & PostgreSQL', category: 'Database', level: 82, verified: true, source: 'College Assessment' },
      { name: 'Docker & Containerization', category: 'DevOps', level: 50, verified: false, source: 'Self-Study' },
      { name: 'Clinical Data Standards (CDISC/FHIR)', category: 'Domain', level: 40, verified: false, source: 'Workshop' },
      { name: 'Cloud Architecture (AWS)', category: 'Cloud', level: 45, verified: false, source: 'In-Progress' }
    ],
    certifications: [
      { id: 'c1', title: 'Ayush Health Informatics & AI Analytics', issuer: 'Ministry of Ayush & AIIA', date: 'Aug 2026', credentialId: 'AYU-AI-8892-IN', verified: true },
      { id: 'c2', title: 'Full Stack Cloud Development Professional', issuer: 'IBM / AICTE Digital Skill Initiative', date: 'May 2026', credentialId: 'IBM-CS-99120', verified: true },
      { id: 'c3', title: 'Data Science with Python & Biomedical ML', issuer: 'NPTEL (IIT Madras)', date: 'Jan 2026', credentialId: 'NPTEL26CS44', verified: true }
    ],
    projects: [
      {
        title: 'AyurHerb-AI: Automated Medicinal Herb Recognition System',
        description: 'Computer vision and NLP platform mapping traditional Ayurvedic botanical traits to modern pharmacopeia taxonomies using deep learning.',
        techStack: ['Python', 'TensorFlow', 'FastAPI', 'React'],
        industryPartner: 'Himalaya Wellness & CCRAS',
        verified: true
      },
      {
        title: 'CampusCare: Tele-consultation & Clinical Trial Scheduler',
        description: 'HIPAA/ABDM compliant hospital triage system connecting academic clinics with rural health centers.',
        techStack: ['React.js', 'Node.js', 'PostgreSQL', 'Tailwind'],
        industryPartner: 'Apollo TeleHealth MoU',
        verified: true
      }
    ]
  },
  internships: [
    {
      id: 'job-101',
      company: 'All India Institute of Ayurveda (AIIA)',
      title: 'Ayush Informatics & Herbal Big-Data Intern',
      location: 'New Delhi (Hybrid)',
      stipend: '₹25,000 / month',
      duration: '6 Months',
      type: 'Research & Placement Track',
      openings: 8,
      deadline: '30 Sept 2026',
      tags: ['Ayush Domain', 'Python', 'Machine Learning', 'Research'],
      matchScore: 92,
      description: 'Work under senior scientists at AIIA to develop national botanical AI classification models and validate Ayurvedic clinical datasets.',
      requirements: ['Python', 'Ayush Data Informatics', 'Machine Learning (Scikit-Learn)', 'SQL & PostgreSQL'],
      featured: true,
      hiringBatch: '2026 & 2027',
      partnerMoU: 'Ministry of Ayush / AICTE Co-Funded',
      created_at: new Date().toISOString()
    },
    {
      id: 'job-102',
      company: 'Tata Consultancy Services (TCS Digital Labs)',
      title: 'Full-Stack Enterprise Cloud Engineer Intern',
      location: 'Bengaluru / Pune (Hybrid)',
      stipend: '₹32,000 / month',
      duration: '6 Months PPO',
      type: 'Placement Pre-Offer',
      openings: 25,
      deadline: '05 Oct 2026',
      tags: ['React.js', 'Node.js', 'PostgreSQL', 'Cloud'],
      matchScore: 86,
      description: 'Develop enterprise next-gen portals for banking and healthcare clients. Opportunity for direct PPO at 9.0 LPA upon milestone completion.',
      requirements: ['React.js', 'Node.js & Express', 'SQL & PostgreSQL', 'Docker & Containerization'],
      featured: true,
      hiringBatch: '2026 Batch',
      partnerMoU: 'TCS Academic Interface Program (AIP)',
      created_at: new Date().toISOString()
    },
    {
      id: 'job-103',
      company: 'Himalaya Wellness & Bio-Tech Innovations',
      title: 'Pharmacovigilance & Herbal Formulations Analyst',
      location: 'Bengaluru (On-site)',
      stipend: '₹22,000 / month',
      duration: '4 Months',
      type: 'Industrial Internship',
      openings: 6,
      deadline: '12 Oct 2026',
      tags: ['Data Analytics', 'Ayush Domain', 'Python'],
      matchScore: 81,
      description: 'Analyze clinical trial feedback on herbal remedies and automate batch formulation variance testing using data processing pipelines.',
      requirements: ['Python', 'SQL & PostgreSQL', 'Ayush Data Informatics'],
      featured: false,
      hiringBatch: 'Final & Pre-Final Year',
      partnerMoU: 'Active College MoU (Since 2024)',
      created_at: new Date().toISOString()
    },
    {
      id: 'job-104',
      company: 'Apollo TeleHealth Technologies',
      title: 'Clinical IoT & Healthcare Platform Developer',
      location: 'Hyderabad (Remote-friendly)',
      stipend: '₹28,000 / month',
      duration: '6 Months',
      type: 'Placement Track',
      openings: 12,
      deadline: '20 Oct 2026',
      tags: ['React.js', 'Cloud Architecture', 'FHIR Standards'],
      matchScore: 74,
      description: 'Build doctor-facing dashboards and telemedicine streaming gateways aligned with Ayushman Bharat Digital Mission (ABDM).',
      requirements: ['React.js', 'Node.js & Express', 'Clinical Data Standards (CDISC/FHIR)', 'Cloud Architecture (AWS)'],
      featured: false,
      hiringBatch: '2026 Passouts',
      partnerMoU: 'National Healthcare Skills Council',
      created_at: new Date().toISOString()
    },
    {
      id: 'job-105',
      company: 'Infosys Springboard AI Lab',
      title: 'AI Solutions & Knowledge Graph Intern',
      location: 'Mysuru / Remote',
      stipend: '₹30,000 / month',
      duration: '6 Months',
      type: 'Research & Capstone',
      openings: 15,
      deadline: '25 Oct 2026',
      tags: ['Python', 'Machine Learning', 'Graph DB'],
      matchScore: 88,
      description: 'Construct knowledge graphs mapping traditional Sanskrit herbal manuscripts to modern botanical scientific names.',
      requirements: ['Python', 'Machine Learning (Scikit-Learn)', 'SQL & PostgreSQL'],
      featured: true,
      hiringBatch: 'All Engg & Science',
      partnerMoU: 'Infosys Campus Connect Hub',
      created_at: new Date().toISOString()
    }
  ],
  applications: [
    {
      id: 'app-301',
      jobId: 'job-101',
      student_id: 'std-2026-001',
      student_name: 'Aryan Sharma',
      student_email: 'aryan.sharma@college.edu.in',
      company: 'All India Institute of Ayurveda (AIIA)',
      title: 'Ayush Informatics & Herbal Big-Data Intern',
      appliedDate: '14 Sept 2026',
      status: 'Shortlisted for Interview',
      stage: 2,
      nextStep: 'Technical Interview on Sept 22, 2026 at 11:30 AM IST',
      matchScore: 92,
      created_at: new Date().toISOString()
    },
    {
      id: 'app-302',
      jobId: 'job-102',
      student_id: 'std-2026-001',
      student_name: 'Aryan Sharma',
      student_email: 'aryan.sharma@college.edu.in',
      company: 'Tata Consultancy Services (TCS Digital Labs)',
      title: 'Full-Stack Enterprise Cloud Engineer Intern',
      appliedDate: '02 Sept 2026',
      status: 'Application Submitted',
      stage: 1,
      nextStep: 'Resume and ATS screening under evaluation',
      matchScore: 86,
      created_at: new Date().toISOString()
    }
  ],
  candidates: [
    {
      id: 'cand-01',
      name: 'Aryan Sharma',
      degree: 'B.Tech Computer Science & Bio-Informatics',
      college: 'AIIA New Delhi',
      cgpa: 8.84,
      nepCredits: 148,
      topSkills: ['Python (90%)', 'React.js (85%)', 'Ayush Informatics (75%)', 'SQL (82%)'],
      matchWithActiveJob: 94,
      status: 'Shortlisted',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 'cand-02',
      name: 'Pooja Verma',
      degree: 'B.Tech Biotechnology & Data Analytics',
      college: 'Delhi Technological University (DTU)',
      cgpa: 9.12,
      nepCredits: 154,
      topSkills: ['Python (85%)', 'Bio-Statistics (90%)', 'Clinical Data (80%)'],
      matchWithActiveJob: 91,
      status: 'Interview Scheduled',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 'cand-03',
      name: 'Devendra Kulkarni',
      degree: 'B.Tech Electronics & Embedded Systems',
      college: 'IIT Roorkee',
      cgpa: 8.65,
      nepCredits: 142,
      topSkills: ['IoT Sensors (88%)', 'C++ (92%)', 'Python (75%)'],
      matchWithActiveJob: 82,
      status: 'Under Review',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 'cand-04',
      name: 'Ananya Deshmukh',
      degree: 'B.Tech Artificial Intelligence & ML',
      college: 'IIIT Hyderabad',
      cgpa: 9.40,
      nepCredits: 160,
      topSkills: ['PyTorch (95%)', 'Deep Learning (92%)', 'NLP (88%)'],
      matchWithActiveJob: 96,
      status: 'Shortlisted',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80'
    }
  ],
  capstones: [
    {
      id: 'cap-201',
      title: 'Automated CDISC & FHIR Medical Terminology Mapping using LLMs',
      company: 'Apollo TeleHealth & ABDM Sandbox',
      stipend: '₹1,50,000 Team Sponsorship',
      duration: '4 Months (Final Year)',
      difficulty: 'Advanced',
      teamsEnrolled: 14,
      tags: ['Healthcare AI', 'NLP', 'FHIR Standards', 'Python'],
      mentor: 'Dr. Vikramaditya (Director, Healthcare Analytics, Apollo)',
      status: 'Accepting Student Teams'
    },
    {
      id: 'cap-202',
      title: 'Ayush Pharmacopeia Knowledge Graph & Botanical Image Segmentation',
      company: 'Ministry of Ayush & CCRAS',
      stipend: '₹2,00,000 Govt Grant',
      duration: '6 Months (Joint Lab)',
      difficulty: 'Intermediate',
      teamsEnrolled: 22,
      tags: ['Computer Vision', 'Ayush Domain', 'Knowledge Graphs'],
      mentor: 'Prof. K. S. Murthy (Chief Scientist, CCRAS)',
      status: 'Accepting Student Teams'
    },
    {
      id: 'cap-203',
      title: 'Scalable Hospital Inpatient Registry Telemetry with Docker & Kafka',
      company: 'TCS Healthcare Technology Practice',
      stipend: '₹1,20,000 + PPO Opportunity',
      duration: '4 Months',
      difficulty: 'Advanced',
      teamsEnrolled: 8,
      tags: ['Cloud DevOps', 'Docker', 'Distributed Systems'],
      mentor: 'Sunil Shenoy (Principal Architect, TCS Digital)',
      status: 'Active Evaluation'
    }
  ],
  mous: [
    {
      id: 'mou-1',
      partner: 'All India Institute of Ayurveda (AIIA)',
      scope: 'Joint R&D Lab in Herbal AI, 20 Annual Paid Internships, and Faculty Exchange',
      signedDate: 'Jan 2024',
      validUntil: 'Dec 2028',
      status: 'Active & Legally Verified'
    },
    {
      id: 'mou-2',
      partner: 'Tata Consultancy Services (TCS AIP)',
      scope: 'Curriculum co-design for Cloud & AI electives, Campus Hackathons, 50 PPOs/year',
      signedDate: 'Aug 2023',
      validUntil: 'July 2027',
      status: 'Active & Legally Verified'
    },
    {
      id: 'mou-3',
      partner: 'Apollo TeleHealth Ltd.',
      scope: 'Biomedical Informatics student training, ABDM Sandbox project mentorship',
      signedDate: 'March 2024',
      validUntil: 'Feb 2029',
      status: 'Active & Legally Verified'
    },
    {
      id: 'mou-4',
      partner: 'Himalaya Wellness Company',
      scope: 'Botanical research dataset sponsorship, Herbal pharmacology internships',
      signedDate: 'Nov 2024',
      validUntil: 'Oct 2027',
      status: 'Active & Legally Verified'
    }
  ],
  mentors: [
    {
      id: 'm-1',
      name: 'Dr. Vikramaditya Sengupta',
      role: 'Head of Biomedical AI & Healthtech',
      company: 'Apollo TeleHealth MoU Partner',
      rating: 4.9,
      sessionsConducted: 48,
      domains: ['Biomedical Informatics', 'FHIR / CDISC Standards', 'Machine Learning'],
      availableSlots: 'Tuesday & Thursday (6:00 PM - 8:00 PM IST)',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 'm-2',
      name: 'Dr. Ananya Deshpande',
      role: 'Chief Botanical Data Scientist',
      company: 'AIIA & Ministry of Ayush Lab',
      rating: 5.0,
      sessionsConducted: 62,
      domains: ['Ayush Formulation AI', 'Computer Vision in Herbs', 'Python ML'],
      availableSlots: 'Wednesday & Saturday (4:00 PM - 6:00 PM IST)',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 'm-3',
      name: 'Sunil Shenoy',
      role: 'Principal Cloud Architect',
      company: 'TCS Digital Enterprise Practice',
      rating: 4.8,
      sessionsConducted: 95,
      domains: ['Enterprise Cloud', 'React & Node.js Architecture', 'Docker & Kubernetes'],
      availableSlots: 'Monday & Friday (7:00 PM - 9:00 PM IST)',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
    }
  ],
  curriculumGaps: [
    {
      id: 'gap-1',
      courseSubject: 'CS-402: Database Management & Health Data Systems',
      gapDeficitPercent: 42,
      syllabusCoverage: 'Standard Relational Algebra, SQL Normalization (3NF/BCNF), Relational Indexes.',
      industryDemand: 'Modern Industry Requires: ABDM FHIR 4.0 JSON schemas, graph databases (Neo4j) for herbal taxonomy, and HIPAA/DISHA data encryption at rest.',
      recommendedBridgeAction: 'Incorporate Swayam 4-Week Module on FHIR Health Data Interoperability'
    },
    {
      id: 'gap-2',
      courseSubject: 'AI-501: Machine Learning & Botanical Informatics',
      gapDeficitPercent: 35,
      syllabusCoverage: 'Linear Regression, Decision Trees, K-Means Clustering on synthetic datasets.',
      industryDemand: 'Modern Industry Requires: Pre-trained Transformer embeddings, IMPPAT botanical database integration, and multi-modal computer vision for herbal organoleptic validation.',
      recommendedBridgeAction: 'Adopt AICTE Model Curriculum Lab on Ayurvedic Phytochemistry Machine Learning'
    },
    {
      id: 'gap-3',
      courseSubject: 'IT-304: Web Engineering & Microservices',
      gapDeficitPercent: 28,
      syllabusCoverage: 'Monolithic PHP/JSP web architectures, XML Web Services, Apache HTTP Server.',
      industryDemand: 'Modern Industry Requires: React 19 single-page apps, FastAPI/Node.js event-driven microservices, Docker containerization, and AWS serverless deployment.',
      recommendedBridgeAction: 'Mandate Infosys Springboard Cloud Microservices Certification for 6th Sem'
    }
  ]
};

// Memory fallback store
let localStore = JSON.parse(JSON.stringify(initialData));

function loadJsonBackup() {
  if (fs.existsSync(jsonBackupPath)) {
    try {
      const data = fs.readFileSync(jsonBackupPath, 'utf8');
      localStore = JSON.parse(data);
    } catch (e) {
      console.warn('Could not parse local JSON backup, using default initial data.');
    }
  } else {
    saveJsonBackup();
  }
}

function saveJsonBackup() {
  try {
    fs.writeFileSync(jsonBackupPath, JSON.stringify(localStore, null, 2), 'utf8');
  } catch (e) {
    console.error('Failed to save JSON backup:', e.message);
  }
}

loadJsonBackup();

// Initialize MySQL Connection & Provision Tables
async function initDatabase() {
  try {
    // First test connecting to server without db to ensure database exists
    const rootConnection = await mysql.createConnection({
      host: DB_CONFIG.host,
      user: DB_CONFIG.user,
      password: DB_CONFIG.password,
      port: DB_CONFIG.port
    });
    
    await rootConnection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_CONFIG.database}\`;`);
    await rootConnection.end();

    pool = mysql.createPool(DB_CONFIG);
    const testConn = await pool.getConnection();
    console.log(`✅ Connected to MySQL Database: ${DB_CONFIG.database} on ${DB_CONFIG.host}:${DB_CONFIG.port} (User: ${DB_CONFIG.user})`);
    testConn.release();
    isMysqlConnected = true;

    await createTables();
    await seedDatabase();
  } catch (err) {
    console.warn(`⚠️ MySQL Connection notice: ${err.message}. Falling back to resilient JSON persistence engine.`);
    isMysqlConnected = false;
  }
}

async function createTables() {
  if (!pool) return;

  const queries = [
    // Users table
    `CREATE TABLE IF NOT EXISTS portal_users (
      id BIGINT NOT NULL AUTO_INCREMENT,
      email VARCHAR(255) UNIQUE NOT NULL,
      name VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(50) DEFAULT 'student',
      college VARCHAR(255) DEFAULT NULL,
      phone VARCHAR(50) DEFAULT NULL,
      created_at VARCHAR(100) DEFAULT NULL,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

    // Students table
    `CREATE TABLE IF NOT EXISTS student_profiles (
      id VARCHAR(100) PRIMARY KEY,
      user_id BIGINT,
      name VARCHAR(255) NOT NULL,
      roll_no VARCHAR(100),
      college VARCHAR(255),
      department VARCHAR(255),
      semester VARCHAR(100),
      cgpa DECIMAL(4,2) DEFAULT 8.50,
      readiness_score INT DEFAULT 84,
      nep_credits INT DEFAULT 148,
      verified_badges_count INT DEFAULT 6,
      avatar TEXT,
      skills_json JSON,
      certifications_json JSON,
      projects_json JSON,
      created_at VARCHAR(100)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

    // Internships & Jobs table
    `CREATE TABLE IF NOT EXISTS internships (
      id VARCHAR(100) PRIMARY KEY,
      company VARCHAR(255) NOT NULL,
      title VARCHAR(255) NOT NULL,
      location VARCHAR(255) NOT NULL,
      stipend VARCHAR(100),
      duration VARCHAR(100),
      type VARCHAR(100),
      openings INT DEFAULT 5,
      deadline VARCHAR(100),
      tags JSON,
      requirements JSON,
      description TEXT,
      featured BOOLEAN DEFAULT FALSE,
      hiring_batch VARCHAR(100),
      partner_mou VARCHAR(255),
      match_score INT DEFAULT 85,
      created_at VARCHAR(100)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

    // Applications table
    `CREATE TABLE IF NOT EXISTS portal_applications (
      id VARCHAR(100) PRIMARY KEY,
      job_id VARCHAR(100) NOT NULL,
      student_id VARCHAR(100),
      student_name VARCHAR(255),
      student_email VARCHAR(255),
      company VARCHAR(255) NOT NULL,
      title VARCHAR(255) NOT NULL,
      applied_date VARCHAR(100),
      status VARCHAR(100) DEFAULT 'Application Submitted',
      stage INT DEFAULT 1,
      next_step TEXT,
      match_score INT DEFAULT 85,
      created_at VARCHAR(100)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

    // Candidates table
    `CREATE TABLE IF NOT EXISTS candidates (
      id VARCHAR(100) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      degree VARCHAR(255),
      college VARCHAR(255),
      cgpa DECIMAL(4,2),
      nep_credits INT,
      top_skills JSON,
      match_with_active_job INT DEFAULT 85,
      status VARCHAR(100) DEFAULT 'Under Review',
      avatar TEXT
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

    // Capstone projects table
    `CREATE TABLE IF NOT EXISTS capstones (
      id VARCHAR(100) PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      company VARCHAR(255) NOT NULL,
      stipend VARCHAR(100),
      duration VARCHAR(100),
      difficulty VARCHAR(50),
      teams_enrolled INT DEFAULT 0,
      tags JSON,
      mentor VARCHAR(255),
      status VARCHAR(100) DEFAULT 'Accepting Student Teams'
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

    // Corporate MoUs table
    `CREATE TABLE IF NOT EXISTS mous (
      id VARCHAR(100) PRIMARY KEY,
      partner VARCHAR(255) NOT NULL,
      scope TEXT,
      signed_date VARCHAR(100),
      valid_until VARCHAR(100),
      status VARCHAR(100) DEFAULT 'Active & Legally Verified'
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

    // Mentors table
    `CREATE TABLE IF NOT EXISTS mentors (
      id VARCHAR(100) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      role VARCHAR(255),
      company VARCHAR(255),
      rating DECIMAL(3,2) DEFAULT 5.0,
      sessions_conducted INT DEFAULT 0,
      domains JSON,
      available_slots VARCHAR(255),
      avatar TEXT
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

    // Assessments history table
    `CREATE TABLE IF NOT EXISTS assessments (
      id BIGINT NOT NULL AUTO_INCREMENT,
      student_id VARCHAR(100),
      quiz_title VARCHAR(255),
      score INT,
      total_questions INT,
      passed BOOLEAN,
      credits_awarded INT,
      created_at VARCHAR(100),
      PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`
  ];

  for (const q of queries) {
    try {
      await pool.query(q);
    } catch (e) {
      console.warn('Error creating table:', e.message);
    }
  }
}

async function seedDatabase() {
  if (!pool) return;

  try {
    // Check Users
    const [userRows] = await pool.query('SELECT COUNT(*) as count FROM portal_users');
    if (userRows[0].count === 0) {
      for (const u of localStore.users) {
        await pool.query(
          'INSERT INTO portal_users (id, email, password, name, role, college, phone, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          [u.id, u.email, u.password, u.name, u.role, u.college, u.phone, u.created_at]
        );
      }
      console.log('🌱 Seeded initial users into MySQL');
    }

    // Check Student Profile
    const [profileRows] = await pool.query('SELECT COUNT(*) as count FROM student_profiles');
    if (profileRows[0].count === 0) {
      const sp = localStore.studentProfile;
      await pool.query(
        `INSERT INTO student_profiles (id, user_id, name, roll_no, college, department, semester, cgpa, readiness_score, nep_credits, verified_badges_count, avatar, skills_json, certifications_json, projects_json, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          sp.id, sp.user_id, sp.name, sp.rollNo, sp.college, sp.department, sp.semester,
          sp.cgpa, sp.readinessScore, sp.nepCredits, sp.verifiedBadgesCount, sp.avatar,
          JSON.stringify(sp.skills), JSON.stringify(sp.certifications), JSON.stringify(sp.projects),
          new Date().toISOString()
        ]
      );
      console.log('🌱 Seeded student profile into MySQL');
    }

    // Check Internships
    const [jobRows] = await pool.query('SELECT COUNT(*) as count FROM internships');
    if (jobRows[0].count === 0) {
      for (const j of localStore.internships) {
        await pool.query(
          `INSERT INTO internships (id, company, title, location, stipend, duration, type, openings, deadline, tags, requirements, description, featured, hiring_batch, partner_mou, match_score, created_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            j.id, j.company, j.title, j.location, j.stipend, j.duration, j.type, j.openings,
            j.deadline, JSON.stringify(j.tags), JSON.stringify(j.requirements), j.description,
            j.featured ? 1 : 0, j.hiringBatch, j.partnerMoU, j.matchScore, j.created_at
          ]
        );
      }
      console.log('🌱 Seeded internships into MySQL');
    }

    // Check Applications
    const [appRows] = await pool.query('SELECT COUNT(*) as count FROM portal_applications');
    if (appRows[0].count === 0) {
      for (const a of localStore.applications) {
        await pool.query(
          `INSERT INTO portal_applications (id, job_id, student_id, student_name, student_email, company, title, applied_date, status, stage, next_step, match_score, created_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            a.id, a.jobId, a.student_id, a.student_name, a.student_email, a.company, a.title,
            a.appliedDate, a.status, a.stage, a.nextStep, a.matchScore, a.created_at
          ]
        );
      }
      console.log('🌱 Seeded applications into MySQL');
    }

    // Check Candidates
    const [candRows] = await pool.query('SELECT COUNT(*) as count FROM candidates');
    if (candRows[0].count === 0) {
      for (const c of localStore.candidates) {
        await pool.query(
          `INSERT INTO candidates (id, name, degree, college, cgpa, nep_credits, top_skills, match_with_active_job, status, avatar)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [c.id, c.name, c.degree, c.college, c.cgpa, c.nepCredits, JSON.stringify(c.topSkills), c.matchWithActiveJob, c.status, c.avatar]
        );
      }
      console.log('🌱 Seeded candidates into MySQL');
    }

    // Check Capstones
    const [capRows] = await pool.query('SELECT COUNT(*) as count FROM capstones');
    if (capRows[0].count === 0) {
      for (const cap of localStore.capstones) {
        await pool.query(
          `INSERT INTO capstones (id, title, company, stipend, duration, difficulty, teams_enrolled, tags, mentor, status)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [cap.id, cap.title, cap.company, cap.stipend, cap.duration, cap.difficulty, cap.teamsEnrolled, JSON.stringify(cap.tags), cap.mentor, cap.status]
        );
      }
      console.log('🌱 Seeded capstones into MySQL');
    }

    // Check MoUs
    const [mouRows] = await pool.query('SELECT COUNT(*) as count FROM mous');
    if (mouRows[0].count === 0) {
      for (const m of localStore.mous) {
        await pool.query(
          `INSERT INTO mous (id, partner, scope, signed_date, valid_until, status)
           VALUES (?, ?, ?, ?, ?, ?)`,
          [m.id, m.partner, m.scope, m.signedDate, m.validUntil, m.status]
        );
      }
      console.log('🌱 Seeded corporate MoUs into MySQL');
    }

    // Check Mentors
    const [mentorRows] = await pool.query('SELECT COUNT(*) as count FROM mentors');
    if (mentorRows[0].count === 0) {
      for (const men of localStore.mentors) {
        await pool.query(
          `INSERT INTO mentors (id, name, role, company, rating, sessions_conducted, domains, available_slots, avatar)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [men.id, men.name, men.role, men.company, men.rating, men.sessionsConducted, JSON.stringify(men.domains), men.availableSlots, men.avatar]
        );
      }
      console.log('🌱 Seeded mentors into MySQL');
    }
  } catch (err) {
    console.warn('Notice during database seeding:', err.message);
  }
}

// Universal Query API Methods
const dbApi = {
  // DB Health & Status
  getHealth: async () => ({
    status: 'ONLINE',
    engine: isMysqlConnected ? 'MySQL 8.0' : 'JSON Engine (Fallback)',
    database: DB_CONFIG.database,
    user: DB_CONFIG.user,
    host: DB_CONFIG.host,
    mysqlConnected: isMysqlConnected,
    timestamp: new Date().toISOString()
  }),

  // USERS & AUTH
  findUserByEmail: async (email) => {
    if (isMysqlConnected && pool) {
      try {
        const [rows] = await pool.query('SELECT * FROM portal_users WHERE email = ?', [email]);
        if (rows.length > 0) return rows[0];

        // Also check legacy users table
        const [legacyRows] = await pool.query('SELECT id, email, password, name, role FROM users WHERE email = ?', [email]);
        if (legacyRows.length > 0) return legacyRows[0];
      } catch (e) {
        console.warn('MySQL query error, checking local store:', e.message);
      }
    }
    return localStore.users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
  },

  createUser: async (userData) => {
    const newUser = {
      id: Date.now(),
      email: userData.email,
      password: userData.password,
      name: userData.name,
      role: userData.role || 'student',
      college: userData.college || '',
      phone: userData.phone || '',
      created_at: new Date().toISOString()
    };

    if (isMysqlConnected && pool) {
      try {
        const [res] = await pool.query(
          'INSERT INTO portal_users (email, name, password, role, college, phone, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
          [newUser.email, newUser.name, newUser.password, newUser.role, newUser.college, newUser.phone, newUser.created_at]
        );
        newUser.id = res.insertId;
      } catch (e) {
        console.warn('MySQL insert user error, updating local store:', e.message);
      }
    }

    localStore.users.push(newUser);
    saveJsonBackup();
    return newUser;
  },

  // STUDENT PROFILE
  getStudentProfile: async (studentId = 'std-2026-001') => {
    if (isMysqlConnected && pool) {
      try {
        const [rows] = await pool.query('SELECT * FROM student_profiles WHERE id = ? LIMIT 1', [studentId]);
        if (rows.length > 0) {
          const r = rows[0];
          return {
            id: r.id,
            user_id: r.user_id,
            name: r.name,
            rollNo: r.roll_no,
            college: r.college,
            department: r.department,
            semester: r.semester,
            cgpa: parseFloat(r.cgpa),
            readinessScore: parseInt(r.readiness_score),
            nepCredits: parseInt(r.nep_credits),
            verifiedBadgesCount: parseInt(r.verified_badges_count),
            avatar: r.avatar,
            skills: typeof r.skills_json === 'string' ? JSON.parse(r.skills_json) : r.skills_json,
            certifications: typeof r.certifications_json === 'string' ? JSON.parse(r.certifications_json) : r.certifications_json,
            projects: typeof r.projects_json === 'string' ? JSON.parse(r.projects_json) : r.projects_json
          };
        }
      } catch (e) {
        console.warn('MySQL getStudentProfile error:', e.message);
      }
    }
    return localStore.studentProfile;
  },

  updateStudentProfile: async (updates, studentId = 'std-2026-001') => {
    localStore.studentProfile = { ...localStore.studentProfile, ...updates };
    saveJsonBackup();

    if (isMysqlConnected && pool) {
      try {
        const sp = localStore.studentProfile;
        await pool.query(
          `UPDATE student_profiles SET
            name = ?, cgpa = ?, readiness_score = ?, nep_credits = ?,
            verified_badges_count = ?, skills_json = ?, certifications_json = ?, projects_json = ?
           WHERE id = ?`,
          [
            sp.name, sp.cgpa, sp.readinessScore, sp.nepCredits,
            sp.verifiedBadgesCount, JSON.stringify(sp.skills), JSON.stringify(sp.certifications), JSON.stringify(sp.projects),
            studentId
          ]
        );
      } catch (e) {
        console.warn('MySQL updateStudentProfile error:', e.message);
      }
    }
    return localStore.studentProfile;
  },

  // INTERNSHIPS & JOBS
  getInternships: async () => {
    if (isMysqlConnected && pool) {
      try {
        const [rows] = await pool.query('SELECT * FROM internships ORDER BY created_at DESC');
        if (rows.length > 0) {
          return rows.map(r => ({
            id: r.id,
            company: r.company,
            title: r.title,
            location: r.location,
            stipend: r.stipend,
            duration: r.duration,
            type: r.type,
            openings: r.openings,
            deadline: r.deadline,
            tags: typeof r.tags === 'string' ? JSON.parse(r.tags) : r.tags,
            requirements: typeof r.requirements === 'string' ? JSON.parse(r.requirements) : r.requirements,
            description: r.description,
            featured: Boolean(r.featured),
            hiringBatch: r.hiring_batch,
            partnerMoU: r.partner_mou,
            matchScore: r.match_score,
            created_at: r.created_at
          }));
        }
      } catch (e) {
        console.warn('MySQL getInternships error:', e.message);
      }
    }
    return localStore.internships;
  },

  addInternship: async (jobData) => {
    const newJob = {
      id: `job-${Date.now()}`,
      company: jobData.company,
      title: jobData.title,
      location: jobData.location,
      stipend: jobData.stipend,
      duration: jobData.duration,
      type: jobData.type || 'Placement Pre-Offer (PPO)',
      openings: parseInt(jobData.openings) || 5,
      deadline: jobData.deadline,
      tags: jobData.tags || [],
      requirements: jobData.requirements || jobData.tags || [],
      description: jobData.description,
      featured: Boolean(jobData.featured),
      hiringBatch: jobData.hiringBatch || '2026 Batch',
      partnerMoU: jobData.partnerMoU || 'AICTE / Industry Partner',
      matchScore: jobData.matchScore || 85,
      created_at: new Date().toISOString()
    };

    localStore.internships.unshift(newJob);
    saveJsonBackup();

    if (isMysqlConnected && pool) {
      try {
        await pool.query(
          `INSERT INTO internships (id, company, title, location, stipend, duration, type, openings, deadline, tags, requirements, description, featured, hiring_batch, partner_mou, match_score, created_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            newJob.id, newJob.company, newJob.title, newJob.location, newJob.stipend, newJob.duration,
            newJob.type, newJob.openings, newJob.deadline, JSON.stringify(newJob.tags),
            JSON.stringify(newJob.requirements), newJob.description, newJob.featured ? 1 : 0,
            newJob.hiringBatch, newJob.partnerMoU, newJob.matchScore, newJob.created_at
          ]
        );
      } catch (e) {
        console.warn('MySQL addInternship error:', e.message);
      }
    }
    return newJob;
  },

  // APPLICATIONS
  getApplications: async (studentId = null) => {
    if (isMysqlConnected && pool) {
      try {
        let q = 'SELECT * FROM portal_applications';
        const params = [];
        if (studentId) {
          q += ' WHERE student_id = ?';
          params.push(studentId);
        }
        q += ' ORDER BY created_at DESC';
        const [rows] = await pool.query(q, params);
        if (rows.length > 0) {
          return rows.map(r => ({
            id: r.id,
            jobId: r.job_id,
            student_id: r.student_id,
            student_name: r.student_name,
            student_email: r.student_email,
            company: r.company,
            title: r.title,
            appliedDate: r.applied_date,
            status: r.status,
            stage: r.stage,
            nextStep: r.next_step,
            matchScore: r.match_score,
            created_at: r.created_at
          }));
        }
      } catch (e) {
        console.warn('MySQL getApplications error:', e.message);
      }
    }
    if (studentId) {
      return localStore.applications.filter(a => a.student_id === studentId);
    }
    return localStore.applications;
  },

  createApplication: async (appData) => {
    const newApp = {
      id: `app-${Date.now()}`,
      jobId: appData.jobId || appData.id,
      student_id: appData.student_id || 'std-2026-001',
      student_name: appData.student_name || 'Aryan Sharma',
      student_email: appData.student_email || 'aryan.sharma@college.edu.in',
      company: appData.company,
      title: appData.title,
      appliedDate: 'Today (Just now)',
      status: 'Application Submitted',
      stage: 1,
      nextStep: 'Candidate skill compatibility verification in progress',
      matchScore: appData.matchScore || 85,
      created_at: new Date().toISOString()
    };

    localStore.applications.unshift(newApp);
    saveJsonBackup();

    if (isMysqlConnected && pool) {
      try {
        await pool.query(
          `INSERT INTO portal_applications (id, job_id, student_id, student_name, student_email, company, title, applied_date, status, stage, next_step, match_score, created_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            newApp.id, newApp.jobId, newApp.student_id, newApp.student_name, newApp.student_email,
            newApp.company, newApp.title, newApp.appliedDate, newApp.status, newApp.stage,
            newApp.nextStep, newApp.matchScore, newApp.created_at
          ]
        );
      } catch (e) {
        console.warn('MySQL createApplication error:', e.message);
      }
    }
    return newApp;
  },

  // CANDIDATES
  getCandidates: async () => {
    if (isMysqlConnected && pool) {
      try {
        const [rows] = await pool.query('SELECT * FROM candidates');
        if (rows.length > 0) {
          return rows.map(r => ({
            id: r.id,
            name: r.name,
            degree: r.degree,
            college: r.college,
            cgpa: parseFloat(r.cgpa),
            nepCredits: parseInt(r.nep_credits),
            topSkills: typeof r.top_skills === 'string' ? JSON.parse(r.top_skills) : r.top_skills,
            matchWithActiveJob: r.match_with_active_job,
            status: r.status,
            avatar: r.avatar
          }));
        }
      } catch (e) {
        console.warn('MySQL getCandidates error:', e.message);
      }
    }
    return localStore.candidates;
  },

  updateCandidateStatus: async (candidateId, newStatus) => {
    const idx = localStore.candidates.findIndex(c => c.id === candidateId);
    if (idx !== -1) {
      localStore.candidates[idx].status = newStatus;
      saveJsonBackup();
    }

    if (isMysqlConnected && pool) {
      try {
        await pool.query('UPDATE candidates SET status = ? WHERE id = ?', [newStatus, candidateId]);
      } catch (e) {
        console.warn('MySQL updateCandidateStatus error:', e.message);
      }
    }
    return { id: candidateId, status: newStatus };
  },

  // CAPSTONES
  getCapstones: async () => {
    if (isMysqlConnected && pool) {
      try {
        const [rows] = await pool.query('SELECT * FROM capstones');
        if (rows.length > 0) {
          return rows.map(r => ({
            id: r.id,
            title: r.title,
            company: r.company,
            stipend: r.stipend,
            duration: r.duration,
            difficulty: r.difficulty,
            teamsEnrolled: r.teams_enrolled,
            tags: typeof r.tags === 'string' ? JSON.parse(r.tags) : r.tags,
            mentor: r.mentor,
            status: r.status
          }));
        }
      } catch (e) {
        console.warn('MySQL getCapstones error:', e.message);
      }
    }
    return localStore.capstones;
  },

  enrollCapstone: async (capstoneId) => {
    const cap = localStore.capstones.find(c => c.id === capstoneId);
    if (cap) {
      cap.teamsEnrolled = (cap.teamsEnrolled || 0) + 1;
      saveJsonBackup();
    }

    if (isMysqlConnected && pool) {
      try {
        await pool.query('UPDATE capstones SET teams_enrolled = teams_enrolled + 1 WHERE id = ?', [capstoneId]);
      } catch (e) {
        console.warn('MySQL enrollCapstone error:', e.message);
      }
    }
    return cap;
  },

  addCapstone: async (capData) => {
    const newCap = {
      id: `cap-${Date.now()}`,
      title: capData.title,
      company: capData.company,
      stipend: capData.stipend,
      duration: capData.duration,
      difficulty: capData.difficulty || 'Intermediate',
      teamsEnrolled: 1,
      tags: capData.tags || [],
      mentor: capData.mentor || 'Corporate Lead Mentor',
      status: 'Accepting Student Teams'
    };

    localStore.capstones.unshift(newCap);
    saveJsonBackup();

    if (isMysqlConnected && pool) {
      try {
        await pool.query(
          `INSERT INTO capstones (id, title, company, stipend, duration, difficulty, teams_enrolled, tags, mentor, status)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [newCap.id, newCap.title, newCap.company, newCap.stipend, newCap.duration, newCap.difficulty, newCap.teamsEnrolled, JSON.stringify(newCap.tags), newCap.mentor, newCap.status]
        );
      } catch (e) {
        console.warn('MySQL addCapstone error:', e.message);
      }
    }
    return newCap;
  },

  // MOUS
  getMous: async () => {
    if (isMysqlConnected && pool) {
      try {
        const [rows] = await pool.query('SELECT * FROM mous');
        if (rows.length > 0) {
          return rows.map(r => ({
            id: r.id,
            partner: r.partner,
            scope: r.scope,
            signedDate: r.signed_date,
            validUntil: r.valid_until,
            status: r.status
          }));
        }
      } catch (e) {
        console.warn('MySQL getMous error:', e.message);
      }
    }
    return localStore.mous;
  },

  addMou: async (mouData) => {
    const newMou = {
      id: `mou-${Date.now()}`,
      partner: mouData.partner,
      scope: mouData.scope,
      signedDate: 'Sept 2026 (Live)',
      validUntil: mouData.validUntil || 'Sept 2030',
      status: 'Active & Legally Verified'
    };

    localStore.mous.unshift(newMou);
    saveJsonBackup();

    if (isMysqlConnected && pool) {
      try {
        await pool.query(
          'INSERT INTO mous (id, partner, scope, signed_date, valid_until, status) VALUES (?, ?, ?, ?, ?, ?)',
          [newMou.id, newMou.partner, newMou.scope, newMou.signedDate, newMou.validUntil, newMou.status]
        );
      } catch (e) {
        console.warn('MySQL addMou error:', e.message);
      }
    }
    return newMou;
  },

  // MENTORS
  getMentors: async () => {
    if (isMysqlConnected && pool) {
      try {
        const [rows] = await pool.query('SELECT * FROM mentors');
        if (rows.length > 0) {
          return rows.map(r => ({
            id: r.id,
            name: r.name,
            role: r.role,
            company: r.company,
            rating: parseFloat(r.rating),
            sessionsConducted: r.sessions_conducted,
            domains: typeof r.domains === 'string' ? JSON.parse(r.domains) : r.domains,
            availableSlots: r.available_slots,
            avatar: r.avatar
          }));
        }
      } catch (e) {
        console.warn('MySQL getMentors error:', e.message);
      }
    }
    return localStore.mentors;
  },

  // RECORD ASSESSMENT
  recordAssessment: async (data) => {
    const assessment = {
      student_id: data.student_id || 'std-2026-001',
      quiz_title: data.quiz_title || 'Adaptive Technical Competency Assessment',
      score: data.score,
      total_questions: data.total_questions,
      passed: data.passed,
      credits_awarded: data.credits_awarded || 2,
      created_at: new Date().toISOString()
    };

    if (data.passed) {
      // Award credits & boost readiness score
      const sp = localStore.studentProfile;
      sp.readinessScore = Math.min(100, (sp.readinessScore || 84) + 4);
      sp.nepCredits = (sp.nepCredits || 148) + assessment.credits_awarded;
      sp.skills = sp.skills.map(s =>
        s.name.includes('Clinical Data') || s.name.includes('Ayush')
          ? { ...s, level: Math.min(100, s.level + 20), verified: true }
          : s
      );
      saveJsonBackup();

      if (isMysqlConnected && pool) {
        try {
          await pool.query(
            'INSERT INTO assessments (student_id, quiz_title, score, total_questions, passed, credits_awarded, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [assessment.student_id, assessment.quiz_title, assessment.score, assessment.total_questions, assessment.passed ? 1 : 0, assessment.credits_awarded, assessment.created_at]
          );
          await pool.query(
            'UPDATE student_profiles SET readiness_score = ?, nep_credits = ?, skills_json = ? WHERE id = ?',
            [sp.readinessScore, sp.nepCredits, JSON.stringify(sp.skills), sp.id]
          );
        } catch (e) {
          console.warn('MySQL recordAssessment error:', e.message);
        }
      }
    }
    return { success: true, assessment, studentProfile: localStore.studentProfile };
  }
};

// Initialize right away
initDatabase();

module.exports = dbApi;
