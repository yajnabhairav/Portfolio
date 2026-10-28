export interface IProject {
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

export interface IInquiry {
  _id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  isRead: boolean;
  status: 'new' | 'reviewed' | 'replied';
  createdAt: string;
}

export interface IAdmin {
  _id: string;
  username: string;
  passwordHash: string;
  name: string;
  email: string;
  role: 'superadmin' | 'admin';
  lastLogin?: string;
  createdAt: string;
}
