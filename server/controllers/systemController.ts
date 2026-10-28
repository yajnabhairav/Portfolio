import { Request, Response } from 'express';
import { db } from '../db/database.ts';

export const systemController = {
  getHealth: async (_req: Request, res: Response) => {
    try {
      const start = Date.now();
      const diagnostics = db.getDiagnostics();
      const duration = Date.now() - start;

      return res.status(200).json({
        success: true,
        timestamp: new Date().toISOString(),
        status: 'OPERATIONAL',
        latencyMs: duration,
        system: {
          nodeVersion: process.version,
          platform: process.platform,
          memoryUsage: process.memoryUsage(),
          diagnostics
        }
      });
    } catch (err: any) {
      return res.status(500).json({
        success: false,
        status: 'DEGRADED',
        error: err.message
      });
    }
  },

  getAnalytics: async (_req: Request, res: Response) => {
    try {
      const projects = db.getProjects();
      const inquiries = db.getInquiries();
      const diagnostics = db.getDiagnostics();

      const categoriesMap: Record<string, number> = {};
      projects.forEach(p => {
        categoriesMap[p.category] = (categoriesMap[p.category] || 0) + 1;
      });

      const tagsMap: Record<string, number> = {};
      projects.forEach(p => {
        p.tags.forEach(t => {
          tagsMap[t] = (tagsMap[t] || 0) + 1;
        });
      });

      return res.status(200).json({
        success: true,
        metrics: {
          totalProjects: projects.length,
          featuredProjects: projects.filter(p => p.featured).length,
          totalInquiries: inquiries.length,
          unreadInquiries: inquiries.filter(i => !i.isRead).length,
          repliedInquiries: inquiries.filter(i => i.status === 'replied').length,
          categoriesCount: categoriesMap,
          popularTags: Object.entries(tagsMap)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 8)
            .map(([tag, count]) => ({ tag, count })),
          diagnostics
        }
      });
    } catch (err: any) {
      return res.status(500).json({
        success: false,
        message: 'Failed to aggregate analytics.',
        error: err.message
      });
    }
  }
};
