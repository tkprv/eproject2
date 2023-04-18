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
import { Col, notification, Form, Input, Tooltip } from "antd";
import { ExclamationCircleFilled, MinusCircleOutlined, PlusOutlined, } from "@ant-design/icons"
import { Modal } from "antd"
import { Panel } from 'primereact/panel'

const { confirm } = Modal

const formItemLayout = {
  labelAlign: "left",
  labelZise: '10em',
  labelCol: {
    xs: { span: 2.5 },
    sm: { span: 2.5 },
  },
  wrapperCol: {
    xs: { span: 2.5 },
    sm: { span: 2.5 },
  },

};

const inputStyle = {
  fontSize: '16px',
  padding: '8px'
}
const buttonStyle = {
  fontSize: '14px',
  padding: '8px 16px'
}

const Strategicplan = () => {
  const [strategic, setStrategic] = useState([])
  const [form] = Form.useForm()
  const [fiscalyear, setFiscalyear] = useState([])
  const [selectedfiscalyear, setSelectedFiscalyear] = useState(null);
  const [value1, setValue1] = useState("");
  const [checked1, setChecked1] = useState(false);
  const [year, setYear] = useState(null)
  const [years, setYears] = useState(null)
  const [displayBasic, setDisplayBasic] = useState(false);
  const [dataUpdate, setDataUpdate] = useState("");
  const [data, setData] = useState([1]);
  const [id, setId] = useState();
  const [sg1, setSg1] = useState()
  const [sg2, setSg2] = useState()

  const date = moment(year).add(543, 'year').format('YYYY')

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
    getstrategic()
    getyears()

  }, [])
  const getyears = () => {
    axios
      .get("http://localhost:3001/plan/getyear", {})
      .then((res) => {
        form.setFieldsValue({ yearsfi: res.data.years })
      })
      .catch((error) => {
        console.log(error);
      })
  }
  const getstrategic = () => {
    axios
      .get("http://localhost:3001/plan/strategic", {})
      .then((res) => {
        setStrategic(res.data)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addstrategic = async (value) => {
    console.log(value);
    try {
      await axios.post("http://localhost:3001/plan/createstrategic", {
        fiscalyear: value.yearsfi,
        plan_name: value.planname,
      }).then((res) => {
        console.log(res);
        if (res.data === 'ER_DUP_ENTRY') {
          notification.error({
            message: `${value.planname}`,
            description: "มีข้อมูลอยู่แล้ว"

          })
          getstrategic()
          setValue1("")
        } else {
          getstrategic()
          setValue1("")
        }
      })

      getstrategic()
      setValue1("")
    } catch (e) {

    }
  };

  const onHide = () => {
    setDisplayBasic(false)
    form.resetFields()
  }

  const show = (id, name, time1, date1, time2, date2) => {
    setDisplayBasic(true);
    setId(id);
    setValue1(name)
    setSg1(time1)
    setDates2(date1)
    setSg2(time2)
    setDates3(date2)
    console.log('ลอง', value1)
  };

  // const onHide = () => {
  //   setDisplayBasic(false);
  // };
  const updatesstatus = (ID, flag) => {
    console.log("id", ID)

    if (flag === 1) {
      flag = 0
    }
    else flag = 1
    console.log("flag", flag)
    axios.put(`http://localhost:3001/plan/updatesstatus/${ID}`, {
      flag: flag
    }
    )
    getstrategic()

  }


  const action = (node, column) => {
    return (

      <div>
        <Button
          checked={checked1}
          onClick={() => updatesstatus(node.fiscalyear_id, node.flag)}
          icon={node.flag === 1 ? "pi pi-check" : "pi pi-times"}
          label={node.flag === 1 ? "ใช้งาน" : "ไม่ใช้งาน"}
          className={node.flag === 1 ? "p-button-success" : "p-button-danger"}
          style={buttonStyle}
          aria-label="Confirmation"
        />
      </div>
    );
  };

  const actionTemplate = (node) => {
    return (
      <div>
        <Tooltip placement="bottom" title={<span>แก้ไขแผนยุทธศาสตร์</span>} ><Button
          type="button"
          icon="pi pi-pencil"
          className="p-button-warning"
          style={{ marginRight: ".5em", height: '2.5em', width: '2.5em' }}
          onClick={() => show(node.fiscalyear_id, node.plan_name, node.director_of_time, node.director_of_date, node.ref_of_time, node.ref_of_date)}
        ></Button>
        </Tooltip>
        <Tooltip placement="bottom" title={<span>ลบแผนยุทธศาสตร์</span>} ><Button
          type="button"
          icon="pi pi-trash"
          className="p-button-danger"
          style={{ height: '2.5em', width: '2.5em' }}
          onClick={() => {
            showConfirm(node.fiscalyear_id);
          }}
        ></Button></Tooltip>
      </div>
    );
  };
  const updatestrategic = (f_id, value1, sg1, sg2, dates2, dates3) => {
    onHide()
    const datess2 = moment(dates2).add(543, 'year').format('YYYY-MM-DD')
    const datess3 = moment(dates3).add(543, 'year').format('YYYY-MM-DD')
    axios.put(`http://localhost:3001/plan/updatestrategic/${f_id}`, {
      plan_name: value1,
      director_of_time: sg1,
      director_of_date: datess2,
      ref_of_time: sg2,
      ref_of_date: datess3
    })
    
    getstrategic();

  }

  const deletestrategic = (f_id) => {
    axios.delete(`http://localhost:3001/plan/deletestrategic/${f_id}`);
    getstrategic()

  }

  const dateFormat1 = (rowData) => {
    if (rowData.director_of_date !== null) {
      return moment(rowData.director_of_date).format("l");
    } else return null
  };
  const dateFormat2 = (rowData) => {
    if (rowData.ref_of_date !== null) {
      return moment(rowData.ref_of_date).format("l");
    } else return null;
  };

  // const confirm2 = (id, value1, sg1, sg2, dates2, dates3) => {
  //   updatestrategic(id, value1, sg1, sg2, dates2, dates3)
  // };

  const editime1 = () => {
    return (
      <div>
        <InputText
          value={sg1}
          onChange={(e) => setSg1(e.target.value)}
          placeholder="ผ่านมติกรรมการครั้งที่"
          style={inputStyle}
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
          style={inputStyle}
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
          style={inputStyle}
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
        style={inputStyle}
      />
    );
  };


  const renderFooter = () => {
    return (
      <div>
        <Button label="ยกเลิก" icon="pi pi-times" className="p-button-danger" style={{ height: '2.5em' }} onClick={onHide} />
        <Button label="บันทึก" icon="pi pi-check" className="p-button-success" style={{ height: '2.5em' }} onClick={() => showConfirm3(id)} autoFocus />
      </div>
    );
  }

  const onFinish = (value) => {
    showConfirm2(value)
  }

  const showConfirm = (value) => {
    confirm({
      title: "ต้องการลบแผนยุทธศาสตร์ใช่มั้ย?",
      icon: <ExclamationCircleFilled />,
      onOk() {
        console.log("OK");
        deletestrategic(value)

      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }

  const showConfirm2 = (value) => {
    confirm({
      title: "ต้องการเพิ่มแผนยุทธศาสตร์ใช่มั้ย?",
      icon: <ExclamationCircleFilled />,
      content: `${value.planname}`,
      onOk() {
        console.log("OK");
        addstrategic(value)

      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }

  const showConfirm3 = (value) => {
    confirm({
      title: "ต้องการจัดการข้อมูลแผนยุทธศาสตร์ใช่มั้ย?",
      icon: <ExclamationCircleFilled />,
      onOk() {
        console.log("OK");
        updatestrategic(value, value1, sg1, sg2, dates2, dates3)
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }

  return (
    <>
      <Header onMenuClick={(value) => toggleMobileMenu()} />
      <Sidebar />
      <div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>
        <div className="page-wrapper">

          <Card>
            <Panel header="จัดการแผนยุทธศาสตร์">


              <div align="left" style={{ marginTop: '.5em' }}>
                <Form
                  form={form}
                  onFinish={onFinish}
                  name="dynamic_rule"
                  style={{
                    maxWidth: '100%',
                    border: 'none',
                    boxShadow: 'none'
                  }}
                >
                  <Form.Item
                    {...formItemLayout}
                    name="yearsfi"
                    label="ปีงบประมาณ"
                    rules={[
                      {
                        required: true,
                        message: "ปีงบประมาณ",
                      },
                    ]}
                  >
                    <Input size="large" placeholder="ปีงบประมาณ" style={{ width: '25em', marginLeft: '1em' }} />
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout}
                    name="planname"
                    label="แผนยุทธศาสตร์"
                    rules={[
                      {
                        required: true,
                        message: "กรุณาเพิ่มแผนยุทธศาสตร์",
                      },
                    ]}
                  >
                    <Input size="large" placeholder="แผนยุทธศาสตร์" style={{ width: '25em' }} />
                  </Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="p-button-success"
                    style={{ marginLeft: '62.25em', height: '2.5em' }}
                    icon='pi pi-plus'
                    label="เพิ่มแผนยุทธศาสตร์"
                    onClick={() => showConfirm2()}
                  />
                </Form>

                {/* <Dialog
                  header="จัดการข้อมูลแผนยุทธ์ศาสตร์"
                  visible={displayBasic}
                  style={{ width: "50vw" }}
                  footer={renderFooter}
                  onHide={onHide}

                >

                  <Card style={{ backgroundColor: 'var(--surface-100)' }}>
                    <h>ชื่อแผนยุทธ์ศาสตร์</h>
                    <div className="fit">

                      <InputText style={inputStyle}
                        value={value1}
                        onChange={(e) => setValue1(e.target.value)}
                        placeholder="แผนยุทธศาสตร์"
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
                    <div style={{ marginTop: "20px" }}>
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
                </Dialog> */}

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
                      <Column field="plan_name" header="แผนยุทธศาสตร์" sortable />
                      {/* <Column field={"fiscalyear"} header="ปีงบประมาณ" style={{ textAlign: "center" }} /> */}
                      <Column
                        field="director_of_time"
                        header="ผ่านมติกรรมการบริหาร (ครั้งที่)"
                        sortable 
                        style={{ textAlign: "center", width: "12.5%" }}
                      />
                      <Column
                        field="director_of_date"
                        header="ผ่านมติกรรมการบริหาร (วันที่)"
                        sortable 
                        body={dateFormat1}
                        style={{ textAlign: "center", width: "12.5%" }}
                      ></Column>
                      <Column
                        field="ref_of_time"
                        header="ผ่านมติกรรมการประจำ (ครั้งที่)"
                        sortable 
                        style={{ textAlign: "center", width: "12%" }}
                      />
                      <Column
                        field="ref_of_date"
                        header="ผ่านมติกรรมการประจำ (วันที่)"
                        sortable 
                        body={dateFormat2}
                        style={{ textAlign: "center", width: "12%" }}
                      />
                      <Column
                        body={action}
                        header="สถานะ"
                        style={{ textAlign: "center", width: "13%" }}
                      />
                      <Column
                        body={actionTemplate}
                        header="จัดการ"
                        style={{ textAlign: "center", width: "11.5%" }}
                      />
                    </DataTable>
                  </div>
                </div>

                <div>
                  <Modal
                    title={<h4 className="m-0">{'จัดการข้อมูลแผนยุทธศาสตร์'}</h4>}
                    open={displayBasic}
                    onCancel={onHide}
                    footer={null}
                    width={700}
                  >
                    <Card style={{ backgroundColor: 'var(--surface-100)' }}>
                      <h>ชื่อแผนยุทธ์ศาสตร์</h>
                      <div className="fit">

                        <InputText style={inputStyle}
                          value={value1}
                          onChange={(e) => setValue1(e.target.value)}
                          placeholder="แผนยุทธศาสตร์"
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
                      <div style={{ marginTop: "20px" }}>
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
                    <div className="text-right mt-4">
                      <Button label="ยกเลิก" icon="pi pi-times" className="p-button-danger" style={{ marginRight: '.5em', height: '2.5em', marginLeft: '26.2em' }} onClick={onHide} />
                      <Button label="บันทึก" icon="pi pi-check" className="p-button-success" style={{ height: '2.5em' }} onClick={() => showConfirm3(id)} autoFocus />
                    </div>
                  </Modal>
                </div>
              </div>
            </Panel>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Strategicplan;
