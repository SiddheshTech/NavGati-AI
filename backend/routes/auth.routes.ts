import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'hackathon_secret_key_123';

// Mock in-memory users for the hackathon
const users = [
  { id: '1', email: 'super@company.com', password: 'password', role: 'super_admin', name: 'Super Admin User' },
  { id: '2', email: 'admin@company.com', password: 'password', role: 'company_admin', name: 'Company Admin User' },
  { id: '3', email: 'ops@company.com', password: 'password', role: 'operations_manager', name: 'Ops Manager' },
  { id: '4', email: 'analyst@company.com', password: 'password', role: 'analyst', name: 'Data Analyst' },
  { id: '5', email: 'field@company.com', password: 'password', role: 'field_exec', name: 'Field Executive' },
  { id: '6', email: 'viewer@company.com', password: 'password', role: 'viewer', name: 'Client Viewer' },
];

router.post('/login', (req: Request, res: Response): void => {
  const { email, password, role } = req.body;

  // In a real app, we would query the database and hash passwords
  // For this hackathon demo, we check the hardcoded mock users, 
  // or allow any email/password as long as the role is provided to simulate the demo flow.
  
  let user;
  if (email && password) {
    user = users.find(u => u.email === email && u.password === password);
  } else if (role) {
    // Demo fallback: login just by role
    user = users.find(u => u.role === role);
  }

  if (!user) {
    // If we want to be very demo-friendly, we can just create a temp user based on the selected role
    if (role) {
      user = {
        id: Math.random().toString(36).substring(7),
        email: email || `demo_${role}@company.com`,
        role: role,
        name: `Demo ${role.replace('_', ' ')}`
      };
    } else {
      res.status(401).json({ error: 'Invalid credentials or role.' });
      return;
    }
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role, name: user.name },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  res.json({
    message: 'Login successful',
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name
    }
  });
});

router.post('/register', (req: Request, res: Response): void => {
  const { email, password, role, name } = req.body;

  if (!email || !password || !role) {
    res.status(400).json({ error: 'Email, password, and role are required.' });
    return;
  }

  // Mock registration
  const newUser = {
    id: String(users.length + 1),
    email,
    password,
    role,
    name: name || email.split('@')[0]
  };

  users.push(newUser);

  const token = jwt.sign(
    { id: newUser.id, email: newUser.email, role: newUser.role, name: newUser.name },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  res.status(201).json({
    message: 'Registration successful',
    token,
    user: {
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
      name: newUser.name
    }
  });
});

export default router;
