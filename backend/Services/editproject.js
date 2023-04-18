const db = require('../config/dbConfig')
const request = require('request')

const strategicid = (req, res) => {
    db.query("SELECT * FROM  tbl_strategic LEFT JOIN tbl_fiscalyear on tbl_strategic.fiscalyear_id = tbl_fiscalyear.fiscalyear_id ", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
}

const strategic = (req, res) => {
    db.query("SELECT * FROM tbl_fiscalyear ", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
}


const sectionpro = (req, res) => {
    db.query("SELECT * FROM tbl_section", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
}

const showuserpro = (req, res) => {
    const ID = req.params.id
    console.log('id', ID)
    db.query("SELECT * FROM tbl_user_project WHERE user_project_id = ?",
        [ID], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        });
}
const userpro = (req, res) => {
    db.query("SELECT * FROM tbl_user", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
}

const updateuserproject = (req, res) => {
    const ID = req.params.id;
    const user = req.body.user_id
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

const integrationpro = (req, res) => {
    db.query("SELECT * FROM tbl_integration", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
}

const showobjective = (req, res) => {
    const ID = req.params.id
    console.log('id', ID)
    db.query("SELECT * FROM tbl_objective WHERE objective_id = ?", [ID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
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

const showindicpro = (req, res) => {
    const ID = req.params.id
    console.log('id', ID)
    db.query("SELECT * FROM tbl_indic_project WHERE indic_project_id = ?", [ID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
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

const showstep = (req, res) => {
    const ID = req.params.id
    console.log('id', ID)
    db.query("SELECT * FROM tbl_step WHERE step_id = ?", [ID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
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

const workplanpro = (req, res) => {
    db.query("SELECT * FROM tbl_workplan", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
}

const showchargeshead = (req, res) => {
    const ID = req.params.id
    console.log('id', ID)
    db.query("SELECT * FROM tbl_charges WHERE charges_id = ?", [ID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
}

const updatechargeshead = (req, res) => {
    const ID = req.params.id;
    const chargeshead = req.body.charges_name_head;
    db.query(
        "UPDATE tbl_charges SET charges_name_head = ? WHERE charges_id = ?",
        [chargeshead, ID],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
    console.log('chargeshead', ID)
    console.log('newchargeshead', chargeshead)
}

const updatecharges = (req, res) => {
    const ID = req.params.id;
    const charges = req.body.charges_name;
    const quarterone = req.body.quarter_one;
    const quartertwo = req.body.quarter_two;
    const quarterthree = req.body.quarter_three;
    const quarterfour = req.body.quarter_four;
    db.query(
        "UPDATE tbl_charges SET charges_name = ?, quarter_one = ?, quarter_two = ?, quarter_three = ?, quarter_four = ? WHERE charges_id = ?",
        [charges, quarterone, quartertwo, quarterthree, quarterfour, ID],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
    console.log('charges', ID)
    console.log('newcharges', charges)
    console.log('newquaterone', quarterone)
    console.log('newquatertwo', quartertwo)
    console.log('newquaterthree', quarterthree)
    console.log('newquaterfour', quarterfour)
}

const showbenefit = (req, res) => {
    const ID = req.params.id
    console.log('id', ID)
    db.query("SELECT * FROM tbl_benefit WHERE benefit_id = ?", [ID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
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

const updateproject = (req, res) => {
    const ID = req.params.id;
    const fiscalyear = req.body.fiscalyear
    const section = req.body.section_id;
    const integration = req.body.integration_id;
    const workplan = req.body.workplan_id;
    const kind = req.body.type;
    const integraname = req.body.integra_name;
    const integrasubject = req.body.integra_subject;
    const rationale = req.body.rationale;
    const targetgroup = req.body.target_group;
    const butget = req.body.butget;
    const butgetchar = req.body.butget_char;
    const tor = req.body.tor;
    const sourcename = req.body.source_name;
    const type = req.body.out_plan;
    const status = req.body.status;
    db.query(
        "UPDATE tbl_project SET fiscalyear = ?, section_id = ?, integration_id = ?, workplan_id = ?, type = ?, integra_name = ?, integra_subject = ?, rationale = ?, target_group = ?, butget = ?, butget_char = ?, tor = ?, source_name = ?, out_plan = ?, status = ? WHERE project_id = ?",
        [fiscalyear, section, integration, workplan, kind, integraname, integrasubject, rationale, targetgroup, butget, butgetchar, tor, sourcename, type, status, ID],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
    console.log('id', ID)
    console.log('newfiscalyear', fiscalyear)
    console.log('newsection', section)
    console.log('newintegration', integration)
    console.log('newworkplan', workplan)
    console.log('newkind', kind)
    console.log('newintegraname', integraname)
    console.log('newintegrasubject', integrasubject)
    console.log('newrationale', rationale)
    console.log('newtargetgroup', targetgroup)
    console.log('newbutget', butget)
    console.log('newbutgetchar', butgetchar)
    console.log('newtor', tor)
    console.log('newsourcename', sourcename)
    console.log('newtype', type)
    console.log('newstatus', status)
}

module.exports = { strategicid, strategic, sectionpro, showuserpro, userpro, updateuserproject, integrationpro, showobjective, updateobjective, showindicpro, updateindicpro, showstep, updatestep, workplanpro, showchargeshead, updatechargeshead, updatecharges, showbenefit, updatebenefit, updateproject }