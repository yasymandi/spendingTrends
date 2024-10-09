import BASE_URL from "../config";

const token = localStorage.getItem("accessToken")

export const getUploadedFiles = async (): Promise<any> => {
    try {
        const response = await fetch(`${BASE_URL}/api/get-uploaded-files/`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error('File upload failed');
        }
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Error fetching uploaded files:', error);
        throw error;
    }
};

export const deleteUploadedFile = async (file: string): Promise<any> => {
    try {
        const response = await fetch(`${BASE_URL}/api/delete-uploaded-file/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({ file }),  // Send the fileId in the request body
        });
        if (!response.ok) {
            throw new Error('File deletion failed');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error deleting uploaded file:', error);
    }
};

export const processUploadedFiles = async (): Promise<any> => {
    try {
        const response = await fetch(`${BASE_URL}/api/process-user-files/`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        return await response.json();
    }
    catch (error) {
        console.error("Error parsing through uploaded files");
    }
};