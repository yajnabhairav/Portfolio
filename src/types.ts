export interface Project {
  _id: string;
  title: string;
  slug: string;
  category: string;
  year: string;
  summary: string;
  description: string;
  keyHighlights: string[];
  tags: string[];
  architecture?: {
    components: string[];
    diagramType?: string;
  };
  codeSnippet?: {
    language: string;
    title: string;
    code: string;
  };
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Inquiry {
  _id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  isRead: boolean;
  status: 'new' | 'reviewed' | 'replied';
  createdAt: string;
}

export interface AdminUser {
  id: string;
  username: string;
  name: string;
  email: string;
  role: string;
  lastLogin?: string;
}

export interface SystemHealth {
  status: string;
  timestamp: string;
  latencyMs: number;
  system: {
    nodeVersion: string;
    platform: string;
    memoryUsage: Record<string, number>;
    diagnostics: {
      status: string;
      database: string;
      engine: string;
      totalProjects: number;
      totalInquiries: number;
      unreadInquiries: number;
      uptimeSeconds: number;
      lastSaved: string;
      version: string;
      pingMs: number;
    };
  };
}

export interface AnalyticsData {
  totalProjects: number;
  featuredProjects: number;
  totalInquiries: number;
  unreadInquiries: number;
  repliedInquiries: number;
  categoriesCount: Record<string, number>;
  popularTags: { tag: string; count: number }[];
  diagnostics: any;
}
