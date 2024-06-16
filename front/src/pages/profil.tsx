import React, { useCallback, useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Button, Label, Select, TextInput } from 'flowbite-react';
import { ethers } from 'ethers';

import contractData from './abi-artist.json';
const ABI = contractData.abi;

interface Ethereum {
  isMetaMask: boolean;
  request: (request: { method: string; params?: string[] }) => Promise<any>;
}

declare global {
  interface Window {
    ethereum?: Ethereum;
  }
}

enum ArtistType {
  Singer,
  Instrumentalist,
  Composer,
  Lyricist,
  Producer,
  DiscJokey,
  Conductor,
  Arranger,
  Engineer,
  Director,
}

interface Artist {
  isArtist: boolean;
  artistAddress: string;
  mainName: string; // Ajusté pour correspondre à l'ABI
  mainType: ArtistType;
  extraTypes: ArtistType[];
  genres: string[];
  assets: string[];
}

export default function RegisterArtist(
  is_artist: boolean,
  main_name: string,
  main_type: ArtistType,
  extra_types: ArtistType[],
  genres: string[],
  assets: string[],
) {
  const [state, setState] = React.useState<{ isArtist: boolean } | null>(null);
  const [address, setAddress] = useState('');

  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [isArtist, setIsArtist] = useState<boolean>(false);
  const [artistAddress, setArtistAddress] = useState<string | null>(null);
  const [mainName, setMainName] = useState<string | null>(null);
  const [mainType, setMainType] = useState<ArtistType | null>(null);
  const [extraTypes, setExtraTypes] = useState<ArtistType[]>([]);
  const [artistGenres, setArtistGenres] = useState<string[]>([]);
  const [artistAssets, setArtistAssets] = useState<string[]>([]);
  const [submittedArtistData, setSubmittedArtistData] = useState<Artist | null>(
    null,
  );
  const [artistRegistered, setArtistRegistered] = useState<boolean>(false);
  const [artistInfo, setArtistInfo] = useState(null);

  useEffect(() => {
    const getSignerAndAddress = async () => {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        try {
          await provider.send('eth_requestAccounts', []); // Demande à MetaMask l'autorisation de se connecter
          const signer = provider.getSigner();
          const address = await (await signer).getAddress(); // Obtient l'adresse du compte actif
          console.log(address); // Affiche l'adresse dans la console pour vérification
          // Mettez à jour l'état ou effectuez d'autres actions avec l'adresse obtenue
          setAddress(address);
        } catch (error) {
          console.error(error);
        }
      }
    };

    getSignerAndAddress();
  }, []);

  const contractAddress = '0xDfE175b1C9fcE91978B4c018442f96e94B2dBF66';

  useEffect(() => {
    const fetchArtistData = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const contract = new ethers.Contract(contractAddress, ABI, provider);
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const artistData = await contract.getArtitst(address);
          if (artistData.is_artist) {
            setArtistInfo(artistData.data);
            console.log('Artiste enregistré:', artistData.data);
            console.log("Adresse de l'artiste:", artistData.data[0]); // Si l'adresse est stockée à l'indice 0
            console.log('Nom principal de lartiste:', artistData.data[2]);
          } else {
            console.log("L'artiste n'est pas enregistré.");
          }
        } catch (error) {
          console.error(
            "Erreur lors de la récupération des données de l'artiste:",
            error,
          );
        }
      } else {
        console.log(
          'Veuillez installer MetaMask pour utiliser cette fonctionnalité.',
        );
      }
    };
    fetchArtistData();
  }, [address, contractAddress, ABI]);

  return (
    <>
      <Sidebar />
      <main className="flex flex-col min-h-screen w-full">
        <section className="flex flex-col justify-center items-left w-1/4">
          <h1 className="mt-2 text-2xl font-semibold text-white mb-4 ml-12">
            Your Profile
          </h1>

          <div className="flex flex-col gap-2 px-12">
            <div className="block mt-4">
              <Label
                className="font-bold text-white"
                htmlFor="artistAddress"
                value="My address"
              />
              <div className="font-bold text-white" />
              {address ? (
                <div className="text-white">{address}</div>
              ) : (
                <div className="text-white">No address found</div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2 px-12">
            <div className="block mt-4">
              <Label
                className="font-bold text-white"
                htmlFor="artistAddress"
                value="Main Name"
              />
              <div className="font-bold text-white" />
              {artistInfo ? (
                <div className="text-white">{artistInfo[2]}</div>
              ) : (
                <div className="text-white">No Name found</div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2 px-12">
            <div className="block mt-4">
              <Label
                className="font-bold text-white"
                htmlFor="artistAddress"
                value="Main Type"
              />
              <div className="font-bold text-white" />
              {artistInfo ? (
                <div className="text-white">{artistInfo[4]}</div>
              ) : (
                <div className="text-white">No Name found</div>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
