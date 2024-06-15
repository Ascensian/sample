import React from 'react';

const TitleSection: React.FC = () => {
  return (
    <section
      className="flex justify-center items-center bg-cover bg-center h-96"
      style={{
        backgroundImage: 'url(/images/home.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '500px', // Assurez-vous d'ajuster la hauteur selon vos besoins
      }}
    >
      <div className="flex flex-col">
        <h1 className="text-4xl font-semibold text-white mb-4 ml-10">
          Secure, share and Shine
          <br />
          with Sample
        </h1>
        <p className="text-white text-lg w-1/3 ml-10">
          Welcome to Sample, where music meets security. Dive into a world of
          endless melodies, curated playlists, and personalized recommendations,
          all while ensuring your music is safe and shared with ease.
        </p>
      </div>
    </section>
  );
};

export default TitleSection;
