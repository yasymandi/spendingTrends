import React, { useEffect, useState } from 'react';
import { uploadFiles } from '../services/fileUploadService';
import './FileUploadComponent.css';

const FileUploadComponent: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadStatus, setUploadStatus] = useState<string | null>(() => {
    return localStorage.getItem("uploadStatus") || null;
  });

  useEffect(() => {
    setSelectedFiles([]); 
  }, []); // Empty dependency array means this runs only on mount

  useEffect(() => {
    if (uploadStatus) {
      localStorage.setItem('uploadStatus', uploadStatus);
    } else {
      localStorage.removeItem('uploadStatus');
    }
  }, [uploadStatus]); // this runs every time uploadStatus state changes


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const incomingFilesArray = Array.from(event.target.files);
      setSelectedFiles((prevFiles) => {
        const updatedFiles = [...prevFiles]; 
        incomingFilesArray.forEach((currentFileUpload) => {
            if (!updatedFiles.some((existingFile) => existingFile.name === currentFileUpload.name)) {
              updatedFiles.push(currentFileUpload); 
            }
        });
        return updatedFiles; 
    });
    }
    setUploadStatus(null);
  };

  const handleDeleteFile = (index: number) => {
    setSelectedFiles((prevFiles) => {
      const updatedFiles = [...prevFiles]; // copy of prevFiles
      updatedFiles.splice(index, 1);
      return updatedFiles;
    });
  }

  const handleSubmit = async () => {
    try {
      const response = await uploadFiles(selectedFiles);
      setUploadStatus('Files uploaded successfully');
    } catch (error) {
      setUploadStatus('Error uploading files, try again');
    }
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
            {uploadStatus && <p>{uploadStatus}</p>}
        </form>

        <div className="selected-files">
            {selectedFiles.length > 0 && (
                <div>
                    <h3>Selected Files:</h3>
                    <ul>
                        {selectedFiles.map((file, index) => (
                            <li key={index}>{file.name}
                            <button className='delete-button'
                                    onClick={() => handleDeleteFile(index)}
                                    data-testid={`delete-button-${index}`}>X</button>
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
