const database = require("./db.js");
const mailer = require("./email");
function checkExist(a) {
    return typeof a !== "undefined" && a !== null;
}
function isEmptyObject(obj) {
    return !Object.keys(obj).length;
}
async function getConv(req) {
    let data = req.query;
    let reciever = req.params.id;
    let sender =  req.cookies.id;
    let toId=0,fromId=0;
    if (checkExist(data.toMessage)) toId=data.toMessage;
    if (checkExist(data.fromMessage)) fromId=data.fromMessage;
    let ret=await db.query (`SELECT * FROM conversation WHERE reciever_id = '${reciever}' AND sender_id = '${sender}'`);
    if (!isEmptyObject(ret)) {
        let convId=ret[0].id;
        let ret2=await db.query(`SELECT * FROM message WHERE conversation_id = '${}`)

    }
    return {
        "rec" : reciver,
        "sen" : sender
    };
};
async function sendMessage(req) {
    let sendId = req.cookies.id;
    let recieveId= req.params.id;
    let data= req.body;
    let text=data.text;
}
module.exports = {
    getMessages : getConv,
    sendMessage : sendMessage

};