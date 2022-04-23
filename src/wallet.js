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
    let userId=req.query.id;
    let sum=req.body.sum;
    console.log(userId);
    console.log(sum);
    let wallet= await db.query(`SELECT * FROM user WHERE id=${userId}`);
    wallet=wallet[0];
    if (sum>wallet.cash) {
        return {
            "code" : codes.badCode
        }
    }
    if (sum<=wallet.cash) {
        await db.query(`UPDATE user SET cash=${wallet.cash-sum} WHERE id=${wallet.id}`);
        return {
            "code" : codes.goodCode
        };
    }

}

module.exports= {
    getWallet : getWallet,
    payByWalletId : payByWallet
};