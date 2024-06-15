// src/components/ConnectWalletButton.tsx

import React, { useState } from 'react';
import { ethers } from 'ethers';
import { Button } from 'react-bootstrap';
import ProfileButton from './ProfileButton';

const ConnectWalletButton: React.FC = () => {
  const [walletConnected, setWalletConnected] = useState(false);

  const connectWallet = async () => {
    try {
      if (!(window.ethereum && window.ethereum.isMetaMask)) {
        throw new Error('MetaMask not detected');
      }

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const address = accounts[0];

      setWalletConnected(true);
    } catch (error) {
      console.error('Error connecting MetaMask:', error);
    }
  };

  return (
    <div>
      {!walletConnected ? (
        <Button onClick={connectWallet} variant="primary">
          Connect Wallet
        </Button>
      ) : (
        <ProfileButton />
      )}
    </div>
  );
};

export default ConnectWalletButton;
