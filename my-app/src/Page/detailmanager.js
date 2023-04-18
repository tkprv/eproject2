import React, { useState, useEffect, useRef } from 'react'
import { TabView, TabPanel } from 'primereact/tabview';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column'
import { Dialog } from 'primereact/dialog';
import { DataTable } from 'primereact/datatable'
import { InputTextarea } from 'primereact/inputtextarea';
import axios from 'axios'
import moment from "moment";
import { useLocation } from 'react-router-dom';
import { Tag } from 'primereact/tag';
import { useHistory } from "react-router-dom";
import { Card } from "primereact/card";
import { Dropdown } from 'primereact/dropdown';
import Header from '../initialpage/Sidebar/header';
import Sidebar from '../initialpage/Sidebar/sidebar';
import { getLocalId } from '../helper/utill';
import { Panel } from 'primereact/panel';
import { ExclamationCircleFilled } from "@ant-design/icons"
import { Modal } from "antd";
import { Form, Input } from "antd";
import Reportproject from './reportproject';
import ExportButton from './doc'

const { confirm } = Modal;

const Detailmanager = () => {
  const location = useLocation()
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
  const [comment, setComment] = useState('');
  const [commentproject, setCommentproject] = useState([]);
  const [id, setId] = useState("")
  const [displayBasic1, setDisplayBasic1] = useState(false)
  const [displayBasic2, setDisplayBasic2] = useState(false)
  const [displayBasic3, setDisplayBasic3] = useState(false)
  const [displayBasic4, setDisplayBasic4] = useState(false)
  const [times1, setTimes1] = useState();
  const [dates1, setDates1] = useState();
  const [value1, setValue1] = useState();
  const [plan, setPlan] = useState();
  const [Selectedplanname, setSelectedplanname] = useState(null);
  const [strategicplan, setStrategicplan] = useState();
  const [planid, setPlanid] = useState();
  const [strategic, setStrategic] = useState([])
  const [Selectedstrategic, setSelectedstrategic] = useState(null);
  const [goal, setGoal] = useState([])
  const [Selectedgoal, setSelectedgoal] = useState(null);
  const [tactic, setTactic] = useState([]);
  const [Selectedtactic, setSelectedtactic] = useState(null);
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);

  let history = useHistory();

  const toggleMobileMenu = () => {
    setMenu(!menu)
  }

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
    selectstrategicplan()
    selectstrategic()
    selectgoal()
    selecttactic()

  }, []);

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  // const dialogFuncMap = {
  //   'displayBasic': setDisplayBasic,
  //   'confirm': setConfirm,
  // }

  // const onClick = (name, position) => {
  //   dialogFuncMap[`${name}`](true);

  //   if (position) {
  //     setPosition(position);
  //   }
  // }

  // const onHide = (name) => {
  //   dialogFuncMap[`${name}`](false);
  // }

  // const show = (id) => {
  //   setDisplayBasic(true);
  //   setId(id)
  // }

  // const onhide = () => {
  //   setVisible1(false)
  //   setVisible2(false)
  //   setVisible3(false)
  //   setVisible4(false)
  // }

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

  const onHide1 = () => {
    setDisplayBasic1(false)
    form.resetFields()
  }

  const onHide2 = () => {
    setDisplayBasic2(false)
    form.resetFields()
  }

  const onHide3 = () => {
    setDisplayBasic3(false)
    form.resetFields()
  }

  const onHide4 = () => {
    setDisplayBasic4(false)
    form.resetFields()
  }

  const editdatastrategicplan = (node) => {
    return (
      <div>
        <Button
          type="button"
          icon="pi pi-pencil"
          label='แก้ไขแผนยุทธศาสตร์'
          className="p-button-warning"
          style={{ textAlign: 'center', width: '14em', height: '2.5em' }}
          onClick={() => showplan(node)}
        ></Button>
      </div>
    );
  }



  const editdatastrategic = (node) => {
    return (
      <div>
        <Button
          type="button"
          icon="pi pi-pencil"
          label='แก้ไขประเด็นยุทธยุทธศาสตร์'
          className="p-button-warning"
          style={{ textAlign: 'center', width: '18em', height: '2.5em' }}
          onClick={() => showstrategic(node)}
        ></Button>
      </div>
    );
  }

  const editdatagoal = (node) => {
    return (
      <div>
        <Button
          type="button"
          icon="pi pi-pencil"
          label='แก้ไขเป้าประสงค์'
          className="p-button-warning"
          style={{ textAlign: 'center', width: '12em', height: '2.5em' }}
          onClick={() => showgoal(node)}
        ></Button>
      </div>
    );
  }

  const editdatatactic = (node) => {
    return (
      <div>
        <Button
          type="button"
          icon="pi pi-pencil"
          label='แก้ไขกลยุทธ์'
          className="p-button-warning"
          style={{ textAlign: 'center', width: '10em', height: '2.5em' }}
          onClick={() => showtactic(node)}
        ></Button>
      </div>
    );
  }

  // const renderFooter = (name) => {
  //   return (
  //     <div>
  //       <Button label="ยกเลิก" icon="pi pi-times" className="p-button-danger" style={{ height: '2.5em' }} onClick={() => onHide(name)} />
  //       <Button label="ส่ง" icon="pi pi-check" className="p-button-success" style={{ height: '2.5em', width: '17%' }} onClick={() => confirmproject(location.state.project_id, 3)} />
  //     </div>
  //   );
  // }

  // const renderFooter1 = (id) => {
  //   return (
  //     <div>
  //       <Button label="ยกเลิก" icon="pi pi-times" className="p-button-danger" style={{ height: '2.5em' }} onClick={onhide} />
  //       <Button label="บันทึก" icon="pi pi-check" className="p-button-success" style={{ height: '2.5em' }} onClick={() => updatestrategicplan(id, Selectedplanname)} autoFocus />
  //     </div>
  //   );
  // }

  // const renderFooter2 = (id) => {
  //   return (
  //     <div>
  //       <Button label="ยกเลิก" icon="pi pi-times" className="p-button-danger" style={{ height: '2.5em' }} onClick={onhide} />
  //       <Button label="บันทึก" icon="pi pi-check" className="p-button-success" style={{ height: '2.5em' }} onClick={() => updatestrategic(id, Selectedstrategic)} autoFocus />
  //     </div>
  //   );
  // }

  // const renderFooter3 = (id) => {
  //   return (
  //     <div>
  //       <Button label="ยกเลิก" icon="pi pi-times" className="p-button-danger" style={{ height: '2.5em' }} onClick={onhide} />
  //       <Button label="บันทึก" icon="pi pi-check" className="p-button-success" style={{ height: '2.5em' }} onClick={() => updategoal(id, Selectedgoal)} autoFocus />
  //     </div>
  //   );
  // }

  // const renderFooter4 = (id) => {
  //   return (
  //     <div>
  //       <Button label="ยกเลิก" icon="pi pi-times" className="p-button-danger" style={{ height: '2.5em' }} onClick={onhide} />
  //       <Button label="บันทึก" icon="pi pi-check" className="p-button-success" style={{ height: '2.5em' }} onClick={() => updatetactic(id, Selectedtactic)} autoFocus />
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

  const sendEmailtodairector = async () => {
    try {
      await axios
        .get(`http://localhost:3001/sendEmail/emailtodairec/${location.state.project_id}/${location.state.project_name}`, {})
        .then((res) => {
        });
    } catch (e) { }
  }

  const confirmproject = async (id, n) => {
    handleCancel()
    const time1 = moment(times1).add(543, 'year').format('h:mm:ss');
    const date1 = moment(dates1).add(543, 'year').format('YYYY-MM-DD')
    axios
      .put(`http://localhost:3001/dataproject/noconfirmproject/${id}`, {
        status: n
      })
    await iscomment(id, time1, date1)
    sendEmailtodairector()
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

  const showplan = (item) => {
    setDisplayBasic1(true)
    setPlanid(item.strategic_project_id)
    axios
      .get(`http://localhost:3001/editmanager/showplan/${item.strategic_project_id}`, {})
      .then((res) => {
        setPlan(res.data[0].strategic_project_id)
      })
      .catch((error) => {
        console.log(error)
      });

  };

  const selectstrategicplan = () => {
    axios
      .get(`http://localhost:3001/editmanager/strategicplanpro`, {})
      .then((res) => {
        console.log(res.data)
        setStrategicplan(res.data)
      }).catch((error) => {
        console.log(error)
      });

  }

  const onsetStrategicplan = (e) => {
    setSelectedplanname(e.value);
  }

  const updatestrategicplan = (id, Selectedplanname) => {
    axios
      .put(`http://localhost:3001/editmanager/updatestrategicplan/${planid}`, {
        plan_id: Selectedplanname.fiscalyear_id
      })
    onHide1()
  }

  const showstrategic = (item) => {
    setDisplayBasic2(true)
    setPlanid(item.strategic_project_id)
    axios
      .get(`http://localhost:3001/editmanager/showplan/${item.strategic_project_id}`, {})
      .then((res) => {
        setPlan(res.data[0].strategic_project_id)
      })
      .catch((error) => {
        console.log(error)
      });
  };

  const selectstrategic = () => {
    axios
      .get(`http://localhost:3001/editmanager/strategicpro`, {})
      .then((res) => {
        console.log(res.data)
        setStrategic(res.data)
      }).catch((error) => {
        console.log(error)
      });

  }

  const onsetStrategic = (e) => {
    setSelectedstrategic(e.value);
  }

  const updatestrategic = (id, Selectedstrategic) => {
    onHide1()
    axios
      .put(`http://localhost:3001/editmanager/updatestrategic/${planid}`, {
        strategic_id: Selectedstrategic.strategic_id
      })
    onHide2()
  }

  const showgoal = (item) => {
    setDisplayBasic3(true)
    setPlanid(item.strategic_project_id)
    axios
      .get(`http://localhost:3001/editmanager/showplan/${item.strategic_project_id}`, {})
      .then((res) => {
        setPlan(res.data[0].strategic_project_id)
      })
      .catch((error) => {
        console.log(error)
      });
  };

  const selectgoal = () => {
    axios
      .get(`http://localhost:3001/editmanager/goalpro`, {})
      .then((res) => {
        console.log(res.data)
        setGoal(res.data)
      }).catch((error) => {
        console.log(error)
      });

  }

  const onsetGoal = (e) => {
    setSelectedgoal(e.value);
  }

  const updategoal = (id, Selectedgoal) => {
    onHide3()
    axios
      .put(`http://localhost:3001/editmanager/updategoal/${planid}`, {
        goal_id: Selectedgoal.goal_id
      })

  }

  const showtactic = (item) => {
    setDisplayBasic4(true)
    setPlanid(item.strategic_project_id)
    axios
      .get(`http://localhost:3001/editmanager/showplan/${item.strategic_project_id}`, {})
      .then((res) => {
        setPlan(res.data[0].strategic_project_id)
      })
      .catch((error) => {
        console.log(error)
      });
  };

  const selecttactic = () => {
    axios
      .get(`http://localhost:3001/editmanager/tacticpro`, {})
      .then((res) => {
        console.log(res.data)
        setTactic(res.data)
      }).catch((error) => {
        console.log(error)
      });

  }

  const onsetTactic = (e) => {
    setSelectedtactic(e.value);
  }

  const updatetactic = (id, Selectedtactic) => {
    onHide4()
    axios
      .put(`http://localhost:3001/editmanager/updatetactic/${planid}`, {
        tactic_id: Selectedtactic.tactic_id
      })
  }

  const showConfirm1 = (value) => {
    confirm({
      title: "ต้องการแก้ไขแผนยุทธศาสตร์ใช่มั้ย?",
      icon: <ExclamationCircleFilled />,
      onOk() {
        console.log("OK");
        updatestrategicplan(value, Selectedplanname)

      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }

  const showConfirm2 = (value) => {
    confirm({
      title: "ต้องการแก้ไขประเด็นยุทธศาสตร์ใช่มั้ย?",
      icon: <ExclamationCircleFilled />,
      onOk() {
        console.log("OK");
        updatestrategic(value, Selectedstrategic)

      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }

  const showConfirm3 = (value) => {
    confirm({
      title: "ต้องการแก้ไขเป้าประสงค์ใช่มั้ย?",
      icon: <ExclamationCircleFilled />,
      onOk() {
        console.log("OK");
        updategoal(value, Selectedgoal)
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }

  const showConfirm4 = (value) => {
    confirm({
      title: "ต้องการแก้ไขกลยุทธ์ใช่มั้ย?",
      icon: <ExclamationCircleFilled />,
      onOk() {
        console.log("OK");
        updatetactic(value, Selectedtactic)
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }

  const showConfirm5 = (value) => {
    confirm({
      title: "ต้องการยืนยันการอนุมัติโครงการใช่มั้ย?",
      icon: <ExclamationCircleFilled />,
      onOk() {
        console.log("OK");
        confirmproject(value, 3)
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
                </Panel>
              </TabPanel>
              {(location.state.status === 1) ? <TabPanel header="แก้ไขข้อมูลโครงการ">
                <Panel header='แก้ไขข้อมูลโครงการ'>
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
                      <div className="col-12 md:col-8">
                        <h4>
                          <DataTable value={strategicplanproject} columnResizeMode="fit" showGridlines responsiveLayout="scroll" rows={10}>
                            <Column field="plan_name" header="แผนยุทธศาสตร์" />
                            <Column body={editdatastrategicplan} header="จัดการ" style={{ textAlign: 'center' }} />
                          </DataTable>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="fit">
                    <div className="grid p-fluid">
                      <div className="col-12 md:col-4">
                        <h4 style={{ marginLeft: "9.5em" }}>ประเด็นยุทธ์ศาสตร์ :</h4>
                      </div>
                      <div className="col-12 md:col-8">
                        <h4>
                          <DataTable value={strategicproject} columnResizeMode="fit" showGridlines responsiveLayout="scroll" rows={10}>
                            <Column field="strategic_name" header="ประเด็นยุทธศาสตร์" />
                            <Column body={editdatastrategic} header="จัดการ" style={{ textAlign: 'center' }} />
                          </DataTable>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="fit">
                    <div className="grid p-fluid">
                      <div className="col-12 md:col-4">
                        <h4 style={{ marginLeft: "9.5em" }}>เป้าประสงค์ :</h4>
                      </div>
                      <div className="col-12 md:col-8">
                        <h4>
                          <DataTable value={goalproject} columnResizeMode="fit" showGridlines responsiveLayout="scroll" rows={10}>
                            <Column field="goal_name" header="เป้าประสงค์" />
                            <Column body={editdatagoal} header="จัดการ" style={{ textAlign: 'center' }} />
                          </DataTable>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="fit">
                    <div className="grid p-fluid">
                      <div className="col-12 md:col-4">
                        <h4 style={{ marginLeft: "9.5em" }}>กลยุทธ์ :</h4>
                      </div>
                      <div className="col-12 md:col-8">
                        <h4>
                          <DataTable value={tacticproject} columnResizeMode="fit" showGridlines responsiveLayout="scroll" rows={10}>
                            <Column field="tactic_name" header="กลยุทธ์" />
                            <Column body={editdatatactic} header="จัดการ" style={{ textAlign: 'center' }} />
                          </DataTable>
                        </h4>
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
                        <InputTextarea value={location.state.rationale} rows={8} cols={50} disabled />
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
                </Panel>
              </TabPanel> : <TabPanel header="แก้ไขข้อมูลโครงการ" disabled></TabPanel>}
              <TabPanel header="พิจารณาโครงการ">
                <Panel header='พิจารณาโครงการ'>
                  <div className="fit">
                    <div className="grid p-fluid">
                      <div className="col-12 md:col-2">
                        <h4>พิจารณาโครงการ :</h4>
                      </div>
                      <div className="col-12 md:col-9">
                        {(location.state.status === 0) ? <Tag className="mr-2" severity="warning" value="รอหัวหน้าฝ่ายพิจารณา" rounded></Tag> :
                          (location.state.status === 1) ? <Button label="อนุมัติ" icon="pi pi-check" className="p-button-success" style={{ width: '7em', height: '2.5em' }} onClick={showModal} /> :
                            (location.state.status === 2) ? <Tag className="mr-2" severity="danger" value="ไม่ผ่านอนุมัติจากหัวหน้าฝ่าย" rounded></Tag> :
                              (location.state.status === 3) ? <Tag className="mr-2" severity="warning" value="รอผู้บริหารพิจารณา" rounded></Tag> :
                                (location.state.status === 4) ? <Tag className="mr-2" severity="success" value="อนุมัติโครงการ" rounded></Tag> :
                                  <Tag className="mr-2" severity="danger" value="ไม่ผ่านอนุมัติจากผู้บริหาร" rounded></Tag>}

                        {/* <Dialog header="ข้อมูลที่ถูกแก้ไข" visible={confirm} onHide={() => onHide('confirm')} breakpoints={{ '950x': '75vw' }} style={{ width: '40vw' }} footer={renderFooter('confirm')}>
                          <InputTextarea value={comment} onChange={(e) => setComment(e.target.value)} rows={8} cols={71.5} />
                        </Dialog> */}
                        <div>
                          <Modal
                            title={<p className="m-0">{'ข้อมูลที่ถูกแก้ไข'}</p>}
                            open={open}
                            onCancel={handleCancel}
                            footer={null}
                            width={600}
                          >
                            <InputTextarea value={comment} onChange={(e) => setComment(e.target.value)} rows={8} cols={69.2} />
                            <div className="text-right mt-4">
                              <Button label="ยกเลิก" icon="pi pi-times" className="p-button-danger" style={{ marginRight: '.5em', height: '2.5em', marginLeft: '19.5em' }} onClick={handleCancel} />
                              <Button label="บันทึก" icon="pi pi-check" className="p-button-success" style={{ height: '2.5em' }} onClick={() => showConfirm5(location.state.project_id)} autoFocus />
                            </div>
                          </Modal>
                        </div>
                      </div>
                    </div>
                  </div>
                </Panel>
              </TabPanel>
              :
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
                </Panel>
              </TabPanel>
            </TabView>

            {/* <Dialog
              style={{ width: '500px', width: "50vw" }} header="เแก้ไขแผนยุทธศาสตร์" modal className="p-fluid"
              visible={visible1}
              footer={renderFooter1}
              onHide={onhide}
            >
              <div className="fit" style={{ marginLeft: '1.5em' }}>
                <div className="grid p-fluid">
                  <div className="col-12 md:col-3">
                    <h4>แผนยุทธศาสตร์ :</h4>
                  </div>
                  <div className="col-12 md:col-1">
                    <Dropdown value={Selectedplanname} options={strategicplan} onChange={onsetStrategicplan} style={{ width: '30em' }} optionLabel="plan_name" placeholder="แผนยุทธศาสตร์" />
                  </div>
                </div>
              </div>
            </Dialog>

            <Dialog
              style={{ width: '500px', width: "50vw" }} header="เแก้ไขประเด็นยุทธศาสตร์" modal className="p-fluid"
              visible={visible2}
              footer={renderFooter2}
              onHide={onhide}
            >
              <div className="fit" style={{ marginLeft: '1.5em' }}>
                <div className="grid p-fluid">
                  <div className="col-12 md:col-3">
                    <h4>ประเด็นยุทธศาสตร์ :</h4>
                  </div>
                  <div className="col-12 md:col-1">
                    <Dropdown value={Selectedstrategic} options={strategic} onChange={onsetStrategic} style={{ width: '30em' }} optionLabel="strategic_name" placeholder="ประเด็นยุทธศาสตร์" />
                  </div>
                </div>
              </div>
            </Dialog>

            <Dialog
              style={{ width: '500px', width: "50vw" }} header="เแก้ไขเป้าประสงค์" modal className="p-fluid"
              visible={visible3}
              footer={renderFooter3}
              onHide={onhide}
            >
              <div className="fit" style={{ marginLeft: '1.5em' }}>
                <div className="grid p-fluid">
                  <div className="col-12 md:col-3">
                    <h4>เป้าประสงค์ :</h4>
                  </div>
                  <div className="col-12 md:col-1">
                    <Dropdown value={Selectedgoal} options={goal} onChange={onsetGoal} style={{ width: '30em' }} optionLabel="goal_name" placeholder="เป้าประสงค์" />
                  </div>
                </div>
              </div>
            </Dialog>

            <Dialog
              style={{ width: '500px', width: "50vw" }} header="เแก้ไขเกลยุทธ์" modal className="p-fluid"
              visible={visible4}
              footer={renderFooter4}
              onHide={onhide}
            >
              <div className="fit" style={{ marginLeft: '1.5em' }}>
                <div className="grid p-fluid">
                  <div className="col-12 md:col-3">
                    <h4>กลยุทธ์ :</h4>
                  </div>
                  <div className="col-12 md:col-1">
                    <Dropdown value={Selectedtactic} options={tactic} onChange={onsetTactic} style={{ width: '30em' }} optionLabel="tactic_name" placeholder="กลยุทธ์" />
                  </div>
                </div>
              </div>
            </Dialog> */}
            <div>
              <Modal
                title={<h4 className="m-0">{'จัดการข้อมูลแผนยุทธศาสตร์'}</h4>}
                open={displayBasic1}
                onCancel={onHide1}
                footer={null}
                width={700}
              >
                <Dropdown value={Selectedplanname} options={strategicplan} onChange={onsetStrategicplan} style={{ width: '40em', marginTop: '1em' }} optionLabel="plan_name" placeholder="แผนยุทธศาสตร์" />
                <div className="text-right mt-4">
                  <Button label="ยกเลิก" icon="pi pi-times" className="p-button-danger" style={{ marginRight: '.5em', height: '2.5em', marginLeft: '26.2em' }} onClick={onHide1} />
                  <Button label="บันทึก" icon="pi pi-check" className="p-button-success" style={{ height: '2.5em' }} onClick={() => showConfirm1(id)} autoFocus />
                </div>
              </Modal>
            </div>

            <div>
              <Modal
                title={<h4 className="m-0">{'จัดการข้อมูลประเด็นยุทธศาสตร์'}</h4>}
                open={displayBasic2}
                onCancel={onHide2}
                footer={null}
                width={700}
              >
                <Dropdown value={Selectedstrategic} options={strategic} onChange={onsetStrategic} style={{ width: '40em', marginTop: '1em' }} optionLabel="strategic_name" placeholder="ประเด็นยุทธศาสตร์" />
                <div className="text-right mt-4">
                  <Button label="ยกเลิก" icon="pi pi-times" className="p-button-danger" style={{ marginRight: '.5em', height: '2.5em', marginLeft: '26.2em' }} onClick={onHide2} />
                  <Button label="บันทึก" icon="pi pi-check" className="p-button-success" style={{ height: '2.5em' }} onClick={() => showConfirm2(id)} autoFocus />
                </div>
              </Modal>
            </div>

            <div>
              <Modal
                title={<h4 className="m-0">{'จัดการข้อมูลเป้าประสงค์'}</h4>}
                open={displayBasic3}
                onCancel={onHide3}
                footer={null}
                width={700}
              >
                <Dropdown value={Selectedgoal} options={goal} onChange={onsetGoal} style={{ width: '40em', marginTop: '1em' }} optionLabel="goal_name" placeholder="เป้าประสงค์" />
                <div className="text-right mt-4">
                  <Button label="ยกเลิก" icon="pi pi-times" className="p-button-danger" style={{ marginRight: '.5em', height: '2.5em', marginLeft: '26.2em' }} onClick={onHide3} />
                  <Button label="บันทึก" icon="pi pi-check" className="p-button-success" style={{ height: '2.5em' }} onClick={() => showConfirm3(id)} autoFocus />
                </div>
              </Modal>
            </div>

            <div>
              <Modal
                title={<h4 className="m-0">{'จัดการข้อมูลกลยุทธ์'}</h4>}
                open={displayBasic4}
                onCancel={onHide4}
                footer={null}
                width={700}
              >
                <Dropdown value={Selectedtactic} options={tactic} onChange={onsetTactic} style={{ width: '40em', marginTop: '1em' }} optionLabel="tactic_name" placeholder="กลยุทธ์" />
                <div className="text-right mt-4">
                  <Button label="ยกเลิก" icon="pi pi-times" className="p-button-danger" style={{ marginRight: '.5em', height: '2.5em', marginLeft: '26.2em' }} onClick={onHide4} />
                  <Button label="บันทึก" icon="pi pi-check" className="p-button-success" style={{ height: '2.5em' }} onClick={() => showConfirm4(id)} autoFocus />
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Detailmanager