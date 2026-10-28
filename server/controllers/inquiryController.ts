import { Request, Response } from 'express';
import { db } from '../db/database.ts';

export const inquiryController = {
  create: async (req: Request, res: Response) => {
    try {
      const { name, email, subject, message } = req.body;

      if (!name || !email || !message) {
        return res.status(400).json({
          success: false,
          message: 'Name, email, and message content are required.'
        });
      }

      // Basic email regex validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: 'Please provide a valid email address.'
        });
      }

      const inquiry = db.createInquiry({
        name,
        email,
        subject,
        message
      });

      return res.status(201).json({
        success: true,
        message: 'Your inquiry has been transmitted directly to Adarsh Narayan. Thank you!',
        data: inquiry
      });
    } catch (err: any) {
      return res.status(500).json({
        success: false,
        message: 'Failed to submit inquiry. Please try again or reach out via direct email.',
        error: err.message
      });
    }
  },

  getAll: async (_req: Request, res: Response) => {
    try {
      const inquiries = db.getInquiries();
      return res.status(200).json({
        success: true,
        count: inquiries.length,
        unreadCount: inquiries.filter(i => !i.isRead).length,
        data: inquiries
      });
    } catch (err: any) {
      return res.status(500).json({
        success: false,
        message: 'Failed to retrieve inquiries inbox.',
        error: err.message
      });
    }
  },

  updateStatus: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { isRead, status } = req.body;

      const updated = db.markInquiryStatus(id, Boolean(isRead), status);
      if (!updated) {
        return res.status(404).json({
          success: false,
          message: `Inquiry "${id}" not found.`
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Inquiry status updated successfully.',
        data: updated
      });
    } catch (err: any) {
      return res.status(500).json({
        success: false,
        message: 'Failed to update inquiry status.',
        error: err.message
      });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deleted = db.deleteInquiry(id);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: `Inquiry "${id}" not found.`
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Inquiry deleted successfully from inbox.'
      });
    } catch (err: any) {
      return res.status(500).json({
        success: false,
        message: 'Failed to delete inquiry.',
        error: err.message
      });
    }
  }
};
