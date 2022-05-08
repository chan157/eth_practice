const cron = require("node-cron");
const txHandler = require("./handler/transaction");

const task = cron.schedule(
    txHandler,
    {
        scheduled: true,
    }
)

task.start();