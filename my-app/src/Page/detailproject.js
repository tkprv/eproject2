import React, { useState, useEffect } from 'react'
import { TabView, TabPanel } from 'primereact/tabview';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column'
import { Dialog } from 'primereact/dialog';
import { DataTable } from 'primereact/datatable'
import { InputTextarea } from 'primereact/inputtextarea';
import axios from 'axios'
import moment from "moment";
import { useLocation } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { Tag } from 'primereact/tag';
import { Card } from "primereact/card";
import Header from '../initialpage/Sidebar/header';
import Sidebar from '../initialpage/Sidebar/sidebar';
import { getLocalId } from '../helper/utill';

const Detailproject = () => {
  const location = useLocation()
  const [confirm, setConfirm] = useState('');
  const [noconfirm, setNoconfirm] = useState('');
  const [position, setPosition] = useState('center');
  const [sectionproject, setSectionproject] = useState([]);
  const [userproject, setUserproject] = useState([]);
  const [strategicplanproject, setStrategicplanproject] = useState([]);
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
  const [id, setId] = useState("")
  const [displayBasic, setDisplayBasic] = useState(false)
  const [times1, setTimes1] = useState()
  const [dates1, setDates1] = useState()
  const [value1, setValue1] = useState()
  const [menu, setMenu] = useState(false);
  let history = useHistory();

  console.log('44', location.state)
  useEffect(() => {
    getsection()
    getuser()
    getstrategicplan()
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
    'confirm': setConfirm,
    'noconfirm': setNoconfirm
  }

  const toggleMobileMenu = () => {
    setMenu(!menu)
  }

  const onClick = (name, position) => {
    dialogFuncMap[`${name}`](true);

    if (position) {
      setPosition(position);
    }
  }

  const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
  }

  const show = (id) => {
    setDisplayBasic(true);
    setId(id)

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

  const getstrategicplan = () => {
    axios
      .get(`http://localhost:3001/dataproject/strategicplanproject/${location.state.project_id}`, {})
      .then((res) => {
        console.log(res.data)
        setStrategicplanproject(res.data)
      }).catch((error) => {
        console.log(error)
      });
  }
  console.log('11', strategicplanproject)

  const getstrategic = async () => {
    await axios
      .get(`http://localhost:3001/dataproject/strategicproject/${location.state.project_id}`)
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
      .get(`http://localhost:3001/dataproject/goalproject/${location.state.project_id}`)
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
      .get(`http://localhost:3001/dataproject/tacticproject/${location.state.project_id}`)
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
  console.log('66', commentproject)

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
                  <div align="left">
                    <h3>รายละเอียดโครงการ</h3>
                    <Card>
                      <div className="fit">
                        <div className="grid p-fluid">
                          <div className="col-12 md:col-3">
                            <h4>ปีงบประมาณ :</h4>
                          </div>
                          <div className="col-12 md:col-9">
                            <h4> {location.state.fiscalyear} </h4>
                          </div>
                        </div>
                      </div>
                      <div className="fit">
                        <div className="grid p-fluid">
                          <div className="col-12 md:col-3">
                            <h4>ชื่อโครงการ :</h4>
                          </div>
                          <div className="col-12 md:col-9">
                            <h4> {location.state.project_name} </h4>
                          </div>
                        </div>
                      </div>
                      <div className="fit">
                        <div className="grid p-fluid">
                          <div className="col-12 md:col-3">
                            <h4>หน่วยงานที่รับผิดชอบโครงการ :</h4>
                          </div>
                          <div className="col-12 md:col-9">
                            <h4> {sectionproject?.section_name} </h4>
                          </div>
                        </div>
                      </div>
                      <div className="fit">
                        <div className="grid p-fluid">
                          <div className="col-12 md:col-3">
                            <h4>ผู้รับผิดชอบโครงการ :</h4>
                          </div>
                          <div className="col-12 md:col-9">
                            {userproject.map((value) => {
                              return <h4> {value?.fname + ' ' + value?.lname} </h4>
                            })}
                          </div>
                        </div>
                      </div>
                      <div className="fit">
                        <div className="grid p-fluid">
                          <div className="col-12 md:col-3">
                            <h4>ชื่อแผนยุทธ์ศาสตร์ :</h4>
                          </div>
                          <div className="col-12 md:col-9">
                            {strategicplanproject.map((value) => {
                              return <h4> {value?.plan_name} </h4>
                            })}
                          </div>
                        </div>
                      </div>
                      <div className="fit">
                        <div className="grid p-fluid">
                          <div className="col-12 md:col-4">
                            <h4 style={{ marginLeft: "9.5em" }}>ประเด็นยุทธ์ศาสตร์ :</h4>
                          </div>
                          <div className="col-12 md:col-6">
                            {strategicproject.map((value) => {
                              return <h4> {value?.strategic_name} </h4>
                            })}
                          </div>
                        </div>
                      </div>
                      <div className="fit">
                        <div className="grid p-fluid">
                          <div className="col-12 md:col-4">
                            <h4 style={{ marginLeft: "9.5em" }}>เป้าประสงค์ :</h4>
                          </div>
                          <div className="col-12 md:col-6">
                            {goalproject.map((value) => {
                              return <h4> {value?.goal_name} </h4>
                            })}
                          </div>
                        </div>
                      </div>
                      <div className="fit">
                        <div className="grid p-fluid">
                          <div className="col-12 md:col-4">
                            <h4 style={{ marginLeft: "9.5em" }}>กลยุทธ์ :</h4>
                          </div>
                          <div className="col-12 md:col-6">
                            {tacticproject.map((value) => {
                              return <h4> {value?.tactic_name} </h4>
                            })}
                          </div>
                        </div>
                      </div>
                      <div className="fit">
                        <div className="grid p-fluid">
                          <div className="col-12 md:col-3">
                            <h4>ประเภทของโครงการ :</h4>
                          </div>
                          <div className="col-12 md:col-9">
                            <h4> {(location.state.out_plan === 1) ? 'โครงการนอกแผน' : 'โครงการในแผน'} </h4>
                          </div>
                        </div>
                      </div>
                      <div className="fit">
                        <div className="grid p-fluid">
                          <div className="col-12 md:col-3">
                            <h4>ลักษณะโครงการ :</h4>
                          </div>
                          <div className="col-12 md:col-9">
                            <h4> {location.state.type} </h4>
                          </div>
                        </div>
                      </div>
                      <div className="fit">
                        <div className="grid p-fluid">
                          <div className="col-12 md:col-3">
                            <h4>การบูรณาการโครงการ :</h4>
                          </div>
                          <div className="col-12 md:col-9">
                            <h4> {integrationproject?.integration_name} </h4>
                            <InputTextarea value={location.state.integra_subject} rows={5} cols={30} />
                          </div>
                        </div>
                      </div>
                      <div className="fit">
                        <div className="grid p-fluid">
                          <div className="col-12 md:col-3">
                            <h4>หลักการและเหตุผล :</h4>
                          </div>
                          <div className="col-12 md:col-9">
                            <InputTextarea value={location.state.rationale} onChange={(e) => setValue1(e.target.value)} rows={8} cols={50} />
                          </div>
                        </div>
                      </div>
                      <div className="fit">
                        <div className="grid p-fluid">
                          <div className="col-12 md:col-3">
                            <h4>วัตถุประสงค์ :</h4>
                          </div>
                          <div className="col-12 md:col-9">
                            {objectiveproject.map((value) => {
                              return <h4> {value?.objective_name} </h4>
                            })}
                          </div>
                        </div>
                      </div>
                      <div className="fit">
                        <div className="grid p-fluid">
                          <div className="col-12 md:col-3">
                            <h4>ตัวชี้วัดความสำเร็จระดับโครงการ :</h4>
                          </div>
                          <div className="col-12 md:col-9">
                            <h4>
                              <DataTable value={indicproject} columnResizeMode="fit" showGridlines responsiveLayout="scroll" rows={10}>
                                <Column field="indic_project" header="ตัวชี้วัดความสำเร็จ" />
                                <Column field="unit" header="หน่วยนับ" />
                                <Column field="cost" header="ค่าเป้าหมาย" />
                              </DataTable>
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className="fit">
                        <div className="grid p-fluid">
                          <div className="col-12 md:col-3">
                            <h4>กลุ่มเป้าหมาย :</h4>
                          </div>
                          <div className="col-12 md:col-9">
                            <h4> {location.state.target_group} </h4>
                          </div>
                        </div>
                      </div>
                      <div className="fit">
                        <div className="grid p-fluid">
                          <div className="col-12 md:col-3">
                            <h4>ขั้นตอนการดำเนินการ :</h4>
                          </div>
                          <div className="col-12 md:col-9">
                            <h4>
                              <DataTable value={stepproject} columnResizeMode="fit" showGridlines responsiveLayout="scroll" rows={10}>
                                <Column field="step_name" header="ขั้นตอนการดำเนินการ/รายการกิจกรรม" />
                                <Column field="start" header="เริ่มต้น" />
                                <Column field="stop" header="สิ้นสุด" />
                              </DataTable>
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className="fit">
                        <div className="grid p-fluid">
                          <div className="col-12 md:col-3">
                            <h4>แหล่งเงิน/ประเภทงบประมาณที่ใช้ :</h4>
                          </div>
                          <div className="col-12 md:col-9">
                            <h4> {location.state.source_name} </h4>
                          </div>
                        </div>
                      </div>
                      <div className="fit">
                        <div className="grid p-fluid">
                          <div className="col-12 md:col-3">
                            <h4>ปริมาณการงบประมาณที่ใช้ :</h4>
                          </div>
                          <div className="col-12 md:col-9">
                            <h4> {location.state.butget} บาท</h4>
                          </div>
                        </div>
                      </div>
                      <div className="fit">
                        <div className="grid p-fluid">
                          <div className="col-12 md:col-3">
                            <h4>แผนงาน :</h4>
                          </div>
                          <div className="col-12 md:col-9">
                            <h4> {workplanproject?.workplan_name} </h4>
                          </div>
                        </div>
                      </div>
                      <div className="fit">
                        <div className="grid p-fluid">
                          <div className="col-12 md:col-3">
                            <h4>ประเภทการใช้จ่าย :</h4>
                          </div>
                          <div className="col-12 md:col-9">
                            <h4>
                              <DataTable value={chargesproject} columnResizeMode="fit" showGridlines responsiveLayout="scroll" rows={10}>
                                <Column field="charges_name_head" header="หัวข้อค่าใช้จ่าย" />
                                <Column field="charges_name" header="ประเภทค่าใช้จ่าย" />
                                <Column field="quarter_one" header="แผ่นการใช้จ่ายไตรมาส 1" />
                                <Column field="quarter_two" header="แผ่นการใช้จ่ายไตรมาส 2" />
                                <Column field="quarter_three" header="แผ่นการใช้จ่ายไตรมาส 3" />
                                <Column field="quarter_four" header="แผ่นการใช้จ่ายไตรมาส 4" />
                              </DataTable>
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className="fit">
                        <div className="grid p-fluid">
                          <div className="col-12 md:col-3">
                            <h4>ประโยชน์ที่คาดว่าจะได้รับ :</h4>
                          </div>
                          <div className="col-12 md:col-9">
                            {benefitproject.map((value) => {
                              return <h4> {value?.benefit_name} </h4>
                            })}
                          </div>
                        </div>
                      </div>
                      <div className="fit">
                        <div className="grid p-fluid">
                          <div className="col-12 md:col-3">
                            <h4>เอกสาร TOR :</h4>
                          </div>
                          <div className="col-12 md:col-9">
                            <h4>{location.state.tor === 0 ? <Tag className="mr-2" severity="danger" value="ยังไม่มีเอกสาร" rounded></Tag> : <i className="pi pi-file-pdf" style={{ fontSize: '2rem', color: 'red', marginRight: '.1em' }}></i>}</h4>
                          </div>
                        </div>
                      </div>
                      <div style={{ marginTop: '2em', marginLeft: '82.5em' }} >
                        <Button label="ย้อนกลับ" className="p-button-warning" onClick={() => history.push({ pathname: "/home/dataleader" })} />
                      </div>
                    </Card>
                  </div>
                </TabPanel>
                <TabPanel header="ความคิดเห็นโครงการ">
                  <div align="left">
                    <h3>ความคิดเห็นโครงการ</h3>
                    <Card>
                      <div className="fit">
                        <div className="grid p-fluid">
                          <div className="col-12 md:col-10">
                            <DataTable value={commentproject} columnResizeMode="fit" showGridlines responsiveLayout="scroll" dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}>
                              <Column field="comment" header="ความคิดเห็น" style={{ width: '25em' }} />
                              <Column field="fname" header="ชื่อ" style={{ width: '16em' }} />
                              <Column field="lname" header="นามสกุล" style={{ width: '16em' }} />
                              <Column body={workposition} header="ตำแหน่ง" style={{ width: '12em' }} />
                              <Column field="date_comment" header="วันที่แสดงความคิดเห็น" style={{ textAlign: 'center', width: '18em' }} />
                              <Column field="time_comment" header="เวลาที่แสดงความคิดเห็น" style={{ textAlign: 'center', width: '18em' }} />
                            </DataTable>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </TabPanel>
              </TabView>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Detailproject