import { CollageState, UserAccount, ProjectSummary } from '../types';

const STORAGE_KEYS = {
  CURRENT_PROJECT: 'collagenie_current_project_v1',
  PROJECT_LIST: 'collagenie_projects_list_v1',
  AUTH_USER: 'collagenie_auth_user_v1',
};

export const DEFAULT_INITIAL_STATE: CollageState = {
  id: 'project-default',
  name: 'Untitled Aesthetic Collage',
  createdAt: Date.now(),
  updatedAt: Date.now(),
  aspectRatio: '16:9',
  customWidth: 1920,
  customHeight: 1080,
  layoutTemplateId: '4-quad-grid',
  gap: 16,
  padding: 24,
  cellRadius: 18,
  canvasRadius: 24,
  cellShadow: 'xl',
  cellBorderWidth: 1,
  cellBorderColor: 'rgba(255, 255, 255, 0.15)',
  background: {
    type: 'gradient',
    color: '#0f172a',
    gradient: {
      from: '#0f172a',
      via: '#1e1b4b',
      to: '#311042',
      direction: 'to-br',
    },
  },
  cells: [
    {
      id: 'cell-1',
      x: 0,
      y: 0,
      w: 0.5,
      h: 0.5,
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
      zoom: 1,
      offsetX: 0,
      offsetY: 0,
      rotate: 0,
      filter: 'none',
    },
    {
      id: 'cell-2',
      x: 0.5,
      y: 0,
      w: 0.5,
      h: 0.5,
      imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
      zoom: 1,
      offsetX: 0,
      offsetY: 0,
      rotate: 0,
      filter: 'none',
    },
    {
      id: 'cell-3',
      x: 0,
      y: 0.5,
      w: 0.5,
      h: 0.5,
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80',
      zoom: 1,
      offsetX: 0,
      offsetY: 0,
      rotate: 0,
      filter: 'none',
    },
    {
      id: 'cell-4',
      x: 0.5,
      y: 0.5,
      w: 0.5,
      h: 0.5,
      imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=80',
      zoom: 1,
      offsetX: 0,
      offsetY: 0,
      rotate: 0,
      filter: 'none',
    },
  ],
  badges: [
    {
      id: 'badge-1',
      type: 'metric',
      title: 'Growth Metric',
      value: '🚀 +185% Engagement',
      color: 'emerald',
      x: 8,
      y: 12,
      scale: 1,
    },
    {
      id: 'badge-2',
      type: 'rating',
      title: 'Aesthetic Score',
      value: '⭐ 5.0 Perfect Grid',
      color: 'amber',
      x: 65,
      y: 84,
      scale: 0.95,
    },
  ],
  textOverlays: [],
};

// Persistence functions
export function loadCurrentProject(): CollageState {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_PROJECT);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Failed to load project from localStorage', err);
  }
  return DEFAULT_INITIAL_STATE;
}

export function saveCurrentProject(state: CollageState) {
  try {
    const updated = { ...state, updatedAt: Date.now() };
    localStorage.setItem(STORAGE_KEYS.CURRENT_PROJECT, JSON.stringify(updated));

    // Also update in project list
    const projects = getAllProjects();
    const existingIdx = projects.findIndex(p => p.id === state.id);
    const summary: ProjectSummary = {
      id: state.id,
      name: state.name || 'Untitled Collage',
      updatedAt: updated.updatedAt,
      photoCount: state.cells.filter(c => !!c.imageUrl).length,
      aspectRatio: state.aspectRatio,
    };

    if (existingIdx >= 0) {
      projects[existingIdx] = summary;
    } else {
      projects.unshift(summary);
    }
    localStorage.setItem(STORAGE_KEYS.PROJECT_LIST, JSON.stringify(projects.slice(0, 50)));
    localStorage.setItem(`collagenie_proj_${state.id}`, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save project to localStorage', err);
  }
}

export function getAllProjects(): ProjectSummary[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROJECT_LIST);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Failed to parse project list', err);
  }
  return [
    {
      id: DEFAULT_INITIAL_STATE.id,
      name: DEFAULT_INITIAL_STATE.name,
      updatedAt: DEFAULT_INITIAL_STATE.updatedAt,
      photoCount: 4,
      aspectRatio: '16:9',
    },
  ];
}

export function loadProjectById(id: string): CollageState | null {
  try {
    const raw = localStorage.getItem(`collagenie_proj_${id}`);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error(`Failed to load project ${id}`, err);
  }
  return null;
}

export function deleteProjectById(id: string): ProjectSummary[] {
  try {
    localStorage.removeItem(`collagenie_proj_${id}`);
    const list = getAllProjects().filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.PROJECT_LIST, JSON.stringify(list));
    return list;
  } catch (err) {
    console.error(`Failed to delete project ${id}`, err);
    return getAllProjects();
  }
}

// User Auth Persistence (Local mock system)
export function getStoredUser(): UserAccount {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.AUTH_USER);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Failed to load user', err);
  }
  return {
    id: 'guest',
    email: '',
    name: 'Guest Creator',
    isLoggedIn: false,
  };
}

export function setStoredUser(user: UserAccount) {
  try {
    localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(user));
  } catch (err) {
    console.error('Failed to save user', err);
  }
}

export function clearStoredUser() {
  localStorage.removeItem(STORAGE_KEYS.AUTH_USER);
}
