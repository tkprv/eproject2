import React, { useState, useEffect } from 'react'
import { Button } from 'primereact/button';
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import axios from 'axios'
import { useLocation } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from "primereact/checkbox";
import Tabdetailreport from '../Page/Tab/Tabdetailreport';
import Tabproblem from '../Page/Tab/Tabproblem';
import { Tag } from 'primereact/tag';
import { Dialog } from 'primereact/dialog';
import Header from '../initialpage/Sidebar/header';
import Sidebar from '../initialpage/Sidebar/sidebar';

const Addreportthree = () => {
  const location = useLocation()
  const [quartercharges, setQuartercharges] = useState([]);
  const [indic, setIndic] = useState([]);
  const [step, setStep] = useState([]);
  const [addquartercharges, setAddquartercharges] = useState([]);
  const [reportid, setReportid] = useState();
  const [adddetail, setAdddetail] = useState();
  const [addproblem, setAddproblem] = useState();
  const [result, setResult] = useState();
  const [addresult, setAddresult] = useState();
  const [resultid, setResultid] = useState();
  const [setDisplayBasic] = useState(false)
  const [checked, setChecked] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const [rowsData1, setRowsData1] = React.useState([]);
  const [rowsData2, setRowsData2] = React.useState([]);
  const [visible1, setVisible1] = useState(false);
  const [menu, setMenu] = useState(false);
  let history = useHistory();
  console.log('project', location.state)

  const rowsInput1 = {
    detail: null
  }

  const rowsInput2 = {
    problem: null
  }

  const toggleMobileMenu = () => {
    setMenu(!menu)
  }

  useEffect(() => {
    getstep()
    getquartercharges()
    getindic()
  }, []);

  useEffect(() => {
    showreportthree(reportid)
    createdetailthree(reportid)
    createproblemthree(reportid)
  }, [reportid])

  const dialogFuncMap = {
    'displayBasic': setDisplayBasic,
  }

  const onHide = () => {
    setVisible1(false)
  }

  const dataachieve = (node) => {
    if (node.achieve === 0) {
      return <Tag severity="danger" icon="pi pi-times" rounded></Tag>
    } else if (node.achieve === 1) {
      return <Tag severity="success" icon="pi pi-check" rounded></Tag>
    } else {
      return node.achieve
    }
  }

  const dataresult = (node) => {
    return (
      <div>
        <Button
          type="button"
          icon="pi pi-plus"
          label='เพิ่มผลตามตัวชี้วัดและบรรลุตามตัวชี้วัด'
          className="p-button-success"
          style={{ textAlign: 'center', width: '22em' }}
          onClick={() => showresult(node)}
        ></Button>
      </div>
    );
  }

  const renderFooter1 = (id) => {
    return (
      <div>
        <Button label="ยกเลิก" icon="pi pi-times" className="p-button-danger" onClick={onHide} />
        <Button label="ตกลง" icon="pi pi-check" className="p-button-success" onClick={() => createresult(id, addresult, checked1)} autoFocus />
      </div>
    );
  }

  const addTableRows1 = () => {
    setRowsData1([...rowsData1, rowsInput1])
  }

  const deleteTableRows1 = (index) => {
    const rows = [...rowsData1];
    rows.splice(index, 1);
    setRowsData1(rows);
  }

  const handleChange1 = (index, evnt) => {
    const { name, value } = evnt.target;
    const rowsInput1 = [...rowsData1];
    rowsInput1[index][name] = value;
    setRowsData1(rowsInput1);
  }

  const addTableRows2 = () => {
    setRowsData2([...rowsData2, rowsInput2])
  }

  const deleteTableRows2 = (index) => {
    const rows = [...rowsData2];
    rows.splice(index, 1);
    setRowsData2(rows);
  }

  const handleChange2 = (index, evnt) => {
    const { name, value } = evnt.target;
    const rowsInput2 = [...rowsData2];
    rowsInput2[index][name] = value;
    setRowsData2(rowsInput2);
  }

  const getquartercharges = () => {
    axios
      .get(`http://localhost:3001/datareport/quarterchargesthree/${location.state.project_id}`, {})
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

  const createquarterchargesthree = async (id) => {
    axios
      .post(`http://localhost:3001/addreport/createquartercharges`, {
        project_id: id,
        quarter: 3,
        used: addquartercharges,
        period_check: (checked === true) ? 1 : 0
      }).then((res) => {
        setReportid(res.data.insertId)
      })
    await updatereportthree(id)
    alert(`ต้องการเพิ่มข้อมูลรายงานความก้าวหน้าไตรมาสใช่มั้ย?`)
  }

  const updatereportthree = async (id) => {
    console.log('tt', id)
    axios
      .put(`http://localhost:3001/addreport/updatereportthree/${id}`, {
        report_three: 3
      })

  }

  const showreportthree = async (item) => {
    console.log('111', reportid)
    axios
      .get(`http://localhost:3001/addreport/showreport/${reportid}`, {})
      .then((res) => {
      })
      .catch((error) => {
        console.log(error)
      });
  };

  const createdetailthree = async (id) => {
    console.log('id', id)
    axios
      .post(`http://localhost:3001/addreport/createdetail`, {
        report_id: id,
        detail: adddetail
      }).then((res) => {
        showreportthree()
        createdetailthree2(id)
      })
  }

  const createdetailthree2 = (id) => {
    if (rowsData1.length !== 0 && rowsData1 !== null) {
      for (const value of rowsData1) {
        const detailtwhree = value.rowsData1
        try {
          axios.post('http://localhost:3001/addreport/createdetail', {
            report_id: id,
            detail: value.detail,
          })
        } catch (e) {
        }
      }
    }
  }

  const createproblemthree = async (id) => {
    console.log('rr', reportid)
    console.log('id', id)
    axios
      .post(`http://localhost:3001/addreport/createproblem`, {
        report_id: id,
        problem: addproblem
      }).then((res) => {
        showreportthree()
        createproblemthree2(id)
      })
  }

  const createproblemthree2 = (id) => {
    if (rowsData2.length !== 0 && rowsData2 !== null) {
      for (const value of rowsData2) {
        const problemtwo = value.rowsData2
        try {
          axios.post('http://localhost:3001/addreport/createproblem', {
            report_id: id,
            problem: value.problem,
          })
        } catch (e) {
        }
      }
    }
  }

  const showresult = (item) => {
    setResultid(item.indic_project_result_id)
    axios
      .get(`http://localhost:3001/addreport/showresult/${item.indic_project_result_id}`, {})
      .then((res) => {
        setResult(res.data[0].indic_project_result_id)
      })
      .catch((error) => {
        console.log(error)
      });
    setVisible1(true)
  };

  const createresult = (id, addresult, checked1) => {
    setVisible1(false)
    axios.put(`http://localhost:3001/addreport/createresult/${resultid}`, {
      result: addresult,
      achieve: (checked1 === true) ? 1 : 0
    })
    alert(`ต้องการเพิ่มผลตามตัวชี้วัด และบรรลุตามตัวชี้วัดใช่มั้ย?`)
    showresult()
  };

  return (
    <>
      <Header onMenuClick={(value) => toggleMobileMenu()} />
      <Sidebar />
      <div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>
        <div className="page-wrapper">
          <div align="left">
            <h3 style={{ marginTop: '.5em', marginLeft: '1em' }}>รายงานความก้าวหน้าไตรมาส 3</h3>
            <Card>
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
                  <div className="col-12 md:col-3">
                    <InputText value={addquartercharges} onChange={(e) => setAddquartercharges(e.target.value)} style={{ width: '35em' }} placeholder="งบไตรมาสที่ 3" />
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
                        <Column body={dataachieve} header="บรรลุตามตัวชี้วัด" style={{ textAlign: 'center', width: '9.5em' }} />
                        <Column body={dataresult} header="จัดการ" style={{ textAlign: 'center', width: '22em' }} />
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
                      <Checkbox onChange={e => setChecked(e.checked)} checked={checked}>
                      </Checkbox>
                    </h4>
                  </div>
                </div>
              </div>
              <div className="fit" style={{ marginLeft: '1.5em' }}>
                <div className="grid p-fluid">
                  <div className="col-12 md:col-3">
                    <h4>รายละเอียดความก้าวหน้า :</h4>
                  </div>
                  <div className="col-12 md:col-5">
                    <InputText value={adddetail} onChange={(e) => setAdddetail(e.target.value)} style={{ width: '31em' }} placeholder="รายละเอียดความก้าวหน้า" />
                  </div>
                  <div className="col-12 md:col-4">
                    <div className="p-inputgroup">
                      <Button type="button" onClick={addTableRows1} style={{ width: '15.5em' }}>+ เพิ่มรายละเอียดความก้าวหน้า</Button>
                    </div>
                  </div>
                  <div className="col-12 md:col-6" style={{ marginLeft: '19.25em', marginBottom: '2em' }}>
                    <Tabdetailreport rowsData={rowsData1} deleteTableRows={deleteTableRows1} handleChange={handleChange1} />
                  </div>
                </div>
              </div>
              <div className="fit" style={{ marginLeft: '1.5em' }}>
                <div className="grid p-fluid">
                  <div className="col-12 md:col-3">
                    <h4>ปัญหา/อุปสรรค :</h4>
                  </div>
                  <div className="col-12 md:col-5">
                    <InputText value={addproblem} onChange={(e) => setAddproblem(e.target.value)} style={{ width: '31em' }} placeholder="ปัญหา/อุปสรรค" />
                  </div>
                  <div className="col-12 md:col-4">
                    <div className="p-inputgroup">
                      <Button type="button" onClick={addTableRows2} style={{ width: '12em' }}>+ เพิ่มอุปสรรค/ปัญหา</Button>
                    </div>
                  </div>
                  <div className="col-12 md:col-6" style={{ marginLeft: '19.25em', marginBottom: '2em' }}>
                    <Tabproblem rowsData={rowsData2} deleteTableRows={deleteTableRows2} handleChange={handleChange2} />
                  </div>
                </div>
              </div>
              <div style={{ marginTop: '2em', marginLeft: '60em' }} >
                <Button type="button" icon="pi pi-send" label='ส่ง' style={{ width: '7em' }} className="p-button-info" onClick={() => createquarterchargesthree(location.state.project_id)} />
                <Button type="button" icon="pi pi-download" label='จัดเก็บ' className="p-button-help" style={{ marginLeft: '.4em' }} />
              </div>
            </Card>

            <Dialog
              style={{ width: '450px', width: "50vw" }} header="เพิ่มผลตามตัวชี้วัด และบรรลุตามตัวชี้วัด" modal className="p-fluid"
              visible={visible1}
              footer={renderFooter1}
              onHide={onHide}
            >
              <h4>ผลตามตัวชี้วัด</h4>
              <InputText
                value={addresult}
                onChange={(e) => setAddresult(e.target.value)}
                placeholder="ผลตามตัวชี้วัด"
              />
              <h4>บรรลุตามตัวชี้วัด</h4>
              <Checkbox onChange={e => setChecked1(e.checked)} checked={checked1} />
            </Dialog>
          </div>
        </div>
      </div>
    </>
  );
}

export default Addreportthree