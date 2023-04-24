import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import { InputText } from 'primereact/inputtext'
import Tablegoal from "../Page/Tab/goal"
import axios from 'axios'
import { Button, Card, Col, Divider, Form, Input, notification, Typography, Modal } from 'antd'
import { MinusCircleOutlined, PlusOutlined, ExclamationCircleFilled } from '@ant-design/icons'
import Header from '../initialpage/Sidebar/header'
import Sidebar from '../initialpage/Sidebar/sidebar'
import { Panel } from 'primereact/panel'

const { confirm } = Modal
const { Title } = Typography


const formItemLayout = {
    labelAlign: 'left',
    labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },

}

const formItemLayout2 = {
    labelAlign: 'right',
    labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
    },

}

const formItemLayoutWithOutLabel2 = {
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
        offset: 5,
    },
}

const Editdatastg = () => {
    const theme = useTheme()
    const [form] = Form.useForm()
    let history = useHistory()
    const location = useLocation()
    const [open, setOpen] = React.useState(true)
    const [goaldata, setGoaldata] = React.useState(null)
    const [goaldatadb, setGoaldatadb] = React.useState([])
    const [countdata, setCountdata] = React.useState(null)
    const [tactic, setTactic] = React.useState('')
    const [choice, setChoice] = React.useState()
    const [goaldetail, setGoaldetail] = React.useState(null)
    const [starg, setStarg] = React.useState(null)
    const [indicator, setIndicator] = React.useState(null)
    const [rowsData, setRowsData] = React.useState([])
    const [inputValues1, setInputValues1] = React.useState([])
    const [inputValuesb, setInputValuesb] = React.useState([])
    const [oderid, setOderid] = React.useState([])
    const [planname, setPlanname] = React.useState()
    const [gdata, setGdata] = React.useState(null)
    const [newdatagoal, setNewdatagoal] = React.useState([])
    const [fetch, setFetch] = React.useState(false)
    const [text, setText] = useState('')

    const rowsInput = {
        fullName: null
    }
    const [menu, setMenu] = React.useState(false)
    const toggleMobileMenu = () => {
        setMenu(!menu)
    }
    const rowsInput2 = {
        indicatorname: null,
        count: null,
        goal: null
    }



    useEffect(() => {
        getgoal()
        setText(location.state.plan_name)
    }, [])
    const getgoal = () => {
        axios
            .get('http://localhost:3001/stg/goal', {})
            .then((res) => {
                Oder(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const gettactic = (id) => {
        axios
            .get(`http://localhost:3001/stg/tactic/${id}`, {})
            .then((res) => {
                setTactic(res.data)
                console.log('res.data', res.data)

            })
            .catch((error) => {
                console.log(error)
            })
    }


    const Oder = (data) => {
        const setoder = data.filter((data) => data.strategic_id === location.state.strategic_id)
        setOderid(setoder)

    }


    const addgoal = (value) => {
        try {
            axios.post('http://localhost:3001/stg/creategoal', {
                strategic_id: location.state.strategic_id,
                order_goal: oderid.length + 1,
                goal_name: value.goal
            }).then((res) => {
                addindicgoal(res.data.insertId, value)
                addindicgoal2(res.data.insertId, value.indicList)
            })


        } catch (e) {
        }
    }


    const addindicgoal = (id, value) => {
        try {
            axios.post('http://localhost:3001/stg/createindicgoal', {
                goal_id: id,
                order_indic_goal: 1,
                indic_goal: value.indic,
                unit: value.unit,
                cost: value.cost
            }).then((res) => {
                addtactic(id, value)

            })

            // setValue1('')
        } catch (e) {
            //handleError
        }
    }


    const addindicgoal2 = (id, data) => {

        if (data.length !== 0 && data.indicatornames !== null) {
            for (const value of data) {
                try {
                    axios.post('http://localhost:3001/stg/createindicgoal', {
                        goal_id: id,
                        order_indic_goal: 1,
                        indic_goal: value.indic,
                        unit: value.unit,
                        cost: value.cost
                    })
                    //console.log('eeee',indicdata)
                } catch (e) {
                    //handle error
                }
            }
        }
    }
    const addtactic = (id, value) => {
        const valuelist = value.tacticList
        try {
            axios.post('http://localhost:3001/stg/createtactic', {
                goal_id: id,
                order_tactic: 1,
                tactic_name: value.tactic
            })
            if (valuelist.length !== 0 && valuelist !== null) {
                for (const value of valuelist) {
                    try {
                        axios.post('http://localhost:3001/stg/createtactic', {
                            goal_id: id,
                            order_tactic: 1,
                            tactic_name: value.tactic
                        })

                    } catch (e) {
                        //handle error
                    }
                }

            }


        } catch (e) {
            //handleError
        }
        //gettactic(id)
    }

    const addAalldata = async (value) => {
        form.resetFields()
        await addgoal(value)
        setGoaldata('')
        setIndicator('')
        setCountdata('')
        setGoaldetail('')
        setStarg('')

        for (const index of rowsData) {
            deleteTableRows(index)
        }
        for (const index of inputValues1) {
            handleRemove(index)
        }
        //
    }

    const showConfirm = (value) => {
        confirm({
            title: 'ยืนยันการเพิ่มข้อมูลเพิ่มข้อมูล',
            icon: <ExclamationCircleFilled />,
            content: 'สร้างเป้าประสงค์ ตัวชี้วัด หน่วยนับ ค่าเป้าหมาย กลยุทธ์',
            onOk() {
                console.log('OK')
                addAalldata(value)

            },
            onCancel() {
                console.log('Cancel')
                form.resetFields()
            },
        })
    }

    const handleDrawerOpen = () => {
        setOpen(true)
    }

    const handleDrawerClose = () => {
        setOpen(false)
    }
    const Test = (label) => {
        setChoice(label)

    }

    ///stra-------

    const addTableRows = () => {


        setRowsData([...rowsData, rowsInput])

    }
    const deleteTableRows = (index) => {
        const rows = [...rowsData]
        rows.splice(index, 1)
        setRowsData(rows)
    }

    const handleChange = (index, evnt) => {

        const { name, value } = evnt.target
        const rowsInput = [...rowsData]
        rowsInput[index][name] = value
        setRowsData(rowsInput)
    }


    const handleChange2 = (index, evnt) => {

        const { name, value } = evnt.target
        const rowsInput = [...inputValues1]
        rowsInput[index][name] = value
        setInputValues1(rowsInput)

    }
    const handleAdd = () => {
        setInputValues1([...inputValues1, rowsInput2])

    }

    const handleRemove = (index) => {
        const newInputValues = [...inputValues1]
        newInputValues.splice(index, 1)
        setInputValues1(newInputValues)
    }
    ////
    const handleChange3 = (index, event) => {
        const newInputValues2 = [...inputValuesb]
        newInputValues2[index] = event.target.value
        setInputValuesb(newInputValues2)
    }

    const handleAdd1 = () => {
        setInputValuesb([...inputValuesb, ''])
    }

    const handleRemove3 = (index) => {
        const newInputValues2 = [...inputValuesb]
        newInputValues2.splice(index, 1)
        setInputValuesb(newInputValues2)
    }

    const onFinishFailed = (value) => {
        notification.warning({
            message: `ข้อมูลของฟอร์มไม่ถูกต้อง !`,
            description: `กรุณากรอกฟอร์มให้ครบถ้วน`
        })
    }

    return (
        <>
            <Header onMenuClick={(value) => toggleMobileMenu()} />
            <Sidebar />
            <Title level={3}>การสร้างเป้าประสงค์ ตัวชี้วัด ค่าเป้าหมาย กลยุทธ์</Title>
            {/*<div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>*/}
            <div className="page-wrapper">
                <Card
                >
                    <Panel header="สร้างเป้าประสงค์ ตัวชี้วัด หน่วยนับ ค่าเป้าหมาย กลยุทธ์ ">
                        <Form
                            {...formItemLayout}
                            form={form}
                            onFinish={showConfirm}
                            onFinishFailed={onFinishFailed}
                            name="dynamic_rule"
                            style={{
                                maxWidth: '100%',
                                border: 'none',
                                boxShadow: 'none'
                            }}
                            layout="horizontal"
                        >
                            <Title className='mb-3' level={5}>{text}</Title>
                            <Form.Item
                                label="เป้าประสงค์"
                                name="goal"
                                rules={[
                                    {
                                        required: true,
                                        message: 'กรุณากรอกเป้าประสงค์',
                                    },
                                ]}
                            >
                                <Input placeholder="เป้าประสงค์" size={'large'} style={{ width: 520 }} />
                            </Form.Item>
                            <Form.Item
                                label="ตัวชี้วัด"
                                name="indic"
                                rules={[
                                    {
                                        required: true,
                                        message: 'กรุณากรอกตัวชี้วัด',
                                    },
                                ]}
                            >
                                <Input placeholder="ตัวชี้วัด" size={'large'} style={{ width: 520 }} />
                            </Form.Item>
                            <Form.Item
                                label="หน่วยนับ"
                                name="unit"
                                rules={[
                                    {
                                        required: true,
                                        message: 'กรุณากรอกหน่วยนับ',
                                    },
                                ]}
                            >
                                <Input placeholder="หน่วยนับ " size={'large'} style={{ width: 520 }} />
                            </Form.Item>
                            <Form.Item
                                label="ค่าเป้าหมาย"
                                name="cost"
                                rules={[
                                    {
                                        required: true,
                                        message: 'กรุณารอกค่าเป้าหมาย',
                                    },
                                ]}
                            >
                                <Input placeholder="ค่าเป้าหมาย" size={'large'} style={{ width: 520 }} />
                            </Form.Item>
                            <Form.List
                                name="indicList"
                            >

                                {(fields, { add, remove }, { errors }) => (
                                    <>

                                        {fields.map((field, index) => (
                                            <Form.Item
                                                // label={index === 0 ? 'วัตถุประสงค์ ' : ''}
                                                key={field.key}
                                            >
                                                <Col offset={3}>
                                                    <Divider orientation="left">
                                                        <h4> ตัวชี้วัดที่ {index + 2}</h4>
                                                    </Divider>

                                                    <Form.Item
                                                        {...field}
                                                        label="ตัวชี้วัด"
                                                        name={[field.name, 'indic']}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                whitespace: true,
                                                                message:
                                                                    'กรุณากรอกตัวชี้วัด',
                                                            },
                                                        ]}
                                                        {...formItemLayout2}
                                                    >
                                                        <Input
                                                            size="large"
                                                            placeholder="ตัวชี้วัด"
                                                            style={{
                                                                width: 525,
                                                            }}
                                                        />
                                                    </Form.Item>
                                                    <Form.Item
                                                        {...field}
                                                        label="หน่วยนับ"
                                                        name={[field.name, 'unit']}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                whitespace: true,
                                                                message:
                                                                    'กรุณากรอกหน่วยนับ',
                                                            },
                                                        ]}
                                                        {...formItemLayout2}
                                                    >
                                                        <Input
                                                            size="large"
                                                            placeholder="หน่วยนับ "
                                                            style={{
                                                                width: 525,
                                                            }}
                                                        />
                                                    </Form.Item>
                                                    <Form.Item
                                                        {...field}
                                                        label="ค่าเป้าหมาย"
                                                        name={[field.name, 'cost']}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                whitespace: true,
                                                                message:
                                                                    'กรุณากรอกค่าเป้าหมาย',
                                                            },
                                                        ]}
                                                        {...formItemLayout2}
                                                    >
                                                        <Input
                                                            size="large"
                                                            placeholder="ค่าเป้าหมาย "
                                                            style={{
                                                                width: 525,
                                                            }}
                                                        />
                                                    </Form.Item>
                                                    {/*<Col offset={15}>*/}
                                                    <Form.Item {...formItemLayoutWithOutLabel2}>
                                                        <Button
                                                            type={'primary'}
                                                            ghost
                                                            onClick={() => remove(field.name)}
                                                            icon={<MinusCircleOutlined />}
                                                        >
                                                            ลบ
                                                        </Button>
                                                    </Form.Item>
                                                    {/*</Col>*/}

                                                </Col>
                                            </Form.Item>
                                        ))}

                                        <Form.Item {...formItemLayoutWithOutLabel2}>
                                            <Button
                                                type="dashed"
                                                onClick={() => add()}
                                                // block
                                                icon={<PlusOutlined />}
                                            >
                                                เพิ่มตัวชี้วัด หน่วยนับ ค่าเป้าหมาย
                                            </Button>
                                            <Form.ErrorList errors={errors} />
                                        </Form.Item>

                                    </>
                                )}

                            </Form.List>
                            <Form.Item
                                label="กลยุทธ์"
                                name="tactic"
                                rules={[
                                    {
                                        required: true,
                                        message: 'กรุณากรอกกลยุทธ์',
                                    },
                                ]}
                            >
                                <Input placeholder="กลยุทธ์" size={'large'} style={{ width: 520 }} />
                            </Form.Item>
                            <Form.List
                                name="tacticList"
                            >

                                {(fields, { add, remove }, { errors }) => (
                                    <>

                                        {fields.map((field, index) => (
                                            <Form.Item
                                                // label={index === 0 ? 'วัตถุประสงค์ ' : ''}
                                                key={field.key}
                                            >
                                                <Col offset={3}>
                                                    <Divider orientation="left">
                                                        <h4> กลยุทธ์ที่ {index + 2}</h4>
                                                    </Divider>

                                                    <Form.Item
                                                        {...field}
                                                        label="กลยุทธ์"
                                                        name={[field.name, 'tactic']}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                whitespace: true,
                                                                message:
                                                                    'กรุณากรอกกลยุทธ์',
                                                            },
                                                        ]}
                                                        {...formItemLayout2}
                                                    >
                                                        <Input
                                                            size="large"
                                                            placeholder="กลยุทธ์"
                                                            style={{
                                                                width: 525,
                                                            }}
                                                        />
                                                    </Form.Item>
                                                    {/*<Col offset={15}>*/}
                                                    <Form.Item {...formItemLayoutWithOutLabel2}>
                                                        <Button
                                                            type={'primary'}
                                                            ghost
                                                            onClick={() => remove(field.name)}
                                                            icon={<MinusCircleOutlined />}
                                                        >
                                                            ลบ
                                                        </Button>
                                                    </Form.Item>
                                                    {/*</Col>*/}

                                                </Col>
                                            </Form.Item>
                                        ))}

                                        <Form.Item {...formItemLayoutWithOutLabel2}>
                                            <Button
                                                type="dashed"
                                                onClick={() => add()}
                                                // block
                                                icon={<PlusOutlined />}
                                            >
                                                เพิ่มกลยุทธ์
                                            </Button>
                                            <Form.ErrorList errors={errors} />
                                        </Form.Item>

                                    </>
                                )}

                            </Form.List>
                            {/*<Col span={12}>*/}
                            <div className="text-left mt-2 ">
                                <Button
                                    size="large"
                                    type="primary"
                                    htmlType="submit"
                                    className="login-form-button"
                                    icon={<PlusOutlined />}
                                // onClick={(value) => setStatus(1)}

                                >
                                    เพิ่ม
                                </Button>
                            </div>
                            {/*</Col>*/}

                        </Form>
                        <div style={{ marginTop: "3px" }} >
                            < Tablegoal id={location.state.strategic_id} />
                        </div>
                    </Panel>
                </Card>
            </div>
            {/*</div>*/}
        </>
    )
}

export default Editdatastg
