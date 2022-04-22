const database = require("./db.js");
const mailer = require("./email");
let db= database.db;
let codes=database.codes;
function isEmptyObject(obj) {
    return !Object.keys(obj).length;
}
function checkExist(a) {
    return typeof a !== "undefined" && a !== null;
}
async function addBlog(req) {
    let data = req.body;
    let projectId= req.params.project_id;
    return await db.query(`INSERT INTO blog (project_id) VALUES (${projectId})`);
}
async function addRecordToBlog(req) {
    let projectId= req.params.project_id;
    let text= req.body.text;
    let blog=await db.query(`SELECT * FROM blog WHERE project_id=${projectId}`);
    let blogId=blog[0].id;
    return await bd.query(`INSERT INTO blog_record (blog_id,text) VALUES (${blogId},'${text}')`);
}
async function getBlog(req) {
    if (!isEmptyObject(req.params.blog_id)) {
        let blogId=req.params.blog_id;
        let limit =100;
        if (!isEmptyObject(req.query.limit)) {
            limit=req.query.limit;
        }
        return await db.query(`SELECT * FROM blog_record WHERE blog_id=${blogId} LIMIT ${limt}`);
    }
    let limit=100;
    if (!isEmptyObject(req.query.limit)) {
        limit=req.query.limit;
    }
    return await db.query(`SELECT * FROM blog LIMIT ${limit}`);
}
module.exports= {
    addBlog : addBlog,
    addRecordToBlog : addRecordToBlog,
    getBlog : getBlog
};
