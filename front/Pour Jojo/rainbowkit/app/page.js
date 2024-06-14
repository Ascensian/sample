'use client';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from 'wagmi'

export default function Home() {

  const { address, isConnected } = useAccount();

  return (
    <div>
      {isConnected ? (
        <p>Connected with {address}</p>
      ) : (
        <p>Please connect your Wallet.</p>
      )}
      <ConnectButton />
    </div>
  );
}
