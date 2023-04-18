import 'primeicons/primeicons.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.css'
import 'primeflex/primeflex.css'
import React, { useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Dropdown } from 'primereact/dropdown'
import Adduser from './adduser'
import "./addsert.css";
import Header from '../initialpage/Sidebar/header';
import Sidebar from '../initialpage/Sidebar/sidebar';
import axios from 'axios'
import { Card } from 'primereact/card'
import { Tag } from 'primereact/tag'
import { Panel } from 'primereact/panel'
import { RedoOutlined } from '@ant-design/icons'
import { DeleteOutlined, EditOutlined, ExclamationCircleFilled, } from '@ant-design/icons'
import { Button, Checkbox, Divider, Form, Modal, Radio, Select, Row, Col, Tooltip } from 'antd'

const { Option } = Select
const { confirm } = Modal


const Manageuser = () => {
    const [form] = Form.useForm()
    const [person, setPerson] = useState([])
    const [personfill, setPersonfill] = useState([])
    const [lazyItems, setLazyItems] = useState([])
    const [lazyLoading, setLazyLoading] = useState(false)
    const [position, setPosition] = useState()
    const [globalFilter, setGlobalFilter] = useState('')
    const [search, setNewSearch] = useState('')
    const [selectedPosition, setSelectedPosition] = useState()
    const [displayBasic, setDisplayBasic] = useState(false)
    const [privilege, setPrivilege] = useState('ผู้บริหาร')
    const [agency, setAgency] = useState([])
    const [selectposition, setSelectposition] = useState(null)
    const [id, setId] = useState()
    const [menu, setMenu] = useState(false)
    const [role, setRole] = useState('')
    const [checkedList, setCheckedList] = useState([])

    const toggleMobileMenu = () => {
        setMenu(!menu)
    }

    // const [section, setSection] = useState([])
    let section = []

    useEffect(() => {
        axios
            .get('http://localhost:3001/agency')
            .then((res) => {
                setPosition(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    useEffect(() => {
        setLazyItems(Array.from({ length: 100000 }))
        setLazyLoading(false)
    }, [])

    useEffect(() => {
        getperson()
    }, [])
    console.log(position)

    const getperson = () => {

        axios
            .get("http://localhost:3001/manageuser/person", {})
            .then((res) => {
                setPerson(res.data);
                setPersonfill(res.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const updateuser = (value) => {
        console.log('value', value)
        onHide()
        axios.put(`http://localhost:3001/manageuser/updateuser/${id}`, {
            section_id: value.radioRole === 'ผู้บริหาร' ? 0 : value.positionid,
            director: value.radioRole === 'ผู้บริหาร' ? 1 : 0,
            manager: value.role?.some((item) => {
                return item === 'เจ้าหน้าที่แผน'
            }) ? 1 : 0,
            supervisor: value.role?.some((item) => {
                return item === 'หัวหน้าฝ่าย'
            }) ? 1 : 0,
            supplies: value.role?.some((item) => {
                return item === 'เจ้าหน้าที่พัสดุ'
            }) ? 1 : 0,
            responsible: value.radioRole === 'ผู้บริหาร' ? 0 : 1,
            admin: value.role?.some((item) => {
                return item === 'ผู้ดูแลระบบ'
            }) ? 1 : 0

        }
        )

        getperson()

    }
    console.log(role)

    const statususer = (node) => {
        if (node.flag === 1) {
            return <Tag className="mr-2" severity="success" value="สถานะปกติ" rounded></Tag>
        } else if (node.flag === 0) {
            return <Tag className="mr-2" severity="danger" value="ลาออกจากหน่วยงาน" rounded></Tag>
        }
    }

    const actionTemplate = (node, column) => {
        return (
            <div>
                <Tooltip placement="bottom" title={<span>แก้ไขผู้ใช้งาน</span>} ><Button
                    className="mr-2"
                    type="primary"
                    size="large"
                    icon={<EditOutlined style={{ verticalAlign: 'middle' }} />}
                    style={{ backgroundColor: '#F59E0B', color: 'white' }}
                    onClick={() => show(node)}
                ></Button>
                </Tooltip>
                <Tooltip placement="bottom" title={<span>เปลี่ยนสถานะผู้ใช้งาน</span>} ><Button
                    danger
                    type="primary"
                    size="large"
                    icon={<DeleteOutlined style={{ verticalAlign: 'middle' }} />}
                    onClick={() => {
                        showConfirm(node.user_id)
                    }}
                ></Button>
                </Tooltip>
            </div>
        )
    }

    const deleteperson = (p_id) => {
        axios.delete(`http://localhost:3001/manageuser/delete/${p_id}`)
        alert(`Delete id${p_id} sucessful`)
        getperson()
    }

    const section2 = (rowData) => {

        const collunm = person.find((obj) => {
            return obj.user_id === rowData.user_id
        })
        section = []
        if (Boolean(+collunm.director)) {
            section.push('ผู้บริหาร')
        }
        if (Boolean(+collunm.manager)) {
            section.push('เจ้าหน้าที่แผน')
        }
        if (Boolean(+collunm.supervisor)) {
            section.push('หัวหน้าฝ่าย')
        }
        if (Boolean(+collunm.supplies)) {
            section.push('เจ้าหน้าที่พัสดุ')
        }
        if (Boolean(+collunm.responsible)) {
            section.push('ผู้รับผิดชอบโครงการ')
        }
        if (Boolean(+collunm.admin)) {
            section.push('ผู้ดูแลระบบ')
        }
        let rol = ''
        section.forEach(element => {
            rol += element + '  '
        })
        return <div>{rol}</div>
    }

    const show = (value) => {
        setDisplayBasic(true)
        setId(value.user_id)
        if (value.director === 1) {
            setRole('ผู้บริหาร')
            form.setFieldsValue({ radioRole: 'ผู้บริหาร' })
        }
        else {
            setRole('ผู้ใช้งาน')
            form.setFieldsValue({ radioRole: 'ผู้ใช้งาน' })
            let sectionRole = []
            if (value.manager === 1) {
                sectionRole.push('เจ้าหน้าที่แผน')
            }
            if (value.supervisor === 1) {
                sectionRole.push('หัวหน้าฝ่าย')
            }
            if (value.supplies === 1) {
                sectionRole.push('เจ้าหน้าที่พัสดุ')
            }
            if (value.admin === 1) {
                sectionRole.push('ผู้ดูแลระบบ')
            } else {
                form.setFieldsValue({ role: null })
            }
            form.setFieldsValue({ role: sectionRole })
        }


    }

    const onHide = () => {
        setDisplayBasic(false)
        form.resetFields()
    }


    // const confirm2 = (id, dataUpdate) => {
    //     updateuser(id)
    // }

    const onChange = (checkedValues) => {
        setCheckedList(checkedValues)
        if (checkedValues.length <= 3) {
            setCheckedList(checkedValues)
        }
    }


    const onPositionChange = (e) => {

        setSelectedPosition(e.value)
        const q = e.value.section_name
        const setst = personfill.filter((person) => person.section_name === q)
        setPerson(setst)

    }

    const updatestatusperson = async (id, n) => {
        axios
            .put(`http://localhost:3001/manageuser/updatestatusperson/${id}`, {
                flag: n
            })
        getperson()
    }
    const showConfirm = (value) => {
        confirm({
            title: 'ต้องการเปลี่ยนสถานะผู้ใช้งานใช่มั้ย?',
            icon: <ExclamationCircleFilled style={{ verticalAlign: 'middle' }} />,
            onOk() {
                console.log('OK')
                updatestatusperson(value, 0)

            },
            onCancel() {
                console.log('Cancel')
            },
        })
    }

    const showConfirm1 = () => {
        confirm({
            title: 'ต้องการเปลี่ยนสิทธิผู้ใช้งานใช่มั้ย?',
            icon: <ExclamationCircleFilled style={{ verticalAlign: 'middle' }} />,
            onOk() {
                console.log('Ok')
            },
            onCancel() {
                console.log('Cancel')
            },
        })
    }

    const onChangePerson = () => {
        getperson()
    }

    return (
        <>
            <Header onMenuClick={(value) => toggleMobileMenu()} />
            <Sidebar />
            <div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>
                <div className="page-wrapper">

                    <Card>
                        <Panel header="กำหนดสิทธิผู้ใช้งาน">

                            <div className="text-left">
                                <div className="fit">
                                    <Row>
                                        <Col span={'9'} >
                                            <Dropdown
                                                value={selectedPosition}
                                                options={position}
                                                onChange={onPositionChange}
                                                optionLabel="section_name"
                                                placeholder="หน่วยงาน"
                                                style={{ width: '30em' }}
                                            />
                                        </Col>
                                        <Col span={'3'} >
                                            <Tooltip title="คืนค่าข้อมูลผู้ใช้้">
                                                <Button style={{ marginTop: '2.5px', marginLeft: '2.5em', height: '3em' }} onClick={onChangePerson} type="primary" size="large" icon={<RedoOutlined style={{ verticalAlign: 'middle' }} />} />
                                            </Tooltip>
                                        </Col>
                                        <Col span={'12'} style={{ textAlign: 'right' }}>
                                            <Adduser />
                                        </Col>
                                    </Row>
                                </div>
                                <DataTable
                                    id="myTable"
                                    value={person}
                                    columnResizeMode="fit"
                                    showGridlines
                                    responsiveLayout="scroll"
                                    style={{ marginTop: '30px' }}
                                    paginator rows={10}
                                    rowsPerPageOptions={[5, 10, 25]}
                                >
                                    <Column field="user_id" header="ลำดับ" sortable style={{ width: '2%', textAlign: 'center' }} />
                                    <Column field="username" sortable header="Username" />
                                    <Column field="displayname" sortable header="ชื่อ-นามสกุล" style={{ width: '17%' }} />
                                    <Column field="section_name" sortable header="หน่วยงาน" />
                                    <Column body={statususer} header="สถานะ" style={{ textAlign: 'center', width: '14%' }} />
                                    <Column field="user_id" body={section2} header="สิทธิผู้ใช้งาน" />
                                    <Column
                                        body={actionTemplate}
                                        header="จัดการ"
                                        style={{ textAlign: 'center', width: '10.5%' }}
                                    />
                                </DataTable>
                                <div>


                                    <Modal
                                        title={<h3 className="m-0">{'แก้ไขสิทธิผู้ใช้'}</h3>}
                                        open={displayBasic}
                                        onCancel={onHide}
                                        footer={null}
                                    >
                                        <Form
                                            name="dynamic_form_item"
                                            onFinish={updateuser}
                                            form={form}
                                            layout="vertical"
                                            size={'large'}
                                            style={{
                                                maxWidth: '100%',
                                                border: 'none',
                                                boxShadow: 'none'
                                            }}
                                        >
                                            {role === 'ผู้ใช้งาน' ?
                                                <Form.Item
                                                    label="หน่วยงาน"
                                                    name="positionid"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'กรุณาเลือกหน่วยงาน',
                                                        }]}>
                                                    <Select
                                                        //onChange={(e) => setSelectposition(e.target.value)}
                                                        placeholder="---- กรุณาเลือกหน่วยงาน ----"
                                                    >
                                                        <Option value={null}>---- กรุณาเลือกหน่วยงาน ----</Option>
                                                        {position?.map((value) => (
                                                            <Option value={value.section_id}>
                                                                {value.section_name}
                                                            </Option>
                                                        ))}
                                                    </Select>
                                                </Form.Item> : null
                                            }
                                            <Divider orientation="left">กำหนดสิทธิให้กับผู้ใช้งาน</Divider>
                                            <Form.Item
                                                name="radioRole"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'กรุณาเลือกสิทธิให้กับผู้ใช้งาน',
                                                    }]}>
                                                <Radio.Group onChange={(e) => setRole(e.target.value)} size={'large'}>
                                                    <Radio value="ผู้บริหาร" style={{ marginBottom: '.5em' }}>ผู้บริหาร</Radio>
                                                    <br />
                                                    <Radio value="ผู้ใช้งาน">สิทธิ์ของผู้ใช้ในหน่วยงาน</Radio>
                                                </Radio.Group>
                                            </Form.Item>

                                            {role === 'ผู้ใช้งาน' ?
                                                <Form.Item
                                                    name="role"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'กรุณาเลือกสิทธิให้กับผู้ใช้งาน',
                                                        }]}>
                                                    <Checkbox.Group
                                                        onChange={onChange}
                                                    >
                                                        <Checkbox style={{ marginLeft: '2em' }} value="เจ้าหน้าที่แผน"
                                                            disabled={checkedList.length === 3 && checkedList.every((value) => {
                                                                return value !== 'เจ้าหน้าที่แผน'
                                                            })}>เจ้าหน้าที่แผน</Checkbox>
                                                        <Checkbox value="หัวหน้าฝ่าย"
                                                            disabled={checkedList.length === 3 && checkedList.every((value) => {
                                                                return value !== 'หัวหน้าฝ่าย'
                                                            })}>หัวหน้าฝ่าย</Checkbox>
                                                        <Checkbox value="เจ้าหน้าที่พัสดุ"
                                                            disabled={checkedList.length === 3 && checkedList.every((value) => {
                                                                return value !== 'เจ้าหน้าที่พัสดุ'
                                                            })}>เจ้าหน้าที่พัสดุ</Checkbox>
                                                        <Checkbox value="ผู้ดูแลระบบ"
                                                            disabled={checkedList.length === 3 && checkedList.every((value) => {
                                                                return value !== 'ผู้ดูแลระบบ'
                                                            })}>ผู้ดูแลระบบ</Checkbox>
                                                    </Checkbox.Group>
                                                </Form.Item>

                                                : null}

                                            <div className="text-right mt-2 ">
                                                <Button danger
                                                    ghost
                                                    className="mr-2 "
                                                    type="primary"
                                                    size="large"
                                                    onClick={onHide}
                                                >
                                                    ยกเลิก
                                                </Button>
                                                <Button
                                                    type="primary"
                                                    size="large"
                                                    htmlType="submit"
                                                    style={{ width: '4.5em' }}
                                                    onClick={() => {
                                                        showConfirm1()
                                                    }}
                                                >
                                                    บันทึก
                                                </Button>
                                            </div>
                                        </Form>
                                    </Modal>
                                </div>
                                <div />
                            </div>
                        </Panel>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default Manageuser
