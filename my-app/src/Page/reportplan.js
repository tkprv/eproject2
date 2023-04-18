import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import axios from 'axios'
import moment from 'moment';
import {
  // Button,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Row,
  Select,
} from "antd";
import { Panel } from "primereact/panel";
import { Card } from 'primereact/card';
import { Dropdown } from 'primereact/dropdown'
import Header from '../initialpage/Sidebar/header'
import Sidebar from '../initialpage/Sidebar/sidebar'
import { Tooltip } from 'primereact/tooltip'
import { Table } from 'antd'
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
const { Option } = Select;


// import { ProductService } from './service/ProductService';
const formItemLayout = {
  labelCol: {
    xs: {
      span: 1,
    },
    sm: {
      span: 3,
    },
  },
  wrapperCol: {
    xs: {
      span: 28,
    },
    sm: {
      span: 28,
    },
  },
};

const formItemLayout2 = {
  labelCol: {
    xs: {
      span: 2.5,
    },
    sm: {
      span: 2.5,
    },
  },
  wrapperCol: {
    xs: {
      span: 28,
    },
    sm: {
      span: 28,
    },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export default function Reportplan() {
  const [form] = Form.useForm()
  const [stopen, setStopen] = useState()
  const [menu, setMenu] = useState(false)
  const [newtactic, setNewtactic] = useState([])
  const [newreport, setNewreport] = useState()
  const dt = useRef(null);
  const [strategic, setStrategic] = useState([]);
  const [strategicName, setStrategicName] = useState([]);
  const [disStrategicName, setDisStrategicName] = useState(true);
  const [disGoalName, setDisGoalName] = useState(true);
  const [disTacticName, setDisTacticName] = useState(true);
  const [goalName, setGoalName] = useState([]);

  const toggleMobileMenu = () => {
    setMenu(true)
  }
  useEffect(() => {
    Strategicdata()
    getstrategicid()
  }, [])
  const Strategicdata = () => {
    axios
      .get("http://localhost:3001/plan/strategic", {})
      .then((res) => {
        Stopen(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const getstrategicid = () => {
    axios
      .get("http://localhost:3001/plan/strategicid", {})
      .then((res) => {
        setStrategic(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const getdatagoa = (id) => {
    axios
      .get(`http://localhost:3001/stg/goaal${id}`, {})
      .then((res) => {
        setGoalName(res.data)
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const gettactic = (id) => {
    axios
      .get(`http://localhost:3001/stg/tactic2${id}`, {})
      .then((res) => {
        setNewtactic(res.data)
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const getreportplanyear = (data) => {
    console.log(data.goal_name)
    try {
      axios.post("http://localhost:3001/report/getreportplanyear", {
        plan_id: data.plan_name,
        strategic_id: data.strategic_name,
        goal_id: data.goal_name,
        tactic_id: data.tactic_name,
      }).then((data) => {
        Dataset(data.data)
      })

    } catch (e) {
      console.log(e)
    }
  }

  const Dataset = (data) => {
    const dataproject = []
    const collunm = data.find((obj) => {
      if (obj) {
        const startDate = moment(obj.start).add(543, 'year').format('DD-MM-YYYY')
        const stopDate = moment(obj.stop).add(543, 'year').format('DD-MM-YYYY')

        dataproject.push({ ...obj, start: startDate, stop: stopDate });
      }
    })
    setNewreport(dataproject)
  }
  console.log(newreport)

  const Stopen = (m) => {
    const rows = []
    const collunm = m.find((obj) => {
      if (obj.flag === 1) {
        rows.push(obj);
      }
    })
    setStopen(rows)
  }

  const onChangePlan_name = (value) => {
    console.log(value);
    const setst = strategic.filter(
      (strategic) => strategic.fiscalyear_id === value
    );
    setStrategicName(setst);
    console.log(setst);
    form.setFieldsValue({ plan_name: value });
    getStrategic(value);
  }
  const onChangeTactic = (value) => {
    gettactic(value);
    setDisTacticName(false);
  };
  const onChangeGoal = (value) => {
    getdatagoa(value);
    setDisGoalName(false);
  };

  //   const onChangeStrategic = () => {
  //     setDisStrategicName(false);
  //   }
  const getStrategic = (value) => {
    setDisStrategicName(false);
  };
  console.log(newreport);
  const onFinish = (values) => {
    console.log("values", values);
    getreportplanyear(values)
    // const setreport = datareport.filter(({fiscalyear,section_name,quarter}) => fiscalyear === values.fiyear.fiscalyear && section_name === values.section.section_name && quarter === values.qtproject) 
    // if (setreport.length > 0) {
    //   const updatedReport = setreport.map((report) => {
    //     if (report.period_check === 1) {
    //       return {...report, period_check: 'มีการดำเนินการตรงตามระยะเวลาที่กำหนด'};
    //     }
    //     return {...report, period_check: ''};
    //   });
    //   setNewreport(updatedReport)
    // }
    // console.log('newreport',newreport)

  }


  const cols = [
    { field: 'project_name', header: 'ชื่อโครงการ' },
    { field: 'butget', header: 'งบประมาณ' },
    { field: 'start', header: 'วันเริ่มต้นโครงการ' },
    { field: 'stop', header: 'วันสิ้นสุดโครงการ' },
    { field: 'section_name', header: 'ฝ่ายที่รับผิดชอบ' }

  ]
  const exportCSV = (selectionOnly) => {
    dt.current.exportCSV({ selectionOnly });
  }


  pdfMake.fonts = {
    THSarabunNew: {
      normal: 'THSarabunNew.ttf',
      bold: 'THSarabunNew-Bold.ttf',
      italics: 'THSarabunNew-Italic.ttf',
      bolditalics: 'THSarabunNew-BoldItalic.ttf'
    },
    Roboto: {
      normal: 'Roboto-Regular.ttf',
      bold: 'Roboto-Medium.ttf',
      italics: 'Roboto-Italic.ttf',
      bolditalics: 'Roboto-MediumItalic.ttf'
    }
  }
  //const rows = [];
  const [rows, setRows] = useState([]);
  useEffect(() => {
    const newRows = [];
    newreport?.forEach(item => {
      const row = [];
      row.push(item.project_name)
      row.push(item.butget);
      row.push(item.start)
      row.push(item.stop)
      row.push(item.section_name)
      newRows.push(row)
    })
    setRows(newRows);
  }, [newreport])
  const printPDF = () => {
    let listTableDocs = {
      content: [
        {
          stack: [
            {
              text: 'สำนักคอมพิวเตอร์เทคโนโลยีสารสนเทศ',
              fontSize: 18,
              bold: true,
              alignment: 'center'
            },
            {
              text: 'รายงานแผนปฏิบัติการประจำปี',
              fontSize: 18,
              bold: true,
              alignment: 'center'
            }
          ]
        }, {
          table: {
            widths: ['*', 'auto', 'auto', 'auto', 'auto'],
            body: [[{
              text: 'ชื่อโครงการ',
              fontSize: 14,
              //bold: true,
              alignment: 'center',
            }, {
              text: 'งบประมาณ',
              fontSize: 14,
              //bold: true,
              alignment: 'center',
            }, {
              text: 'เริ่มต้นโครงการ',
              fontSize: 14,
              //bold: true,
              alignment: 'center',
            }, {
              text: 'สิ้นสุดโครงการ',
              fontSize: 14,
              //bold: true,
              alignment: 'center',
            }, {
              text: 'ฝ่ายที่รับผิดชอบ',
              fontSize: 14,
              //bold: true,
              alignment: 'center',
            }], ...rows]
          }, style: {
            margin: [0, 20, 0, 0], // top, right, bottom, left
            alignment: 'center'
          }

        }
      ],
      defaultStyle: { font: 'THSarabunNew' }


    }



    pdfMake.createPdf(listTableDocs).open()

  }


  const exportExcel = () => {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(cols);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array'
      });

      saveAsExcelFile(excelBuffer, 'products');
    });
  };

  const saveAsExcelFile = (buffer, fileName) => {
    import('file-saver').then((module) => {
      if (module && module.default) {
        let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let EXCEL_EXTENSION = '.xlsx';
        const data = new Blob([buffer], {
          type: EXCEL_TYPE
        });

        module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
      }
    });
  };

  const header = (
    <div className="flex align-items-center justify-content-end gap-2">
      <Button type="button" icon="pi pi-file" rounded onClick={() => exportCSV(false)} data-pr-tooltip="CSV" />
      {/* <Button type="button" icon="pi pi-file-excel" severity="success" rounded onClick={exportExcel} data-pr-tooltip="XLS" /> */}
      <Button type="button" icon="pi pi-file-pdf" severity="warning" rounded onClick={printPDF} data-pr-tooltip="PDF" />
    </div>
  );

  return (
    <div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>
      <Header onMenuClick={(value) => toggleMobileMenu()} />
      <Sidebar />

      <div className="page-wrapper">
        <Tooltip target=".export-buttons>button" position="bottom" />

        <Card>
          <Panel header="จัดการรายงานแผนปฏิบัติการประจำปี" >
            <Form
              {...formItemLayout}
              form={form}
              onFinish={onFinish}
              style={{
                maxWidth: '100%',
                border: 'none',
                boxShadow: 'none'
              }}

            >

              <Form.Item
                {...formItemLayout2}
                name="plan_name"
                label="แผนยุทธศาสตร์"
                rules={[
                  {
                    required: true,
                    message: "กรุณาเลือกแผนยุทธศาสตร์",
                  },
                ]}
                style={{ marginLeft: '1.4em'}}
              >
                <Select
                  size="large"
                  style={{
                    width: 400, marginLeft: '1em'
                  }}
                  placeholder="---- กรุณาเลือกแผนยุทธศาสตร์ ----"
                  onChange={onChangePlan_name}
                >
                  {" "}
                  <Option value={null}>---- กรุณาเลือกแผนยุทธศาสตร์ ----</Option>
                  {stopen?.map((value) => (
                    <Option key={value.fiscalyear_id} value={value.fiscalyear_id}>
                      {value.plan_name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                name="strategic_name"
                label="ประเด็นยุทธศาสตร์"
                rules={[
                  {
                    required: true,
                    message: "กรุณาเลือกประเด็นยุทธศาสตร์",
                  },
                ]}
              >
                <Select
                  size="large"
                  style={{
                    width: 400, 
                  }}
                  defaultValue={null}
                  placeholder="---- กรุณาเลือกประเด็นยุทธศาสตร์ ----"
                  onChange={onChangeGoal}
                  disabled={disStrategicName}
                >
                  <Option value={null}>---- กรุณาเลือกประเด็นยุทธศาสตร์ ----</Option>
                  {strategicName?.map((value) => (
                    <Option key={value.strategic_id} value={value.strategic_id}>
                      {value.strategic_name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                {...formItemLayout2}
                name="goal_name"
                label="เป้าประสงค์"
                rules={[
                  {
                    required: true,
                    message: "กรุณาเลือกเป้าประสงค์",
                  },
                ]}
                style={{ marginLeft: '1.4em'}}
              >
                <Select
                  size="large"
                  style={{
                    width: 400, marginLeft: '2.6em'
                  }}
                  defaultValue={null}
                  placeholder="---- กรุณาเลือกเป้าประสงค์ ----"
                  onChange={onChangeTactic}
                  // options={goalName}
                  disabled={disGoalName}
                >
                  {" "}
                  <Option value={null}>---- กรุณาเลือกเป้าประสงค์ ----</Option>
                  {goalName?.map((value) => (
                    <Option key={value.goal_id} value={value.goal_id}>
                      {value.goal_name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                {...formItemLayout2}
                name="tactic_name"
                label="กลยุทธ์"
                rules={[
                  {
                    required: true,
                    message: "กรุณาเลือกกลยุทธ์",
                  },
                ]}
                style={{ marginLeft: '1.4em'}}
              >
                <Select
                  size="large"
                  style={{
                    width: 400, marginLeft: '4em'
                  }}
                  defaultValue={null}
                  placeholder="---- กรุณาเลือกกลยุทธ์ ----"
                  disabled={disTacticName}
                >
                  <Option value={null}>---- กรุณาเลือกกลยุทธ์ ----</Option>
                  {newtactic?.map((value) => (
                    <Option key={value.tactic_id} value={value.tactic_id}>
                      {value.tactic_name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>


              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit" style={{ height: '2.5em', marginLeft: '45em' }}>
                  ตกลง
                </Button>
              </Form.Item>
              <Tooltip target=".export-buttons>button" position="bottom" />

              <Tooltip target=".export-buttons>button" position="bottom" />

              <DataTable ref={dt} value={newreport} header={header} resizableColumns showGridlines tableStyle={{ minWidth: '10rem' }}>
                {cols.map((col, index) => (
                  <Column key={index} field={col.field} header={col.header} />
                ))}
              </DataTable>
            </Form>
          </Panel>
        </Card>

      </div>
    </div>
  );
}
