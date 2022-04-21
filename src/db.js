const mysql = require('mysql');
const util = require("util");
var url = "http://14-bit.com:3000";
let codes = {
    "badCode" : 400,
    "goodCode" : 200
};
var mysql_pool  = mysql.createPool({
    connectionLimit : 100,
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'bitfund'
});
mysql_pool.query=util.promisify(mysql_pool.query);
module.exports= {
    db : mysql_pool,
    url : url,
    codes : codes
}

