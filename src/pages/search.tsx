// src/pages/search.tsx

import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const SearchPage: React.FC = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <main>
        <h1>Search Page</h1>
        {/* Contenu de la page de recherche */}
      </main>
    </div>
  );
};

export default SearchPage;
