import React from 'react';
import Layout from '../layouts/Layout';
import TitleSection from '../components/TitleSection';
import DiscoverSection from '../components/DiscoverSection';

const HomePage: React.FC = () => {
  return (
    <Layout>
      <TitleSection />
      <DiscoverSection />
    </Layout>
  );
};

export default HomePage;
