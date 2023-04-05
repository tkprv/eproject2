import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import { Button } from "primereact/button";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Dialog } from 'primereact/dialog';
import axios from "axios";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Card } from "primereact/card";
import Header from '../initialpage/Sidebar/header';
import Sidebar from '../initialpage/Sidebar/sidebar';

const StrategicIssues = () => {
  const [strategic, setStrategic] = useState([]);
  const [selectedSt, setSelectedSt] = useState([]);
  const [stopen, setStopen] = useState();
  const [value1, setValue1] = useState();
  const [value2, setValue2] = useState();
  const [value3, setValue3] = useState();
  const [displayBasic, setDisplayBasic] = useState(false);
  const [dataUpdate, setDataUpdate] = useState("");
  const [id, setId] = useState();
  let history = useHistory();
  const [menu, setMenu] = useState(false)
  const toggleMobileMenu = () => {
    setMenu(!menu)
  }

  useEffect(() => {
    getstrategicid();
    Strategicdata()
  }, []);

  const getstrategicid = () => {
    axios
      .get("http://localhost:3001/plan/strategicid", {})
      .then((res) => {
        setStrategic(res.data)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const Strategicdata = () => {
    axios
      .get("http://localhost:3001/plan/strategic", {})
      .then((res) => {
        ////setStrategic(res.data);
        Stopen(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deletestid = (ID) => {
    axios.delete(`http://localhost:3001/plan/deletestid/${ID}`);

    alert(`Delete id${ID} sucessful`);
    getstrategicid();
  };
  const updatest = (ID, dataUpdate) => {
    axios.put(`http://localhost:3001/plan/updatest/${ID}`, {
      strategic_name: dataUpdate

    }
    )
    onHide()
    getstrategicid()

  };

  const addstid = () => {
    try {
      //order_strategic: value2.length + 1
      axios.post("http://localhost:3001/plan/createstid", {
        fiscalyear_id: value3.fiscalyear_id,
        order_strategic: 1,
        strategic_name: value1,
      });
      getstrategicid()
      setValue1('')
    } catch (e) {
    }
  };
  const Stopen = (m) => {
    const rows = []
    const collunm = m.find((obj) => {
      console.log("มั่ว", obj.flag)
      if (obj.flag === 1) {
        rows.push(obj)
      }
    })
    setStopen(rows)

  }
  const onStrategic = (e) => {
    setSelectedSt(e.value)
    console.log("r", e.value)
    const setst = strategic.filter((strategic) => strategic.fiscalyear_id === e.value.fiscalyear_id)
    setValue2(setst);
    setValue3(e.value)
  };

  const actionTemplate = (node) => {
    return (
      <div>
        {/* <Button
          type="button"
          icon="pi pi-search"
          className="p-button-success"
          style={{ marginRight: ".5em" }}
          onClick={() =>
            history.push({ pathname: "/home/goaldetail", state: node })
          }
        ></Button> */}
        <Button
          type="button"
          icon="pi pi-pencil"
          className="p-button-warning"
          style={{ marginRight: ".5em" }}
          onClick={() =>
            history.push({ pathname: "/home/edit", state: node })
          }
        ></Button>
        <Button
          type="button"
          icon="pi pi-trash"
          className="p-button-danger"
          onClick={() => {
            deletestid(node.strategic_id);
          }}
        ></Button>
      </div>
    );
  };

  const dialogFuncMap = {
    displayBasic: setDisplayBasic,
  };
  const show = (id) => {
    setDisplayBasic(true);
    setId(id);
  };
  const onHide = () => {
    setDisplayBasic(false);
  };

  const action = (rowData) => {
    return (
      <div>
        {/* <span className="button-text">{rowData.strategic_name}</span> */}
        <Button
          type="button"
          icon="pi pi-pencil"
          className="p-button-warning"
          style={{ marginLeft: ".5em" }}
          onClick={() => show(rowData.strategic_id)}
        ></Button>
      </div>
    );
  };

  const confirm2 = (id, dataUpdate) => {
    updatest(id, dataUpdate)
  }

  const renderFooter = () => {
    return (

      <div>
        <Button label="ยกเลิก" icon="pi pi-times" className="p-button-danger" onClick={onHide} />
        <Button label="ตกลง" icon="pi pi-check" className="p-button-success" onClick={() => confirm2(id, dataUpdate)} autoFocus />
      </div>
    );
  }

  return (
    <>
      <Header onMenuClick={(value) => toggleMobileMenu()} />
      <Sidebar />
      <div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>
        <div className="page-wrapper">
          <div style={{ marginTop: '.5em', marginLeft: '1.5em' }}>
            <h3>จัดการข้อมูลประเด็นยุทธ์ศาสตร์ เป้าประสงค์ กลยุทธ์
            </h3>
          </div>
          <Card>
            <div className="text-left">

              <div >
                <h4>แผนยุทธศาสตร์</h4>
                <div >
                  <Dropdown
                    value={selectedSt}
                    options={stopen}
                    onChange={onStrategic}
                    optionLabel="plan_name"
                    placeholder="แผนยุทธศาสตร์"
                    style={{ width: "30em" }}
                  />
                </div>
                <h4 style={{ marginTop: '1em'}}>ประเด็นยุทธศาสตร์</h4>
                <div className="grid p-fluid">
                  <div className="col-12 md:col-4">
                    <div className="p-inputgroup" style={{ width: "30em" }}>
                      <InputText
                        value={value1}
                        onChange={(e) => setValue1(e.target.value)}
                        placeholder="ประเด็นยุทธศาสตร์"
                      ></InputText>
                    </div>
                  </div>
                  <div className="col-12 md:col-5" >
                    <div className="p-inputgroup" >
                      <Button
                        label="เพิ่ม"
                        className="p-button-success"
                        style={{ marginLeft: "4.5em" }}
                        onClick={addstid}
                      />
                    </div>
                  </div>
                </div>

              </div>
              <div>
                <DataTable
                  value={value2}
                  columnResizeMode="fit"
                  showGridlines //icon={node.flag === 1 ? "pi pi-check" :"pi pi-times" }
                  responsiveLayout="scroll"
                  style={{ marginTop: "30px" }}
                  dataKey="id"
                  paginator rows={10}
                  rowsPerPageOptions={[5, 10, 25]}
                >
                  {/* <Column field="" header="ลำดับ" style={{ width: "3%" }} /> */}
                  <Column field="plan_name" header="แผนยุทธศาสตร์" />
                  <Column field="strategic_name" header="ชื่อประเด็นยุทธศาสตร์"></Column>
                  <Column body={action}
                    header="แก้ไขประเด็นยุทธศาตร์"
                    style={{ textAlign: "center", width: "17%" }}
                  />
                  <Column
                    body={actionTemplate}
                    header="จัดการ"
                    style={{ textAlign: "center", width: "18%" }}
                  />
                </DataTable>
              </div>

              <Dialog
                style={{ width: '450px', width: "50vw" }} header="แก้ไขประเด็นยุทธศาสตร์" modal className="p-fluid"
                visible={displayBasic}
                footer={renderFooter}
                onHide={onHide}
              >
                <InputText
                  value={dataUpdate}
                  onChange={(e) => setDataUpdate(e.target.value)}
                  placeholder="ชื่อประเด็นยุทธศาสตร์"

                />
              </Dialog>

            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default StrategicIssues;
