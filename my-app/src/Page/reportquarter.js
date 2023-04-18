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
export default function ReporQ() {
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
      .get("http://localhost:3001/report/getreportquarter", {})
      .then((res) => {
        setDatareport(res.data);
        console.log(res.data);
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
  };
  const qtproject = [
    { value: 1, label: "ไตรมาสที่ 1" },
    { value: 2, label: "ไตรมาสที่ 2" },
    { value: 3, label: "ไตรมาสที่ 3" },
    { value: 4, label: "ไตรมาสที่ 4" },
  ];

  const onFinish = (values) => {
    console.log(datareport);
    const setreport = datareport.filter(
      ({ fiscalyear, section_name, quarter }) =>
        fiscalyear === values.fiyear.fiscalyear &&
        section_name === values.section.section_name &&
        quarter === values.qtproject
    );
    if (setreport.length > 0) {
      const updatedReport = setreport.map((report) => {
        if (report.period_check === 1) {
          return {
            ...report,
            period_check: "มีการดำเนินการตรงตามระยะเวลาที่กำหนด",
          };
        }
        return { ...report, period_check: "" };
      });
      setNewreport(updatedReport);
    }
  };

  const cols = [
    { field: "project_name", header: "ชื่อโครงการ" },
    { field: "section_name", header: "ฝ่าย" },
    { field: "period_check", header: "สถานะโครงการรายไตรมาส" },
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
      row.push(item.period_check);
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
              text: "รายงานสถานะโครงการรายไตรมาส",
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
                " สถานะโครงการรายไตรมาส  " +
                newreport[0].quarter,
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
                  text: "ไตรมาส",
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
          <Panel header="รายงานสถานะโครงการรายไตรมาส" >
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
                name="qtproject"
                label="ไตรมาส"
                rules={[
                  {
                    required: true,
                    message: "กรุณาเลือกไตรมาศ",
                  },
                ]}
                hasFeedback
                style={{ marginLeft: '.2em' }}
              >
                <Dropdown
                  options={qtproject}
                  optionLabel="label"
                  className="w-full md:w-30rem"
                  placeholder="ไตรมาส"
                  style={{ marginLeft: '1.72em' }}
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
