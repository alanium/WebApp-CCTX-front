import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAcCBS9ovlwg_Lg_yGKPILSsc_ETBb3_eE",
  authDomain: "fb-storage-49d33.firebaseapp.com",
  projectId: "fb-storage-49d33",
  storageBucket: "fb-storage-49d33.appspot.com",
  messagingSenderId: "327363193304",
  appId: "1:327363193304:web:88b1cf55edee2322b6eaad",
  measurementId: "G-2J1T6GN9R0",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const ImageUpload = (props) => {
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState(null);
  const [projects, setProjects] = useState([])
  const [projectId, setProjectId] = useState("")
  const [isSelected, setIsSelected] = useState(false)

  useEffect(() => {
    props.obtenerJSON("/upload_photo").then(
        (result) => setProjects(result)
    )
  }, [])

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: true,
  });

  const uploadImages = async () => {
    try {
      setUploading(true);
      setUploadError(null);

      const uploadPromises = files.map((file) => {
        const storageRef = ref(storage, `images/${file.name}`);
        return uploadBytes(storageRef, file);
      });

      await Promise.all(uploadPromises);

      setUploading(false);
      setFiles([]);
    } catch (error) {
      setUploadError(error.message);
      setUploading(false);
    }
  };

  const handleChange = (event) => {
    
    if (event.target.value == null) {
        setIsSelected(false)
    } else if (event.target.value !== null) {
        setProjectId(event.target.value)
        setIsSelected(true)
    }
  }

  return (
    <div className="global-container">
      {!isSelected ? (
        <div>
            <label style={{ color: "white", fontSize: "24px", marginBottom: "15px", textAlign: "center", }}>Select a Project</label>
            <select
                className="global-input-1"
                onChange={handleChange}
            >
                <option value={null}>Select a Project</option>
                {projects.map((project) => (
                    <option key={project.id} value={project.id} >{project.name} </option>
                ))}
            </select>
        </div>
      ) : (
        <div>
          <div {...getRootProps()} style={dropzoneStyle}>
            <input {...getInputProps()} />
            <p style={{ color: "white",}} >Drag & drop images here, or click to select files</p>
          </div>
          {files.length > 0 && (
            <div>
              <h4>Selected Images:</h4>
              <ul>
                {files.map((file) => (
                  <li key={file.name}>{file.name}</li>
                ))}
              </ul>
              <button onClick={uploadImages} disabled={uploading}>
                {uploading ? "Uploading..." : "Upload Images"}
              </button>
              {uploading && (
                <progress value={uploadProgress} max="100">
                  {uploadProgress}%
                </progress>
              )}
              {uploadError && <p style={{ color: "red" }}>{uploadError}</p>}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const dropzoneStyle = {
  border: "2px dashed #cccccc",
  borderRadius: "4px",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
};

export default ImageUpload;
