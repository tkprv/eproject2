const db = require('../config/dbConfig')
const request = require('request')

const getproject = (req, res) => {
    const ID = req.params.id;
    db.query("SELECT * FROM tbl_project LEFT JOIN tbl_user_project ON tbl_user_project.project_id = tbl_project.project_id WHERE tbl_user_project.user_id = ?",
        [ID], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        });
    console.log('id', ID)
}

const projectleader = (req, res) => {
    const ID = req.params.id;
    db.query("SELECT * FROM tbl_project WHERE section_id = ?",
        [ID], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        });
    console.log('id', ID)
}

const fiscalyear = (req, res) => {
    db.query("SELECT * FROM tbl_fiscalyear", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
}

const project = (req, res) => {
    db.query("SELECT * FROM tbl_project", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
}

const fiscalyearandplannameproject = (req, res) => {
    const ID = req.params.id;
    db.query("SELECT * FROM tbl_fiscalyear WHERE fiscalyear_id = ?",
        [ID],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                Object.keys(result).forEach(function (key) {
                    var row = result[key];
                    res.send(row)
                })
            }
        });
}

const sectionproject = (req, res) => {

    const ID = req.params.id;
    db.query(
        "SELECT * FROM tbl_section WHERE section_id = ?",
        [ID],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                Object.keys(result).forEach(function (key) {
                    var row = result[key];
                    res.send(row)
                })
            }
        }
    )
}

const userproject = (req, res) => {
    const ID = req.params.id;
    db.query(
        "SELECT tbl_user_project.user_project_id, tbl_project.project_id, tbl_user.user_id, tbl_user.fname, tbl_user.lname FROM tbl_user_project LEFT JOIN tbl_project ON tbl_user_project.project_id = tbl_project.project_id LEFT JOIN tbl_user ON tbl_user_project.user_id = tbl_user.user_id WHERE tbl_user_project.project_id = ?",
        [ID],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
}

const strategicproject = (req, res) => {
    const ID = req.params.id;
    db.query(
        "SELECT * FROM tbl_strategic WHERE strategic_id = ?",
        [ID],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                Object.keys(result).forEach(function (key) {
                    var row = result[key];
                    res.send(row)
                })
            }
        }
    )
}

const goalproject = (req, res) => {
    const ID = req.params.id;
    db.query(
        "SELECT * FROM tbl_goal WHERE goal_id = ?",
        [ID],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                Object.keys(result).forEach(function (key) {
                    var row = result[key];
                    res.send(row)
                })
            }
        }
    )
}

const tacticproject = (req, res) => {
    const ID = req.params.id;
    db.query(
        "SELECT * FROM tbl_tactic WHERE tactic_id = ?",
        [ID],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                Object.keys(result).forEach(function (key) {
                    var row = result[key];
                    res.send(row)
                })
            }
        }
    )
}

const integrationproject = (req, res) => {
    const ID = req.params.id;
    db.query(
        "SELECT * FROM tbl_integration WHERE integration_id = ?",
        [ID],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                Object.keys(result).forEach(function (key) {
                    var row = result[key];
                    res.send(row)
                })
            }
        }
    )
}

const objectiveproject = (req, res) => {
    const ID = req.params.id;
    db.query(
        "SELECT tbl_project.project_id, tbl_objective.objective_id, tbl_objective.objective_name FROM tbl_objective LEFT JOIN tbl_project ON tbl_project.project_id = tbl_objective.project_id WHERE tbl_objective.project_id = ?",
        [ID],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
}

const indicproject = (req, res) => {
    const ID = req.params.id;
    db.query("SELECT tbl_indic_project.indic_project_id, tbl_indic_project.indic_project, tbl_indic_project.unit, tbl_indic_project.cost, tbl_project.project_id FROM tbl_indic_project LEFT JOIN tbl_project ON tbl_project.project_id = tbl_indic_project.project_id WHERE tbl_indic_project.project_id = ?",
        [ID],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
}

const stepproject = (req, res) => {
    const ID = req.params.id;
    db.query("SELECT tbl_step.step_id, tbl_step.step_name, tbl_step.start, tbl_step.stop, tbl_project.project_id FROM tbl_step LEFT JOIN tbl_project ON tbl_step.project_id = tbl_project.project_id WHERE tbl_step.project_id = ?",
        [ID],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
}

const workplanproject = (req, res) => {
    const ID = req.params.id;
    db.query(
        "SELECT * FROM tbl_workplan WHERE workplan_id = ?",
        [ID],
        (err, result) => {
            if (err) {
                console.log('11', err)
            } else {
                Object.keys(result).forEach(function (key) {
                    var row = result[key];
                    res.send(row)
                })
            }
        }
    )
}

const chargesproject = (req, res) => {
    const ID = req.params.id;
    db.query("SELECT tbl_charges.charges_id, tbl_charges.charges_name_head, tbl_charges.charges_name, tbl_charges.quarter_one, tbl_charges.quarter_two, tbl_charges.quarter_three, tbl_charges.quarter_four, tbl_project.project_id FROM tbl_charges LEFT JOIN tbl_project ON tbl_charges.project_id = tbl_project.project_id WHERE tbl_charges.project_id = ?",
        [ID],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
}

const benefitproject = (req, res) => {
    const ID = req.params.id;
    db.query(
        "SELECT tbl_benefit.benefit_id, tbl_benefit.benefit_name, tbl_project.project_id FROM tbl_benefit LEFT JOIN tbl_project ON tbl_benefit.project_id = tbl_project.project_id WHERE tbl_benefit.project_id = ?",
        [ID],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
}

const commentproject = (req, res) => {
    const ID = req.params.id;
    db.query(
        "SELECT tbl_comment.comment_id, tbl_comment.comment, tbl_comment.time_comment, tbl_comment.date_comment, tbl_project.project_id, tbl_user.user_id, tbl_user.fname, tbl_user.lname, tbl_user.director, tbl_user.manager, tbl_user.supervisor, tbl_user.supplies, tbl_user.responsible, tbl_user.admin FROM tbl_comment LEFT JOIN tbl_project ON tbl_comment.project_id = tbl_project.project_id LEFT JOIN tbl_user ON tbl_comment.user_id = tbl_user.user_id WHERE tbl_comment.project_id = ?",
        [ID],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
}

const confirmproject = (req, res) => {
    const ID = req.params.id;
    const status = req.body.status;
    db.query(
        "UPDATE tbl_project SET status = ? WHERE project_id = ?",
        [status, ID],
        (err, result) => {
            if (err) {
                console.log('11', err)
            } else {
                res.send(result)
            }
        }
    )
    console.log('status', ID)
    console.log('newstatus', status)
}

const noconfirmproject = (req, res) => {
    const ID = req.params.id;
    const status = req.body.status;
    db.query(
        "UPDATE tbl_project SET status = ? WHERE project_id = ?",
        [status, ID],
        (err, result) => {
            if (err) {
                console.log('12', err)
            } else {
                res.send(result)
            }
        }
    )
    console.log('status', ID)
    console.log('newstatus', status)
}

const comment = (req, res) => {
    const project = req.body.project_id
    const user = req.body.user_id
    const comment = req.body.comment;
    const comment_level = req.body.comment_level
    const time_comment = req.body.time_comment
    const date_comment = req.body.date_comment
    const comment_type = req.body.comment_type
    console.log('comment', req.body)
    db.query("INSERT INTO tbl_comment (project_id, user_id, comment, comment_level, time_comment, date_comment, comment_type) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [project, user, comment, comment_level, time_comment, date_comment, comment_type],
        (err, result) => {
            if (err) {
                console.log('13', err)
            } else {
                res.send("Values Inserted")
            }
        })
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

const updatestrategicpro = (req, res) => {
    const ID = req.params.id;
    const strategicpro = req.body.strategic_id;
    db.query(
        "UPDATE tbl_project SET strategic_id = ? WHERE project_id = ?",
        [strategicpro, ID],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
    console.log('strategic', ID)
    console.log('newstrategic', strategicpro)
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

const updategoalpro = (req, res) => {
    const ID = req.params.id;
    const goalpro = req.body.goal_id;
    db.query(
        "UPDATE tbl_project SET goal_id = ? WHERE project_id = ?",
        [goalpro, ID],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
    console.log('goal', ID)
    console.log('newgoal', goalpro)
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

const updatetacticpro = (req, res) => {
    const ID = req.params.id;
    const tacticpro = req.body.tactic_id;
    db.query(
        "UPDATE tbl_project SET tactic_id = ? WHERE project_id = ?",
        [tacticpro, ID],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
    console.log('tactic', ID)
    console.log('newtactic', tacticpro)
}

const projecttor = (req, res) => {
    db.query("SELECT * FROM tbl_project WHERE tor = 1", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
}

const deleteprojectid = (req, res) => {
    db.query("SELECT * FROM tbl_project", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
}

const deleteproject = (req, res) => {
    const ID = req.params.ID;
    db.query("DELETE FROM tbl_project WHERE project_id = ?", ID, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
}

const showproject = (req, res) => {
    const ID = req.params.id;
    console.log('id', ID)
    db.query("SELECT * FROM tbl_project WHERE project_id = ?", [ID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
}

const openreportone = (req, res) => {
    const ID = req.params.id;
    const openreportone = req.body.open_reportone;
    db.query(
        "UPDATE tbl_project SET open_reportone = ? WHERE project_id = ?",
        [openreportone, ID],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
    console.log('openreportone', ID)
    console.log('newopenreportone', openreportone)
}

const openreporttwo = (req, res) => {
    const ID = req.params.id;
    const openreporttwo = req.body.open_reporttwo;
    db.query(
        "UPDATE tbl_project SET open_reporttwo = ? WHERE project_id = ?",
        [openreporttwo, ID],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
    console.log('openreporttwo', ID)
    console.log('newopenreporttwo', openreporttwo)
}

const openreportthree = (req, res) => {
    const ID = req.params.id;
    const openreportthree = req.body.open_reportthree;
    db.query(
        "UPDATE tbl_project SET open_reportthree = ? WHERE project_id = ?",
        [openreportthree, ID],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
    console.log('openreportthree', ID)
    console.log('newopenreportthree', openreportthree)
}

const openreportfour = (req, res) => {
    const ID = req.params.id;
    const openreportfour = req.body.open_reportfour;
    db.query(
        "UPDATE tbl_project SET open_reportfour = ? WHERE project_id = ?",
        [openreportfour, ID],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
    console.log('openreportfour', ID)
    console.log('newopenreportfour', openreportfour)
}

const closeproject = (req, res) => {
    const ID = req.params.id;
    const closeproject = req.body.close_project;
    db.query(
        "UPDATE tbl_project SET close_project = ? WHERE project_id = ?",
        [closeproject, ID],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
    console.log('closeproject', ID)
    console.log('newcloseproject', closeproject)
}

module.exports = { getproject, projectleader, fiscalyear, project, fiscalyearandplannameproject, sectionproject, userproject, strategicproject, goalproject, tacticproject, integrationproject, objectiveproject, indicproject, stepproject, workplanproject, chargesproject, benefitproject, commentproject, confirmproject, noconfirmproject, comment, strategicpro, updatestrategicpro, goalpro, updategoalpro, tacticpro, updatetacticpro, projecttor, deleteprojectid, deleteproject, showproject, openreportone, openreporttwo, openreportthree, openreportfour, closeproject }