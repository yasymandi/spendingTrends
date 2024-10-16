import React, { useState, useEffect } from 'react';
import { getUploadedFiles, deleteUploadedFile, processUploadedFiles } from '../services/displayDataServices';
import './DisplayDataComponent.css'
import FileUploadComponent from '../FileUploadComponent/FileUploadComponent';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);
interface ChartData {
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor: string[];
      hoverBackgroundColor: string[];
    }[];
  }

const DisplayDataComponent: React.FC = () => {
    const [leftWidth, setLeftWidth] = useState(50); // Percentage width 
    const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
    const [generatingDataStatus, setGeneratingDataStatus] = useState("");
    const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
    const [chartData, setChartData] = useState<ChartData>({
        labels: [],
        datasets: [{
          data: [],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
        }]
    });
    type CategoryAmounts = { [key: string]: number; }

    useEffect(() => {
        handleGenerateGraphs();
      }, [selectedFiles]);

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
    const handleDeleteUploadedFile = async (file: any) => {
        try {
            await deleteUploadedFile(file);
        }
        catch(error) {
            console.error('Error from direct call to getUploadedFiles:', error);
        };
        getUploadedFiles().then(files => {
            setUploadedFiles(files);
        }).catch(error => {
            console.error('Error getting uploaded files after file delete', error);
        });
        setSelectedFiles(selectedFiles.filter(selectedFile => selectedFile !== file.name));
    };

    const handleSetSelectedFile = (file_name: string) => {
        return () => {
            if (selectedFiles.includes(file_name)) {
                setSelectedFiles(selectedFiles.filter(selectedFile => selectedFile !== file_name));
            }
            else {
                setSelectedFiles([...selectedFiles, file_name])
            }
        }
    }
    const handleGenerateGraphs = async () => {
        setGeneratingDataStatus("Processing...");
        processUploadedFiles(selectedFiles).then((dictionary: CategoryAmounts) => {
            const categories = Object.keys(dictionary);
            const amounts = Object.values(dictionary); 
            const total = amounts.reduce((sum, amount) => sum + amount, 0); 
            const percentageData = amounts.map(amount => ((amount / total) * 100).toFixed(2));
            const labelsWithPercentages = categories.map((category, index) => `${category}: ${percentageData[index]}%`);

            setChartData({
                labels: labelsWithPercentages,
                datasets: [{
                  // Use amounts as data for rendering the pie chart
                  data: amounts, 
                  backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                  hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                  // Include the raw amounts in the tooltip using the 'amounts' array
                }]
              });
            setGeneratingDataStatus("");
        }).catch(error => {
            console.log('Error getting dictionary items for pie chart', error);
            setGeneratingDataStatus("Failed to get transaction informations from files, reload and try again.");
            setChartData({
                labels: [],
                datasets: []
              });
        })
    }

    return (
        <div className="generated-data">
          <div className='user-files' style={{ width: `${leftWidth}%` }}>
            <h3>Uploaded Files</h3>
            <ul>
                {uploadedFiles.map((file, index) => (
                    <li key={index}>
                        <input type="checkbox" checked={selectedFiles.includes(file.name)} onChange={handleSetSelectedFile(file.name)}/>
                        {file.name.replace(/uploads\//g, '')}
                        <button className='uploads-delete-button'
                            onClick={() => handleDeleteUploadedFile(file)}>X
                        </button>
                    </li>
                ))}
            </ul>
            <FileUploadComponent/>
          </div>
          <div className="resizer" onMouseDown={handleMouseDown}></div>
          <div className='graphs' style={{ width: `${100 - leftWidth}%` }}>
            <p>{generatingDataStatus}</p>
            <div className='pie-chart-container'>
                <Pie data={chartData} />
            </div>
          </div>
        </div>
    )
}

export default DisplayDataComponent;