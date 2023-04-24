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
import { getLocalId } from '../helper/utill'
import { RedoOutlined } from '@ant-design/icons'
import { Space, Table, Tooltip } from 'antd';
import { Panel } from 'primereact/panel';

const Datareport = () => {

  const [projectmanager, setProjectmanager] = useState([])
  const [displayBasic, setDisplayBasic] = useState(false)
  const [menu, setMenu] = useState(false)
  let history = useHistory();

  const dialogFuncMap = {
    'displayBasic': setDisplayBasic,
  }

  const toggleMobileMenu = () => {
    setMenu(!menu)
  }

  const Status = (node) => {
    console.log('node', node)
    if (node.status === 0) {
      return <Tag className="mr-2" severity="warning" value="รอหัวหน้าฝ่ายพิจารณา"></Tag>
    } else if (node.status === 1) {
      return <Tag className="mr-2" severity="info" value="รอเจ้าหน้าที่ฝ่ายแผนตรวจสอบ"></Tag>
    } else if (node.status === 2) {
      return <Tag className="mr-2" severity="danger" value="ไม่ผ่านอนุมัติจากหัวหน้าฝ่าย"></Tag>
    } else if (node.status === 3) {
      return <Tag className="mr-2" severity="warning" value="รอผู้บริหารพิจารณา"></Tag>
    } else if (node.status === 4) {
      return <Tag className="mr-2" severity="success" value="อนุมัติโครงการ"></Tag>
    } else if (node.status === 5) {
      return <Tag className="mr-2" severity="danger" value="ไม่ผ่านอนุมัติจากผู้บริหาร"></Tag>
    } else if (node.status === 6 && node.status_evaluation === 3) {
      return <Tag className="mr-2" value="ปิดโครงการ/เสร็จตามระยะเวลา"></Tag>
    } else if (node.status === 7 && node.status_evaluation === 3) {
      return <Tag className="mr-2" value="ปิดโครงการ/ไม่เป็นไปตามระยะเวลา"></Tag>
    } else if (node.status === 8 && node.status_evaluation === 3) {
      return <Tag className="mr-2" value="ปิดโครงการ/ขอเลื่อน"></Tag>
    } else if (node.status === 9 && node.status_evaluation === 3) {
      return <Tag className="mr-2" value="ปิดโครงการ/ขอยกเลิก"></Tag>
    } else if (node.status_evaluation === 0 && (node.status === 6 || node.status === 7 || node.status === 8 || node.status === 9)) {
      return <Tag className="mr-2" severity="warning" value="รอเจ้าหน้าที่ฝ่ายแผนอนุมัติปิดโครงการ"></Tag>
    } else if (node.status_evaluation === 1 && (node.status === 6 || node.status === 7 || node.status === 8 || node.status === 9)) {
      return <Tag className="mr-2" severity="warning" value="รอผู้บริหารอนุมัติปิดโครงการ"></Tag>
    } else if ((node.status_evaluation === 2 || node.status_evaluation === 4) && (node.status === 6 || node.status === 7 || node.status === 8 || node.status === 9)) {
      return <Tag className="mr-2" severity="danger" value="แก้ไขเอกสารประเมินโครงการ"></Tag>
    } else {
      return node.status
    }
  }

  const report1 = (node) => {
    if (node.status === 4 && node.report_one === 0 && node.open_reportone === 1) {
      return <div>
        <Tooltip placement="bottom" title={<span>ดูรายงานความก้าวหน้าไตรมาส 1</span>} ><Button type="button" icon="pi pi-search" className="p-button-info" style={{ height: '2.5em', width: '2.5em' }} disabled /></Tooltip>
        <Tooltip placement="bottom" title={<span>เพิ่มรายงานความก้าวหน้าไตรมาส 1</span>} ><Button type="button" icon="pi pi-plus" className="p-button-success" style={{ marginLeft: '.5em', height: '2.5em', width: '2.5em' }} onClick={() => history.push({ pathname: "/home/addreportone", state: node })} /></Tooltip>
        <Tooltip placement="bottom" title={<span>แก้ไขรายงานความก้าวหน้าไตรมาส 1</span>} ><Button type="button" icon="pi pi-pencil" className="p-button-warning" style={{ marginLeft: '.5em', height: '2.5em', width: '2.5em' }} disabled /></Tooltip>
      </div>
    } else if (node.status === 4 && node.report_one !== 0 && node.status_report1 === 1) {
      return <div>
        <Tooltip placement="bottom" title={<span>ดูรายงานความก้าวหน้าไตรมาส 1</span>} ><Button type="button" icon="pi pi-search" className="p-button-info" style={{ height: '2.5em', width: '2.5em' }} onClick={() => history.push({ pathname: "/home/reportone", state: node })} /></Tooltip>
        <Tooltip placement="bottom" title={<span>เพิ่มรายงานความก้าวหน้าไตรมาส 1</span>} ><Button type="button" icon="pi pi-plus" className="p-button-success" style={{ marginLeft: '.5em', height: '2.5em', width: '2.5em' }} disabled /></Tooltip>
        <Tooltip placement="bottom" title={<span>แก้ไขรายงานความก้าวหน้าไตรมาส 1</span>} ><Button type="button" icon="pi pi-pencil" className="p-button-warning" style={{ marginLeft: '.5em', height: '2.5em', width: '2.5em' }} onClick={() => history.push({ pathname: "/home/editreportone", state: node })} /></Tooltip>
      </div>
    }
    else {
      return <div>
        <Tooltip placement="bottom" title={<span>ดูรายงานความก้าวหน้าไตรมาส 1</span>} ><Button type="button" icon="pi pi-search" className="p-button-info" style={{ height: '2.5em', width: '2.5em' }} disabled /></Tooltip>
        <Tooltip placement="bottom" title={<span>เพิ่มรายงานความก้าวหน้าไตรมาส 1</span>} ><Button type="button" icon="pi pi-plus" className="p-button-success" style={{ marginLeft: '.5em', height: '2.5em', width: '2.5em' }} disabled /></Tooltip>
        <Tooltip placement="bottom" title={<span>แก้ไขรายงานความก้าวหน้าไตรมาส 1</span>} ><Button type="button" icon="pi pi-pencil" className="p-button-warning" style={{ marginLeft: '.5em', height: '2.5em', width: '2.5em' }} disabled /></Tooltip>
      </div>
    }
  }

  const report2 = (node) => {
    if (node.status === 4 && node.report_two === 0 && node.open_reporttwo === 1) {
      return <div>
        <Tooltip placement="bottom" title={<span>ดูรายงานความก้าวหน้าไตรมาส 2</span>} ><Button type="button" icon="pi pi-search" className="p-button-info" style={{ height: '2.5em', width: '2.5em' }} disabled /></Tooltip>
        <Tooltip placement="bottom" title={<span>เพิ่มรายงานความก้าวหน้าไตรมาส 2</span>} ><Button type="button" icon="pi pi-plus" className="p-button-success" style={{ marginLeft: '.5em', height: '2.5em', width: '2.5em' }} onClick={() => history.push({ pathname: "/home/addreporttwo", state: node })} /></Tooltip>
        <Tooltip placement="bottom" title={<span>แก้ไขรายงานความก้าวหน้าไตรมาส 2</span>} ><Button type="button" icon="pi pi-pencil" className="p-button-warning" style={{ marginLeft: '.5em', height: '2.5em', width: '2.5em' }} disabled /></Tooltip>
      </div>
    } else if (node.status === 4 && node.report_two !== 0 && node.status_report2 === 1) {
      return <div>
        <Tooltip placement="bottom" title={<span>ดูรายงานความก้าวหน้าไตรมาส 2</span>} ><Button type="button" icon="pi pi-search" className="p-button-info" style={{ height: '2.5em', width: '2.5em' }} onClick={() => history.push({ pathname: "/home/reporttwo", state: node })} /></Tooltip>
        <Tooltip placement="bottom" title={<span>เพิ่มรายงานความก้าวหน้าไตรมาส 2</span>} ><Button type="button" icon="pi pi-plus" className="p-button-success" style={{ marginLeft: '.5em', height: '2.5em', width: '2.5em' }} disabled /></Tooltip>
        <Tooltip placement="bottom" title={<span>แก้ไขรายงานความก้าวหน้าไตรมาส 2</span>} ><Button type="button" icon="pi pi-pencil" className="p-button-warning" style={{ marginLeft: '.5em', height: '2.5em', width: '2.5em' }} onClick={() => history.push({ pathname: "/home/editreporttwo", state: node })} /></Tooltip>
      </div>
    } else {
      return <div>
        <Tooltip placement="bottom" title={<span>ดูรายงานความก้าวหน้าไตรมาส 2</span>} ><Button type="button" icon="pi pi-search" className="p-button-info" style={{ height: '2.5em', width: '2.5em' }} disabled /></Tooltip>
        <Tooltip placement="bottom" title={<span>เพิ่มรายงานความก้าวหน้าไตรมาส 2</span>} ><Button type="button" icon="pi pi-plus" className="p-button-success" style={{ marginLeft: '.5em', height: '2.5em', width: '2.5em' }} disabled /></Tooltip>
        <Tooltip placement="bottom" title={<span>แก้ไขรายงานความก้าวหน้าไตรมาส 2</span>} ><Button type="button" icon="pi pi-pencil" className="p-button-warning" style={{ marginLeft: '.5em', height: '2.5em', width: '2.5em' }} disabled /></Tooltip>
      </div>
    }
  }

  const report3 = (node) => {
    if (node.status === 4 && node.report_three === 0 && node.open_reportthree === 1) {
      return <div>
        <Tooltip placement="bottom" title={<span>ดูรายงานความก้าวหน้าไตรมาส 3</span>} ><Button type="button" icon="pi pi-search" className="p-button-info" style={{ height: '2.5em', width: '2.5em' }} disabled /></Tooltip>
        <Tooltip placement="bottom" title={<span>เพิ่มรายงานความก้าวหน้าไตรมาส 3</span>} ><Button type="button" icon="pi pi-plus" className="p-button-success" style={{ marginLeft: '.5em', height: '2.5em', width: '2.5em' }} onClick={() => history.push({ pathname: "/home/addreportthree", state: node })} /></Tooltip>
        <Tooltip placement="bottom" title={<span>แก้ไขรายงานความก้าวหน้าไตรมาส 3</span>} ><Button type="button" icon="pi pi-pencil" className="p-button-warning" style={{ marginLeft: '.5em', height: '2.5em', width: '2.5em' }} disabled /></Tooltip>
      </div>
    } else if (node.status === 4 && node.report_three !== 0 && node.status_report3 === 1) {
      return <div>
        <Tooltip placement="bottom" title={<span>ดูรายงานความก้าวหน้าไตรมาส 3</span>} ><Button type="button" icon="pi pi-search" className="p-button-info" style={{ height: '2.5em', width: '2.5em' }} onClick={() => history.push({ pathname: "/home/reportthree", state: node })} /></Tooltip>
        <Tooltip placement="bottom" title={<span>เพิ่มรายงานความก้าวหน้าไตรมาส 3</span>} ><Button type="button" icon="pi pi-plus" className="p-button-success" style={{ marginLeft: '.5em', height: '2.5em', width: '2.5em' }} disabled /></Tooltip>
        <Tooltip placement="bottom" title={<span>แก้ไขรายงานความก้าวหน้าไตรมาส 3</span>} ><Button type="button" icon="pi pi-pencil" className="p-button-warning" style={{ marginLeft: '.5em', height: '2.5em', width: '2.5em' }} onClick={() => history.push({ pathname: "/home/editreportthree", state: node })} /></Tooltip>
      </div>
    } else {
      return <div>
        <Tooltip placement="bottom" title={<span>ดูรายงานความก้าวหน้าไตรมาส 3</span>} ><Button type="button" icon="pi pi-search" className="p-button-info" style={{ height: '2.5em', width: '2.5em' }} disabled /></Tooltip>
        <Tooltip placement="bottom" title={<span>เพิ่มรายงานความก้าวหน้าไตรมาส 3</span>} ><Button type="button" icon="pi pi-plus" className="p-button-success" style={{ marginLeft: '.5em', height: '2.5em', width: '2.5em' }} disabled /></Tooltip>
        <Tooltip placement="bottom" title={<span>แก้ไขรายงานความก้าวหน้าไตรมาส 3</span>} ><Button type="button" icon="pi pi-pencil" className="p-button-warning" style={{ marginLeft: '.5em', height: '2.5em', width: '2.5em' }} disabled /></Tooltip>
      </div>
    }
  }

  const report4 = (node) => {
    if (node.status === 4 && node.report_four === 0 && node.open_reportfour === 1) {
      return <div>
        <Tooltip placement="bottom" title={<span>ดูรายงานความก้าวหน้าไตรมาส 4</span>} ><Button type="button" icon="pi pi-search" className="p-button-info" style={{ height: '2.5em', width: '2.5em' }} disabled /></Tooltip>
        <Tooltip placement="bottom" title={<span>เพิ่มรายงานความก้าวหน้าไตรมาส 4</span>} ><Button type="button" icon="pi pi-plus" className="p-button-success" style={{ marginLeft: '.5em', height: '2.5em', width: '2.5em' }} onClick={() => history.push({ pathname: "/home/addreportfour", state: node })} /></Tooltip>
        <Tooltip placement="bottom" title={<span>แก้ไขรายงานความก้าวหน้าไตรมาส 4</span>} ><Button type="button" icon="pi pi-pencil" className="p-button-warning" style={{ marginLeft: '.5em', height: '2.5em', width: '2.5em' }} disabled /></Tooltip>
      </div>
    } else if (node.status === 4 && node.report_four !== 0 && node.status_report4 === 1) {
      return <div>
        <Tooltip placement="bottom" title={<span>ดูรายงานความก้าวหน้าไตรมาส 4</span>} ><Button type="button" icon="pi pi-search" className="p-button-info" style={{ height: '2.5em', width: '2.5em' }} onClick={() => history.push({ pathname: "/home/reportfour", state: node })} /></Tooltip>
        <Tooltip placement="bottom" title={<span>เพิ่มรายงานความก้าวหน้าไตรมาส 4</span>} ><Button type="button" icon="pi pi-plus" className="p-button-success" style={{ marginLeft: '.5em', height: '2.5em', width: '2.5em' }} disabled /></Tooltip>
        <Tooltip placement="bottom" title={<span>แก้ไขรายงานความก้าวหน้าไตรมาส 4</span>} ><Button type="button" icon="pi pi-pencil" className="p-button-warning" style={{ marginLeft: '.5em', height: '2.5em', width: '2.5em' }} onClick={() => history.push({ pathname: "/home/editreportfour", state: node })} /></Tooltip>
      </div>
    }
    else {
      return <div>
        <Tooltip placement="bottom" title={<span>ดูรายงานความก้าวหน้าไตรมาส 4</span>} ><Button type="button" icon="pi pi-search" className="p-button-info" style={{ height: '2.5em', width: '2.5em' }} disabled /></Tooltip>
        <Tooltip placement="bottom" title={<span>เพิ่มรายงานความก้าวหน้าไตรมาส 4</span>} ><Button type="button" icon="pi pi-plus" className="p-button-success" style={{ marginLeft: '.5em', height: '2.5em', width: '2.5em' }} disabled /></Tooltip>
        <Tooltip placement="bottom" title={<span>แก้ไขรายงานความก้าวหน้าไตรมาส 4</span>} ><Button type="button" icon="pi pi-pencil" className="p-button-warning" style={{ marginLeft: '.5em', height: '2.5em', width: '2.5em' }} disabled /></Tooltip>
      </div>
    }
  }

  useEffect(() => {
    Project()
  }, []);

  const Project = () => {
    const id = getLocalId()
    console.log('id', id);
    axios
      .get(`http://localhost:3001/dataproject/projectmanager/${id}`, {})
      .then((res) => {
        setProjectmanager(res.data)
      })
  }

  return (
    <>
      <Header onMenuClick={(value) => toggleMobileMenu()} />
      <Sidebar />
      <div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>
        <div className="page-wrapper">
          <Card>
            <Panel header='จัดการรายงานความก้าวหน้า'>
              <div className="text-left">
                <div style={{ marginTop: "1em" }}>
                  <DataTable value={projectmanager} columnResizeMode="fit" showGridlines responsiveLayout="scroll" dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}>
                    <Column field="project_name" header="ชื่อโครงการ" />
                    <Column body={Status} field="status" header="สถานะ" style={{ textAlign: 'center', width: "12%" }} />
                    <Column body={report1} header="รายงานความก้าวหน้าไตรมาส 1" style={{ textAlign: 'center', width: "17%" }} />
                    <Column body={report2} header="รายงานความก้าวหน้าไตรมาส 2" style={{ textAlign: 'center', width: "17%" }} />
                    <Column body={report3} header="รายงานความก้าวหน้าไตรมาส 3" style={{ textAlign: 'center', width: "17%" }} />
                    <Column body={report4} header="รายงานความก้าวหน้าไตรมาส 4" style={{ textAlign: 'center', width: "17%" }} />
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

export default Datareport