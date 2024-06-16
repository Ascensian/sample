// src/pages/search.tsx
'use client';
import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const UploadPage: React.FC = () => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Function to handle file selection
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      console.log(file); // For now, just log the selected file. You can replace this with your upload logic.

      // Create a new FormData instance
      const formData = new FormData();
      // Append the file to the FormData instance with the key 'soundFile'
      formData.append('soundFile', file);

      try {
        // Send a POST request to the API with the FormData
        const response = await fetch(
          'http://localhost:3000/app/v1/upload-sound',
          {
            method: 'POST',
            body: formData,
          },
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        // Handle the response from the API
        const result = await response.json();
        console.log('Sound uploaded successfully:', result);
        setSuccessMessage('Sound uploaded successfully!');
        setErrorMessage(null); // Clear any previous error message
      } catch (error) {
        console.error('There was a problem with the upload:', error);
        setErrorMessage(
          'There was a problem with the upload. Please try again.',
        );
        setSuccessMessage(null); // Clear any previous success message
      }
    }
  };

  return (
    <div>
      <Header />
      <Sidebar />
      <main>
        <h1 className="mt-2 text-2xl font-semibold text-white mb-4 ml-12">
          Upload page
        </h1>
        <div className="ml-12 mb-4">
          <input type="file" onChange={handleFileChange} />
        </div>
        {successMessage && (
          <p className="ml-12 text-green-500">{successMessage}</p>
        )}
        {errorMessage && <p className="ml-12 text-red-500">{errorMessage}</p>}
        {/* Contenu de la page de recherche */}
      </main>
    </div>
  );
};

export default UploadPage;
