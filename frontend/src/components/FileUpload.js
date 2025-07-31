import React,{useState} from 'react'
import axios from "axios"
const FileUpload = () => {
    const [file, setFile] = useState();
    const [message, setMessage] = useState('');

    const submitHandler = async() => {
        const formData = new FormData();
        formData.append('file', file);
        setMessage('Uploading...');
        await axios.post("http://localhost:5000/api/v1/upload", formData);
        setMessage("Scan in Progress...")

    }
  return (
    <div>
          <input type='file' onChange={(e)=>setFile(e.target.files[0])} />
          <button onClick={submitHandler}>Upload</button>
          <p>{message}</p>
    </div>
  )
}

export default FileUpload
