import 'primeicons/primeicons.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.css'
import 'primeflex/primeflex.css'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Dropdown } from 'primereact/dropdown'
import { useHistory } from "react-router-dom";
import { Tag } from 'primereact/tag';
import Header from '../initialpage/Sidebar/header';
import Sidebar from '../initialpage/Sidebar/sidebar';
import { Card } from "primereact/card";

const Datadirector = () => {
  const [fiscalyear, setFiscalyear] = useState([])
  const [section, setSection] = useState([])
  const [project, setProject] = useState([])
  const [selectedfiscalyear, setSelectedFiscalyear] = useState(null);
  const [selectedsection, setSelectedSection] = useState(null);
  const [userproject, setUserproject] = useState([])
  const [value3, setValue3] = useState('')
  const [menu, setMenu] = useState(false)
  let history = useHistory();

  const toggleMobileMenu = () => {
    setMenu(!menu)
  }

  const detailproject = (node, column) => {
    console.log('11', node.project_id)
    console.log('22', node.user_project_id)
    return <div>
      <Button type="button" icon="pi pi-eye" className="p-button-outlined p-button-secondary" onClick={() => history.push({ pathname: "/home/detaildirector", state: node })
      }>
      </Button>
    </div>;
  }

  const Status = (node) => {
    if (node.status === 0) {
      return <Tag className="mr-2" severity="warning" value="รอหัวหน้าฝ่ายพิจารณา" rounded></Tag>
    } else if (node.status === 1) {
      return <Tag className="mr-2" severity="info" value="รอเจ้าหน้าที่ฝ่ายแผนตรวจสอบ" rounded></Tag>
    } else if (node.status === 2) {
      return <Tag className="mr-2" severity="danger" value="ไม่ผ่านอนุมัติจากหัวหน้าฝ่าย" rounded></Tag>
    } else if (node.status === 3) {
      return <Tag className="mr-2" severity="warning" value="รอผู้บริหารพิจารณา" rounded></Tag>
    } else if (node.status === 4) {
      return <Tag className="mr-2" severity="success" value="อนุมัติโครงการ" rounded></Tag>
    } else if (node.status === 5) {
      return <Tag className="mr-2" severity="danger" value="ไม่ผ่านอนุมัติจากผู้บริหาร" rounded></Tag>
    } else {
      return node.status
    }
  }

  const reportproject = (node) => {
    if (node.tor === 0) {
      return <Tag className="mr-2" severity="danger" value="ยังไม่มีเอกสาร" rounded></Tag>
    } else {
      return <div>
        <i className="pi pi-file-pdf" style={{ fontSize: '2rem', color: 'red', marginRight: '.1em' }}></i>
        <i className="pi pi-file-excel" style={{ fontSize: '2rem', color: 'green' }}></i>
      </div>
    }
  }

  const report1 = (node) => {
    if (node.report_one === 0) {
      return <Button type="button" icon="pi pi-search" className="p-button-secondary" disabled />
    } else {
      return <Button type="button" icon="pi pi-search" className="p-button-secondary" onClick={() => history.push({ pathname: "/home/reportone", state: node })} />
    }
  }

  const report2 = (node) => {
    if (node.report_two === 0) {
      return <Button type="button" icon="pi pi-search" className="p-button-secondary" disabled />
    } else {
      return <Button type="button" icon="pi pi-search" className="p-button-secondary" onClick={() => history.push({ pathname: "/home/reporttwo", state: node })} />
    }
  }

  const report3 = (node, column) => {
    if (node.report_three === 0) {
      return <Button type="button" icon="pi pi-search" className="p-button-secondary" disabled />
    } else {
      return <Button type="button" icon="pi pi-search" className="p-button-secondary" onClick={() => history.push({ pathname: "/home/reportthree", state: node })} />
    }
  }

  const report4 = (node, column) => {
    if (node.report_four === 0) {
      return <Button type="button" icon="pi pi-search" className="p-button-secondary" disabled />
    } else {
      return <Button type="button" icon="pi pi-search" className="p-button-secondary" onClick={() => history.push({ pathname: "/home/reportfour", state: node })} />
    }
  }

  useEffect(() => {
    axios
      .get("http://localhost:3001/dataproject/fiscalyear", {})
      .then((res) => {
        setFiscalyear(res.data)
      })
      .catch((error) => {
        console.log(error)
      });
  }, []);

  const onsetFiscalyear = (e) => {
    setSelectedFiscalyear(e.value);
  }

  const getsection = () => {
    axios
      .get("http://localhost:3001/dataproject/section", {})
      .then((res) => {
        setSection(res.data)
      })
      .catch((error) => {
        console.log(error)
      });
  }

  const onsetSection = (e) => {
    setSelectedSection(e.value);
  }

  useEffect(() => {
    Project()
    getsection()
  }, []);
  const Project = () => {
    axios
      .get("http://localhost:3001/dataproject/project", {})
      .then((res) => {
        setProject(res.data)
        console.log('log', res)
      })
      .catch((error) => {
        console.log(error)
      });
  }

  useEffect(() => {
    axios
      .get(`http://localhost:3001/dataproject/userproject`, {})
      .then((res) => {
        console.log(res.data)
        setUserproject(res.data)
      }).catch((error) => {
        console.log(error)
      });
  }, []);
  console.log('22', userproject)
  console.log("11111", fiscalyear)

  return (
    <>
      <Header onMenuClick={(value) => toggleMobileMenu()} />
      <Sidebar />
      <div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>
        <div className="page-wrapper">
          <h3>จัดการข้อมูลโครงการ</h3>
          <Card>
            <div className="text-left">
              <div className="fit">
                <h4>ปีงบประมาณ</h4>
                <Dropdown value={selectedfiscalyear} options={fiscalyear} style={{ width: '10em' }} onChange={onsetFiscalyear} optionLabel="fiscalyear" placeholder="ทุกปี" />
                <h4>หน่วยงาน</h4>
                <Dropdown value={selectedsection} options={section} style={{ width: '30em' }} onChange={onsetSection} optionLabel="section_name" placeholder="ทุกหน่วยงาน" />
                <h4>สถานะ</h4>
                <Dropdown value={value3} style={{ width: '30em' }} onChange={(e) => setValue3(e.target.value)} placeholder="ทุกสถานะ" />
                <Button label="ค้นหา" className="p-button-success" style={{ marginLeft: '.8em' }} />
              </div>
              <div style={{ marginTop: "2.5em" }}>
                <DataTable value={project} columnResizeMode="fit" showGridlines responsiveLayout="scroll" dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}>
                  <Column field="project_name" header="ชื่อโครงการ" />
                  <Column body={detailproject} header="รายละเอียดโครงการ" style={{ textAlign: 'center', width: "8%" }} />
                  <Column body={Status} field="status" header="สถานะ" style={{ textAlign: 'center', width: "9.5%" }} />
                  <Column body={report1} header="รายงานความก้าวหน้าไตรมาส 1" style={{ textAlign: 'center', width: "11%" }} />
                  <Column body={report2} header="รายงานความก้าวหน้าไตรมาส 2" style={{ textAlign: 'center', width: "11%" }} />
                  <Column body={report3} header="รายงานความก้าวหน้าไตรมาส 3" style={{ textAlign: 'center', width: "11%" }} />
                  <Column body={report4} header="รายงานความก้าวหน้าไตรมาส 4" style={{ textAlign: 'center', width: "11%" }} />
                  <Column field="value" header="วันที่สร้าง" style={{ textAlign: 'center', width: "11%" }} />
                  <Column body={reportproject} header="เอกสารโครงการ" style={{ textAlign: 'center' }} />
                </DataTable>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Datadirector