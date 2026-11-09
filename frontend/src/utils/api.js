/**
 * API client to communicate with the FastAPI backend.
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

export async function checkServerHealth() {
  try {
    const res = await fetch(`${BASE_URL}/health`);
    if (!res.ok) throw new Error('Health check failed');
    return await res.json();
  } catch (error) {
    console.warn('Backend server unreachable:', error);
    return { status: 'offline' };
  }
}

export async function fetchMetadata() {
  try {
    const res = await fetch(`${BASE_URL}/meta`);
    if (!res.ok) throw new Error('Metadata fetch failed');
    return await res.json();
  } catch (error) {
    console.warn('Could not load metadata from API, using fallback data:', error);
    return null;
  }
}

export async function submitAssessment(payload) {
  const res = await fetch(`${BASE_URL}/predict`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.detail || `Server returned error status ${res.status}`);
  }

  return await res.json();
}

