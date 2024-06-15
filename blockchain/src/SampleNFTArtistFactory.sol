// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "./SampleNFTArtist.sol";
import "./Sample.sol";

contract SampleNFTArtistFactory is Sample {
    mapping(address => bool) public deployedNFTs;

    modifier onlyNotDeployedNFT() {
        require(!deployedNFTs[msg.sender], "NFT already deployed");
        _;
    }

    function createNFT(string memory _name, string memory _symbol) public onlyNotDeployedNFT {
        Sample.setAddressSmToArtist(address(new SampleNFTArtist(_name, _symbol)));
        deployedNFTs[msg.sender] = true;
    }
}
