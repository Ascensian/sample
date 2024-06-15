// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "openzeppelin-contracts/token/ERC721/ERC721.sol";
import "openzeppelin-contracts/access/Ownable.sol";
import "openzeppelin-contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "./Sample.sol";

contract SampleNFTArtist is ERC721URIStorage, Ownable, Sample {
    uint256 public tokenCounter;

    constructor(string memory _name, string memory _symbol) Ownable(msg.sender) ERC721(_name, _symbol) {
        tokenCounter = 1;
    }

    function mintNFT(string memory tokenURI, uint256 _amount) public onlyOwner returns (uint256) {
        uint256 newTokenId = tokenCounter++;
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        Sample.addressToTokenIdToPrice[msg.sender][newTokenId] = _amount;
        return newTokenId;
    }

    function getCounterArtist() public view returns (uint256) {
        return tokenCounter;
    }
}
