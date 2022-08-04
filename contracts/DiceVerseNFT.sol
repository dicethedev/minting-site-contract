//SPDX-License-Identifier: MIT
pragma soldity ^0.8.12;


//@dev - imported file - contract that will enable for minting in this project
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/access/Ownable.sol';

contract DiceVerseNFT is ERC721, Ownable {
     //@dev - uint256 is 32 bytes
  uint256 public mintPrice;
  uint256 public maxSupply;
  uint256 public totalSupply;
  uint256 public maxPerWalletBalance;
  bool public isPublicMintEnabled; //bool = true or false
  string internal baseTokenUrl;
  address payable public withdrawWallet;
  mapping(address => uint256) public walletMintBalances;

  constructor() payable ERC721('DiceVerseNFT', 'DV') {
    mintPrice = 0.02 ether;
    totalSupply = 0;
    maxSupply = 1000;
    maxPerWalletBalance = 3;

    //@dev - set withdraw wallet address
  }

  function setIsPublicMintEnabled(bool _isPublicMintEnabled) external  onlyOwner {
    isPublicMintEnabled = _isPublicMintEnabled;
  }
  
  //dev - the baseTokenUrl consist of the images
  function setBaseTokenUrl(string calldata _baseTokenUrl) external onlyOwner {
    baseTokenUrl = _baseTokenUrl;
  }

  //@dev - this tokenUrl exist in the ERC721. opensea for example will call this
  //function to get the images
  function tokenUrl(uint256 _tokenId) public view override returns(string memory) {
     require(_exists(_tokenId), 'Token does not exist!');
     return string(abi.encodedPacked(baseTokenUrl,  Strings.toString(_tokenId), ".json"));
  }

  function withdraw() external onlyOwner {
    (bool success, ) = withdrawWallet.call{ value: address(this).balance }('');
    //@dev - this is a failed check when withdraw is failed
    require(success, 'your withdraw is failed');
  }

  //@dev - the mint function begin below

  function mintTime(uint256 _quantity) public payable {
    require(isPublicMintEnabled, 'your minting is not enabled');
    //@dev - msg.value is the amount of ether value
    require(msg.value == _quantity * mintPrice, 'You enter wrong mint value');
    require(totalSupply + _quantity <= maxSupply, 'it is sold out');
    //@dev - the number of mint a wallet can perform
    require(walletMintBalances[msg.sender] + _quantity <= maxPerWalletBalance, 'it exceed max wallet balance');

    //@dev - for loop to perform the minting
    for(uint256 i=0; i < _quantity; i++) {
      uint256 newTokenId = totalSupply + 1;
      totalSupply++;
      //@dev - _safeMint is a function that exist in ERC721
      _safeMint(msg.sender, newTokenId);
    }
  }
}
