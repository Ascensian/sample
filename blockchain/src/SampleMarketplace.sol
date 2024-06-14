pragma solidity ^0.8.0;

import "./sampleNFT.sol"; 

contract MusicMarketplace {
    struct Music {
        uint256 id;
        address artist;       
        string uri;
        string rights;
        uint256 price;
    }

    struct Purchase {
        address owner;
        uint256 timestamp;
        bool isUsed;
    }

    MusicNFT public musicNft;
    mapping(uint256 => Music) public musicIdToMusic;
    mapping(uint256 => Purchase[]) public purchaseRecords;
    uint256 public nextMusicId;

    event MusicUploaded(uint256 indexed musicId, address indexed artist, string rights, uint256 price);
    event MusicPurchased(uint256 indexed musicId, address indexed owner, uint256 timestamp);

    constructor(address _musicNftAddress) {
        musicNft = MusicNFT(_musicNftAddress);
        nextMusicId = 1;
    }

    function uploadMusic(string memory uri, string memory rights, uint256 price) external {
        musicIdToMusic[nextMusicId] = Music(nextMusicId, msg.sender, uri, rights, price);
        emit MusicUploaded(nextMusicId, msg.sender, rights, price);
        nextMusicId++;
    }

    function purchaseMusic(uint256 musicId) external payable {
        Music memory music = musicIdToMusic[musicId];
        require(msg.value == music.price, "Incorrect payment amount");
        require(music.artist != address(0), "Music does not exist");

        payable(music.artist).transfer(msg.value);
        purchaseRecords[musicId].push(Purchase(msg.sender, block.timestamp));
        emit MusicPurchased(musicId, msg.sender, block.timestamp);

        // Optionally mint an NFT for the owner
        musicNft.mintNFT(msg.sender, music.uri);
    }
}