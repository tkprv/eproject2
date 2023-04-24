const db = require('../config/dbConfig')
const request = require('request')


const getstrategic = (req, res) => {
  db.query("SELECT * FROM tbl_fiscalyear ", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });

}

const getyears = (req, res) => {
  db.query("SELECT * FROM tel_year ", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result[0])

    }
  });
}

const createstrategic = (req, res) => {
  const year = req.body.fiscalyear
  const plan = req.body.plan_name
  db.query(
    "INSERT INTO tbl_fiscalyear (fiscalyear,plan_name,flag) VALUES (?,?,1)",
    [year, plan],
    (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          res.send(err.code)
          console.log('Duplicate data');
        } else {
          console.log(err);
        }
      } else {
        console.log('Data inserted successfully');
      }
    }

  )
}

const updatesstatus = (req, res) => {
  const ID = req.params.ID;
  const flag = req.body.flag;
  db.query(
    "UPDATE tbl_fiscalyear SET flag = ?  WHERE fiscalyear_id = ?",
    [flag, ID],
    (err, result) => {
      if (err) {
        console.log('3', err)
      } else {
        res.send(result)
      }
    }
  )

}
const updatestrategic = (req, res) => {
  const ID = req.params.f_id
  const name = req.body.plan_name
  const time1 = req.body.director_of_time
  const date1 = req.body.director_of_date
  const time2 = req.body.ref_of_time
  const date2 = req.body.ref_of_date
  db.query(
    "UPDATE tbl_fiscalyear SET plan_name = ? , director_of_time= ? , director_of_date= ? , ref_of_time= ? , ref_of_date= ?  WHERE fiscalyear_id = ?",
    [name, time1, date1, time2, date2, ID],
    (err, result) => {
      if (err) {
        console.log('3', err)
      } else {
        res.send(result)
      }
    }
  )
}

const deletestrategic = (req, res) => {
  const delete_id = req.params.f_id;
  db.query("DELETE FROM tbl_fiscalyear WHERE fiscalyear_id = ?", delete_id, (err, result) => {
    if (err) {
      console.log('1', err);
    } else {
      res.send(result);
    }
  })
}
//ปรเด็นยุทธ
const getstrategicid = (req, res) => {
  db.query("SELECT * FROM  tbl_strategic LEFT JOIN tbl_fiscalyear on tbl_strategic.fiscalyear_id = tbl_fiscalyear.fiscalyear_id ", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  })
}
const deletestid = (req, res) => {
  const delete_id = req.params.ID;
  db.query("DELETE FROM tbl_strategic WHERE strategic_id = ?", delete_id, (err, result) => {
    if (err) {
      console.log('1', err);
    } else {
      res.send(result);
    }
  })
}

const updatest = (req, res) => {
  const ID = req.params.ID;
  const name = req.body.strategic_name;
  db.query(
    "UPDATE tbl_strategic SET strategic_name = ?  WHERE strategic_id = ?",
    [name, ID],
    (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          res.send(err.code)
          console.log('Duplicate data');
        } else {
          console.log(err);
        }
      } else {
        res.send('success')
      }
    }
  )
}

const createstid = (req, res) => {
  const year = req.body.fiscalyear_id
  const order = req.body.order_strategic
  const name = req.body.strategic_name
  db.query(
    "INSERT INTO tbl_strategic (fiscalyear_id,order_strategic,strategic_name) VALUES (?,?,?)",
    [year, order, name],
    (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          res.send(err.code)
          console.log('Duplicate data');
        } else {
          console.log(err);
        }
      } else {
        res.send('success')
      }
    }

  )
}
////////ข้อมูลประเด็นยุธ .strategic_id JOIN tbl_indic_goal ON tbl_goal.goal_id = tbl_indic_goal.goal_id JOIN tbl_tactic ON tbl_indic_goal.goal_id = tbl_tactic.goal_id 
const datast = (req, res) => {
  const id = req.params.id
  db.query("SELECT * FROM tbl_strategic JOIN tbl_goal ON tbl_strategic.strategic_id = tbl_goal.strategic_id JOIN tbl_indic_goal ON tbl_goal.goal_id = tbl_indic_goal.goal_id JOIN tbl_tactic ON tbl_goal.goal_id  = tbl_tactic.goal_id WHERE tbl_strategic.strategic_id  = ? ", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  })
}

const redatast = (req, res) => {
  const id = req.params.id
  db.query("SELECT * FROM tbl_strategic JOIN 	tbl_fiscalyear ON tbl_strategic.fiscalyear_id= tbl_fiscalyear.fiscalyear_id WHERE tbl_strategic.fiscalyear_id  = ? ", 
  [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result)
    }
  })
}

const updateyears = (req, res) => {
  const ID = req.params.id;
  const years = req.body.years;
  db.query(
    "UPDATE tel_year SET years = ?  WHERE id = ?",
    [years, ID],
    (err, result) => {
      if (err) {
        console.log('3', err)
      } else {
        res.send(result)
      }
    }
  )
}

module.exports = { redatast, getstrategic, getyears, createstrategic, updatesstatus, updatestrategic, deletestrategic, getstrategicid, deletestid, updatest, createstid, datast, updateyears }
