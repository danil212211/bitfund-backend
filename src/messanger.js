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
async function getConv(req) {
    let data = req.query;
    let reciever = req.params.conversation_id;
    let sender =  req.cookies.id;
    let limit=0,fromId=0;
    if (checkExist(data.messageLimit)) limit=data.messageLimit;
    if (checkExist(data.fromMessage)) fromId=data.fromMessage;
    let ret=await db.query (`SELECT * FROM conversation WHERE reciever_id = '${reciever}' AND sender_id = '${sender}'`);
    if (!isEmptyObject(ret)) {
        let convId=ret[0].id;
        let ret2=await db.query(`SELECT * FROM message WHERE conversation_id = '${convId} LIMIT ${limit} OFFSET ${fromId}  `);
        if (!isEmptyObject(ret2.id)) {
            return ret2;

        }
    }
    return {
        "rec" : reciver,
        "sen" : sender
    };
};
async function sendMessage(req) {
    let sender = req.cookies.id;
    let reciever= req.params.conversation_id;
    let data= req.body;
    let text=data.text;
    let check1 = await db.query(`SELECT * FROM conversation WHERE reciever_id = '${reciever}' AND sender_id = '${sender}'`);
    let check2 = await db.query(`SELECT * FROM conversation WHERE reciever_id = '${sender}' AND sender_id = '${reciever}'`);

    let convo1,convo2;
    if (isEmptyObject(check1)) {
    let c1= await   db.query(`INSERT INTO conversation (reciever_id, sender_id) VALUES (${reciever},${sender})`);
    let c2= await   db.query(`INSERT INTO conversation (reciever_id, sender_id) VALUES (${sender},${reciever})`);
    convo1=c1.insertId;
    convo2=c2.insertId;
    } else {
        convo1=check1[0].id;
        convo2=check2[0].id;
        console.log(check1);
        console.log(check2);
    }
    await db.query(`INSERT INTO message (conversation_id , text) VALUES (${convo1},${text})`);
    await db.query(`INSERT INTO message (conversation_id , text) VALUES (${convo2},${text})`);
}
module.exports = {
    getMessages : getConv,
    sendMessage : sendMessage

};