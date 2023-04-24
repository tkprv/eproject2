import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import { Button } from "primereact/button";
import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Dialog } from 'primereact/dialog';
import axios from "axios";
import { Toast } from 'primereact/toast'
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
  const [name, setName] = useState();
  const [plandata, setPlandata] = useState(false);
  const [dataUpdate, setDataUpdate] = useState("");
  const [id, setId] = useState()
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false);
  const toast = useRef(null);


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
        Stopen(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const deletestid = async (ID) => {
    await axios.delete(`http://localhost:3001/plan/deletestid/${ID.strategic_id}`)
    try {
      await axios.get(`http://localhost:3001/plan/redatast/${ID.fiscalyear_id}`)
        .then((res) => {
          setValue2(res.data)
        })

    } catch (error) {

    }


  }
  const updatest = async (ID, dataUpdate) => {
    setVisible(false)
    await axios.put(`http://localhost:3001/plan/updatest/${ID}`, {
      strategic_name: dataUpdate
    }
    )
      .then((res) => {
        if (res.data === 'success') {
          toast.current.show({ severity: 'success', summary: 'Success', detail: 'แก้ไขข้อมูลสำเร็จ', life: 3000 });

        }
        if (res.data === 'ER_DUP_ENTRY') {
          toast.current.show({ severity: 'error', summary: 'Error', detail: 'มีข้อมูลอยู่แล้ว', life: 3000 });
        }
        setVisible(false)
      })
    try {
      await axios.get(`http://localhost:3001/plan/redatast/${name.fiscalyear_id}`)
        .then((res) => {
          setValue2(res.data)


        })
      setVisible(false)
    } catch (error) {

    }
    setVisible(false)
    getstrategicid()

  };

  const addstid = async (value) => {
    form.setFieldsValue({ staraagic: null })
    try {
      await axios.post("http://localhost:3001/plan/createstid", {
        fiscalyear_id: value.yearsfi.fiscalyear_id,
        order_strategic: 1,
        strategic_name: value.staraagic,
      }).then((res) => {
        if (res.data === 'success') {
          toast.current.show({ severity: 'success', summary: 'Success', detail: 'เพิ่มข้อมูลสำเร็จ', life: 3000 });

        }
        if (res.data === 'ER_DUP_ENTRY') {
          toast.current.show({ severity: 'error', summary: 'Error', detail: 'มีข้อมูลอยู่แล้ว', life: 3000 });
        }
        form.setFieldsValue({ staraagic: null });

      })
      try {
        await axios.get(`http://localhost:3001/plan/redatast/${plandata.yearsfi.fiscalyear_id}`)
          .then((res) => {
            setValue2(res.data)


          })
        setVisible(false)
      } catch (error) {

      }

    } catch (e) {
    }
  }

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
    console.log(selectedSt)
    const setst = strategic.filter((strategic) => strategic.fiscalyear_id === e.value.fiscalyear_id)
    setValue2(setst)
  }



  const actionTemplate = (node) => {
    return (
      <div>
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
            showConfirm(node)
          }}
        ></Button></Tooltip>
      </div>
    );
  };



  const show = (data, id, name) => {
    setVisible(true);
    setId(id)
    setName(data)
    setDataUpdate(name)
  };


  const action = (rowData) => {
    return (
      <div>
        <Tooltip placement="bottom" title={<span>แก้ไขประเด็นยุทธศาตร์</span>} >
          <Button
            type="button"
            icon="pi pi-pencil"
            className="p-button-warning"
            style={{ marginRight: ".5em", height: '2.5em', width: '2.5em' }}
            onClick={() => show(rowData, rowData.strategic_id, rowData.strategic_name)}
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
        <Button label="ยกเลิก" icon="pi pi-times" className="p-button-danger" style={{ height: '2.5em' }} onClick={() => setVisible(false)} />
        <Button label="บันทึก" icon="pi pi-check" className="p-button-success" style={{ height: '2.5em' }} onClick={() => updatest(id, dataUpdate)} autoFocus />
      </div>
    );
  }

  const onFinish = (value) => {
    addstid(value)
    setPlandata(value)
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
      okText: 'ตกลง',
      cancelText: 'ยกเลิก',
      onOk() {
        console.log("ตกลง");
        addstid(value)

      },
      onCancel() {
        console.log("ยกเลิก");
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
            <Toast ref={toast} />
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
                    style={{ height: '2.5em', marginLeft: '1.1em', width: '50em' }}
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
                  style={{ height: '2.5em' }}
                  icon='pi pi-plus'
                  label="เพิ่มประเด็นยุทธศาสตร์"
                //onClick={() => onFinish()}
                />
              </Form>


              <div>
                <DataTable
                  value={value2}
                  columnResizeMode="fit"
                  showGridlines
                  responsiveLayout="scroll"
                  style={{ marginTop: "30px" }}
                  dataKey="id"
                  paginator rows={10}
                  rowsPerPageOptions={[5, 10, 25]}
                >
                  <Column field="plan_name" header="แผนยุทธศาสตร์" />
                  <Column field="strategic_name" header="ชื่อประเด็นยุทธศาสตร์" sortable />
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

              <div className="card flex justify-content-center">
                {/* <Modal
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
                </Modal> */}
                {/* <Modal
      open={open}
      title="จัดการข้อมูลประเด็นยุทธศาสตร์"
      okText="บันทีก"
      cancelText="ยกเลิก"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: 'public',
        }}
      >
          <Form.Item
          name="dataUpdate"
          label="ชื่อประเด็นยุทธศาสตร์"
          rules={[
            {
              required: true,
              message: 'กรุณากรอกชื่อประเด็นยุทธศาสตร์',
            },
          ]}
        >
          <Input />
        </Form.Item>
        
      </Form>
    </Modal> */}
                <Dialog header="จัดการข้อมูลประเด็นยุทธศาสตร์" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)} footer={renderFooter}>
                  <InputText value={dataUpdate} onChange={(e) => setDataUpdate(e.target.value)} placeholder="ชื่อประเด็นยุทธศาสตร์" />

                </Dialog>
              </div>
            </Panel>
          </Card>
        </div>
      </div>
    </>
  );
};

export default StrategicIssues;