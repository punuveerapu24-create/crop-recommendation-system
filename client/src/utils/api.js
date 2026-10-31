/**
 * API service for communicating with Crop Recommendation System backend
 */

export async function fetchRecommendations(inputs) {
  const response = await fetch('/api/recommend', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(inputs)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Failed to fetch recommendations (${response.status})`);
  }

  return response.json();
}

export async function fetchComparison(cropId1, cropId2, inputs = null) {
  const response = await fetch('/api/compare', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ cropId1, cropId2, inputs })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Failed to fetch comparison (${response.status})`);
  }

  return response.json();
}

export async function fetchPresets() {
  const response = await fetch('/api/presets');
  if (!response.ok) {
    throw new Error('Failed to load presets');
  }
  return response.json();
}

export async function fetchCropsList() {
  const response = await fetch('/api/crops');
  if (!response.ok) {
    throw new Error('Failed to load crops');
  }
  return response.json();
}

export async function checkServerHealth() {
  const response = await fetch('/api/health');
  if (!response.ok) {
    throw new Error('Server health check failed');
  }
  return response.json();
}
