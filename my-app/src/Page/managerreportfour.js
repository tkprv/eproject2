import React, { useState, useEffect } from 'react'
import { Button } from 'primereact/button';
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import axios from 'axios'
import { useLocation } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';
import Header from '../initialpage/Sidebar/header';
import Sidebar from '../initialpage/Sidebar/sidebar';
import { Dialog } from 'primereact/dialog';
import { Panel } from 'primereact/panel';

const Managerreportfour = () => {
  const location = useLocation()
  const [confirm, setConfirm] = useState('');
  const [position, setPosition] = useState('center');
  const [displayBasic, setDisplayBasic] = useState(false);
  const [quartercharges, setQuartercharges] = useState([]);
  const [indic, setIndic] = useState([]);
  const [step, setStep] = useState([]);
  const [detail, setDetail] = useState([]);
  const [problem, setProblem] = useState([]);
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
    'confirm': setConfirm,
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

  const achieve = (node) => {
    if (node.achieve === 0) {
      return <Tag severity="danger" icon="pi pi-times" rounded></Tag>
    } else {
      return <Tag severity="success" icon="pi pi-check" rounded></Tag>
    }
  }

  const renderFooter1 = (name) => {
    return (
      <div>
        <Button label="ยกเลิก" icon="pi pi-times" className="p-button-danger" style={{ height: '2.5em' }} onClick={() => onHide(name)} />
        <Button label="ยืนยัน" icon="pi pi-check" className="p-button-success" style={{ height: '2.5em' }} onClick={() => openreport(location.state.project_id, 1)} />
      </div>
    );
  }

  const getquartercharges = () => {
    axios
      .get(`http://localhost:3001/datareport/quarterchargesfour/${location.state.project_id}`, {})
      .then((res) => {
        console.log(res.data)
        setQuartercharges(res.data)
      }).catch((error) => {
        console.log(error)
      });
  }
  console.log('11', quartercharges)

  const getindic = () => {
    axios
      .get(`http://localhost:3001/datareport/indicreportfour/${location.state.project_id}`, {})
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
      .get(`http://localhost:3001/datareport/detailreportfour/${location.state.project_id}`, {})
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
      .get(`http://localhost:3001/datareport/problemreportfour/${location.state.project_id}`, {})
      .then((res) => {
        console.log(res.data)
        setProblem(res.data)
      }).catch((error) => {
        console.log(error)
      });
  }
  console.log('55', problem)

  
  const openreport = (id, n) => {
    console.log('tt', id)
    onHide('confirm')
    axios
      .put(`http://localhost:3001/dataproject/openreportfour/${id}`, {
        open_reportfour: n
      })
    alert(`เปิดรายงานความก้าวหน้าไตรมาส 4 ใช่มั้ย`)
  }

  return (
    <>
      <Header onMenuClick={(value) => toggleMobileMenu()} />
      <Sidebar />
      <div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>
        <div className="page-wrapper">
            <Card>
            <Panel header='รายงานความก้าวหน้าไตรมาส 4'>
             <Button icon="pi pi-eye" label="เปิดใช้รายงานความก้าวหน้าไตรมาส 4" severity="info" style={{ marginLeft: '54em', height: '2.5em', marginBottom: '1em' }} onClick={() => onClick('confirm')} />
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
                    <h4>งบประมาณที่จัดสรร :</h4>
                  </div>
                  <div className="col-12 md:col-9">
                    <h4> {location.state.butget} บาท</h4>
                  </div>
                </div>
              </div>
              <div className="fit">
                <div className="grid p-fluid">
                  <div className="col-12 md:col-3">
                    <h4>ผลการใช้จ่าย :</h4>
                  </div>
                  <div className="col-12 md:col-9">
                    {quartercharges.map((value) => {
                      return <h4> {value?.used} บาท</h4>
                    })}
                  </div>
                </div>
              </div>
              <div className="fit">
                <div className="grid p-fluid">
                  <div className="col-12 md:col-3">
                    <h4>ผลตามตัวชี้วัด :</h4>
                  </div>
                  <div className="col-12 md:col-9">
                    <h4>
                      <DataTable value={indic} columnResizeMode="fit" showGridlines responsiveLayout="scroll" rows={10}>
                        <Column field="indic_project" header="ตัวชี้วัด" />
                        <Column field="cost" header="เป้าหมาย" />
                        <Column field="result" header="ผลตามตัวชี้วัด" />
                        <Column body={achieve} header="บรรลุตามตัวชี้วัด" />
                      </DataTable>
                    </h4>
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
                      <DataTable value={step} columnResizeMode="fit" showGridlines responsiveLayout="scroll" rows={10}>
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
                    <h4>มีการดำเนินงานตามระยะเวลาที่กำหนด :</h4>
                  </div>
                  <div className="col-12 md:col-9">
                    {quartercharges.map((value) => {
                      return <h4> {value?.period_check === 0 ? <Tag severity="danger" style={{ alignItems: 'center' }} icon="pi pi-times" rounded></Tag> : <Tag severity="success" icon="pi pi-check" rounded></Tag>} </h4>
                    })}
                  </div>
                </div>
              </div>
              <div className="fit">
                <div className="grid p-fluid">
                  <div className="col-12 md:col-3">
                    <h4>รายละเอียดความก้าวหน้า :</h4>
                  </div>
                  <div className="col-12 md:col-9">
                    {detail.map((value) => {
                      return <h4> {value?.detail} </h4>
                    })}
                  </div>
                </div>
              </div>
              <div className="fit">
                <div className="grid p-fluid">
                  <div className="col-12 md:col-3">
                    <h4>ปัญหา/อุปสรรค :</h4>
                  </div>
                  <div className="col-12 md:col-9">
                    {problem.map((value) => {
                      return <h4> {value?.problem} </h4>
                    })}
                  </div>
                </div>
              </div>
              </Panel>
            </Card>

            <Dialog header="แน่ใจหรือไม่?" visible={confirm} onHide={() => onHide('confirm')} breakpoints={{ '950x': '75vw' }} style={{ width: '40vw' }} footer={renderFooter1('confirm')}>
              <div className="field" style={{ 'textAlign': 'center' }}>
                <i className="pi pi-exclamation-circle p-button-warning" style={{ 'fontSize': '8em', 'color': 'orange' }}></i>
                <p style={{ marginTop: 25 }}><h4>คุณต้องการเปิดรายงานความก้าวหน้าไตรมาส 4 ใช่มั้ย</h4></p>
              </div>
            </Dialog>
          </div>
        </div>
    </>
  );
}

export default Managerreportfour