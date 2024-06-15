// src/pages/discover.tsx

import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const DiscoverPage: React.FC = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <main>
        <h1>Discover Page</h1>
        {/* Contenu de la page de découverte */}
      </main>
    </div>
  );
};

export default DiscoverPage;
