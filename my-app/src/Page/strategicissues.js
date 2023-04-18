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
import { ExclamationCircleFilled, MinusCircleOutlined, PlusOutlined, } from "@ant-design/icons"
import { Modal } from "antd"
import { Col, Divider, Form, Input, notification, Tooltip } from "antd";
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

const StrategicIssues = () => {
  const [strategic, setStrategic] = useState([]);
  const [selectedSt, setSelectedSt] = useState([]);
  const [stopen, setStopen] = useState();
  const [value1, setValue1] = useState();
  const [value2, setValue2] = useState();
  const [value3, setValue3] = useState();
  const [displayBasic, setDisplayBasic] = useState(false);
  const [dataUpdate, setDataUpdate] = useState("");
  const [id, setId] = useState()
  const [form] = Form.useForm()

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
    axios.delete(`http://localhost:3001/plan/deletestid/${ID}`)
    getstrategicid()
  };
  const updatest = (ID, dataUpdate) => { 
    onHide()
    axios.put(`http://localhost:3001/plan/updatest/${ID}`, {
      strategic_name: dataUpdate
    }
    )
    getstrategicid()

  };

  const addstid = (value) => {
    try {
      //order_strategic: value2.length + 1
      axios.post("http://localhost:3001/plan/createstid", {
        fiscalyear_id: value.yearsfi.fiscalyear_id,
        order_strategic: 1,
        strategic_name: value.staraagic,
      }).then((res) => {
        console.log(res);
        if (res.data === 'ER_DUP_ENTRY') {
          notification.error({
            message: `${value.staraagic}`,
            description: "มีข้อมูลอยู่แล้ว"

          })
          getstrategicid()
          setValue1('')
        } else {
          getstrategicid()
          setValue1('')
        }
      })

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
        <Tooltip placement="bottom" title={<span>สร้างเป้าประสงค์ ตัวชี้วัด หน่วยนับ ค่าเป้าหมาย กลยุทธ์</span>} ><Button
          type="button"
          icon="pi pi-pencil"
          className="p-button-warning"
          style={{ marginRight: ".5em", height: '2.5em', width: '2.5em' }}
          onClick={() =>
            history.push({ pathname: "/home/edit", state: node })
          }
        ></Button></Tooltip>
        <Tooltip placement="bottom" title={<span>ลบประเด็นยุทธศาตร์</span>} ><Button
          type="button"
          icon="pi pi-trash"
          className="p-button-danger"
          style={{ height: '2.5em', width: '2.5em' }}
          onClick={() => {
            showConfirm(node.strategic_id)
            // deletestid(node.strategic_id);
          }}
        ></Button></Tooltip>
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
    setDisplayBasic(false)
    form.resetFields()
  }

  const action = (rowData) => {
    return (
      <div>
        {/* <span className="button-text">{rowData.strategic_name}</span> */}
        <Tooltip placement="bottom" title={<span>แก้ไขประเด็นยุทธศาตร์</span>} >
          <Button
            type="button"
            icon="pi pi-pencil"
            className="p-button-warning"
            style={{ marginRight: ".5em", height: '2.5em', width: '2.5em' }}
            onClick={() => show(rowData.strategic_id)}
          ></Button></Tooltip>
      </div>
    );
  };

  const confirm2 = (id, dataUpdate) => {
    updatest(id, dataUpdate)
  }

  const renderFooter = () => {
    return (

      <div>
        <Button label="ยกเลิก" icon="pi pi-times" className="p-button-danger" style={{ height: '2.5em' }} onClick={onHide} />
        <Button label="ตกลง" icon="pi pi-check" className="p-button-success" style={{ height: '2.5em' }} onClick={() => showConfirm3(id)} autoFocus />
      </div>
    );
  }

  const onFinish = (value) => {
    //console.log(value.yearsfi.fiscalyear_id)
    showConfirm2(value)
  }

  const showConfirm = (value) => {
    confirm({
      title: "ต้องการลบประเด็นยุทธศาสตร์ใช่มั้ย?",
      icon: <ExclamationCircleFilled />,
      onOk() {
        console.log("OK");
        deletestid(value)

      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }

  const showConfirm2 = (value) => {
    confirm({
      title: "ต้องการเพิ่มประเด็นยุทธศาสตร์ใช่มั้ย?",
      icon: <ExclamationCircleFilled />,
      content: `${value.staraagic}`,
      onOk() {
        console.log("OK");
        addstid(value)

      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }

  const showConfirm3 = (value) => {
    confirm({
      title: "ต้องการแก้ไขประเด็นยุทธศาสตร์ใช่มั้ย?",
      icon: <ExclamationCircleFilled />,
      onOk() {
        console.log("OK");
        confirm2(value, dataUpdate)

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
            <Panel header="จัดการข้อมูลประเด็นยุทธ์ศาสตร์ เป้าประสงค์ กลยุทธ์">

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
                  label="แผนยุทธศาสตร์"
                  rules={[
                    {
                      required: true,
                      message: "แผนยุทธศาสตร์",
                    },
                  ]}
                >
                  <Dropdown
                    value={selectedSt}
                    options={stopen}
                    onChange={onStrategic}
                    optionLabel="plan_name"
                    placeholder="แผนยุทธศาสตร์"
                    style={{ height: '2.5em', marginLeft: '1.1em' }}
                  />
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  name="staraagic"
                  label="ประเด็นยุทธศาสตร์"
                  rules={[
                    {
                      required: true,
                      message: "กรุณาเพิ่มประเด็นยุทธศาสตร์",
                    },
                  ]}
                >
                  <Input size="large" placeholder="ประเด็นยุทธศาสตร์" style={{ width: '25em', height: '2.5em' }} />
                </Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="p-button-success"
                  style={{ marginLeft: '61em', height: '2.5em' }}
                  icon='pi pi-plus'
                  label="เพิ่มประเด็นยุทธศาสตร์"
                  onClick={() => showConfirm2()}
                />
              </Form>
              {/* <div className="text-left"> */}


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
                  <Column field="plan_name" header="แผนยุทธศาสตร์"/>
                  <Column field="strategic_name" header="ชื่อประเด็นยุทธศาสตร์" sortable/>
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

              {/* <Dialog
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
              </Dialog> */}

              {/* </div> */}
              <div>
                <Modal
                  title={<h4 className="m-0">{'จัดการข้อมูลประเด็นยุทธศาสตร์'}</h4>}
                  open={displayBasic}
                  onCancel={onHide}
                  footer={null}
                  width={700}
                >
                  <InputText value={dataUpdate} onChange={(e) => setDataUpdate(e.target.value)} placeholder="ชื่อประเด็นยุทธศาสตร์" />
                  <div className="text-right mt-4">
                    <Button label="ยกเลิก" icon="pi pi-times" className="p-button-danger" style={{ marginRight: '.5em', height: '2.5em', marginLeft: '26.2em' }} onClick={onHide} />
                    <Button label="บันทึก" icon="pi pi-check" className="p-button-success" style={{ height: '2.5em' }} onClick={() => showConfirm3(id)} autoFocus />
                  </div>
                </Modal>
              </div>
            </Panel>
          </Card>
        </div>
      </div>
    </>
  );
};

export default StrategicIssues;