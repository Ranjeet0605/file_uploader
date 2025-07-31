import React, { useRef, useState } from 'react'
import "./FileUpload.css";
import axios from "axios"
const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const fileInputRef = useRef();


    const submitHandler = async () => {
        if (!file) {
            setMessage('please select a file first.');
            return;
        }
        const formData = new FormData();
        formData.append('file', file);
        try {
            setMessage('Uploading...');
            await axios.post("http://localhost:5000/api/v1/upload", formData);
            setMessage("Scan in Progress...")
            
            const checkScanStatus = async () => {
                try {
                    const res = await axios.get("http://localhost:5000/api/v1/files");
                    const uploadedFile = res.data.find(f => f.filename === file.name);
                    if (uploadedFile && uploadedFile.status === 'scanned') {
                        setMessage(
                            uploadedFile.result === 'infected' ?
                                '❌ Scan complete: Infected file'
                                : '✅ Scan complete: Clean file'
                        )
                        setFile(null)
             fileInputRef.current.value = null;
                        
                    } else {
                        setTimeout(checkScanStatus, 3000);
                    }
                    
                    
                }
                catch (err) {
                    console.log(err);
                    setMessage('❌ Upload failed.');
                }
            }
            checkScanStatus();
        } catch(err) {
            console.error('Error checking scan status', err);
        }

    }
  return (
      <div className='upload-container'>
           <h1>CyberXplore - secure file Scanner </h1>
          <input type='file' ref={fileInputRef} onChange={(e) => setFile(e.target.files[0])} />
          <br />
          <button onClick={submitHandler}>Upload</button>
          <p>{message}</p>
    </div>
  )
}

export default FileUpload
