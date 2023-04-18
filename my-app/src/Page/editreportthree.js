import React, { useState, useEffect } from 'react'
import { Button } from 'primereact/button';
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import axios from 'axios'
import { useLocation } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from "primereact/checkbox";
import Header from '../initialpage/Sidebar/header';
import Sidebar from '../initialpage/Sidebar/sidebar';
import { Panel } from 'primereact/panel';
import { ExclamationCircleFilled } from "@ant-design/icons"
import { Modal } from "antd"
import { Form } from "antd";
const { confirm } = Modal

const Editreportthree = () => {
  const location = useLocation()
  const [quartercharges, setQuartercharges] = useState([]);
  const [indic, setIndic] = useState([]);
  const [step, setStep] = useState([]);
  const [detail, setDetail] = useState([]);
  const [problem, setProblem] = useState([]);
  const [editquartercharges, setEditquartercharges] = useState([]);
  const [result, setResult] = useState();
  const [editresult, setEditresult] = useState();
  const [resultid, setResultid] = useState();
  const [editdetail, setEditdetail] = useState();
  const [datadetail, setDatadetail] = useState();
  const [detailid, setDetailid] = useState();
  const [editproblem, setEditproblem] = useState();
  const [dataproblem, setDataproblem] = useState();
  const [problemid, setProblemid] = useState();
  const [checked, setChecked] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [form] = Form.useForm();
  const [displayBasic, setDisplayBasic] = useState(false);
  const [displayBasic1, setDisplayBasic1] = useState(false);
  const [displayBasic2, setDisplayBasic2] = useState(false);
  const [displayBasic3, setDisplayBasic3] = useState(false);
  const [menu, setMenu] = useState(false);
  let history = useHistory();
  console.log('project', location.state)

  useEffect(() => {
    getstep()
    getquartercharges()
    getindic()
    getdetail()
    getproblem()
  }, []);

  const dialogFuncMap = {
    'displayBasic': setDisplayBasic,
  }

  const toggleMobileMenu = () => {
    setMenu(!menu)
  }

  const onHide = () => {
    setDisplayBasic(false)
    form.resetFields()
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

  const achieve = (node) => {
    if (node.achieve === 0) {
      return <Tag severity="danger" icon="pi pi-times" rounded></Tag>
    } else {
      return <Tag severity="success" icon="pi pi-check" rounded></Tag>
    }
  }

  const editdataresult = (node) => {
    return (
      <div>
        <Button
          type="button"
          icon="pi pi-pencil"
          label='แก้ไขผลตามตัวชี้วัดและบรรลุตามตัวชี้วัด'
          className="p-button-warning"
          style={{ textAlign: 'center', width: '23em', height: '2.5em' }}
          onClick={() => showresult(node)}
        ></Button>
      </div>
    );
  }

  const editdatadetail = (node) => {
    return (
      <div>
        <Button
          type="button"
          icon="pi pi-pencil"
          label='แก้ไขรายละเอียดความก้าวหน้า'
          className="p-button-warning"
          style={{ textAlign: 'center', width: '19em', height: '2.5em' }}
          onClick={() => showdetail(node)}
        ></Button>
      </div>
    );
  }

  const editdataproblem = (node) => {
    return (
      <div>
        <Button
          type="button"
          icon="pi pi-pencil"
          label='แก้ไขรายปัญหา/อุปสรรค'
          className="p-button-warning"
          style={{ textAlign: 'center', width: '16em', height: '2.5em' }}
          onClick={() => showproblem(node)}
        ></Button>
      </div>
    );
  }

  // const renderFooter1 = (id) => {
  //   return (
  //     <div>
  //       <Button label="ยกเลิก" icon="pi pi-times" className="p-button-danger" onClick={onHide} />
  //       <Button label="บันทึก" icon="pi pi-check" className="p-button-success" onClick={() => updateresult(id, editresult, checked1)} autoFocus />
  //     </div>
  //   );
  // }

  // const renderFooter2 = (id) => {
  //   return (
  //     <div>
  //       <Button label="ยกเลิก" icon="pi pi-times" className="p-button-danger" onClick={onHide} />
  //       <Button label="บันทึก" icon="pi pi-check" className="p-button-success" onClick={() => updatedetail(id, editdetail)} autoFocus />
  //     </div>
  //   );
  // }

  // const renderFooter3 = (id) => {
  //   return (
  //     <div>
  //       <Button label="ยกเลิก" icon="pi pi-times" className="p-button-danger" onClick={onHide} />
  //       <Button label="บันทึก" icon="pi pi-check" className="p-button-success" onClick={() => updateproblem(id, editproblem)} autoFocus />
  //     </div>
  //   );
  // }

  const getquartercharges = () => {
    axios
      .get(`http://localhost:3001/datareport/quarterchargesthree/${location.state.project_id}`, {})
      .then((res) => {
        console.log(res.data)
        setQuartercharges(res.data)
        setEditquartercharges(res.data[0].used)
        setChecked(res.data[0].period_check === 0 ? false : true)
      }).catch((error) => {
        console.log(error)
      });
  }
  console.log('11', quartercharges)

  const getindic = () => {
    axios
      .get(`http://localhost:3001/datareport/indicreportthree/${location.state.project_id}`, {})
      .then((res) => {
        console.log(res.data)
        setIndic(res.data)
      }).catch((error) => {
        console.log(error)
      });
  }
  console.log('22', indic)

  const getstep = () => {
    axios
      .get(`http://localhost:3001/dataproject/stepproject/${location.state.project_id}`, {})
      .then((res) => {
        console.log(res.data)
        setStep(res.data)
      }).catch((error) => {
        console.log(error)
      });
  }
  console.log('33', step)

  const getdetail = () => {
    axios
      .get(`http://localhost:3001/datareport/detailreportthree/${location.state.project_id}`, {})
      .then((res) => {
        console.log(res.data)
        setDetail(res.data)
      }).catch((error) => {
        console.log(error)
      });
  }
  console.log('44', detail)

  const getproblem = () => {
    axios
      .get(`http://localhost:3001/datareport/problemreportthree/${location.state.project_id}`, {})
      .then((res) => {
        console.log(res.data)
        setProblem(res.data)
      }).catch((error) => {
        console.log(error)
      });
  }
  console.log('55', problem)

  const updatequartercharges = (id, editquartercharges, checked) => {
    onHide()
    axios
      .put(`http://localhost:3001/editreport/updatequartercharges/${id}`, {
        used: editquartercharges,
        period_check: (checked === true) ? 1 : 0
      }).then((res) => {

      })
  }

  const showresult = (item) => {
    setDisplayBasic1(true)
    setResultid(item.indic_project_result_id)
    axios
      .get(`http://localhost:3001/addreport/showresult/${item.indic_project_result_id}`, {})
      .then((res) => {
        setResult(res.data[0].indic_project_result_id)
        setEditresult(res.data[0].result)
        setChecked1(res.data[0].achieve === 0 ? false : true)
      })
      .catch((error) => {
        console.log(error)
      });
  };

  const updateresult = (id, editresult, checked1) => {
    onHide1()
    axios.put(`http://localhost:3001/addreport/createresult/${resultid}`, {
      result: editresult,
      achieve: (checked1 === true) ? 1 : 0
    })
  };

  const showdetail = (item) => {
    setDisplayBasic2(true)
    setDetailid(item.detail_id)
    axios
      .get(`http://localhost:3001/editreport/showdetail/${item.detail_id}`, {})
      .then((res) => {
        setDatadetail(res.data[0].detail_id)
        setEditdetail(res.data[0].detail)
      })
      .catch((error) => {
        console.log(error)
      });
  };

  const updatedetail = (id, editdetail) => {
    onHide2()
    axios.put(`http://localhost:3001/editreport/updatedetail/${detailid}`, {
      detail: editdetail,
    })
  };

  const showproblem = (item) => {
    setDisplayBasic3(true)
    setProblemid(item.problem_id)
    axios
      .get(`http://localhost:3001/editreport/showproblem/${item.problem_id}`, {})
      .then((res) => {
        setDataproblem(res.data[0].problem_id)
        setEditproblem(res.data[0].problem)
      })
      .catch((error) => {
        console.log(error)
      });
  };

  const updateproblem = (id, editproblem) => {
    onHide3()
    axios.put(`http://localhost:3001/editreport/updateproblem/${problemid}`, {
      problem: editproblem,
    })
  };

  const showConfirm1 = (value) => {
    confirm({
      title: "ต้องการแก้ไขรายงานความก้าวหน้าไตรมาส 3 ใช่มั้ย?",
      icon: <ExclamationCircleFilled />,
      onOk() {
        console.log("OK");
        updatequartercharges(value, editquartercharges, checked)
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }

  const showConfirm2 = (value) => {
    confirm({
      title: "ต้องการแก้ไขผลตามตัวชี้วัด และบรรลุตามตัวชี้วัดใช่มั้ย?",
      icon: <ExclamationCircleFilled />,
      onOk() {
        console.log("OK");
        updateresult(value, editresult, checked1)
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }

  const showConfirm3 = (value) => {
    confirm({
      title: "ต้องการแก้ไขรายละเอียดความก้าวหน้าใช่มั้ย?",
      icon: <ExclamationCircleFilled />,
      onOk() {
        console.log("OK");
        updatedetail(value, editdetail)
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }

  const showConfirm4 = (value) => {
    confirm({
      title: "ต้องการแก้ไขปัญหา/อุปสรรคใช่มั้ย?",
      icon: <ExclamationCircleFilled />,
      onOk() {
        console.log("OK");
        updateproblem(value, editproblem)
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
          <Card>
            <Panel header='แก้ไขรายงานความก้าวหน้าไตรมาส 3'>
              <div className="fit" style={{ marginLeft: '1.5em' }}>
                <div className="grid p-fluid">
                  <div className="col-12 md:col-3">
                    <h4>ชื่อโครงการ :</h4>
                  </div>
                  <div className="col-12 md:col-9">
                    <h4> {location.state.project_name} </h4>
                  </div>
                </div>
              </div>
              <div className="fit" style={{ marginLeft: '1.5em' }}>
                <div className="grid p-fluid">
                  <div className="col-12 md:col-3">
                    <h4>งบประมาณที่จัดสรร :</h4>
                  </div>
                  <div className="col-12 md:col-9">
                    <h4> {location.state.butget} บาท</h4>
                  </div>
                </div>
              </div>
              <div className="fit" style={{ marginLeft: '1.5em' }}>
                <div className="grid p-fluid">
                  <div className="col-12 md:col-3">
                    <h4>ผลการใช้จ่าย :</h4>
                  </div>
                  <div className="col-12 md:col-9">
                    <InputText value={editquartercharges} onChange={(e) => setEditquartercharges(e.target.value)} style={{ width: '35em' }} placeholder="งบไตรมาสที่ 3" />
                  </div>
                </div>
              </div>
              <div className="fit" style={{ marginLeft: '1.5em' }}>
                <div className="grid p-fluid">
                  <div className="col-12 md:col-3">
                    <h4>ผลตามตัวชี้วัด :</h4>
                  </div>
                  <div className="col-12 md:col-9">
                    <h4>
                      <DataTable value={indic} columnResizeMode="fit" showGridlines responsiveLayout="scroll" rows={10}>
                        <Column field="indic_project" header="ตัวชี้วัด" />
                        <Column field="cost" header="เป้าหมาย" style={{ textAlign: 'center', width: '6.5em' }} />
                        <Column field="result" header="ผลตามตัวชี้วัด" style={{ textAlign: 'center', width: '8.5em' }} />
                        <Column body={achieve} header="บรรลุตามตัวชี้วัด" style={{ textAlign: 'center', width: '9.5em' }} />
                        <Column body={editdataresult} header="จัดการ" style={{ textAlign: 'center', width: '25em' }} />
                      </DataTable>
                    </h4>
                  </div>
                </div>
              </div>
              <div className="fit" style={{ marginLeft: '1.5em' }}>
                <div className="grid p-fluid">
                  <div className="col-12 md:col-3">
                    <h4>ขั้นตอนการดำเนินการ :</h4>
                  </div>
                  <div className="col-12 md:col-9">
                    <h4>
                      <DataTable value={step} columnResizeMode="fit" showGridlines responsiveLayout="scroll" rows={10}>
                        <Column field="step_name" header="ขั้นตอนการดำเนินการ/รายการกิจกรรม" />
                        <Column field="start" header="เริ่มต้น" />
                        <Column field="stop" header="สิ้นสุด" />
                      </DataTable>
                    </h4>
                  </div>
                </div>
              </div>
              <div className="fit" style={{ marginLeft: '1.5em' }}>
                <div className="grid p-fluid">
                  <div className="col-12 md:col-3">
                    <h4>มีการดำเนินงานตามระยะเวลาที่กำหนด :</h4>
                  </div>
                  <div className="col-12 md:col-9">
                    <h4>
                      <Checkbox onChange={e => setChecked(e.checked)} checked={checked} />
                    </h4>
                  </div>
                </div>
              </div>
              <div className="fit" style={{ marginLeft: '1.5em' }}>
                <div className="grid p-fluid">
                  <div className="col-12 md:col-3">
                    <h4>รายละเอียดความก้าวหน้า :</h4>
                  </div>
                  <div className="col-12 md:col-9">
                    <h4>
                      <DataTable value={detail} columnResizeMode="fit" showGridlines responsiveLayout="scroll" rows={10}>
                        <Column field="detail" header="รายละเอียดความก้าวหน้า" />
                        <Column body={editdatadetail} header="จัดการ" style={{ textAlign: 'center', width: '17em' }} />
                      </DataTable>
                    </h4>
                  </div>
                </div>
              </div>
              <div className="fit" style={{ marginLeft: '1.5em' }}>
                <div className="grid p-fluid">
                  <div className="col-12 md:col-3">
                    <h4>ปัญหา/อุปสรรค :</h4>
                  </div>
                  <div className="col-12 md:col-9">
                    <h4>
                      <DataTable value={problem} columnResizeMode="fit" showGridlines responsiveLayout="scroll" rows={10}>
                        <Column field="problem" header="ปัญหา/อุปสรรค" />
                        <Column body={editdataproblem} header="จัดการ" style={{ textAlign: 'center', width: '16em' }} />
                      </DataTable>
                    </h4>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: '2em', marginLeft: '70.5em' }} >
                <Button label="บันทึก" className="p-button-success" style={{ height: '2.5em' }} onClick={() => showConfirm1(quartercharges[0].report_id)} />
              </div>
            </Panel>
          </Card>

          <div>
            <Modal
              title={<p className="m-0">{'แก้ไขผลตามตัวชี้วัด และบรรลุตามตัวชี้วัด'}</p>}
              open={displayBasic1}
              onCancel={onHide1}
              footer={null}
              width={700}
            >
              <div className="fit" style={{ marginLeft: '1.5em' }}>
                <div className="grid p-fluid">
                  <div className="col-12 md:col-3">
                    <h4>ผลตามตัวชี้วัด :</h4>
                  </div>
                  <div className="col-12 md:col-3">
                    <InputText
                      value={editresult}
                      onChange={(e) => setEditresult(e.target.value)}
                      style={{ width: '28em' }}
                      placeholder="ผลตามตัวชี้วัด"
                    />
                  </div>
                </div>
              </div>
              <div className="fit" style={{ marginLeft: '1.5em' }}>
                <div className="grid p-fluid">
                  <div className="col-12 md:col-3">
                    <h4 style={{ marginTop: '1em' }}>บรรลุตามตัวชี้วัด :</h4>
                  </div>
                  <div className="col-12 md:col-3">
                    <h4>
                      <Checkbox onChange={e => setChecked1(e.checked)} checked={checked1} style={{ marginTop: '1em' }} />
                    </h4>
                  </div>
                </div>
              </div>
              <div className="text-right mt-4">
                <Button label="ยกเลิก" icon="pi pi-times" className="p-button-danger" style={{ height: '2.5em' }} onClick={onHide1} />
                <Button label="บันทึก" icon="pi pi-check" className="p-button-success" style={{ width: '7em', marginLeft: '.4em', height: '2.5em' }} onClick={() => showConfirm2(resultid)} autoFocus />
              </div>
            </Modal>
          </div>

          <div>
            <Modal
              title={<p className="m-0">{'แก้ไขรายละเอียดความก้าวหน้า'}</p>}
              open={displayBasic2}
              onCancel={onHide2}
              footer={null}
              width={700}
            >
              <div className="fit" style={{ marginLeft: '1.5em' }}>
                <div className="grid p-fluid">
                  <div className="col-12 md:col-4">
                    <h4>รายละเอียดความก้าวหน้า :</h4>
                  </div>
                  <div className="col-12 md:col-5">
                    <InputText
                      value={editdetail}
                      onChange={(e) => setEditdetail(e.target.value)}
                      style={{ width: '25em' }}
                      placeholder="รายละเอียดความก้าวหน้า"
                    />
                  </div>
                </div>
              </div>
              <div className="text-right mt-4">
                <Button label="ยกเลิก" icon="pi pi-times" className="p-button-danger" style={{ height: '2.5em' }} onClick={onHide2} />
                <Button label="บันทึก" icon="pi pi-check" className="p-button-success" style={{ width: '7em', marginLeft: '.4em', height: '2.5em' }} onClick={() => showConfirm3(detailid)} autoFocus />
              </div>
            </Modal>
          </div>

          <div>
            <Modal
              title={<p className="m-0">{'แก้ไขปัญหา/อุปสรรค'}</p>}
              open={displayBasic3}
              onCancel={onHide3}
              footer={null}
              width={700}
            >
              <div className="fit" style={{ marginLeft: '1.5em' }}>
                <div className="grid p-fluid">
                  <div className="col-12 md:col-3">
                    <h4>ปัญหา/อุปสรรค :</h4>
                  </div>
                  <div className="col-12 md:col-2">
                    <InputText
                      value={editproblem}
                      onChange={(e) => setEditproblem(e.target.value)}
                      style={{ width: '28.5em' }}
                      placeholder="ปัญหา/อุปสรรค"
                    />
                  </div>
                </div>
              </div>
              <div className="text-right mt-4">
                <Button label="ยกเลิก" icon="pi pi-times" className="p-button-danger" style={{ height: '2.5em' }} onClick={onHide3} />
                <Button label="บันทึก" icon="pi pi-check" className="p-button-success" style={{ width: '7em', marginLeft: '.4em', height: '2.5em' }} onClick={() => showConfirm4(problemid)} autoFocus />
              </div>
            </Modal>
          </div>
          {/* <Dialog
              style={{ width: '450px', width: "50vw" }} header="แก้ไขผลตามตัวชี้วัด และบรรลุตามตัวชี้วัด" modal className="p-fluid"
              visible={visible1}
              footer={renderFooter1}
              onHide={onHide}
            >
              <div className="fit" style={{ marginLeft: '1.5em' }}>
                <div className="grid p-fluid">
                  <div className="col-12 md:col-3">
                    <h4>ผลตามตัวชี้วัด :</h4>
                  </div>
                  <div className="col-12 md:col-3">
                    <InputText
                      value={editresult}
                      onChange={(e) => setEditresult(e.target.value)}
                      style={{ width: '30em' }}
                      placeholder="ผลตามตัวชี้วัด"
                    />
                  </div>
                </div>
              </div>
              <div className="fit" style={{ marginLeft: '1.5em' }}>
                <div className="grid p-fluid">
                  <div className="col-12 md:col-3">
                    <h4>บรรลุตามตัวชี้วัด :</h4>
                  </div>
                  <div className="col-12 md:col-3">
                    <h4>
                      <Checkbox onChange={e => setChecked1(e.checked)} checked={checked1} />
                    </h4>
                  </div>
                </div>
              </div>
            </Dialog>

            <Dialog
              style={{ width: '450px', width: "50vw" }} header="เแก้ไขรายละเอียดความก้าวหน้า" modal className="p-fluid"
              visible={visible2}
              footer={renderFooter2}
              onHide={onHide}
            >
              <div className="fit" style={{ marginLeft: '1.5em' }}>
                <div className="grid p-fluid">
                  <div className="col-12 md:col-4">
                    <h4>รายละเอียดความก้าวหน้า :</h4>
                  </div>
                  <div className="col-12 md:col-5">
                    <InputText
                      value={editdetail}
                      onChange={(e) => setEditdetail(e.target.value)}
                      style={{ width: '26em' }}
                      placeholder="รายละเอียดความก้าวหน้า"
                    />
                  </div>
                </div>
              </div>
            </Dialog>

            <Dialog
              style={{ width: '450px', width: "50vw" }} header="เแก้ไขปัญหา/อุปสรรค" modal className="p-fluid"
              visible={visible3}
              footer={renderFooter3}
              onHide={onHide}
            >
              <div className="fit" style={{ marginLeft: '1.5em' }}>
                <div className="grid p-fluid">
                  <div className="col-12 md:col-3">
                    <h4>ปัญหา/อุปสรรค :</h4>
                  </div>
                  <div className="col-12 md:col-3">
                    <InputText
                      value={editproblem}
                      onChange={(e) => setEditproblem(e.target.value)}
                      style={{ width: '26em' }}
                      placeholder="ปัญหา/อุปสรรค"
                    />
                  </div>
                </div>
              </div>
            </Dialog> */}
        </div>
      </div>
    </>
  );
}

export default Editreportthree