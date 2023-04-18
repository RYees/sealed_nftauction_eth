const main = async () => {
  const [deployer] = await ethers.getSigners();
  // console.log("Deploying contracts with the accounts", deployer.address);
  // console.log("Account balance:", (await deployer.getBalance()).toString());
  const Nftauction = await hre.ethers.getContractFactory("NFTAuction");
  const auction = await Nftauction.deploy();
  await auction.deployed();

  console.log("Transactions deployed to: ", auction.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();



