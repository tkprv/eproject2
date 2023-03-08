const mysql=require('mysql');
const env=require('dotenv').config()

const dbConfig = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "test",
    port: '3307',
    dateStrings: 'date'
  });
  
  
  dbConfig.connect((err) => {
    if (err) {
      console.log('Error connecting to MySQL database = ', err)
      return;
    }
    console.log('MySQL successfully connected!');
  })

module.exports=dbConfig