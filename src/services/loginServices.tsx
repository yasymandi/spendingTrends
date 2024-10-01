import BASE_URL from "../config";

export const login = async (username: string, password: string): Promise<any> => {
    const response = await fetch(`${BASE_URL}/api/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Login failed'); // Sends error info to the server
    }
    const data = await response.json();
    localStorage.setItem('accessToken', data.access);
    localStorage.setItem('refreshToken', data.refresh);

    return data; // Return the response data (tokens)
};

export const signUp = async(username: string, password: string): Promise<any> => {
    const response = await fetch(`${BASE_URL}/api/signup/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    }); 
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Account creation failed'); // Sends error info to the server
    }  
};