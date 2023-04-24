const db = require('../config/dbConfig')
const request = require('request')
const { send } = require('express/lib/response')
const transporter = require('../config/sendEmail')
const SMTPConnection = require("nodemailer/lib/smtp-connection")
const nodemailer = require("nodemailer")
const multer = require('multer')
const path = require('path')

const email =(req,res) =>{ 
    const project_id = req.params.id
    const project_name = req.params.name
    const status = req.params.status
    db.query("SELECT email FROM tbl_user LEFT JOIN tbl_user_project on tbl_user.user_id = tbl_user_project.user_id WHERE project_id = ?  ",[project_id], (err, result) => {
      if (err) {
        console.log(err)
      } else {
        send_emailleader(result,project_id,project_name,status)
      }
    })
    if(status === "1"){
    db.query("SELECT email FROM tbl_user  WHERE manager = 1 ", (err, result) => {
        if (err) {
            console.log(err)
          } else {
            send_emailmanager(result,project_name)
          }
        })
  
 }
    
  }
  
  function send_emailleader(emailData, projecid, pjname, status) {
    let statusdata;
  if (status === "1") {
    statusdata = 'ผ่านการอนุมัติจากหัวหน้าฝ่าย';
  } else if (status === "2") {
    statusdata = 'ไม่ผ่านการอนุมัติจากหัวหน้าฝ่าย';
  }
  console.log(emailData);
    console.log("statusdata",status)

    for (let i = 0; i < emailData.length; i++) {
       
        console.log(statusdata)
      const email = emailData[i].email;
      const mailOptions = {
        from: 'eproject2@icit.kmutnb.ac.th',
        to: email,
        subject: `สถานะโครงการ ${pjname} `,
        text: `${pjname} ${statusdata}`
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
  

  function send_emailmanager(emailData,pjname) {
   
  for (let i = 0; i < emailData.length; i++) {
    const email = emailData[i].email;
    const mailOptions = {
      from: 'eproject2@icit.kmutnb.ac.th',
      to: email,
      subject: `โครงการใหม่ ${pjname} `,
      text: `${pjname} ผ่านการอนุมัติจากหัวหน้าฝ่าย `
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

  const emailDairector =(req,res) =>{ 
    const project_id = req.params.id
    const project_name = req.params.name
    db.query("SELECT email FROM tbl_user  WHERE director = 1 ", (err, result) => {
      if (err) {
        console.log(err)
      } else {
        send_emaildairector(result,project_id,project_name)
      }
    })
  }

  function send_emaildairector(emailData,project_id,pjname) {
      console.log();
    for (let i = 0; i < emailData.length; i++) {
      const email = emailData[i].email;
      const mailOptions = {
        from: 'eproject2@icit.kmutnb.ac.th',
        to: email,
        subject: `โครงการใหม่ ${pjname} `,
        text: `${pjname} ผ่านการอนุมัติจากหัวหน้าฝ่าย `
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

    const emailtouserproject =(req,res) =>{ 
        const project_id = req.params.id
        const project_name = req.params.name
        const status = req.params.status
        db.query("SELECT email FROM tbl_user LEFT JOIN tbl_user_project on tbl_user.user_id = tbl_user_project.user_id WHERE project_id = ?  ",[project_id], (err, result) => {
            if (err) {
            console.log(err)
          } else {
            send_emailuserproject(result,project_id,project_name,status)
        }
        })
      }
    
      function send_emailuserproject(emailData, projecid, pjname, status) {
        let statusdata;
        if (status === "4") {
          statusdata = 'ผ่านการอนุมัติจากผู้บริหาร';
        } else if (status === "5") {
          statusdata = 'ไม่ผ่านการอนุมัติจากผู้บริหาร';
        }
        console.log(emailData)
      
          for (let i = 0; i < emailData.length; i++) {
             
              console.log(statusdata)
            const email = emailData[i].email;
            const mailOptions = {
              from: 'eproject2@icit.kmutnb.ac.th',
              to: email,
              subject: `สถานะโครงการ ${pjname} `,
              text: `${pjname} ${statusdata} `
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
module.exports={email,emailDairector,emailtouserproject}
  

  