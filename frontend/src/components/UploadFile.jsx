import React from 'react'

const UploadFile = () => {
    async function uploadFile(file) {

        // const token = localStorage.getItem("token");
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OWI1MDM2Y2QwNjUxMTIyOTE4OTJlODEiLCJpYXQiOjE3NzM0OTMxMzcsImV4cCI6MTc3NDA5NzkzN30.LW2fvl_wgk9dkMhNLd9cZmxs2UgMyvuClskYpNfBBiI";
        

        // STEP 1: get presigned URL
        const res = await fetch("http://localhost:5000/upload/upload-url", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            },
            body: JSON.stringify({
                fileName: file.name,
                fileType: file.type
            })
        });

        const { uploadUrl, key } = await res.json();

        // STEP 2: upload file to R2
        await fetch(uploadUrl, {
            method: "PUT",
            body: file,
            headers: {
                "Content-Type": file.type
            }
        });

        // STEP 3: notify backend upload completed
        await fetch("http://localhost:5000/upload/upload-complete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: token
            },
            body: JSON.stringify({
                fileName: file.name,
                key: key,
                size: file.size
            })
        });

        console.log("Upload successful");

    }
    const handleUpload = async (e) => {

        const file = e.target.files[0];

        await uploadFile(file);

    };
  return (
    <div>
          <h2>Upload File</h2>
          <input type="file" onChange={handleUpload} />
    </div>
  )
}

export default UploadFile
