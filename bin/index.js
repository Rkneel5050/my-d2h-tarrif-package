#!/usr/bin/env node

const inquirer = require("inquirer");
const user = require("../db/user.json");
const addBalance = require("../methods/add-balance");
const viewTarrifPackage = require("../methods/view-tarrif-package");
const addOnChannel = require("../methods/add-on-channel");
const removeChannel = require("../methods/remove-channel");

const choices = [
  "To view your balance",
  "To add amount to your balance",
  "To view your basic tariff package",
  "To add addon channel to your tariff package",
  "To remove the channel from your tariff plan",
];

const myD2hTarrifPackage = async () => {
  try {
    const result = await inquirer.prompt([
      {
        type: "list",
        message: "Welcome. What would you like to do? Please choose",
        name: "choice",
        choices,
      },
    ]);

    if (result.choice === choices[0]) {
      console.info(`Your balance is : ${user.balance}`);
    }

    if (result.choice === choices[1]) {
      await addBalance();
    }

    if (result.choice === choices[2]) {
      await viewTarrifPackage();
    }

    if (result.choice === choices[3]) {
      await addOnChannel();
    }

    if (result.choice === choices[4]) {
      await removeChannel();
    }
  } catch (error) {
    console.error(error.message);
  }
};

myD2hTarrifPackage();
