import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import axios from "axios";
import moment from "moment"
import imageData from './img'
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
pdfMake.vfs = pdfFonts.pdfMake.vfs;
const { Option } = Select;


// import { ProductService } from './service/ProductService';
const formItemLayout = {
  labelCol: {
    xs: {
      span: 10,
    },
    sm: {
      span: 10,
    },
  },
  wrapperCol: {
    xs: {
      span: 2,
    },
    sm: {
      span: 20,
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

export default function Reportproject({ id }) {
  const [form] = Form.useForm();
  const [getuser, setGetuser] = useState();
  const [menu, setMenu] = useState(false);
  const [object, setObject] = useState();
  const [newreport, setNewreport] = useState();
  const dt = useRef(null);
  const [indic, setIndic] = useState();
  const [strategic, setStrategic] = useState([]);
  const [benefit, setBenefit] = useState(true);
  const [step, setStep] = useState([]);
  const [buggest, setBuggest] = useState([]);
  const toggleMobileMenu = () => {
    setMenu(true);
  };

  useEffect(() => {
    getreportproject();
    getuserproject();
    getobjectproject();
    getindicproject();
    getstepproject();
    getbenefit();
    getplanproject();
    getbuggest();
  }, []);

  const getreportproject = (data) => {
    try {
      axios
        .post("http://localhost:3001/report/getreportproject", {
          project_id: id,
        })
        .then((data) => {
          setNewreport(data.data)
        });
    } catch (e) {
      console.log(e);
    }
  };

  const getuserproject = (data) => {
    try {
      axios
        .post("http://localhost:3001/report/getuserproject", {
          project_id: id,
        })
        .then((data) => {
          setGetuser(data.data);
        });
    } catch (e) {
      console.log(e);
    }
  };
  const getobjectproject = (data) => {
    try {
      axios
        .post("http://localhost:3001/report/getobjectproject", {
          project_id: id,
        })
        .then((data) => {
          setObject(data.data);
        });
    } catch (e) {
      console.log(e);
    }
  };
  const getplanproject = (data) => {
    try {
      axios
        .post("http://localhost:3001/report/getplanproject", {
          project_id: id,
        })
        .then((data) => {
          setStrategic(data.data);
        });
    } catch (e) {
      console.log(e);
    }
  };
  const getindicproject = (data) => {
    try {
      axios
        .post("http://localhost:3001/report/getindicproject", {
          project_id: id,
        })
        .then((data) => {
          setIndic(data.data);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const getstepproject = (data) => {
    try {
      axios
        .post("http://localhost:3001/report/getstepproject", {
          project_id: id,
        })
        .then((data) => {
          setStep(data.data);
          dateStep(data.data);
        });
    } catch (e) {
      console.log(e);
    }
  };
  const getbenefit = (data) => {
    try {
      axios
        .post("http://localhost:3001/report/getbenefit", {
          project_id: id,
        })
        .then((data) => {
          setBenefit(data.data);
        });
    } catch (e) {
      console.log(e);
    }
  };
  const getbuggest = () => {
    try {
      axios
        .post("http://localhost:3001/report/getbuggest", {
          project_id: id,
        })
        .then((data) => {
          setBuggest(data.data)
        });
    } catch (e) {
      console.log(e);
    }
  };
  const exportCSV = (selectionOnly) => {
    dt.current.exportCSV({ selectionOnly });
  };
  const dateStep = (data) => {
    const dataproject = [];
    const collunm = data.find((obj) => {
      if (obj) {
        const startDate = moment(obj.start)
          .add(543, "year")
          .format("DD-MM-YYYY");
        const stopDate = moment(obj.stop).add(543, "year").format("DD-MM-YYYY");

        dataproject.push({ ...obj, start: startDate, stop: stopDate });
      }
    });
    setStep(dataproject);
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


  const [dataplan, setDataplan] = useState([]);
  const [rows, setRows] = useState([]);
  const [databuggest, setDatabuggest] = useState([]);
  const [datastap, setDatastap] = useState([]);

  useEffect(() => {
    const newRows = [];
    indic?.forEach((item) => {
      const row = [];
      row.push(item.indic_project);
      row.push(item.unit);
      row.push(item.cost);

      newRows.push(row);
    });
    setRows(newRows);
  }, [indic]);

  useEffect(() => {
    const dataRows = [];
    strategic?.forEach((item) => {
      const data = [];
      data.push(item.plan_name);
      data.push(item.strategic_name);
      data.push(item.goal_name);
      data.push(item.tactic_name);
      dataRows.push(data);
    });
    setDataplan(dataRows);
  }, [strategic]);

  useEffect(() => {
    const dataStep = [];
    step?.forEach((item) => {
      const data = [];
      data.push(item.step_name);
      data.push(item.start);
      data.push(item.stop);
      dataStep.push(data);
    });
    setDatastap(dataStep);
  }, [step]);

  useEffect(() => {
    const newBuggest = [];
    buggest?.forEach((item) => {
      const row = [];
      if (item.charges_name_head === null) {
        row.push("-");
      } else {
        row.push(item.charges_name_head);
      }
      if (item.charges_name === null) {
        row.push("-");
      } else {
        row.push(item.charges_name);
      }
      if (item.butget === null) {
        row.push("-");
      } else {
        row.push(item.butget);
      }
      if (item.quarter_one === null) {
        row.push("-");
      } else {
        row.push(item.quarter_one);
      }
      if (item.quarter_two === null) {
        row.push("-");
      } else {
        row.push(item.quarter_two);
      }
      if (item.quarter_three === null) {
        row.push("-");
      } else {
        row.push(item.quarter_three);
      }
      if (item.quarter_four === null) {
        row.push("-");
      } else {
        row.push(item.quarter_four);
      }

      newBuggest.push(row);
    });
    setDatabuggest(newBuggest);
  }, [buggest])

  const printPDF = () => {
    var content = [];

    for (var i = 0; i < getuser.length; i++) {
      var user = getuser[i];
      var text = `ผู้รับผิดชอบ : ${user.displayname}`;
      var obj = { text: text, fontSize: 16, margin: [10, 0, 0, 0] };
      content.push(obj);
    }

    var objectpj = [];

    for (var i = 0; i < object.length; i++) {
      var obj = object[i];
      var text = "7." + [i + 1] + " " + `${obj.objective_name}`;
      var data = { text: text, fontSize: 16, margin: [15, 0, 0, 0] };
      objectpj.push(data);
    }

    var benefitproject = [];

    for (var i = 0; i < benefit.length; i++) {
      var ben = benefit[i];
      var text = "15." + [i + 1] + " " + `${ben.benefit_name}`;
      var data = { text: text, fontSize: 16, margin: [15, 0, 0, 0] };
      benefitproject.push(data);
    }
    let sections = []

    getuser?.forEach(person => {
      sections.push({
        text: "ลงชื่อ ..........................................................",
        fontSize: 16,
        alignment: "right",
        margin: [0, 0, 20, 0]
      }, {
        text: `${person.displayname}`,
        fontSize: 16,
        alignment: "right",
        margin: [0, 0, 60, 0]
      },
        {
          text: "ผู้รับผิดชอบโครงการ",
          fontSize: 16,
          alignment: "right",
          margin: [0, 0, 50, 0]
        }, {
        text: "วันที่ ........../..................../....................",
        fontSize: 16,
        alignment: "right",
        margin: [0, 0, 20, 0]
      });
    })

    let listTableDocs = {
      content: [
        {
          stack: [
            {
              image: imageData,
              width: 180,
              height: 107,
              alignment: "center",
              margin: [0, 0, 0, 20]
            },
            {
              text:
                "แบบเสนอโครงการ ประจําปีงบประมาณ พ.ศ. " +
                newreport[0].fiscalyear,
              fontSize: 18,
              bold: true,
              alignment: "center",
            },
            {
              text: "มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ",
              fontSize: 18,
              bold: true,
              margin: [0, 0, 0, 30],
              alignment: "center",
            },

            {
              text: [
                { text: "1. ชื่อโครงการ : ", style: "header" },
                {
                  text: newreport[0].project_name,
                  style: "header",
                  bold: false,
                },
              ],
            },
            {
              text: [
                { text: "2. หน่วยงานที่รับผิดชอบ : ", style: "header" },
                {
                  text: newreport[0].section_name,
                  style: "header",
                  bold: false,
                },
              ],
            },
            {
              ol: content,
            },
            {
              text: [
                { text: "3. ความเชื่อมโยงสอดคล้องกับ  ", style: "header" },
                { text: "", style: "header", bold: false, margin: [0, 0, 0, 10] },
              ],
            },

            {
              table: {
                widths: [150, 110, 110, 110],
                body: [
                  [
                    {
                      text: "แผนยุทธศาสตร์",
                      fontSize: 14,
                      bold: true,
                      alignment: "center",
                    },
                    {
                      text: "ประเด็นยุทธ์",
                      fontSize: 14,
                      bold: true,
                      alignment: "cener",
                    },
                    {
                      text: "เป้าประสงค์",
                      fontSize: 14,
                      bold: true,
                      alignment: "center",
                    },
                    {
                      text: "กลยุทย์",
                      fontSize: 14,
                      bold: true,
                      alignment: "center",
                    },
                  ],
                  ...dataplan,
                ], margin: [0, 0, 0, 10]
              },
            },
            {
              text: [
                { text: "4. ลักษณะโครงการ/กิจกรรม :", style: "header" },
                { text: newreport[0].type, style: "header", bold: false },
              ],
            },
            {
              text: [
                { text: "5. การบูรณาการโครงการ :", style: "header" },
                {
                  text: newreport[0].integra_name,
                  style: "header",
                  bold: false,
                },
              ],
            },
            {
              text: "6. หลักการและเหตุผลของโครงการ ",
              fontSize: 16,
              bold: true,
            },
            {
              text: newreport[0].rationale,
              fontSize: 16,
            },
            {
              text: "7. วัตถุประสงค์ :",
              fontSize: 16,
              bold: true,
            },
            {
              ul: objectpj, //ol
            },
            {
              text: "8. ตัวชี้วัดความสําเร็จระดับโครงการ (Output/Outcome) และ ค่าเป้าหมาย (ระบุหน่วยนับ) ",
              fontSize: 16,
              bold: true,
            },
          ],
        },
        {
          table: {
            widths: [300, 90, 90],
            body: [
              [
                {
                  text: "ตัวชี้วัดความสําเร็จ",
                  fontSize: 14,
                  bold: true,
                  alignment: "center",
                },
                {
                  text: "หน่วยนับ",
                  fontSize: 14,
                  bold: true,
                  alignment: "center",
                },
                {
                  text: "ค่าเป้าหมาย",
                  fontSize: 14,
                  bold: true,
                  alignment: "center",
                },
              ],
              ...rows,
            ],
          },
        },
        {
          stack: [
            {
              text: "9. กลุ่มเป้าหมาย (ระบุกลุ่มเป้าหมายและจํานวนกลุ่มเป้าหมายที่เข้าร่วมโครงการ) ",
              fontSize: 16,
              bold: true,
              margin: [0, 10, 0, 0],
            },
            {
              text: newreport[0].target_group,
              fontSize: 16,
              margin: [15, 0, 0, 0],
              // bold: true 					[{text: 'Header with Colspan = 2', style: 'tableHeader', colSpan: 2,row: 2, alignment: 'center'}, {}, {text: 'Header 3', style: 'tableHeader', alignment: 'center'}],
            },
            {
              text: "10. ขั้นตอนการดําเนินการ :",
              fontSize: 16,
              bold: true,
            },
          ],
        },
        {
          table: {
            widths: [300, 90, 90],
            headerRows: 1,

            body: [
              [
                {
                  text: "ขั้นตอนการดำเนินการ/รายการกิจกรรม",
                  style: 'tableHeader',
                },
                {
                  text: "เริ่มต้น",
                  style: 'tableHeader',
                },
                {
                  text: "สิ้นสุด",
                  style: 'tableHeader',
                },
              ],
              ...datastap,
            ], margin: [0, 0, 0, 10]
          },
        },

        {
          stack: [{
            text: [
              { text: "11. ระยะเวลาดําเนินงาน : ", style: "header", margin: [0, 10, 0, 0] },
              { text: `${step[0].start} ถึง ${step[step.length - 1].stop} `, style: "header", bold: false },
            ],
          },
          {
            text:
              newreport[0].butget !== null
                ? [
                  {
                    text: `12. ประมาณการ งบประมาณที่ใช้ : : `,
                    style: "header",
                  },
                  {
                    text: `${newreport[0].butget} ' ' ${newreport[0].butget_char}`,
                    style: "header",
                    bold: false,
                  },
                ]
                : [
                  {
                    text: "12. ประมาณการ งบประมาณที่ใช้ : ",
                    style: "header",
                  },
                  {
                    text: "ไม่ได้ใช้งบประมาณ",
                    style: "header",
                    bold: false,
                  },
                ],
          },
          {
            text:
              newreport[0].source_name !== null
                ? [
                  {
                    text: `13. แหล่งเงิน/ประเภทงบประมาณที่ใช้/แผนงาน : `,
                    style: "header",
                  },
                  {
                    text: newreport[0].source_name,
                    style: "header",
                    bold: false,
                  },
                ]
                : [
                  {
                    text: "13. แหล่งเงิน/ประเภทงบประมาณที่ใช้/แผนงาน : ",
                    style: "header",
                  },
                  {
                    text: "ไม่ได้ใช้งบประมาณ",
                    style: "header",
                    bold: false,
                  },
                ],
          },
          {
            text:
              newreport[0].workplan_name !== null
                ? [
                  {
                    text: ` แผนงาน : `,
                    style: "header",
                    margin: [20, 0, 0, 0],
                  },
                  {
                    text: newreport[0].workplan_name,
                    style: "header",
                    bold: false,
                  },
                ]
                : [{ text: "" }],
          },
          {
            text: "14. ประมาณการค่าใช้จ่าย : ( หน่วย : บาท ) ",
            fontSize: 16,
            bold: true,
          },
          ], //table
        },

        {
          table: {
            widths: [70, 70, 60, 60, 60, 60, 60],
            body: [
              [
                {
                  text: "หัวข้อค่าใช้จ่าย",
                  // rowSpan: 2,
                  fontSize: 14,
                  bold: true,
                  alignment: "center",
                },
                {
                  text: "ประเภทรายจ่าย",
                  // rowSpan: 2,
                  fontSize: 14,
                  bold: true,
                  alignment: "center",
                },
                {
                  text: "รวม",
                  style: "tableHeader",
                  alignment: "center",
                },
                {
                  text: "ไตรมาส 1 \n แผนการใช้จ่าย",
                  style: "tableHeader",
                  alignment: "center",
                },
                {
                  text: "ไตรมาส 2 \n แผนการใช้จ่าย",
                  style: "tableHeader",
                  alignment: "center",
                },
                {
                  text: "ไตรมาส 3 \n แผนการใช้จ่าย",
                  style: "tableHeader",
                  alignment: "center",
                },
                {
                  text: "ไตรมาส 4 \n แผนการใช้จ่าย",
                  style: "tableHeader",
                  alignment: "center",
                },
              ], ...databuggest,
              // [
              //   "",
              //   "",
              //   {
              //     text: "แผนการใช้จ่าย",
              //     style: "tableHeader",
              //     alignment: "center",
              //   },
              //   {
              //     text: "แผนการใช้จ่าย",
              //     style: "tableHeader",
              //     alignment: "center",
              //   },
              //   {
              //     text: "แผนการใช้จ่าย",
              //     style: "tableHeader",
              //     alignment: "center",
              //   },
              //   {
              //     text: "แผนการใช้จ่าย",
              //     style: "tableHeader",
              //     alignment: "center",
              //   },
              //   {
              //     text: "แผนการใช้จ่าย",
              //     style: "tableHeader",
              //     alignment: "center",
              //   },
              // ],
              //,
              //...databuggest,
            ]
          },
        },
        {
          stack: [
            {
              text: "15. ประโยชน์ที่คาดว่าจะได้รับ",
              fontSize: 16,
              bold: true,
              margin: [0, 10, 0, 0]
            },
            {
              ul: benefitproject,
            },

          ],

        },
        ...sections
      ],
      defaultStyle: { font: "THSarabunNew" },
      styles: {
        header: {
          fontSize: 16,
          bold: true,
        },
        bigger: {
          fontSize: 16,
        }, tableExample: {
          margin: [0, 5, 0, 15]
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: "black",
        },
      },
    };

    pdfMake.createPdf(listTableDocs).open()
    var pdfDocGenerator = pdfMake.createPdf(listTableDocs);
    pdfDocGenerator.download(`${newreport[0].project_name}`)
  };

  const onFinish = (values) => {
  };

  return (


    <div className="fit">
      <div className="grid p-fluid">
        <Tooltip target=".export-buttons>button" position="bottom" />

        {/* <div>
        <img src={logo} alt="Logo" />
        </div> */}
        <Form
          form={form}
          onFinish={onFinish}
          style={{
            maxWidth: "100%",
            border: "none",
            boxShadow: "none",
          }}
        >
          <Form.Item >
            <Button
              rounded outlined severity="danger" 
              aria-label="Cancel"
              onClick={printPDF}
              icon='pi pi-file-pdf'
              label="แบบเสนอโครงการ"
              data-pr-tooltip="PDF"
              style={{ width: '15em', marginTop: '1em', height: '2.5em', marginLeft: '1em' }}
            />
          </Form.Item>
          <Tooltip target=".export-buttons>button" position="bottom" />

          <Tooltip target=".export-buttons>button" position="bottom" />
        </Form>
      </div>
    </div>
  );
}
