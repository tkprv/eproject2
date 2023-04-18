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
import { Space, Table, Tooltip } from 'antd';
import { RedoOutlined } from '@ant-design/icons'
import { Panel } from 'primereact/panel';

const Datamanager = () => {
  const [fiscalyear, setFiscalyear] = useState([])
  const [project, setProject] = useState([])
  const [selectedfiscalyear, setSelectedFiscalyear] = useState(null)

  const [menu, setMenu] = useState(false)
  const { Column, ColumnGroup } = Table
  let history = useHistory()

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

  const editproject = (node) => {
    console.log('11', node.project_id)
    return <div>
    <Tooltip placement="bottom" title={<span>รายละเอียดโครงการ</span>} ><Button type="button" icon="pi pi-pencil" className="p-button-warning" style={{ height: '2.5em', width: '2.5em' }} onClick={() => history.push({ pathname: "/home/detailmanager", state: node })}>
      </Button></Tooltip>
    </div>;
  }

  const Status = (node) => {
    console.log('node', node)
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
    } else if (node.status === 6 && node.status_evaluation === 3) {
      return <Tag className="mr-2" value="ปิดโครงการ/เสร็จตามระยะเวลา" rounded></Tag>
    } else if (node.status === 7 && node.status_evaluation === 3) {
      return <Tag className="mr-2" value="ปิดโครงการ/ไม่เป็นไปตามระยะเวลา" rounded></Tag>
    } else if (node.status === 8 && node.status_evaluation === 3) {
      return <Tag className="mr-2" value="ปิดโครงการ/ขอเลื่อน" rounded></Tag>
    } else if (node.status === 9 && node.status_evaluation === 3) {
      return <Tag className="mr-2" value="ปิดโครงการ/ขอยกเลิก" rounded></Tag>
    } else if (node.status_evaluation === 0 && (node.status === 6 || node.status === 7 || node.status === 8 || node.status === 9)) {
      return <Tag className="mr-2" severity="warning" value="รอเจ้าหน้าที่ฝ่ายแผนอนุมัติปิดโครงการ" rounded></Tag>
    } else if (node.status_evaluation === 1 && (node.status === 6 || node.status === 7 || node.status === 8 || node.status === 9)) {
      return <Tag className="mr-2" severity="warning" value="รอผู้บริหารอนุมัติปิดโครงการ" rounded></Tag>
    } else if (( node.status_evaluation === 2 || node.status_evaluation === 4) && (node.status === 6 || node.status === 7 || node.status === 8 || node.status === 9)) {
      return <Tag className="mr-2" severity="danger" value="แก้ไขเอกสารประเมินโครงการ" rounded></Tag>
    } else {
      return node.status
    }
  }

  const report1 = (node) => {
    if (node.report_one === 0 && node.status !== 4 && node.status_report1 === 0) {
      return <Tooltip placement="bottom" title={<span>รายงานความก้าวหน้าไตรมาส 1</span>} ><Button type="button" icon="pi pi-search" className="p-button-secondary" style={{ height: '2.5em', width: '2.5em' }} disabled /></Tooltip>
    } else if (node.status === 4 && node.report_one === 0 && node.open_reportone === 0) {
      return <Tooltip placement="bottom" title={<span>รายงานความก้าวหน้าไตรมาส 1</span>} ><Button type="button" icon="pi pi-search" className="p-button-secondary" style={{ height: '2.5em', width: '2.5em' }} onClick={() => history.push({ pathname: "/home/managerreportone", state: node })} /></Tooltip>
    } else {
      return  <Tooltip placement="bottom" title={<span>รายงานความก้าวหน้าไตรมาส 1</span>} ><Button type="button" icon="pi pi-search" className="p-button-secondary" style={{ height: '2.5em', width: '2.5em' }} onClick={() => history.push({ pathname: "/home/reportone", state: node })} /></Tooltip>
    }
  }

  const report2 = (node) => {
    if (node.report_two === 0 && node.status !== 4 && node.status_report2 === 0) {
      return <Tooltip placement="bottom" title={<span>รายงานความก้าวหน้าไตรมาส 2</span>} ><Button type="button" icon="pi pi-search" className="p-button-secondary" style={{ height: '2.5em', width: '2.5em' }} disabled /></Tooltip>
    } else if (node.status === 4 && node.report_two === 0 && node.open_reporttwo === 0) {
      return <Tooltip placement="bottom" title={<span>รายงานความก้าวหน้าไตรมาส 2</span>} ><Button type="button" icon="pi pi-search" className="p-button-secondary" style={{ height: '2.5em', width: '2.5em' }} onClick={() => history.push({ pathname: "/home/managerreporttwo", state: node })} /></Tooltip>
    } else {
      return <Tooltip placement="bottom" title={<span>รายงานความก้าวหน้าไตรมาส 2</span>} ><Button type="button" icon="pi pi-search" className="p-button-secondary" style={{ height: '2.5em', width: '2.5em' }} onClick={() => history.push({ pathname: "/home/reporttwo", state: node })} /></Tooltip>
    }

  }

  const report3 = (node) => {
    if (node.report_three === 0 && node.status !== 4 && node.status_report3 === 0) {
      return <Tooltip placement="bottom" title={<span>รายงานความก้าวหน้าไตรมาส 3</span>} ><Button type="button" icon="pi pi-search" className="p-button-secondary" style={{ height: '2.5em', width: '2.5em' }} disabled /></Tooltip>
    } else if (node.status === 4 && node.report_three === 0 && node.open_reportthree === 0) {
      return <Tooltip placement="bottom" title={<span>รายงานความก้าวหน้าไตรมาส 3</span>} ><Button type="button" icon="pi pi-search" className="p-button-secondary" style={{ height: '2.5em', width: '2.5em' }} onClick={() => history.push({ pathname: "/home/managerreportthree", state: node })} /></Tooltip>
    } else {
      return <Tooltip placement="bottom" title={<span>รายงานความก้าวหน้าไตรมาส 3</span>} ><Button type="button" icon="pi pi-search" className="p-button-secondary" style={{ height: '2.5em', width: '2.5em' }} onClick={() => history.push({ pathname: "/home/reportthree", state: node })} /></Tooltip>
    }
  }

  const report4 = (node) => {
    if (node.report_four === 0 && node.status !== 4) {
      return <Tooltip placement="bottom" title={<span>รายงานความก้าวหน้าไตรมาส 4</span>} ><Button type="button" icon="pi pi-search" className="p-button-secondary" style={{ height: '2.5em', width: '2.5em' }} disabled /></Tooltip>
    } else if (node.status === 4 && node.report_four === 0 && node.open_reportfour === 0) {
      return <Tooltip placement="bottom" title={<span>รายงานความก้าวหน้าไตรมาส 4</span>} ><Button type="button" icon="pi pi-search" className="p-button-secondary" style={{ height: '2.5em', width: '2.5em' }} onClick={() => history.push({ pathname: "/home/managerreportfour", state: node })} /></Tooltip>
    } else {
      return <Tooltip placement="bottom" title={<span>รายงานความก้าวหน้าไตรมาส 4</span>} ><Button type="button" icon="pi pi-search" className="p-button-secondary" style={{ height: '2.5em', width: '2.5em' }} onClick={() => history.push({ pathname: "/home/reportfour", state: node })} /></Tooltip>
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
    getProject()
  }, []);

  const getProject = () => {
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

  const findProject = () => {

    if (status.code === "50") {
      {
        console.log('hhhhh');
        axios.get(`http://localhost:3001/dataproject/findprojectyear/${selectedfiscalyear.fiscalyear}`,
          ).then((res) => {
            setProject(res.data)
            console.log('log', res.data)
          })
      }
    } else {
      axios.get(`http://localhost:3001/dataproject/findproject/${selectedfiscalyear.fiscalyear}/${status.code}`,
      ).then((res) => {
        setProject(res.data)
      })
    }

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
                    <Dropdown value={status} style={{ width: '30em', marginLeft: '1em' }} onChange={(e) => setStatus(e.target.value)} placeholder="สถานะโครงการ" options={findStatus} optionLabel="name" />
                    <Button label="ค้นหา" onClick={findProject} className="p-button-success" style={{ marginLeft: ".8em" }} />
                    <Tooltip title='โครงการทั้งหมด'>
                      <Button style={{ marginTop: '5px', marginLeft: '3px' }} onClick={getProject} type="primary" size="large" icon={<RedoOutlined />} />
                    </Tooltip>
                  </h4>
                </div>
                <div style={{ marginTop: "2.5em" }}>
                  <DataTable value={project} columnResizeMode="fit" showGridlines responsiveLayout="scroll" dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}>
                    <Column field="project_name" sortable header="ชื่อโครงการ" />
                    <Column body={Status} field="status" header="สถานะ" style={{ textAlign: 'center', width: "22%" }} />
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