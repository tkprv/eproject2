const db = require('../config/dbConfig')
const request = require('request')

const showstrategicplan = (req, res) => {
  const ID = req.params.id
  console.log('id', ID)
  db.query("SELECT * FROM tbl_strategic_project WHERE strategic_project_id = ?", [ID], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
}

const strategicplanpro = (req, res) => {
  db.query("SELECT * FROM tbl_fiscalyear", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
}

const updatestrategicplan = (req, res) => {
  const ID = req.params.id;
  const plan = req.body.plan_id
  db.query(
    "UPDATE tbl_strategic_project SET plan_id = ? WHERE strategic_project_id = ?",
    [plan, ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    }
  )
  console.log('plan', ID)
  console.log('newplan', plan)
}

const strategicpro = (req, res) => {
  db.query("SELECT * FROM tbl_strategic", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
}

const updatestrategic = (req, res) => {
  const ID = req.params.id;
  const strategic = req.body.strategic_id
  db.query(
    "UPDATE tbl_strategic_project SET strategic_id = ? WHERE strategic_project_id = ?",
    [strategic, ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    }
  )
  console.log('strategic', ID)
  console.log('newstrategic', strategic)
}

const goalpro = (req, res) => {
  db.query("SELECT * FROM tbl_goal", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
}

const updategoal = (req, res) => {
  const ID = req.params.id;
  const goal = req.body.goal_id
  db.query(
    "UPDATE tbl_strategic_project SET goal_id = ? WHERE strategic_project_id = ?",
    [goal, ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    }
  )
  console.log('goal', ID)
  console.log('newgoal', goal)
}

const tacticpro = (req, res) => {
  db.query("SELECT * FROM tbl_tactic", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
}

const updatetactic = (req, res) => {
  const ID = req.params.id;
  const tactic = req.body.tactic_id
  db.query(
    "UPDATE tbl_strategic_project SET tactic_id = ? WHERE strategic_project_id = ?",
    [tactic, ID],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result)
      }
    }
  )
  console.log('tactic', ID)
  console.log('newtactic', tactic)
}

module.exports = { showstrategicplan, strategicplanpro, updatestrategicplan, strategicpro, updatestrategic, goalpro, updategoal, tacticpro, updatetactic }