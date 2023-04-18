import { Button, Col, Form, Input, InputNumber, Modal, Radio, Row, Select, } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { ExclamationCircleFilled, MinusCircleOutlined, PlusOutlined, } from '@ant-design/icons'
import { Calendar } from 'primereact/calendar'
import axios from 'axios'
import { Toast } from 'primereact/toast'
import { getLocalName } from "../helper/utill"
import { getLocalSection } from "../helper/utill";
import { getLocalId } from '../helper/utill';
import moment from 'moment'
import Header from '../initialpage/Sidebar/header';
import Sidebar from '../initialpage/Sidebar/sidebar';
import { Card } from 'primereact/card';
import { Panel } from 'primereact/panel';

const { Option } = Select
const { confirm } = Modal

const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode)
}
const { ThaiBaht } = require('thai-baht-text-ts') // for ES5

const formItemLayout = {
    labelAlign: 'right',
    labelCol: {
        xs: { span: 1 },
        sm: { span: 5 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },

}

const formItemLayout1 = {
    labelAlign: 'right',
    labelCol: {
        xs: { span: 2.5 },
        sm: { span: 2.5 },
    },
    wrapperCol: {
        span: 8,
    },

}

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

}

const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 20,
            offset: 5,
        },
    },
}
const formItemLayoutWithOutLabel2 = {
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
        offset: 5,
    },


}

const Newproject = () => {
    const [stopen, setStopen] = useState()
    const [person, setPerson] = useState([])
    const [workplan, setWorkplan] = useState([])
    const [strategic, setStrategic] = useState([])
    const [integration, setIntegration] = useState([])
    const [status, setStatus] = useState()
    const [stselectfill, setStselectfill] = useState([])
    const [newtactic, setNewtactic] = useState([])
    const [getyear, setGetyear] = useState([])
    const [form] = Form.useForm()
    const toast = useRef(null)
    const [money, setMoney] = useState()
    const pie = parseFloat(money, 10)
    const moneyText = ThaiBaht(pie)
    const [checkNick, setCheckNick] = useState(false)
    const [selectintegration, setSelectintegration] = useState([])
    const [selectedbudget, setSelectedbudget] = useState([])
    const [alldata, setAalldata] = useState()
    const [strategicName, setStrategicName] = useState([])
    const [goalName, setGoalName] = useState([])
    const [disStrategicName, setDisStrategicName] = useState(true)
    const [disGoalName, setDisGoalName] = useState(true)
    const [disTacticName, setDisTacticName] = useState(true)
    const [planname, setPlanname] = useState([])
    const [plannamedefalse, setPlannamedefalse] = useState([])
    const [integra, setIntegra] = useState([])
    const [isYearFiller, setIsYearFiller] = useState(false)
    const [datapand, setDatapand] = useState([])
    const [menu, setMenu] = useState(false)

    const budget = [
        { name: 'งบประมาณรายได้มหาลัย' },
        { name: 'งบประมาณรายได้ของส่วนงาน' },
        { name: 'งบประมาณรายได้ของแผ่นดิน' },
        { name: 'งบอื่นๆ' },
        { name: 'ไม่ได้ใช้งบประมาณ' },
    ]

    const toggleMobileMenu = () => {
        setMenu(!menu)
    }

    useEffect(() => {
        getstrategicid()
        Strategicdata()
        getintegration()
        getheadprojects()
        getworkplan()
        getSectoin()
        onStrategic1()
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
    }

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
    }

    const getworkplan = () => {
        axios
            .get('http://localhost:3001/new/workplan', {})
            .then((res) => {
                setWorkplan(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const getstrategicid = () => {
        axios
            .get('http://localhost:3001/plan/strategicid', {})
            .then((res) => {
                setStrategic(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const getintegration = () => {
        axios
            .get('http://localhost:3001/new/integration', {})
            .then((res) => {
                setIntegration(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const Strategicdata = () => {
        axios
            .get('http://localhost:3001/plan/strategic', {})
            .then((res) => {
                Stopen(res.data)
                //setPlannamedefalse(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const Stopen = (m) => {
        const rows = []
        const collunm = m.find((obj) => {
            if (obj.flag === 1) {
                rows.push(obj)
            }
        })
        setStopen(rows)
        setPlannamedefalse(rows)
    }

    const filterplanname = (value) => {
        console.log(stopen)
        const plannamefill = stopen.filter(
            (stopen) => stopen.fiscalyear === value
        )
        // setPlannamedefalse(plannamefill)

    }

    const getyears = () => {
        console.log(stopen)
        axios
            .get('http://localhost:3001/plan/getyear', {})
            .then((res) => {
                //setYearsfical(res.data.years)
                form.setFieldsValue({ yearsfi: res.data.years })
                // if (res.data.years) {
                //     const plannamefill = stopen.filter(
                //         (stopen) => stopen.fiscalyear === res.data.years
                //     )
                //    // setPlannamedefalse(plannamefill)
                // }
                // filterplanname(res.data.years)

            })
            .catch((error) => {
                console.log(error)
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
        console.log(datapand)
        const setst = strategic.filter(
            (strategic) => strategic.fiscalyear_id === datapand
        )
        setStselectfill(setst)
    }

    const onStrategic2 = (s) => {
        getdatagoa(s)
    }
    const onStrategic3 = (e) => {
        gettactic(e)
    }

    const fiscalyearid = [...new Set(stopen?.map(({ fiscalyear }) => fiscalyear))]

    const getdatagoa = (id) => {
        axios
            .get(`http://localhost:3001/stg/goaal${id}`, {})
            .then((res) => {
                setGoalName(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const gettactic = (id) => {
        axios
            .get(`http://localhost:3001/stg/tactic2${id}`, {})
            .then((res) => {
                setNewtactic(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const integrationfill = (value) => {
        setSelectintegration(value)
        const fillterin = integration.filter((integration) => integration.integration_name === value)
        setIntegra(fillterin)
    }


    const createProject = async (alldata) => {
        try {
            let typepj = ''
            if (alldata.radio === '0') {
                typepj = 'โครงการใหม่'
            } else if (alldata.radio === '1') {
                typepj = 'โครงการต่อเนื่อง'
            } else if (alldata.radio === '2') {
                typepj = 'งานประจำ'
            } else if (alldata.radio === '3') {
                typepj = 'งานพัฒนา'
            }
            await axios
                .post('http://localhost:3001/new/createnewproject', {
                    fiscalyear_id: alldata.yearsfi,
                    section_id: getLocalSection(),
                    integration_id: integra[0].integration_id,
                    workplan_id: alldata.selectedbudget === 'ไม่ได้ใช้งบประมาณ' ? null : alldata.workplan2,
                    project_name: alldata.projectname,
                    type: typepj,
                    integra_name:
                        alldata.selectintegration === 'อื่นๆ'
                            ? alldata.newintegration
                            : alldata.selectintegration === 'ไม่มี' ? null : alldata.selectintegration,
                    integra_subject: alldata.integrationdetail,
                    rationale: alldata.reason,
                    target_group: alldata.targetgroup,
                    butget: alldata.selectedbudget === 'ไม่ได้ใช้งบประมาณ' ? null : money,
                    butget_char: alldata.selectedbudget === 'ไม่ได้ใช้งบประมาณ' ? null : moneyText,
                    tor: alldata.radioTor,
                    source_name:
                        alldata.selectedbudget === 'ไม่ได้ใช้งบประมาณ'
                            ? null
                            : alldata.selectedbudget === 'งบอื่นๆ' ? alldata.budgets : alldata.selectedbudget,
                    status: status,
                    out_plan: alldata.radiogroup,
                })
                .then((res) => {
                    createindic(res.data.insertId, alldata)
                    createStep(res.data.insertId, alldata)
                    createUser(res.data.insertId, alldata.nameheadpj)
                    createObject(res.data.insertId, alldata)
                    strategicproject(res.data.insertId, alldata)
                    createbenefit(res.data.insertId, alldata)
                    sendEmail(res.data.insertId, alldata)
                    if (alldata.selectedbudget !== 'ไม่ได้ใช้งบประมาณ') {
                        createcharges(res.data.insertId, alldata)
                    }
                })
        } catch (e) {
            console.log(e)
        }
    }
    const sendEmail = (id, alldata) => {
        try {
            axios
                .get(`http://localhost:3001/new/email/${id}/${alldata.projectname}`, {})
                .then((res) => {
                })
        } catch (e) {
        }
    }

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
                            .post('http://localhost:3001/new/strategicproject', {
                                project_id: id,
                                plan_id: value.planname,
                                strategic_id: alldata.selectgoa,
                                goal_id: alldata.selectissues,
                                tactic_id: alldata.tactic
                            })
                            .then((res) => {
                            })
                    } catch (e) {
                    }

                }
            }
        } catch (e) {
        }
    }

    const createStep = (id, alldata) => {
        const date = moment(alldata.start1).add(543, 'year').format('YYYY-MM-DD')
        const dates = moment(alldata.end1).add(543, 'year').format('YYYY-MM-DD')

        try {
            axios
                .post('http://localhost:3001/new/newprojectstepe', {
                    project_id: id,
                    step_name: alldata.steps1,
                    start: date,
                    stop: dates,
                })
                .then((res) => {
                    console.log('res', res.data)
                })
        } catch (e) {
        }
        if (alldata.rowsData != null) {
            for (const value of alldata.rowsData) {
                const datess2 = moment(value.start).add(543, 'year').format('YYYY-MM-DD')
                const datess3 = moment(value.end).add(543, 'year').format('YYYY-MM-DD')

                try {
                    axios
                        .post('http://localhost:3001/new/newprojectstepe', {
                            project_id: id,
                            step_name: value.steps,
                            start: datess2,
                            stop: datess3,
                        })
                        .then((res) => {
                            console.log('res', res.data)
                        })
                } catch (e) {
                }
            }
        }


    }
    //createbenefit
    const createbenefit = (id, alldata) => {
        try {
            axios
                .post('http://localhost:3001/new/sakes', {
                    project_id: id,
                    benefit_name: alldata.sakes1
                })
                .then((res) => {
                    console.log('res', res.data)
                })
        } catch (e) {
        }
        if (alldata.sakes != null) {
            for (const value of alldata.sakes) {

                try {
                    axios
                        .post('http://localhost:3001/new/sakes', {
                            project_id: id,
                            benefit_name: value
                        })
                        .then((res) => {
                            console.log('res', res.data)
                        })
                } catch (e) {
                }
            }
        }

    }
    const createObject = (id, alldata) => {
        try {
            axios
                .post('http://localhost:3001/new/newobjective', {
                    project_id: id,
                    objective_name: alldata.object1,
                })
                .then((res) => {
                })
        } catch (e) {
        }
        if (alldata.object != null) {
            for (const value of alldata.object) {
                try {
                    axios
                        .post('http://localhost:3001/new/newobjective', {
                            project_id: id,
                            objective_name: value,
                        })
                        .then((res) => {
                        })
                } catch (e) {
                }
            }
        }

    }

    const createcharges = (id, alldata) => {

        for (const value of alldata.budget) {
            console.log('eee', value.Quarter1)
            try {
                axios
                    .post('http://localhost:3001/new/charges', {
                        project_id: id,
                        charges_name_head: value.exbudget,
                        charges_name: value.category,
                        quarter_one: value.Quarter1,
                        quarter_two: value.Quarter2,
                        quarter_three: value.Quarter3,
                        quarter_four: value.Quarter4,
                    })
                    .then((res) => {
                    })
            } catch (e) {
            }
        }
    }
    const createUser = (id, alldata) => {

        try {
            axios.post('http://localhost:3001/new/userproject', {
                project_id: id,
                user_id: getLocalId()
            })
            if (alldata.length !== 0 && alldata !== null) {
                for (const value of alldata) {
                    try {
                        axios
                            .post('http://localhost:3001/new/userproject', {
                                project_id: id,
                                user_id: value.user_id,
                            })
                            .then((data) => {
                            })
                    } catch (e) {
                    }
                }
            }
        } catch (e) {
        }
    }

    const createindic = (id, alldata) => {
        try {
            axios
                .post('http://localhost:3001/new/newprojectindic', {
                    project_id: id,
                    indic_project: alldata.indicas1,
                    unit: alldata.countunit1,
                    cost: alldata.tagetvalue1,
                })
                .then((res) => {
                })
        } catch (e) {
        }
        if (alldata.indica != null) {
            for (const value of alldata.indica) {
                try {
                    axios
                        .post('http://localhost:3001/new/newprojectindic', {
                            project_id: id,
                            indic_project: value.indicas,
                            unit: value.countunit,
                            cost: value.tagetvalue,
                        })
                        .then((res) => {
                        })
                } catch (e) {
                }
            }
        }

    }


    useEffect(() => {
        form.validateFields(['nickname'])
    }, [checkNick, form])

    const showConfirm = (value, amount) => {
        confirm({
            title: 'ต้องการบันทึกข้อมูลโครงการใช่มั้ย?',
            icon: <ExclamationCircleFilled />,
            content: 'Some descriptions',
            onOk() {
                console.log('OK')
                createProject(value, amount)


                toast.current.show({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'บันทึกสำเร็จ',
                    life: 3000,
                })
            },
            onCancel() {
                console.log('Cancel')
            },
        })
    }

    const handleMoney = (e) => {
        setMoney(e.target.value)
        form.setFieldsValue({ amount: e.target.value.replace(/[^0-9]*$/, '') })

    }


    const onFinish = async (value) => {
        console.log('value', value)
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
                amount += num1 + num2 + num3 + num4
            }
            if (amount === Number(value.amount) || amount === 0) {
                setAalldata(value)
                showConfirm(value)
                // createProject(value)

            } else {
                toast.current.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'รายจ่ายไม่ตรงกับงบประมาณที่กำหนด',
                    life: 3000,
                })
            }
        }

    }
    const onChangeTactic = (value) => {
        gettactic(value)
        setDisTacticName(false)
    }
    const onChangeGoal = (value) => {
        getdatagoa(value)
        setDisGoalName(false)
    }

    const onChangeStrategic = () => {
        setDisStrategicName(false)
    }
    const getStrategic = (value) => {
        setDisStrategicName(false)
    }

    const onChangePlan_name = (value) => {
        setDatapand(value)
        const setst = strategic.filter(
            (strategic) => strategic.fiscalyear_id === value
        )
        setStrategicName(setst)
        console.log(setst)
        form.setFieldsValue({ plan_name: value })
        getStrategic(value)
    }

    return (
        <>
            <Header onMenuClick={(value) => toggleMobileMenu()} />
            <Sidebar />
            <div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>
                <div className="page-wrapper">
                    <Card>
                        <Panel header='สร้างโครงการ'>
                            <Toast ref={toast} />
                            <Form
                                form={form}
                                onFinish={onFinish}
                                name="dynamic_rule"
                                style={{
                                    maxWidth: '100%',
                                }}
                                layout="horizontal"
                            >
                                <Form.Item
                                    {...formItemLayout1}
                                    name="yearsfi"
                                    label="ปีงบประมาณ"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'กรุณาเลือกปีงบประมาณ',
                                        },
                                    ]}
                                    style={{ marginLeft: '2.5em' }}
                                >
                                    <Select
                                        size="large"
                                        style={{
                                            width: 260, marginLeft: '7.5em'
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
                                <Form.Item
                                    {...formItemLayout1}
                                    name="projectname"
                                    label="ชื่อโครงการ"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'กรุณาเพิ่มชื่อโครงการ',
                                        },
                                    ]}
                                    style={{ marginLeft: '2.5em' }}
                                >
                                    <Input placeholder="กรุณาเพิ่มชื่อโครงการ" style={{ width: '35em', marginLeft: '9em' }} />
                                </Form.Item>
                                <Form.Item
                                    {...formItemLayout1}
                                    name="Agency"
                                    label="หน่วยงานที่รับผิดชอบโครงการ"
                                    rules={[
                                        {
                                            required: true,
                                            message: '',
                                        },
                                    ]}
                                    style={{ marginLeft: '2.5em' }}
                                >
                                    <Input placeholder="" disabled style={{ width: '35em', marginLeft: '1.4em' }} />
                                </Form.Item>
                                <Form.Item
                                    {...formItemLayout1}
                                    name="headproject"
                                    label="ผู้รับผิดชอบโครงการ"
                                    rules={[
                                        {
                                            required: true,
                                            message: '',
                                        },
                                    ]}
                                    style={{ marginLeft: '2.5em' }}
                                >
                                    <Input placeholder="headproject" disabled style={{ width: '35em', marginLeft: '5.4em' }} />
                                </Form.Item>
                                <Form.List name="nameheadpj" {...formItemLayout}>
                                    {(fields, { add, remove }, { errors }) => (
                                        <>
                                            {fields.map((field, index) => (
                                                <Form.Item
                                                    {...(index === 0
                                                        ? formItemLayout
                                                        : formItemLayoutWithOutLabel)}
                                                    label={index === 0 ? 'ผู้รับผิดชอบโครงการ ' : ''}
                                                    required={false}
                                                    key={field.key}
                                                >
                                                    <Form.Item
                                                        {...field}
                                                        name="nameheadpj"
                                                        //  validateTrigger={['onChange', 'onBlur']}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                // whitespace: true,
                                                                message:
                                                                    'กรุณาเลือกผู้รับผิดชอบโครงการ',
                                                            },
                                                        ]}
                                                        noStyle
                                                    ><Select
                                                            size="large"
                                                            style={{ width: 490 }}
                                                            placeholder="---- กรุณาเลือกผู้รับผิดชอบโครงการ ----"
                                                            options={person?.map((item) => ({
                                                                value: item.user_id,
                                                                label: item.displayname,
                                                            }))}
                                                        />
                                                    </Form.Item>

                                                    <MinusCircleOutlined
                                                        className="dynamic-delete-button"
                                                        onClick={() => remove(field.name)}
                                                        style={{ marginLeft: '.5em' }}
                                                    />
                                                </Form.Item>
                                            ))}
                                            <Form.Item {...formItemLayoutWithOutLabel2}>
                                                <Button
                                                    type="dashed"
                                                    onClick={() => add()}
                                                    block
                                                    icon={<PlusOutlined style={{ verticalAlign: 'middle' }} />}
                                                    style={{ width: '35em' }}
                                                >
                                                    เพิ่มผู้รับผิดชอบโครงการ
                                                </Button>
                                                <Form.ErrorList errors={errors} />
                                            </Form.Item>
                                        </>
                                    )}
                                </Form.List>

                                {isYearFiller === true ? <Form.Item
                                    {...formItemLayout1}
                                    name="plan_name"
                                    label="แผนยุทธศาสตร์"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'กรุณาเลือกแผนยุทธศาสตร์',
                                        },
                                    ]}
                                    style={{ marginLeft: '2.5em' }}
                                >
                                    <Select
                                        size="large"
                                        style={{
                                            width: 490, marginLeft: '6.4em'
                                        }}
                                        placeholder="---- กรุณาเลือกแผนยุทธศาสตร์ ----"
                                        onChange={onChangePlan_name}
                                    >
                                        {' '}
                                        <Option value={null}>---- กรุณาเลือกแผนยุทธศาสตร์ ----</Option>
                                        {planname?.map((value) => (
                                            <Option key={value.fiscalyear_id} value={value.fiscalyear_id}>
                                                {value.plan_name}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item> :
                                    <Form.Item
                                        {...formItemLayout1}
                                        name="plan_name"
                                        label="แผนยุทธศาสตร์"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'กรุณาเลือกแผนยุทธศาสตร์',
                                            },
                                        ]}
                                        style={{ marginLeft: '2.5em' }}
                                    >
                                        <Select
                                            size="large"
                                            style={{
                                                width: 490, marginLeft: '6.4em'
                                            }}
                                            placeholder="---- กรุณาเลือกแผนยุทธศาสตร์ ----"
                                            onChange={onChangePlan_name}
                                        >
                                            {' '}
                                            <Option value={null}>---- กรุณาเลือกแผนยุทธศาสตร์ ----</Option>
                                            {plannamedefalse?.map((value) => (
                                                <Option key={value.fiscalyear_id} value={value.fiscalyear_id}>
                                                    {value.plan_name}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                }

                                <Form.Item
                                    {...formItemLayout1}
                                    name="strategic_name"
                                    label="ประเด็นยุทธศาสตร์"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'กรุณาเลือกประเด็นยุทธศาสตร์',
                                        },
                                    ]}
                                    style={{ marginLeft: '2.5em' }}
                                >
                                    <Select
                                        size="large"
                                        style={{
                                            width: 490, marginLeft: '5.3em'
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
                                    {...formItemLayout1}
                                    name="goal_name"
                                    label="เป้าประสงต์"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'กรุณาเลือกเป้าประสงค์',
                                        },
                                    ]}
                                    style={{ marginLeft: '2.5em' }}
                                >
                                    <Select
                                        size="large"
                                        style={{
                                            width: 490, marginLeft: '8em'
                                        }}
                                        defaultValue={null}
                                        placeholder="---- กรุณาเลือกเป้าประสงค์ ----"
                                        onChange={onChangeTactic}
                                        // options={goalName}
                                        disabled={disGoalName}
                                    >
                                        {' '}
                                        <Option value={null}>---- กรุณาเลือกเป้าประสงค์ ----</Option>
                                        {goalName?.map((value) => (
                                            <Option key={value.goal_id} value={value.goal_id}>
                                                {value.goal_name}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    {...formItemLayout1}
                                    name="tactic_name"
                                    label="กลยุทธ์"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'กรุณาเลือกกลยุทธ์',
                                        },
                                    ]}
                                    style={{ marginLeft: '2.5em' }}
                                >
                                    <Select
                                        mode="multiple"
                                        allowClear
                                        size="large"
                                        placeholder="---- กรุณาเลือกกลยุทธ์ ----"
                                        disabled={disTacticName}
                                        style={{
                                            width: 490, marginLeft: '9.4em'
                                        }}
                                    // optionLabelProp="label"
                                    >
                                        {newtactic?.map((item) =>
                                            <Option value={item.tactic_id} label={item.tactic_id}>
                                                {item.tactic_name}
                                            </Option>
                                        )}
                                    </Select>
                                    {/*<Select*/}
                                    {/*    size="large"*/}
                                    {/*    style={{*/}
                                    {/*        width: 400,*/}
                                    {/*    }}*/}
                                    {/*    defaultValue={null}*/}
                                    {/*    placeholder="---- กรุณาเลือกกลยุทธ์ ----"*/}
                                    {/*    disabled={disTacticName}*/}
                                    {/*>*/}
                                    {/*    <Option value={null}>---- กรุณาเลือกกลยุทธ์ ----</Option>*/}
                                    {/*    {newtactic?.map((value) => (*/}
                                    {/*        <Option key={value.tactic_id} value={value.tactic_id}>*/}
                                    {/*            {value.tactic_name}*/}
                                    {/*        </Option>*/}
                                    {/*    ))}*/}
                                    {/*</Select>*/}
                                </Form.Item>

                                <Form.List name="listplan">
                                    {(fields, { add, remove }) => (
                                        <>
                                            {fields.map(({ key, name, ...restField }) => (

                                                <Form.Item
                                                    required={false}
                                                    key={key}
                                                    wrapperCol={{
                                                        flex: 1,
                                                    }}
                                                >
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'plan_name']}
                                                        {...formItemLayout1}
                                                        label="แผนยุทธศาสตร์"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'กรุณาเลือกแผนยุทธศาสตร์',
                                                            },
                                                        ]}
                                                        style={{ marginLeft: '2.5em' }}
                                                    >
                                                        <Select
                                                            size="large"
                                                            style={{
                                                                width: 490, marginLeft: '6.4em'
                                                            }}
                                                            placeholder="---- กรุณาเลือกแผนยุทธศาสตร์ ----"
                                                            onChange={onChangePlan_name}
                                                        >
                                                            {' '}
                                                            <Option value={null}>---- กรุณาเลือกแผนยุทธศาสตร์ ----</Option>
                                                            {plannamedefalse?.map((value) => (
                                                                <Option key={value.fiscalyear_id} value={value.fiscalyear_id}>
                                                                    {value.plan_name}
                                                                </Option>
                                                            ))}
                                                        </Select>
                                                    </Form.Item>

                                                    <Form.Item
                                                        {...formItemLayout1}
                                                        name={[name, 'strategic_name']}
                                                        label="ประเด็นยุทธศาสตร์"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'กรุณาเลือกประเด็นยุทธศาสตร์',
                                                            },
                                                        ]}
                                                        style={{ marginLeft: '2.5em' }}
                                                    >
                                                        <Select
                                                            size="large"
                                                            style={{
                                                                width: 490, marginLeft: '5.3em'
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
                                                        {...formItemLayout1}
                                                        name={[name, 'goal_name']}
                                                        label="เป้าประสงต์"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'กรุณาเลือกเป้าประสงค์',
                                                            },
                                                        ]}
                                                        style={{ marginLeft: '2.5em' }}
                                                    >
                                                        <Select
                                                            size="large"
                                                            style={{
                                                                width: 490, marginLeft: '8em'
                                                            }}
                                                            defaultValue={null}
                                                            placeholder="---- กรุณาเลือกเป้าประสงค์ ----"
                                                            onChange={onChangeTactic}
                                                            // options={goalName}
                                                            disabled={disGoalName}
                                                        >
                                                            {' '}
                                                            <Option value={null}>---- กรุณาเลือกเป้าประสงค์ ----</Option>
                                                            {goalName?.map((value) => (
                                                                <Option key={value.goal_id} value={value.goal_id}>
                                                                    {value.goal_name}
                                                                </Option>
                                                            ))}
                                                        </Select>
                                                    </Form.Item>

                                                    <Form.Item
                                                        {...formItemLayout1}
                                                        name={[name, 'tactic_name']}
                                                        label="กลยุทธ์"
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message: 'กรุณาเลือกกลยุทธ์',
                                                            },
                                                        ]}
                                                        style={{ marginLeft: '2.5em' }}
                                                    >
                                                        <Select
                                                            mode="multiple"
                                                            allowClear
                                                            size="large"
                                                            placeholder="---- กรุณาเลือกกลยุทธ์ ----"
                                                            disabled={disTacticName}
                                                            style={{
                                                                width: 490, marginLeft: '9.4em'
                                                            }}
                                                        // optionLabelProp="label"
                                                        >
                                                            {newtactic?.map((item) =>
                                                                <Option value={item.tactic_id} label={item.tactic_id}>
                                                                    {item.tactic_name}
                                                                </Option>
                                                            )}
                                                        </Select>
                                                    </Form.Item>
                                                    <Form.Item {...formItemLayoutWithOutLabel2}>
                                                        <MinusCircleOutlined onClick={() => remove(name)} style={{ marginLeft: '.5em' }} />
                                                    </Form.Item>
                                                </Form.Item>
                                            ))}
                                            <Form.Item {...formItemLayoutWithOutLabel2}>
                                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined style={{ verticalAlign: 'middle' }} />} style={{ width: '35em' }}>
                                                    เพิ่มแผนยุทธศาสตร์
                                                </Button>
                                            </Form.Item>
                                        </>
                                    )}
                                </Form.List>

                                <Form.Item
                                    {...formItemLayout1}
                                    name="radiogroup"
                                    label="ประเภทโครงการ"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'กรุณาเลือกประเภทโครงการ',
                                        },
                                    ]}
                                    style={{ marginLeft: '2.5em' }}
                                >
                                    <Radio.Group>
                                        <Radio value="1" style={{ marginLeft: '7em' }}>โครงการในแผน</Radio>
                                        <Radio value="0">โครงการนอกแผน</Radio>
                                    </Radio.Group>
                                </Form.Item>
                                <Form.Item
                                    {...formItemLayout1}
                                    name="radio"
                                    label="ลักษณะโครงการ"
                                    rules={[{ required: true, message: 'กรุณาเลือกลักษณะโครงการ' }]}
                                    style={{ marginLeft: '2.5em' }}
                                >
                                    <Radio.Group>
                                        <Radio value="0" style={{ marginLeft: '7em' }}>โครงการใหม่</Radio>
                                        <br />
                                        <Radio value="1" style={{ marginLeft: '7em', marginTop: '.5em' }}>โครงการต่อเนื่อง</Radio>
                                        <br />
                                        <Radio value="2" style={{ marginLeft: '7em', marginTop: '.5em' }}>งานประจำ</Radio>
                                        <br />
                                        <Radio value="3" style={{ marginLeft: '7em', marginTop: '.5em' }} >งานพัฒนา</Radio>
                                    </Radio.Group>
                                </Form.Item>
                                <Form.Item
                                    {...formItemLayout1}
                                    name="selectintegration"
                                    label="การบูรณาการโครงการ"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'กรุณาเลือกการบูรณาการโครงการ',
                                        },
                                    ]}
                                    style={{ marginLeft: '2.5em' }}
                                >
                                    <Select
                                        size="large"
                                        style={{ width: 490, marginLeft: '4.2em' }}
                                        placeholder="---- กรุณาเลือกการบูรณาการโครงการ ----"
                                        options={integration?.map((item) => ({
                                            value: item.integration_name,
                                            label: item.integration_name,
                                        }))}

                                        onChange={integrationfill}
                                    >

                                    </Select>
                                </Form.Item>
                                {selectintegration === 'อื่นๆ' && (
                                    <Form.Item
                                        {...formItemLayout1}
                                        name="newintegration"
                                        label="ชื่อบูรณาการ"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'กรุณาเพิ่มชื่อบูรณาการ',
                                            },
                                        ]}
                                        style={{ marginLeft: '2.5em' }}
                                    >
                                        <Input placeholder="กรุณาเพิ่มชื่อบูรณาการ" style={{ width: '35em', marginLeft: '8.6em' }} />
                                    </Form.Item>
                                )}
                                {selectintegration !== 'ไม่มี' && (
                                    <Form.Item
                                        {...formItemLayout1}
                                        name="integrationdetail"
                                        label="เรื่อง/วิชา/คณะ"
                                        style={{ marginLeft: '3.3em' }}
                                    >
                                        <Input.TextArea style={{ width: '35em', height: '6em', marginLeft: '7.6em' }} showCount />
                                    </Form.Item>
                                )}
                                <Form.Item
                                    {...formItemLayout1}
                                    name="reason"
                                    label="หลักการและเหตุผล"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'กรุณาเพิ่มหลักการและเหตุผล',
                                        },
                                    ]}
                                    style={{ marginLeft: '2.5em' }}
                                >
                                    <Input.TextArea style={{ width: '35em', height: '10em', marginLeft: '5.8em' }} showCount />
                                </Form.Item>
                                <Form.Item
                                    {...formItemLayout1}
                                    name="object1"
                                    label="วัตถุประสงค์"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'กรุณาเพิ่มวัตถุประสงค์',
                                        },
                                    ]}
                                    style={{ marginLeft: '2.5em' }}
                                >
                                    <Input style={{ width: '35em', marginLeft: '8.8em' }} placeholder="วัตถุประสงค์" />
                                </Form.Item>
                                <Form.List
                                    name="object"
                                    {...formItemLayout}
                                    label="วัตถุประสงค์"
                                >
                                    {(fields, { add, remove }, { errors }) => (
                                        <>
                                            {fields.map((field, index) => (
                                                <Form.Item
                                                    {...(index === 0
                                                        ? formItemLayout
                                                        : formItemLayoutWithOutLabel)}
                                                    label={index === 0 ? 'วัตถุประสงค์ ' : ''}
                                                    required={false}
                                                    key={field.key}
                                                >
                                                    <Form.Item
                                                        {...field}
                                                        validateTrigger={['onChange', 'onBlur']}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                whitespace: true,
                                                                message:
                                                                    'กรุณาเพิ่มวัตถุประสงค์',
                                                            },
                                                        ]}
                                                    >
                                                        <Input
                                                            placeholder="วัตถุประสงค์ "
                                                            style={{
                                                                width: '35em'
                                                            }}
                                                        />
                                                    </Form.Item>
                                                    <Form.Item>
                                                        <MinusCircleOutlined
                                                            className="dynamic-delete-button"
                                                            onClick={() => remove(field.name)}
                                                            style={{ marginLeft: '.5em' }}
                                                        />
                                                    </Form.Item>
                                                </Form.Item>
                                            ))}
                                            <Form.Item {...formItemLayoutWithOutLabel2}>
                                                <Button
                                                    type="dashed"
                                                    onClick={() => add()}
                                                    block
                                                    icon={<PlusOutlined style={{ verticalAlign: 'middle' }} />}
                                                    style={{ width: '35em' }}
                                                >
                                                    เพิ่มวัตถุประสงค์
                                                </Button>
                                                <Form.ErrorList errors={errors} />
                                            </Form.Item>
                                        </>
                                    )}
                                </Form.List>
                                <Form.Item
                                    {...formItemLayout1}
                                    name="indicas1"
                                    label="ตัวชี้วัดความสำเร็จ"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'กรุณาเพิ่มตัวชี้วัดความสำเร็จ',
                                        },
                                    ]}
                                    style={{ marginLeft: '2.5em' }}
                                >
                                    <Input style={{ width: '35em', marginLeft: '6.25em' }} placeholder="ตัวชี้วัดความสำเร็จ" />
                                </Form.Item>
                                <Form.Item
                                    {...formItemLayout1}
                                    name="countunit1"
                                    label="หน่วยนับ"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'กรุณาเพิ่มหน่วยนับ',
                                        },
                                    ]}
                                    style={{ marginLeft: '2.5em' }}
                                >
                                    <Input style={{ width: '35em', marginLeft: '10.1em' }} placeholder="หน่วยนับ" />
                                </Form.Item>
                                <Form.Item
                                    {...formItemLayout1}
                                    name="tagetvalue1"
                                    label="ค่าเป้าหมาย"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'กรุณาเพิ่มค่าเป้าหมาย',
                                        },
                                    ]}
                                    style={{ marginLeft: '2.5em' }}
                                >
                                    <Input style={{ width: '35em', marginLeft: '8.8em' }} placeholder="ค่าเป้าหมาย" />
                                </Form.Item>
                                <Form.List
                                    name="indica"

                                    {...formItemLayout}
                                >
                                    {(fields, { add, remove }, { errors }) => (
                                        <>
                                            {fields.map((field, index) => (

                                                <Form.Item
                                                    {...(index === 0
                                                        ? formItemLayout
                                                        : formItemLayoutWithOutLabel)}
                                                    label={index === 0 ? 'ตัวชี้วัดความสำเร็จ ' : ''}
                                                    required={false}
                                                    key={field.key}
                                                >
                                                    <Form.Item
                                                        {...field}
                                                        Label="indicas"
                                                        name={[field.name, 'indicas']}
                                                        validateTrigger={['onChange', 'onBlur']}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                whitespace: true,
                                                                message:
                                                                    'กรุณาเพิ่มตัวชี้วัดความสำเร็จ',
                                                            },
                                                        ]}
                                                        noStyle
                                                    >
                                                        <Input
                                                            placeholder="ตัวชี้วัดความสำเร็จ "
                                                            style={{
                                                                width: '35em', marginBottom: '1em'
                                                            }}
                                                        />
                                                    </Form.Item>
                                                    <Form.Item
                                                        {...field}
                                                        Label="countunit"
                                                        name={[field.name, 'countunit']}
                                                        validateTrigger={['onChange', 'onBlur']}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                whitespace: true,
                                                                message:
                                                                    'กรุณาเพิ่มหน่วยนับ',
                                                            },
                                                        ]}
                                                        noStyle
                                                    >
                                                        <Input
                                                            placeholder="หน่วยนับ "
                                                            style={{
                                                                width: '35em', marginBottom: '1em'
                                                            }}
                                                        />
                                                    </Form.Item>
                                                    <Form.Item
                                                        {...field}
                                                        Label="tagetvalue"
                                                        name={[field.name, 'tagetvalue']}
                                                        validateTrigger={['onChange', 'onBlur']}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                whitespace: true,
                                                                message:
                                                                    'กรุณาเพิ่มค่าเป้าหมาย',
                                                            },
                                                        ]}
                                                        noStyle
                                                    >
                                                        <Input
                                                            placeholder="ค่าเป้าหมาย "
                                                            style={{
                                                                width: '35em',
                                                            }}
                                                        />
                                                    </Form.Item>


                                                    <MinusCircleOutlined
                                                        className="dynamic-delete-button"
                                                        onClick={() => remove(field.name)}
                                                        style={{ marginLeft: '.5em' }}
                                                    />

                                                </Form.Item>


                                            ))}
                                            <Form.Item {...formItemLayoutWithOutLabel2}>
                                                <Button
                                                    type="dashed"
                                                    onClick={() => add()}
                                                    block
                                                    icon={<PlusOutlined style={{ verticalAlign: 'middle' }} />}
                                                    style={{ width: '35em' }}
                                                >
                                                    เพิ่มตัวชี้วัดความสำเร็จ
                                                </Button>
                                                <Form.ErrorList errors={errors} />
                                            </Form.Item>
                                        </>
                                    )}
                                </Form.List>
                                <Form.Item
                                    {...formItemLayout1}
                                    name="targetgroup"
                                    label="กลุ่มเป้าหมาย"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'กรุณาเพิ่มกลุ่มเป้าหมาย',
                                        },
                                    ]}
                                    style={{ marginLeft: '2.5em' }}
                                >
                                    <Input placeholder="กลุ่มเป้าหมาย" style={{ width: '35em', marginLeft: '8.1em' }} />
                                </Form.Item>
                                <Form.Item
                                    {...formItemLayout1}
                                    name="steps1"
                                    label="ขั้นตอนการดำเนินการ"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'กรุณาเพิ่มขั้นตอนการดำเนินการ',
                                        },
                                    ]}
                                    style={{ marginLeft: '2.5em' }}
                                >
                                    <Input style={{ width: '35em', marginLeft: '4.95em' }} placeholder="ขั้นตอนการดำเนินการ" />
                                </Form.Item>

                                <Form.Item
                                    {...formItemLayout1}
                                    name="start1"
                                    label="วันที่เริ่มต้น"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'กรุณาเลือกวันที่เริ่มต้น',
                                        },
                                    ]}
                                    style={{ marginLeft: '2.5em' }}
                                >
                                    <Calendar
                                        id="basic"
                                        placeholder="เลือกวันที่เริ่มต้น"
                                        dateFormat="dd/mm/yy"
                                        name="dateend"
                                        style={{ width: '35em', marginLeft: '8.1em' }}
                                        className="form-control"
                                    />
                                </Form.Item>
                                <Form.Item
                                    {...formItemLayout1}
                                    name="end1"
                                    label="วันที่สิ้นสุด"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'กรุณาเลือกวันที่สิ้นสุด',
                                        },
                                    ]}
                                    style={{ marginLeft: '2.5em' }}
                                >
                                    <Calendar
                                        id="basic"
                                        placeholder="เลือกวันที่สิ้นสุด"
                                        dateFormat="dd/mm/yy"
                                        name="dateend"
                                        style={{ width: '35em', marginLeft: '8.25em' }}
                                        className="form-control"
                                    />
                                </Form.Item>
                                <Form.List
                                    name="rowsData"

                                    {...formItemLayout}
                                >
                                    {(fields, { add, remove }, { errors }) => (
                                        <>
                                            {fields.map((field, index) => (
                                                <Form.Item
                                                    {...(index === 0
                                                        ? formItemLayout
                                                        : formItemLayoutWithOutLabel)}
                                                    label={index === 0 ? 'ขั้นตอนการดำเนินการ ' : ''}
                                                    required={false}
                                                    key={field.key}
                                                >
                                                    <Form.Item
                                                        {...field}
                                                        Label="steps"
                                                        name={[field.name, 'steps']}
                                                        validateTrigger={['onChange', 'onBlur']}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'กรุณาเพิ่มขั้นตอนการดำเนินการ',
                                                            },
                                                        ]}
                                                        noStyle
                                                    >
                                                        <Input
                                                            placeholder="ขั้นตอนการดำเนินการ"
                                                            style={{
                                                                width: '35em', marginBottom: '1em'
                                                            }}
                                                        />
                                                    </Form.Item>
                                                    <Form.Item
                                                        {...field}
                                                        Label="start"
                                                        name={[field.name, 'start']}
                                                        validateTrigger={['onChange', 'onBlur']}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'กรุณาเลือกวันที่เริ่มต้น',
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
                                                            style={{ width: '30.5em', marginBottom: '1em' }}
                                                        />
                                                    </Form.Item>
                                                    <Form.Item
                                                        {...field}
                                                        Label="end"
                                                        name={[field.name, 'end']}
                                                        validateTrigger={['onChange', 'onBlur']}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message:
                                                                    'กรุณาเลือกวันที่สิ้นสุด',
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
                                                            style={{ width: '30.5em' }}
                                                        />
                                                    </Form.Item>


                                                    <MinusCircleOutlined
                                                        className="dynamic-delete-button"
                                                        onClick={() => remove(field.name)}
                                                        style={{ marginLeft: '.5em' }}
                                                    />

                                                </Form.Item>
                                            ))}
                                            <Form.Item {...formItemLayoutWithOutLabel2}>
                                                <Button
                                                    type="dashed"
                                                    onClick={() => add()}
                                                    block
                                                    icon={<PlusOutlined style={{ verticalAlign: 'middle' }} />}
                                                    style={{ width: '35em' }}
                                                >
                                                    เพิ่มขั้นตอนการดำเนินการ
                                                </Button>
                                                <Form.ErrorList errors={errors} />
                                            </Form.Item>
                                        </>
                                    )}
                                </Form.List>

                                <Form.Item
                                    {...formItemLayout}
                                    name="selectedbudget"
                                    label="แหล่งเงิน/ประเภทงบประมาณที่ใช้"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'กรุณาเลือกแหล่งเงิน/ประเภทงบประมาณที่ใช้',
                                        },
                                    ]}
                                >
                                    <Select
                                        size="large"
                                        style={{
                                            width: 490,
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
                                {selectedbudget === 'งบอื่นๆ' && (
                                    <Form.Item
                                        {...formItemLayout}
                                        name="budgets"
                                        label="ระบุแหล่งเงิน/ประเภทงบประมาณ"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'กรุณาระบุแหล่งเงิน/ประเภทงบประมาณที่ใช้',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="กรุณาระบุแหล่งเงิน/ประเภทงบประมาณที่ใช้" style={{ width: '35em' }} />
                                    </Form.Item>
                                )}
                                {selectedbudget !== 'ไม่ได้ใช้งบประมาณ' && (
                                    <>
                                        <Form.Item label="ปริมาณการงบประมาณที่ใช้" {...formItemLayout1} style={{ marginLeft: '3.3em' }}>
                                            <Form.Item
                                                noStyle
                                                name="amount"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'กรุณากรอกปริมาณการงบประมาณ',
                                                    },
                                                ]}
                                               
                                            >
                                                <Input
                                                    style={{ width: 490, marginLeft: '2.9em' }}
                                                    onChange={handleMoney}
                                                    placeholder="งบประมาณที่ใช้"
                                                />
                                            </Form.Item>
                                            {money && <h4>{moneyText}</h4>}
                                        </Form.Item>
                                        <Form.Item
                                            {...formItemLayout1}
                                            name="workplan2"
                                            label="แผนงาน"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'กรุณาเลือกแผนงาน',
                                                },
                                            ]}
                                            style={{ marginLeft: '2.5em' }}
                                        >
                                            <Select
                                                size="large"
                                                style={{
                                                    width: 490, marginLeft: '9.1em'
                                                }}
                                                defaultValue={null}
                                                placeholder="---- กรุณาเลือกแผนงาน ----"
                                                options={workplan.map((item) => ({
                                                    value: item.workplan_id,
                                                    label: item.workplan_name,
                                                }))}
                                            />
                                        </Form.Item>

                                        <Form.List
                                            name="budget"
                                            rules={[
                                                ({ getFieldValue }) => ({
                                                    validator(rule, value) {
                                                        if (getFieldValue('budget').length) {
                                                            return Promise.resolve()
                                                        }
                                                        return Promise.reject('กรุณาเพิ่มงบประมาณที่ใช้')
                                                    },
                                                }),
                                            ]}
                                            {...formItemLayout1}
                                        >
                                            {(fields, { add, remove }, { errors }) => (
                                                <>
                                                    <Row>
                                                        <Col span={24} offset={3}>
                                                            {fields.map(({ key, name, index, ...restField }) => (
                                                                <Form.Item required={false} key={key}
                                                                >
                                                                    <Row>
                                                                        <Col span={24}>
                                                                            <Form.Item
                                                                                {...restField}
                                                                                label="งบรายจ่าย"
                                                                                name={[name, 'exbudget']}
                                                                            >
                                                                                <Input
                                                                                    style={{ width: 170, height: '3.4em', marginLeft: '1em' }}
                                                                                    placeholder="งบรายจ่าย"
                                                                                />
                                                                            </Form.Item>
                                                                        </Col>
                                                                        <Form.Item
                                                                            {...restField}
                                                                            label="หมวดรายจ่าย"
                                                                            name={[name, 'category']}
                                                                        >
                                                                            <Input
                                                                                style={{ width: 170, marginRight: '.5em', height: '3.4em' }}
                                                                                placeholder="หมวดรายจ่าย"
                                                                            />
                                                                        </Form.Item>
                                                                        <Form.Item
                                                                            {...restField}
                                                                            name={[name, 'แผนการใช้จ่ายไตรมาส 1']}
                                                                        >
                                                                            <InputNumber
                                                                                min={0}
                                                                                controls={false}
                                                                                style={{ width: 170, marginRight: '.5em' }}
                                                                                placeholder="แผนการใช้จ่ายไตรมาส 1"
                                                                            />
                                                                        </Form.Item>
                                                                        <Form.Item
                                                                            {...restField}
                                                                            // label="Quarter2"
                                                                            name={[name, 'แผนการใช้จ่ายไตรมาส 2']}
                                                                        >
                                                                            <InputNumber
                                                                                min={0}
                                                                                controls={false}
                                                                                style={{ width: 170, marginRight: '.5em' }}
                                                                                placeholder="แผนการใช้จ่ายไตรมาส 2"
                                                                            />
                                                                        </Form.Item>
                                                                        <Form.Item
                                                                            {...restField}
                                                                            // label="Quarter3"
                                                                            name={[name, 'แผนการใช้จ่ายไตรมาส 3']}
                                                                        >
                                                                            <InputNumber
                                                                                min={0}
                                                                                controls={false}
                                                                                style={{ width: 170, marginRight: '.5em' }}
                                                                                placeholder="แผนการใช้จ่ายไตรมาส 3"
                                                                            />
                                                                        </Form.Item>
                                                                        <Form.Item
                                                                            {...restField}
                                                                            name={[name, 'แผนการใช้จ่ายไตรมาส 4']}
                                                                        >
                                                                            <InputNumber
                                                                                min={0}
                                                                                controls={false}
                                                                                style={{ width: 170 }}
                                                                                placeholder="แผนการใช้จ่ายไตรมาส 4"
                                                                            />
                                                                        </Form.Item>

                                                                        {fields.length > 1 ? (
                                                                            <MinusCircleOutlined
                                                                                className="dynamic-delete-button"
                                                                                onClick={() => remove(name)}
                                                                                style={{ marginLeft: '.5em' }}
                                                                            />
                                                                        ) : null}

                                                                    </Row>
                                                                </Form.Item>
                                                            ))}
                                                        </Col>
                                                    </Row>
                                                    <Form.Item {...formItemLayout1} label="ประเภทการใช้จ่าย" style={{ marginLeft: '3.3em' }}>
                                                        <Button
                                                            type="dashed"
                                                            onClick={() => add()}
                                                            block
                                                            icon={<PlusOutlined style={{ verticalAlign: 'middle' }} />}
                                                            style={{ width: '35em', marginLeft: '6.4em' }}
                                                        >
                                                            เพิ่มประเภทการใช้จ่าย
                                                        </Button>
                                                        <Form.ErrorList errors={errors} />
                                                    </Form.Item>
                                                </>
                                            )}
                                        </Form.List>
                                    </>
                                )}
                                <Form.Item
                                    {...formItemLayout1}
                                    name="sakes1"
                                    label="ประโยชน์ที่คาดว่าจะได้รับ"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'ประโยชน์ที่คาดว่าจะได้รับ',
                                        },
                                    ]}
                                    style={{ marginLeft: '2.5em' }}
                                >
                                    <Input style={{ width: '35em', marginLeft: '3.3em' }} placeholder="ประโยชน์ที่คาดว่าจะได้รับ" />
                                </Form.Item>
                                <Form.List name="sakes" {...formItemLayout} label="ประโยชน์">
                                    {(fields, { add, remove }, { errors }) => (
                                        <>
                                            {fields.map((field, index) => (
                                                <Form.Item
                                                    {...(index === 0
                                                        ? formItemLayout
                                                        : formItemLayoutWithOutLabel)}
                                                    label={index === 0 ? 'ประโยชน์ที่คาดว่าจะได้รับ ' : ''}
                                                    required={false}
                                                    key={field.key}
                                                >
                                                    <Form.Item
                                                        {...field}
                                                        validateTrigger={['onChange', 'onBlur']}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                whitespace: true, //
                                                                message:
                                                                    'กรุณาเพิ่มประโยชน์ที่คาดว่าจะได้รับ',
                                                            },
                                                        ]}
                                                        noStyle
                                                    >
                                                        <Input
                                                            placeholder="ประโยชน์ที่คาดว่าจะได้รับ "
                                                            style={{
                                                                width: '35em',
                                                            }}
                                                        />
                                                    </Form.Item>
                                                    <MinusCircleOutlined
                                                        className="dynamic-delete-button"
                                                        onClick={() => remove(field.name)}
                                                        style={{ marginLeft: '.5em' }}
                                                    />

                                                </Form.Item>
                                            ))}
                                            <Form.Item {...formItemLayoutWithOutLabel2}>
                                                <Button
                                                    type="dashed"
                                                    onClick={() => add()}
                                                    block
                                                    icon={<PlusOutlined style={{ verticalAlign: 'middle' }} />}
                                                    style={{ width: '35em' }}
                                                >
                                                    เพิ่มประโยชน์ที่คาดว่าจะได้รับ
                                                </Button>
                                                <Form.ErrorList errors={errors} />
                                            </Form.Item>
                                        </>
                                    )}
                                </Form.List>
                                <Form.Item
                                    {...formItemLayout1}
                                    name="radioTor"
                                    label="เอกสาร TOR"
                                    rules={[{ required: true, message: 'กรุณาเลือกเอกสาร TOR' }]}
                                    style={{ marginLeft: '2.5em' }}
                                >
                                    <Radio.Group>
                                        <Radio value="0" style={{ marginLeft: '8.6em' }}>ไม่มี</Radio>
                                        <Radio value="1">มี</Radio>
                                    </Radio.Group>
                                </Form.Item>

                                <div className="text-right mt-1">
                                    <Button
                                        size="large"
                                        type="primary"
                                        htmlType="submit"
                                        className="login-form-button mr-1"
                                        onClick={(value) => setStatus(100)}
                                        style={{ marginBottom: '2em' }}
                                    >
                                        บันทึก
                                    </Button>
                                    <Button
                                        size="large"
                                        type="primary"
                                        htmlType="submit"
                                        className="login-form-button mr-5"
                                        style={{ width: '4.5em' }}
                                        onClick={(value) => setStatus(0)}
                                    >
                                        ส่ง
                                    </Button>
                                </div>
                            </Form>
                        </Panel>
                    </Card>
                </div>
            </div>
        </>
    )
}
export default Newproject
