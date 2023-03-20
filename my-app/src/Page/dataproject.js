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

const Dataproject = () => {
  const [fiscalyear, setFiscalyear] = useState([])
  const [selectedfiscalyear, setSelectedFiscalyear] = useState(null);
  const [projectmanager, setProjectmanager] = useState([])
  const [showstatuspurchase, setShowstatuspurchase] = useState()
  const [value2, setValue2] = useState('')
  const [displayBasic, setDisplayBasic] = useState(false)
  const [deleteprojectid, setDeleteprojectid] = useState([]);
  const [visible, setVisible] = useState(false)
  const [status, setStatus] = useState('');
  const [menu, setMenu] = useState(false)
  let history = useHistory();

  const dialogFuncMap = {
    'displayBasic': setDisplayBasic,
    'status': setStatus,
  }

  const toggleMobileMenu = () => {
    setMenu(!menu)
  }

  useEffect(() => {
    Project()
  }, [])

  const detailproject = (node) => {
    if (node.status === 4) {
      return <div>
        <Button type="button" icon="pi pi-eye" className="p-button-outlined p-button-secondary" onClick={() => history.push({ pathname: "/home/detailprojectevaluation", state: node })} />
      </div>;
    } else if (node.status === 6 || node.status === 7 || node.status === 8 || node.status === 9) {
      return <div>
        <Button type="button" icon="pi pi-eye" className="p-button-outlined p-button-secondary" onClick={() => history.push({ pathname: "/home/detailshowprojectevaluation", state: node })} />
      </div>;
    } else {
      return <div>
        <Button type="button" icon="pi pi-eye" className="p-button-outlined p-button-secondary" onClick={() => history.push({ pathname: "/home/detailproject", state: node })} />
      </div>;
    }

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
    } else {
      return node.status
    }
  }

  const show = (item) => {
    axios
      .get(`http://localhost:3001/supplies/statuspurchase/${item.project_id}`, {})
      .then((res) => {
        setShowstatuspurchase(res.data[0].statuspurchase)
      })
      .catch((error) => {
        console.log(error)
      });
    setVisible(true)
  }

  const Statuspurchase = (node) => {
    return <div>
      <Button icon="pi pi-inbox" className="p-button-success" onClick={() => show(node)} />
    </div>
  }

  const manageproject = (node) => {
    if (node.status === 2 || node.status === 5) {
      return <div>
        <Button type="button" icon="pi pi-pencil" className="p-button-warning" onClick={() => history.push({ pathname: "/home/editproject", state: node })} />
        <Button type="button" icon="pi pi-trash" className="p-button-danger" style={{ marginLeft: '.4em' }} onClick={() => { Deletesproject(node.project_id) }} />
      </div>
    } else {
      return <div>
        <Button type="button" icon="pi pi-pencil" className="p-button-warning" disabled />
        <Button type="button" icon="pi pi-trash" className="p-button-danger" style={{ marginLeft: '.4em' }} disabled />
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
    console.log('id', id);
    axios
      .get(`http://localhost:3001/dataproject/projectmanager/${id}`, {})
      .then((res) => {
        setProjectmanager(res.data)
      })
  }


  const getdeleteprojectid = () => {
    axios
      .get("http://localhost:3001/dataproject/deleteprojectid", {})
      .then((res) => {
        setDeleteprojectid(res.data)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const Deletesproject = (ID) => {
    axios.delete(`http://localhost:3001/dataproject/deleteproject/${ID}`);
    alert(`Delete id${ID} sucessful`);
    getdeleteprojectid();
  };

  return (
    <>
      <Header onMenuClick={(value) => toggleMobileMenu()} />
      <Sidebar />
      <div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>
        <div className="page-wrapper">
          <div style={{ marginTop: '.5em', marginLeft: '1.5em' }}>
            <h3>จัดการข้อมูลโครงการ</h3>
          </div>
          <Card>
            <div className="text-left">
              <div className="fit">
                <h4>ปีงบประมาณ</h4>
                <Dropdown value={selectedfiscalyear} options={fiscalyear} style={{ width: '10em' }} onChange={onsetFiscalyear} optionLabel="fiscalyear" placeholder="ทุกปี" />
                <h4>สถานะ</h4>
                <Dropdown value={value2} style={{ width: '30em' }} onChange={(e) => setValue2(e.target.value)} placeholder="ทุกสถานะ" />
                <Button label="ค้นหา" className="p-button-success" style={{ marginLeft: '.8em' }} />
              </div>
              <div style={{ marginTop: "2.5em" }}>
                <DataTable value={projectmanager} columnResizeMode="fit" showGridlines responsiveLayout="scroll" dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}>
                  <Column field="project_name" header="ชื่อโครงการ" />
                  <Column body={detailproject} header="รายละเอียดโครงการ" style={{ textAlign: 'center', width: "15%" }} />
                  <Column body={Status} field="status" header="สถานะ" style={{ textAlign: 'center', width: "12%" }} />
                  <Column body={Statuspurchase} header="สถานะการจัดซื้อจัดจ้าง" style={{ textAlign: 'center', width: "13.5%" }} />
                  <Column body={manageproject} header="จัดการ" style={{ textAlign: 'center', width: "14%" }} />
                  <Column field="value" header="วันที่สร้าง" style={{ textAlign: 'center', width: "12%" }} />
                </DataTable>
              </div>

              <div className="card flex justify-content-center">
                <Dialog header="สถานะจัดซื้อจัดจ้าง" visible={visible} style={{ width: '40vw' }} breakpoints={{ '950x': '75vw' }} onHide={() => setVisible(false)}>
                  <InputTextarea value={showstatuspurchase} planceholder="สถานะการจัดซื้อจัดจ้าง" rows={8} cols={71.5} />
                </Dialog>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Dataproject