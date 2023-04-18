const db = require('../config/dbConfig')
const request = require('request')
const { send } = require('express/lib/response')
const transporter = require('../config/sendEmail')
const SMTPConnection = require("nodemailer/lib/smtp-connection")
const nodemailer = require("nodemailer")
    
const workplan = (req,res)=> {
    db.query("SELECT * FROM  tbl_workplan ", (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      })
    
} 
const Findplan = (req, res) => {
  const yaer = req.body.year
  db.query("SELECT * FROM  tbl_fiscalyear LEFT JOIN tbl_strategic ON tbl_fiscalyear.fiscalyear_id =tbl_strategic.fiscalyear_id LEFT JOIN tbl_goal ON  tbl_strategic.strategic_id = tbl_goal.strategic_id LEFT JOIN tbl_tactic ON tbl_goal.goal_id = tbl_tactic.goal_id  WHERE  flag = 1 and fiscalyear = ?   ",[yaer], (err, result) => {
    if (err) {
      console.log(err); 
    } else {
      res.send(result);
    }
  })
}

const Planname = (req, res) => {
  const yaer = req.body.year
  db.query("SELECT * FROM  tbl_fiscalyear WHERE  flag = 1   ", (err, result) => {
    if (err) {
      console.log(err); 
    } else {
      res.send(result);
    }
  })
}
const workplan222 = (req,res)=> {
  res.send('555')
  
} 
const getSection = (req,res)=> {
  const ID =  req.body.section_id
  db.query("SELECT * FROM tbl_section WHERE section_id =?", [ID], (err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
    }
  })
  
}
const integration = (req,res)=> {
    db.query("SELECT * FROM  tbl_integration ", (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      })
}

const newproject22222 = (req,res)=> {
  console.log(req.body)
  
  
  const year = req.body.fiscalyear_id
  const section_id = req.body.section_id
  const strategic_id = req.body.strategic_id
  const goal_id = req.body.goal_id
  const tactic_id = req.body.tactic_id
  const integration_id = req.body.integration_id
  const workplan_id = req.body.workplan_id
  const project_name = req.body.project_name
  //const plan_name_main = req.body.plan_name_main
  const type = req.body.type
  const integra_name = req.body.integra_name
  const integra_subject = req.body.integra_subject
  const rationale = req.body.rationale
  const target_group = req.body.target_group
  const butget = req.body.butget  //ประมาณการงบประมาณที่ใช้
  const butget_char = req.body.butget_char //ประมาณการงบประมาณที่ใช้ ถ้วน
  const tor = req.body.tor
  //const source = req.body.source //ไอดีงบ
  const source_name = req.body.source_name //ชื่องบ
  const  status = req.body.status // สถานะเจค 
  const out_plan = req.body.out_plan
     console.log(workplan_id);
  db.query("INSERT INTO tbl_project (fiscalyear,section_id,integration_id,workplan_id,project_name,type,integra_name,integra_subject,rationale,target_group,butget,butget_char,tor,source_name,status,out_plan) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ",
  [year,section_id,integration_id,workplan_id,project_name,type,integra_name,integra_subject,rationale,target_group,butget,butget_char,tor,source_name,status,out_plan],
  (err, result) => {
    if (err) {
      console.log('5',err);
    } else {
      res.send(result);
    }

  })

}


const newprojectindic = (req,res)=> {
  const projectid = req.body.project_id
  const indic = req.body.indic_project
  const unit = req.body.unit
  const cost = req.body.cost
  //result_indic_project  ไว้เพิ่มตอนอัพเดต
  db.query("INSERT INTO tbl_indic_project (project_id,indic_project,unit,cost) VALUES (?,?,?,?) ",
  [projectid,indic,unit,cost],
  (err, result) => {
    if (err) {
      console.log('5',err);
    } else {
      res.send(result);
    }

  })
}



const newprojectstepe = (req,res)=> {
  const projectid = req.body.project_id
  const stepname = req.body.step_name
  const start = req.body.start
  const stop = req.body.stop
  db.query("INSERT INTO tbl_step (project_id,step_name,start,stop) VALUES (?,?,?,?) ",
  [projectid,stepname,start,stop],
  (err, result) => {
    if (err) {
      console.log('5',err);
    } else {
      res.send(result);
    }

  })
}

const newobjective = (req,res)=> {
  const projectid = req.body.project_id
  const name = req.body.objective_name
  db.query("INSERT INTO tbl_objective(project_id,objective_name) VALUES (?,?) ",
  [projectid,name],
  (err, result) => {
    if (err) {
      console.log('5',err);
    } else {
      res.send(result);
    }

  })
  console.log('nameob',name)
}


const userproject = (req,res)=> {
  const projectid = req.body.project_id
  const user_id = req.body.user_id
  db.query("INSERT INTO tbl_user_project (project_id,user_id) VALUES (?,?) ",
  [projectid,user_id],
  (err, result) => {
    if (err) {
      console.log('5',err);
    } 
    else{
      res.send(result);
    }
  })
}




function strategicproject(req, res) {
  const projectid = req.body.project_id;
  const planid = req.body.plan_id;
  const stid = req.body.strategic_id;
  const goalid = req.body.goal_id;
  const tacid = req.body.tactic_id;

  console.log(tacid)

  // db.query("INSERT INTO tbl_strategic_project(project_id,plan_id,strategic_id,goal_id,tactic_id) VALUES (?,?,?,?,?) ",
  //   [projectid, planid, stid, goalid, tacid],
  //   (err, result) => {
  //     if (err) {
  //       console.log('5', err);
  //     } else {
  //       res.send(result);
  //     }

  //   });
let values = [];
for (let i = 0; i < tacid.length; i++) {
  values.push(projectid, planid, stid, goalid, tacid[i]);
}

let placeholders = '';
for (let i = 0; i < tacid.length; i++) {
  placeholders += '(?,?,?,?,?),';
}
placeholders = placeholders.slice(0, -1);

console.log(values)
console.log(placeholders);
const sql = `INSERT INTO tbl_strategic_project(project_id,plan_id,strategic_id,goal_id,tactic_id) VALUES ${placeholders}`;

db.query(sql, values, (err, result) => {
  if (err) {
    console.log('Error:', err);
  } else {
    console.log('Result:', result);
  }
});
  // const projectid = req.body.project_id;
  // const planid = req.body.plan_id;
  // const stid = req.body.strategic_id;
  // const goalid = req.body.goal_id;
  // const tacid = req.body.tactic_id;

  // console.log(tacid);

  // db.query(
  //   "INSERT INTO tbl_strategic_project(project_id,plan_id,strategic_id,goal_id) VALUES (?,?,?,?) ",
  //   [projectid, planid, stid, goalid],
  //   (err, result) => {
  //     if (err) {
  //       console.log(err);
  //       res.status(500).send("Internal server error");
  //     } else {
  //       if (tacid.length > 1) {
  //         for (let i = 1; i < tacid.length; i++) {
  //           db.query(
  //             "INSERT INTO tbl_additional_data(project_id,tactic_id,additional_data) VALUES (?,?,?)",
  //             [projectid, tacid[i], "additional data for tactic " + (i + 1)],
  //             (err, result) => {
  //               if (err) {
  //                 console.log(err);
  //                 res.status(500).send("Internal server error");
  //               }
  //             }
  //           );
  //         }
  //       }
  //       res.send(result);
  //     }
  //   }
  // )
}
//createbenefit
function createbenefit(req, res) {
  const projectid = req.body.project_id
  const benefit = req.body.benefit_name

  db.query("INSERT INTO tbl_benefit(project_id,benefit_name) VALUES (?,?) ",
    [projectid, benefit],
    (err, result) => {
      if (err) {
        console.log('5', err);
      } else {
        res.send(result);
      }

    });
}

function chargesproject(req, res) {
  const projectid = req.body.project_id
  const chargesname = req.body.charges_name_head
  const catname = req.body.charges_name
  const quarterone = req.body.quarter_one
  const quartertwo = req.body.quarter_two
  const quarterthree = req.body.quarter_three
  const  quarterfour = req.body.quarter_four


  console.log(quarterone)

  db.query("INSERT INTO tbl_charges(project_id,charges_name_head,charges_name,quarter_one,quarter_two,quarter_three,quarter_four) VALUES (?,?,?,?,?,?,?) ",
    [projectid, chargesname, catname, quarterone, quartertwo,quarterthree,quarterfour],
    (err, result) => {
      if (err) {
        console.log('5', err);
      } else {
        res.send(result);
      }

    });
}

const email =(req,res) =>{ 
  const id_project = req.params.id
  const project_name = req.params.name
  db.query("SELECT email FROM tbl_user WHERE supervisor = 1 ", (err, result) => {
    if (err) {
      console.log(err)
    } else {
      send_email(result,id_project,project_name)
    }
  })
  console.log("id_project",id_project);
  console.log("id_project",project_name);

}

function send_email(emailData,projecid,pjname) {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'eproject2@icit.kmutnb.ac.th',
      pass: 'ukixewpnjnydxpnm'
    }
})

for (let i = 0; i < emailData.length; i++) {
  const email = emailData[i].email;
  const mailOptions = {
    from: 'eproject2@icit.kmutnb.ac.th',
    to: email,
    subject: `โครงการใหม่ ${pjname}`,
    text: `${pjname}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
}


module.exports={createbenefit,Planname,Findplan,chargesproject,send_email,email,workplan,workplan222,integration,getSection,newproject22222,newprojectindic,newprojectstepe,newobjective,userproject,strategicproject}