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
async function addProject(req) {
    let userId=req.cookies.id;
    let data = req.body;
    let title = data.title;
    let description = data.desc;
    await db.query(`INSERT INTO project (user_id,title,description) VALUES (${userId} , '${title}','${description}')`);
}
async function getProject(req) {
    let projectId;
    if (!isEmptyObject(req.params.project_id)) {
        projectId=req.params.project_id;
        return await db.query(`SELECT * FROM project WHERE project_id=${projectId}`);
    }
    let limit=10;
    if (!isEmptyObject(req.query.limit)) {
        limit=req.query.limit;
    }
    return await db.query(`SELECT * FROM project LIMIT ${limit}`);
}
module.exports = {
    addProject : addProject,
    getProject : getProject
};

