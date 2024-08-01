import React, { useRef, useState, useEffect } from 'react';
import '../Styles/FileInput.css';
import { FiUpload } from 'react-icons/fi';
import { toast } from 'sonner';

function FileUploadInput({ index, files, setFiles, onFileChange }) {
  const fileInputRef = useRef(null);
  const [fileNames, setFileNames] = useState('');
  

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const newFiles = Array.from(event.target.files);

    if (newFiles.length > 4) {
      toast.error('You can only upload up to 4 images per field.');
      return;
    }
    setFileNames(newFiles.map(file => file.name).join(', '));
    onFileChange(index, newFiles);
  };


  useEffect(() => {
    const updatedFileNames = files.map(file => file.name).join(', ');
    setFileNames(updatedFileNames);
  }, [files]);

  return (
    <div className='file-upload-input' onClick={handleUploadClick}>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        multiple
      />
      <input
        type="text"
        placeholder='Upload'
        value={fileNames}
        className='file-upload-input-box'
        readOnly
      />
      <button
        className='file-upload-button'
        onClick={handleUploadClick}
        type="button"
      >
        <FiUpload className='icon' />
      </button>
    </div>
  );
}

export default FileUploadInput;