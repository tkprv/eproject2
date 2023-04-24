import React, { useState, useEffect } from 'react'
import { TabView, TabPanel } from 'primereact/tabview';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable'
import { InputTextarea } from 'primereact/inputtextarea';
import axios from 'axios'
import { useLocation } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { Card } from "primereact/card";
import Header from '../initialpage/Sidebar/header';
import Sidebar from '../initialpage/Sidebar/sidebar';
import { InputText } from 'primereact/inputtext';
import { Panel } from 'primereact/panel';
import { ExclamationCircleFilled } from '@ant-design/icons'
import { Column } from 'primereact/column'
import { Modal } from 'antd'
const { confirm } = Modal

const Editprojectevaluationmanager = () => {
    const location = useLocation();
    const [sectionproject, setSectionproject] = useState([]);
    const [strategicplanproject, setStrategicplanproject] = useState([]);
    const [strategicproject, setStrategicproject] = useState([]);
    const [goalproject, setGoalproject] = useState([]);
    const [tacticproject, setTacticproject] = useState([]);
    const [objectiveproject, setObjectiveproject] = useState([]);
    const [indicproject, setIndicproject] = useState([]);
    const [workplanproject, setWorkplanproject] = useState([]);
    const [displayBasic, setDisplayBasic] = useState(false);
    const [menu, setMenu] = useState(false);
    const [estimateproject, setEstimateproject] = useState();
    let history = useHistory();

    console.log('44', location.state)
    useEffect(() => {
        getsection()
        getstrategicplan()
        getstrategic()
        getgoal()
        gettactic()
        getobjective()
        getindic()
        getworkplan()
        getestimate()
    }, []);

    const dialogFuncMap = {
        'displayBasic': setDisplayBasic,
    }

    const toggleMobileMenu = () => {
        setMenu(!menu)
    }

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
    }

    const obtain = (node) => {
        console.log('no', node)
        if (node.obtain === 1) {
            return 'บรรลุ'
        } else if (node.obtain === 0) {
            return 'ไม่บรรลุ'
        }
    }
    
    const getsection = async () => {
        axios
            .get(`http://localhost:3001/dataproject/sectionproject/${location.state.section_id}`, {})
            .then((res) => {
                console.log(res.data)
                setSectionproject(res.data)
            }).catch((error) => {
                console.log(error)
            });
    }
    console.log('section', sectionproject?.section_name)

    const getstrategicplan = () => {
        axios
            .get(`http://localhost:3001/dataproject/strategicplanproject/${location.state.project_id}`, {})
            .then((res) => {
                console.log(res.data)
                setStrategicplanproject(res.data)
            }).catch((error) => {
                console.log(error)
            });
    }
    console.log('11', strategicplanproject)

    const getstrategic = async () => {
        await axios
            .get(`http://localhost:3001/dataproject/strategicproject/${location.state.project_id}`)
            .then((res) => {
                console.log(res.data.data)
                setStrategicproject(res.data)
            }).catch((error) => {
                console.log(error)
            });
    }
    console.log('33', strategicproject?.strategic_name)

    const getgoal = async () => {
        await axios
            .get(`http://localhost:3001/dataproject/goalproject/${location.state.project_id}`)
            .then((res) => {
                console.log(res.data.data)
                setGoalproject(res.data)
            }).catch((error) => {
                console.log(error)
            });
    }
    console.log('44', goalproject?.goal_name)

    const gettactic = async () => {
        await axios
            .get(`http://localhost:3001/dataproject/tacticproject/${location.state.project_id}`)
            .then((res) => {
                console.log(res.data.data)
                setTacticproject(res.data)
            }).catch((error) => {
                console.log(error)
            });
    }
    console.log('55', tacticproject?.tactic_name)

    const getobjective = async () => {
        await axios
            .get(`http://localhost:3001/dataproject/objectiveproject/${location.state.project_id}`)
            .then((res) => {
                console.log(res.data.data)
                setObjectiveproject(res.data)
            }).catch((error) => {
                console.log(error)
            });
    }
    console.log('77', objectiveproject)

    const getindic = () => {
        axios
            .get(`http://localhost:3001/dataproject/indicproject/${location.state.project_id}`, {})
            .then((res) => {
                console.log(res.data)
                setIndicproject(res.data)
            }).catch((error) => {
                console.log(error)
            });
    }
    console.log('88', indicproject)

    const getworkplan = () => {
        axios
            .get(`http://localhost:3001/dataproject/workplanproject/${location.state.workplan_id}`, {})
            .then((res) => {
                console.log(res.data)
                setWorkplanproject(res.data)
            }).catch((error) => {
                console.log(error)
            });
    }
    console.log('100', workplanproject?.workplan_name)

    const getestimate = async () => {
        await axios
            .get(`http://localhost:3001/dataevaluation/estimateproject/${location.state.project_id}`)
            .then((res) => {
                console.log(res.data.data)
                setEstimateproject(res.data)
            }).catch((error) => {
                console.log(error)
            });
    }
    console.log('103', estimateproject)

    const showConfirm = (value) => {
        confirm({
            title: 'คุณต้องการอนุมัติการปิดโครงการนี้ใช่มั้ย?',
            icon: <ExclamationCircleFilled style={{ verticalAlign: 'middle' }} />,
            okText: 'ตกลง',
            cancelText: 'ยกเลิก',
            onOk() {
                console.log('ตกลง')
                updatestatusconfirm(value, 1)

            },
            onCancel() {
                console.log('ยกเลิก')
            },
        })
    }

    const showNoconfirm = (value) => {
        confirm({
            title: 'คุณต้องการไม่อนุมัติการปิดโครงการนี้ใช่มั้ย?',
            icon: <ExclamationCircleFilled style={{ verticalAlign: 'middle' }} />,
            okText: 'ตกลง',
            cancelText: 'ยกเลิก',
            onOk() {
                console.log('ตกลง')
                updatestatusconfirm(value, 2)

            },
            onCancel() {
                console.log('ยกเลิก')
            },
        })
    }

    const updatestatusconfirm = (id, n) => {
        axios
            .put(`http://localhost:3001/dataevaluation/updatestatus/${id}`, {
                status_evaluation: n
            })
    }


    return (
        <>
            <Header onMenuClick={(value) => toggleMobileMenu()} />
            <Sidebar />
            <div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>
                <div className="page-wrapper">
                    <Card>
                        <Panel header='เอกสารประเมินผลโครงการ'>
                            <div className="fit">
                                <div className="grid p-fluid">
                                    <div className="col-12 md:col-3">
                                        <h4>คำชี้แจ้ง :</h4>
                                    </div>
                                    <div className="col-12 md:col-9">
                                        <InputTextarea autoResize value={estimateproject?.explanation} style={{ width: '35em' }} placeholder="คำชี้แจ้ง" rows={5} cols={30} disabled />
                                    </div>
                                </div>
                            </div>
                            <div className="fit">
                                <div className="grid p-fluid">
                                    <div className="col-12 md:col-3">
                                        <h4>ชื่อโครงการ :</h4>
                                    </div>
                                    <div className="col-12 md:col-9">
                                        <h4> {location.state.project_name} </h4>
                                    </div>
                                </div>
                            </div>
                            <div className="fit">
                                <div className="grid p-fluid">
                                    <div className="col-12 md:col-3">
                                        <h4>ตอบสนองยุทธศาสตร์ :</h4>
                                    </div>
                                    <div className="col-12 md:col-9">
                                        <h4> {workplanproject?.workplan_name} </h4>
                                    </div>
                                </div>
                            </div>
                            <div className="fit">
                                <div className="grid p-fluid">
                                    <div className="col-12 md:col-3">
                                        <h4>ประเด็นยุทธ์ศาสตร์ :</h4>
                                    </div>
                                    <div className="col-12 md:col-9">
                                        {strategicproject.map((value) => {
                                            return <h4> {value?.strategic_name} </h4>
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className="fit">
                                <div className="grid p-fluid">
                                    <div className="col-12 md:col-3">
                                        <h4>เป้าประสงค์ :</h4>
                                    </div>
                                    <div className="col-12 md:col-9">
                                        {goalproject.map((value) => {
                                            return <h4> {value?.goal_name} </h4>
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className="fit">
                                <div className="grid p-fluid">
                                    <div className="col-12 md:col-3">
                                        <h4>กลยุทธ์ :</h4>
                                    </div>
                                    <div className="col-12 md:col-9">
                                        {tacticproject.map((value) => {
                                            return <h4> {value?.tactic_name} </h4>
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className="fit">
                                <div className="grid p-fluid">
                                    <div className="col-12 md:col-3">
                                        <h4>ส่วนงานที่รับผิดชอบ :</h4>
                                    </div>
                                    <div className="col-12 md:col-9">
                                        <h4> {sectionproject?.section_name} </h4>
                                    </div>
                                </div>
                            </div>
                            <div className="fit">
                                <div className="grid p-fluid">
                                    <div className="col-12 md:col-3">
                                        <h4>วิธีการดำเนินโครงการ :</h4>
                                    </div>
                                    <div className="col-12 md:col-9">
                                        <InputTextarea autoResize value={estimateproject?.conducting} style={{ width: '35em' }} placeholder="วิธีการดำเนินโครงการ" rows={5} cols={30} disabled />
                                    </div>
                                </div>
                            </div>
                            <div className="fit">
                                <div className="grid p-fluid">
                                    <div className="col-12 md:col-3">
                                        <h4>ระยะเวลาในการดำเนินงาน :</h4>
                                    </div>
                                    <div className="col-12 md:col-9">
                                        <InputText value={estimateproject?.date_time_project} style={{ width: '35em' }} placeholder="ระยะเวลาในการดำเนินงาน" disabled />
                                    </div>
                                </div>
                            </div>
                            <div className="fit">
                                <div className="grid p-fluid">
                                    <div className="col-12 md:col-3">
                                        <h4>วัตถุประสงค์ :</h4>
                                    </div>
                                    <div className="col-12 md:col-9">
                                        <h4>
                                            <DataTable value={objectiveproject} columnResizeMode="fit" showGridlines responsiveLayout="scroll" rows={10}>
                                                <Column field="objective_name" header="วัตถุประสงค์" />
                                                <Column body={obtain} header="การบรรลุวัตถุประสงค์" />
                                            </DataTable>
                                        </h4>
                                    </div>
                                </div>
                            </div>
                            <div className="fit">
                                <div className="grid p-fluid">
                                    <div className="col-12 md:col-3">
                                        <h4>ผลการดำเนินงาน :</h4>
                                    </div>
                                    <div className="col-12 md:col-9">
                                        <h4>
                                            {(estimateproject?.result === 1) ? "ดำเนินการแล้วเสร็จตามระยะเวลาที่กำหนดไว้ในโครงการ" :
                                                (estimateproject?.result === 2) ? "ไม่เป็นไปตามระยะเวลาที่กำหนดไว้ในโครงการ" :
                                                    (estimateproject?.result == 3) ? "ขอเลื่อนการดำเนินการ" :
                                                        <div> เสนอขอยกเลิก <InputText value={estimateproject?.motive} style={{ width: '26.5em', marginLeft: '1.5em' }} placeholder="เนื่องจาก" disabled /></div>}
                                        </h4>
                                    </div>
                                </div>
                            </div>
                            <div className="fit">
                                <div className="grid p-fluid">
                                    <div className="col-12 md:col-3">
                                        <h4>ผลการดำเนินงานตามตัวชี้วัด :</h4>
                                    </div>
                                    <div className="col-12 md:col-9">
                                        {indicproject.map((value) => {
                                            return <h4> {value?.indic_project} </h4>
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className="fit">
                                <div className="grid p-fluid">
                                    <div className="col-12 md:col-3">
                                        <h4>ใช้จริง :</h4>
                                    </div>
                                    <div className="col-12 md:col-9">
                                        <InputText value={estimateproject?.real_used} style={{ width: '35em' }} placeholder="ใช้จริง" disabled />
                                    </div>
                                </div>
                            </div>
                            <div className="fit">
                                <div className="grid p-fluid">
                                    <div className="col-12 md:col-3">
                                        <h4>ประโยชน์ที่ได้รับจากการดำเนินโครงการ :</h4>
                                    </div>
                                    <div className="col-12 md:col-9">
                                        <InputTextarea autoResize value={estimateproject?.benefit} style={{ width: '35em' }} placeholder="ประโยชน์ที่ได้รับจากการดำเนินโครงการ" rows={7} cols={30} disabled />
                                    </div>
                                </div>
                            </div>
                            <div className="fit">
                                <div className="grid p-fluid">
                                    <div className="col-12 md:col-3">
                                        <h4>ปัญหา/อุปสรรคในการดำเนินโครงการ :</h4>
                                    </div>
                                    <div className="col-12 md:col-9">
                                        <InputTextarea autoResize value={estimateproject?.problem} style={{ width: '35em' }} placeholder="ปัญหา/อุปสรรคในการดำเนินโครงการ" rows={7} cols={30} disabled />
                                    </div>
                                </div>
                            </div>
                            <div className="fit">
                                <div className="grid p-fluid">
                                    <div className="col-12 md:col-3">
                                        <h4>แนวทางการดำเนินการแก้ไข :</h4>
                                    </div>
                                    <div className="col-12 md:col-9">
                                        <InputTextarea autoResize value={estimateproject?.improvement} style={{ width: '35em' }} placeholder="แนวทางการดำเนินการแก้ไข" rows={5} cols={30} disabled />
                                    </div>
                                </div>
                            </div>
                            <div className="text-right mt-4">
                                <h4>
                                    <Button type="button" icon="pi pi-times" label='ไม่อนุมัติการปิดโครงการ' className="p-button-danger" style={{ marginLeft: '.4em', height: '2.5em' }} onClick={() => { showNoconfirm(location.state.project_id) }} />
                                    <Button type="button" icon="pi pi-check" label='อนุมัติการปิดโครงการ' className="p-button-success" style={{ marginLeft: '.4em', height: '2.5em', width: '15em' }} onClick={() => { showConfirm(location.state.project_id) }} />
                                </h4>
                            </div>
                        </Panel>
                    </Card>
                </div>
            </div >
        </>
    );
}

export default Editprojectevaluationmanager