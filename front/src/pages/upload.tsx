// src/pages/search.tsx
'use client';
import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const UploadPage: React.FC = () => {
  // Function to handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    console.log(file); // For now, just log the selected file. You can replace this with your upload logic.
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
        {/* Contenu de la page de recherche */}
      </main>
    </div>
  );
};

export default UploadPage;
