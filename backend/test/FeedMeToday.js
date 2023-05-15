const { expect } = require("chai");

describe("FeedMeToday", function () {
  let feedMeToday;
  let owner;
  let buyer1;
  let buyer2;
  let buyer3;

  beforeEach(async function () {
    const FeedMeToday = await ethers.getContractFactory("FeedMeToday");
    feedMeToday = await FeedMeToday.deploy();
    owner = await ethers.getSigner("0x8F673B413c540257043baF1cF647Fb9dD699Fa2b");
    buyer1 = await ethers.getSigner("0x59a68AC0A8159cD11a773d744b4e86C31BEDfe47");
    buyer2 = await ethers.getSigner("0x657E38c7922C91768cA441134e869Ca011636B14");
    buyer3 = await ethers.getSigner("0xC7A74c3507bc1c4986042EC1147736fd532ce6e5");

  });

    it("Should allow buyers to make an offer", async function () {
    const foodChoice = "Pizza";
    const amount = ethers.utils.parseEther("1");
    const message = "Enjoy your day!";
  
    //await feedMeToday.connect(buyer1).makeOffer(foodChoice, amount, massage);
    await feedMeToday.connect(buyer1).makeOffer(foodChoice, amount, message, { gasPrice: ethers.utils.parseUnits('50', 'gwei')} );
  
    const buyer = await feedMeToday.getBuyer(buyer1.address);
    expect(buyer.buyerAddress).to.equal(buyer1.address);
    expect(buyer.foodChoice).to.equal(foodChoice);
    expect(buyer.massage).to.equal(message);
  
    const dayBuyers = await feedMeToday.getListOfDayBuyer();
    expect(dayBuyers).to.deep.equal([buyer1.address]);
  });
  

  it("Should allow the owner to add and remove favorite food choices", async function () {
    await feedMeToday.connect(owner).addFavoriteFoodChoice("Sushi");
    await feedMeToday.connect(owner).addFavoriteFoodChoice("Burger");
    await feedMeToday.connect(owner).addFavoriteFoodChoice("Pasta");

    const favoriteFoodChoices = await feedMeToday.getFavoriteFoodChoices();
    expect(favoriteFoodChoices).to.deep.equal(["Sushi", "Burger", "Pasta"]);

    await feedMeToday.connect(owner).removeFavoriteFoodChoice(1);

    const updatedFavoriteFoodChoices = await feedMeToday.getFavoriteFoodChoices();
    expect(updatedFavoriteFoodChoices).to.deep.equal(["Sushi", "Pasta"]);
  });

  it("Should allow the owner to withdraw the contract's balance", async function () {
    const amount = ethers.utils.parseEther("0.5");

    await feedMeToday.connect(buyer1).makeOffer("Burger", amount, "");
    await feedMeToday.connect(buyer2).makeOffer("Pizza", amount, "");
    await feedMeToday.connect(buyer3).makeOffer("Sushi", amount, "");

    const initialOwnerBalance = await ethers.provider.getBalance(owner.address);
    await feedMeToday.connect(owner).withdrawBalance();
    const finalOwnerBalance = await ethers.provider.getBalance(owner.address);

    const contractBalance = await ethers.provider.getBalance(feedMeToday.address);
    expect(contractBalance).to.equal(ethers.constants.Zero);

    expect(finalOwnerBalance).to.be.gt(initialOwnerBalance);
  });

  it("Should reset the day count if 24 hours have passed", async function () {
    const foodChoice = "Ice Cream";
    const amount = ethers.utils.parseEther("0.2");

    await feedMeToday.connect(buyer1).makeOffer(foodChoice, amount, "");

    let dayBuyers = await feedMeToday.getListOfDayBuyer();
    expect(dayBuyers).to.deep.equal([buyer1.address]);

    await network.provider.send("evm_increaseTime", [25 * 60 * 60]); // Increase time by 25 hours
    await network.provider.send("evm_mine"); // Mine a new block to update the timestamp

    await feedMeToday.connect(buyer2).makeOffer(foodChoice, amount, "");

    dayBuyers = await feedMeToday.getListOfDayBuyer();
    expect(dayBuyers).to.deep.equal([buyer2.address]);
  });
});
