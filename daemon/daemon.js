const cron = require("node-cron");
const { txHandler } = require("./handler/transaction");

const task = cron.schedule(
    "*/5 * * * * *",
    txHandler,
    {
        scheduled: true,
    }
);

task.start();