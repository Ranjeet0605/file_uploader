import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './Dashboard.css';
const DashBoard = () => {
    const [files, setFiles] = useState([]);

    const fetchFiles = async() => {
        const res = await axios.get("http://localhost:5000/api/v1/files");
        setFiles(res.data);
    }
    useEffect(() => {
        fetchFiles();
        const interval = setInterval(fetchFiles, 5000);
        return () => clearInterval(interval);
    },[])
  return (
    <div  className='dashboard-container'>
          <h2>Uploaded files</h2>
          <table className='dashboard-table'>
              <thead>
                  <tr>
                      <th>Filename</th>
                      <th>Status</th>
                      <th>Result</th>
                      <th>Uploaded</th>
                      <th>Scanned</th>
                  </tr>
              </thead>
              <tbody>
                  {files.map((file) => (
                      <tr key={file._id}>
                          <td>{file.filename}</td>
                          <td className={file.status === 'pending' ? 'status-pending' :
                              file.result==='infected' ? 'status-infected':'status-clean'
                          }>{file.status}</td>
                          <td>{file.result || '---'}</td>
                          <td>{new Date(file.uploadedAt).toLocaleString()}</td>
                          <td>{file.scannedAt ? new Date(file.scannedAt).toLocaleString() : 'N/A'} </td>   
                   </tr>
               ))}   
              </tbody>
          </table>
    </div>
  )
}


export default DashBoard
