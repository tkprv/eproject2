import React, { useState, useEffect } from 'react'
import { TabView, TabPanel } from 'primereact/tabview';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable'
import { InputTextarea } from 'primereact/inputtextarea';
import axios from 'axios'
import { useLocation } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { Card } from "primereact/card";
import { Form } from 'antd';
import { Column } from 'primereact/column'
import { Dialog } from 'primereact/dialog';
import Header from '../initialpage/Sidebar/header';
import Sidebar from '../initialpage/Sidebar/sidebar';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from "primereact/radiobutton";
import { Panel } from 'primereact/panel';
import { ExclamationCircleFilled } from '@ant-design/icons'
import { Modal } from 'antd'
const { confirm } = Modal

const Editprojectevaluation = () => {
    const location = useLocation();
    const [form] = Form.useForm();
    const [sectionproject, setSectionproject] = useState([]);
    const [strategicplanproject, setStrategicplanproject] = useState([]);
    const [strategicproject, setStrategicproject] = useState([]);
    const [goalproject, setGoalproject] = useState([]);
    const [tacticproject, setTacticproject] = useState([]);
    const [objectiveproject, setObjectiveproject] = useState([]);
    const [indicproject, setIndicproject] = useState([]);
    const [workplanproject, setWorkplanproject] = useState([]);
    const [displayBasic, setDisplayBasic] = useState(false);
    const [editexplanation, setEditexplanation] = useState();
    const [editconducting, setEditconducting] = useState();
    const [editdatetime, setEditdatetime] = useState();
    const [editresult, setEditresult] = useState();
    const [editmotive, setEditmotive] = useState();
    const [editrealused, setEditrealused] = useState();
    const [editbenefit, setEditbenefit] = useState();
    const [editproblem, setEditproblem] = useState();
    const [editimprovement, setEditimprovement] = useState();
    const [objective, setObjective] = useState();
    const [editobjective, setEditobjective] = useState();
    const [objectiveid, setObjectiveid] = useState();
    const [visible1, setVisible1] = useState(false);
    const [menu, setMenu] = useState(false);
    const [estimateproject, setEstimateproject] = useState();
    const [displayBasic2, setDisplayBasic2] = useState(false)
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

    // const onHide = (name) => {
    //     dialogFuncMap[`${name}`](false);
    // }

    // const onhide = () => {
    //     setVisible1(false)
    // }

    const onHide2 = () => {
        setDisplayBasic2(false)
        form.resetFields()
    }

    const dataobjective = (node) => {
        return (
            <div>
                <Button
                    type="button"
                    icon="pi pi-plus"
                    label='การบรรลุวัตถุประสงค์'
                    className="p-button-success"
                    style={{ textAlign: 'center', width: '14.5em', height: '2.5em' }}
                    onClick={() => showobjective(node)}
                ></Button>
            </div>
        )
    }

    // const renderFooter1 = (id) => {
    //     return (
    //         <div>
    //             <Button label="ยกเลิก" icon="pi pi-times" className="p-button-danger" style={{ height: '2.5em' }} onClick={onhide} />
    //             <Button label="ตกลง" icon="pi pi-check" className="p-button-success" style={{ height: '2.5em' }} onClick={() => showconfirm1(objectiveid)} autoFocus />
    //         </div>
    //     );
    // }
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

    // const handlResult = (e) => {
    //     const choice = e.target.value
    //     setEditresult(choice)
    //     form.setFieldsValue({ editresult: choice })
    // }

    const getestimate = () => {
        axios
            .get(`http://localhost:3001/dataevaluation/estimateproject/${location.state.project_id}`)
            .then((res) => {
                console.log(res.data.data)
                setEstimateproject(res.data)
                setEditexplanation(res.data.explanation)
                setEditconducting(res.data.conducting)
                setEditdatetime(res.data.date_time_project)
                setEditresult((res.data.result === '1') ? 'result1' : (res.data.result === '2') ? 'result2' : (res.data.result === 'ขอเลื่อนการดำเนินการ') ? 3 : 4)
                setEditmotive(res.data.motive)
                setEditrealused(res.data.real_used)
                setEditbenefit(res.data.benefit)
                setEditproblem(res.data.problem)
                setEditimprovement(res.data.improvement)
            }).catch((error) => {
                console.log(error)
            });
    }
    console.log('103', estimateproject)

    const showConfirm = (value) => {
        confirm({
            title: 'คุณต้องการแก้ไขเอกสารประเมินโครงการนี้ใช่มั้ย?',
            icon: <ExclamationCircleFilled style={{ verticalAlign: 'middle' }} />,
            onOk() {
                console.log('OK')
                editprojectevaluation(value, editexplanation, editresult, editmotive, editconducting, editrealused, editbenefit, editproblem, editimprovement, editdatetime)
                updatestatusconfirm(value, 0)
            },
            onCancel() {
                console.log('Cancel')
            },
        })
    }

    const editprojectevaluation = async (id, editexplanation, editresult, editmotive, editconducting, editrealused, editbenefit, editproblem, editimprovement, editdatetime) => {
        axios
            .put(`http://localhost:3001/dataevaluation/editprojectevaluation/${id}`, {
                explanation: editexplanation,
                result: (editresult === 'ดำเนินการแล้วเสร็จตามระยะเวลาที่กำหนดไว้ในโครงการ') ? 1 : (editresult === 'ไม่เป็นไปตามระยะเวลาที่กำหนดไว้ในโครงการ') ? 2 : (editresult === 'ขอเลื่อนการดำเนินการ') ? 3 : 4,
                motive: editmotive,
                conducting: editconducting,
                real_used: editrealused,
                benefit: editbenefit,
                problem: editproblem,
                improvement: editimprovement,
                date_time_project: editdatetime
            }).then((res) => {

            })
            await updatestatusproject(id, editresult)  
    }

    const updatestatusproject = async (id, editresult) => {
        axios
            .put(`http://localhost:3001/dataproject/confirmproject/${id}`, {
                status: (editresult === 'ดำเนินการแล้วเสร็จตามระยะเวลาที่กำหนดไว้ในโครงการ') ? 6 : (editresult === 'ไม่เป็นไปตามระยะเวลาที่กำหนดไว้ในโครงการ') ? 7 : (editresult === 'ขอเลื่อนการดำเนินการ') ? 8 : 9
            })
    }

    const updatestatusconfirm = (id, n) => {
        axios
            .put(`http://localhost:3001/dataevaluation/updatestatus/${id}`, {
                status_evaluation: n
            })
    }

    const showobjective = (item) => {
        setDisplayBasic2(true)
        setObjectiveid(item.objective_id)
        axios
            .get(`http://localhost:3001/dataevaluation/showobjective/${item.objective_id}`, {})
            .then((res) => {
                setObjective(res.data[0].objective_id)
                setEditobjective(res.data[0].obtain === 0 ? 'editobjective1' : 'editobjective2')
            })
            .catch((error) => {
                console.log(error)
            });
    };

    const showConfirm2 = (value) => {
        confirm({
            title: "ต้องการส่งข้อมูลบรรลุวัตถุประสงค์ใช่มั้ย?",
            icon: <ExclamationCircleFilled />,
            onOk() {
                console.log("OK");
                updateobjective(value, editobjective)
            },
            onCancel() {
                console.log("Cancel");
            },
        });
    }

    const updateobjective = (id, editobjective) => {
        onHide2()
        axios.put(`http://localhost:3001/dataevaluation/updateobjective/${id}`, {
            obtain: (editobjective === 'บรรลุ') ? 1 : 0,
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
                                        <InputTextarea autoResize value={editexplanation} onChange={(e) => setEditexplanation(e.target.value)} style={{ width: '35em' }} placeholder="คำชี้แจ้ง" rows={5} cols={30} />
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
                                    <div className="col-12 md:col-4">
                                        <h4 style={{ marginLeft: "9.5em" }}>ประเด็นยุทธ์ศาสตร์ :</h4>
                                    </div>
                                    <div className="col-12 md:col-6">
                                        {strategicproject.map((value) => {
                                            return <h4> {value?.strategic_name} </h4>
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className="fit">
                                <div className="grid p-fluid">
                                    <div className="col-12 md:col-4">
                                        <h4 style={{ marginLeft: "9.5em" }}>เป้าประสงค์ :</h4>
                                    </div>
                                    <div className="col-12 md:col-6">
                                        {goalproject.map((value) => {
                                            return <h4> {value?.goal_name} </h4>
                                        })}
                                    </div>
                                </div>
                            </div>
                            <div className="fit">
                                <div className="grid p-fluid">
                                    <div className="col-12 md:col-4">
                                        <h4 style={{ marginLeft: "9.5em" }}>กลยุทธ์ :</h4>
                                    </div>
                                    <div className="col-12 md:col-6">
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
                                        <InputTextarea autoResize value={editconducting} onChange={(e) => setEditconducting(e.target.value)} style={{ width: '35em' }} placeholder="วิธีการดำเนินโครงการ" rows={5} cols={30} />
                                    </div>
                                </div>
                            </div>
                            <div className="fit">
                                <div className="grid p-fluid">
                                    <div className="col-12 md:col-3">
                                        <h4>ระยะเวลาในการดำเนินงาน :</h4>
                                    </div>
                                    <div className="col-12 md:col-9">
                                        <InputText value={editdatetime} onChange={(e) => setEditdatetime(e.target.value)} style={{ width: '35em' }} placeholder="ระยะเวลาในการดำเนินงาน" />
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
                                                <Column body={dataobjective} header="จัดการ" style={{ textAlign: 'center' }} />
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
                                        <div className="col-12 md:col-9">
                                            <h4>
                                                <RadioButton
                                                    inputId="result1"
                                                    name="result"
                                                    value="ดำเนินการแล้วเสร็จตามระยะเวลาที่กำหนดไว้ในโครงการ"
                                                    onChange={(e) => setEditresult(e.target.value)}
                                                    checked={editresult === "ดำเนินการแล้วเสร็จตามระยะเวลาที่กำหนดไว้ในโครงการ"}
                                                    style={{ marginRight: '.5em' }}
                                                />
                                                <label htmlFor="result1" style={{ marginRight: '2em' }}>ดำเนินการแล้วเสร็จตามระยะเวลาที่กำหนดไว้ในโครงการ</label>
                                            </h4>
                                            <h4>
                                                <RadioButton
                                                    inputId="result2"
                                                    name="result"
                                                    value="ไม่เป็นไปตามระยะเวลาที่กำหนดไว้ในโครงการ"
                                                    onChange={(e) => setEditresult(e.target.value)}
                                                    checked={editresult === "ไม่เป็นไปตามระยะเวลาที่กำหนดไว้ในโครงการ"}
                                                    style={{ marginRight: '.5em' }}
                                                />
                                                <label htmlFor="result2">ไม่เป็นไปตามระยะเวลาที่กำหนดไว้ในโครงการ</label>
                                            </h4>
                                            <h4>
                                                <RadioButton
                                                    inputId="result3"
                                                    name="result"
                                                    value="ขอเลื่อนการดำเนินการ"
                                                    onChange={(e) => setEditresult(e.target.value)}
                                                    checked={editresult === "ขอเลื่อนการดำเนินการ"}
                                                    style={{ marginRight: '.5em' }}
                                                />
                                                <label htmlFor="result3">ขอเลื่อนการดำเนินการ</label>
                                            </h4>
                                            <h4>
                                                <RadioButton
                                                    inputId="result4"
                                                    name="result"
                                                    value="เสนอขอยกเลิก"
                                                    onChange={(e) => setEditresult(e.target.value)}
                                                    checked={editresult === "เสนอขอยกเลิก"}
                                                    style={{ marginRight: '.5em' }}
                                                />
                                                <label htmlFor="result4">เสนอขอยกเลิก</label>
                                            </h4>
                                            <div className="col-12 md:col-9">
                                                <InputText value={editmotive} onChange={(e) => setEditmotive(e.target.value)} style={{ width: '26.5em', marginLeft: '1.5em' }} placeholder="เนื่องจาก" /></div>
                                        </div>
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
                                        <InputText value={editrealused} onChange={(e) => setEditrealused(e.target.value)} style={{ width: '35em' }} placeholder="ใช้จริง" />
                                    </div>
                                </div>
                            </div>
                            <div className="fit">
                                <div className="grid p-fluid">
                                    <div className="col-12 md:col-3">
                                        <h4>ประโยชน์ที่ได้รับจากการดำเนินโครงการ :</h4>
                                    </div>
                                    <div className="col-12 md:col-9">
                                        <InputTextarea autoResize value={editbenefit} onChange={(e) => setEditbenefit(e.target.value)} style={{ width: '35em' }} placeholder="ประโยชน์ที่ได้รับจากการดำเนินโครงการ" rows={7} cols={30} />
                                    </div>
                                </div>
                            </div>
                            <div className="fit">
                                <div className="grid p-fluid">
                                    <div className="col-12 md:col-3">
                                        <h4>ปัญหา/อุปสรรคในการดำเนินโครงการ :</h4>
                                    </div>
                                    <div className="col-12 md:col-9">
                                        <InputTextarea autoResize value={editproblem} onChange={(e) => setEditproblem(e.target.value)} style={{ width: '35em' }} placeholder="ปัญหา/อุปสรรคในการดำเนินโครงการ" rows={7} cols={30} />
                                    </div>
                                </div>
                            </div>
                            <div className="fit">
                                <div className="grid p-fluid">
                                    <div className="col-12 md:col-3">
                                        <h4>แนวทางการดำเนินการแก้ไข :</h4>
                                    </div>
                                    <div className="col-12 md:col-9">
                                        <InputTextarea autoResize value={editimprovement} onChange={(e) => setEditimprovement(e.target.value)} style={{ width: '35em' }} placeholder="แนวทางการดำเนินการแก้ไข" rows={5} cols={30} />
                                    </div>
                                </div>
                            </div>
                            <div style={{ marginTop: '2em', marginLeft: '65em' }} >
                                <h4>
                                    <Button type="button" icon="pi pi-check" label='บันทึก' className="p-button-success" style={{ marginLeft: '.4em', height: '2.5em' }} onClick={() => { showConfirm(location.state.project_id) }} />
                                </h4>
                            </div>
                        </Panel>
                    </Card>

                    <div>
                        <Modal
                            title={<p className="m-0">{'การบรรลุผลวัตถุประสงค์'}</p>}
                            open={displayBasic2}
                            onCancel={onHide2}
                            footer={null}
                            width={700}
                        >
                            <div className="fit" style={{ marginLeft: '1.5em' }}>
                                <div className="grid p-fluid">
                                    <div className="col-12 md:col-9">
                                        <h4>
                                            <RadioButton
                                                inputId="editobjective1"
                                                name="editobjective"
                                                value="บรรลุ"
                                                onChange={(e) => setEditobjective(e.target.value)} 
                                                checked={editobjective === "บรรลุ"}
                                                style={{ marginRight: '.5em' }}
                                            />
                                            <label htmlFor="editobjective1" style={{ marginRight: '2em' }}>บรรลุ</label>
                                        </h4>
                                        <h4 style={{ marginTop: '.5em' }}>
                                            <RadioButton
                                                inputId="editobjective2"
                                                name="editobjective"
                                                value="ไม่บรรลุ"
                                                onChange={(e) => setEditobjective(e.target.value)}
                                                checked={editobjective === "ไม่บรรลุ"}
                                                style={{ marginRight: '.5em' }}
                                            />
                                            <label htmlFor="editobjective2">ไม่บรรลุ</label>
                                        </h4>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right mt-4">
                                <Button type="button" icon="pi pi-download" label='ยกเลิก' className="p-button-danger" style={{ height: '2.5em' }} onClick={onHide2}/>
                                <Button label="บันทึก" icon="pi pi-check" className="p-button-success" style={{ width: '7em', marginLeft: '.4em', height: '2.5em' }} onClick={() => showConfirm2(objectiveid)} autoFocus />
                            </div>
                        </Modal>
                    </div>
                    {/* <Dialog
                        style={{ width: '500px', width: "50vw" }} header="การบรรลุผลวัตถุประสงค์" modal className="p-fluid"
                        visible={visible1}
                        footer={renderFooter1}
                        onHide={onhide}
                    >
                        <div className="fit" style={{ marginLeft: '1.5em' }}>
                            <div className="grid p-fluid">
                                <div className="col-12 md:col-9">
                                    <h4>
                                        <RadioButton
                                            inputId="editobjective1"
                                            name="editobjective"
                                            value="บรรลุ"
                                            onChange={(e) => setEditobjective(e.target.value)}
                                            checked={editobjective === "บรรลุ"}
                                            style={{ marginRight: '.5em' }}
                                        />
                                        <label htmlFor="editobjective1" style={{ marginRight: '2em' }}>บรรลุ</label>
                                    </h4>
                                    <h4 style={{ marginTop: '.5em' }}>
                                        <RadioButton
                                            inputId="editobjective2"
                                            name="editobjective"
                                            value="ไม่บรรลุ"
                                            onChange={(e) => setEditobjective(e.target.value)}
                                            checked={editobjective === "ไม่บรรลุ"}
                                            style={{ marginRight: '.5em' }}
                                        />
                                        <label htmlFor="editobjective2">ไม่บรรลุ</label>
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </Dialog> */}
                </div>
            </div >
        </>
    );
}

export default Editprojectevaluation