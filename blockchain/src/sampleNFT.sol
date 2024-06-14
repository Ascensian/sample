// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Importing ERC721 token standard and Ownable contract from OpenZeppelin
import "openzeppelin-contracts/token/ERC721/ERC721.sol";
import "openzeppelin-contracts/access/Ownable.sol";

// MusicNFT contract inheriting from ERC721 and Ownable
contract MusicNFT is ERC721, Ownable {
    uint256 public tokenCounter; // Counter to keep track of token IDs

    mapping(uint256 => string) private _tokenURIs; // Mapping from token ID to its URI

    // Constructor to initialize the NFT with a name and symbol
    constructor() ERC721("MusicNFT", "MNFT") {
        tokenCounter = 0; // Initializing token counter
    }

    // Function to mint a new NFT
    // Only the owner of the contract can mint new tokens
    function mintNFT(address recipient, string memory tokenURI) public onlyOwner returns (uint256) {
        uint256 newTokenId = tokenCounter; // Assigning the current counter as the new token ID
        _safeMint(recipient, newTokenId); // Minting the token to the recipient
        _setTokenURI(newTokenId, tokenURI); // Setting the token URI

        tokenCounter += 1; // Incrementing the token counter
        return newTokenId; // Returning the new token ID
    }

    // Internal function to set the token URI
    // This function is marked as virtual so it can be overridden
    function _setTokenURI(uint256 tokenId, string memory _tokenURI) internal virtual {
        require(_exists(tokenId), "ERC721Metadata: URI set of nonexistent token"); // Ensuring the token exists
        _tokenURIs[tokenId] = _tokenURI; // Setting the token URI
    }

    // Function to get the token URI
    // Overrides the ERC721 implementation
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token"); // Ensuring the token exists

        return _tokenURIs[tokenId]; // Returning the token URI
    }
}