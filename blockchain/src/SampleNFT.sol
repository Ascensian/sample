    // SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "openzeppelin-contracts/token/ERC721/ERC721.sol";
import "openzeppelin-contracts/access/Ownable.sol";
import "openzeppelin-contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract SampleNFT is ERC721, Ownable {
    uint256 public tokenCounter;

    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {
        tokenCounter = 1;
    }

    function mintNFT(string memory tokenURI) public onlyOwner returns (uint256) {
        uint256 newTokenId = tokenCounter++;
        _safeMint(msg.sender, newTokenId);
        return newTokenId;
    }

    function putUri(uint256 tokenId, string memory tokenURI) public onlyOwner {
        _setTokenURI(tokenId, tokenURI);
    }
}
