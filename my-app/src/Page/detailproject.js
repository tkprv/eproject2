import React, { useState, useEffect } from 'react'
import { TabView, TabPanel } from 'primereact/tabview';
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { InputTextarea } from 'primereact/inputtextarea';
import axios from 'axios'
import { Panel } from 'primereact/panel';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { message, Upload, Modal, notification, Button } from 'antd'
import { useLocation } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { Tag } from 'primereact/tag';
import Header from '../initialpage/Sidebar/header';
import Sidebar from '../initialpage/Sidebar/sidebar'
import Reportproject from './reportproject';
import ExportButton from './doc'
const { Dragger } = Upload;
const { confirm } = Modal;

const Detailproject = () => {
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
  const [commentproject, setCommentproject] = useState([]);
  const [id, setId] = useState("")
  const [displayBasic, setDisplayBasic] = useState(false)
  const [times1, setTimes1] = useState()
  const [dates1, setDates1] = useState()
  const [value1, setValue1] = useState()
  const [menu, setMenu] = useState(false);
  const [openFile, setOpenFile] = useState(null)
  const [filepdf, setFilepdf] = useState()
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
    getfilepdf()
  }, []);

  const dialogFuncMap = {
    'displayBasic': setDisplayBasic
  }

  const toggleMobileMenu = () => {
    setMenu(!menu)
  }

  const [userInfo, setuserInfo] = useState({
    file: [],
    filepreview: null,
  });

  const handleInputChange = (event, status) => {
    if (status === 1) {
      const file = event.target.files[0];
      const maxSize = 5 * 1024 * 1024
      if (file.size > maxSize) {
        showConfirm()
        event.target.value = null
      }
      console.log(event);
      setuserInfo({
        ...userInfo,
        file: event.target.files[0],
        filepreview: URL.createObjectURL(event.target.files[0]),
      })
    } else {
      event.target.value = null
    }


  }

  const [isSucces, setSuccess] = useState(null);
  const showConfirm = (value, amount) => {
    confirm({
      title: "ไม่สามารถอัพไฟล์ได้",
      icon: <ExclamationCircleFilled />,
      content: "ไฟล์ต้องมีขนาดน้อยกว่า 5MB",
      onOk() {
        console.log("OK")

      },
      onCancel() {
        console.log("Cancel")
      },
    });
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

  const submit = async () => {
    const formdata = new FormData();
    var blob = new Blob([userInfo], { type: 'file/pdf' });
    var blobUrl = URL.createObjectURL(blob);
    console.log('blob', blob);
    console.log('blobURL', blobUrl);
    formdata.append('avatar', userInfo.file);

    const image = { headers: { "Content-Type": "multipart/form-data" } }
    axios.post("http://localhost:3001/torfile/torupload", {

      userInfo,
      project_id: location.state.project_id

    }).then(res => {
      // if (res) {
      notification.success({
        message: "สำเร็จ",
        description:
          'อัปโหลดไฟล์สำเร็จ',
      })
      getfile()
      //  }
    })

  }


  const getfile = () => {
    const id = location.state.project_id
    axios
      .get(`http://localhost:3001/torfile/getpdf/${id}`, {})
      .then((res) => {
        setOpenFile(res.data)
        console.log(res.data)
      })
      .catch((error) => {
        console.log(error)
      });
  }

  const openfile = (url) => {
    window.open(url)
  }

  const getfilepdf = () => {
    const id = location.state.project_id
    axios
      .get(`http://localhost:3001/torfile/openpdf/${id}`, {})
      .then((res) => {
        setFilepdf(res.data)
        console.log(res.data)
      })
      .catch((error) => {
        console.log(error)
      });
  }
  console.log('file', filepdf?.tor_id)

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
                        <h4>หลักการและเหตุผล :</h4>
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
                        <h4>{location.state.tor === 0 ? <Tag className="mr-2" severity="danger" value="ยังไม่มีเอกสาร" rounded></Tag> : <div>{filepdf?.map((value) => {
                          return (
                            <Button
                              onClick={() => openfile(value?.file)}>
                              Open Document
                            </Button>
                          )
                        })}</div>}</h4>
                      </div>
                    </div>
                  </div>
                </Panel>
              </TabPanel>
              {(location.state.tor === 0) ? <TabPanel header="เอกสารโครงการ" disabled></TabPanel> :
                <TabPanel header="เอกสารโครงการ" >
                  <Panel header='เอกสารโครงการ'>
                    <div className="container mr-60">
                      <h3 className="text-white">React Image Upload And Preview Using Node Js - <span> codeat21.com </span> </h3>

                      <div className="formdesign">
                        {isSucces !== null ? <h4> {isSucces} </h4> : null}
                        <div className="form-row">
                          <label className="text-white">Select Image :</label>
                          <input type="file" className="form-control" name="upload_file" accept=".pdf" maxsize='5MB' onChange={(e) => handleInputChange(e, 1)} />
                        </div>

                        <div className="form-row">
                          <button type="submit" className="btn btn-dark" onClick={() => submit()} > Save </button>

                        </div>
                      </div>
                      {openFile?.map((item) => {
                        return (
                          <Button
                            onClick={() => openfile(item.file)}>
                            Open Document
                          </Button>
                        )
                      })}
                      {/* { <Button disabled = {openFile === null } onClick={openfile}> openfile</Button>
      } */}
                      {/* {userInfo.filepreview !== null ? 
        <img className="previewimg"  src={userInfo.filepreview} alt="UploadImage" />
      : null} */}

                    </div>
                  </Panel>
                </TabPanel>}
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
          </div>
        </div>
      </div>
    </>
  );
}

export default Detailproject