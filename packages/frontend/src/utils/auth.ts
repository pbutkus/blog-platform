const API_URL = "http://localhost:3000";

const handleResponse = async (res: Response) => {
  const contentType = res.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    const data = await res.json();
    if (!res.ok) {
      throw data.error || res.statusText;
    }
    return data;
  } else {
    const text = await res.text();
    if (!res.ok) {
      throw new Error(text || res.statusText);
    }
    return text;
  }
};

export const signup = async (
  username: string,
  email: string,
  password: string
) => {
  const response = await fetch(`${API_URL}/user/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
    credentials: "include",
  });

  return handleResponse(response);
};

export const login = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

  return handleResponse(response);
};

export const logout = async () => {
  try {
    const response = await fetch(`${API_URL}/user/logout`, {
      method: "GET",
      credentials: "include",
    });

    const result = await handleResponse(response);
    return result;
  } catch (err) {
    console.error("Logout error:", err);
    throw err;
  }
};

export const checkAuthStatus = async () => {
  const response = await fetch(`${API_URL}/user/check-auth`, {
    method: "GET",
    credentials: "include",
  });
  return handleResponse(response);
};
