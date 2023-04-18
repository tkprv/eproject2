import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import axios from "axios";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import Header from "../initialpage/Sidebar/header";
import Sidebar from "../initialpage/Sidebar/sidebar";
import { Checkbox, Form, Input } from "antd";
import { Tooltip } from "primereact/tooltip";
import { Table } from "antd";
import pdfMake from "pdfmake/build/pdfmake";
import { Panel } from "primereact/panel";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

// import { ProductService } from './service/ProductService';
const formItemLayout = {
  labelCol: {
    xs: {
      span: 1,
    },
    sm: {
      span: 2,
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

const formItemLayout1 = {
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
export default function Reportstragic() {
  const [form] = Form.useForm();
  const [datareport, setDatareport] = useState();
  const [year, setYear] = useState();
  const [sectionproject, setSectionproject] = useState();
  const [status, setStatus] = useState();
  const [menu, setMenu] = useState(false);
  const [data, setData] = useState();
  const [newreport, setNewreport] = useState();
  const [products, setProducts] = useState([]);
  const dt = useRef(null);

  const toggleMobileMenu = () => {
    setMenu(true);
  };
  useEffect(() => {
    getfilepdf();
    getfiyears();
    getsection();
  }, []);
  const getfilepdf = async () => {
    await axios
      .get("http://localhost:3001/report/reportst", {})
      .then((res) => {
        setDatareport(res.data);
        console.log(res.data)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getfiyears = async () => {
    await axios
      .get("http://localhost:3001/report/fiyear", {})
      .then((res) => {
        setYear(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getsection = async () => {
    await axios
      .get("http://localhost:3001/report/section", {})
      .then((res) => {
        setSectionproject(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  const findStatus = [
    { value: 1,label: 'รอหัวหน้าฝ่ายพิจารณา' },
    { value: 2,label:'รอเจ้าหน้าที่ฝ่ายแผนตรวจสอบ' },
    { value: 3,label:'ไม่ผ่านอนุมัติจากหัวหน้าฝ่าย' },
    { value: 4,label:'รอผู้บริหารพิจารณา' },
    { value: 5,label:'อนุมัติโครงการ' },
    { value: 6,label:'ไม่ผ่านอนุมัติจากผู้บริหาร' },
    { value: 7,label:'ปิดโครงการ/เสร็จตามระยะเวลา'},
    { value: 8,label:'ปิดโครงการ/ไม่เป็นไปตามระยะเวลา'},
    { value: 9,label:'ปิดโครงการ/ขอเลื่อน'  },
    { value:10 ,label:'ปิดโครงการ/ขอยกเลิก'} 
]

  const onFinish = (values) => {
    const setreport = datareport.filter(
      ({ fiscalyear, section_name, status }) =>
        fiscalyear === values.fiyear.fiscalyear &&
        section_name === values.section.section_name &&
        status === values.findStatus
    )

    if (setreport.length > 0) {
      const updatedReport = setreport.map((report) => {
        if (report.status === 1) {
          return {
            ...report,
            status: "รอหัวหน้าฝ่ายพิจารณา",
          };
        }else if(report.status === 2){
          return {
            ...report,
            status: "รอเจ้าหน้าที่ฝ่ายแผนตรวจสอบ",
          }
        }else if(report.status === 3){
          return {
            ...report,
            status: "ไม่ผ่านอนุมัติจากหัวหน้าฝ่าย",
          }
        }else if(report.status === 4){
          return {
            ...report,
            status: "รอผู้บริหารพิจารณา",
          };
        }else if(report.status === 5){
          return {
            ...report,
            status: "อนุมัติโครงการ",
          };
        }else if(report.status === 6){
          return {
            ...report,
            status: "ไม่ผ่านอนุมัติจากผู้บริหาร",
          };
        }else if(report.status === 7){
          return {
            ...report,
            status: "ปิดโครงการ/ไม่เป็นไปตามระยะเวลา",
          };
        }else if(report.status === 8){
          return {
            ...report,
            status: "ปิดโครงการ/ไม่เป็นไปตามระยะเวลา",
          };
        }else if(report.status === 9){
          return {
            ...report,
            status: "ปิดโครงการ/ขอเลื่อน",
          };
        }else if(report.status === 10){
          return {
            ...report,
            status: "ปิดโครงการ/ขอยกเลิก",
          };
        }
        return { ...report, status: "" };
      });
      setNewreport(updatedReport)
      console.log(updatedReport);
    }
  };

  const cols = [
    { field: "project_name", header: "ชื่อโครงการ" },
    { field: "section_name", header: "ฝ่าย" },
    { field: "status", header: "สถานะโครงการ" },
  ];
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
      row.push(item.section_name);
      row.push(item.status);
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
              text: "รายงานชื่อโครงการในปีงบประมาณแยกตามหน่วยงานและสถานะโครงการ",
              fontSize: 18,
              bold: true,
              alignment: "center",
            },
            {
              text: "ปีงบประมาณ  " + +newreport[0].fiscalyear,
              fontSize: 18,
              bold: true,
              alignment: "center",
            },
            {
              text:
                "ฝ่าย  " +
                newreport[0].section_name +
                " สถานะโครงการ  " +
                newreport[0].status,
              fontSize: 18,
              bold: true,
              alignment: "center",
              margin: [0, 0, 0, 20],
            },
          ],
        },
        {
          table: {
            widths: ["*", "auto", "auto"],
            body: [
              [
                {
                  text: "ชื่อโครงการ",
                  fontSize: 14,
                  //bold: true,
                  alignment: "center",
                },
                {
                  text: "ฝ่าย",
                  fontSize: 14,
                  //bold: true,
                  alignment: "center",
                },
                {
                  text: "สถานะโครงการ",
                  fontSize: 14,
                  //bold: true,
                  alignment: "center",
                },
              ],
              ...rows,
            ],
          },
          style: {
            margin: [0, 20, 0, 0],
            alignment: "center",
          },
        },
      ],
      defaultStyle: { font: "THSarabunNew" },
    };

    pdfMake.createPdf(listTableDocs).open();
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
          <Panel header="รายงานชื่อโครงการในปีงบประมาณแยกตามหน่วยงานและสถานะโครงการ" toggleable>
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
                name="fiyear"
                label="ปีงบประมาณ"
                rules={[
                  {
                    required: true,
                    message: "กรุณาเลือกปีงบปรมาณ",
                  },
                ]}
                hasFeedback
              >
                <Dropdown
                  options={year}
                  optionLabel="fiscalyear"
                  className="md:w-30rem"
                  placeholder="ปีงบประมาณ"
                />
              </Form.Item>

              <Form.Item
              {...formItemLayout1}
                name="section"
                label="ฝ่าย"
                rules={[
                  {
                    required: true,
                    message: "กรุณาเลือกฝ่าย",
                  },
                ]}
                hasFeedback
                style={{ marginLeft: '.2em' }}
              >
                <Dropdown
                  options={sectionproject}
                  value={sectionproject}
                  optionLabel="section_name"
                  className="w-full md:w-30rem"
                  placeholder="ฝ่าย"
                  style={{ marginLeft: '3.1em' }}
                />
              </Form.Item>

              <Form.Item
              {...formItemLayout1}
                name="findStatus"
                label="สถานะ"
                rules={[
                  {
                    required: true,
                    message: "กรุณาเลือกสถานะโครงการ",
                  },
                ]}
                hasFeedback
                style={{ marginLeft: '.2em' }}
              >
                <Dropdown
                  options={findStatus}
                  optionLabel="label"
                  className="w-full md:w-30rem"
                  placeholder="สถานะ"
                  style={{ marginLeft: '2.2em' }}
                />
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
                resizableColumns
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
