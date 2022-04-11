var express = require('express');
var app = express();
app.listen(3001,function(){
    console.log('Node server running @ http://localhost:3001')
});
var mysql = require('mysql')
const db = mysql.createConnection({
  host: 'sql103.epizy.com',
  user: 'epiz_31490414',
  password: '7q0y54fd',
  database: 'epiz_31490414_PHONG_MACH_TU'
})

db.connect()
// db.query('SELECT * from BENH_NHAN', function(err, rows, fields) {
//   if(err) console.log(err);
//   console.log('The solution is: ', rows);
//   // db.end();
// });
// const app = express();
