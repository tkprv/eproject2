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
import { InputTextarea } from 'primereact/inputtextarea';
import moment from "moment";
import Header from '../initialpage/Sidebar/header';
import Sidebar from '../initialpage/Sidebar/sidebar';
import { Card } from "primereact/card";
import { Form, Tooltip } from 'antd';
import { RedoOutlined } from '@ant-design/icons'
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Panel } from 'primereact/panel';
import { getLocalId } from '../helper/utill';
import { Modal } from 'antd';
const { confirm } = Modal;

const Datastatuspurchase = () => {
  const [fiscalyear, setFiscalyear] = useState([])
  const [project, setProject] = useState([])
  const [selectedfiscalyear, setSelectedFiscalyear] = useState(null);
  const [statuspurchase, setStatuspurchase] = useState('')
  const [labelstatussell, setLabelstatussell] = useState([]);
  const [newstatuspurchase, setNewstatuspurchase] = useState('')
  const [displayBasic1, setDisplayBasic1] = useState(false)
  const [displayBasic2, setDisplayBasic2] = useState(false)
  const [displayBasic3, setDisplayBasic3] = useState(false)
  const [addstatus, setAddstatus] = useState('');
  const [updatestatus, setUpdatestatus] = useState('');
  const [showstatuspurchase, setShowstatuspurchase] = useState()
  const [times1, setTimes1] = useState()
  const [dates1, setDates1] = useState()
  const [times2, setTimes2] = useState()
  const [dates2, setDates2] = useState()
  const [addprojectid, setAddprojectid] = useState()
  const [updatestatus2, setUpdatestatus2] = useState()
  const [status1, setStatus1] = useState('')
  const [form] = Form.useForm();
  const [menu, setMenu] = useState(false)
  const [visible, setVisible] = useState(false)
  let history = useHistory();

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

  const add = (item) => {
    setAddprojectid(item)
    setDisplayBasic1(true)
  }

  const update = (item) => {
    setDisplayBasic2(true)
    axios
      .get(`http://localhost:3001/supplies/statuspurchase/${item.project_id}`, {})
      .then((res) => {
        setUpdatestatus2(res.data[0].statuspurchase_id)
        setNewstatuspurchase(res.data[0].statuspurchase)
      })
      .catch((error) => {
        console.log(error)
      });
  }

  const detailproject = (node) => {
    return <div>
      <Tooltip placement="bottom" title={<span>รายละเอียดโครงการ</span>} ><Button type="button" icon="pi pi-eye" className="p-button-outlined p-button-secondary" style={{ height: '2.5em', width: '2.5em' }} onClick={() => history.push({ pathname: "/home/detailsupplies", state: node })} /></Tooltip>
    </div>;
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

  const Statuspurchase = (node) => {
    if (node.status === 4 && node.status_statuspurchase === 0) {
      return <div>
        <Tooltip placement="bottom" title={<span>สถานะการจัดซื้อจัดจ้าง</span>} ><Button icon="pi pi-inbox" style={{ height: '2.5em', width: '2.5em' }} disabled /></Tooltip>
        <Tooltip placement="bottom" title={<span>เพิ่มสถานะการจัดซื้อจัดจ้าง</span>} ><Button icon="pi pi-plus" className="p-button-success" style={{ marginLeft: '.5em', height: '2.5em', width: '2.5em' }} onClick={() => add(node)} /></Tooltip>
        <Tooltip placement="bottom" title={<span>อัพเดตสถานะการจัดซื้อจัดจ้าง</span>} ><Button icon="pi pi-pencil" className="p-button-warning" style={{ marginLeft: '.5em', height: '2.5em', width: '2.5em' }} disabled /></Tooltip>
      </div>
    } else if (node.status === 4 && node.status_statuspurchase === 1) {
      return <div>
        <Tooltip placement="bottom" title={<span>สถานะการจัดซื้อจัดจ้าง</span>} ><Button icon="pi pi-inbox" style={{ height: '2.5em', width: '2.5em' }} onClick={() => show(node)} /></Tooltip>
        <Tooltip placement="bottom" title={<span>เพิ่มสถานะการจัดซื้อจัดจ้าง</span>} ><Button icon="pi pi-plus" className="p-button-success" style={{ marginLeft: '.5em', height: '2.5em', width: '2.5em' }} disabled /></Tooltip>
        <Tooltip placement="bottom" title={<span>อัพเดตสถานะการจัดซื้อจัดจ้าง</span>} ><Button icon="pi pi-pencil" className="p-button-warning" style={{ marginLeft: '.5em', height: '2.5em', width: '2.5em' }} onClick={() => update(node)} /></Tooltip>
      </div>
    }
    else {
      return <div>
        <Tooltip placement="bottom" title={<span>สถานะการจัดซื้อจัดจ้าง</span>} ><Button icon="pi pi-inbox" style={{ height: '2.5em', width: '2.5em' }} disabled /></Tooltip>
        <Tooltip placement="bottom" title={<span>เพิ่มสถานะการจัดซื้อจัดจ้าง</span>} ><Button icon="pi pi-plus" className="p-button-success" style={{ marginLeft: '.5em', height: '2.5em', width: '2.5em' }} disabled /></Tooltip>
        <Tooltip placement="bottom" title={<span>อัพเดตสถานะการจัดซื้อจัดจ้าง</span>} ><Button icon="pi pi-pencil" className="p-button-warning" style={{ marginLeft: '.5em', height: '2.5em', width: '2.5em' }} disabled /></Tooltip>
      </div>
    }

  }

  const show = (item) => {
    setDisplayBasic3(true)
    axios
      .get(`http://localhost:3001/supplies/statuspurchase/${item.project_id}`, {})
      .then((res) => {
        setShowstatuspurchase(res.data[0].statuspurchase)
      })
      .catch((error) => {
        console.log(error)
      });

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
      .get("http://localhost:3001/dataproject/projecttor", {})
      .then((res) => {
        setProject(res.data)
        console.log('log', res)
      })
      .catch((error) => {
        console.log(error)
      });
  }

  const addstatusstatuspurchase = (status) => {

    const time1 = moment(times1).add(543, 'year').format('hh:mm:ss');
    const date1 = moment(dates1).add(543, 'year').format('YYYY-MM-DD')
    axios
      .post(`http://localhost:3001/supplies/addstatuspurchase`, {
        user_id: getLocalId(),
        statuspurchase: status,
        time_statuspurchase: time1,
        date_statuspurchase: date1,
        project_id: addprojectid.project_id
      })
    onHide1()
    updatestatuspu(addprojectid.project_id)
    Project()
  }

  const updatestatuspurchase = (id) => {

    const time2 = moment(times2).add(543, 'year').format('hh:mm:ss');
    const date2 = moment(dates2).add(543, 'year').format('YYYY-MM-DD')
    axios
      .put(`http://localhost:3001/supplies/updatestatuspurchase/${id}`, {
        user_id: getLocalId(),
        statuspurchase: newstatuspurchase,
        time_statuspurchase: time2,
        date_statuspurchase: date2,
        id: id
      }).then((res) => {
        setLabelstatussell(
          labelstatussell.map((val) => {
            return val.statuspurchase_id === id ? {
              user_id: getLocalId(),
              statuspurchaset: newstatuspurchase,
              time_statuspurchase: time2,
              date_statuspurchase: date2,
              project_id: addprojectid.project_id
            } : val;
          })
        )
      }
      )
    onHide2()
    Project()
  }

  const updatestatuspu = (id) => {
    axios
      .put(`http://localhost:3001/supplies/updatestatus/${id}`, {
        status_statuspurchase: 1,
      }).catch((error) => {
        console.log(error)
      });
  }

  const findProject = () => {

    axios.get(`http://localhost:3001/dataproject/findproject/${status.code}`,
    ).then((res) => {
      setProject(res.data)
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
            <Panel header='จัดการสถานะจัดซื้อจัดจ้าง'>
              <div align='left'>
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
                  <DataTable value={project} columnResizeMode="fit" showGridlines responsiveLayout="scroll" dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}>
                    <Column field="project_name" header="ชื่อโครงการ" />
                    <Column body={detailproject} header="รายละเอียดโครงการ" style={{ textAlign: 'center', width: "15%" }} />
                    <Column body={Status} field="status" header="สถานะ" style={{ textAlign: 'center', width: "22%" }} />
                    <Column body={Statuspurchase} field="status" header="สถานะการจัดซื้อจัดจ้าง" style={{ textAlign: 'center', width: "16.5%" }} />
                  </DataTable>
                </div>

                <div>
                  <Modal
                    title={<p className="m-0">{'เพิ่มสถานะการจัดซื้อจัดจ้าง'}</p>}
                    open={displayBasic1}
                    onCancel={onHide1}
                    footer={null}
                    width={600}
                  >
                    <InputTextarea value={statuspurchase} planceholder="เพิ่มสถานะการจัดซื้อจัดจ้าง" onChange={(e) => setStatuspurchase(e.target.value)} rows={8} cols={69.2} />
                    <div className="text-right mt-4">
                      <Button label="ยกเลิก" icon="pi pi-times" className="p-button-danger" style={{ marginRight: '.5em', height: '2.5em' }} onClick={onHide1} />
                      <Button label="บันทึก" icon="pi pi-check" className="p-button-success" style={{ height: '2.5em' }} onClick={() => addstatusstatuspurchase(statuspurchase)} autoFocus />
                    </div>
                  </Modal>
                </div>

                <div>
                  <Modal
                    title={<p className="m-0">{'อัพเดตสถานะการจัดซื้อจัดจ้าง'}</p>}
                    open={displayBasic2}
                    onCancel={onHide2}
                    footer={null}
                    width={600}
                  >
                    <InputTextarea value={newstatuspurchase} planceholder="อัพเดตสถานะการจัดซื้อจัดจ้าง" onChange={(e) => setNewstatuspurchase(e.target.value)} rows={8} cols={69.2} />
                    <div className="text-right mt-4">
                      <Button label="ยกเลิก" icon="pi pi-times" className="p-button-danger" style={{ marginRight: '.5em', height: '2.5em' }} onClick={onHide2} />
                      <Button label="บันทึก" icon="pi pi-check" className="p-button-success" style={{ height: '2.5em' }} onClick={() => updatestatuspurchase(updatestatus2)} autoFocus />
                    </div>
                  </Modal>
                </div>
                <div>
                  <Modal
                    title={<p className="m-0">{'สถานะการจัดซื้อจัดจ้าง'}</p>}
                    open={displayBasic3}
                    onCancel={onHide3}
                    footer={null}
                    width={600}
                  >
                    <InputTextarea value={showstatuspurchase} planceholder="สถานะการจัดซื้อจัดจ้าง" rows={8} cols={69.2} disabled />
                  </Modal>
                </div>
              </div>
            </Panel>
          </Card>
        </div >
      </div >
    </>
  );
}

export default Datastatuspurchase