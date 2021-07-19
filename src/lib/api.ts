export const apiFetch = async <T>(url: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(url, init);
  if (!response.ok) {
    throw new Error(response.statusText);
  } else {
    return response.json() as Promise<T>;
  }
}
