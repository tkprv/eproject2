const db = require('../config/dbConfig')
const request = require('request')
// const b64string = require('./docxHML')

const getreportst = (req,res)=> {
    db.query("SELECT project_name,fiscalyear,section_name,status FROM  tbl_project LEFT JOIN tbl_section on tbl_project.section_id  = tbl_section.section_id  ", (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      })
    
} 

const getfiscalyear  = (req,res)=> {
    db.query("SELECT fiscalyear_id,fiscalyear FROM tbl_fiscalyear ", (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      })
    
} 
const getsection  = (req,res)=> {
    db.query("SELECT section_id,section_name FROM tbl_section ", (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      })
    
} 

const getstatus = (req,res)=> {
    db.query("SELECT project_id,status FROM  tbl_project ", (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      })
    
} 

const getreportquarter = (req,res)=> {
  db.query("SELECT project_name,fiscalyear,section_name,quarter,period_check FROM  tbl_project LEFT JOIN tbl_section on tbl_project.section_id  = tbl_section.section_id JOIN tbl_report on tbl_project.project_id = tbl_report.project_id ", (err, result) => {
      if (err) {
        console.log(err); ///LEFT JOIN tbl_fiscalyear on tbl_project.fiscalyear = tbl_fiscalyear.fiscalyear 
      } else {
        res.send(result);
      }
    })
  
} 

const getreportplanyear = (req,res)=> {
  const planid = req.body.plan_id
  const strategicid = req.body.strategic_id
  const goalid = req.body.goal_id
  const tacticid = req.body.tactic_id
  db.query("SELECT * FROM tbl_project LEFT JOIN tbl_strategic_project on tbl_project.project_id = tbl_strategic_project.project_id LEFT JOIN tbl_section on tbl_project.section_id  = tbl_section.section_id LEFT JOIN tbl_step ON tbl_project.project_id = tbl_step.project_id  WHERE plan_id = ?  AND strategic_id = ? AND goal_id =? AND tactic_id = ? ", [planid,strategicid,goalid,tacticid], (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
  
} 

const getreportplanQ= (req,res)=> {
  const planid = req.body.plan_id
  const quarter = req.body.quartername
  db.query("SELECT * FROM tbl_project LEFT JOIN tbl_section ON tbl_project.section_id = tbl_section.section_id LEFT JOIN tbl_strategic_project on tbl_project.project_id = tbl_strategic_project.project_id LEFT JOIN tbl_charges ON tbl_project.project_id = tbl_charges.project_id LEFT JOIN tbl_indic_project ON tbl_project.project_id = tbl_indic_project.project_id LEFT JOIN tbl_report ON tbl_project.project_id = tbl_report.project_id LEFT JOIN tbl_detail ON tbl_report.report_id = tbl_detail.report_id LEFT JOIN tbl_problem ON tbl_report.report_id = tbl_problem.report_id WHERE plan_id = ?  AND quarter = ?  ", [planid,quarter], (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
      //console.log(result);
    }
  })
  
} 
const getreportproject = (req,res) => {
  const idproject = req.body.project_id
  db.query('SELECT * from tbl_project LEFT JOIN tbl_section ON tbl_project.section_id = tbl_section.section_id LEFT JOIN tbl_workplan on tbl_project.workplan_id = tbl_workplan.workplan_id WHERE project_id = ?',[idproject], (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })


}
const getuserproject = (req,res) => {
  const idproject = req.body.project_id
  db.query('SELECT * from tbl_user_project LEFT JOIN tbl_user ON tbl_user_project.user_id = tbl_user.user_id WHERE project_id = ?',[idproject], (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })

}

const getobjectproject = (req,res) => {
  const idproject = req.body.project_id
  db.query('SELECT * from tbl_objective WHERE project_id = ?',[idproject], (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })

}
const getindicproject = (req,res) => {
  const idproject = req.body.project_id
  db.query('SELECT * from tbl_indic_project WHERE project_id = ?',[idproject], (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })

}
const getstepproject = (req,res) => {
  const idproject = req.body.project_id
  db.query('SELECT * from tbl_step WHERE project_id = ?',[idproject], (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })

}
const getbenefit = (req,res) => {
  const idproject = req.body.project_id
  db.query('SELECT * from tbl_benefit WHERE project_id = ?',[idproject], (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })

}
const getplanproject = (req,res) => {
  const idproject = req.body.project_id
  db.query('SELECT * from tbl_strategic_project LEFT JOIN tbl_fiscalyear on tbl_strategic_project.plan_id = tbl_fiscalyear.fiscalyear_id LEFT JOIN tbl_strategic on  tbl_strategic_project.strategic_id = tbl_strategic.strategic_id LEFT JOIN tbl_goal ON  tbl_strategic_project.goal_id = tbl_goal.goal_id LEFT JOIN tbl_tactic ON tbl_strategic_project.tactic_id = tbl_tactic.tactic_id  WHERE project_id = ?',[idproject], (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })

}
const getbuggest = (req,res) => {
  const idproject = req.body.project_id
  db.query('SELECT * from tbl_project LEFT JOIN tbl_charges on tbl_project.project_id = tbl_charges.project_id WHERE tbl_project.project_id = ?',[idproject], (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
}

const word = async (req,res) => {
  res.setHeader("Content-Disposition", "attachment; filename=My Document.docx");
  res.send(Buffer.from(await b64string, "base64"))
}

module.exports={getbuggest,getplanproject,word,getbenefit,getstepproject,getindicproject,getobjectproject,getreportproject,getuserproject,getreportplanQ,getreportplanyear,getreportst,getfiscalyear,getsection,getstatus,getreportquarter}
