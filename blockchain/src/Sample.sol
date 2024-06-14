// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Sample {
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

    mapping(address => Artist) public artists;

    modifier onlyNotRegister() {
        require(artists[msg.sender].data.registered_at != 0, "You are already register");
        _;
    }

    /*modifier onlyNotEmpty(string memory _mainName, ArtistType _main_type, bytes[] memory _genres) {
        require
    }*/

    function registerArtists(
        bool _isArtist,
        string memory _mainName,
        ArtistType _mainType,
        ArtistType[] memory _extraTypes,
        bytes[] memory _genres,
        DescriptionPreimage memory _description,
        bytes32[] memory _assets
    ) external onlyNotRegister {
        artists[msg.sender] = Artist(
            _isArtist,
            ArtistData(
                msg.sender, uint32(block.timestamp), _mainName, _mainType, _extraTypes, _genres, _description, _assets
            )
        );
    }
 
	function getArtitst(address _artist) external view returns (Artist memory) {
		return artists[_artist];
	}

}
