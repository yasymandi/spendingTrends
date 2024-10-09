import BASE_URL from "../config";

const token = localStorage.getItem("accessToken")

export const uploadFiles = async (files: File[]): Promise<any> => {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));
  
    try {
      const response = await fetch(`${BASE_URL}/api/upload-files/`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      if (!response.ok) {
        throw new Error('File upload failed');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error uploading files:', error);
      throw error;
    }
  };
  