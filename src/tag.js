const database = require("./db.js");
const mailer = require("./email");
let db= database.db;
let codes=database.codes;
function checkExist(a) {
    return typeof a !== "undefined" && a !== null;
}
function isEmptyObject(obj) {
    return !Object.keys(obj).length;
}
async function getTags(req) {
    console.log("check");
    return await db.query(`SELECT * FROM tag`);

}
module.exports={
    getTags: getTags
}