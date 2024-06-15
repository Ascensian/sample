import React, { useState } from 'react';

const ConnectWalletButton: React.FC = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const connectWallet = async () => {
    try {
      if (!(window.ethereum && window.ethereum.isMetaMask)) {
        throw new Error('MetaMask not detected');
      }

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (accounts.length === 0) {
        throw new Error('No accounts found');
      }

      const address = accounts[0];
      setWalletAddress(address);
    } catch (error) {
      console.error('Error connecting MetaMask:', error);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div>
      {walletAddress ? (
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <div
            style={{
              backgroundColor: 'white',
              color: '#6F00FF',
              padding: '10px 20px',
              borderRadius: '10px',
              border: 'none',
              fontSize: '16px',
              cursor: 'pointer',
            }}
            onClick={toggleDropdown}
            onKeyDown={(e) => {
              if (e.key === 'Enter') toggleDropdown();
            }}
            tabIndex={0} // Make the div focusable
            role="button" // Indicate the div acts as a button
            aria-pressed={showDropdown}
          >
            {walletAddress}
          </div>
          {showDropdown && (
            <div
              style={{
                position: 'absolute',
                fontWeight: 'bold',
                marginTop: '10px',
                top: '100%',
                right: 0,
                backgroundColor: 'white',
                color: '#6F00FF',
                padding: '10px',
                borderRadius: '10px',
                border: 'none',
                cursor: 'pointer',
                zIndex: 1000,
              }}
              onClick={disconnectWallet}
            >
              Logout
            </div>
          )}
        </div>
      ) : (
        <button
          style={{
            backgroundColor: 'white',
            color: '#6F00FF',
            padding: '10px 20px',
            borderRadius: '10px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
          }}
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default ConnectWalletButton;
