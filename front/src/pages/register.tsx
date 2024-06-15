import React, { useCallback, useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Button, Label, Select, TextInput } from 'flowbite-react';
import { ethers } from 'ethers';

import contractData from './abi-artist.json';
const ABI = contractData.abi;

interface Ethereum {
  isMetaMask: boolean;
  request: (request: { method: string; params?: string[] }) => Promise<string>;
}

declare global {
  interface Window {
    ethereum: Ethereum;
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
  mainName: string;
  mainType: ArtistType;
  extraTypes: ArtistType[];
  genres: string[];
  assets: string[];
}

export default function RegisterArtist() {
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [isArtist, setIsArtist] = useState<boolean>(false);
  const [artistAddress, setArtistAddress] = useState<string | null>(null);
  const [mainName, setMainName] = useState<string | null>(null);
  const [mainType, setMainType] = useState<ArtistType | null>(null);
  const [extraTypes, setExtraTypes] = useState<ArtistType[]>([]);
  const [assets, setAssets] = useState<string[]>([]);

  const [artistRegistered, setArtistRegistered] = useState<boolean>(false);

  const getAddress = () => {
    const data = localStorage.getItem('address');

    if (data) {
      const parsedData = JSON.parse(data);
      const artistAddress = parsedData.address;
      setArtistAddress(artistAddress);
    } else {
      console.log('No address found');
    }
  };

  useEffect(() => {
    const getSigner = async () => {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = provider.getSigner();
        setSigner(await signer);
      }
    };

    getSigner();
    getAddress();
  }, []);

  const contractAddress = '0x063DF104b96DE5828b1f3430668C35A3d97Fc73F';

  const registerArtist = useCallback(async () => {
    if (
      isArtist &&
      contractAddress &&
      signer &&
      artistAddress &&
      mainName &&
      mainType &&
      extraTypes &&
      assets
    ) {
      const contract = new ethers.Contract(contractAddress, ABI, signer);

      const artistAddressAsBytes32 = ethers.encodeBytes32String(artistAddress);
      const mainNameAsBytes32 = ethers.encodeBytes32String(mainName);
      const mainTypeAsBytes32 = ethers.encodeBytes32String(mainType);
      const extraTypesAsBytes32 = ethers.encodeBytes32String(extraTypes);
      const assetsAsBytes32 = ethers.encodeBytes32String(assets);

      // Now you can call your smart contract function with these values
      await contract.registerArtist(
        isArtist,
        contractAddress,
        artistAddressAsBytes32,
        mainNameAsBytes32,
        mainTypeAsBytes32,
        extraTypesAsBytes32,
        assetsAsBytes32,
      );

      setArtistRegistered(true);
    }
  }, [
    isArtist,
    contractAddress,
    signer,
    artistAddress,
    mainName,
    mainType,
    extraTypes,
    assets,
  ]);

  useEffect(() => {
    registerArtist();
  }, [registerArtist]);

  return (
    <>
      <Sidebar />
      <main className="flex flex-col min-h-screen w-full">
        <section className="flex flex-col justify-center items-center mt-32 w-full">
          <h1 className="mt-2 text-2xl font-semibold text-white mb-4">
            Register as Artist
          </h1>

          <div className="flex flex-col gap-2 px-12">
            <div className="block mt-4">
              <Label
                className="font-bold text-white"
                htmlFor="mainName"
                value="Main Name"
              />
              <TextInput
                id="mainName"
                placeholder="Enter your main name"
                required
                value={mainName || ''}
                onChange={(e) => setMainName(e.target.value)}
              />
            </div>
            <div className="block">
              <Label
                className="font-bold text-white"
                htmlFor="mainType"
                value="mainType"
              />
            </div>
            <Select
              id="mainType"
              value={mainType || ''}
              required
              onChange={(e) => setMainType(e.target.value)}
            >
              <option>Singer</option>
              <option>Instrumentalist</option>
              <option>Composer</option>
              <option>Lyricist</option>
              <option>Producer</option>
              <option>DiscJokey</option>
              <option>Conductor</option>
              <option>Arranger</option>
              <option>Engineer</option>
              <option>Director</option>
            </Select>
            <div className="block mt-4">
              <Label
                className="font-bold text-white"
                htmlFor="extraTypes"
                value="Select your other types"
              />
            </div>
            <div id="extraTypes">
              {Object.keys(ArtistType)
                .filter((key) => isNaN(Number(key)))
                .map((type, index) => (
                  <div
                    key={index}
                    className="flex items-center mb-2 text-white"
                  >
                    <input
                      type="checkbox"
                      id={`extraType-${type}`}
                      value={type}
                      className="text-white"
                      onChange={(e) => {
                        const newExtraTypes = [...extraTypes];
                        if (e.target.checked) {
                          newExtraTypes.push(ArtistType[type]);
                        } else {
                          const indexToRemove = newExtraTypes.indexOf(
                            ArtistType[type],
                          );
                          if (indexToRemove > -1) {
                            newExtraTypes.splice(indexToRemove, 1);
                          }
                        }
                        setExtraTypes(newExtraTypes);
                      }}
                    />
                    <label htmlFor={`extraType-${type}`} className="ml-2">
                      {type}
                    </label>
                  </div>
                ))}
            </div>
            <div className="block">
              <Label
                className="font-bold text-white"
                htmlFor="assets"
                value="Assets (comma-separated)"
              />
              <TextInput
                id="assets"
                placeholder="Enter assets, separated by commas"
                required
                value={assets.join(', ')}
                onChange={(e) =>
                  setAssets(
                    e.target.value.split(',').map((asset) => asset.trim()),
                  )
                }
              />
            </div>
          </div>

          <Button className="mt-6" color="warning" onClick={registerArtist}>
            Submit
          </Button>
        </section>
      </main>
    </>
  );
}
