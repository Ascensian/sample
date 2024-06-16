// src/components/Footer.tsx

import React from 'react';
import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer>
      <Image
        src="/images/player.png"
        alt=""
        width="1800"
        height="100"
        className="mt-10 bottom-0"
      />
      <p>&copy; 2024 Mon Projet. Tous droits réservés.</p>
    </footer>
  );
};

export default Footer;
