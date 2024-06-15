// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

contract SampleNFTFactory {
    mapping(address => bool) public deployedNFTs;
    mapping(address => address) public ownerToNFT;

    modifier onlyNotDeployedNFT() {
        require(!deployedNFTs[msg.sender], "NFT already deployed");
        _;
    }

    function createNFT(string memory _name, string memory _symbol) public onlyNotDeployedNFT {
        ownerToNFT[msg.sender] = address(new SampleNFT(_name, _symbol));
        deployedNFTs[newNFT] = true;
    }
}
