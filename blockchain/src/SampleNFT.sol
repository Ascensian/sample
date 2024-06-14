// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Importing ERC721 token standard and Ownable contract from OpenZeppelin
import "openzeppelin-contracts/token/ERC721/ERC721.sol";
import "openzeppelin-contracts/access/Ownable.sol";
import "openzeppelin-contracts/token/ERC721/extensions/ERC721URIStorage.sol";

// MusicNFT contract inheriting from ERC721 and Ownable
contract SampleNFT is ERC721, Ownable {
    uint256 public tokenCounter; // Counter to keep track of token IDs

    // Constructor to initialize the NFT with a name and symbol
    constructor() ERC721("SampleNFT", "MNFT") {
        tokenCounter = 1; // Initializing token counter
    }

    // Function to mint a new NFT
    // Only the owner of the contract can mint new tokens
    function mintNFT(address _addressArtist, string memory tokenURI) public onlyOwner returns (uint256) {
        uint256 newTokenId = tokenCounter; // Assigning the current counter as the new token ID
        _safeMint(_addressArtist, newTokenId); // Minting the token to the recipient
        _setTokenURI(newTokenId, tokenURI); // Setting the token URI

        tokenCounter += 1; // Incrementing the token counter
        return newTokenId; // Returning the new token ID
    }
}
