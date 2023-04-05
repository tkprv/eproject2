import 'primeicons/primeicons.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.css'
import 'primeflex/primeflex.css'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
// import { ProductService } from '../service/ProductService';
import { Toast } from 'primereact/toast'
import { PlusOutlined } from '@ant-design/icons'
import { Dropdown } from 'primereact/dropdown'
import { Button, Checkbox, Divider, Form, Input, Modal, Radio, Select, Spin } from 'antd'

const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 8},
        offset: 2,
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 20},
        offset: 2,
    },
}
// import './DataTableDemo.css';

const Adduser = ({getuser}) => {

    let emptyProduct = {
        id: null,
        name: '',
        description: '',
        category: null,
    }
    const [form] = Form.useForm()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [role, setRole] = useState()
    const [checkedList, setCheckedList] = useState([])
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState(null)
    const [productDialog, setProductDialog] = useState(false)
    const [product, setProduct] = useState(emptyProduct)
    const [submitted, setSubmitted] = useState(false)
    const toast = useRef(null)
    const [user, setUser] = useState([])
    const [lazyItems, setLazyItems] = useState([])
    const [lazyLoading, setLazyLoading] = useState(false)
    const [selectposition, setSelectposition] = useState(null)
    const [position, setPosition] = useState()
    const [cities, setCities] = useState([])
    const [username, setUsername] = useState([])
    const [firstname, setFirstname] = useState()
    const [lastname, setLastname] = useState()
    const [email, setEmail] = useState()
    const [test1, setTest1] = useState()
    const [privilege, setPrivilege] = useState('ผู้บริหาร')
    const [filteredResults, setFilteredResults] = useState([])
    const optionsRole = [
        {label: 'เจ้าหน้าที่แผน', value: 'เจ้าหน้าที่แผน'},
        {label: 'หัวหน้าฝ่าย', value: 'หัวหน้าฝ่าย'},
        {label: 'เจ้าหน้าที่พัสดุ', value: 'เจ้าหน้าที่พัสดุ'},
        {label: 'ผู้ดูแลระบบ', value: 'ผู้ดูแลระบบ'},
    ]

    useEffect(() => {
        onPositionChange()
    }, [selectposition])

    useEffect(() => {
        axios.get('http://localhost:3001/agency')
            .then((res) => {
                setPosition(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    useEffect(() => {
        form.setFieldsValue({
            firstname: filteredResults.firstname_en,
            lastname: filteredResults.lastname_en,
            email: filteredResults.email,
            // displayname: filteredResults.displayname
        })
    }, [filteredResults])

    // const ddd = [
    //     {
    //         'api status': 'success',
    //         'api_status_code': 202,
    //         'api message': 'Authentication success',
    //         'api time': '2017-06-26 11:46:29',
    //         'ap_і': '202.44.41.31',
    //         'userInfo': {
    //             'username': 's6204062630888',
    //             'displayname': 'dons masansai',
    //             'firstname_en': 'SIWAKORN',
    //             'lastname_en': 'LONGSOMBOON',
    //             'pid': 'N/A2331400026249',
    //             'email': 'siwakorn.1@icit.kmutnb.ac.th',
    //             'birthdate': '2017-06-26',
    //             'account_type': 'temporary'
    //         }
    //     }, {
    //         'api status': 'success',
    //         'api_status_code': 203,
    //         'api message': 'Authentication success',
    //         'api time': '2017-06-26 11:46:29',
    //         'ap_і': '202.44.41.31',
    //         'userInfo': {
    //             'username': 's6204062630807',
    //             'displayname': 'dons masansai',
    //             'firstname_en': 'PATCHAREEPORN',
    //             'lastname_en': 'RAKWICHEIN',
    //             'pid': 'N/A2331400026249',
    //             'email': 'patchareeporn@icit.kmutnb.ac.th',
    //             'birthdate': '2017-06-26',
    //             'account_type': 'temporary'
    //         }
    //     }]
    const onCityChange = (e) => {
        let selectedCities = [...cities]

        if (e.checked)
            selectedCities.push(e.value)
        else
            selectedCities.splice(selectedCities.indexOf(e.value), 1)

        setCities(selectedCities)
    }


    useEffect(() => {
        setLazyItems(Array.from({length: 100000}))
        setLazyLoading(false)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const onPositionChange = () => {

        console.log('position', selectposition)
    }

    const saveProduct = async (value) => {
        console.log(value)
        // setCheckedList([])
        // setRole(null)
        // setIsModalOpen(false)
        // setLoading(false)
        try {
            const {data} = await axios.post('http://localhost:3001/manageuser/create', {
                section_id: value.radioRole === 'ผู้บริหาร' ? 0 : selectposition.section_id,
                username: value.username,
                fname: value.firstname,
                lname: value.lastname,
                email: value.email,
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
                }) ? 1 : 0,
                flag: 1,
                displayname: filteredResults.displayname
            })

            const datauser = await data
            if (datauser.success) {
                setCheckedList([])
                setRole(null)
                setIsModalOpen(false)
                setLoading(false)
              } else {
                // Registration failed
                if (datauser.err.includes('Duplicate entry') && datauser.err.includes('username')) {
                    toast.current.show({severity:'warn', summary: 'Warning', detail:'มีข้อมูลผู้ใช้นี้แล้ว', life: 3000});
                    setLoading(true)
                } else {
                  console.log('erroe');
                }
              }
        } catch (e) {
            console.log(e)
        }

    }

    const apiuser = async (value) => {
        console.log('user', value)
        try {
            const dataapi = axios.post('http://localhost:3001/manageuser/api', {
                username: value
            }).then((res) => {
                console.log()
                if(res.data.api_status === 'success'){
                    setFilteredResults(res.data.userInfo)
                }
                else{ setLoading(false) 
                    toast.current.show({
                    severity:'warn', 
                    summary: "warn",
                    detail: "ไม่มีข้อมูลของผู้ใช้นี้",
                    life: 3000,
                  })}
                
            })
           setLoading(false)
            
        } catch (e) {
        }
    }

    const onCategoryChange = (e) => {
        let _product = {...product}
        _product['category'] = e.value
        setProduct(_product)
    }

    const showModal = () => {
        setIsModalOpen(true)
    }
    const handleOk = () => {
        setIsModalOpen(false)
    }
    const handleCancel = () => {
        setRole(null)
        setIsModalOpen(false)
        setLoading(false)
        form.resetFields()
    }


    const handleNum = (e) => {
        console.log(e.target.value)
        setLoading(true)
        if (e.target.value.length === 14) {
            apiuser(e.target.value)
        } else {
            form.setFieldsValue({firstname: null, lastname: null, email: null})
        }

    }

    const onChange = (checkedValues) => {
        setCheckedList(checkedValues)
        if (checkedValues.length <= 3) {
            setCheckedList(checkedValues)
        }
    }

    return (
        <div className="datatable-crud-demo">
            <Toast ref={toast}/>
            <Button type="primary" size={'large'} onClick={showModal} icon={<PlusOutlined/>} ghost>
                เพิ่มบัญชีผู้ใช้งาน
            </Button>

            <Modal
                title={<h3 className="m-0">{'เพิ่มบัญชีผู้ใช้งาน'}</h3>}
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <Form
                    name="dynamic_form_item"
                    onFinish={saveProduct}
                    form={form}
                    layout="vertical"
                    size={'large'}
                    style={{
                        maxWidth: '100%',
                        border: 'none', 
                        boxShadow: 'none' 
                      }}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        size="large"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                            // {
                            //     min: 14,
                            //     message: 'รหัสนักศึกษาต้องมี 13 หลัก'
                            // },
                            // {
                            //     pattern: '^s[0-9]+$',
                            //     message: 'รหัสนักศึกษาต้องเรื่มด้วย s และมีแค่ 1 ตัว เท่านั้น'
                            // }
                        ]}
                    >
                        <Input maxLength={14} onChange={handleNum}/>
                    </Form.Item>
                    <div className="text-center">
                        <Spin size="large" spinning={loading}/>
                    </div>
                    <Form.Item
                        label="ชื่อ"
                        name="firstname"
                        size="large"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your firstname!',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="นามสกุล"
                        name="lastname"
                        size="large"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your lastname!',
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            {
                                required: true,
                                message: 'กรุณากรอกอีเมล',
                            }]}
                    >
                        <Input/>
                    </Form.Item>
                    {role === 'ผู้ใช้งาน' ?
                        <Form.Item
                            label="หน่วยงาน"
                            name="position"
                            rules={[
                                {
                                    required: true,
                                    message: 'กรุณาเลือกหน่วยงาน',
                                }]}>
                              <Dropdown value={position} options={position}  onChange={(e) => setSelectposition(e.target.value)} optionLabel="section_name" placeholder="select" style={{ Width: '100%'}} /> 

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
                            <Radio value="ผู้บริหาร">ผู้บริหาร</Radio>
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
                                <Checkbox value="เจ้าหน้าที่แผน"
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
                        <Button
                            ghost
                            className="mr-2"
                            type="primary"
                            size="large"
                            onClick={handleCancel}
                        >
                            Cancle
                        </Button>
                        <Button
                            type="primary"
                            size="large"
                            htmlType="submit"
                        >
                            Save
                        </Button>
                    </div>
                </Form>
            </Modal>
        </div>
    )
}

export default Adduser
