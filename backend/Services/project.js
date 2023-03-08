const db = require('../config/dbConfig')
const request = require('request')


    
const workplan = (req,res)=> {
    db.query("SELECT * FROM  tbl_workplan ", (err, result) => {
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
  const out_plan = req.body.out_plan //โครงการนอกแผน
  ///รายงานความก้าวหน้าแต่ละไตรมาส 
  //จำนวนเงิน
  db.query("INSERT INTO tbl_project (fiscalyear_id,section_id,strategic_id,goal_id,tactic_id,integration_id,workplan_id,project_name,type,integra_name,integra_subject,rationale,target_group,butget,butget_char,tor,source_name,status,out_plan) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ",
  [year,section_id,strategic_id,goal_id,tactic_id,integration_id,workplan_id,project_name,type,integra_name,integra_subject,rationale,target_group,butget,butget_char,tor,source_name,status,out_plan],
  (err, result) => {
    if (err) {
      console.log('5',err);
    } else {
      res.send(result);
    }

  })
  console.log("fiscalyear_id",year)
  console.log('section_id',section_id)
  console.log('srategic',strategic_id)
  console.log('goal_id',goal_id)
  console.log('tactic_id',tactic_id)
  console.log('integration_id',integration_id)
  console.log('workplan_id',workplan_id)
  console.log('project_name',project_name)
  console.log('rationale',rationale)
  console.log('integra_subject',integra_subject)

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
//obtain อัพเดต
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

  db.query("INSERT INTO tbl_strategic_project(project_id,plan_id,strategic_id,goal_id,tactic_id) VALUES (?,?,?,?,?) ",
    [projectid, planid, stid, goalid, tacid],
    (err, result) => {
      if (err) {
        console.log('5', err);
      } else {
        res.send(result);
      }

    });
}
// const email =(req,res) =>{
//   const id = req.body.user_id
//   db.query("SELECT * FROM tbl_user WHERE user_id =?", [id], (err, result) => {
//     if (err) {
//       console.log(err)
//     } else {
//       console.log(result)
//     }
//   })


// }


module.exports={workplan,workplan222,integration,getSection,newproject22222,newprojectindic,newprojectstepe,newobjective,userproject,strategicproject}
  