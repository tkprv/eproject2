const db = require('../config/dbConfig')
const request = require('request')


const agency = (req,res)=> {
    db.query("SELECT * FROM tbl_section", (err, result) => {
        if (err) {
          console.log(err)
        } else {
          res.send(result)
        }
      })
    
}

const agencydelete = (req,res)=> {
    const a_id = req.params.a_id;
    db.query("DELETE FROM tbl_section WHERE section_id = ?", a_id, (err, result) => {
      if (err) {
        console.log('1',err);
      } else {
        res.send(result);
      }
    });
    
}

const agencycreate = (req,res)=> {
    const section_name = req.body.section_name;
    db.query(
      "INSERT INTO tbl_section (section_name,section_flag) VALUES (?,1)",
      [section_name],
      (err, result) => {
        if (err) {
          console.log('5',err)
        } else {
          res.send("Values Inserted")
        }
      }
    );
    
}
const agencyupdate = (req,res)=> {
    const section_id = req.params.section_id;
  const section_name = req.body.section_name;
  db.query(
    "UPDATE tbl_section SET section_name = ?  WHERE section_id = ?",
    [section_name,section_id], 
    (err, result) => {
      if (err) {
        console.log('3',err)
      } else {
        res.send(result)
      }
    }
  )
    
}



module.exports={agency,agencydelete,agencycreate,agencyupdate}
  