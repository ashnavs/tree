import React, { useState } from 'react';
import FileUploadInput from './FileUploadInput';
import '../Styles/FileUpload.css';
import '../Styles/FileInput.css';
import { toast } from 'sonner';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUser } from '../Features/User/authSlice';

function FileUpload() {
  const [files, setFiles] = useState(Array(6).fill([]));
  const user = useSelector(selectUser);
  const userId = user._id;

  const handleFileChange = (index, newFiles) => {
    if (newFiles.length > 4) {
      toast.error('You can only upload up to 4 images per field.');
      return;
    }

    const updatedFiles = [...files];
    updatedFiles[index] = newFiles;
    setFiles(updatedFiles);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
    

      files.forEach((fileArray, index) => {
        if (fileArray.length > 4) {
          toast.error('You can only upload up to 4 images per field.');
          return;
        }
        fileArray.forEach(file => {
          formData.append(`fileField${index}`, file);
        });
     
      });

      formData.append('userId', userId);
   
      console.log('FormData content:', [...formData.entries()]);
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      await axios.post('http://localhost:5000/api/imageupload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

     

      toast.success('Files uploaded successfully!');
      setFiles(Array(6).fill([]));
    } catch (error) {
      console.error(error);
      toast.error('Failed to upload files.');
    }
  };

  return (
    <>
      <div className='file-upload-container'>
        <div className='file-upload-section'>
          {files.map((fileArray, index) => (
            <FileUploadInput
              key={index}
              index={index}
              files={fileArray}
              setFiles={setFiles}
              onFileChange={handleFileChange}
            />
          ))}
        </div>
      </div>
      <button className='submit-button' onClick={handleSubmit}>SUBMIT</button>
    </>
  );
}

export default FileUpload;
