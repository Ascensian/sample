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

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsArtist(event.target.checked);
  };

  useEffect(() => {
    const getSignerAndAddress = async () => {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        try {
          await provider.send('eth_requestAccounts', []); // Demande à MetaMask l'autorisation de se connecter
          const signer = provider.getSigner();
          const artistAddress = await (await signer).getAddress(); // Obtient l'adresse du compte actif
          console.log(artistAddress); // Affiche l'adresse dans la console pour vérification
          // Mettez à jour l'état ou effectuez d'autres actions avec l'adresse obtenue
          setArtistAddress(artistAddress);
        } catch (error) {
          console.error(error);
        }
      }
    };

    getSignerAndAddress();
  }, []);

  /*
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
  */

  useEffect(() => {
    const getSigner = async () => {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        const signer = provider.getSigner();
        setSigner(await signer);
      }
    };

    getSigner();
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
      extraTypes && // Ensure extraTypes is not empty
      artistGenres && // Ensure genres is not empty
      artistAssets // Ensure assets is not empty
    ) {
      const contract = new ethers.Contract(contractAddress, ABI, signer);
      console.log(contractAddress);

      // Correctly encode the data for blockchain
      const genresAsBytes = artistGenres.map((genre) =>
        ethers.encodeBytes32String(genre),
      );
      console.log(genresAsBytes);
      const assetsAsBytes32 = artistAssets.map((asset) =>
        ethers.encodeBytes32String(asset),
      );
      console.log(assetsAsBytes32);

      // Correct the function call to match the ABI
      try {
        console.log({
          isArtist,
          mainName,
          mainType,
          extraTypes: extraTypes.map((type) => type), // Convert enum to uint8
          genresAsBytes,
          assetsAsBytes32,
        });

        const tx = await contract.registerArtists(
          isArtist,
          mainName,
          mainType,
          extraTypes.map((type) => type), // Convert enum to uint8
          genresAsBytes,
          assetsAsBytes32,
        );
        console.log('Transaction sent:', tx);
        await tx.wait();
        console.log('Transaction confirmed:', tx);

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
    } else {
      console.log('data:', {
        isArtist,
        contractAddress,
        signer,
        artistAddress,
        mainName,
        mainType,
        extraTypes,
        genres,
        assets,
      });
    }
  }, [
    isArtist,
    contractAddress,
    signer,
    artistAddress,
    mainName,
    mainType,
    extraTypes,
    artistGenres,
    artistAssets,
  ]);

  // Function to handle checkbox change for extraTypes
  const handleExtraTypeChange = (type: ArtistType, checked: boolean) => {
    if (checked) {
      setExtraTypes([...extraTypes, type]);
    } else {
      const filteredTypes = extraTypes.filter((t) => t !== type);
      setExtraTypes(filteredTypes);
    }
  };

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

  useEffect(() => {
    const fetchArtistData = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const contract = new ethers.Contract(contractAddress, ABI, provider);
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const artistData = await contract.getArtitst(artistAddress);
          if (artistData.is_artist) {
            setArtistInfo(artistData.data);
            console.log('Artiste enregistré:', artistData.data);
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
  }, [artistAddress]);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault(); // Empêche la soumission standard du formulaire
      registerArtist(); // Appelle directement registerArtist
    },
    [registerArtist],
  );

  return (
    <>
      <Sidebar />
      <main className="flex flex-col min-h-screen w-full">
        <section className="flex flex-col justify-center items-left w-1/4">
          <h1 className="mt-2 text-2xl font-semibold text-white mb-4 ml-12">
            Register as Artist
          </h1>
          <form onSubmit={handleSubmit}>
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
                  value={artistAddress || ''}
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
                value={mainType !== null ? mainType.toString() : ''}
                required
                onChange={(e) =>
                  setMainType(parseInt(e.target.value) as ArtistType)
                }
                style={{ color: 'black' }}
              >
                {Object.keys(ArtistType)
                  .filter((key) => !isNaN(Number(ArtistType[key])))
                  .map((key) => (
                    <option key={ArtistType[key]} value={ArtistType[key]}>
                      {key}
                    </option>
                  ))}
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
                        checked={extraTypes.includes(
                          ArtistType[type as keyof typeof ArtistType],
                        )}
                        onChange={(e) =>
                          handleExtraTypeChange(
                            ArtistType[type as keyof typeof ArtistType],
                            e.target.checked,
                          )
                        }
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
                  value={artistGenres.join(', ')}
                  onChange={(e) =>
                    setArtistGenres(
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
                  value={artistAssets.join(', ')}
                  onChange={(e) =>
                    setArtistAssets(
                      e.target.value.split(',').map((asset) => asset.trim()),
                    )
                  }
                />
              </div>
            </div>

            <Button type="submit" className="mt-6 ml-12 w-1/2" color="purple">
              Submit
            </Button>
          </form>
        </section>
      </main>
    </>
  );
}
