import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import Table from 'react-bootstrap/Table';
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import moment from "moment";
import { Dialog } from "primereact/dialog";
import 'moment/locale/th'
import { Card } from "primereact/card";
import Header from '../initialpage/Sidebar/header';
import Sidebar from '../initialpage/Sidebar/sidebar';

const Strategicplan = () => {
  const [strategic, setStrategic] = useState([]);
  const [fiscalyear, setFiscalyear] = useState([])
  const [selectedfiscalyear, setSelectedFiscalyear] = useState(null);
  const [value1, setValue1] = useState("");
  const [checked1, setChecked1] = useState(false);
  const [year, setYear] = useState(null);
  const [displayBasic, setDisplayBasic] = useState(false);
  const [dataUpdate, setDataUpdate] = useState("");
  const [data, setData] = useState([1]);
  const [id, setId] = useState();
  const [sg1,setSg1] = useState()
  const [sg2,setSg2] = useState()

  // const yearformat = moment(year).locale("th").format("YYYY")
  const date = moment(year).add(543, 'year').format('YYYY')

  console.log("year", moment(year).format("YYYY"));
  // console.log("yyyyy", yearformat);
  console.log("LL", date);
  let today = new Date();
  let month = today.getMonth();
  let year2 = today.getFullYear();
  let prevMonth = month === 0 ? 11 : month - 1;
  let prevYear = prevMonth === 11 ? year2 - 1 : year2;
  let nextMonth = month === 11 ? 0 : month + 1;
  let nextYear = nextMonth === 0 ? year2 + 1 : year2;

  const [dates2, setDates2] = useState(null)
  const [dates3, setDates3] = useState(null)
  const [menu, setMenu] = useState(false)
  const toggleMobileMenu = () => {
    setMenu(true)
  }

  let minDate = new Date();
  minDate.setMonth(prevMonth);
  minDate.setFullYear(prevYear);

  let maxDate = new Date();
  maxDate.setMonth(nextMonth);
  maxDate.setFullYear(nextYear);

  useEffect(() => {
    getstrategic();
    
  }, [])
  const getstrategic = () => {
    axios
      .get("http://localhost:3001/plan/strategic", {})
      .then((res) => {
        setStrategic(res.data);
        //console.log(strategic);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addstrategic = (value1) => {
    console.log("val", value1);
    console.log("val", date);
    try {
      axios.post("http://localhost:3001/plan/createstrategic", {
        fiscalyear: date,
        plan_name: value1,
      });
      getstrategic();
      setValue1("");
    } catch (e) {
      //handleError
    }
  };
  const dialogFuncMap = {
    'displayBasic': setDisplayBasic,
    
  }

  const show = (id,name,time1,date1,time2,date2) => {
    setDisplayBasic(true);
    setId(id);
    setValue1(name)
    setSg1(time1)
    setDates2(date1)
    setSg2(time2)
    setDates3(date2)
    console.log('ลอง',value1)
  };

  const onHide = () => {
    setDisplayBasic(false);
  };
  const updatesstatus =(ID,flag) =>{ 
    console.log("id",ID)
    
    if(flag === 1){
      flag = 0
    }
    else flag = 1
    console.log("flag",flag)
    axios.put(`http://localhost:3001/plan/updatesstatus/${ID}`, { 
      flag: flag
  }
  )
  // onHide()
  getstrategic()
  
}

 
  const action = (node, column) => {
    return (
      
      <div>
        <Button
          checked={checked1}
          onClick={() => updatesstatus(node.fiscalyear_id,node.flag)}
          icon={node.flag === 1 ? "pi pi-check" : "pi pi-times" }
          label={node.flag === 1 ? "ใช้งาน" : "ไม่ใช้งาน" }
          className={node.flag === 1 ? "p-button-success" :"p-button-danger" }
          style={{ width: "9.5em" }}
          aria-label="Confirmation" 
        />
      </div>
    );
  };

  const actionTemplate = (node) => {
    return (
      <div>
        <Button
          type="button"
          icon="pi pi-pencil"
          className="p-button-warning"
          style={{ marginRight: ".5em" }}
          onClick={() => show(node.fiscalyear_id,node.plan_name,node.director_of_time,node.director_of_date,node.ref_of_time,node.ref_of_date)}
        ></Button>
        <Button
          type="button"
          icon="pi pi-trash"
          className="p-button-danger"
          onClick={() => {
            deletestrategic(node.fiscalyear_id);
          }}
        ></Button>
      </div>
    );
  };
  const updatestrategic =(f_id,value1,sg1,sg2,dates2,dates3) =>{ 
      const datess2 = moment(dates2).format('YYYY-MM-DD')
      const datess3 = moment(dates3).format('YYYY-MM-DD')
      axios.put(`http://localhost:3001/plan/updatestrategic/${f_id}`, { 
        plan_name: value1,
        director_of_time: sg1,
        director_of_date: datess2,
        ref_of_time: sg2,
        ref_of_date: datess3
    })
    onHide()
    getstrategic();
    
  }
  

  const deletestrategic = (f_id) => {
    axios.delete(`http://localhost:3001/plan/deletestrategic/${f_id}`);
    getstrategic();
    alert(`Delete id${f_id} sucessful`);
  };

  const dateFormat1 = (rowData) => {
    //console.log("row", rowData.director_of_date);
    if (rowData.director_of_date !== null) {
      return moment(rowData.director_of_date).format("l");
    } else return null;
  };
  const dateFormat2 = (rowData) => {
    //console.log("row", rowData.ref_of_date);
    if (rowData.ref_of_date !== null) {
      return moment(rowData.ref_of_date).format("l");
    } else return null;
  };

    const confirm2 = (id,value1,sg1,sg2,dates2,dates3) => {
      
      updatestrategic(id,value1,sg1,sg2,dates2,dates3)
  };
  const editime1 = () => {
    return (
      <div>
        <InputText
          value={sg1}
          onChange={(e) => setSg1(e.target.value)}
          placeholder="ผ่านมติกรรมการครั้งที่"
        ></InputText>
      </div>
    );
  };
  const editdate1 = () => {
    return (
      <div>
        <Calendar
          id="basic"
          placeholder="เลือกวันที่"
          value={dates2}
          onChange={(e) => setDates2(e.value)}
        />
      </div>
    );
  };

  const editime2 = () => {
    return (
      <div>
        <InputText
          value={sg2}
          onChange={(e) => setSg2(e.target.value)}
          placeholder="ผ่านมติกรรมการครั้งที่"
        ></InputText>
      </div>
    );
  };
  const editdate2 = () => {
    return (
      <Calendar
          id="basic"
          placeholder="เลือกวันที่"
          value={dates3}
          onChange={(e) => setDates3(e.value)}
        />
    );
  };

 
    const renderFooter = () => {
      return (
      
          <div>
              <Button label="ยกเลิก" icon="pi pi-times" className="p-button-danger" onClick={onHide} />
              <Button label="บันทึก" icon="pi pi-check" className="p-button-success" onClick={()=>confirm2(id,value1,sg1,sg2,dates2,dates3)} autoFocus />
              
          </div>
          
      
      );
  }

  

  return (
    <>
     <Header onMenuClick={(value) => toggleMobileMenu()} />
    <Sidebar /> 
    <div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>
    <div className="page-wrapper">
    <h3>กำหนดสิทธิผู้ใช้งาน
        </h3>
    <Card>
    <div align="left">
      <div align="left">
        <div >
          <h4>ปีงบประมาณ</h4>
          <div className="field col-12 md:col-4">
            <Calendar
              id="yearpicker"
              value={year}
              onChange={(e) => setYear(e.value)}
              view="year"
              dateFormat="yy"
            />
          </div>
        </div>
      </div>
      <div style={{ marginTop: "2em" }}>
        <h4>แผนยุทธศาสตร์</h4>
        <div>
          <span>
            <InputText
              value={value1}
              onChange={(e) => setValue1(e.target.value)}
              placeholder="แผนยุทธศาสตร์"
              style={{ width: "30em"}}
            ></InputText>
          </span>
          &nbsp;&nbsp;&nbsp;
          <Button
            label="เพิ่ม"
            className="p-button-success"
            onClick={() => addstrategic(value1)}
          />
          <br />
        </div>
      </div>
      <Dialog
        header="จัดการข้อมูลแผนยุทธ์ศาสตร์"
        visible={displayBasic}
        style={{ width: "50vw" }}
        footer={renderFooter}
        onHide={onHide}
      >
        <Card  style={{backgroundColor: 'var(--surface-100)'}}>
          <h>ชื่อแผนยุทธ์ศาสตร์</h>
          <div className="fit">

          <InputText
              value={value1}
              onChange={(e) => setValue1(e.target.value)}
              placeholder="แผนยุทธศาสตร์"
              style={{ width: "41.5em" }}
            ></InputText>
          </div>
        </Card>
        <Card style={{ marginTop: "30px", backgroundColor: 'var(--surface-100)' }}>
          <div>
            <h>ผ่านมติกรรมการบริหาร</h>
            <DataTable
              value={data}
              columnResizeMode="fit"
              showGridlines
              responsiveLayout="scroll"
              style={{ marginTop: "20px" }}
            >
              <Column
                body={editime1}
                header="ครั้งที่"
                style={{ textAlign: "center", width: "15%" }}
              />
              <Column
                body={editdate1}
                header="ครั้งที่"
                style={{ textAlign: "center", width: "15%" }}
              />
            </DataTable>
          </div>
          <div style={{ marginTop: "30px" }}>
            <h>ผ่านมติกรรมการประจำ</h>
            <DataTable
              value={data}
              columnResizeMode="fit"
              showGridlines
              responsiveLayout="scroll"
              style={{ marginTop: "20px" }}
            >
              <Column
                body={editime2}
                header="ครั้งที่"
                style={{ textAlign: "center", width: "15%" }}
              />
              <Column
                body={editdate2}
                header="ครั้งที่"
                style={{ textAlign: "center", width: "15%" }}
              />
            </DataTable>
          </div>
        </Card>
      </Dialog>

      <div>
        <div>
          <DataTable
            value={strategic}
            columnResizeMode="fit"
            showGridlines
            responsiveLayout="scroll"
            style={{ marginTop: "30px" }}
            dataKey="id" 
            paginator rows={10} 
            rowsPerPageOptions={[5, 10, 25]}
          >
            {/* <Column field="" header="ลำดับ" style={{ width: "3%" }} /> */}
            <Column field="plan_name" header="แผนยุทธศาสตร์" />
            <Column field={"fiscalyear"} header="ปีงบประมาณ" style={{ textAlign: "center" }}/>
            <Column
              field="director_of_time"
              header="ผ่านมติกรรมการบริหาร (ครั้งที่)"
              style={{ textAlign: "center" }}
            />
            <Column
              field="director_of_date"
              header="ผ่านมติกรรมการบริหาร(วันที่)"
              body={dateFormat1}
              style={{ textAlign: "center" }}
            ></Column>
            <Column
              field="ref_of_time"
              header="ผ่านมติกรรมการประจำ (ครั้งที่)"
              style={{ textAlign: "center" }}
            />
            <Column
              field="ref_of_date"
              header="ผ่านมติกรรมการประจำ (วันที่)"
              body={dateFormat2}
              style={{ textAlign: "center" }}
            />
            <Column
              body={action}
              header="สถานะ"
              style={{ textAlign: "center", width: "15%" }}
            />
            <Column
              body={actionTemplate}
              header="จัดการ"
              style={{ textAlign: "center", width: "15%" }}
            />
          </DataTable>
        </div>
      </div>
    </div>
    </Card>
    </div>
    </div>
    </>
  );
};

export default Strategicplan;
