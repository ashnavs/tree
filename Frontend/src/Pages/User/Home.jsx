import React from 'react'
import FileUpload from '../../Components/FileUpload'
import '../../Styles/FileUpload.css'
import '../../Styles/FileInput.css'
import '../../../src/index.css'
import '../../../src/App.css'




function Home() {
  return (
    <div>
    <h1 className="gradient-text pb-10 m-12 mb-0">
      Documents Uploading
    </h1>
    <p className='p-text'>Please upload the answer sheet</p>
    <FileUpload/>
  </div>
      )

}

export default Home
