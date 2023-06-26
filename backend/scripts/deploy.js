const { ethers } = require("hardhat");
const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const [deployer] = await ethers.getSigners();
  const balance = await deployer.getBalance();
  const feedMeToday = await hre.ethers.getContractFactory("FeedMeToday");
  const FeedMeToday = await feedMeToday.deploy();

  await FeedMeToday.deployed();
  console.log("FeedMeToday deployed to:", FeedMeToday.address)

  const data = {
    address: FeedMeToday.address,
    abi: JSON.parse(FeedMeToday.interface.format('json'))
  }

  //This writes the ABI and address to the FeedMeToday.json
  fs.writeFileSync('../frontend/src/contract/FeedMeToday.json', JSON.stringify(data))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });