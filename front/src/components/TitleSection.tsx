import React from 'react';

const TitleSection: React.FC = () => {
  return (
    <section
      style={{
        backgroundImage: 'url(/images/home.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '500px', // Assurez-vous d'ajuster la hauteur selon vos besoins
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
      }}
    >
      <div className="flex flex-col">
        <h1
          style={{
            color: 'white',
            fontSize: '2rem',
            paddingLeft: '2rem',
            fontWeight: 'bold',
          }}
        >
          Secure, share and Shine
          <br />
          with Sample
        </h1>
        <p
          style={{
            color: 'white',
            fontSize: '1rem',
            paddingLeft: '2rem',
            width: '45%',
          }}
        >
          Welcome to Sample, where music meets security. Dive into a world of
          endless melodies, curated playlists, and personalized recommendations,
          all while ensuring your music is safe and shared with ease.
        </p>
      </div>
    </section>
  );
};

export default TitleSection;
