import 'primeicons/primeicons.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.css'
import 'primeflex/primeflex.css'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Dropdown } from 'primereact/dropdown'
import { useHistory } from "react-router-dom";
import Header from '../initialpage/Sidebar/header';
import Sidebar from '../initialpage/Sidebar/sidebar';
import { Card } from "primereact/card";
import { getLocalId } from '../helper/utill'
import { Panel } from 'primereact/panel';

const Datakeepreport = () => {
    const [fiscalyear, setFiscalyear] = useState([])
    const [projectmanager, setProjectmanager] = useState([])
    const [selectedfiscalyear, setSelectedFiscalyear] = useState(null);
    const [value2, setValue2] = useState('')
    const [displayBasic, setDisplayBasic] = useState(false)
    const [menu, setMenu] = useState(false)
    let history = useHistory();

    const dialogFuncMap = {
        'displayBasic': setDisplayBasic,
    }

    const toggleMobileMenu = () => {
        setMenu(!menu)
    }


    const report1 = (node) => {
        console.log('node', node)
        if (node.status === 4 && node.report_one === 1 && node.status_report1 === 0) {
            return <div>
                <Button type="button" icon="pi pi-pencil" className="p-button-warning" style={{ height: '2.5em', width: '2.5em' }} onClick={() => history.push({ pathname: "/home/editkeepreportone", state: node })} />
            </div>
        } else if (node.status === 4 && node.report_one === 1 && node.status_report1 !== 0) {
            return <div>
                <Button type="button" icon="pi pi-pencil" className="p-button-warning" style={{ height: '2.5em', width: '2.5em' }} disabled />
            </div>
        }
        else {
            return <div>
                <Button type="button" icon="pi pi-pencil" className="p-button-warning" style={{ height: '2.5em', width: '2.5em' }} disabled />
            </div>
        }
    }

    const report2 = (node) => {
        if (node.status === 4 && node.report_two === 2 && node.status_report2 === 0) {
            return <div>
                <Button type="button" icon="pi pi-pencil" className="p-button-warning" style={{ height: '2.5em', width: '2.5em' }} onClick={() => history.push({ pathname: "/home/editkeepreporttwo", state: node })} />
            </div>
        } else if (node.status === 4 && node.report_two === 2 && node.status_report2 !== 0) {
            return <div>
                <Button type="button" icon="pi pi-pencil" className="p-button-warning" style={{ height: '2.5em', width: '2.5em' }} disabled />
            </div>
        } else {
            return <div>
                <Button type="button" icon="pi pi-pencil" className="p-button-warning" style={{ height: '2.5em', width: '2.5em' }} disabled />
            </div>
        }
    }

    const report3 = (node) => {
        if (node.status === 4 && node.report_three === 3 && node.status_report3 === 0) {
            return <div>
                <Button type="button" icon="pi pi-pencil" className="p-button-warning" style={{ height: '2.5em', width: '2.5em' }} onClick={() => history.push({ pathname: "/home/editkeepreportthree", state: node })} />
            </div>
        } else if (node.status === 4 && node.report_three === 3 && node.status_report3 !== 0) {
            return <div>
                <Button type="button" icon="pi pi-pencil" className="p-button-warning" style={{ height: '2.5em', width: '2.5em' }} disabled />
            </div>
        } else {
            return <div>
                <Button type="button" icon="pi pi-pencil" className="p-button-warning" style={{ height: '2.5em', width: '2.5em' }} disabled />
            </div>
        }
    }

    const report4 = (node) => {
        if (node.status === 4 && node.report_four === 4 && node.status_report4 === 0) {
            return <div>
                <Button type="button" icon="pi pi-pencil" className="p-button-warning" style={{ height: '2.5em', width: '2.5em' }} onClick={() => history.push({ pathname: "/home/editkeepreportfour", state: node })} />
            </div>
        } else if (node.status === 4 && node.report_four === 4 && node.status_report4 !== 0) {
            return <div>
                <Button type="button" icon="pi pi-pencil" className="p-button-warning" style={{ height: '2.5em', width: '2.5em' }} disabled />
            </div>
        }
        else {
            return <div>
                <Button type="button" icon="pi pi-pencil" className="p-button-warning" style={{ height: '2.5em', width: '2.5em' }} disabled />
            </div>
        }
    }

    useEffect(() => {
        axios
            .get("http://localhost:3001/datproject/fiscalyear", {})
            .then((res) => {
                setFiscalyear(res.data)
            })
            .catch((error) => {
                console.log(error)
            });
    }, []);

    const onsetFiscalyear = (e) => {
        setSelectedFiscalyear(e.value);
    }

    useEffect(() => {
        Project()
    }, []);

    const Project = () => {
        const id = getLocalId()
        console.log('id', id);
        axios
            .get(`http://localhost:3001/dataproject/projectreport/${id}`, {})
            .then((res) => {
                setProjectmanager(res.data)
            })
    }

    return (
        <>
            <Header onMenuClick={(value) => toggleMobileMenu()} />
            <Sidebar />
            <div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>
                <div className="page-wrapper">
                    <Card>
                        <Panel header='จัดการรายงานความก้าวหน้าที่จัดเก็บ'>
                            <div style={{ marginTop: "1em" }}>
                                <DataTable value={projectmanager} columnResizeMode="fit" showGridlines responsiveLayout="scroll" dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}>
                                    <Column field="project_name" header="ชื่อโครงการ" />
                                    <Column body={report1} header="รายงานความก้าวหน้าไตรมาส 1" style={{ textAlign: 'center', width: "15%" }} />
                                    <Column body={report2} header="รายงานความก้าวหน้าไตรมาส 2" style={{ textAlign: 'center', width: "15%" }} />
                                    <Column body={report3} header="รายงานความก้าวหน้าไตรมาส 3" style={{ textAlign: 'center', width: "15%" }} />
                                    <Column body={report4} header="รายงานความก้าวหน้าไตรมาส 4" style={{ textAlign: 'center', width: "15%" }} />
                                </DataTable>
                            </div>
                        </Panel>
                    </Card>
                </div>
            </div >
        </>
    );
}

export default Datakeepreport