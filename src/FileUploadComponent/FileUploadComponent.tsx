import React, { useState } from 'react';
import './FileUploadComponent.css'

const FileUploadComponent: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const incomingFilesArray = Array.from(event.target.files);
      setSelectedFiles((prevFiles) => {
        const updatedFiles = [...prevFiles]; 

        incomingFilesArray.forEach((currentFileUpload) => {
            if (updatedFiles.some((existingFile) => existingFile.name !== currentFileUpload.name && existingFile.size !== currentFileUpload.size)) {
                updatedFiles.push(currentFileUpload); 
            }
        });
        return updatedFiles; 
    });
    }
  };

  const handleDeleteFile = (index: number) => {
    setSelectedFiles((prevFiles) => {
      const updatedFiles = [...prevFiles]; // copy of prevFiles
      updatedFiles.splice(index, 1);
      return updatedFiles;
    });
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    const formData = new FormData();
    
    // dictionary with key: value pairs -> 'files': array of all files
    selectedFiles.forEach((file) => {
      formData.append('files', file);
    });

    // Make an API request to upload the files (assuming /api/upload-files is your endpoint)
    const response = await fetch('/api/upload-files', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    console.log(result); // Handle response from the server
  };

  return (
    <div className="upload-container">
        <form onSubmit={handleSubmit}>
            <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="upload-input"
                id="file-input"
            />
            <label htmlFor="file-input" className="upload-label">
                Select Files
            </label>
            <button type="submit" className="upload-button">
                Upload Files
            </button>
        </form>

        {/* Display selected file names */}
        <div className="selected-files">
            {selectedFiles.length > 0 && (
                <div>
                    <h3>Selected Files:</h3>
                    <ul>
                        {selectedFiles.map((file, index) => (
                            <li key={index}>{file.name}
                            <button className='delete-button'
                                    onClick={() => handleDeleteFile(index)}>X</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    </div>
);
};

export default FileUploadComponent;
