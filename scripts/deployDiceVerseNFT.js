
const hre = require("hardhat");

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  const lockedAmount = hre.ethers.utils.parseEther("1");

  //@dev - I make changes here to add my NFT name
  const DiceVerseNFT = await hre.ethers.getContractFactory("DiceVerseNFT");
  const diceverseNFT = await DiceVerseNFT.deploy();

  await diceverseNFT.deployed();

  console.log("DiceVerseNFT deployed to:", diceverseNFT.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});