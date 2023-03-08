import React, { useEffect, useState } from "react"
import axios from "axios"
import { Button } from "primereact/button";
import { Dialog } from 'primereact/dialog';
import moment from "moment";




const Sendproject = (props) =>{
  const {year,name,agency, value1,have, headpro , selectissue, selectgoa,tactic,typpj, updatepj, selectintegration, integrationdetail, newintegration, reason, object,indica,countunit,tagetvalue,targetgroup,rowsData,selectedbudget,workplan2,indic,inputFields,sake,moneyText,money} = props
  const [displayBasic, setDisplayBasic] = useState(false)
  console.log('props',props);

  const dialogFuncMap = {
    'displayBasic': setDisplayBasic,
    
}
const show = () => {
  // if(yesr === 'null'){
    
  // }
  //   
  setDisplayBasic(true);
}

const onHide = () => {
    setDisplayBasic(false);
}

     console.log('have',have)
    // console.log('name',name)
    // console.log('agency',agency)
    // console.log('wwww',value1.user_id)
    console.log('tor',have)
     console.log('sake',sake)
     console.log('moneyText',moneyText)
     console.log('money',money)
    //  console.log('typpj',typpj)
    // console.log('updatepj',updatepj)
    // console.log('selectintegration',selectintegration)
    // console.log('integrationdetail',integrationdetail)
    // console.log('newintegration',newintegration)
    // console.log('reasojjjjjjjn',reason)
    //console.log('object',object)
    //console.log('indica',indica)
    // console.log('countunit',countunit)
    // console.log('tagetvalue',tagetvalue)
    // console.log('targetgroup',targetgroup)
    //console.log('rowsData',rowsData)
    //console.log('indic',indic)
    
    const createProject = (year,name,agency, value1,have, headpro , selectissue, selectgoa,tactic,typpj, updatepj, selectintegration, integrationdetail, newintegration, reason, object,indica,countunit,tagetvalue,targetgroup,rowsData,selectedbudget,workplan2 )=> {
      

      console.log('h3',reason)

        try {
           axios.post('http://localhost:3001/newproject', {
            fiscalyear_id : year.fiscalyear_id ,
            section_id : agency, //ผู้ใช้
            strategic_id : selectissue.strategic_id , 
            goal_id : selectgoa.goal_id ,
            //tactic_id: tactic.tactic_id,//tactic_id ใส่ได้มากกว่า 1
            integration_id: selectintegration.integration_id  ,
            workplan_id: workplan2.workplan_id, 

            project_name: name,
            //plan_name_main:  null,
            type: updatepj ,
            integra_name: selectintegration === 'อื่นๆ' ? newintegration:selectintegration.integration_name , 
            integra_subject:  integrationdetail ,
            rationale: reason ,
            target_group: targetgroup,
            butget: money,
            butget_char: moneyText, 
            tor: have ==='มี' ? 1:0 ,
           // source: ,
            source_name: selectedbudget === 'ไม่ได้ใช้งบประมาณ' ? null: selectedbudget.name, 
            status: 1, //1
            out_plan: typpj === 'โครงการนอกแผน' ? 1 : 0,//ในนอก
              
          }).then((res) => {
            createindic(res.data.insertId)
            createStep(res.data.insertId)
            createUser(res.data.insertId,value1,headpro)
            createObject(res.data.insertId)
            createstrategicproject(res.data.insertId)
            
          })
          // if(tactic !== null){
          //   for(const value of tactic){
          //     const tacdata = value.tactic
          //     try {
          //     axios.post('http://localhost:3001/newprojectindic', {
          //       tactic_id: tacdata[0].tactic_id
          //     })
              
          // } 
          // catch (e) {
          //     //handle error
          // }
          //   }
          // }
        } 
        catch (e) {} 
      }
    const createindic =(id)=>{
      console.log('indic444',indic)
      try{
        axios.post('http://localhost:3001/newprojectindic',{
          project_id: id,
          indic_project: indica,
          unit: countunit,
          cost: tagetvalue
        })
        if(rowsData.length !== 0 && indic !== null){
          for(const value of indic){
            const tacdata = value.indic
            try {
            axios.post('http://localhost:3001/newprojectindic', {
              project_id: id,
              indic_project: value.indicname,
              unit: value.count,
              cost: value.goal
            })
            
        } 
        catch (e) {
        }
          }
        }

      }
      catch (e) {}
    }
    const createStep =(id)=>{
      for(const value of rowsData){
        const tacdata = value.rowsData
        const datess2 = moment(value.datestart).format('YYYY-MM-DD')
        const datess3 = moment(value.dateend).format('YYYY-MM-DD')

        try {
        axios.post('http://localhost:3001/newprojectstepe', {
          project_id: id,
          step_name: value.fullName,
          start: datess2,
          stop: datess3
        })
        
    } 
    catch (e) {
    }
      }

    }

    const createObject =(id)=>{
      for(const value of object){
        const tacdata = value.object

        try {
        axios.post('http://localhost:3001/newobjective', {
          project_id: id,
          objective_name: value.object
        })
        
        } 
        catch (e) {
        }
    }

    }

    const createUser =(id,user1,user2)=>{
      try{
        axios.post('http://localhost:3001/userproject',{
          project_id: id,
          user_id: user1.user_id
          
        })
        if(user2.length !== 0 &&user2 !== null){
          for(const value of user2){
            const tacdata = value.user2

            try {
            axios.post('http://localhost:3001/userproject', {
              project_id: id,
              user_id: value.headname.user_id
            })
            
        } 
        catch (e) {
        }
          }
        }
      }
      catch (e) {}
    }

    const createstrategicproject =(id)=>{
      for(const value of tactic){
        const tacdata = value.tactic

        try {
        axios.post('http://localhost:3001/strategicproject', {
          project_id: id,
          plan_id: year.fiscalyear_id,
          strategic_id: selectissue.strategic_id,
          goal_id:selectgoa.goal_id,
          tactic_id:value.tactic_id
        })
        
        } 
        catch (e) {
        }
    }
    }
    //ตาราง strategic_project เก็บพวกกลยุทธ  plan_id,strategic_id,goal_id,tactic_id
    //ตาราง indicproject indica,countunit,tagetvalue DON!!
    //step  rowsData  DON!!
    //userpro value1, headpro DON!!
    //objective  object DON!!
    //ประโยช 
   
    const confirm2 = (year,name,agency, value1, headpro , selectissue, selectgoa,tactic,typpj, updatepj, selectintegration, integrationdetail, newintegration, reason, object,indica,countunit,tagetvalue,targetgroup,rowsData,selectedbudget,workplan2) => {
      
      createProject(year,name,agency, value1, headpro , selectissue, selectgoa,tactic,typpj, updatepj, selectintegration, integrationdetail, newintegration, reason, object,indica,countunit,tagetvalue,targetgroup,rowsData,selectedbudget,workplan2)
  };


    const renderFooter = () => {
      return (
      
          <div>
              <Button label="No" icon="pi pi-times" onClick={onHide} className="p-button-text" />
              <Button label="Yes" icon="pi pi-check" onClick={()=>confirm2(year,name,agency, value1, headpro , selectissue, selectgoa,tactic,typpj, updatepj, selectintegration, integrationdetail, newintegration, reason, object,indica,countunit,tagetvalue,targetgroup,rowsData,selectedbudget,workplan2)} autoFocus />
          </div>
          
      
      );
  }
      return(
        <div>
          <Button label="ยืนยัน" icon="pi pi-plus"className="p-button-success" onClick={show}/>
          <Dialog style={{ width: '450px' }} header="สร้างโครงการมใหม่" modal className="p-fluid" visible={displayBasic} footer={renderFooter} onHide={onHide}>
                {/* <label htmlFor="description">หน่วยงานของผู้ใช้งาน</label> */}
                <div>
                </div>
                </Dialog>
        </div>
      )
    
  
  
}
export default Sendproject