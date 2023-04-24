import 'primeicons/primeicons.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.css'
import 'primeflex/primeflex.css'
import { Button } from 'primereact/button';
import React, { useState, useEffect, useRef } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import axios from 'axios'
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog'
import { Toast } from 'primereact/toast';
import { Card } from 'primereact/card';
import { Form, Input } from "antd"
import Header from '../initialpage/Sidebar/header';
import Sidebar from '../initialpage/Sidebar/sidebar';
import { Panel } from 'primereact/panel';
import { Tooltip } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal } from 'antd';
const { confirm } = Modal;

const Managesys = () => {
    const [person, setPerson] = useState([])
    const [lazyItems, setLazyItems] = useState([])
    const [lazyLoading, setLazyLoading] = useState(false)
    const [position, setPosition] = useState()
    const [globalFilter, setGlobalFilter] = useState('')
    const [value1, setValue1] = useState('')
    const [displayBasic, setDisplayBasic] = useState(false)
    const [dataUpdate, setDataUpdate] = useState('')
    const [id, setId] = useState()
    const [form] = Form.useForm()


    const [menu, setMenu] = useState(false)
    const toggleMobileMenu = () => {
        setMenu(!menu)
    }

    useEffect(() => {
        setLazyItems(Array.from({ length: 100000 }))
        setLazyLoading(false);
    }, [])


    useEffect(() => {
        getposition()
    }, [])

    const onHide = () => {
        setDisplayBasic(false)
        form.resetFields()
    }

    const getposition = () => {
        axios
            .get("http://localhost:3001/agency", {})
            .then((res) => {
                setPosition(res.data)
            })
            .catch((error) => {
                console.log(error)
            });
    }

    useEffect(() => {
        if (globalFilter.length === 0) {
            getposition()
        }
    }, [globalFilter])

    const header = (
        <div className="table-header">
            <span className="p-input-icon-left">
            </span>
        </div>
    );

    const actionTemplate = (node, column) => {
        return (
            <div >
                <Tooltip placement="bottom" title={<span>แก้ไขหน่วยงาน</span>} ><Button type="button" icon="pi pi-pencil" className="p-button-warning" style={{ height: '2.5em', width: '2.5em' }} onClick={() => show(node.section_id)}></Button></Tooltip>
            </div>
        )

    }

    const addposition = (value) => {
        try {
            axios.post('http://localhost:3001/createagency', {
                section_name: value.agency


            })
            getposition()
            setValue1('')
        } catch (e) {
        }
    }

    const updateposiion = (ID, dataUpdate) => {

        axios.put(`http://localhost:3001/updateagency/${ID}`, {
            section_name: dataUpdate

        }
        )

        getposition()
        onHide()
    };

    const dialogFuncMap = {
        'displayBasic': setDisplayBasic,

    }

    const show = (id) => {
        setDisplayBasic(true);
        setId(id)
    }

    const toast = useRef(null);

    const accept = () => {
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
    }

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }

    const onFinish = (value) => {
        console.log(value.agency)
        addposition(value)
    }

    return (
        <div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>
            <Header onMenuClick={(value) => toggleMobileMenu()} />
            <Sidebar />
            <div className="page-wrapper">

                <Card>
                    <Panel header='กำหนดโครงสร้างหน่วยงาน'>
                        <div className='text-left'>
                            <div className='mt-1.5' >
                                <Form
                                    form={form}
                                    onFinish={onFinish}
                                    name="dynamic_rule"
                                    layout="inline"
                                    style={{
                                        justifyItems: 'center',
                                        maxWidth: '100%',
                                        border: 'none',
                                        boxShadow: 'none'
                                    }}
                                >

                                    <Form.Item
                                        //{...formItemLayout}
                                        style={{ textAlign: 'center' }}
                                        label="หน่วยงาน"
                                        name="agency"
                                        rules={[
                                            {
                                                required: true,
                                                message: "กรุณากรอกหน่วยงาน",
                                            },
                                        ]}
                                    >
                                        <Input size="large" style={{ width: '25em' }} placeholder="หน่วยงาน" />
                                    </Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        className="p-button-success"
                                        icon='pi pi-plus'
                                        label='เพิ่มหน่วยงาน'
                                        style={{ height: '2.5em' }}
                                    />
                                </Form>
                            </div>
                            <div>
                                <div />
                                <br />
                                <div >
                                    <DataTable value={position} columnResizeMode="fit" showGridlines responsiveLayout="scroll" paginator rows={10} rowsPerPageOptions={[5, 10, 25]} >
                                        <Column field="section_id" sortable header="ลำดับ" style={{ width: '3%', textAlign: 'center' }} />
                                        <Column field="section_name" sortable header="ชื่อหน่วยงาน" />
                                        <Column body={actionTemplate} header="แก้ไข" style={{ textAlign: 'center', width: '15%' }} />
                                    </DataTable>
                                </div>
                            </div>
                            <div>
                                <Modal
                                    title={<h4 className="m-0">{'แก้ไขข้อมูลหน่วยงาน'}</h4>}
                                    open={displayBasic}
                                    onCancel={onHide}
                                    footer={null}
                                >
                                    <InputText value={dataUpdate} placeholder="ชื่อหน่วยงาน" onChange={(e) => setDataUpdate(e.target.value)} style={{ width: '29em' }} />
                                    <div className="text-right mt-4">
                                        <Button
                                            icon='pi pi-times'
                                            severity="danger"
                                            label='ยกเลิก'
                                            style={{ marginRight: '.5em', height: '2.5em' }}
                                            onClick={onHide}
                                        >
                                        </Button>
                                        <Button
                                            icon='pi pi-check'
                                            severity="success"
                                            label='บันทึก'
                                            style={{ height: '2.5em' }}
                                            onClick={() => updateposiion(id, dataUpdate)}
                                        >
                                        </Button>
                                    </div>
                                </Modal>
                            </div>
                        </div>
                    </Panel>
                </Card>
            </div>
        </div>
    );
}

export default Managesys