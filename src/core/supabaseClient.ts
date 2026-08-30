// Live Supabase Backend Client for Centralized Telemetry & Crowd-Marketing Storage

const SUPABASE_URL = 'https://afkprfgyjgfsbmjzskbr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFma3ByZmd5amdmc2Jtanpza2JyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgwNzQ5ODAsImV4cCI6MjEwMzY1MDk4MH0.1Ltua2Srbj8hWssNsX5jqMU-fZy0hZk4LVQVJ9ikkgk';

export interface RemoteClientError {
  id?: string;
  created_at?: string;
  message: string;
  stack?: string;
  source?: string;
  url?: string;
  user_agent?: string;
  screen_resolution?: string;
  state_snapshot?: string;
}

export interface RemoteCrowdLink {
  id?: string;
  created_at?: string;
  target_platform: string;
  post_title: string;
  published_url: string;
  anchor_text: string;
  domain_authority?: number;
  status?: string;
}

export const supabaseService = {
  // Push an error event directly to Supabase client_errors table
  async logError(errorData: RemoteClientError): Promise<boolean> {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/client_errors`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify(errorData),
      });
      return res.ok;
    } catch {
      return false;
    }
  },

  // Fetch all remote error logs from Supabase
  async fetchErrors(): Promise<RemoteClientError[]> {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/client_errors?select=*&order=created_at.desc&limit=100`, {
        method: 'GET',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        },
      });
      if (!res.ok) return [];
      return await res.json();
    } catch {
      return [];
    }
  },

  // Fetch verified crowd backlinks
  async fetchCrowdLinks(): Promise<RemoteCrowdLink[]> {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/crowd_links?select=*&order=created_at.desc&limit=100`, {
        method: 'GET',
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        },
      });
      if (!res.ok) return [];
      return await res.json();
    } catch {
      return [];
    }
  },

  // Save new crowd link
  async insertCrowdLink(linkData: RemoteCrowdLink): Promise<boolean> {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/crowd_links`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'Prefer': 'return=representation',
        },
        body: JSON.stringify(linkData),
      });
      return res.ok;
    } catch {
      return false;
    }
  },
};
