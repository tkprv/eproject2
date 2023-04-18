import {
    Button,
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
import { useEffect, useRef, useState } from "react";
import {
    ExclamationCircleFilled,
    MinusCircleOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import { Calendar } from "primereact/calendar";
import axios from "axios";
import { Toast } from "primereact/toast";
import { getLocalName } from '../helper/utill';
import { getLocalSection } from "../helper/utill";
import { getLocalId } from "../helper/utill";
import moment from "moment"
import Table from 'react-bootstrap/Table';
import Header from '../initialpage/Sidebar/header';
import Sidebar from '../initialpage/Sidebar/sidebar';
import { Card } from 'primereact/card';
import { Panel } from 'primereact/panel';

const { Option } = Select;
const { confirm } = Modal;

const onPanelChange = (value, mode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
};
const { ThaiBaht } = require("thai-baht-text-ts"); // for ES5

const formItemLayout = {
    labelAlign: "right",
    labelCol: {
        xs: { span: 24 },
        sm: { span: 10 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },

};

const formItemLayoutList = {
    labelAlign: "right",
    labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
    },
    wrapperCol: {
        span: 8,
    },

};

const tailFormItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
        offset: 15,
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

const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 20,
            offset: 8,
        },
    },
};
const formItemLayoutWithOutLabel2 = {
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
        offset: 5,
    },


};

const Newproject = () => {
    const [stopen, setStopen] = useState();
    const [person, setPerson] = useState([]);
    const [workplan, setWorkplan] = useState([]);
    const [strategic, setStrategic] = useState([]);
    const [integration, setIntegration] = useState([]);
    const [status, setStatus] = useState();
    const [stselectfill, setStselectfill] = useState([]);
    const [newtactic, setNewtactic] = useState([])
    const [getyear, setGetyear] = useState([])
    const [form] = Form.useForm();
    const toast = useRef(null);
    const [money, setMoney] = useState();
    const pie = parseFloat(money, 10);
    const moneyText = ThaiBaht(pie);
    const [checkNick, setCheckNick] = useState(false);
    const [selectintegration, setSelectintegration] = useState([]);
    const [selectedbudget, setSelectedbudget] = useState([]);
    const [alldata, setAalldata] = useState();
    const [strategicName, setStrategicName] = useState([]);
    const [goalName, setGoalName] = useState([]);
    const [disStrategicName, setDisStrategicName] = useState(true);
    const [disGoalName, setDisGoalName] = useState(true);
    const [disTacticName, setDisTacticName] = useState(true);
    const [planname, setPlanname] = useState([])
    const [plannamedefalse, setPlannamedefalse] = useState([]);
    const [integra, setIntegra] = useState([])
    const [isYearFiller, setIsYearFiller] = useState(false);
    const [menu, setMenu] = useState(false);

    const budget = [
        { name: "งบประมาณรายได้มหาลัย" },
        { name: "งบประมาณรายได้ของส่วนงาน" },
        { name: "งบประมาณรายได้ของแผ่นดิน" },
        { name: "งบอื่นๆ" },
        { name: "ไม่ได้ใช้งบประมาณ" },
    ];

    const toggleMobileMenu = () => {
        setMenu(!menu)
    }

    useEffect(() => {
        getstrategicid();
        Strategicdata();
        getintegration();
        getheadprojects();
        getworkplan();
        getSectoin();
    }, [])

    useEffect(() => {
        form.setFieldsValue({ headproject: getLocalName() })
    }, [])

    useEffect(() => {
        getyears()
    }, [stopen])

    const getheadprojects = () => {
        axios
            .get("http://localhost:3001/manageuser/person", {})
            .then((res) => {
                const newdata = res.data;
                const data1 = newdata.filter(
                    (value) => value.displayname !== getLocalName()
                );
                setPerson(data1)
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getSectoin = () => {
        const id = getLocalSection()
        try {
            axios
                .post("http://localhost:3001/new/section", {
                    section_id: id,
                })
                .then((data) => {
                    form.setFieldsValue({ Agency: data.data[0].section_name })

                });
        } catch (e) { }
    };

    const getworkplan = () => {
        axios
            .get("http://localhost:3001/new/workplan", {})
            .then((res) => {
                setWorkplan(res.data);
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

    const getintegration = () => {
        axios
            .get("http://localhost:3001/new/integration", {})
            .then((res) => {
                setIntegration(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

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
    const Stopen = (m) => {
        const rows = [];
        const collunm = m.find((obj) => {
            if (obj.flag === 1) {
                rows.push(obj);
            }
        })
        setStopen(rows)
    }

    const filterplanname = (value) => {
        console.log(stopen);
        const plannamefill = stopen.filter(
            (stopen) => stopen.fiscalyear === value
        )
        setPlannamedefalse(plannamefill)

    }

    const getyears = () => {
        console.log(stopen);
        axios
            .get("http://localhost:3001/plan/getyear", {})
            .then((res) => {
                //setYearsfical(res.data.years)
                form.setFieldsValue({ yearsfi: res.data.years })
                if (res.data.years) {
                    const plannamefill = stopen.filter(
                        (stopen) => stopen.fiscalyear === res.data.years
                    )
                    setPlannamedefalse(plannamefill)
                }
                // filterplanname(res.data.years)

            })
            .catch((error) => {
                console.log(error);
            })
    }

    const onStrategic = (e) => {
        setIsYearFiller(true)
        const setst = stopen.filter(
            (stopen) => stopen.fiscalyear === e
        )
        setPlanname(setst)
    }

    const onStrategic1 = (e) => {
        const setst = strategic.filter(
            (strategic) => strategic.fiscalyear_id === e
        )
        setStselectfill(setst);
    }

    const onStrategic2 = (s) => {
        getdatagoa(s);
    }
    const onStrategic3 = (e) => {
        gettactic(e);
    }

    const fiscalyearid = [...new Set(stopen?.map(({ fiscalyear }) => fiscalyear))]

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
    const integrationfill = (value) => {
        setSelectintegration(value)
        const fillterin = integration.filter((integration) => integration.integration_name === value)
        setIntegra(fillterin)
    }

    const createProject = async (alldata, amount) => {
        console.log(alldata);
        try {
            let typepj = "";
            if (alldata.radio === "0") {
                typepj = "โครงการใหม่";
            } else if (alldata.radio === "1") {
                typepj = "โครงการต่อเนื่อง";
            } else if (alldata.radio === "2") {
                typepj = "งานประจำ";
            } else if (alldata.radio === "3") {
                typepj = "งานพัฒนา";
            }
            await axios
                .post("http://localhost:3001/new/createnewproject", {
                    fiscalyear_id: alldata.yearsfi,
                    section_id: getLocalSection(),
                    integration_id: integra[0].integration_id,
                    workplan_id: alldata.selectedbudget === "ไม่ได้ใช้งบประมาณ" ? null : alldata.workplan2,
                    project_name: alldata.projectname,
                    type: typepj,
                    integra_name:
                        alldata.selectintegration === "อื่นๆ"
                            ? alldata.newintegration
                            : alldata.selectintegration === "ไม่มี" ? null : alldata.selectintegration,
                    integra_subject: alldata.integrationdetail,
                    rationale: alldata.reason,
                    target_group: alldata.targetgroup,
                    butget: alldata.selectedbudget === "ไม่ได้ใช้งบประมาณ" ? null : money,
                    butget_char: alldata.selectedbudget === "ไม่ได้ใช้งบประมาณ" ? null : moneyText,
                    tor: alldata.radioTor,
                    source_name:
                        alldata.selectedbudget === "ไม่ได้ใช้งบประมาณ"
                            ? null
                            : alldata.selectedbudget === "งบอื่นๆ" ? alldata.budgets : alldata.selectedbudget,
                    status: status,
                    out_plan: alldata.radiogroup,//ในนอก
                    amount: amount
                })
                .then((res) => {
                    createindic(res.data.insertId, alldata.indica);
                    createStep(res.data.insertId, alldata);
                    createUser(res.data.insertId, alldata.nameheadpj);
                    createObject(res.data.insertId, alldata);
                    strategicproject(res.data.insertId, alldata)
                    createbenefit(res.data.insertId, alldata)
                    // createPdf(res.data.insertId, alldata);
                    if (alldata.selectedbudget !== 'ไม่ได้ใช้งบประมาณ') {
                        createcharges(res.data.insertId, alldata)
                    }
                });
        } catch (e) { console.log(e); }
    };
    // const createPdf = (id, alldata) => {
    //   axios.post("http://localhost:3001/pdf/createPdf", {
    //     alldata: alldata,
    //     id: id,
    //   });
    // };

    const strategicproject = (id, alldata) => {
        try {
            axios.post('http://localhost:3001/new/strategicproject', {
                project_id: id,
                plan_id: alldata.plan_name,
                strategic_id: alldata.strategic_name,
                goal_id: alldata.goal_name,
                tactic_id: alldata.tactic_name
            })
            if (alldata.namestraegicproject.length !== 0 && alldata.namestraegicproject !== null) {
                for (const value of alldata.namestraegicproject) {

                    try {
                        axios
                            .post("http://localhost:3001/new/strategicproject", {
                                project_id: id,
                                plan_id: value.planname,
                                strategic_id: value.selectgoa,
                                goal_id: value.selectissues,
                                tactic_id: value.tactic
                            })
                            .then((res) => {
                            });
                    } catch (e) { }

                }
            }
        }
        catch (e) { }
    }

    const createStep = (id, alldata) => {

        for (const value of alldata.rowsData) {
            const datess2 = moment(value.start).add(543, 'year').format("YYYY-MM-DD");
            const datess3 = moment(value.end).add(543, 'year').format("YYYY-MM-DD");

            try {
                axios
                    .post("http://localhost:3001/new/newprojectstepe", {
                        project_id: id,
                        step_name: value.steps,
                        start: datess2,
                        stop: datess3,
                    })
                    .then((res) => {
                        console.log("res", res.data);
                    });
            } catch (e) { }
        }
    }
    //createbenefit
    const createbenefit = (id, alldata) => {

        for (const value of alldata.sakes) {

            try {
                axios
                    .post("http://localhost:3001/new/sakes", {
                        project_id: id,
                        benefit_name: value
                    })
                    .then((res) => {
                        console.log("res", res.data);
                    });
            } catch (e) { }
        }
    }
    const createObject = (id, alldata) => {

        for (const value of alldata.object) {
            try {
                axios
                    .post("http://localhost:3001/new/newobjective", {
                        project_id: id,
                        objective_name: value,
                    })
                    .then((res) => {
                    });
            } catch (e) { }
        }
    };

    const createcharges = (id, alldata) => {

        for (const value of alldata.budget) {
            console.log('eee', value.Quarter1)
            try {
                axios
                    .post("http://localhost:3001/new/charges", {
                        project_id: id,
                        charges_name_head: value.exbudget,
                        charges_name: value.category,
                        quarter_one: value.Quarter1,
                        quarter_two: value.Quarter2,
                        quarter_three: value.Quarter3,
                        quarter_four: value.Quarter4,
                    })
                    .then((res) => {
                    });
            } catch (e) { }
        }
    };
    const createUser = (id, alldata) => {

        try {
            axios.post("http://localhost:3001/new/userproject", {
                project_id: id,
                user_id: getLocalId()
            });
            if (alldata.length !== 0 && alldata !== null) {
                for (const value of alldata) {
                    try {
                        axios
                            .post("http://localhost:3001/new/userproject", {
                                project_id: id,
                                user_id: value.user_id,
                            })
                            .then((data) => {
                            });
                    } catch (e) { }
                }
            }
        } catch (e) { }
    };

    const createindic = (id, alldata) => {
        for (const value of alldata) {
            try {
                axios
                    .post("http://localhost:3001/new/newprojectindic", {
                        project_id: id,
                        indic_project: value.indicas,
                        unit: value.countunit,
                        cost: value.tagetvalue,
                    })
                    .then((res) => {
                    });
            } catch (e) { }
        }
    };

    useEffect(() => {
        form.validateFields(["nickname"]);
    }, [checkNick, form]);

    const showConfirm = (value) => {
        confirm({
            title: "Do you Want to delete these items?",
            icon: <ExclamationCircleFilled style={{ verticalAlign: 'middle' }} />,
            content: "Some descriptions",
            onOk() {
                console.log("OK");
                createProject(value)


                toast.current.show({
                    severity: "success",
                    summary: "Success",
                    detail: "บันทึกสำเร็จ",
                    life: 3000,
                })
            },
            onCancel() {
                console.log("Cancel");
            },
        });
    };

    const handleMoney = (e) => {
        setMoney(e.target.value)
        form.setFieldsValue({ amount: e.target.value.replace(/[^0-9]*$/, "") })

    }

    const onFinish = async (value) => {

        let amount = 0
        if (selectedbudget === 'ไม่ได้ใช้งบประมาณ') {
            showConfirm(value)
        } else {
            for (const item of value.budget) {
                console.log(item)
                let num1 = item.Quarter1 !== undefined ? item.Quarter1 : 0
                let num2 = item.Quarter2 !== undefined ? item.Quarter2 : 0
                let num3 = item.Quarter3 !== undefined ? item.Quarter3 : 0
                let num4 = item.Quarter4 !== undefined ? item.Quarter4 : 0
                amount += num1 + num2 + num3 + num4;
            }
            if (amount === Number(value.amount) || amount === 0) {
                setAalldata(value)
                showConfirm(value, amount)
                // createProject(value)

            } else {
                toast.current.show({
                    severity: "error",
                    summary: "Error",
                    detail: "รายจ่ายไม่ตรงกับงบประมาณที่กำหนด",
                    life: 3000,
                });
            }
        }

    };
    const onChangeTactic = (value) => {
        gettactic(value);
        setDisTacticName(false);
    };
    const onChangeGoal = (value) => {
        getdatagoa(value);
        setDisGoalName(false);
    };

    const onChangeStrategic = () => {
        setDisStrategicName(false);
    }
    const getStrategic = (value) => {
        setDisStrategicName(false);
    };

    const onChangePlan_name = (value) => {
        const setst = strategic.filter(
            (strategic) => strategic.fiscalyear_id === value
        );
        setStrategicName(setst);
        console.log(setst);
        form.setFieldsValue({ plan_name: value });
        getStrategic(value);
    }

    console.log(status);

    return (
        <>
            <Header onMenuClick={(value) => toggleMobileMenu()} />
            <Sidebar />
            <div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>
                <div className="page-wrapper">
                    <Panel header='สร้างโครงการใหม่'>
                        <Toast ref={toast} />
                        <Form
                            form={form}
                            onFinish={onFinish}
                            name="dynamic_rule"
                            style={{
                                maxWidth: "100%",
                            }}
                            layout="horizontal"
                        >
                            <div className="fit" style={{ marginLeft: '1.4em' }}>
                                <div className="grid p-fluid">
                                    <div className="col-12 md:col-3">
                                        <Form.Item
                                            {...formItemLayout}
                                            name="yearsfi"
                                            label="ปีงบประมาณ"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "กรุณาเลือกปีงบประมาณ",
                                                },
                                            ]}
                                        >
                                            <Select
                                                size="large"
                                                style={{
                                                    width: 260,
                                                    marginLeft: '8.9em'
                                                }}
                                                onChange={onStrategic}
                                            >
                                                <Option value={null}>---- กรุณาเลือกปีงบประมาณ ----</Option>
                                                {fiscalyearid?.map((value) => (
                                                    <Option key={value} value={value}>
                                                        {value}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </div>
                                </div>
                            </div>
                            <div className="fit" style={{ marginLeft: '1em' }}>
                                <div className="grid p-fluid">
                                    <div className="col-12 md:col-3">
                                        <Form.Item
                                            {...formItemLayout}
                                            name="projectname"
                                            label="ชื่อโครงการ"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "กรุณาเพิ่มชื่อโครงการ",
                                                },
                                            ]}
                                        >
                                            <Input style={{ width: '35em', marginLeft: '10.5em' }} placeholder="กรุณาเพิ่มชื่อโครงการ" />
                                        </Form.Item>
                                    </div>
                                </div>
                            </div>
                            <div className="fit" style={{ marginLeft: '2.5em' }}>
                                <div className="grid p-fluid">
                                    <div className="col-12 md:col-5">
                                        <Form.Item
                                            {...formItemLayout}
                                            name="Agency"
                                            label="หน่วยงานที่รับผิดชอบโครงการ"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "",
                                                },
                                            ]}
                                        >
                                            <Input style={{ marginLeft: '3.1em', width: '35em' }} placeholder="" disabled />
                                        </Form.Item>
                                    </div>
                                </div>
                            </div>
                            <div className="fit" style={{ marginLeft: '1.5em' }}>
                                <div className="grid p-fluid">
                                    <div className="col-12 md:col-4">
                                        <Form.Item
                                            {...formItemLayout}
                                            name="headproject"
                                            label="ผู้รับผิดชอบโครงการ"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "",
                                                },
                                            ]}
                                        >
                                            <Input style={{ marginLeft: '7em', width: '35em' }} placeholder="headproject" disabled />
                                        </Form.Item>
                                    </div>
                                </div>
                            </div>
                            <div className="fit">
                                <div className="grid p-fluid">
                                    <div className="col-12 md:col-3.5">
                                        <Form.List name="nameheadpj">
                                            {(fields, { add, remove }, { errors }) => (
                                                <>
                                                    {fields.map((field, index) => (
                                                        <Form.Item
                                                            label={index === 0 ? "ผู้รับผิดชอบโครงการ " : ""}
                                                            required={false}
                                                            key={field.key}
                                                            style={{ marginLeft: '4.1em' }}
                                                        >
                                                            <Form.Item
                                                                //  validateTrigger={['onChange', 'onBlur']}
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                        // whitespace: true,
                                                                        message:
                                                                            "กรุณาเลือกผู้รับผิดชอบโครงการ",
                                                                    },
                                                                ]}
                                                                noStyle
                                                            ><Select
                                                                    size="large"
                                                                    style={{ width: 490, marginLeft: '6.1em' }}
                                                                    placeholder="---- กรุณาเลือกผู้รับผิดชอบโครงการ ----"
                                                                    options={person?.map((item) => ({
                                                                        value: item.user_id,
                                                                        label: item.displayname,
                                                                    }))}
                                                                    onChange={onStrategic1}
                                                                />
                                                                <MinusCircleOutlined
                                                                    className="dynamic-delete-button"
                                                                    style={{ marginLeft: '.5em' }}
                                                                    onClick={() => remove(field.name)}
                                                                />
                                                            </Form.Item>
                                                        </Form.Item>
                                                    ))}
                                                    <Form.Item>
                                                        <Button
                                                            type="dashed"
                                                            onClick={() => add()}
                                                            block
                                                            icon={<PlusOutlined style={{ verticalAlign: 'middle' }} />}
                                                            style={{ width: '20em', marginLeft: '4.1em' }}
                                                        >
                                                            เพิ่มผู้รับผิดชอบโครงการ
                                                        </Button>
                                                        <Form.ErrorList errors={errors} />
                                                    </Form.Item>
                                                </>
                                            )}
                                        </Form.List>
                                    </div>
                                </div>
                            </div>
                            <div className="fit" style={{ marginLeft: '3em' }}>
                                <div className="grid p-fluid">
                                    <div className="col-12 md:col-3">
                                        {isYearFiller === true ? <Form.Item
                                            name="plan_name"
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
                                                    width: 490, marginLeft: '10em'
                                                }}
                                                placeholder="---- กรุณาเลือกแผนยุทธศาสตร์ ----"
                                                onChange={onChangePlan_name}
                                            >
                                                {" "}
                                                <Option value={null}>---- กรุณาเลือกแผนยุทธศาสตร์ ----</Option>
                                                {planname?.map((value) => (
                                                    <Option key={value.fiscalyear_id} value={value.fiscalyear_id}>
                                                        {value.plan_name}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </Form.Item> :
                                            <Form.Item
                                                {...formItemLayout}
                                                name="plan_name"
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
                                                        width: 490, marginLeft: '7.6em'
                                                    }}
                                                    placeholder="---- กรุณาเลือกแผนยุทธศาสตร์ ----"
                                                    onChange={onChangePlan_name}
                                                >
                                                    {" "}
                                                    <Option value={null}>---- กรุณาเลือกแผนยุทธศาสตร์ ----</Option>
                                                    {plannamedefalse?.map((value) => (
                                                        <Option key={value.fiscalyear_id} value={value.fiscalyear_id}>
                                                            {value.plan_name}
                                                        </Option>
                                                    ))}
                                                </Select>
                                            </Form.Item>}
                                    </div>
                                </div>
                            </div>
                            <div className="fit" style={{ marginLeft: '6.3em' }}>
                                <div className="grid p-fluid">
                                    <div className="col-12 md:col-5">
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
                                                    width: 490,
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
                                    </div>
                                </div>
                            </div>
                            <div className="fit" style={{ marginLeft: '6.3em' }}>
                                <div className="grid p-fluid">
                                    <div className="col-12 md:col-5">
                                        <Form.Item
                                            {...formItemLayout}
                                            name="goal_name"
                                            label="เป้าประสงต์"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "กรุณาเลือกเป้าประสงค์",
                                                },
                                            ]}
                                        >
                                            <Select
                                                size="large"
                                                style={{
                                                    width: 490,
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
                                    </div>
                                </div>
                            </div>
                            <div className="fit" style={{ marginLeft: '6.3em' }}>
                                <div className="grid p-fluid">
                                    <div className="col-12 md:col-5">
                                        <Form.Item
                                            {...formItemLayout}
                                            name="tactic_name"
                                            label="กลยุทธ์"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "กรุณาเลือกกลยุทธ์",
                                                },
                                            ]}
                                        >
                                            <Select
                                                size="large"
                                                style={{
                                                    width: 490,
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
                                    </div>
                                </div>
                            </div>
                            <div className="fit" style={{ marginLeft: '4.5em' }}>
                                <div className="grid p-fluid">
                                    <div className="col-12 md:col-9">
                                        <Form.List name="namestraegicproject">
                                            {(fields, { add, remove }, { errors }) => (
                                                <>
                                                    <Col>
                                                        {fields.map((field, index) => (
                                                            <Form.Item required={false} key={field.key}>
                                                                <Divider orientation="left">
                                                                    แผนยุทธศาสตร์ ประเด็นยุทธศาสตร์ เป้าประสงค์ กลยุทธ์ที่ {index + 2}
                                                                </Divider>
                                                                <Form.Item
                                                                    Label="planname"
                                                                    name={[field.name, "planname"]}
                                                                    validateTrigger={["onChange", "onBlur"]}
                                                                    rules={[
                                                                        {
                                                                            required: true,
                                                                            message: "กรุณาเลือกแผนยุทธ์ศาสตร์",
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Select
                                                                        size="large"
                                                                        style={{ width: 490, marginLeft: '13.9em' }}
                                                                        placeholder="---- กรุณาเลือกแผนยุทธ์ศาสตร์ ----"
                                                                        options={planname?.map((item) => ({
                                                                            value: item.fiscalyear_id,
                                                                            label: item.plan_name,
                                                                        }))}
                                                                        onChange={onStrategic1}
                                                                    />
                                                                </Form.Item>
                                                                <Form.Item
                                                                    Label="selectissues"
                                                                    name={[field.name, "selectissues"]}
                                                                    validateTrigger={["onChange", "onBlur"]}
                                                                    rules={[
                                                                        {
                                                                            required: true,
                                                                            message: "กรุณาเลือกการประเด็นยุทธ์ศาสตร์",
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Select
                                                                        size="large"
                                                                        style={{ width: 490, marginLeft: '13.9em' }}
                                                                        placeholder="---- กรุณาเลือกการประเด็นยุทธ์ศาสตร์ ----"
                                                                        options={stselectfill?.map((item) => ({
                                                                            value: item.strategic_id,
                                                                            label: item.strategic_name,
                                                                        }))}
                                                                        onChange={onStrategic2} />
                                                                </Form.Item>
                                                                <Form.Item
                                                                    Label="selectgoa"
                                                                    name={[field.name, "selectgoa"]}
                                                                    validateTrigger={["onChange", "onBlur"]}
                                                                    rules={[
                                                                        {
                                                                            required: true,
                                                                            message: "กรุณาเลือกเป้าประสงค์",
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Select
                                                                        size="large"
                                                                        style={{ width: 490, marginLeft: '13.9em' }}
                                                                        placeholder="---- กรุณาเลือกเป้าประสงค์----"
                                                                        options={goalName?.map((item) => ({
                                                                            value: item.goal_id,
                                                                            label: item.goal_name,
                                                                        }))}
                                                                        onChange={onStrategic3}
                                                                    />
                                                                </Form.Item>

                                                                <Form.Item
                                                                    Label="tactic"
                                                                    name={[field.name, "tactic"]}
                                                                    validateTrigger={["onChange", "onBlur"]}
                                                                    rules={[
                                                                        {
                                                                            required: true,
                                                                            message: "กรุณาเลือกลยุทธ์",
                                                                        },
                                                                    ]}
                                                                >
                                                                    <Select
                                                                        size="large"
                                                                        style={{ width: 490, marginLeft: '13.9em' }}
                                                                        placeholder="---- กรุณาเลือกลยุทธ์----"
                                                                        options={newtactic?.map((item) => ({
                                                                            value: item.tactic_id,
                                                                            label: item.tactic_name,
                                                                        }))} />
                                                                    {/* <Button
                                                                        type={"primary"}
                                                                        ghost
                                                                        onClick={() => remove(field.name)}
                                                                        style={{ marginLeft: '.5em', height: '2.8em' }}
                                                                        icon={<MinusCircleOutlined style={{ verticalAlign: 'middle' }} />}
                                                                    >
                                                                        ลบ
                                                                    </Button> */}
                                                                </Form.Item>
                                                                <Col>
                                                                    <Form.Item>
                                                                        <Button
                                                                            type={"primary"}
                                                                            ghost
                                                                            onClick={() => remove(field.name)}
                                                                            icon={<MinusCircleOutlined style={{ verticalAlign: 'middle' }} />}
                                                                        >
                                                                            ลบ
                                                                        </Button>
                                                                    </Form.Item>
                                                                </Col>
                                                            </Form.Item>
                                                        ))}
                                                    </Col>
                                                    <Form.Item>
                                                        <Button
                                                            type="dashed"
                                                            onClick={() => add()}
                                                            block
                                                            style={{ width: '32em' }}
                                                            icon={<PlusOutlined style={{ verticalAlign: 'middle' }} />}
                                                        >
                                                            เพิ่มแผนยุทธศาสตร์ ประเด็นยุทธศาสตร์ เป้าประสงค์ กลยุทธ์
                                                        </Button>
                                                        <Form.ErrorList errors={errors} />
                                                    </Form.Item>
                                                </>
                                            )}
                                        </Form.List>
                                    </div>
                                </div>
                            </div>
                            <div className="fit">
                                <div className="grid p-fluid" >
                                    <div className="col-12 md:col-5">
                                        <Form.Item
                                            name="radiogroup"
                                            label="ประเภทโครงการ"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "กรุณาเลือกประเภทโครงการ",
                                                },
                                            ]}
                                            style={{ marginLeft: '3.3em' }}
                                        >
                                            <Radio.Group>
                                                <Radio value="1" style={{ marginTop: '.5em', marginLeft: '8.5em' }}>โครงการในแผน</Radio>
                                                <Radio value="0" style={{ marginTop: '.5em', marginLeft: '8.5em' }}>โครงการนอกแผน</Radio>
                                            </Radio.Group>
                                        </Form.Item>
                                    </div>
                                </div>
                            </div>
                            <div className="fit">
                                <div className="grid p-fluid">
                                    <div className="col-12 md:col-5">
                                        <Form.Item
                                            name="radio"
                                            label="ลักษณะโครงการ"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "กรุณาเลือกลักษณะโครงการ"
                                                }
                                            ]}
                                            style={{ marginLeft: '3.3em' }}
                                        >
                                            <Radio.Group>
                                                <Radio value="0" style={{ marginTop: '.5em', marginLeft: '8.5em' }}>โครงการใหม่</Radio>
                                                <Radio value="1" style={{ marginTop: '.5em', marginLeft: '8.5em' }}>โครงการต่อเนื่อง</Radio>
                                                <Radio value="2" style={{ marginTop: '.5em', marginLeft: '8.5em' }}>งานประจำ</Radio>
                                                <Radio value="3" style={{ marginTop: '.5em', marginLeft: '8.5em' }}>งานพัฒนา</Radio>
                                            </Radio.Group>
                                        </Form.Item>
                                    </div>
                                </div>
                            </div>
                            <div className="fit">
                                <div className="grid p-fluid" style={{ marginLeft: '1.7em' }}>
                                    <div className="col-12 md:col-4">
                                        <Form.Item
                                            {...formItemLayout}
                                            name="selectintegration"
                                            label="การบูรณาการโครงการ"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "กรุณาเลือกการบูรณาการโครงการ",
                                                },
                                            ]}
                                        >
                                            <Select
                                                size="large"
                                                style={{ width: 490, marginLeft: '5.5em' }}
                                                placeholder="---- กรุณาเลือกการบูรณาการโครงการ ----"
                                                options={integration?.map((item) => ({
                                                    value: item.integration_name,
                                                    label: item.integration_name,
                                                }))}

                                                onChange={integrationfill}
                                            >

                                            </Select>
                                        </Form.Item>
                                    </div>
                                </div>
                            </div>
                            <div className="fit">
                                <div className="grid p-fluid" style={{ marginLeft: '2.2em' }}>
                                    <div className="col-12 md:col-8">
                                        {selectintegration === "อื่นๆ" && (
                                            <Form.Item
                                                name="newintegration"
                                                label="ชื่อบูรณาการ"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "กรุณาเพิ่มชื่อบูรณาการ",
                                                    },
                                                ]}
                                            >
                                                <Input style={{ marginLeft: '5em' }} placeholder="กรุณาเพิ่มชื่อบูรณาการ" />
                                            </Form.Item>
                                        )}
                                        {selectintegration !== "ไม่มี" && (
                                            <Form.Item
                                                name="integrationdetail"
                                                label="เรื่องบูรณาการโครงการ"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "เรื่องบูรณาการโครงการ",
                                                    },
                                                ]}
                                                style={{ marginLeft: '.5em' }}
                                            >
                                                <Input.TextArea style={{ marginLeft: '6.1em', width: '35em' }} rows={3} showCount />
                                            </Form.Item>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="fit">
                                <div className="grid p-fluid" style={{ marginLeft: '2.7em' }}>
                                    <div className="col-12 md:col-8">
                                        <Form.Item
                                            name="reason"
                                            label="หลักการและเหตุผล"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "กรุณาเพิ่มหลักการและเหตุผล",
                                                },
                                            ]}
                                        >
                                            <Input.TextArea style={{ marginLeft: '7.5em', width: '35em' }} rows={5} showCount />
                                        </Form.Item>
                                    </div>
                                </div>
                            </div>
                            <div className="fit">
                                <div className="grid p-fluid">
                                    <div className="col-12 md:col-8">
                                        <Form.List
                                            name="object"
                                            rules={[
                                                ({ getFieldValue }) => ({
                                                    validator(rule, value) {
                                                        if (getFieldValue("object").length) {
                                                            return Promise.resolve();
                                                        }
                                                        return Promise.reject("กรุณาเพิ่มวัตถุประสงค์");
                                                    },
                                                }),
                                            ]}
                                            label="วัตถุประสงค์"
                                        >
                                            {(fields, { add, remove }, { errors }) => (
                                                <>
                                                    {fields.map((field, index) => (
                                                        <Form.Item
                                                            label={index === 0 ? "วัตถุประสงค์ " : ""}
                                                            required={false}
                                                            key={field.key}
                                                            style={{ marginLeft: '4em' }}
                                                        >
                                                            <Form.Item
                                                                {...field}
                                                                validateTrigger={["onChange", "onBlur"]}
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                        whitespace: true,
                                                                        message:
                                                                            "กรุณาเพิ่มวัตถุประสงค์",
                                                                    },
                                                                ]}
                                                                noStyle
                                                            >
                                                                <Input
                                                                    placeholder="วัตถุประสงค์ "
                                                                    style={{
                                                                        width: "35em",
                                                                        marginLeft: '10.6em'
                                                                    }}
                                                                />
                                                            </Form.Item>
                                                            {fields.length > 1 ? (
                                                                <MinusCircleOutlined
                                                                    className="dynamic-delete-button"
                                                                    onClick={() => remove(field.name)}
                                                                    style={{ marginLeft: '.5em' }}
                                                                />
                                                            ) : null}
                                                        </Form.Item>
                                                    ))}
                                                    <Form.Item>
                                                        <Button
                                                            type="dashed"
                                                            onClick={() => add()}
                                                            block
                                                            icon={<PlusOutlined style={{ verticalAlign: 'middle' }} />}
                                                            style={{ marginLeft: '4.1em', width: '20em' }}
                                                        >
                                                            เพิ่มวัตถุประสงค์
                                                        </Button>
                                                        <Form.ErrorList errors={errors} />
                                                    </Form.Item>
                                                </>
                                            )}
                                        </Form.List>
                                    </div>
                                </div>
                            </div>
                            <div className="fit">
                                <div className="grid p-fluid">
                                    <div className="col-12 md:col-8">
                                        <Form.List
                                            name="indica"
                                            rules={[
                                                ({ getFieldValue }) => ({
                                                    validator(rule, value) {
                                                        if (getFieldValue("indica").length) {
                                                            return Promise.resolve();
                                                        }
                                                        return Promise.reject("กรุณาเพิ่มตัวชี้วัดความสำเร็จ");
                                                    },
                                                }),
                                            ]}
                                        >
                                            {(fields, { add, remove }, { errors }) => (
                                                <>
                                                    {fields.map((field, index) => (
                                                        <Form.Item
                                                            {...field}
                                                            label={index === 0 ? "ตัวชี้วัดความสำเร็จ " : ""}
                                                            required={false}
                                                            key={field.key}
                                                            style={{ marginLeft: '4em' }}
                                                        >
                                                            <Form.Item
                                                                Label="indicas"
                                                                name={[field.name, "indicas"]}
                                                                validateTrigger={["onChange", "onBlur"]}
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                        whitespace: true,
                                                                        message:
                                                                            "กรุณาเพิ่มตัวชี้วัดความสำเร็จ",
                                                                    },
                                                                ]}
                                                                noStyle
                                                            >
                                                                <Input
                                                                    placeholder="ตัวชี้วัดความสำเร็จ "
                                                                    style={{
                                                                        width: "35em", marginBottom: '.5em', marginLeft: '8.1em'
                                                                    }}
                                                                />
                                                            </Form.Item>
                                                            <Form.Item
                                                                {...field}
                                                                Label="countunit"
                                                                name={[field.name, "countunit"]}
                                                                validateTrigger={["onChange", "onBlur"]}
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                        whitespace: true,
                                                                        message:
                                                                            "กรุณาเพิ่มหน่วยนับ",
                                                                    },
                                                                ]}
                                                                noStyle
                                                            >
                                                                <Input
                                                                    placeholder="หน่วยนับ "
                                                                    style={{
                                                                        width: "35em", marginBottom: '.5em', marginLeft: '8.1em'
                                                                    }}
                                                                />
                                                            </Form.Item>
                                                            <Form.Item
                                                                {...field}
                                                                Label="tagetvalue"
                                                                name={[field.name, "tagetvalue"]}
                                                                validateTrigger={["onChange", "onBlur"]}
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                        whitespace: true,
                                                                        message:
                                                                            "กรุณาเพิ่มค่าเป้าหมาย",
                                                                    },
                                                                ]}
                                                                noStyle
                                                            >
                                                                <Input
                                                                    placeholder="ค่าเป้าหมาย "
                                                                    style={{
                                                                        width: "35em", marginLeft: '8.1em'
                                                                    }}
                                                                />
                                                            </Form.Item>

                                                            {fields.length > 1 ? (
                                                                <MinusCircleOutlined
                                                                    className="dynamic-delete-button"
                                                                    onClick={() => remove(field.name)}
                                                                    style={{ marginLeft: '.5em' }}
                                                                />
                                                            )

                                                                : null}
                                                        </Form.Item>


                                                    ))}
                                                    <Form.Item>
                                                        <Button
                                                            type="dashed"
                                                            onClick={() => add()}
                                                            block
                                                            icon={<PlusOutlined style={{ verticalAlign: 'middle' }} />}
                                                            style={{ marginLeft: '4.1em', width: '20em' }}
                                                        >
                                                            เพิ่มตัวชี้วัดความสำเร็จ
                                                        </Button>
                                                        <Form.ErrorList errors={errors} />
                                                    </Form.Item>
                                                </>
                                            )}
                                        </Form.List>
                                    </div>
                                </div>
                            </div>
                            <div className="fit">
                                <div className="grid p-fluid" style={{ marginLeft: '1.2em' }}>
                                    <div className="col-12 md:col-3">
                                        <Form.Item
                                            {...formItemLayout}
                                            name="targetgroup"
                                            label="กลุ่มเป้าหมาย"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "กรุณาเพิ่มกลุ่มเป้าหมาย",
                                                },
                                            ]}
                                        >
                                            <Input placeholder="กลุ่มเป้าหมาย" style={{ width: '35em', marginLeft: '9.9em' }} />
                                        </Form.Item>
                                    </div>
                                </div>
                            </div>
                            <div className="fit">
                                <div className="grid p-fluid">
                                    <div className="col-12 md:col-10">
                                        <Form.List
                                            name="rowsData"
                                            rules={[
                                                ({ getFieldValue }) => ({
                                                    validator(rule, value) {
                                                        if (getFieldValue("rowsData").length) {
                                                            return Promise.resolve();
                                                        }
                                                        return Promise.reject("กรุณาเพิ่มขั้นตอนการดำเนินการ");
                                                    },
                                                }),
                                            ]}
                                        >
                                            {(fields, { add, remove }, { errors }) => (
                                                <>
                                                    {fields.map((field, index) => (
                                                        <Form.Item
                                                            label={index === 0 ? "ขั้นตอนการดำเนินการ " : ""}
                                                            required={false}
                                                            key={field.key}
                                                            style={{ marginLeft: '4em' }}
                                                        >
                                                            <Form.Item
                                                                {...field}
                                                                Label="steps"
                                                                name={[field.name, "steps"]}
                                                                validateTrigger={["onChange", "onBlur"]}
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                        message:
                                                                            "กรุณาเพิ่มขั้นตอนการดำเนินการ",
                                                                    },
                                                                ]}
                                                                noStyle
                                                            >
                                                                <Input
                                                                    placeholder="ขั้นตอนการดำเนินการ/รายการกิจกรรม "
                                                                    style={{
                                                                        width: "35em", marginBottom: '.5em', marginLeft: '6.8em'
                                                                    }}
                                                                />
                                                            </Form.Item>
                                                            <Form.Item
                                                                {...field}
                                                                Label="start"
                                                                name={[field.name, "start"]}
                                                                validateTrigger={["onChange", "onBlur"]}
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                        message:
                                                                            "กรุณาเลือกวันที่เริ่มต้น",
                                                                    },
                                                                ]}
                                                                noStyle
                                                            >
                                                                <Calendar
                                                                    id="basic"
                                                                    placeholder="เลือกวันที่เริ่มต้น"
                                                                    dateFormat="dd/mm/yy"
                                                                    name="dateend"
                                                                    className="form-control"
                                                                    style={{
                                                                        width: "30.7em", marginBottom: '.5em', marginLeft: '5.95em'
                                                                    }}
                                                                />
                                                            </Form.Item>
                                                            <Form.Item
                                                                {...field}
                                                                Label="end"
                                                                name={[field.name, "end"]}
                                                                validateTrigger={["onChange", "onBlur"]}
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                        message:
                                                                            "กรุณาเลือกวันที่สิ้นสุด",
                                                                    },
                                                                ]}
                                                                noStyle
                                                            >
                                                                <Calendar
                                                                    id="basic"
                                                                    placeholder="เลือกวันที่สิ้นสุด"
                                                                    dateFormat="dd/mm/yy"
                                                                    name="dateend"
                                                                    className="form-control"
                                                                    style={{
                                                                        width: "30.6em", marginLeft: '5.95em'
                                                                    }}
                                                                />
                                                            </Form.Item>

                                                            {fields.length > 1 ? (
                                                                <MinusCircleOutlined
                                                                    className="dynamic-delete-button"
                                                                    onClick={() => remove(field.name)}
                                                                    style={{ marginLeft: '.5em' }}
                                                                />
                                                            ) : null}
                                                        </Form.Item>
                                                    ))}
                                                    <Form.Item>
                                                        <Button
                                                            type="dashed"
                                                            onClick={() => add()}
                                                            block
                                                            icon={<PlusOutlined style={{ verticalAlign: 'middle' }} />}
                                                            style={{ width: '20em', marginLeft: '4em' }}
                                                        >
                                                            เพิ่มขั้นตอนการดำเนินการ
                                                        </Button>
                                                        <Form.ErrorList errors={errors} />
                                                    </Form.Item>
                                                </>
                                            )}
                                        </Form.List>
                                    </div>
                                </div>
                            </div>
                            <div className="fit">
                                <div className="grid p-fluid" style={{ marginLeft: '2.65em' }}>
                                    <div className="col-12 md:col-5">
                                        <Form.Item
                                            name="selectedbudget"
                                            label="แหล่งเงิน/ประเภทงบประมาณที่ใช้"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: "กรุณาเลือกแหล่งเงิน/ประเภทงบประมาณที่ใช้",
                                                },
                                            ]}
                                        >
                                            <Select
                                                size="large"
                                                style={{
                                                    width: 490, marginLeft: '1.5em'
                                                }}
                                                defaultValue={null}
                                                placeholder="---- กรุณาเลือกแหล่งเงิน/ประเภทงบประมาณที่ใช้ ----"
                                                // options={budget}
                                                options={budget.map((item) => ({
                                                    value: item.name,
                                                    label: item.name,
                                                }))}
                                                onChange={(value, option) => setSelectedbudget(option.label)}
                                            />
                                        </Form.Item>
                                        {selectedbudget === "งบอื่นๆ" && (
                                            <Form.Item
                                                {...formItemLayout}
                                                name="budgets"
                                                label="ระบุแหล่งเงิน/ประเภทงบประมาณ"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "กรุณาระบุแหล่งเงิน/ประเภทงบประมาณที่ใช้",
                                                    },
                                                ]}
                                            >
                                                <Input placeholder="กรุณาระบุแหล่งเงิน/ประเภทงบประมาณที่ใช้" />
                                            </Form.Item>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {selectedbudget !== "ไม่ได้ใช้งบประมาณ" && (
                                <>
                                    <div className="fit">
                                        <div className="grid p-fluid" style={{ marginLeft: '3.5em' }}>
                                            <div className="col-12 md:col-4">
                                                <Form.Item label="ปริมาณการงบประมาณที่ใช้">
                                                    <Form.Item
                                                        noStyle
                                                        name="amount"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: "กรุณากรอกปริมาณการงบประมาณ",
                                                            },
                                                        ]}
                                                    >
                                                        <Input
                                                            style={{ width: '35em', marginLeft: '4.5em' }}
                                                            onChange={handleMoney}
                                                            placeholder="งบประมาณที่ใช้"
                                                        />
                                                    </Form.Item>
                                                    {money && <h4>{moneyText}</h4>}
                                                </Form.Item>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="fit">
                                        <div className="grid p-fluid">
                                            <div className="col-12 md:col-5">
                                                <Form.Item
                                                    name="workplan2"
                                                    label="แผนงาน"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: "กรุณาเลือกแผนงาน",
                                                        },
                                                    ]}
                                                    style={{ marginLeft: '3.2em' }}
                                                >
                                                    <Select
                                                        size="large"
                                                        style={{
                                                            width: 490, marginLeft: '10.5em'
                                                        }}
                                                        defaultValue={null}
                                                        placeholder="---- กรุณาเลือกแผนงาน ----"
                                                        options={workplan.map((item) => ({
                                                            value: item.workplan_id,
                                                            label: item.workplan_name,
                                                        }))}
                                                    />
                                                </Form.Item>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="fit">
                                        <div className="grid p-fluid">
                                            <div className="col-12 md:col-8">
                                                <Form.List
                                                    name="budget"
                                                    rules={[
                                                        ({ getFieldValue }) => ({
                                                            validator(rule, value) {
                                                                if (getFieldValue("budget").length) {
                                                                    return Promise.resolve();
                                                                }
                                                                return Promise.reject("กรุณาเพิ่มงบประมาณที่ใช้");
                                                            },
                                                        }),
                                                    ]}
                                                >
                                                    {(fields, { add, remove }, { errors }) => (
                                                        <>
                                                            <Row>
                                                                <Col>
                                                                    {fields.map(({ key, name, index, ...restField }) => (
                                                                        <Form.Item required={false} key={key}>
                                                                            <Row>
                                                                                <Col>
                                                                                    <Form.Item
                                                                                        {...restField}
                                                                                        label="งบรายจ่าย"
                                                                                        name={[name, "exbudget"]}
                                                                                        style={{ marginLeft: '4em' }}
                                                                                    >
                                                                                        <Input
                                                                                            style={{ width: '35em', marginLeft: '11.2em' }}
                                                                                            placeholder="งบรายจ่าย"
                                                                                        />
                                                                                    </Form.Item>
                                                                                </Col>
                                                                                <Form.Item
                                                                                    {...restField}
                                                                                    label="หมวดรายจ่าย"
                                                                                    name={[name, "category"]}
                                                                                    style={{ marginLeft: '4em' }}
                                                                                >
                                                                                    <Input
                                                                                        style={{ width: '35em', marginLeft: '9.95em' }}
                                                                                        placeholder="หมวดรายจ่าย"
                                                                                    />
                                                                                </Form.Item>
                                                                                <Form.Item
                                                                                    {...restField}
                                                                                    label="แผ่นการใช้จ่ายไตรมาส 1"
                                                                                    name={[name, "Quarter1"]}
                                                                                    style={{ marginLeft: '4em' }}
                                                                                >
                                                                                    <InputNumber
                                                                                        min={0}
                                                                                        controls={false}
                                                                                        style={{ width: '35em', marginLeft: '5.35em' }}
                                                                                        placeholder="แผ่นการใช้จ่ายไตรมาส 1"
                                                                                    />
                                                                                </Form.Item>
                                                                                <Form.Item
                                                                                    {...restField}
                                                                                    label="แผ่นการใช้จ่ายไตรมาส 2"
                                                                                    name={[name, "Quarter2"]}
                                                                                    style={{ marginLeft: '4em' }}
                                                                                >
                                                                                    <InputNumber
                                                                                        min={0}
                                                                                        controls={false}
                                                                                        style={{ width: '35em', marginLeft: '5.35em' }}
                                                                                        placeholder="แผ่นการใช้จ่ายไตรมาส 2"
                                                                                    />
                                                                                </Form.Item>
                                                                                <Form.Item
                                                                                    {...restField}
                                                                                    label="แผ่นการใช้จ่ายไตรมาส 3"
                                                                                    name={[name, "Quarter3"]}
                                                                                    style={{ marginLeft: '4em' }}
                                                                                >
                                                                                    <InputNumber
                                                                                        min={0}
                                                                                        controls={false}
                                                                                        style={{ width: '35em', marginLeft: '5.35em' }}
                                                                                        placeholder="แผ่นการใช้จ่ายไตรมาส 3"
                                                                                    />
                                                                                </Form.Item>
                                                                                <Form.Item
                                                                                    {...restField}
                                                                                    label="แผ่นการใช้จ่ายไตรมาส 4"
                                                                                    name={[name, "Quarter4"]}
                                                                                    style={{ marginLeft: '4em' }}
                                                                                >
                                                                                    <InputNumber
                                                                                        min={0}
                                                                                        controls={false}
                                                                                        style={{ width: '35em', marginLeft: '5.35em' }}
                                                                                        placeholder="แผ่นการใช้จ่ายไตรมาส 4"
                                                                                    />
                                                                                </Form.Item>

                                                                                {fields.length > 1 ? (
                                                                                    <MinusCircleOutlined
                                                                                        className="dynamic-delete-button"
                                                                                        style={{ marginLeft: '.5em', marginTop: '1.25em' }}
                                                                                        onClick={() => remove(name)}
                                                                                    />
                                                                                ) : null}

                                                                            </Row>
                                                                        </Form.Item>
                                                                    ))}
                                                                </Col>
                                                            </Row>
                                                            <Form.Item style={{ marginLeft: '4.1em' }} label="ประเภทการใช้จ่าย">
                                                                <Button
                                                                    type="dashed"
                                                                    onClick={() => add()}
                                                                    block
                                                                    icon={<PlusOutlined style={{ verticalAlign: 'middle' }} />}
                                                                    style={{ width: '20em', marginLeft: '7.95em' }}
                                                                >
                                                                    เพิ่มประเภทการใช้จ่าย
                                                                </Button>
                                                                <Form.ErrorList errors={errors} />
                                                            </Form.Item>
                                                        </>
                                                    )}
                                                </Form.List>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                            <div className="fit">
                                <div className="grid p-fluid">
                                    <div className="col-12 md:col-8">
                                        <Form.List name="sakes" label="ประโยชน์">
                                            {(fields, { add, remove }, { errors }) => (
                                                <>
                                                    {fields.map((field, index) => (
                                                        <Form.Item
                                                            label={index === 0 ? "ประโยชน์ที่คาดว่าจะได้รับ " : ""}
                                                            required={false}
                                                            key={field.key}
                                                            style={{ marginLeft: '4em' }}
                                                        >
                                                            <Form.Item
                                                                {...field}
                                                                validateTrigger={["onChange", "onBlur"]}
                                                                rules={[
                                                                    {
                                                                        required: true,
                                                                        whitespace: true, //
                                                                        message:
                                                                            "กรุณาเพิ่มประโยชน์ที่คาดว่าจะได้รับ",
                                                                    },
                                                                ]}
                                                                noStyle
                                                            >
                                                                <Input
                                                                    placeholder="ประโยชน์ที่คาดว่าจะได้รับ "
                                                                    style={{
                                                                        width: "35em", marginLeft: '5.05em'
                                                                    }}
                                                                />
                                                            </Form.Item>
                                                            {fields.length > 1 ? (
                                                                <MinusCircleOutlined
                                                                    className="dynamic-delete-button"
                                                                    onClick={() => remove(field.name)}
                                                                    style={{ marginLeft: '.5em' }}
                                                                />
                                                            ) : null}
                                                        </Form.Item>
                                                    ))}
                                                    <Form.Item>
                                                        <Button
                                                            type="dashed"
                                                            onClick={() => add()}
                                                            block
                                                            icon={<PlusOutlined style={{ verticalAlign: 'middle' }} />}
                                                            style={{ width: '20em', marginLeft: '4em' }}
                                                        >
                                                            เพิ่มประโยชน์ที่คาดว่าจะได้รับ
                                                        </Button>
                                                        <Form.ErrorList errors={errors} />
                                                    </Form.Item>
                                                </>
                                            )}
                                        </Form.List>
                                    </div>
                                </div>
                            </div>
                            <div className="fit">
                                <div className="grid p-fluid">
                                    <div className="col-12 md:col-3">
                                        <Form.Item
                                            name="radioTor"
                                            label="เอกสาร TOR"
                                            rules={[{ required: true, message: "กรุณาเลือกเอกสาร TOR" }]}
                                            style={{ marginLeft: '3.1em' }}
                                        >
                                            <Radio.Group>
                                                <Radio value="0" style={{ marginLeft: '10.4em', marginTop: '.5em' }}>ไม่มี</Radio>
                                                <Radio value="1" style={{ marginLeft: '10.4em', marginTop: '.5em' }}>มี</Radio>
                                            </Radio.Group>
                                        </Form.Item>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center mt-2 ">
                                <Button
                                    size="large"
                                    type="primary"
                                    htmlType="submit"
                                    className="login-form-button mr-2"
                                    onClick={(value) => setStatus(100)}
                                >
                                    บันทึก
                                </Button>
                                <Button
                                    size="large"
                                    type="primary"
                                    htmlType="submit"
                                    className="login-form-button"
                                    onClick={(value) => setStatus(0)}

                                >
                                    ส่ง
                                </Button>
                            </div>
                        </Form>
                    </Panel>
                </div>
            </div >
        </>
    );
};
export default Newproject;