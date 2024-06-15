// src/components/ConnectWalletButton.tsx

import React, { useState } from 'react';
import { ethers } from 'ethers';
import { Button, Card } from 'react-bootstrap';

const ConnectWalletButton: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [walletBalance, setWalletBalance] = useState<string>('0');

  const connectWallet = async () => {
    try {
      if (!(window.ethereum && window.ethereum.isMetaMask)) {
        throw new Error('MetaMask not detected');
      }

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const address = accounts[0];

      setWalletAddress(address);
      getBalance(address);
    } catch (error) {
      console.error('Error connecting MetaMask:', error);
    }
  };

  const getBalance = async (address: string) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const balance = await provider.getBalance(address);
      const formattedBalance = ethers.utils.formatEther(balance);
      setWalletBalance(formattedBalance);
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  return (
    <Card className="text-center">
      <Card.Header>
        <strong>Address: </strong>
        {walletAddress || 'Not connected'}
      </Card.Header>
      <Card.Body>
        <Card.Text>
          <strong>Balance: </strong>
          {walletBalance} ETH
        </Card.Text>
        {!walletAddress && (
          <Button onClick={connectWallet} variant="primary">
            Connect Wallet
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default ConnectWalletButton;
