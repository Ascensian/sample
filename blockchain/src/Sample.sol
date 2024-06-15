// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

contract Sample {
    event ArtistRegistered(address indexed artist, string mainName, uint32 registeredAt);

    struct SampleMusic {
        address idSample;
        Artist artist;
        string uri;
        Totalsupplies totalsupplies;
        uint256 price;
    }

    struct DescriptionPreimage {
        bool has_preimage;
        bytes32 preimage;
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
        Director
    }

    struct ArtistData {
        address owner;
        uint32 registered_at;
        string main_name;
        ArtistType main_type;
        ArtistType[] extra_types;
        bytes[] genres;
        DescriptionPreimage description;
        bytes32[] assets;
    }

    struct Artist {
        bool is_artist;
        ArtistData data;
    }

    struct Totalsupplies {
        uint256 totalSupply;
        uint256 totalSold;
    }

    mapping(address => Artist) public addressToArtist;
    mapping(address => SampleMusic[]) public addressToSampleMusicTab;
    mapping(address => address) public ownerToNFT;
	mapping(address => mapping(uint256 => uint)) public addressToTokenIdToPrice;

    modifier onlyNotRegister() {
        require(addressToArtist[msg.sender].data.registered_at != 0, "You are already register");
        _;
    }

    modifier onlyNotSmRegister() {
        require(ownerToNFT[msg.sender] != address(0), "You are already registed a smart contract");
        _;
    }

    function registerArtists(
        bool _isArtist,
        string memory _mainName,
        ArtistType _mainType,
        ArtistType[] memory _extraTypes,
        bytes[] memory _genres,
        DescriptionPreimage memory _description,
        bytes32[] memory _assets
    ) external onlyNotRegister {
        setAddressToArtist(
            Artist({
                is_artist: _isArtist,
                data: ArtistData({
                    owner: msg.sender,
                    registered_at: uint32(block.timestamp),
                    main_name: _mainName,
                    main_type: _mainType,
                    extra_types: _extraTypes,
                    genres: _genres,
                    description: _description,
                    assets: _assets
                })
            })
        );
        emit ArtistRegistered(msg.sender, _mainName, addressToArtist[msg.sender].data.registered_at);
    }

	function setPriceToArtist(address _artist, uint256 _tokenId, uint _price) public {
		addressToTokenIdToPrice[_artist][_tokenId] = _price;
	}

    function setAddressToArtist(Artist memory _artist) public {
        addressToArtist[msg.sender] = _artist;
    }

    function setAddressSmToArtist(address _smSample) public onlyNotSmRegister {
        ownerToNFT[msg.sender] = _smSample;
    }

    function getArtitst(address _artist) external view returns (Artist memory) {
        return addressToArtist[_artist];
    }
}
