// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./sampleNFT.sol"; 

contract SampleMarketplace {
    struct SampleMusic {
        uint256 id;
        address artist;       
        string uri;
        string rights;
        uint256 price;
    }

    struct Purchase {
        address owner;
        uint256 timestamp;
		string uriContent;
        bool isUsed;
    }

    SampleNFT public SampleNFT;
    mapping(uint256 => SampleMusic) public sampleIdToSample;
    mapping(uint256 => Purchase[]) public purchaseRecords;
    uint256 public nextSampleId;

    event SampleUploaded(uint256 indexed sampleId, address indexed artist, string rights, uint256 price);
    event SamplePurchased(uint256 indexed sampleId, address indexed owner, uint256 timestamp);

    constructor(address _sampleNftAddress) {
        sampleNFT = SampleNFT(_sampleNftAddress);
        nextSampleId = 1;
    }

    function uploadSample(string memory _uri, string memory _rights, uint256 _price) external {
        sampleIdToSample[nextSampleId] = SampleMusic(nextSampleId, msg.sender, _uri, _rights, _price);
        emit SampleUploaded(nextSampleId, msg.sender, _rights, _price);
        nextSampleId++;
    }

    function purchaseSample(uint256 _sampleId) external payable {
        Sample memory sample = musicIdToMusic[_sampleId];
        require(msg.value == sample.price, "Incorrect payment amount");
        require(sample.artist != address(0), "Sample does not exist");

        payable(sample.artist).transfer(msg.value);
        purchaseRecords[_sampleId].push(Purchase(msg.sender, block.timestamp));
        emit MusicPurchased(_sampleId, msg.sender, block.timestamp);

        // Optionally mint an NFT for the owner
        SampleNFT.mintNFT(msg.sender, sample.uri);
    }
}