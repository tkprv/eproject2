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

const Reportfour = () => {
  const location = useLocation()

  const [quartercharges, setQuartercharges] = useState([]);
  const [indic, setIndic] = useState([]);
  const [step, setStep] = useState([]);
  const [detail, setDetail] = useState([]);
  const [problem, setProblem] = useState([]);
  const [setDisplayBasic] = useState(false);
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

  const achieve = (node) => {
    if (node.achieve === 0) {
      return <Tag severity="danger" icon="pi pi-times" rounded></Tag>
    } else {
      return <Tag severity="success" icon="pi pi-check" rounded></Tag>
    }
  }

  const periodcheck = (node) => {
    if (node.period_check === 0) {
      return <Tag severity="danger" icon="pi pi-times" rounded></Tag>
    } else {
      return <Tag severity="success" icon="pi pi-check" rounded></Tag>
    }
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

  return (
    <>
      <Header onMenuClick={(value) => toggleMobileMenu()} />
      <Sidebar />
      <div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>
        <div className="page-wrapper">
          <div align="left">
            <h2 style={{ marginTop: '2em', marginLeft: '1em' }}>รายงานความก้าวหน้าไตรมาส 4</h2>
            <Card>
              <div className="fit" style={{ marginLeft: '1.5em' }}>
                <div className="grid p-fluid">
                  <div className="col-12 md:col-3">
                    <h3>ชื่อโครงการ :</h3>
                  </div>
                  <div className="col-12 md:col-9">
                    <h4> {location.state.project_name} </h4>
                  </div>
                </div>
              </div>
              <div className="fit" style={{ marginLeft: '1.5em' }}>
                <div className="grid p-fluid">
                  <div className="col-12 md:col-3">
                    <h3>งบประมาณที่จัดสรร :</h3>
                  </div>
                  <div className="col-12 md:col-9">
                    <h4> {location.state.butget} บาท</h4>
                  </div>
                </div>
              </div>
              <div className="fit" style={{ marginLeft: '1.5em' }}>
                <div className="grid p-fluid">
                  <div className="col-12 md:col-3">
                    <h3>งบไตรมาสที่ 4 :</h3>
                  </div>
                  <div className="col-12 md:col-9">
                    {quartercharges.map((value) => {
                      return <h4> {value?.used} บาท</h4>
                    })}
                  </div>
                </div>
              </div>
              <div className="fit" style={{ marginLeft: '1.5em' }}>
                <div className="grid p-fluid">
                  <div className="col-12 md:col-3">
                    <h3>ผลตามตัวชี้วัด :</h3>
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
              <div className="fit" style={{ marginLeft: '1.5em' }}>
                <div className="grid p-fluid">
                  <div className="col-12 md:col-3">
                    <h3>ขั้นตอนการดำเนินการ :</h3>
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
                    <h3>มีการดำเนินงานตามระยะเวลาที่กำหนด :</h3>
                  </div>
                  <div className="col-12 md:col-9">
                    {quartercharges.map((value) => {
                      return <h4> {value?.period_check === 0 ? <Tag severity="danger" style={{ alignItems: 'center' }} icon="pi pi-times" rounded></Tag> : <Tag severity="success" icon="pi pi-check" rounded></Tag>} </h4>
                    })}
                  </div>
                </div>
              </div>
              <div className="fit" style={{ marginLeft: '1.5em' }}>
                <div className="grid p-fluid">
                  <div className="col-12 md:col-3">
                    <h3>รายละเอียดความก้าวหน้า :</h3>
                  </div>
                  <div className="col-12 md:col-9">
                    {detail.map((value) => {
                      return <h4> {value?.detail} </h4>
                    })}
                  </div>
                </div>
              </div>
              <div className="fit" style={{ marginLeft: '1.5em' }}>
                <div className="grid p-fluid">
                  <div className="col-12 md:col-3">
                    <h3>ปัญหา/อุปสรรค :</h3>
                  </div>
                  <div className="col-12 md:col-9">
                    {problem.map((value) => {
                      return <h4> {value?.problem} </h4>
                    })}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

export default Reportfour