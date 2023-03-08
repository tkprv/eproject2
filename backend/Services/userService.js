const db=require('../config/dbConfig')
const axios = require('axios')
const request = require('request')



const apiLogin = (req,res)=>{
    const username = req.body.username
    const password = req.body.password
    const scopes = req.body.scopes
    token ='nK6p0wT-8NVHUwB8p0e9QSYBSaIZGp9D'
    const newdata = {username: username, password: password,scopes:scopes}
    const config = {
    headers: {
        Authorization: `Bearer ${token}`, 
        'Content-Type': 'application/json',
    }
    }
    axios.post('https://api.account.kmutnb.ac.th/api/account-api/user-authen', newdata, config, )
    .then((response) => {
      //receive response
    //   console.log(response.data);
    //   res.status(201).json(response.data);
    if(response.data.api_status === 'success'){
        db.query('SELECT * FROM tbl_user WHERE username = ? AND email = ?', [response.data.userInfo.username, response.data.userInfo.email], (err, results)=>{
          if (err) {
            res.send({err: err})
          } 
          if(results.length >0){
            res.status(200).json(results);
          }else {
            res.status(400).send("Invalid Credentials");
          }
        
    })
    }else {
        res.status(404);
    }  
      
    })
}


const apiLogin2 = (req,response)=> {
  // Capture the input fields
  console.log(request.body)
  let username = request.body
  let email = request.body
  // Ensure the input fields exists and are not empty
  if (username && email) {
    // Execute SQL query that'll select the account from the database based on the specified username and password
    db.query('SELECT * FROM tbl_user WHERE username = ? AND email = ?', [username, email], function (error, results, fields) {
      // If there is an issue with the query, output the error
      if (error) throw error;
      
      // If the account exists
      if (results.length > 0) {
        // Authenticate the user
        request.session.loggedin = true;
        request.session.username = username;
        // Redirect to home page
        //response.redirect('/home');
      } else {
        response.send('Incorrect Username and/or Password!');
      }
      response.end();
    });
  } else {
    response.send('Please enter Username and Password!');
    response.end();
  }
};



module.exports={apiLogin,apiLogin2}