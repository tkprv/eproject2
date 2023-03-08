import React, { useState, useEffect } from 'react'
import { TabView, TabPanel } from 'primereact/tabview';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { InputTextarea } from 'primereact/inputtextarea';
import axios from 'axios'
import { useLocation } from 'react-router-dom';
import { Tag } from 'primereact/tag';
import { useHistory } from "react-router-dom";
import Header from '../initialpage/Sidebar/header';
import Sidebar from '../initialpage/Sidebar/sidebar';
import { Card } from "primereact/card";

const Detailsupplies = () => {
  const location = useLocation()
  const [fiscalyearandplanname, setFiscalyearandplanname] = useState([]);
  const [sectionproject, setSectionproject] = useState([]);
  const [userproject, setUserproject] = useState([]);
  const [strategicproject, setStrategicproject] = useState([]);
  const [goalproject, setGoalproject] = useState([]);
  const [tacticproject, setTacticproject] = useState([]);
  const [integrationproject, setIntegrationproject] = useState([]);
  const [objectiveproject, setObjectiveproject] = useState([]);
  const [indicproject, setIndicproject] = useState([]);
  const [stepproject, setStepproject] = useState([]);
  const [workplanproject, setWorkplanproject] = useState([]);
  const [chargesproject, setChargesproject] = useState([]);
  const [benefitproject, setBenefitproject] = useState([]);
  const [commentproject, setCommentproject] = useState([]);
  const [displayBasic, setDisplayBasic] = useState(false);
  const [menu, setMenu] = useState(false);
  let history = useHistory();

  console.log('44', location.state)
  useEffect(() => {
    getfiscalyearandplanname()
    getsection()
    getuser()
    getstrategic()
    getgoal()
    gettactic()
    getintegration()
    getobjective()
    getindic()
    getstep()
    getworkplan()
    getcharges()
    getbenefit()
    getcomment()
  }, []);

  const dialogFuncMap = {
    'displayBasic': setDisplayBasic,
  }

  const toggleMobileMenu = () => {
    setMenu(!menu)
  }

  const workposition = (node) => {
    if (node.director === 1) {
      return 'ผู้บริหาร'
    } else if (node.manager === 1) {
      return 'เจ้าหน้าที่ฝ่ายแผน'
    } else if (node.supervisor === 1) {
      return 'หัวหน้าฝ่าย'
    } else if (node.supplies === 1) {
      return 'เจ้าหน้าที่พัสดุ'
    } else if (node.responsible === 1) {
      return 'ผู้รับผิดชอบโครงการ'
    } else if (node.admin === 1) {
      return 'ผู้ดูแลระบบ'
    }
  }

  const getfiscalyearandplanname = async () => {
    await axios
      .get(`http://localhost:3001/dataproject/fiscalyearandplannameproject/${location.state.fiscalyear_id}`)
      .then((res) => {
        console.log(res.data.fiscalyear)
        setFiscalyearandplanname(res.data)
      }).catch((error) => {
        console.log(error)
      });
  }
  console.log('11', fiscalyearandplanname?.fiscalyear)

  const getsection = async () => {
    axios
      .get(`http://localhost:3001/dataproject/sectionproject/${location.state.section_id}`, {})
      .then((res) => {
        console.log(res.data)
        setSectionproject(res.data)
      }).catch((error) => {
        console.log(error)
      });
  }
  console.log('section', sectionproject?.section_name)

  const getuser = () => {
    axios
      .get(`http://localhost:3001/dataproject/userproject/${location.state.project_id}`, {})
      .then((res) => {
        console.log(res.data)
        setUserproject(res.data)
      }).catch((error) => {
        console.log(error)
      });
  }
  console.log('22', userproject)

  const getstrategic = async () => {
    await axios
      .get(`http://localhost:3001/dataproject/strategicproject/${location.state.strategic_id}`)
      .then((res) => {
        console.log(res.data.data)
        setStrategicproject(res.data)
      }).catch((error) => {
        console.log(error)
      });
  }
  console.log('33', strategicproject?.strategic_name)

  const getgoal = async () => {
    await axios
      .get(`http://localhost:3001/dataproject/goalproject/${location.state.goal_id}`)
      .then((res) => {
        console.log(res.data.data)
        setGoalproject(res.data)
      }).catch((error) => {
        console.log(error)
      });
  }
  console.log('44', goalproject?.goal_name)

  const gettactic = async () => {
    await axios
      .get(`http://localhost:3001/dataproject/tacticproject/${location.state.tactic_id}`)
      .then((res) => {
        console.log(res.data.data)
        setTacticproject(res.data)
      }).catch((error) => {
        console.log(error)
      });
  }
  console.log('55', tacticproject?.tactic_name)

  const getintegration = async () => {
    await axios
      .get(`http://localhost:3001/dataproject/integrationproject/${location.state.integration_id}`)
      .then((res) => {
        console.log(res.data.data)
        setIntegrationproject(res.data)
      }).catch((error) => {
        console.log(error)
      });
  }
  console.log('66', integrationproject?.integration_name)

  const getobjective = async () => {
    await axios
      .get(`http://localhost:3001/dataproject/objectiveproject/${location.state.project_id}`)
      .then((res) => {
        console.log(res.data.data)
        setObjectiveproject(res.data)
      }).catch((error) => {
        console.log(error)
      });
  }
  console.log('77', objectiveproject)


  const getindic = () => {
    axios
      .get(`http://localhost:3001/dataproject/indicproject/${location.state.project_id}`, {})
      .then((res) => {
        console.log(res.data)
        setIndicproject(res.data)
      }).catch((error) => {
        console.log(error)
      });
  }
  console.log('88', indicproject)

  const getstep = () => {
    axios
      .get(`http://localhost:3001/dataproject/stepproject/${location.state.project_id}`, {})
      .then((res) => {
        console.log(res.data)
        setStepproject(res.data)
      }).catch((error) => {
        console.log(error)
      });
  }
  console.log('99', stepproject)

  const getworkplan = () => {
    axios
      .get(`http://localhost:3001/dataproject/workplanproject/${location.state.workplan_id}`, {})
      .then((res) => {
        console.log(res.data)
        setWorkplanproject(res.data)
      }).catch((error) => {
        console.log(error)
      });
  }
  console.log('100', workplanproject?.workplan_name)

  const getcharges = () => {
    axios
      .get(`http://localhost:3001/dataproject/chargesproject/${location.state.project_id}`, {})
      .then((res) => {
        console.log(res.data)
        setChargesproject(res.data)
      }).catch((error) => {
        console.log(error)
      });
  }
  console.log('101', chargesproject)

  const getbenefit = () => {
    axios
      .get(`http://localhost:3001/dataproject/benefitproject/${location.state.project_id}`, {})
      .then((res) => {
        console.log(res.data)
        setBenefitproject(res.data)
      }).catch((error) => {
        console.log(error)
      });
  }
  console.log('102', benefitproject?.benefit_name)

  const getcomment = async () => {
    await axios
      .get(`http://localhost:3001/dataproject/commentproject/${location.state.project_id}`)
      .then((res) => {
        console.log(res.data.data)
        setCommentproject(res.data)
      }).catch((error) => {
        console.log(error)
      });
  }
  console.log('103', location.state.tor)

  return (
    <>
      <Header onMenuClick={(value) => toggleMobileMenu()} />
      <Sidebar />
      <div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>
        <div className="page-wrapper">
          <div className="tabview-demo">
            <div style={{ marginTop: '2em' }} >
              <TabView>
                <TabPanel header="รายละเอียดโครงการ">
                  <p><h5 style={{ marginTop: '1em' }}>ปีงบประมาณ : {fiscalyearandplanname?.fiscalyear}</h5></p>
                  <p><h5 style={{ marginTop: '1.5em' }}>ชื่อโครงการ : {location.state.project_name}</h5></p>
                  {sectionproject !== undefined ? <p><h5 style={{ marginTop: '1.5em' }}>หน่วยงานที่รับผิดชอบโครงการ : {sectionproject?.section_name}</h5></p> : <h5>ไม่มีหน่วยงานที่รับผิดชอบ</h5>}
                  {userproject.map((value) => {
                    return <p><h5 style={{ marginTop: '1.5em' }}>ผู้รับผิดชอบโครงการ : {value?.fname + ' ' + value?.lname}</h5></p>
                  })}
                  <p><h5 style={{ marginTop: '1.5em' }}>ชื่อแผนยุทธ์ศาสตร์ : {fiscalyearandplanname?.plan_name}</h5></p>
                  <p><h5 style={{ marginTop: '1.5em', marginLeft: '8.5em' }}>ประเด็นยุทธ์ศาสตร์ : {strategicproject?.strategic_name}</h5></p>
                  <p><h5 style={{ marginTop: '1.5em', marginLeft: '8.5em' }}>เป้าประสงค์ : {goalproject?.goal_name}</h5></p>
                  <p><h5 style={{ marginTop: '1.5em', marginLeft: '8.5em' }}>กลยุทธ์ : {tacticproject?.tactic_name}</h5></p>
                  <p><h5 style={{ marginTop: '1.5em' }}>ประเภทของโครงการ : { }</h5></p>
                  <p><h5 style={{ marginTop: '1.5em' }}>ลักษณะโครงการ : {location.state.type}</h5></p>
                  <p>
                    <h5 style={{ marginTop: '1.5em' }}>การบูรณาการโครงการ : {integrationproject?.integration_name}</h5>
                    <InputTextarea value={location.state.integra_subject} style={{ marginLeft: '12.5em' }} rows={8} cols={80} />
                  </p>
                  <p>
                    <h5 style={{ marginTop: '1.5em' }}>หลักการและเหตุผล : </h5>
                    <InputTextarea value={location.state.rationale} style={{ marginLeft: '12.5em' }} rows={8} cols={80} />
                  </p>
                  {objectiveproject.map((value) => {
                    return <p><h5 style={{ marginTop: '1.5em' }}>วัตถุประสงค์ : {value?.objective_name}</h5></p>
                  })}
                  <p>
                    <h5 style={{ marginTop: '1.5em' }}>ตัวชี้วัดความสำเร็จระดับโครงการ</h5>
                    <DataTable value={indicproject} columnResizeMode="fit" showGridlines responsiveLayout="scroll" rows={10}>
                      <Column field="indic_project" header="ตัวชี้วัดความสำเร็จ" />
                      <Column field="unit" header="หน่วยนับ" />
                      <Column field="cost" header="ค่าเป้าหมาย" />
                    </DataTable>
                  </p>
                  <p><h5 style={{ marginTop: '1.5em' }}>กลุ่มเป้าหมาย : {location.state.target_group}</h5></p>
                  <p>
                    <h5 style={{ marginTop: '1.5em' }}>ขั้นตอนการดำเนินการ</h5>
                    <DataTable value={stepproject} columnResizeMode="fit" showGridlines responsiveLayout="scroll" rows={10}>
                      <Column field="step_name" header="ขั้นตอนการดำเนินการ/รายการกิจกรรม" />
                      <Column field="start" header="เริ่มต้น" />
                      <Column field="stop" header="สิ้นสุด" />
                    </DataTable>
                  </p>
                  <p><h5 style={{ marginTop: '1.5em' }}>แหล่งเงิน/ประเภทงบประมาณที่ใช้ : {location.state.source_name}</h5></p>
                  <p><h5 style={{ marginTop: '1.5em' }}>ปริมาณการงบประมาณที่ใช้ : {location.state.butget} บาท</h5></p>
                  <p><h5 style={{ marginTop: '1.5em' }} >แผนงาน : {workplanproject?.workplan_name}</h5></p>
                  <p>
                    <h5 style={{ marginTop: '1.5em' }}>ประเภทการใช้จ่าย</h5>
                    <DataTable value={chargesproject} columnResizeMode="fit" showGridlines responsiveLayout="scroll" rows={10}>
                      <Column field="charges_name_head" header="ประเภทค่าใช้จ่าย" />
                      <Column field="quarter_one" header="แผ่นการใช้จ่ายไตรมาส 1" />
                      <Column field="quarter_two" header="แผ่นการใช้จ่ายไตรมาส 2" />
                      <Column field="quarter_three" header="แผ่นการใช้จ่ายไตรมาส 3" />
                      <Column field="quarter_four" header="แผ่นการใช้จ่ายไตรมาส 4" />
                    </DataTable>
                  </p>
                  {benefitproject.map((value) => {
                    return <p><h5 style={{ marginTop: '1.5em' }}>ประโยชน์ที่คาดว่าจะได้รับ : {value?.benefit_name}</h5></p>
                  })}
                  <p><h5 style={{ marginTop: '1.5em' }}>เอกสาร TOR : {location.state.tor === 0 ? <Tag className="mr-2" severity="danger" value="ยังไม่มีเอกสาร" rounded></Tag> : <i className="pi pi-file-pdf" style={{ fontSize: '2rem', color: 'red', marginRight: '.1em' }}></i>}</h5></p>
                </TabPanel>
                <TabPanel header="ความคิดเห็น">
                  <DataTable value={commentproject} columnResizeMode="fit" showGridlines responsiveLayout="scroll" rows={10}>
                    <Column field="comment" header="ความคิดเห็น" />
                    <Column field="fname" header="ชื่อ" />
                    <Column field="lname" header="นามสกุล" />
                    <Column body={workposition} header="ตำแหน่ง" />
                    <Column field="date_comment" header="วันที่แสดงความคิดเห็น" />
                    <Column field="time_comment" header="เวลาที่แสดงความคิดเห็น" />
                  </DataTable>
                </TabPanel>
              </TabView>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Detailsupplies