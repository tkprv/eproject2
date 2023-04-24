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
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';
import Header from '../initialpage/Sidebar/header';
import Sidebar from '../initialpage/Sidebar/sidebar';
import { Card } from "primereact/card";
import { getLocalId } from '../helper/utill'
import { Panel } from 'primereact/panel';
import { RedoOutlined } from '@ant-design/icons'
import { Space, Table, Tooltip } from 'antd';

const Dataprojectevaluation = () => {
  const [fiscalyear, setFiscalyear] = useState([])
  const [selectedfiscalyear, setSelectedFiscalyear] = useState(null);
  const [projectuser, setProjectuser] = useState()
  const [showstatuspurchase, setShowstatuspurchase] = useState()
  const [value2, setValue2] = useState('')
  const [displayBasic, setDisplayBasic] = useState(false)
  const [deleteprojectid, setDeleteprojectid] = useState([]);
  const [visible, setVisible] = useState(false)
  const [menu, setMenu] = useState(false)
  let history = useHistory();

  const dialogFuncMap = {
    'displayBasic': setDisplayBasic,
  }

  const toggleMobileMenu = () => {
    setMenu(!menu)
  }

  const [status, setStatus] = useState()
  const findStatus = [
    { name: 'รอหัวหน้าฝ่ายพิจารณา', code: '0' },
    { name: 'รอเจ้าหน้าที่ฝ่ายแผนตรวจสอบ', code: '1' },
    { name: 'ไม่ผ่านอนุมัติจากหัวหน้าฝ่าย', code: '2' },
    { name: 'รอผู้บริหารพิจารณา', code: '3' },
    { name: 'อนุมัติโครงการ', code: '4' },
    { name: 'ไม่ผ่านอนุมัติจากผู้บริหาร', code: '5' },
    { name: 'ปิดโครงการ/เสร็จตามระยะเวลา', code: '6' },
    { name: 'ปิดโครงการ/ไม่เป็นไปตามระยะเวลา', code: '7' },
    { name: 'ปิดโครงการ/ขอเลื่อน', code: '8' },
    { name: 'ปิดโครงการ/ขอยกเลิก', code: '9' },
    { name: 'ทุกสถานะ', code: '50' }
  ]

  const detailproject = (node) => {
    if (node.status === 4) {
      return <div>
        <Tooltip placement="bottom" title={<span>รายละเอียดโครงการ</span>} ><Button type="button" icon="pi pi-eye" className="p-button-outlined p-button-secondary" style={{ height: '2.5em', width: '2.5em' }} onClick={() => history.push({ pathname: "/home/detailprojectevaluation", state: node })} /></Tooltip>
      </div>;
    } else {
      return <div>
        <Tooltip placement="bottom" title={<span>รายละเอียดโครงการ</span>} ><Button type="button" icon="pi pi-eye" className="p-button-outlined p-button-secondary" style={{ height: '2.5em', width: '2.5em' }} onClick={() => history.push({ pathname: "/home/detailproject", state: node })} /></Tooltip>
      </div>;
    }

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
    } else if (( node.status_evaluation === 2 || node.status_evaluation === 4) && (node.status === 6 || node.status === 7 || node.status === 8 || node.status === 9)) {
      return <Tag className="mr-2" severity="danger" value="แก้ไขเอกสารประเมินโครงการ"></Tag>
    } else {
      return node.status
    }
  }

  const manageproject = (node) => {
    if (node.status === 4 && node.close_project === 1) {
      return <div>
        <Tooltip placement="bottom" title={<span>ดูเอกสารประเมินโครงการ</span>} ><Button type="button" icon="pi pi-search" className="p-button-info" style={{ height: '2.5em', width: '2.5em' }} disabled /></Tooltip>
        <Tooltip placement="bottom" title={<span>เพิ่มเอกสารประเมินโครงการ</span>} ><Button type="button" icon="pi pi-plus" className="p-button-success" style={{ marginLeft: '.5em', height: '2.5em', width: '2.5em' }} onClick={() => history.push({ pathname: "/home/detailprojectevaluation", state: node })} /></Tooltip>
        <Tooltip placement="bottom" title={<span>แก้ไขเอกสารประเมินโครงการ</span>} ><Button type="button" icon="pi pi-pencil" className="p-button-warning" style={{ marginLeft: '.5em', height: '2.5em', width: '2.5em' }} disabled /></Tooltip>
      </div>
    } else if ((node.status === 6 || node.status === 7 || node.status == 8 || node.status === 9) && (node.status_evaluation === 0 || node.status_evaluation === 1 || node.status_evaluation === 3)) {
      return <div>
        <Tooltip placement="bottom" title={<span>ดูเอกสารประเมินโครงการ</span>} ><Button type="button" icon="pi pi-search" className="p-button-info" style={{ height: '2.5em', width: '2.5em' }} onClick={() => history.push({ pathname: "/home/detailshowprojectevaluation", state: node })} /></Tooltip>
        <Tooltip placement="bottom" title={<span>เพิ่มเอกสารประเมินโครงการ</span>} ><Button type="button" icon="pi pi-plus" className="p-button-success" style={{ marginLeft: '.5em', height: '2.5em', width: '2.5em' }} disabled /></Tooltip>
        <Tooltip placement="bottom" title={<span>แก้ไขเอกสารประเมินโครงการ</span>} ><Button type="button" icon="pi pi-pencil" className="p-button-warning" style={{ marginLeft: '.5em', height: '2.5em', width: '2.5em' }} disabled /></Tooltip>
      </div>
    } else if ((node.status === 6 || node.status === 7 || node.status == 8 || node.status === 9) && (node.status_evaluation === 2 || node.status_evaluation === 4)) {
      return <div>
        <Tooltip placement="bottom" title={<span>ดูเอกสารประเมินโครงการ</span>} ><Button type="button" icon="pi pi-search" className="p-button-info" style={{ height: '2.5em', width: '2.5em' }} onClick={() => history.push({ pathname: "/home/detailshowprojectevaluation", state: node })} /></Tooltip>
        <Tooltip placement="bottom" title={<span>เพิ่มเอกสารประเมินโครงการ</span>} ><Button type="button" icon="pi pi-plus" className="p-button-success" style={{ marginLeft: '.5em', height: '2.5em', width: '2.5em' }} disabled /></Tooltip>
        <Tooltip placement="bottom" title={<span>แก้ไขเอกสารประเมินโครงการ</span>} ><Button type="button" icon="pi pi-pencil" className="p-button-warning" style={{ marginLeft: '.5em', height: '2.5em', width: '2.5em' }} onClick={() => history.push({ pathname: "/home/editprojectevaluation", state: node })} /></Tooltip>
      </div>
    } else {
      return <div>
        <Tooltip placement="bottom" title={<span>ดูเอกสารประเมินโครงการ</span>} ><Button type="button" icon="pi pi-search" className="p-button-info" style={{ height: '2.5em', width: '2.5em' }} disabled /></Tooltip>
        <Tooltip placement="bottom" title={<span>เพิ่มเอกสารประเมินโครงการ</span>} ><Button type="button" icon="pi pi-plus" className="p-button-success" style={{ marginLeft: '.5em', height: '2.5em', width: '2.5em' }} disabled /></Tooltip>
        <Tooltip placement="bottom" title={<span>แก้ไขเอกสารประเมินโครงการ</span>} ><Button type="button" icon="pi pi-pencil" className="p-button-warning" style={{ marginLeft: '.5em', height: '2.5em', width: '2.5em' }} disabled /></Tooltip>
      </div>
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
    const id = getLocalId()
    console.log('id', id)
    axios
      .get(`http://localhost:3001/dataproject/projectuser/${id}`, {})
      .then((res) => {
        setProjectuser(res.data)
      })
  }
  const findProject = () => {

    axios.get(`http://localhost:3001/dataproject/findproject/${status.code}`,
    ).then((res) => {
      setProjectuser(res.data)
      //console.log('log', res.data)
    })
  }


  return (
    <>
      <Header onMenuClick={(value) => toggleMobileMenu()} />
      <Sidebar />
      <div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>
        <div className="page-wrapper">
          <Card>
            <Panel header='จัดการเอกสารประเมินโครงการ'>
              <div className="text-left">
                <div className="fit">
                  <h4>
                    สถานะ
                    <Dropdown value={status} style={{ width: '30em', marginLeft: '1em' }} onChange={(e) => setStatus(e.target.value)} placeholder="สถานะโครงการ" options={findStatus} optionLabel="name" />
                    <Button label="ค้นหา" onClick={findProject} className="p-button-success" style={{ marginLeft: ".8em" }} />
                    <Tooltip title='โครงการทั้งหมด'>
                      <Button style={{ marginTop: '5px', marginLeft: '3px' }} onClick={Project} type="primary" size="large" icon={<RedoOutlined />} />
                    </Tooltip>
                  </h4>
                </div>
                <div style={{ marginTop: "2.5em" }}>
                  <DataTable value={projectuser} columnResizeMode="fit" showGridlines responsiveLayout="scroll" dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}>
                    <Column field="project_name" sortable header="ชื่อโครงการ" />
                    <Column body={detailproject} header="รายละเอียดโครงการ" style={{ textAlign: 'center', width: "15%" }} />
                    <Column body={Status} header="สถานะ" style={{ textAlign: 'center', width: "22%" }} />
                    <Column body={manageproject} header="จัดการ" style={{ textAlign: 'center', width: "18%" }} />
                  </DataTable>
                </div>

                <div className="card flex justify-content-center">
                  <Dialog header="สถานะจัดซื้อจัดจ้าง" visible={visible} style={{ width: '40vw' }} breakpoints={{ '950x': '75vw' }} onHide={() => setVisible(false)}>
                    <InputTextarea value={showstatuspurchase} planceholder="สถานะการจัดซื้อจัดจ้าง" rows={8} cols={71.5} />
                  </Dialog>
                </div>
              </div>
            </Panel>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Dataprojectevaluation