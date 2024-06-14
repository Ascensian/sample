// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

library LArtists {
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
}
