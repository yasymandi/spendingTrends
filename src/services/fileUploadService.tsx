export const uploadFiles = async (files: File[]): Promise<any> => {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));
  
    try {
      const response = await fetch('http://127.0.0.1:8000/api/upload-files/', {
        method: 'POST',
        body: formData,
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
  