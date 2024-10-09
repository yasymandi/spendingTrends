import React, { useState, useEffect } from 'react';
import { getUploadedFiles, deleteUploadedFile, processUploadedFiles } from '../services/displayDataServices';
import './DisplayDataComponent.css'
import FileUploadComponent from '../FileUploadComponent/FileUploadComponent';

const DisplayDataComponent: React.FC = () => {
    const [leftWidth, setLeftWidth] = useState(50); // Percentage width 
    const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
    const [generatingDataStatus, setGeneratingDataStatus] = useState("");
    useEffect(() => {
        console.log("useEffect running")
        getUploadedFiles().then(files => {
            setUploadedFiles(files);
            console.log('Direct call to getUploadedFiles:', files);
        }).catch(error => {
            console.error('Error from direct call to getUploadedFiles:', error);
        });
        return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    const handleMouseMove = (e: MouseEvent) => {
        // Calculate the new width as a percentage of the container
        const newLeftWidth = (e.clientX / window.innerWidth) * 100;
        setLeftWidth(newLeftWidth);
    };
    const handleMouseDown = () => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    };
    const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    };
    const handleDeleteUploadedFile = (file: any) => {
        try {
            deleteUploadedFile(file);
        }
        catch(error) {
            console.error('Error from direct call to getUploadedFiles:', error);
        };
        getUploadedFiles().then(files => {
            setUploadedFiles(files);
        }).catch(error => {
            console.error('Error getting uploaded files after file delete', error);
        });
    };

    const handleGenerateGraphs = async () => {
        setGeneratingDataStatus("Processing...");
        try {
            const response = await processUploadedFiles();
            setGeneratingDataStatus("");
        }
        catch (error) {
            setGeneratingDataStatus("Failed to generate graph data, try again.");
        }
    }

    return (
        <div className="generated-data">
          <div className='user-files' style={{ width: `${leftWidth}%` }}>
            <h3>Uploaded Files</h3>
            <ul>
                {uploadedFiles.map((file, index) => (
                    <li key={index}>{file.name.replace(/uploads\//g, '')}
                    <button className='uploads-delete-button'
                            onClick={() => handleDeleteUploadedFile(file)}>Remove</button>
                    </li>
                ))}
            </ul>
            <FileUploadComponent/>
          </div>
          <div className="resizer" onMouseDown={handleMouseDown}></div>
          <div className='graphs' style={{ width: `${100 - leftWidth}%` }}>
          <h3>Graphs</h3>
            <button onClick={handleGenerateGraphs}>Generate Graphs</button>
            <p>{generatingDataStatus}</p>
          </div>
        </div>
    )

}

export default DisplayDataComponent;