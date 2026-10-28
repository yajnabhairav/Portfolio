import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { db } from '../db/database.ts';
import { generateToken, AuthenticatedRequest } from '../middleware/auth.ts';

export const authController = {
  login: async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({
          success: false,
          message: 'Both username and password are required.'
        });
      }

      const admin = db.getAdminByUsername(username);
      if (!admin) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials. Please verify your admin username and password.'
        });
      }

      const isMatch = bcrypt.compareSync(password, admin.passwordHash);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials. Please verify your admin username and password.'
        });
      }

      db.updateAdminLastLogin(admin._id);

      const token = generateToken({
        id: admin._id,
        username: admin.username,
        role: admin.role
      });

      return res.status(200).json({
        success: true,
        message: 'Admin authorization granted.',
        token,
        admin: {
          id: admin._id,
          username: admin.username,
          name: admin.name,
          email: admin.email,
          role: admin.role,
          lastLogin: admin.lastLogin
        }
      });
    } catch (err: any) {
      console.error('Auth login error:', err);
      return res.status(500).json({
        success: false,
        message: 'Internal server authentication error.',
        error: err.message
      });
    }
  },

  getProfile: async (req: AuthenticatedRequest, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
      }

      const admin = db.getAdminById(req.user.id);
      if (!admin) {
        return res.status(404).json({ success: false, message: 'Admin account not found.' });
      }

      return res.status(200).json({
        success: true,
        admin: {
          id: admin._id,
          username: admin.username,
          name: admin.name,
          email: admin.email,
          role: admin.role,
          lastLogin: admin.lastLogin
        }
      });
    } catch (err: any) {
      return res.status(500).json({
        success: false,
        message: 'Failed to retrieve profile.',
        error: err.message
      });
    }
  },

  changePassword: async (req: AuthenticatedRequest, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
      }

      const { currentPassword, newPassword } = req.body;
      if (!currentPassword || !newPassword || newPassword.length < 6) {
        return res.status(400).json({
          success: false,
          message: 'New password must be at least 6 characters long.'
        });
      }

      const admin = db.getAdminById(req.user.id);
      if (!admin || !bcrypt.compareSync(currentPassword, admin.passwordHash)) {
        return res.status(400).json({
          success: false,
          message: 'Current password provided is incorrect.'
        });
      }

      db.updateAdminPassword(admin._id, newPassword);

      return res.status(200).json({
        success: true,
        message: 'Admin password updated successfully.'
      });
    } catch (err: any) {
      return res.status(500).json({
        success: false,
        message: 'Failed to update password.',
        error: err.message
      });
    }
  }
};
