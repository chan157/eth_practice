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

const getLastestTransactions = async () => {
    try {
        const curBlockNumEth = await web3.eth.getBlockNumber();
        const lastBlockNumDB = await getLastBlockNumberFromDB();

        if (curBlockNumEth - lastBlockNumDB <= 0) {
            console.info("DB Update가 최신 상태입니다.");
            
            return [];
        } else {
            for (let i = lastBlockNumDB + 1; i <= curBlockNumEth; i++) {
                const block = await web3.eth.getBlock(i);

                for (let tx of block.transactions) {
                    allTransactions.push(getTx(tx));
                }
            }
            
            return Promise.all(allTransactions);
        }
    } catch (error) {
        console.log("Error : getLastestTransactions");
    }
};


module.exports = { getLastestTransactions };