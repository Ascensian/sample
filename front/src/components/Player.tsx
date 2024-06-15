// src/components/Player.tsx

import React from 'react';

const Player: React.FC = () => {
  return (
    <footer>
      <div className="current-track">
        <span>Titre de la piste en cours</span>
        <div className="controls">
          <button>Précédent</button>
          <button>Play</button>
          <button>Suivant</button>
        </div>
      </div>
    </footer>
  );
};

export default Player;
