const fs = require("fs");
const path = require("path")
const inquirer = require("inquirer");
const user = require("../db/user.json");

const addBalance = async () => {
  try {
    const amountData = await inquirer.prompt([
      {
        name: "amount",
        message: "Add amount : ",
      },
    ]);

    let amount = Number(amountData.amount);
    if (!amount || amount <= 0) {
      throw new Error("Please add valid amount!");
    }
    user.balance += amount;

    fs.writeFile(path.resolve(__dirname, "../db/user.json"), JSON.stringify(user), (err, data) => {
      if (err) console.error("error while adding balance ", err);
    });

    console.info(`Balance added! Your updated balance is ${user.balance}.`);
  } catch (error) {
    console.error(`Error while adding balance : ${error.message}`)
    throw error
  }
};

module.exports = addBalance;
