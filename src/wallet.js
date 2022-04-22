const database = require("./db.js");
const mailer = require("./email");
let db= database.db;
let codes=database.codes;
//TODO: множество кошелков
async function getWallet(req) {
    let userId=req.cookies.id;
    await db.query(`SELECT * FROM wallet WHERE user_id = ${userId}`);

}
async function payByWallet(req) {
    let userId=req.cookies.id;
    let wallet = await getWallet(req);
    let data = req.body;
    let sum=data.sum;
    if (sum>wallet.cash) {
        return {
            "code" : codes.badCode
        }
    }
    if (sum<=wallet.cash) {
        await db.query(`UPDATE wallet SET cash=${wallet.cash-sum} WHERE id=${wallet.id}`);
        return {
            "code" : codes.goodCode
        };
    }

}

module.exports= {
    getWallet : getWallet,
    payByWalletId : payByWallet
};