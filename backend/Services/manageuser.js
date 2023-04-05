const db = require('../config/dbConfig')
const request = require('request')
const axios = require('axios')


const api = (req,res)=> {
    const username = req.body.username
    token ='nK6p0wT-8NVHUwB8p0e9QSYBSaIZGp9D'
    const data = {username: username}
    const config = {
    headers: {
        Authorization: `Bearer ${token}`, 
        'Content-Type': 'application/json',
    }
    }
    axios.post('https://api.account.kmutnb.ac.th/api/account-api/user-info', data, config)
    .then((response) => {
            //receive response
            console.log(response.data);
            res.status(201).json(response.data);
            
    })
}
const person = (req,res)=> {
    db.query("SELECT * FROM tbl_user LEFT JOIN tbl_section on tbl_user.section_id = tbl_section.section_id ", (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
    
}

const updateuser = (req,res)=> {
    const id = req.params.ID;
    const secid = req.body.section_id
    const director = req.body.director
    const manager = req.body.manager
    const supervisor = req.body.supervisor
    const supplies = req.body.supplies
    const responsible = req.body.responsible
    const admin = req.body.admin
    db.query(
      "UPDATE tbl_user SET section_id = ? ,director = ? ,manager = ? ,supervisor = ? ,supplies = ? ,responsible = ? ,admin = ?   WHERE user_id = ?",
      [secid,director,manager,supervisor,supplies,responsible,admin,id], 
      (err, result) => {
        if (err) {
          console.log('3',err)
        } else {
          res.send(result)
        }
      }
    )
    
}
const deleteuser = (req,res)=> {
    const p_id = req.params.p_id;
    db.query("DELETE FROM tbl_user WHERE user_id = ?", p_id, (err, result) => {
      if (err) {
        console.log('2',err);
      } else {
        res.send(result);
      }
    });
    
}
const createuser = (req,res)=> {
    const secid = req.body.section_id
    const user = req.body.username
    const fname = req.body.fname
    const lname = req.body.lname
    const email = req.body.email
    const director = req.body.director
    const manager = req.body.manager
    const supervisor = req.body.supervisor
    const supplies = req.body.supplies
    const responsible = req.body.responsible
    const admin = req.body.admin
    const flag = req.body.flag
    const displayname = req.body.displayname
    console.log(req.body)
    db.query(
      "INSERT INTO tbl_user (section_id,username,fname,lname,email,director,manager,supervisor,supplies,responsible,admin,flag,displayname) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [secid,user,fname,lname,email,director,manager,supervisor,supplies,responsible,admin,flag,displayname],
      (err, result) => {
        if (err) {
          console.log('5',err);
        } else {
          res.send("Values Inserted");
        }
      }
    );
}

const updateuserperson = (req, res) => {
  const ID = req.params.id;
  const flag = req.body.flag;
  db.query(
    "UPDATE tbl_user SET flag = ? WHERE user_id = ?",
    [flag, ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    }
  )
  console.log('flag', ID)
  console.log('newflag', flag)
}

module.exports={api,person,updateuser,deleteuser,createuser, updateuserperson}
  