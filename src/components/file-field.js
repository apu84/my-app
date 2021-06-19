import { useState } from "react";

export default function FileField(props) {
  const [file, setFile] = useState();
  const [uploadedImage, setUploadedImage] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await uploadFile();
  }

  async function uploadFile() {
    const formData = new FormData();
    console.log(file, file.name);
    formData.append("files", file, file.name);
    const response = await fetch('http://localhost:8000/uploadfiles/', {
      method: 'POST',
      body: formData
    });

    const uploadedFileResponse = await fetch(response.headers.get('link'));
    if(uploadedFileResponse.ok) {
      const blob = await uploadedFileResponse.blob();
      setUploadedImage(URL.createObjectURL(blob));
    }
  }

  const setUploadFile = (event) => {
    setFile(event.target.files[0]);
  }

  return (
  <form onSubmit={handleSubmit}>
    <input type="file" name="file" onChange={setUploadFile}/>
    <button type="submit">Upload</button>
    <img src={uploadedImage}  alt='test' height="150" width="150"/>
  </form>);
}