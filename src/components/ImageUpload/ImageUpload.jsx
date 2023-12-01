import React, { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import styles from "./ImageUpload.module.css"

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
    <div className={styles.container}>
      {!isSelected ? (
        <div styles={{justifyContent: "center"}}>
            <label className={styles.titleLabel}>Select a Project</label>
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
          <div {...getRootProps()} className={styles.dropzone}>
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

export default ImageUpload;
