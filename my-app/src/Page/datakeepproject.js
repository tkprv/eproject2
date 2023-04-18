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

const Datakeepproject = () => {
    const [fiscalyear, setFiscalyear] = useState([])
    const [selectedfiscalyear, setSelectedFiscalyear] = useState(null);
    const [keepproject, setKeepproject] = useState([])
    const [displayBasic, setDisplayBasic] = useState(false)
    const [menu, setMenu] = useState(false)
    let history = useHistory();

    const dialogFuncMap = {
        'displayBasic': setDisplayBasic,
    }

    const toggleMobileMenu = () => {
        setMenu(!menu)
    }

    useEffect(() => {
        Project()
    }, [])

    const detailproject = (node) => {
        return <div>
            <Button type="button" icon="pi pi-eye" style={{ height: '2.5em', width: '2.5em'}} className="p-button-outlined p-button-secondary" onClick={() => history.push({ pathname: "/home/detailproject", state: node })} />
        </div>

    }

    const manageproject = (node) => {
        return <div>
            <Button type="button" icon="pi pi-pencil" className="p-button-warning" style={{ height: '2.5em', width: '2.5em'}} onClick={() => history.push({ pathname: "/home/editkeepproject", state: node })} />
        </div>
    }

    useEffect(() => {
        Project()
    }, []);

    const Project = () => {
        const id = getLocalId()
        console.log('id', id);
        axios
            .get(`http://localhost:3001/datakeepproject/project/${id}`, {})
            .then((res) => {
                setKeepproject(res.data)
            })
    }

    return (
        <>
            <Header onMenuClick={(value) => toggleMobileMenu()} />
            <Sidebar />
            <div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>
                <div className="page-wrapper">
                    <div style={{ marginTop: '.5em', marginLeft: '1.5em' }}>
                        <h3>จัดการข้อมูลโครงการ</h3>
                    </div>
                    <Card>
                        <div className="text-left">
                            <div style={{ marginTop: "2.5em" }}>
                                <DataTable value={keepproject} columnResizeMode="fit" showGridlines responsiveLayout="scroll" dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}>
                                    <Column field="project_name" header="ชื่อโครงการ" />
                                    <Column body={detailproject} header="รายละเอียดโครงการ" style={{ textAlign: 'center', width: "15%" }} />
                                    <Column body={manageproject} header="จัดการ" style={{ textAlign: 'center', width: "14%" }} />
                                </DataTable>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    );
}

export default Datakeepproject