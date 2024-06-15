// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "openzeppelin-contracts/token/ERC721/ERC721.sol";
import "openzeppelin-contracts/access/Ownable.sol";
import "openzeppelin-contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "./Sample.sol";

contract SampleNFTBuyer is ERC721URIStorage, Ownable, Sample {
    uint256 public tokenCounter;

    constructor(string memory _name, string memory _symbol) Ownable(msg.sender) ERC721(_name, _symbol) {
        tokenCounter = 1;
    }

	modifier onlyCanPay(address _scNFT, uint _idNFT) {
		require(msg.value >= Sample.addressToTokenIdToPrice[_scNFT][_idNFT], "Not enough money");
		_;
	}

    function mintNFT(address _scNFT, uint _idNFT, string memory tokenURI) public payable onlyOwner onlyCanPay(_scNFT, _idNFT) returns (uint256) {
        uint256 newTokenId = tokenCounter++;
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
		payable(Sample.ownerToNFT[_scNFT]).transfer(Sample.addressToTokenIdToPrice[_scNFT][_idNFT]);
        return newTokenId;
    }
}
