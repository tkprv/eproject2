import { Button, Select, Form, Radio, Input, Col, Row, InputNumber, Modal, Space } from 'antd';
import { useEffect, useRef, useState } from 'react'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Calendar } from 'primereact/calendar'
import axios from 'axios'
import { Dropdown } from 'primereact/dropdown'
import { Toast } from 'primereact/toast'
import { fromByteArray } from 'ipaddr.js';
import { getLocalName } from '../helper/utill'
import { getLocalSection } from '../helper/utill'
import { getLocalId } from '../helper/utill';
import { MultiSelect } from 'primereact/multiselect'
import { ExclamationCircleFilled } from '@ant-design/icons'
import moment from "moment"
import Header from '../initialpage/Sidebar/header';
import Sidebar from '../initialpage/Sidebar/sidebar';

const { confirm } = Modal



const onPanelChange = (value, mode) => {
    console.log(value.format('YYYY-MM-DD'), mode)
}
const { ThaiBaht } = require('thai-baht-text-ts') // for ES5




const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
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
        xs: {
            span: 10,
            offset: 0,
        },
        sm: {
            span: 10,
            offset: 8,
        },
    },
};




const Newproject = () => {
    //const [checkNick, setCheckNick] = useState(false);
    const [stopen, setStopen] = useState();
    const [person, setPerson] = useState([])
    const [workplan, setWorkplan] = useState([])
    const [strategic, setStrategic] = useState([]);
    const [integration, setIntegration] = useState([]);
    const [year, setYear] = useState()
    const [stselectfill, setStselectfill] = useState([])
    const [selectissue, setSelectissue] = useState([])
    const [selectgoa, setSelectgoa] = useState([])
    const [newDatagoa, setNewDatagoa] = useState([])
    const [newtactic, setNewtactic] = useState([])
    const [form] = Form.useForm()
    const toast = useRef(null)
    const [money, setMoney] = useState()
    const pie = parseFloat(money, 10)
    const moneyText = ThaiBaht(pie)
    const [checkNick, setCheckNick] = useState(false)
    const [selectintegration, setSelectintegration] = useState([])
    const [alldata, setAalldata] = useState()
    const [isSend, setIsSend] = useState(false)
    const [menu, setMenu] = useState(false);
    const budget = [
        { name: 'งบประมาณรายได้มหาลัย' },
        { name: 'งบประมาณรายได้ของส่วนงาน' },
        { name: 'งบประมาณรายได้ของแผ่นดิน' },
        { name: 'งบอื่นๆ' },
        { name: 'ไม่ได้ใช้งบประมาณ' }
    ]

    const toggleMobileMenu = () => {
        setMenu(!menu)
    }
    useEffect(() => {
        getstrategicid()
        Strategicdata();
        getintegration();
        getheadprojects()
        getworkplan()
        getSectoin()
    }, []);
    useEffect(() => {
        form.setFieldsValue({ headproject: getLocalName() })
    }, [])
    // useEffect(() =>{

    //   },[])

    const getSectoin = () => {
        const id = getLocalSection()
        console.log(id);
        try {
            axios.post('http://localhost:3001/new/section', {
                section_id: id
            }).then((data) => {
                form.setFieldsValue({ Agency: data.data[0].section_name })

            })
        } catch (e) {
        }
    }
    const getheadprojects = () => {
        axios
            .get("http://localhost:3001/manageuser/person", {})
            .then((res) => {
                const newdata = res.data
                const data1 = newdata.filter((value) => value.displayname !== getLocalName())
                setPerson(data1)
                //onPersonpj(res.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const getworkplan = () => {
        axios
            .get("http://localhost:3001/new/workplan", {})
            .then((res) => {
                setWorkplan(res.data)
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
                Stopen(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
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

    const onStrategic = (e) => {
        setYear(e.value)
        const setst = strategic.filter(
            (strategic) => strategic.fiscalyear_id === e.value.fiscalyear_id
        );
        setStselectfill(setst);
    };
    const onStrategic2 = (s) => {
        //form.setFieldValue({selectissues:s.value})
        //setSelectissue(s.value);
        getdatagoa(s.value.strategic_id);
    }
    const onStrategic3 = (e) => {
        //form.setFieldValue({selectgoa:e.value})
        //setSelectgoa(e.value) tactic
        gettactic(e.value.goal_id)
    }
    const onStrategic4 = (e) => {
        //form.setFieldValue({tactic:e.value}) 
    }


    const getdatagoa = (id) => {

        axios
            .get(`http://localhost:3001/stg/goaal${id}`, {})
            .then((res) => {
                setNewDatagoa(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    const gettactic = (id) => {
        axios
            .get(`http://localhost:3001/stg/tactic2${id}`, {})
            .then((res) => {
                setNewtactic(res.data)
                console.log('res.data', res.data)

            })
            .catch((error) => {
                console.log(error)
            });
    };

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
            console.log('ty', typepj);
            console.log("alldata", alldata.selectyear.fiscalyear_id)
            await axios.post('http://localhost:3001/new/createnewproject', {
                fiscalyear_id: alldata.selectyear.fiscalyear_id,
                section_id: getLocalSection(), //ผู้ใช้
                //strategic_id : alldata.selectissue.strategic_id , 
                //goal_id : alldata.selectgoa.goal_id ,
                //tactic_id: tactic.tactic_id,//tactic_id ใส่ได้มากกว่า 1
                integration_id: alldata.selectintegration.integration_id,
                workplan_id: alldata.workplan2.workplan_id,

                project_name: alldata.projectname,
                //   //plan_name_main:  null,
                type: typepj,
                integra_name: alldata.selectintegration.integration_name === 'อื่นๆ' ? alldata.newintegration : alldata.selectintegration.integration_name,
                integra_subject: alldata.integrationdetail,
                rationale: alldata.reason,
                target_group: alldata.targetgroup,
                butget: money,
                butget_char: moneyText,
                tor: (alldata.radioTor === 'มี') ? 1 : 0,
                //  // source: ,
                source_name: alldata.selectedbudget.name === 'ไม่ได้ใช้งบประมาณ' ? null : alldata.selectedbudget.name,
                status: 0, //1
                out_plan: alldata.radiogroup //ในนอก

            }).then((res) => {
                console.log("res", res.data)
                createindic(res.data.insertId, alldata.indica)
                createStep(res.data.insertId, alldata)
                createUser(res.data.insertId, alldata.nameheadpj)
                createObject(res.data.insertId, alldata)
                // sendEmail(alldata.nameheadpj.user_id)
                //createstrategicproject(res.data.insertId)

            })
        }
        catch (e) { }
    }
    const createStep = (id, alldata) => {
        console.log('id', id)
        console.log('alldata', alldata)
        for (const value of alldata.rowsData) {

            const datess2 = moment(value.start).format('YYYY-MM-DD')
            const datess3 = moment(value.end).format('YYYY-MM-DD')

            try {
                axios.post('http://localhost:3001/new/newprojectstepe', {
                    project_id: id,
                    step_name: value.steps,
                    start: datess2,
                    stop: datess3
                }).then((res) => {
                    console.log("res", res.data)
                })

            }
            catch (e) {
            }
        }

    }
    const createObject = (id, alldata) => {
        for (const value of alldata.object) {
            console.log("value", value)
            try {
                axios.post('http://localhost:3001/new/newobjective', {
                    project_id: id,
                    objective_name: value
                }).then((res) => {
                    console.log("res", res.data)
                })

            }
            catch (e) {
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
                        axios.post('http://localhost:3001/new/userproject', {
                            project_id: id,
                            user_id: value.user_id
                        }).then((data) => {
                            console.log(data.data)
                        })
                    }
                    catch (e) {
                    }
                }
            }
        }
        catch (e) { }
    }

    //   const sendEmail =(alldata)=>{

    //     try{
    //         axios.post('http://localhost:3001/new/email',{
    //           user_id: getLocalID()

    //         })
    //         if(alldata.length !== 0 && alldata !== null){
    //           for(const value of alldata){
    //             try {
    //             axios.post('http://localhost:3001/new/email', {
    //               user_id: value.user_id
    //             }).then((data)=>{
    //                 console.log(data.data)
    //             })
    //         } 
    //         catch (e) {
    //         }
    //           }
    //         }
    //       }
    //       catch (e) {}
    // }
    const createindic = (id, alldata) => {

        for (const value of alldata) {
            try {
                axios.post('http://localhost:3001/new/newprojectindic', {
                    project_id: id,
                    indic_project: value.indicas,
                    unit: value.countunit,
                    cost: value.tagetvalue
                }).then((res) => {
                    console.log(res.data)
                })

            }
            catch (e) {
            }
        }

    }








    useEffect(() => {
        form.validateFields(['nickname'])
    }, [checkNick, form])

    const showConfirm = () => {
        confirm({
            title: 'Do you Want to delete these items?',
            icon: <ExclamationCircleFilled />,
            content: 'Some descriptions',
            onOk() {
                console.log('OK');
                createProject()
            },
            onCancel() {
                console.log('Cancel');
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
        for (const item of value.budget) {
            console.log(item)
            let num1 = item.Quarter1 !== undefined ? item.Quarter1 : 0
            let num2 = item.Quarter2 !== undefined ? item.Quarter2 : 0
            let num3 = item.Quarter3 !== undefined ? item.Quarter3 : 0
            let num4 = item.Quarter4 !== undefined ? item.Quarter4 : 0
            // amount += Number(item.Quarter1)+Number(item.Quarter2)+Number(item.Quarter3)+Number(item.Quarter4)
            amount += num1 + num2 + num3 + num4
        }
        console.log('amm', amount)
        if (amount <= value.amount) {
            setAalldata(value)
            createProject(value)
            //setMoneyQ()
            // save into database
            toast.current.show({ severity: 'success', summary: 'Success', detail: 'บันทึกสำเร็จ', life: 3000 })
            //showConfirm()
        } else {
            toast.current.show({
                severity: 'error',
                summary: 'Error',
                detail: 'รายจ่ายมากกว่าปริมาณการงบประมาณ',
                life: 3000
            })
        }
    }
    //console.log('all',alldata.selectyear.fiscalyear_id)



    return (
        <>
            <Header onMenuClick={(value) => toggleMobileMenu()} />
            <Sidebar />
            <div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>
                <div className="page-wrapper">
                    <div align="left">
                        <h2 style={{ marginTop: '.5em', marginLeft: '1em' }}>สร้างโครงการใหม่</h2>
                        <Toast ref={toast} />

                        <Form
                            form={form}
                            onFinish={onFinish}
                            name="dynamic_rule"
                            style={{
                                maxWidth: "100%",
                            }}
                        >
                            <Form.Item
                                {...formItemLayout}
                                name="selectyear"
                                label="ปีงบประมาณ"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your name',
                                    },
                                ]}
                            >
                                <Dropdown options={stopen} onChange={onStrategic} optionLabel="fiscalyear" placeholder="ปีงบประมาณ" className="w-full md:w-14rem" />
                            </Form.Item>
                            <Form.Item
                                {...formItemLayout}
                                name="projectname"
                                label="ชื่อโครงการ"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your projectname',
                                    },
                                ]}
                            >
                                <Input placeholder="ชื่อโครงการ" style={{ width: '45em' }} />
                            </Form.Item>
                            <Form.Item
                                {...formItemLayout}
                                name="Agency"
                                label="หน่วยงานที่รับผิดชอบโครงการ"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your name',
                                    },
                                ]}
                            >
                                <Input style={{ width: '45em' }} placeholder="Please input your name" disabled />
                            </Form.Item>
                            <Form.Item
                                {...formItemLayout}
                                name="headproject"
                                label="ผู้รับผิดชอบโครงการ"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your name',
                                    },
                                ]}
                            >
                                <Input placeholder="headproject" disabled style={{ width: '45em' }} />
                            </Form.Item>
                            <Form.List
                                name="nameheadpj"
                                {...formItemLayout}
                            >
                                {(fields, { add, remove }, { errors }) => (
                                    <>
                                        {fields.map((field, index) => (
                                            <Form.Item
                                                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                                label={index === 0 ? 'ชื่อผู้รับผิดชอบโครงการ ' : ''}
                                                required={false}
                                                key={field.key}
                                            >
                                                <Form.Item
                                                    {...field}
                                                    //  validateTrigger={['onChange', 'onBlur']}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            // whitespace: true,
                                                            message: 'Please input passenger\'s name or delete this field.',
                                                        },
                                                    ]}
                                                    noStyle
                                                >
                                                    <Dropdown options={person} optionLabel="displayname"
                                                        placeholder="ชื่อผู้รับผิดชอบโครงการ " style={{ width: 400 }} />
                                                    {/* <Select //defaultValue={null}
                                
                            >
                                <Option value={null}></Option>
                                {person.map(
                                    (item) =>  <option key={item} value={item.displayname}>{item.displayname}</option>
                                )}

                            </Select> */}
                                                </Form.Item>

                                                <MinusCircleOutlined
                                                    className="dynamic-delete-button"
                                                    onClick={() => remove(field.name)}
                                                />
                                            </Form.Item>
                                        ))}
                                        <Form.Item {...formItemLayoutWithOutLabel2} >
                                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                                เพิ่มผู้รับผิดชอบโครงการ
                                            </Button>
                                            <Form.ErrorList errors={errors} />
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>












                            {/* <Form.List
                    name="selectissue"
                    {...formItemLayout}
                >
                    {(fields, {add, remove}, {errors}) => (
                        <>
                            {fields.map((field, index) => (
                                <Form.Item
                                    {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                    label={index === 0 ? 'ประเด็นยุทธ์ศาสตร์ ' : ''}
                                    required={false}
                                    key={field.key}
                                >
                                    <Form.Item
                                        {...field}
                                        Label = 'selectissues'
                                        name={[field.name, 'selectissues']}
                                        validateTrigger={['onChange', 'onBlur']}
                                        rules={[
                                            {
                                                required: true,
                                                whitespace: true,
                                                message: 'Please input passenger\'s name or delete this field.',
                                            },
                                        ]}
                                        noStyle
                                    >
                                        <Dropdown
                    options={stselectfill}
                    onChange={onStrategic2}
                    optionLabel="strategic_name"
                    placeholder="ประเด็นยุทธ์ศาสตร์"
                  />
                                    </Form.Item>
                                    <Form.Item
                                        {...field}
                                        Label = 'selectgoa'
                                        name={[field.name, 'selectgoa']}
                                        validateTrigger={['onChange', 'onBlur']}
                                        rules={[
                                            {
                                                required: true,
                                                whitespace: true,
                                                message: 'Please input passenger\'s name or delete this field.',
                                            },
                                        ]}
                                        noStyle
                                    >
                                         <Dropdown
                    
                    options={newDatagoa}
                    onChange={onStrategic3} 
                    // onChange={(e) => setSelectgoa(e.value)}
                    optionLabel="goal_name"
                    placeholder="เป้าประสงค์"
                  />
                                    </Form.Item>
                                    <Form.Item
                                        {...field}
                                        Label = 'tactic'
                                        name={[field.name, 'tactic']}
                                        validateTrigger={['onChange', 'onBlur']}
                                        rules={[
                                            {
                                                required: true,
                                                whitespace: true,
                                                message: 'Please input passenger\'s name or delete this field.',
                                            },
                                        ]}
                                        noStyle
                                    >
                                       <MultiSelect  options={newtactic} optionLabel="tactic_name" 
                filter placeholder="tactic" maxSelectedLabels={8}  />

                                    </Form.Item>


                                    {fields.length > 1 ? (
                                        <MinusCircleOutlined
                                            className="dynamic-delete-button"
                                            onClick={() => remove(field.name)}
                                        />
                                    ) : null}
                                </Form.Item>
                            ))}
                            <Form.Item {...formItemLayoutWithOutLabel2} >
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined/>}>
                                    Add sights
                                </Button>
                                <Form.ErrorList errors={errors}/>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
         */}
                            <Form.Item {...formItemLayout}
                                name="radiogroup"
                                label="ประเภทโครงการ"
                                rules={[{
                                    required: true,
                                    message: 'Please pick an item!'
                                }]}
                            >
                                <Radio.Group>
                                    <Radio value="1">โครงการในแผน</Radio>
                                    <Radio value="0">โครงการนอกแผน</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item {...formItemLayout} name="radio" label="ลักษณะโครงการ"
                                rules={[{ required: true, message: 'Please pick an item!' }]}>
                                <Radio.Group>
                                    <Radio value="0">โครงการใหม่</Radio>
                                    <Radio value="1">โครงการต่อเนื่อง</Radio>
                                    <Radio value="2">งานประจำ</Radio>
                                    <Radio value="3">งานพัฒนา</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item
                                {...formItemLayout}
                                name="selectintegration"
                                label="การบูรณาการโครงการ"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your name',
                                    },
                                ]}
                            >
                                <Dropdown
                                    options={integration}
                                    optionLabel="integration_name"
                                    onChange={(e) => setSelectintegration(e.value)}
                                    placeholder="การบูรณาการโครงการ"
                                    style={{ width: '25em' }}
                                />
                            </Form.Item>
                            {selectintegration.integration_name === 'อื่นๆ' ?
                                <Form.Item
                                    {...formItemLayout}
                                    name="newintegration"
                                    label="ชื่อบูรณาการ"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your projectname',
                                        },
                                    ]}
                                >
                                    <Input placeholder="Please input your name" />
                                </Form.Item>
                                : null}

                            {selectintegration.integration_name !== 'ไม่' ? <Form.Item
                                {...formItemLayout}
                                name="integrationdetail"
                                label="เรื่อง/วิชา/คณะ"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your name',
                                    },
                                ]}
                            >
                                <Input.TextArea showCount maxLength={100} style={{ width: '45em', height: '10em' }} />

                            </Form.Item> : null}
                            <Form.Item
                                {...formItemLayout}
                                name="reason"
                                label="หลักการและเหตุผล"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your name',
                                    },
                                ]}
                            >
                                <Input.TextArea showCount maxLength={100} style={{ width: '45em', height: '15em' }} />
                            </Form.Item>
                            <Form.List
                                name="object"
                                rules={[
                                    ({ getFieldValue }) => ({

                                        validator(rule, value) {
                                            if (getFieldValue('object').length) {
                                                return Promise.resolve()
                                            }
                                            return Promise.reject('กรุณาเพิ่มรายการสินค้า')
                                        }
                                    })
                                ]}

                                {...formItemLayout}
                            >
                                {(fields, { add, remove }, { errors }) => (
                                    <>
                                        {fields.map((field, index) => (
                                            <Form.Item
                                                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
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
                                                            message: 'Please input passenger\'s name or delete this field.',
                                                        },
                                                    ]}
                                                    noStyle
                                                >
                                                    <Input
                                                        placeholder="วัตถุประสงค์ "
                                                        style={{
                                                            width: '60%',
                                                        }}
                                                    />
                                                </Form.Item>
                                                {fields.length > 1 ? (
                                                    <MinusCircleOutlined
                                                        className="dynamic-delete-button"
                                                        onClick={() => remove(field.name)}
                                                    />
                                                ) : null}
                                            </Form.Item>
                                        ))}
                                        <Form.Item {...formItemLayoutWithOutLabel2} >
                                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                                เพิ่มวัตถุประสงค์
                                            </Button>
                                            <Form.ErrorList errors={errors} />
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>
                            <Form.List
                                name="indica"
                                rules={[
                                    ({ getFieldValue }) => ({

                                        validator(rule, value) {
                                            if (getFieldValue('indica').length) {
                                                return Promise.resolve()
                                            }
                                            return Promise.reject('กรุณาเพิ่มรายการสินค้า')
                                        }
                                    })
                                ]}
                                {...formItemLayout}
                            >
                                {(fields, { add, remove }, { errors }) => (
                                    <>
                                        {fields.map((field, index) => (
                                            <Form.Item
                                                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                                label={index === 0 ? 'ตัวชี้วัดความสำเร็จ ' : ''}
                                                required={false}
                                                key={field.key}
                                            >
                                                <Form.Item
                                                    {...field}
                                                    Label='indicas'
                                                    name={[field.name, 'indicas']}
                                                    validateTrigger={['onChange', 'onBlur']}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            whitespace: true,
                                                            message: 'Please input passenger\'s name or delete this field.',
                                                        },
                                                    ]}
                                                    noStyle
                                                >
                                                    <Input
                                                        placeholder="ตัวชี้วัดความสำเร็จ "
                                                        style={{
                                                            width: '60%',
                                                        }}
                                                    />
                                                </Form.Item>
                                                <Form.Item
                                                    {...field}
                                                    Label='countunit'
                                                    name={[field.name, 'countunit']}
                                                    validateTrigger={['onChange', 'onBlur']}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            whitespace: true,
                                                            message: 'Please input passenger\'s name or delete this field.',
                                                        },
                                                    ]}
                                                    noStyle
                                                >
                                                    <Input
                                                        placeholder="หน่วยนับ "
                                                        style={{
                                                            width: '60%',
                                                        }}
                                                    />
                                                </Form.Item>
                                                <Form.Item
                                                    {...field}
                                                    Label='tagetvalue'
                                                    name={[field.name, 'tagetvalue']}
                                                    validateTrigger={['onChange', 'onBlur']}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            whitespace: true,
                                                            message: 'Please input passenger\'s name or delete this field.',
                                                        },
                                                    ]}
                                                    noStyle
                                                >
                                                    <Input
                                                        placeholder="ค่าเป้าหมาย "
                                                        style={{
                                                            width: '60%',
                                                        }}
                                                    />
                                                </Form.Item>


                                                {fields.length > 1 ? (
                                                    <MinusCircleOutlined
                                                        className="dynamic-delete-button"
                                                        onClick={() => remove(field.name)}
                                                    />
                                                ) : null}
                                            </Form.Item>
                                        ))}
                                        <Form.Item {...formItemLayoutWithOutLabel2} >
                                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                                เพิ่มตัวชี้วัดความสำเร็จ
                                            </Button>
                                            <Form.ErrorList errors={errors} />
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>
                            <Form.Item
                                {...formItemLayout}
                                name="targetgroup"
                                label="กลุ่มเป้าหมาย"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your name',
                                    },
                                ]}
                            >
                                <Input placeholder="กลุ่มเป้าหมาย" style={{ width: '45em' }} />
                            </Form.Item>
                            <Form.List
                                name="rowsData"
                                rules={[
                                    ({ getFieldValue }) => ({

                                        validator(rule, value) {
                                            if (getFieldValue('rowsData').length) {
                                                return Promise.resolve()
                                            }
                                            return Promise.reject('กรุณาเพิ่มรายการสินค้า')
                                        }
                                    })
                                ]}
                                {...formItemLayout}
                            >
                                {(fields, { add, remove }, { errors }) => (
                                    <>
                                        {fields.map((field, index) => (
                                            <Form.Item
                                                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                                label={index === 0 ? 'ขั้นตอนการดำเนินการ ' : ''}
                                                required={false}
                                                key={field.key}
                                            >
                                                <Form.Item
                                                    {...field}
                                                    Label='steps'
                                                    name={[field.name, 'steps']}
                                                    validateTrigger={['onChange', 'onBlur']}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            /// whitespace: true,
                                                            message: 'Please input passenger\'s name or delete this field.',
                                                        },
                                                    ]}
                                                    noStyle
                                                >
                                                    <Input
                                                        placeholder="ขั้นตอนการดำเนินการ/รายการกิจกรรม "
                                                        style={{
                                                            width: '60%',
                                                        }}
                                                    />
                                                </Form.Item>
                                                <Form.Item
                                                    {...field}
                                                    Label='start'
                                                    name={[field.name, 'start']}
                                                    validateTrigger={['onChange', 'onBlur']}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            // whitespace: true,
                                                            message: 'Please input passenger\'s name or delete this field.',
                                                        },
                                                    ]}
                                                    noStyle
                                                >
                                                    <Calendar id="basic" placeholder="เลือกวันที่เริ่มต้น" dateFormat="dd/mm/yy" name="dateend"
                                                        className="form-control" />

                                                </Form.Item>
                                                <Form.Item
                                                    {...field}
                                                    Label='end'
                                                    name={[field.name, 'end']}
                                                    validateTrigger={['onChange', 'onBlur']}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            //whitespace: true,
                                                            message: 'Please input passenger\'s name or delete this field.',
                                                        },
                                                    ]}
                                                    noStyle
                                                >
                                                    <Calendar id="basic" placeholder="เลือกวันที่สิ้นสุด" dateFormat="dd/mm/yy" name="dateend"
                                                        className="form-control" />
                                                </Form.Item>


                                                {fields.length > 1 ? (
                                                    <MinusCircleOutlined
                                                        className="dynamic-delete-button"
                                                        onClick={() => remove(field.name)}
                                                    />
                                                ) : null}
                                            </Form.Item>
                                        ))}
                                        <Form.Item {...formItemLayoutWithOutLabel2} >
                                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                                เพิ่มขั้นตอนการดำเนินการ/รายการกิจกรรม
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
                                        message: 'Please input your name',
                                    },
                                ]}
                            >
                                <Dropdown
                                    options={budget}
                                    optionLabel="name"
                                    placeholder="แหล่งเงิน/ประเภทงบประมาณที่ใช้"
                                    style={{ width: '25em' }}
                                />
                            </Form.Item>


                            {/****************************/}

                            <Form.Item label="ปริมาณการงบประมาณที่ใช้" {...formItemLayout}>
                                {/*<Space>*/}
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
                                    <Input style={{ width: 260 }}
                                        onChange={handleMoney}
                                        placeholder="งบประมาณที่ใช้" />
                                </Form.Item>
                                {money && <h3>{moneyText}</h3>}
                                {/*</Space>*/}
                            </Form.Item>
                            <Form.Item
                                {...formItemLayout}
                                name="workplan2"
                                label="แผนงาน"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your name',
                                    },
                                ]}
                            >
                                <Dropdown
                                    style={{ width: '25em' }}
                                    options={workplan}
                                    optionLabel="workplan_name"
                                    placeholder="แผนงาน"
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
                                            return Promise.reject('กรุณาเพิ่มรายการสินค้า')
                                        }
                                    })
                                ]}
                                rules={[
                                    ({ getFieldValue }) => ({
                                        validator(rule, value) {
                                            if (getFieldValue('budget').length) {
                                                return Promise.resolve()
                                            }
                                            return Promise.reject('กรุณาเพิ่มงบประมาณที่ใช้')
                                        }
                                    })
                                ]}
                                {...formItemLayout}
                            >
                                {(fields, { add, remove }, { errors }) => (
                                    <>
                                        <Row>
                                            <Col span={24} offset={8}>
                                                {fields.map(({ key, name, index, ...restField }) => (

                                                    <Form.Item
                                                        required={false}
                                                        key={key}
                                                    >
                                                        <Row>
                                                            <Col span={24}>
                                                                <Form.Item
                                                                    {...restField}
                                                                    label="งบรายจ่าย"
                                                                    name={[name, 'exbudget']}

                                                                >
                                                                    <Input style={{ width: 160 }} placeholder="งบรายจ่าย" />
                                                                </Form.Item>
                                                            </Col>
                                                            {/*<Col >*/}
                                                            <Form.Item
                                                                {...restField}
                                                                label="หมวดรายจ่าย"
                                                                name={[name, 'category']}

                                                            >
                                                                <Input style={{ width: 160 }} placeholder="หมวดรายจ่าย" />
                                                            </Form.Item>
                                                            <Form.Item
                                                                {...restField}
                                                                // label="Quarter1"
                                                                name={[name, 'Quarter1']}
                                                            // rules={[
                                                            //     {
                                                            //         required: true,
                                                            //         message: 'กรุณากรอกจำนวนสินค้า',
                                                            //     },
                                                            // ]}
                                                            >
                                                                <InputNumber min={0} controls={false} style={{ width: 160 }}
                                                                    placeholder="Quarter1" />
                                                            </Form.Item>
                                                            <Form.Item
                                                                {...restField}
                                                                // label="Quarter2"
                                                                name={[name, 'Quarter2']}

                                                            >
                                                                <InputNumber min={0} controls={false} style={{ width: 160 }}
                                                                    placeholder="Quarter2" />
                                                            </Form.Item>
                                                            <Form.Item
                                                                {...restField}
                                                                // label="Quarter3"
                                                                name={[name, 'Quarter3']}

                                                            >
                                                                <InputNumber min={0} controls={false} style={{ width: 160 }}
                                                                    placeholder="Quarter3" />
                                                            </Form.Item>
                                                            <Form.Item
                                                                {...restField}
                                                                // label="Quarter4"
                                                                name={[name, 'Quarter4']}

                                                            >
                                                                <InputNumber min={0} controls={false} style={{ width: 160 }}
                                                                    placeholder="Quarter4" />
                                                            </Form.Item>
                                                            {/*</Col>*/}
                                                            {fields.length > 1 ? (
                                                                <MinusCircleOutlined
                                                                    className="dynamic-delete-button"
                                                                    // style={{justifyItems: 'center'}}
                                                                    onClick={() => remove(name)}
                                                                />
                                                            ) : null}
                                                            {/*<MinusCircleOutlined onClick={() => remove(name)}/>*/}
                                                        </Row>

                                                    </Form.Item>

                                                ))}
                                            </Col>
                                        </Row>
                                        <Form.Item  {...formItemLayout}
                                            label="ประเภทการใช้จ่าย"
                                        >
                                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                                เพิ่มประเภทการใช้จ่าย
                                            </Button>
                                            <Form.ErrorList errors={errors} />
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>


                            {/****************************/}


                            <Form.List
                                name="sakes"
                                {...formItemLayout}
                            >
                                {(fields, { add, remove }, { errors }) => (
                                    <>
                                        {fields.map((field, index) => (
                                            <Form.Item
                                                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
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
                                                            message: 'Please input passenger\'s name or delete this field.',
                                                        },
                                                    ]}
                                                    noStyle
                                                >
                                                    <Input
                                                        placeholder="ประโยชน์ที่คาดว่าจะได้รับ "
                                                        style={{
                                                            width: '60%',
                                                        }}
                                                    />
                                                </Form.Item>
                                                {fields.length > 1 ? (
                                                    <MinusCircleOutlined
                                                        className="dynamic-delete-button"
                                                        onClick={() => remove(field.name)}
                                                    />
                                                ) : null}
                                            </Form.Item>
                                        ))}
                                        <Form.Item {...formItemLayoutWithOutLabel2} >
                                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                                เพิ่มประโยชน์ที่คาดว่าจะได้รับ
                                            </Button>
                                            <Form.ErrorList errors={errors} />
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>
                            <Form.Item {...formItemLayout} name="radioTor" label="เอกสาร TOR"
                                rules={[{ required: true, message: 'Please pick an item!' }]}>
                                <Radio.Group>
                                    <Radio value="0">ไม่มี</Radio>
                                    <Radio value="1">มี</Radio>
                                </Radio.Group>
                            </Form.Item>

                            <Form.Item>
                                <div style={{ marginTop: '1.5em', marginLeft: '85em', marginBottom: '1.5em' }} >
                                    <Button type="primary" htmlType="submit" className="login-form-button" >
                                        บันทึก
                                    </Button>
                                </div>
                            </Form.Item>

                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Newproject
