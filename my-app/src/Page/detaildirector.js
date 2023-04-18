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
import { ExclamationCircleFilled } from "@ant-design/icons"
import { Modal } from "antd"
import { Form } from "antd";
import { Panel } from 'primereact/panel';
import Reportproject from './reportproject';
import ExportButton from './doc'
const { confirm } = Modal

const Detaildirector = () => {
  const location = useLocation()
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
  const [comment, setComment] = useState('');
  const [commentproject, setCommentproject] = useState([]);
  const [id, setId] = useState("")
  const [notcomment, setNotcomment] = useState([]);
  const [times1, setTimes1] = useState()
  const [dates1, setDates1] = useState()
  const [times2, setTimes2] = useState()
  const [dates2, setDates2] = useState()
  const [value1, setValue1] = useState()
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [form] = Form.useForm();
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

  const toggleMobileMenu = () => {
    setMenu(!menu)
  }

  const showModal1 = () => {
    setOpen1(true);
  };

  const handleCancel1 = () => {
    setOpen1(false);
  };

  const showModal2 = () => {
    setOpen2(true);
  };

  const handleCancel2 = () => {
    setOpen2(false);
  };

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

  // const renderFooter1 = (name) => {
  //   return (
  //     <div>
  //       <Button label="ยกเลิก" icon="pi pi-times" className="p-button-danger" onClick={() => onHide(name)} />
  //       <Button label="อนุมัติ" icon="pi pi-check" className="p-button-success" onClick={() => confirmproject(location.state.project_id, 4)} />
  //     </div>
  //   );
  // }

  // const renderFooter2 = (name) => {
  //   return (
  //     <div>
  //       <Button label="ยกเลิก" icon="pi pi-times" className="p-button-danger" onClick={() => onHide(name)} />
  //       <Button label="ส่ง" icon="pi pi-check" className="p-button-success" style={{ width: '17%' }} onClick={() => noconfirmproject(location.state.project_id, 5)} />
  //     </div>
  //   );
  // }

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

  const sendEmailuser = async (status) => {
    try {
      await axios
        .get(`http://localhost:3001/sendEmail/emailtouserproject/${location.state.project_id}/${location.state.project_name}/${status}`, {})
        .then((res) => {
        });
    } catch (e) { }
  }

  const confirmproject = (id, n) => {
    axios
      .put(`http://localhost:3001/dataproject/confirmproject/${id}`, {
        status: n
      })
    sendEmailuser(n)
  }

  const noconfirmproject = async (id, n) => {
    handleCancel1()
    const time1 = moment(times1).add(543, 'year').format('h:mm:ss');
    const date1 = moment(dates1).add(543, 'year').format('YYYY-MM-DD')
    axios
      .put(`http://localhost:3001/dataproject/noconfirmproject/${id}`, {
        status: n
      })
    await iscomment(id, time1, date1)
    sendEmailuser(n)
  }

  const iscomment = async (id, time1, date1) => {
    axios
      .post(`http://localhost:3001/dataproject/comment`, {
        project_id: id,
        user_id: getLocalId(),
        comment: comment,
        comment_level: 1,
        time_comment: time1,
        date_comment: date1,
        comment_type: 1
      })
  }

  const notproject = async (id, n) => {
    handleCancel2()
    const time2 = moment(times2).add(543, 'year').format('h:mm:ss');
    const date2 = moment(dates2).add(543, 'year').format('YYYY-MM-DD')
    axios
      .put(`http://localhost:3001/dataproject/notproject/${id}`, {
        status: n
      })
    await isnotcomment(id, time2, date2)
  }

  const isnotcomment = async (id, time2, date2) => {
    axios
      .post(`http://localhost:3001/dataproject/notcomment`, {
        project_id: id,
        comment: comment,
        user_id: getLocalId(),
        time_comment: time2,
        date_comment: date2
      })
  }

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
  console.log('103', commentproject)

  const showConfirm1 = (value) => {
    confirm({
      title: "ต้องการอนุมัติโครงการใช่มั้ย?",
      icon: <ExclamationCircleFilled />,
      content: 'คุณต้องการอนุมัติโครงการนี้ไปยังผู้รับผิดชอบโครงการ',
      onOk() {
        console.log("OK");
        confirmproject(value, 4)
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }

  const showConfirm2 = (value) => {
    confirm({
      title: "ต้องการให้แก้ไขข้อมูลโครงการใช่มั้ย?",
      icon: <ExclamationCircleFilled />,
      onOk() {
        console.log("OK");
        noconfirmproject(value, 5)
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }

  const showConfirm3 = (value) => {
    confirm({
      title: "ต้องการไม่อนุมัติโครงการใช่มั้ย?",
      icon: <ExclamationCircleFilled />,
      onOk() {
        console.log("OK");
        notproject(value, 10)
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }

  return (
    <>
      <Header onMenuClick={(value) => toggleMobileMenu()} />
      <Sidebar />
      <div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>
        <div className="page-wrapper">
          <div className="tabview-demo">
            <div cstyle={{ marginTop: '2em' }} >
              <TabView>
                <TabPanel header="รายละเอียดโครงการ">
                  <Panel header='รายละเอียดโครงการ'>
                    <div className="fit">
                      <div className="grid p-fluid">
                        < Reportproject id={location.state.project_id} />
                        < ExportButton id={location.state.project_id} />
                      </div>
                    </div>
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
                        <div className="col-12 md:col-4">
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
                          <InputTextarea value={location.state.integra_subject} rows={5} cols={30} disabled />
                        </div>
                      </div>
                    </div>
                    <div className="fit">
                      <div className="grid p-fluid">
                        <div className="col-12 md:col-3">
                          <h4>หลักการและเหตุผล:</h4>
                        </div>
                        <div className="col-12 md:col-9">
                          <InputTextarea value={location.state.rationale} onChange={(e) => setValue1(e.target.value)} rows={8} cols={50} disabled />
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
                      <Button label="ย้อนกลับ" className="p-button-warning" onClick={() => history.push({ pathname: "/home/datadirector" })} />
                    </div>
                  </Panel>
                </TabPanel>
                <TabPanel header="พิจารณาโครงการ">
                  <Panel header='พิจารณาโครงการ'>
                    <div className="fit">
                      <div className="grid p-fluid">
                        <div className="col-12 md:col-2">
                          <h4>พิจารณาโครงการ :</h4>
                        </div>
                        <div className="col-12 md:col-9">
                          {(location.state.status === 0) ? <Tag className="mr-2" severity="warning" value="รอหัวหน้าฝ่ายพิจารณา" rounded></Tag> :
                            (location.state.status === 1) ? <Tag className="mr-2" severity="info" value="รอเจ้าหน้าที่ฝ่ายแผนตรวจสอบ" rounded></Tag> :
                              (location.state.status === 2) ? <Tag className="mr-2" severity="danger" value="ไม่ผ่านอนุมัติจากหัวหน้าฝ่าย" rounded></Tag> :
                                (location.state.status === 3) ? <div> <Button label="อนุมัติ" icon="pi pi-check" className="p-button-success" style={{ width: '8em', height: '2.5em' }} onClick={() => showConfirm1(location.state.project_id)} /> <Button label="แก้ไข" icon="pi pi-pencil" className="p-button-warning" style={{ marginLeft: '.5em', width: '8em', height: '2.5em' }} onClick={showModal1} /> <Button label="ไม่อนุมัติ" icon="pi pi-times" className="p-button-danger" style={{ marginLeft: '.5em', width: '8em', height: '2.5em' }} onClick={showModal2} /></div> :
                                  (location.state.status === 4) ? <Tag className="mr-2" severity="success" value="อนุมัติโครงการ" rounded></Tag> :
                                    <Tag className="mr-2" severity="danger" value="ไม่ผ่านอนุมัติจากผู้บริหาร" rounded></Tag>}

                          {/* <Dialog header="แน่ใจหรือไม่?" visible={confirm} onHide={() => onHide('confirm')} breakpoints={{ '950x': '75vw' }} style={{ width: '40vw' }} footer={renderFooter1('confirm')}>
                              <div className="field" style={{ 'textAlign': 'center' }}>
                                <i className="pi pi-exclamation-circle p-button-warning" style={{ 'fontSize': '8em', 'color': 'orange' }}></i>
                                <p style={{ marginTop: 25 }}><h5>คุณต้องการอนุมัติโครงการนี้ไปยังผู้รับผิดชอบโครงการ</h5></p>
                              </div>
                            </Dialog>
                          </div>
                          <div className="col-12 md:col-2">

                            <Dialog header="เนื่องจาก" visible={noconfirm} onHide={() => onHide('noconfirm')} breakpoints={{ '950x': '75vw' }} style={{ width: '40vw' }} footer={renderFooter2('noconfirm')}>
                              <InputTextarea value={comment} onChange={(e) => setComment(e.target.value)} rows={8} cols={71.5} />
                            </Dialog>
                          </div> */}
                          <div>
                            <Modal
                              title={<p className="m-0">{'เนื่องจาก'}</p>}
                              open={open1}
                              onCancel={handleCancel1}
                              footer={null}
                              width={600}
                            >
                              <InputTextarea value={comment} onChange={(e) => setComment(e.target.value)} rows={8} cols={69.2} />
                              <div className="text-right mt-4">
                                <Button label="ยกเลิก" icon="pi pi-times" className="p-button-danger" style={{ marginRight: '.5em', height: '2.5em', marginLeft: '19.5em' }} onClick={handleCancel1} />
                                <Button label="บันทึก" icon="pi pi-check" className="p-button-success" style={{ height: '2.5em' }} onClick={() => showConfirm2(location.state.project_id)} autoFocus />
                              </div>
                            </Modal>
                          </div>
                          <div>
                            <Modal
                              title={<p className="m-0">{'ไม่อนุมัติเนื่องจาก'}</p>}
                              open={open2}
                              onCancel={handleCancel2}
                              footer={null}
                              width={600}
                            >
                              <InputTextarea value={notcomment} onChange={(e) => setNotcomment(e.target.value)} rows={8} cols={69.2} />
                              <div className="text-right mt-4">
                                <Button label="ยกเลิก" icon="pi pi-times" className="p-button-danger" style={{ marginRight: '.5em', height: '2.5em', marginLeft: '19.5em' }} onClick={handleCancel2} />
                                <Button label="บันทึก" icon="pi pi-check" className="p-button-success" style={{ height: '2.5em' }} onClick={() => showConfirm3(location.state.project_id)} autoFocus />
                              </div>
                            </Modal>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Panel>
                </TabPanel>
                <TabPanel header="ความคิดเห็นโครงการ">
                  <Panel header='ความคิดเห็นโครงการ'>
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
                    <div style={{ marginTop: '2em', marginLeft: '82.5em' }} >
                      <Button label="ย้อนกลับ" className="p-button-warning" onClick={() => history.push({ pathname: "/home/datadirector" })} />
                    </div>
                  </Panel>
                </TabPanel>
              </TabView>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Detaildirector