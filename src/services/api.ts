import { Project, Inquiry, AdminUser, SystemHealth, AnalyticsData } from '../types.ts';

const TOKEN_KEY = 'adarsh_portfolio_jwt';

export const authStorage = {
  getToken: (): string | null => {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  },
  setToken: (token: string) => {
    try {
      localStorage.setItem(TOKEN_KEY, token);
    } catch (e) {
      console.error('Failed to save auth token:', e);
    }
  },
  removeToken: () => {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch (e) {
      console.error('Failed to remove auth token:', e);
    }
  }
};

const getAuthHeaders = () => {
  const token = authStorage.getToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

export const api = {
  // --- Projects ---
  async getProjects(params?: { category?: string; tag?: string; search?: string }): Promise<Project[]> {
    const query = new URLSearchParams();
    if (params?.category) query.append('category', params.category);
    if (params?.tag) query.append('tag', params.tag);
    if (params?.search) query.append('search', params.search);

    const res = await fetch(`/api/projects?${query.toString()}`);
    if (!res.ok) throw new Error('Failed to load projects');
    const json = await res.json();
    return json.data;
  },

  async getProjectById(id: string): Promise<Project> {
    const res = await fetch(`/api/projects/${id}`);
    if (!res.ok) throw new Error('Project not found');
    const json = await res.json();
    return json.data;
  },

  async createProject(project: Partial<Project>): Promise<Project> {
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(project)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to create project');
    return json.data;
  },

  async updateProject(id: string, updates: Partial<Project>): Promise<Project> {
    const res = await fetch(`/api/projects/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(updates)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to update project');
    return json.data;
  },

  async deleteProject(id: string): Promise<void> {
    const res = await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to delete project');
  },

  async resetProjectDefaults(): Promise<void> {
    const res = await fetch('/api/projects/admin/reset-defaults', {
      method: 'POST',
      headers: getAuthHeaders()
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to reset defaults');
  },

  // --- Inquiries ---
  async submitInquiry(data: { name: string; email: string; subject?: string; message: string }): Promise<Inquiry> {
    const res = await fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to send inquiry');
    return json.data;
  },

  async getInquiries(): Promise<{ inquiries: Inquiry[]; count: number; unreadCount: number }> {
    const res = await fetch('/api/inquiries', {
      headers: getAuthHeaders()
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to fetch inquiries');
    return {
      inquiries: json.data,
      count: json.count,
      unreadCount: json.unreadCount
    };
  },

  async updateInquiryStatus(id: string, isRead: boolean, status?: 'new' | 'reviewed' | 'replied'): Promise<Inquiry> {
    const res = await fetch(`/api/inquiries/${id}/status`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ isRead, status })
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to update inquiry status');
    return json.data;
  },

  async deleteInquiry(id: string): Promise<void> {
    const res = await fetch(`/api/inquiries/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to delete inquiry');
  },

  // --- Auth ---
  async login(username: string, password: string): Promise<{ token: string; admin: AdminUser }> {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Authentication failed');
    authStorage.setToken(json.token);
    return { token: json.token, admin: json.admin };
  },

  async getAdminProfile(): Promise<AdminUser> {
    const res = await fetch('/api/auth/me', {
      headers: getAuthHeaders()
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to fetch admin profile');
    return json.admin;
  },

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    const res = await fetch('/api/auth/change-password', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ currentPassword, newPassword })
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to change password');
  },

  // --- System Diagnostics & Analytics ---
  async getHealth(): Promise<SystemHealth> {
    const res = await fetch('/api/system/health');
    if (!res.ok) throw new Error('Health check failed');
    return await res.json();
  },

  async getAnalytics(): Promise<AnalyticsData> {
    const res = await fetch('/api/system/analytics', {
      headers: getAuthHeaders()
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Failed to fetch analytics');
    return json.metrics;
  }
};
