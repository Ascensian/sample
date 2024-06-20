// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

contract Sample {
	event ArtistRegistered(address indexed artist, string mainName, uint32 registeredAt);

	error SampleAlreadyRegister(string);
	error SampleNoEmptyField(string);
	error SampleInvalidIndex(uint256);
	error SampleSameAmount(uint256);

	struct SampleDetails {
		address owner;
		bool isUsed;
	}

	struct SampleMusic {
		uint256 idSample;
		Artist artist;
		string uri;
		// SampleDetails[] sampleDetails;
		Totalsupplies totalSupplies;
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
		//DescriptionPreimage description;
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
	mapping(address => mapping(uint256 => uint256)) public addressToTokenIdToPrice;
	mapping(address => mapping(uint256 => SampleDetails[])) public addressToSampleDetails;
	mapping(address => uint256) public balanceOf;

	modifier onlyNotRegister() {
		_requireNotRegister();
		_;
	}

	function _requireNotRegister() internal view {
		if (addressToArtist[msg.sender].data.registered_at != 0) {
			revert SampleAlreadyRegister(addressToArtist[msg.sender].data.main_name);
		}
	}

	modifier onlyNotEmptyName(string memory _mainName) {
		_requireNoEmptyName(_mainName);
		_;
	}

	function _requireNoEmptyName(string memory _mainName) internal pure {
		if (bytes(_mainName).length == 0) {
			revert SampleNoEmptyField("main_name");
		}
	}

	modifier onlyValidIndex(uint256 _index) {
		_requireValidIndex(_index);
		_;
	}

	function _requireValidIndex(uint256 _index) internal view {
		if (_index > addressToSampleMusicTab[msg.sender].length - 1) {
			revert SampleInvalidIndex(_index);
		}
	}

	modifier onlySameAmount(uint256 _index) {
		_requireSameAmount(_index);
		_;
	}

	function _requireSameAmount(uint256 _index) internal view onlyValidIndex(_index) {
		if (msg.value < addressToSampleMusicTab[msg.sender][_index].price) {
			revert SampleSameAmount(msg.value);
		}
	}

	function registerArtists(
		bool _isArtist,
		string memory _mainName,
		ArtistType _mainType,
		ArtistType[] memory _extraTypes,
		bytes[] memory _genres,
		//DescriptionPreimage memory _description,
		bytes32[] memory _assets
	) external onlyNotRegister onlyNotEmptyName(_mainName) {
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
					//description: _description,
					assets: _assets
				})
			})
		);
		emit ArtistRegistered(msg.sender, _mainName, addressToArtist[msg.sender].data.registered_at);
	}

	function createSample(address _artist, string memory _uri, uint256 _price) public {
		addressToSampleMusicTab[_artist].push(
			SampleMusic({
				idSample: addressToSampleMusicTab[_artist].length,
				artist: addressToArtist[_artist],
				uri: _uri,
				totalSupplies: Totalsupplies({totalSupply: 0, totalSold: 0}),
				price: _price
			})
		);
	}

	function buySample(address _artist, uint256 _index) public payable onlyValidIndex(_index) onlySameAmount(_index) {
		addressToSampleDetails[_artist][_index].push(SampleDetails({owner: msg.sender, isUsed: false}));
		addressToSampleMusicTab[_artist][_index].totalSupplies.totalSold++;
		balanceOf[_artist] += msg.value;
	}

	function setPriceToArtist(address _artist, uint256 _tokenId, uint256 _price) public {
		addressToTokenIdToPrice[_artist][_tokenId] = _price;
	}

	function setAddressToArtist(Artist memory _artist) public {
		addressToArtist[msg.sender] = _artist;
	}

	function getArtist(address _artist) external view returns (Artist memory) {
		return addressToArtist[_artist];
	}

	function setArtistIsArtist(address _artist, bool _isArtist) public {
		addressToArtist[_artist].is_artist = _isArtist;
	}

	function setArtistDataMainName(address _artist, string memory _mainName) public onlyNotEmptyName(_mainName) {
		addressToArtist[_artist].data.main_name = _mainName;
	}

	function setArtistDataMainType(address _artist, ArtistType _mainType) public {
		addressToArtist[_artist].data.main_type = _mainType;
	}

	function setArtistDataExtraTypes(address _artist, ArtistType[] memory _extraTypes) public {
		addressToArtist[_artist].data.extra_types = _extraTypes;
	}

	function setArtistDataGenres(address _artist, bytes[] memory _genres) public {
		addressToArtist[_artist].data.genres = _genres;
	}

	function setArtistDataAssets(address _artist, bytes32[] memory _assets) public {
		addressToArtist[_artist].data.assets = _assets;
	}

	function setSampleMusicIdSample(address _artist, uint256 _index, uint256 _idSample)
		internal
		onlyValidIndex(_index)
	{
		addressToSampleMusicTab[_artist][_index].idSample = _idSample;
	}

	function setSampleMusicUri(address _artist, uint256 _index, string memory _uri) public onlyValidIndex(_index) {
		addressToSampleMusicTab[_artist][_index].uri = _uri;
	}

	function setSampleMusicPrice(address _artist, uint256 _index, uint256 _price) public onlyValidIndex(_index) {
		addressToSampleMusicTab[_artist][_index].price = _price;
	}
}
