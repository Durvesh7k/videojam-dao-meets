const hre = require("hardhat");

async function main() {
  const [deployer, member1,member2, member3] = await hre.ethers.getSigners();
  const dao = await hre.ethers.getContractFactory("Daomeet");
  const daoContract = await dao.deploy()
  await daoContract.deployed();

  console.log("This is the address of the contract",daoContract.address);
  console.log("This is the deployer of the contract",deployer.address);

  const addressArray = ["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", "0x70997970C51812dc3A010C7d01b50e0d17dc79C8", "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"]

  const registerTx = await daoContract.register(addressArray, "dao", "hdhd-gsbsj-swbsb", 10);

  registerTx.wait();

  const dao3 = await daoContract.connect(member3).getDao(member3.address);
  const dao2 = await daoContract.connect(member3).getDao(member2.address);
  const dao1 = await daoContract.connect(member3).getDao(member1.address);
  console.log("dao1", dao1);
  console.log("dao2",dao2);
  console.log("dao3",dao3);


}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
