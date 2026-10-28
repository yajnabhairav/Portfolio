import { Request, Response } from 'express';
import { db } from '../db/database.ts';

export const projectController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const { category, tag, search } = req.query;
      const projects = db.getProjects({
        category: category ? String(category) : undefined,
        tag: tag ? String(tag) : undefined,
        search: search ? String(search) : undefined
      });

      return res.status(200).json({
        success: true,
        count: projects.length,
        data: projects
      });
    } catch (err: any) {
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch projects.',
        error: err.message
      });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const project = db.getProjectById(id);

      if (!project) {
        return res.status(404).json({
          success: false,
          message: `Project with ID or slug "${id}" was not found.`
        });
      }

      return res.status(200).json({
        success: true,
        data: project
      });
    } catch (err: any) {
      return res.status(500).json({
        success: false,
        message: 'Error fetching project details.',
        error: err.message
      });
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const {
        title,
        slug,
        category,
        year,
        summary,
        description,
        keyHighlights,
        tags,
        architecture,
        codeSnippet,
        githubUrl,
        liveUrl,
        featured
      } = req.body;

      if (!title || !description || !year) {
        return res.status(400).json({
          success: false,
          message: 'Title, description, and year are required fields.'
        });
      }

      const generatedSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

      const newProject = db.createProject({
        title,
        slug: generatedSlug,
        category: category || 'Systems & Engineering',
        year: String(year),
        summary: summary || description.slice(0, 160),
        description,
        keyHighlights: Array.isArray(keyHighlights) ? keyHighlights : (keyHighlights ? [keyHighlights] : []),
        tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map((t: string) => t.trim()) : ['Systems']),
        architecture: architecture || undefined,
        codeSnippet: codeSnippet || undefined,
        githubUrl: githubUrl || 'https://github.com',
        liveUrl: liveUrl || '',
        featured: Boolean(featured)
      });

      return res.status(201).json({
        success: true,
        message: 'Project created successfully in database.',
        data: newProject
      });
    } catch (err: any) {
      return res.status(500).json({
        success: false,
        message: 'Failed to create project.',
        error: err.message
      });
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updates = req.body;

      const updated = db.updateProject(id, updates);
      if (!updated) {
        return res.status(404).json({
          success: false,
          message: `Project with ID "${id}" was not found.`
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Project updated successfully.',
        data: updated
      });
    } catch (err: any) {
      return res.status(500).json({
        success: false,
        message: 'Failed to update project.',
        error: err.message
      });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deleted = db.deleteProject(id);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: `Project with ID "${id}" was not found.`
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Project deleted successfully from database.'
      });
    } catch (err: any) {
      return res.status(500).json({
        success: false,
        message: 'Failed to delete project.',
        error: err.message
      });
    }
  },

  resetDefaults: async (_req: Request, res: Response) => {
    try {
      db.resetToDefaults();
      return res.status(200).json({
        success: true,
        message: 'Database reset to default seed projects and data.'
      });
    } catch (err: any) {
      return res.status(500).json({
        success: false,
        message: 'Failed to reset database defaults.',
        error: err.message
      });
    }
  }
};
