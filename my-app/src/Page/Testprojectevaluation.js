import React, { useState, useEffect } from 'react'
import { TabView, TabPanel } from 'primereact/tabview';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column'
import { Dialog } from 'primereact/dialog';
import { DataTable } from 'primereact/datatable'
import { InputTextarea } from 'primereact/inputtextarea';
import axios from 'axios'
import { useLocation } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { Tag } from 'primereact/tag';
import { Card } from "primereact/card";
import Header from '../initialpage/Sidebar/header';
import Sidebar from '../initialpage/Sidebar/sidebar';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from "primereact/radiobutton";
import { Form } from 'antd';
import { Panel } from 'primereact/panel';

const Detailprojectevaluation = () => {
    const location = useLocation();
    const [form] = Form.useForm();
    const [confirm, setConfirm] = useState('');
    const [position, setPosition] = useState('center');
    const [sectionproject, setSectionproject] = useState([]);
    const [userproject, setUserproject] = useState([]);
    const [strategicplanproject, setStrategicplanproject] = useState([]);
    const [strategicproject, setStrategicproject] = useState([]);
    const [goalproject, setGoalproject] = useState([]);
    const [tacticproject, setTacticproject] = useState([]);
    const [integrationproject, setIntegrationproject] = useState([]);
    const [objectiveproject, setObjectiveproject] = useState([]);
    const [indicproject, setIndicproject] = useState([]);
    const [stepproject, setStepproject] = useState([]);
    const [workplanproject, setWorkplanproject] = useState([]);
    const [chargesproject, setChargesproject] = useState([]);
    const [benefitproject, setBenefitproject] = useState([]);
    const [displayBasic, setDisplayBasic] = useState(false);
    const [value1, setValue1] = useState();
    const [menu, setMenu] = useState(false);
    const [explanation, setExplanation] = useState('');
    const [conducting, setConducting] = useState('');
    const [datetime, setDatetime] = useState('');
    const [objective, setObjective] = useState();
    const [editobjective, setEditobjective] = useState();
    const [objectiveid, setObjectiveid] = useState();
    const [result, setResult] = useState();
    const [motive, setMotive] = useState();
    const [realused, setRealused] = useState();
    const [benefit, setBenefit] = useState();
    const [problem, setProblem] = useState();
    const [improvement, setImprovement] = useState();
    const [visible1, setVisible1] = useState(false);
    let history = useHistory();

    console.log('44', location.state)
    useEffect(() => {
        getsection()
        getuser()
        getstrategicplan()
        getstrategic()
        getgoal()
        gettactic()
        getintegration()
        getobjective()
        getindic()
        getstep()
        getworkplan()
        getcharges()
        getbenefit()
    }, []);

    const dialogFuncMap = {
        'displayBasic': setDisplayBasic,
        'confirm': setConfirm,
    }

    const toggleMobileMenu = () => {
        setMenu(!menu)
    }

    const onClick = (name, position) => {
        dialogFuncMap[`${name}`](true);

        if (position) {
            setPosition(position);
        }
    }

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
    }

    const onhide = () => {
        setVisible1(false)
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

    const workposition = (node) => {
        if (node.director === 1) {
            return 'ผู้บริหาร'
        } else if (node.manager === 1) {
            return 'เจ้าหน้าที่ฝ่ายแผน'
        } else if (node.supervisor === 1) {
            return 'หัวหน้าฝ่าย'
        } else if (node.supplies === 1) {
            return 'เจ้าหน้าที่พัสดุ'
        } else if (node.responsible === 1) {
            return 'ผู้รับผิดชอบโครงการ'
        } else if (node.admin === 1) {
            return 'ผู้ดูแลระบบ'
        }
    }

    const renderFooter1 = (name) => {
        return (
            <div>
                <Button label="ยกเลิก" icon="pi pi-times" className="p-button-danger" style={{ height: '2.5em' }} onClick={() => onHide(name)} />
                <Button label="ยืนยัน" icon="pi pi-check" className="p-button-success" style={{ height: '2.5em' }} onClick={() => closeproject(location.state.project_id, 1)} />
            </div>
        );
    }

    const renderFooter2 = (id) => {
        return (
            <div>
                <Button label="ยกเลิก" icon="pi pi-times" className="p-button-danger" style={{ height: '2.5em' }} onClick={onhide} />
                <Button label="ตกลง" icon="pi pi-check" className="p-button-success" style={{ height: '2.5em' }} onClick={() => updateobjective(id, editobjective)} autoFocus />
            </div>
        );
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

    const getuser = () => {
        axios
            .get(`http://localhost:3001/dataproject/userproject/${location.state.project_id}`, {})
            .then((res) => {
                console.log(res.data)
                setUserproject(res.data)
            }).catch((error) => {
                console.log(error)
            });
    }
    console.log('22', userproject)

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

    const getintegration = async () => {
        await axios
            .get(`http://localhost:3001/dataproject/integrationproject/${location.state.integration_id}`)
            .then((res) => {
                console.log(res.data.data)
                setIntegrationproject(res.data)
            }).catch((error) => {
                console.log(error)
            });
    }
    console.log('66', integrationproject?.integration_name)

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

    const getstep = () => {
        axios
            .get(`http://localhost:3001/dataproject/stepproject/${location.state.project_id}`, {})
            .then((res) => {
                console.log(res.data)
                setStepproject(res.data)
            }).catch((error) => {
                console.log(error)
            });
    }
    console.log('99', stepproject)

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

    const getcharges = () => {
        axios
            .get(`http://localhost:3001/dataproject/chargesproject/${location.state.project_id}`, {})
            .then((res) => {
                console.log(res.data)
                setChargesproject(res.data)
            }).catch((error) => {
                console.log(error)
            });
    }
    console.log('101', chargesproject)

    const getbenefit = () => {
        axios
            .get(`http://localhost:3001/dataproject/benefitproject/${location.state.project_id}`, {})
            .then((res) => {
                console.log(res.data)
                setBenefitproject(res.data)
            }).catch((error) => {
                console.log(error)
            });
    }
    console.log('102', benefitproject?.benefit_name)

    const closeproject = (id, n) => {
        console.log('tt', id)
        onHide('confirm')
        axios
            .put(`http://localhost:3001/dataproject/closeproject/${id}`, {
                close_project: n
            })
        alert(`ต้องการดำเนินการปิดโครงการใช่มั้ย`)
    }

    const handlType = (e) => {
        const choice = e.target.value
        setEditobjective(choice)
        form.setFieldsValue({ editobjective: choice })
    }

    const showobjective = (item) => {
        setObjectiveid(item.objective_id)
        axios
            .get(`http://localhost:3001/dataevaluation/showobjective/${item.objective_id}`, {})
            .then((res) => {
                setObjective(res.data[0].objective_id)
            })
            .catch((error) => {
                console.log(error)
            });
        setVisible1(true)
    };

    const updateobjective = (id, editobjective) => {
        setVisible1(false)
        axios.put(`http://localhost:3001/dataevaluation/updateobjective/${objectiveid}`, {
            obtain: (editobjective === 'บรรลุ') ? 1 : 0,
        })
        alert(`ต้องการบันทึกข้อมูลใช่มั้ย?`)
        showobjective()
    }

    const handlResult = (e) => {
        const choice = e.target.value
        setResult(choice)
        form.setFieldsValue({ result: choice })
    }

    const addprojectevaluation = async (id) => {
        axios
            .post(`http://localhost:3001/dataevaluation/addprojectevaluation`, {
                project_id: id,
                explanation: explanation,
                result: (result === 'ดำเนินการแล้วเสร็จตามระยะเวลาที่กำหนดไว้ในโครงการ') ? 1 : (result === 'ไม่เป็นไปตามระยะเวลาที่กำหนดไว้ในโครงการ') ? 2 : (result === 'ขอเลื่อนการดำเนินการ') ? 3 : 4,
                motive: motive,
                conducting: conducting,
                real_used: realused,
                benefit: benefit,
                problem: problem,
                improvement: improvement,
                date_time_project: datetime
            }).then((res) => {

            })
        await updatestatusproject(id, result)
        alert(`ต้องการเพิ่มเอกสารประเมินผลโครงการใช่มั้ย?`)
    }

    const updatestatusproject = async (id, result) => {
        console.log('tt', id)
        axios
            .put(`http://localhost:3001/dataproject/confirmproject/${id}`, {
                status: (result === 'ดำเนินการแล้วเสร็จตามระยะเวลาที่กำหนดไว้ในโครงการ') ? 6 : (result === 'ไม่เป็นไปตามระยะเวลาที่กำหนดไว้ในโครงการ') ? 7 : (result === 'ขอเลื่อนการดำเนินการ') ? 8 : 9
            })
    }

    return (
        <>
            <Header onMenuClick={(value) => toggleMobileMenu()} />
            <Sidebar />
            <div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>
                <div className="page-wrapper">
                    <div className="tabview-demo">
                        <TabView>
                            <TabPanel header="รายละเอียดโครงการ">
                                <Panel header='รายละเอียดโครงการ'>
                                    {(location.state.close_project === 0) ? <Button label="ขอปิดโครงการ" severity="danger" style={{ marginLeft: '66em', height: '2.5em' }} onClick={() => onClick('confirm')} /> : <Button label="ขอปิดโครงการ" severity="danger" style={{ marginLeft: '66em', height: '2.5em' }} disabled />}
                                    <div className="fit">
                                        <div className="grid p-fluid">
                                            <div className="col-12 md:col-3">
                                                <h4>ปีงบประมาณ :</h4>
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <h4> {location.state.fiscalyear} </h4>
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
                                                <h4>หน่วยงานที่รับผิดชอบโครงการ :</h4>
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <h4> {sectionproject?.section_name} </h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="fit">
                                        <div className="grid p-fluid">
                                            <div className="col-12 md:col-3">
                                                <h4>ผู้รับผิดชอบโครงการ :</h4>
                                            </div>
                                            <div className="col-12 md:col-9">
                                                {userproject.map((value) => {
                                                    return <h4> {value?.fname + ' ' + value?.lname} </h4>
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="fit">
                                        <div className="grid p-fluid">
                                            <div className="col-12 md:col-3">
                                                <h4>ชื่อแผนยุทธ์ศาสตร์ :</h4>
                                            </div>
                                            <div className="col-12 md:col-9">
                                                {strategicplanproject.map((value) => {
                                                    return <h4> {value?.plan_name} </h4>
                                                })}
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
                                                <h4>ประเภทของโครงการ :</h4>
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <h4> {(location.state.out_plan === 1) ? 'โครงการนอกแผน' : 'โครงการในแผน'} </h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="fit">
                                        <div className="grid p-fluid">
                                            <div className="col-12 md:col-3">
                                                <h4>ลักษณะโครงการ :</h4>
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <h4> {location.state.type} </h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="fit">
                                        <div className="grid p-fluid">
                                            <div className="col-12 md:col-3">
                                                <h4>การบูรณาการโครงการ :</h4>
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <h4> {integrationproject?.integration_name} </h4>
                                                <InputTextarea value={location.state.integra_subject} rows={5} cols={30} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="fit">
                                        <div className="grid p-fluid">
                                            <div className="col-12 md:col-3">
                                                <h4>หลักการและเหตุผล :</h4>
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputTextarea value={location.state.rationale} onChange={(e) => setValue1(e.target.value)} rows={8} cols={50} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="fit">
                                        <div className="grid p-fluid">
                                            <div className="col-12 md:col-3">
                                                <h4>วัตถุประสงค์ :</h4>
                                            </div>
                                            <div className="col-12 md:col-9">
                                                {objectiveproject.map((value) => {
                                                    return <h4> {value?.objective_name} </h4>
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="fit">
                                        <div className="grid p-fluid">
                                            <div className="col-12 md:col-3">
                                                <h4>ตัวชี้วัดความสำเร็จระดับโครงการ :</h4>
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <h4>
                                                    <DataTable value={indicproject} columnResizeMode="fit" showGridlines responsiveLayout="scroll" rows={10}>
                                                        <Column field="indic_project" header="ตัวชี้วัดความสำเร็จ" />
                                                        <Column field="unit" header="หน่วยนับ" />
                                                        <Column field="cost" header="ค่าเป้าหมาย" />
                                                    </DataTable>
                                                </h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="fit">
                                        <div className="grid p-fluid">
                                            <div className="col-12 md:col-3">
                                                <h4>กลุ่มเป้าหมาย :</h4>
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <h4> {location.state.target_group} </h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="fit">
                                        <div className="grid p-fluid">
                                            <div className="col-12 md:col-3">
                                                <h4>ขั้นตอนการดำเนินการ :</h4>
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <h4>
                                                    <DataTable value={stepproject} columnResizeMode="fit" showGridlines responsiveLayout="scroll" rows={10}>
                                                        <Column field="step_name" header="ขั้นตอนการดำเนินการ/รายการกิจกรรม" />
                                                        <Column field="start" header="เริ่มต้น" />
                                                        <Column field="stop" header="สิ้นสุด" />
                                                    </DataTable>
                                                </h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="fit">
                                        <div className="grid p-fluid">
                                            <div className="col-12 md:col-3">
                                                <h4>แหล่งเงิน/ประเภทงบประมาณที่ใช้ :</h4>
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <h4> {location.state.source_name} </h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="fit">
                                        <div className="grid p-fluid">
                                            <div className="col-12 md:col-3">
                                                <h4>ปริมาณการงบประมาณที่ใช้ :</h4>
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <h4> {location.state.butget} บาท</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="fit">
                                        <div className="grid p-fluid">
                                            <div className="col-12 md:col-3">
                                                <h4>แผนงาน :</h4>
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <h4> {workplanproject?.workplan_name} </h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="fit">
                                        <div className="grid p-fluid">
                                            <div className="col-12 md:col-3">
                                                <h4>ประเภทการใช้จ่าย :</h4>
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <h4>
                                                    <DataTable value={chargesproject} columnResizeMode="fit" showGridlines responsiveLayout="scroll" rows={10}>
                                                        <Column field="charges_name_head" header="หัวข้อค่าใช้จ่าย" />
                                                        <Column field="charges_name" header="ประเภทค่าใช้จ่าย" />
                                                        <Column field="quarter_one" header="แผ่นการใช้จ่ายไตรมาส 1" />
                                                        <Column field="quarter_two" header="แผ่นการใช้จ่ายไตรมาส 2" />
                                                        <Column field="quarter_three" header="แผ่นการใช้จ่ายไตรมาส 3" />
                                                        <Column field="quarter_four" header="แผ่นการใช้จ่ายไตรมาส 4" />
                                                    </DataTable>
                                                </h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="fit">
                                        <div className="grid p-fluid">
                                            <div className="col-12 md:col-3">
                                                <h4>ประโยชน์ที่คาดว่าจะได้รับ :</h4>
                                            </div>
                                            <div className="col-12 md:col-9">
                                                {benefitproject.map((value) => {
                                                    return <h4> {value?.benefit_name} </h4>
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="fit">
                                        <div className="grid p-fluid">
                                            <div className="col-12 md:col-3">
                                                <h4>เอกสาร TOR :</h4>
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <h4>{location.state.tor === 0 ? <Tag className="mr-2" severity="danger" value="ยังไม่มีเอกสาร" rounded></Tag> : <i className="pi pi-file-pdf" style={{ fontSize: '2rem', color: 'red', marginRight: '.1em' }}></i>}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </Panel>
                            </TabPanel>
                            <TabPanel header="เอกสารประเมินผลโครงการ">
                                <Panel header='เอกสารประเมินผลโครงการ'>
                                    <div className="fit">
                                        <div className="grid p-fluid">
                                            <div className="col-12 md:col-3">
                                                <h4>คำชี้แจ้ง :</h4>
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputTextarea autoResize value={explanation} onChange={(e) => setExplanation(e.target.value)} style={{ width: '35em' }} placeholder="คำชี้แจ้ง" rows={5} cols={30} />
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
                                                <h4 style={{ marginLeft: "9.5em" }}>ประเด็นยุทธ์ศาสตร์ :</h4>
                                            </div>
                                            <div className="col-12 md:col-8">
                                                <h4> {strategicproject?.strategic_name} </h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="fit">
                                        <div className="grid p-fluid">
                                            <div className="col-12 md:col-3">
                                                <h4 style={{ marginLeft: "9.5em" }}>เป้าประสงค์ :</h4>
                                            </div>
                                            <div className="col-12 md:col-8">
                                                <h4> {goalproject?.goal_name} </h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="fit">
                                        <div className="grid p-fluid">
                                            <div className="col-12 md:col-3">
                                                <h4 style={{ marginLeft: "9.5em" }}>กลยุทธ์ :</h4>
                                            </div>
                                            <div className="col-12 md:col-8">
                                                <h4> {tacticproject?.tactic_name} </h4>
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
                                                <InputTextarea autoResize value={conducting} onChange={(e) => setConducting(e.target.value)} style={{ width: '35em' }} placeholder="วิธีการดำเนินโครงการ" rows={5} cols={30} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="fit">
                                        <div className="grid p-fluid">
                                            <div className="col-12 md:col-3">
                                                <h4>ระยะเวลาในการดำเนินงาน :</h4>
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText value={datetime} onChange={(e) => setDatetime(e.target.value)} style={{ width: '35em' }} placeholder="ระยะเวลาในการดำเนินงาน" />
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
                                                <h4>
                                                    <RadioButton
                                                        inputId="result1"
                                                        name="result"
                                                        value="ดำเนินการแล้วเสร็จตามระยะเวลาที่กำหนดไว้ในโครงการ"
                                                        onChange={handlResult}
                                                        checked={result === "ดำเนินการแล้วเสร็จตามระยะเวลาที่กำหนดไว้ในโครงการ"}
                                                        style={{ marginRight: '.5em' }}
                                                    />
                                                    <label htmlFor="result1" style={{ marginRight: '2em' }}>ดำเนินการแล้วเสร็จตามระยะเวลาที่กำหนดไว้ในโครงการ</label>
                                                </h4>
                                                <h4>
                                                    <RadioButton
                                                        inputId="result2"
                                                        name="result"
                                                        value="ไม่เป็นไปตามระยะเวลาที่กำหนดไว้ในโครงการ"
                                                        onChange={handlResult}
                                                        checked={result === "ไม่เป็นไปตามระยะเวลาที่กำหนดไว้ในโครงการ"}
                                                        style={{ marginRight: '.5em' }}
                                                    />
                                                    <label htmlFor="result2">ไม่เป็นไปตามระยะเวลาที่กำหนดไว้ในโครงการ</label>
                                                </h4>
                                                <h4>
                                                    <RadioButton
                                                        inputId="result3"
                                                        name="result"
                                                        value="ขอเลื่อนการดำเนินการ"
                                                        onChange={handlResult}
                                                        checked={result === "ขอเลื่อนการดำเนินการ"}
                                                        style={{ marginRight: '.5em' }}
                                                    />
                                                    <label htmlFor="result3">ขอเลื่อนการดำเนินการ</label>
                                                </h4>
                                                <h4>
                                                    <RadioButton
                                                        inputId="result4"
                                                        name="result"
                                                        value="เสนอขอยกเลิก"
                                                        onChange={handlResult}
                                                        checked={result === "เสนอขอยกเลิก"}
                                                        style={{ marginRight: '.5em' }}
                                                    />
                                                    <label htmlFor="result4">เสนอขอยกเลิก</label>
                                                </h4>
                                                <div className="col-12 md:col-9">
                                                    <InputText value={motive} onChange={(e) => setMotive(e.target.value)} style={{ width: '33em', marginLeft: '1.5em' }} placeholder="เนื่องจาก" />
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
                                                <InputText value={realused} onChange={(e) => setRealused(e.target.value)} style={{ width: '35em' }} placeholder="ใช้จริง" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="fit">
                                        <div className="grid p-fluid">
                                            <div className="col-12 md:col-3">
                                                <h4>ประโยชน์ที่ได้รับจากการดำเนินโครงการ :</h4>
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputTextarea autoResize value={benefit} onChange={(e) => setBenefit(e.target.value)} style={{ width: '35em' }} placeholder="ประโยชน์ที่ได้รับจากการดำเนินโครงการ" rows={7} cols={30} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="fit">
                                        <div className="grid p-fluid">
                                            <div className="col-12 md:col-3">
                                                <h4>ปัญหา/อุปสรรคในการดำเนินโครงการ :</h4>
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputTextarea autoResize value={problem} onChange={(e) => setProblem(e.target.value)} style={{ width: '35em' }} placeholder="ปัญหา/อุปสรรคในการดำเนินโครงการ" rows={7} cols={30} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="fit">
                                        <div className="grid p-fluid">
                                            <div className="col-12 md:col-3">
                                                <h4>แนวทางการดำเนินการแก้ไข :</h4>
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputTextarea autoResize value={improvement} onChange={(e) => setImprovement(e.target.value)} style={{ width: '35em' }} placeholder="แนวทางการดำเนินการแก้ไข" rows={5} cols={30} />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: '2em', marginLeft: '60em' }} >
                                        <Button type="button" icon="pi pi-times" label='ยกเลิก' style={{ width: '7em', height: '2.5em' }} className="p-button-danger" />
                                        <Button type="button" icon="pi pi-check" label='บันทึก' className="p-button-success" style={{ marginLeft: '.4em', height: '2.5em' }} onClick={() => addprojectevaluation(location.state.project_id)} />
                                    </div>
                                </Panel>
                            </TabPanel>
                        </TabView>
                    </div>

                    <Dialog header="แน่ใจหรือไม่?" visible={confirm} onHide={() => onHide('confirm')} breakpoints={{ '950x': '75vw' }} style={{ width: '40vw' }} footer={renderFooter1('confirm')}>
                        <div className="field" style={{ 'textAlign': 'center' }}>
                            <i className="pi pi-exclamation-circle p-button-warning" style={{ 'fontSize': '8em', 'color': 'orange' }}></i>
                            <p style={{ marginTop: 25 }}><h4>คุณต้องการดำเนินการปิดโครงการใช่มั้ย</h4></p>
                        </div>
                    </Dialog>

                    <Dialog
                        style={{ width: '500px', width: "50vw" }} header="การบรรลุผลวัตถุประสงค์" modal className="p-fluid"
                        visible={visible1}
                        footer={renderFooter2}
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
                                            onChange={handlType}
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
                                            onChange={handlType}
                                            checked={editobjective === "ไม่บรรลุ"}
                                            style={{ marginRight: '.5em' }}
                                        />
                                        <label htmlFor="editobjective2">ไม่บรรลุ</label>
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </Dialog>
                </div>
            </div>
        </>
    );
}

export default DetailprojectevaluationTe