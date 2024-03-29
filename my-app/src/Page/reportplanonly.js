import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import axios from "axios";
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
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import Header from "../initialpage/Sidebar/header";
import Sidebar from "../initialpage/Sidebar/sidebar";
import { Tooltip } from "primereact/tooltip";
import { Table } from "antd";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { Panel } from "primereact/panel";

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
      span: 24,
    },
    sm: {
      span: 16,
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
export default function Reportplanonly() {
  const [form] = Form.useForm();
  const [stopen, setStopen] = useState();
  const [menu, setMenu] = useState(false);
  const [newtactic, setNewtactic] = useState([]);
  const [newreport, setNewreport] = useState();
  const dt = useRef(null);
  const [strategic, setStrategic] = useState([]);
  const [strategicName, setStrategicName] = useState([]);
  const [disStrategicName, setDisStrategicName] = useState(true);
  const [goalName, setGoalName] = useState([]);

  const toggleMobileMenu = () => {
    setMenu(true);
  };
  useEffect(() => {
    Strategicdata();
    getstrategicid();
  }, []);
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
  const getstrategicid = () => {
    axios
      .get("http://localhost:3001/plan/strategicid", {})
      .then((res) => {
        setStrategic(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getdatagoa = (id) => {
    axios
      .get(`http://localhost:3001/stg/goaal${id}`, {})
      .then((res) => {
        setGoalName(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const gettactic = (id) => {
    axios
      .get(`http://localhost:3001/stg/tactic2${id}`, {})
      .then((res) => {
        setNewtactic(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getreportplanyear = (data) => {
    console.log(data.goal_name);
    try {
      axios
        .post("http://localhost:3001/report/getreportplanQ", {
          plan_id: data.planid,
          quartername: 4,
        })
        .then((data) => {
          setNewreport(data.data);


        });
    } catch (e) {
      console.log(e);
    }
  };


  const Stopen = (m) => {
    const rows = [];
    const collunm = m.find((obj) => {
      if (obj.flag === 1) {
        rows.push(obj);
      }
    });
    setStopen(rows);
  };

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
  const getStrategic = (value) => {
    setDisStrategicName(false);
  };
  console.log(newreport);
  const onFinish = (values) => {
    console.log("values", values);
    getreportplanyear(values);
  };

  const cols = [
    { field: "project_name", header: "ชื่อโครงการ" },
    { field: "indic_project", header: "ตัวชี้วัดโครงการ" },
    { field: "unit", header: "หน่วยนับ" },
    { field: "cost", header: "ค่าเป้าหมาย" },
    { field: "result_indic_project", header: "ผลการดำเนินงานตามตัวชี้วัด" },
    { field: "butget", header: "งบประมาณ" },
    { field: "used", header: "ผลการใช้จ่ายเงิน" },
    { field: "detail", header: "รายละเอียดผลการดำเนินการ" },
    { field: "problem", header: "ปัญหา/อุปสรรค" },
    { field: "section_name", header: "ฝ่ายที่รับผิดชอบ" },
  ]

  const exportColumns = cols.map((col) => ({
    title: col.header,
    dataKey: col.field,
  }));

  const exportCSV = (selectionOnly) => {
    dt.current.exportCSV({ selectionOnly });
  };

  pdfMake.fonts = {
    THSarabunNew: {
      normal: "THSarabunNew.ttf",
      bold: "THSarabunNew-Bold.ttf",
      italics: "THSarabunNew-Italic.ttf",
      bolditalics: "THSarabunNew-BoldItalic.ttf",
    },
    Roboto: {
      normal: "Roboto-Regular.ttf",
      bold: "Roboto-Medium.ttf",
      italics: "Roboto-Italic.ttf",
      bolditalics: "Roboto-MediumItalic.ttf",
    },
  };

  const [rows, setRows] = useState([]);
  useEffect(() => {
    const newRows = [];
    newreport?.forEach((item) => {
      const row = [];
      row.push(item.project_name);
      row.push(item.indic_project);
      row.push(item.unit);
      row.push(item.cost);
      row.push(item.result_indic_project);
      row.push(item.butget);
      row.push(item.used);
      row.push(item.detail);
      row.push(item.problem);
      row.push(item.section_name)
      newRows.push(row);
    });
    setRows(newRows);
  }, [newreport]);
  const printPDF = () => {
    let listTableDocs = {
      content: [
        {
          stack: [
            {
              text: "สำนักคอมพิวเตอร์เทคโนโลยีสารสนเทศ",
              fontSize: 18,
              bold: true,
              alignment: "center",
            },
            {
              text: "รายงานแผนปฏิบัติการประจำปี",
              fontSize: 18,
              bold: true,
              alignment: "center",
            },
          ],
        },
        {
          table: {
            widths: [50, 32, 32, 35, 42, 42, 42, 50, 50, 50],
            //headerRows: 1,
            body: [
              [
                { text: "ชื่อโครงการ", style: 'tableHeader' },
                { text: "ตัวชี้วัด\nโครง\nการ", style: 'tableHeader' },
                { text: "หน่วย\nนับ", style: 'tableHeader' },
                { text: "ค่าเป้า \n หมาย", style: 'tableHeader' },
                { text: "ผลการ \nดำเนิน\nงานตาม\nตัวชี้วัด", style: 'tableHeader' },
                { text: "งบ\nประมาณ", style: 'tableHeader' },
                { text: "ผลการใช้\nจ่ายเงิน", style: 'tableHeader' },
                { text: "รายละเอียด\nผลการ \nดำเนินการ", style: 'tableHeader' },
                { text: "ปัญหา/อุปสรรค", style: 'tableHeader' },
                { text: "ฝ่ายที่\nรับผิดชอบ", style: 'tableHeader' },
              ],
              ...rows
            ],

          }
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        tableExample: {
          margin: [0, 5, 0, 15]
        },
        tableHeader: {
          bold: true,
          fontSize: 14,
          color: 'black'
        }
      },
      defaultStyle: { font: "THSarabunNew" },
    };

    pdfMake.createPdf(listTableDocs).open();
  };

  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(cols);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      saveAsExcelFile(excelBuffer, "products");
    });
  };

  const saveAsExcelFile = (buffer, fileName) => {
    import("file-saver").then((module) => {
      if (module && module.default) {
        let EXCEL_TYPE =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        let EXCEL_EXTENSION = ".xlsx";
        const data = new Blob([buffer], {
          type: EXCEL_TYPE,
        });

        module.default.saveAs(
          data,
          fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
        );
      }
    });
  };

  const header = (
    <div className="flex align-items-center justify-content-end gap-2">
      <Button
        type="button"
        icon="pi pi-file"
        rounded
        onClick={() => exportCSV(false)}
        data-pr-tooltip="CSV"
      />
      {/* <Button type="button" icon="pi pi-file-excel" severity="success" rounded onClick={exportExcel} data-pr-tooltip="XLS" /> */}
      <Button
        type="button"
        icon="pi pi-file-pdf"
        severity="warning"
        rounded
        onClick={printPDF}
        data-pr-tooltip="PDF"
      />
    </div>
  );

  return (
    <div className={`main-wrapper ${menu ? "slide-nav" : ""}`}>
      <Header onMenuClick={(value) => toggleMobileMenu()} />
      <Sidebar />

      <div className="page-wrapper">
        <Tooltip target=".export-buttons>button" position="bottom" />

        <Card>

          <Panel
            header="รายงานผลการดำเนินงานตามแผนปฏิบัติการประจำปี (เมื่อจบทั้งปีงบประมาณไตรมาสสุดท้าย)"

          >
            <Form
              {...formItemLayout}
              form={form}
              onFinish={onFinish}
              style={{
                maxWidth: "100%",
                border: "none",
                boxShadow: "none",
              }}
            >
              <Form.Item
                {...formItemLayout}
                name="planid"
                label="แผนยุทธศาสตร์"
                rules={[
                  {
                    required: true,
                    message: "กรุณาเลือกแผนยุทธศาสตร์",
                  },
                ]}
              >
                <Select
                  size="large"
                  style={{
                    width: 400,
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

              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit" style={{ height: '2.5em', marginLeft: '45em' }}>
                  ตกลง
                </Button>
              </Form.Item>
              <Tooltip target=".export-buttons>button" position="bottom" />

              <Tooltip target=".export-buttons>button" position="bottom" />

              <DataTable
                ref={dt}
                value={newreport}
                header={header}
                showGridlines
                tableStyle={{ minWidth: "10rem" }}
              >
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
