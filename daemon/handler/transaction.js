const { Transactions } = require('../models');

const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
const allTransactions = [];

const getTx = async (tx) => await web3.eth.getTransaction(tx);

const getLastBlockNumberFromDB = async () => {
    try {
        const lastNum = await Transactions.findOne({
            // where: {

            // },
            order: [['blockNumber', 'DESC']]
        });

        if (!lastNum) {
            return 0;
        }

        return lastNum.blockNumber;
    } catch (error) {
        console.log("Error : getLastBlockNumberFromDB - DB에서 BlockNum을 가져오지 못하였습니다.");

        return 0;
    }
}

