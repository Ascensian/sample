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
  mainName: string;
  mainType: ArtistType;
  extraTypes: ArtistType[];
  genres: string[];
  assets: string[];
}

export default function RegisterArtist() {
  const [state, setState] = React.useState<{ isArtist: boolean } | null>(null);

  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [isArtist, setIsArtist] = useState<boolean>(false);
  const [artistAddress, setArtistAddress] = useState<string | null>(null);
  const [mainName, setMainName] = useState<string | null>(null);
  const [mainType, setMainType] = useState<ArtistType | null>(null);
  const [extraTypes, setExtraTypes] = useState<ArtistType[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [assets, setAssets] = useState<string[]>([]);
  const [submittedArtistData, setSubmittedArtistData] = useState<Artist | null>(
    null,
  );
  const [artistRegistered, setArtistRegistered] = useState<boolean>(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsArtist(event.target.checked);
  };

  const getAddress = () => {
    const data = localStorage.getItem('address');
    console.log(data);

    if (data) {
      const parsedData = JSON.parse(data);
      const artistAddress = parsedData.address;
      console.log(artistAddress);
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

  const contractAddress = '0xDfE175b1C9fcE91978B4c018442f96e94B2dBF66';

  const registerArtist = useCallback(async () => {
    console.log('Register button clicked');
    if (
      isArtist &&
      contractAddress &&
      signer &&
      artistAddress &&
      mainName &&
      mainType !== null && // Ensure mainType is not null
      extraTypes.length > 0 && // Ensure extraTypes is not empty
      assets.length > 0 // Ensure assets is not empty
    ) {
      const contract = new ethers.Contract(contractAddress, ABI, signer);
      console.log(contractAddress);

      // Correctly encode the data for blockchain
      const genresAsBytes = genres.map(ethers.encodeBytes32String);
      console.log(genresAsBytes);
      const assetsAsBytes32 = assets.map(ethers.encodeBytes32String);
      console.log(assetsAsBytes32);

      // Correct the function call to match the ABI
      try {
        const tx = await contract.registerArtists(
          isArtist,
          mainName,
          mainType,
          extraTypes.map((type) => ArtistType[type]), // Convert enum to uint8
          genresAsBytes,
          assetsAsBytes32,
        );
        await tx.wait();
        setState({ isArtist: true });

        setSubmittedArtistData({
          isArtist,
          artistAddress,
          mainName,
          mainType,
          extraTypes,
          genres,
          assets,
        });

        setArtistRegistered(true);
      } catch (error) {
        console.error('Error registering artist:', error);
      }
    }
  }, [
    isArtist,
    contractAddress,
    signer,
    artistAddress,
    mainName,
    mainType,
    extraTypes,
    genres,
    assets,
  ]);

  useEffect(() => {
    registerArtist();
  }, [registerArtist]);

  // Listen for the ArtistRegistered event
  useEffect(() => {
    if (signer && artistRegistered) {
      const contract = new ethers.Contract(contractAddress, ABI, signer);
      contract.on('ArtistRegistered', (artist, mainName, registeredAt) => {
        console.log(
          `Artist Registered: ${mainName} at ${new Date(registeredAt * 1000).toLocaleString()}`,
        );
        // Ici, vous pouvez ajouter une logique pour vérifier que l'artiste enregistré correspond à celui attendu
        // Par exemple, comparer `mainName` avec `submittedArtistData.mainName`
        if (submittedArtistData && mainName === submittedArtistData.mainName) {
          console.log(
            "L'enregistrement de l'artiste a été vérifié avec succès sur la blockchain.",
          );
        }
      });
    }
  }, [signer, artistRegistered, submittedArtistData]);

  return (
    <>
      <Sidebar />
      <main className="flex flex-col min-h-screen w-full">
        <section className="flex flex-col justify-center items-left w-1/4">
          <h1 className="mt-2 text-2xl font-semibold text-white mb-4 ml-12">
            Register as Artist
          </h1>

          <div className="flex flex-col gap-2 px-12">
            <div className="block mt-4">
              <Label
                className="font-bold text-white"
                htmlFor="artistAddress"
                value="My address"
              />
              <TextInput
                id="artistAddress"
                placeholder={artistAddress || 'No address found'}
                required
                value="0x8f1951BE5C9A79d7AFdE6F931d28E7C632bC6C9D"
                onChange={(e) => setArtistAddress(e.target.value)}
              />
            </div>
            <div className="block mt-4">
              <label className="font-bold text-white mr-4" htmlFor="isArtist">
                Are you an artist?
                <input
                  id="isArtist"
                  type="checkbox"
                  checked={isArtist}
                  onChange={handleCheckboxChange}
                  className="ml-2 mb-1"
                />
              </label>
            </div>
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
              value={mainType !== null ? mainType : ''}
              required
              onChange={(e) => setMainType(parseInt(e.target.value))}
              style={{ color: 'black' }}
            >
              <option value={ArtistType.Singer}>Singer</option>
              <option value={ArtistType.Instrumentalist}>
                Instrumentalist
              </option>
              <option value={ArtistType.Composer}>Composer</option>
              <option value={ArtistType.Lyricist}>Lyricist</option>
              <option value={ArtistType.Producer}>Producer</option>
              <option value={ArtistType.DiscJokey}>DiscJokey</option>
              <option value={ArtistType.Conductor}>Conductor</option>
              <option value={ArtistType.Arranger}>Arranger</option>
              <option value={ArtistType.Engineer}>Engineer</option>
              <option value={ArtistType.Director}>Director</option>
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
                          newExtraTypes.push(
                            ArtistType[type as keyof typeof ArtistType],
                          );
                        } else {
                          const indexToRemove = newExtraTypes.indexOf(
                            ArtistType[type as keyof typeof ArtistType],
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
                htmlFor="genres"
                value="Genres (comma-separated)"
              />
              <TextInput
                id="genres"
                placeholder="Enter genres, separated by commas"
                required
                value={genres.join(', ')}
                onChange={(e) =>
                  setGenres(
                    e.target.value.split(',').map((genre) => genre.trim()),
                  )
                }
              />
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

          <Button
            className="mt-6 ml-12 w-1/2"
            color="purple"
            onClick={registerArtist}
          >
            Submit
          </Button>
        </section>
        <section>
          {artistRegistered && submittedArtistData && (
            <section>
              <h2>Artist Registration Successful</h2>
              <p>
                <strong>Name:</strong> {submittedArtistData.mainName}
              </p>
              <p>
                <strong>Type:</strong>{' '}
                {ArtistType[submittedArtistData.mainType]}
              </p>
              <p>
                <strong>Extra Types:</strong>{' '}
                {submittedArtistData.extraTypes
                  .map((type) => ArtistType[type])
                  .join(', ')}
              </p>
              <p>
                <strong>Genres:</strong> {submittedArtistData.genres.join(', ')}
              </p>
              <p>
                <strong>Assets:</strong> {submittedArtistData.assets.join(', ')}
              </p>
            </section>
          )}
        </section>
      </main>
    </>
  );
}
