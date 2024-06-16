import React from 'react';
import Head from 'next/head';
import { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Image from 'next/image';

import Footer from '../components/Footer';

const poppins = Poppins({ weight: '400', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SAMPLE',
  description: 'SAMPLE',
  keywords: 'web, web3, music, blockchain, allfeat',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Head>
        <title>SAMPLE</title>
        {/* Any other head elements you need */}
      </Head>
      <div className={poppins.className}>
        <Header />

        <Sidebar />
        <main className="flex flex-col justify-between">
          {children}
          {/* Ensure Footer is rendered within the body */}

          <Footer />
        </main>
      </div>
    </>
  );
}
