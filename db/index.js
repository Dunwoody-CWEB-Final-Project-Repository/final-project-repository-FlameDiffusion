const mysql = require('mysql2/promise');

var pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "assignment"
  
});

pool.getConnection((err) => {
    if (err) throw err;
    console.log('Connected!');
  });

  module.exports = {
      query: (text,params) => pool.query(text, params)
  };

