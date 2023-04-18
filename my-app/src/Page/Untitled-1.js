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
import { Space, Table } from 'antd';
import { Panel } from 'primereact/panel';

const Datamanager = () => {
  const [fiscalyear, setFiscalyear] = useState([])
  const [project, setProject] = useState([])
  const [selectedfiscalyear, setSelectedFiscalyear] = useState(null)
  const [value2, setValue2] = useState('')
  const [menu, setMenu] = useState(false)
  const { Column, ColumnGroup } = Table
  let history = useHistory()

  const toggleMobileMenu = () => {
    setMenu(!menu)
  }


  const editproject = (node) => {
    console.log('11', node.project_id)
    return <div>
      <Button type="button" icon="pi pi-pencil" className="p-button-warning" style={{ height: '2.5em', width: '2.5em' }} onClick={() => history.push({ pathname: "/home/detailmanager", state: node })}>
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
    } else if (node.status === 6) {
      return <Tag className="mr-2" value="ปิดโครงการ/เสร็จตามระยะเวลา" rounded></Tag>
    } else if (node.status === 7) {
      return <Tag className="mr-2" value="ปิดโครงการ/ไม่เป็นไปตามระยะเวลา" rounded></Tag>
    } else if (node.status === 8) {
      return <Tag className="mr-2" value="ปิดโครงการ/ขอเลื่อน" rounded></Tag>
    } else if (node.status === 9) {
      return <Tag className="mr-2" value="ปิดโครงการ/ขอยกเลิก" rounded></Tag>
    }
    else {
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
    if (node.report_one === 0 && node.status !== 4 && node.status_report1 === 0) {
      return <Button type="button" icon="pi pi-search" className="p-button-secondary" style={{ height: '2.5em', width: '2.5em' }} disabled />
    } else if (node.status === 4 && node.report_one === 0 && node.status_report1 === 1) {
      return <Button type="button" icon="pi pi-search" className="p-button-secondary" style={{ height: '2.5em', width: '2.5em' }} onClick={() => history.push({ pathname: "/home/managerreportone", state: node })} />
    } else {
      return <Button type="button" icon="pi pi-search" className="p-button-secondary" style={{ height: '2.5em', width: '2.5em' }} onClick={() => history.push({ pathname: "/home/managerreportone", state: node })} />
    }
  }

  const report2 = (node) => {
    if (node.report_two === 0 && node.status !== 4 && node.status_report2 === 0) {
      return <Button type="button" icon="pi pi-search" className="p-button-secondary" style={{ height: '2.5em', width: '2.5em' }} disabled />
    } else if (node.status === 4 && node.report_two === 0 && node.status_report2 === 1) {
      return <Button type="button" icon="pi pi-search" className="p-button-secondary" style={{ height: '2.5em', width: '2.5em' }} onClick={() => history.push({ pathname: "/home/managerreporttwo", state: node })} />
    } else {
      return <Button type="button" icon="pi pi-search" className="p-button-secondary" style={{ height: '2.5em', width: '2.5em' }} onClick={() => history.push({ pathname: "/home/managerreporttwo", state: node })} />
    }

  }

  const report3 = (node) => {
    if (node.report_three === 0 && node.status !== 4 && node.status_report3 === 0) {
      return <Button type="button" icon="pi pi-search" className="p-button-secondary" style={{ height: '2.5em', width: '2.5em' }} disabled />
    } else if (node.status === 4 && node.report_three === 0 && node.status_report3 === 1) {
      return <Button type="button" icon="pi pi-search" className="p-button-secondary" style={{ height: '2.5em', width: '2.5em' }} onClick={() => history.push({ pathname: "/home/managerreportthree", state: node })} />
    } else {
      return <Button type="button" icon="pi pi-search" className="p-button-secondary" style={{ height: '2.5em', width: '2.5em' }} onClick={() => history.push({ pathname: "/home/managerreportthree", state: node })} />
    }
  }

  const report4 = (node) => {
    if (node.report_four === 0 && node.status !== 4) {
      return <Button type="button" icon="pi pi-search" className="p-button-secondary" style={{ height: '2.5em', width: '2.5em' }} disabled />
    } else if (node.status === 4 && node.report_four === 0 && node.status_report4 === 1) {
      return <Button type="button" icon="pi pi-search" className="p-button-secondary" style={{ height: '2.5em', width: '2.5em' }} onClick={() => history.push({ pathname: "/home/managerreportfour", state: node })} />
    } else {
      return <Button type="button" icon="pi pi-search" className="p-button-secondary" style={{ height: '2.5em', width: '2.5em' }} onClick={() => history.push({ pathname: "/home/managerreportfour", state: node })} />
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

  useEffect(() => {
    Project()
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

  return (
    <>
      <Header onMenuClick={(value) => toggleMobileMenu()} />
      <Sidebar />
      <div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>
        <div className="page-wrapper">
          <Card>
            <Panel header='จัดการข้อมูลโครงการ'>
              <div className="text-left">
                <div className="fit">
                  <h4>ปีงบประมาณ
                    <Dropdown value={selectedfiscalyear} options={fiscalyear} style={{ width: '10em', marginLeft: '1em', marginRight: '4em' }} onChange={onsetFiscalyear} optionLabel="fiscalyear" placeholder="ทุกปี" />
                    สถานะ
                    <Dropdown value={value2} style={{ width: '30em', marginLeft: '1em' }} onChange={(e) => setValue2(e.target.value)} placeholder="ทุกสถานะ" />
                    <Button label="ค้นหา" className="p-button-success" style={{ marginLeft: ".8em" }} />
                  </h4>
                </div>
                <div style={{ marginTop: "2.5em" }}>
                  <DataTable value={project} columnResizeMode="fit" showGridlines responsiveLayout="scroll" dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}>
                    <Column field="project_name" sortable header="ชื่อโครงการ" />
                    <Column body={Status} header="สถานะ" style={{ textAlign: 'center', width: "18%" }} />
                    <Column body={editproject} header="แก้ไข" style={{ textAlign: 'center', width: "1%" }} />
                    <Column body={report1} header="รายงานความก้าวหน้าไตรมาส 1" style={{ textAlign: 'center', width: "11%" }} />
                    <Column body={report2} header="รายงานความก้าวหน้าไตรมาส 2" style={{ textAlign: 'center', width: "11%" }} />
                    <Column body={report3} header="รายงานความก้าวหน้าไตรมาส 3" style={{ textAlign: 'center', width: "11%" }} />
                    <Column body={report4} header="รายงานความก้าวหน้าไตรมาส 4" style={{ textAlign: 'center', width: "11%" }} />
                  </DataTable>
                </div>
              </div>
            </Panel>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Datamanager