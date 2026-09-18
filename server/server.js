const express = require('express');
const cors = require('cors');
const path = require('path');
const dbApi = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ─── HEALTH CHECK ─────────────────────────────────────────────────────────────
app.get('/api/health', async (req, res) => {
  try {
    const health = await dbApi.getHealth();
    res.json(health);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── AUTHENTICATION ROUTES ───────────────────────────────────────────────────
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const user = await dbApi.findUserByEmail(email);
    if (!user) {
      // If user not in DB yet, check standard demo accounts or return error
      if (email === 'admin@edubridge.gov.in' && password === 'admin123') {
        return res.json({
          success: true,
          user: { name: 'Apex Admin', email, role: 'national', isAdmin: true }
        });
      }
      return res.status(401).json({ error: 'Invalid email or password. Please register or check credentials.' });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid password. Please try again.' });
    }

    // Role mapping
    const effectiveRole = user.role === 'admin' ? 'national' : (role || user.role || 'student');

    res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: effectiveRole,
        college: user.college,
        phone: user.phone,
        isAdmin: user.role === 'admin'
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name, role, college, phone } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Full name, email, and password are required.' });
    }

    const existing = await dbApi.findUserByEmail(email);
    if (existing) {
      return res.status(409).json({ error: 'An account with this email address already exists. Please sign in.' });
    }

    const newUser = await dbApi.createUser({ email, password, name, role, college, phone });
    res.status(201).json({
      success: true,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role === 'admin' ? 'national' : (newUser.role || 'student'),
        college: newUser.college,
        phone: newUser.phone,
        isAdmin: newUser.role === 'admin'
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── STUDENT PROFILE ROUTES ──────────────────────────────────────────────────
app.get('/api/student/profile', async (req, res) => {
  try {
    const profile = await dbApi.getStudentProfile();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/student/profile', async (req, res) => {
  try {
    const updated = await dbApi.updateStudentProfile(req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── INTERNSHIPS & JOBS ROUTES ───────────────────────────────────────────────
app.get('/api/internships', async (req, res) => {
  try {
    const internships = await dbApi.getInternships();
    res.json(internships);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/internships', async (req, res) => {
  try {
    const created = await dbApi.addInternship(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── APPLICATIONS ROUTES ─────────────────────────────────────────────────────
app.get('/api/applications', async (req, res) => {
  try {
    const apps = await dbApi.getApplications(req.query.studentId);
    res.json(apps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/applications', async (req, res) => {
  try {
    const newApp = await dbApi.createApplication(req.body);
    res.status(201).json(newApp);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── CANDIDATES ROUTES ───────────────────────────────────────────────────────
app.get('/api/candidates', async (req, res) => {
  try {
    const candidates = await dbApi.getCandidates();
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/candidates/:id/status', async (req, res) => {
  try {
    const result = await dbApi.updateCandidateStatus(req.params.id, req.body.status);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── CAPSTONES ROUTES ────────────────────────────────────────────────────────
app.get('/api/capstones', async (req, res) => {
  try {
    const capstones = await dbApi.getCapstones();
    res.json(capstones);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/capstones', async (req, res) => {
  try {
    const newCap = await dbApi.addCapstone(req.body);
    res.status(201).json(newCap);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/capstones/:id/enroll', async (req, res) => {
  try {
    const enrolled = await dbApi.enrollCapstone(req.params.id);
    res.json(enrolled);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── MOUS ROUTES ─────────────────────────────────────────────────────────────
app.get('/api/mous', async (req, res) => {
  try {
    const mous = await dbApi.getMous();
    res.json(mous);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/mous', async (req, res) => {
  try {
    const newMou = await dbApi.addMou(req.body);
    res.status(201).json(newMou);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── MENTORS ROUTES ──────────────────────────────────────────────────────────
app.get('/api/mentors', async (req, res) => {
  try {
    const mentors = await dbApi.getMentors();
    res.json(mentors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── ASSESSMENT SUBMISSION ROUTE ─────────────────────────────────────────────
app.post('/api/student/assessment', async (req, res) => {
  try {
    const result = await dbApi.recordAssessment(req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Placement Portal Backend API Server live on http://localhost:${PORT}`);
});
