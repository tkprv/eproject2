const db = require('../config/dbConfig')
const request = require('request')


    
const goal = (req,res)=> {
    db.query("SELECT * FROM  tbl_goal", (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      })
    
}
const tactic = (req,res)=> {
    const id = req.params.id
    db.query("SELECT * FROM tbl_tactic JOIN tbl_goal ON tbl_tactic.goal_id = tbl_goal.goal_id", (err, result) => {
  
   if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    })
}
const tactic2 = (req,res)=> {
  const id = req.params.id
  db.query("SELECT * FROM  tbl_tactic WHERE tbl_tactic.goal_id  = ? ",id,(err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  })
}


const creategoal = (req,res)=> {
    const strategic_id = req.body.strategic_id
    const order = req.body.order_goal
    const name = req.body.goal_name
    db.query(
      "INSERT INTO tbl_goal (strategic_id,order_goal,goal_name) VALUES (?,?,?)",
      [strategic_id,order,name ],
      (err, result) => {
        if (err) {
          console.log('5',err);
        } else {
          res.send(result);
        }
      }
    )
}

const createindicgoal = (req,res)=> {
  const goalid = req.body.goal_id
  const order = req.body.order_indic_goal
  const indicgoal = req.body.indic_goal
  const unit = req.body.unit
  const cost = req.body.cost
  //
  db.query(
    "INSERT INTO tbl_indic_goal(goal_id,order_indic_goal,indic_goal,unit,cost) VALUES (?,?,?,?,?)",
    [goalid, order, indicgoal, unit, cost],
    (err, result) => {
      if (err) {
        console.log('5', err);
      } else {
        res.send(result);
      }
    }
  )
}

const createtactic = (req,res)=> {
  const goalid = req.body.goal_id
  const ordertactic = req.body.order_tactic
  const name = req.body.tactic_name

  db.query(
    "INSERT INTO tbl_tactic(goal_id,order_tactic,tactic_name) VALUES (?,?,?)",
    [goalid, ordertactic, name],
    (err, result) => {
      if (err) {
        console.log('5', err);
      } else {
        res.send("Values Inserted");
      }
    }
  )
}

const goaal = (req,res)=> {
  const id = req.params.id
  db.query("SELECT * FROM  tbl_goal WHERE tbl_goal.strategic_id  = ? ", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  })
}

const indic = (req,res)=> {
  db.query("SELECT * FROM  tbl_indic_goal LEFT JOIN tbl_goal ON tbl_indic_goal.goal_id = tbl_goal.goal_id", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);

    }
  })
}

const showgoal = (req,res)=> {
  const ID = req.params.id
  console.log('id', ID)
  db.query("SELECT * FROM tbl_goal WHERE goal_id =?", [ID], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  })
}

const updategoal = (req,res)=> {
  const ID = req.params.id;
  const goalname = req.body.goal_name;
  db.query(
    "UPDATE tbl_goal SET goal_name = ? WHERE goal_id = ?",
    [goalname, ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    }
  )
}
const showindic = (req,res)=> {
  const ID = req.params.id
  console.log('id', ID)
  db.query("SELECT * FROM tbl_indic_goal WHERE indic_goal_id =?", [ID], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  })
}

const updateindic = (req,res)=> {
  const ID = req.params.id;
  const indicgoal = req.body.indic_goal;
  const unit = req.body.unit;
  const cost = req.body.cost;
  db.query(
    "UPDATE tbl_indic_goal SET indic_goal = ?, unit = ?, cost = ? WHERE indic_goal_id = ?",
    [indicgoal, unit, cost, ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    }
  )
}

const showtactic = (req,res)=> {
  const ID = req.params.id
  console.log('id', ID)
  db.query("SELECT * FROM tbl_tactic WHERE tactic_id =?", [ID], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
}

const updatetactic = (req,res)=> {
  const ID = req.params.id;
  const tacticname = req.body.tactic_name;
  db.query(
    "UPDATE tbl_tactic SET tactic_name = ? WHERE tactic_id = ?",
    [tacticname, ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    }
  )
}



module.exports={goal,tactic,tactic2,creategoal,createindicgoal,createtactic,goaal,indic,showgoal,updategoal,showindic,updateindic,showtactic,updatetactic}
  