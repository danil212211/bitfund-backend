const database = require("./db.js");
const mailer = require("./email");

const path = require('path');
let db= database.db;
let codes=database.codes;
function isEmptyObject(obj) {
    return !Object.keys(obj).length;
}
function checkExist(a) {
    return typeof a !== "undefined" && a !== null;
}
async function addProject(req) {
    let userId=2;
    let data = req.body;
    console.log(req.file);
    let fileName=path.parse(req.file.path).name;
    let title = data.title;
    let description = data.description;
    await db.query(`INSERT INTO project (user_id,title,description,img_logo) VALUES (${userId} , '${title}','${description}', '${fileName}')`);
}
async function getProject(req) {
    let projectId;

    if (checkExist(req.params.project_id)) {
        projectId=req.params.project_id;
        return await db.query(`SELECT * FROM project WHERE project_id=${projectId}`);
    }
    if (checkExist(req.query.tagId)) {
        let tagId=req.query.tagId;
        return await db.query(`SELECT * FROM project WHERE EXISTS (SELECT * FROM project_tag WHERE tag_id=${tagId} AND project_id = project.id)`);
    }
    let limit=10;
    if (checkExist(req.query.limit)) {
        limit=req.query.limit;
    }
    if (checkExist(req.query.rand) && req.query.rand===1) {
        return await db.query(`SELECT * FROM project LIMIT ${limit} ORDER BY NEWID()`);
    } else
    return await db.query(`SELECT * FROM project LIMIT ${limit}`);
}
module.exports = {
    addProject : addProject,
    getProject : getProject
};

