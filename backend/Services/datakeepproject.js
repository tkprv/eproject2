const db = require('../config/dbConfig')
const request = require('request')

const project = (req, res) => {
    const ID = req.params.id;
    db.query("SELECT * FROM tbl_project LEFT JOIN tbl_user_project ON tbl_user_project.project_id = tbl_project.project_id WHERE tbl_user_project.user_id = ? AND tbl_project.status = 100",
        [ID], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        });
    console.log('id', ID)
}

const updateuserproject = (req, res) => {
    const ID = req.params.id;
    const user = req.body.user_id;
    db.query(
        "UPDATE tbl_user_project SET user_id = ? WHERE user_project_id = ?",
        [user, ID],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
    console.log('user', ID)
    console.log('newuser', user)
}

const updatestrategicplan = (req, res) => {
    const ID = req.params.id;
    const plan = req.body.plan_id;
    db.query(
        "UPDATE tbl_strategic_project SET plan_id = ? WHERE strategic_project_id = ?",
        [plan,ID],
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

const updatestrategic = (req, res) => {
    const ID = req.params.id;
    const strategic = req.body.strategic_id;
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

const updategoal = (req, res) => {
    const ID = req.params.id;
    const goal = req.body.goal_id;
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

const updatetactic = (req, res) => {
    const ID = req.params.id;
    const tactic = req.body.tactic_id;
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

const updateobjective = (req, res) => {
    const ID = req.params.id;
    const objective = req.body.objective_name;
    db.query(
        "UPDATE tbl_objective SET objective_name = ? WHERE objective_id = ?",
        [objective, ID],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
    console.log('objective', ID)
    console.log('newobjective', objective)
}

const updateindicpro = (req, res) => {
    const ID = req.params.id;
    const indic = req.body.indic_project;
    const unit = req.body.unit;
    const cost = req.body.cost;
    db.query(
        "UPDATE tbl_indic_project SET indic_project = ?, unit = ?, cost = ? WHERE indic_project_id = ?",
        [indic, unit, cost, ID],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
    console.log('indic', ID)
    console.log('newindic', indic)
    console.log('newunit', unit)
    console.log('newcost', cost)
}

const updatestep = (req, res) => {
    const ID = req.params.id;
    const step = req.body.step_name;
    const start = req.body.start;
    const stop = req.body.stop;
    db.query(
        "UPDATE tbl_step SET step_name = ?, start = ?, stop = ? WHERE step_id = ?",
        [step, start, stop, ID],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
    console.log('step', ID)
    console.log('newstep', step)
    console.log('newstart', start)
    console.log('newstop', stop)
}

const updatecharges = (req, res) => {
    const ID = req.params.id;
    const chargeshead = req.body.charges_name_head;
    const charges = req.body.charges_name;
    const quarterone = req.body.quarter_one;
    const quartertwo = req.body.quarter_two;
    const quarterthree = req.body.quarter_three;
    const quarterfour = req.body.quarter_four;
    db.query(
        "UPDATE tbl_charges SET  charges_name_head = ?, charges_name = ?, quarter_one = ?, quarter_two = ?, quarter_three = ?, quarter_four = ? WHERE charges_id = ?",
        [chargeshead, charges, quarterone, quartertwo, quarterthree, quarterfour, ID],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
    console.log('charges', ID)
    console.log('newchargeshead', chargeshead)
    console.log('newcharges', charges)
    console.log('newquaterone', quarterone)
    console.log('newquatertwo', quartertwo)
    console.log('newquaterthree', quarterthree)
    console.log('newquaterfour', quarterfour)
}

const updatebenefit = (req, res) => {
    const ID = req.params.id;
    const benefit = req.body.benefit_name;
    db.query(
        "UPDATE tbl_benefit SET benefit_name = ? WHERE benefit_id = ?",
        [benefit, ID],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
    console.log('benefit', ID)
    console.log('newbenefit', benefit)
}

module.exports = { project, updateuserproject, updatestrategicplan, updatestrategic, updategoal, updatetactic, updateobjective, updateindicpro, updatestep, updatecharges, updatebenefit }