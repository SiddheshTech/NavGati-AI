const API_URL = 'http://localhost:3001/api';

export const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      // Handle unauthorized
      console.error('Unauthorized access');
      // Could redirect to login here if needed
    }
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Error: ${response.status}`);
  }

  return response.json();
};

export const api = {
  login: async (credentials: any) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Login failed');
    return data;
  },
  
  getDashboard: (roleEndpoint: string) => fetchWithAuth(`/dashboard/${roleEndpoint}`),
  executeAction: (actionName: string, payload?: any) => fetchWithAuth('/dashboard/action', {
    method: 'POST',
    body: JSON.stringify({ actionName, payload })
  }),
};
