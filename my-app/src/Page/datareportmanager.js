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
import { Tag } from 'primereact/tag';
import Header from '../initialpage/Sidebar/header';
import Sidebar from '../initialpage/Sidebar/sidebar';
import { Card } from "primereact/card";
import { Space, Table, Tooltip } from 'antd';
import { RedoOutlined } from '@ant-design/icons'
import { Panel } from 'primereact/panel';

const Datareportmanager = () => {
  const [fiscalyear, setFiscalyear] = useState([])
  const [project, setProject] = useState([])
  const [selectedfiscalyear, setSelectedFiscalyear] = useState(null)

  const [menu, setMenu] = useState(false)
  const { Column, ColumnGroup } = Table
  let history = useHistory()

  const toggleMobileMenu = () => {
    setMenu(!menu)
  }

  const editproject = () => {
    return <div>
      <Button label="จัดการรายงานแผนปฏิบัติการประจำปี" link style={{ height: '2.5em', width: '2.5em' }} onClick={() => history.push({ pathname: "/home/reportplan" })} />
      <Button label="จัดการรายงานแผนปฏิบัติการประจำปี" link style={{ height: '2.5em', width: '2.5em' }} onClick={() => history.push({ pathname: "/home/reportquater" })} />
      <Button label="จัดการรายงานแผนปฏิบัติการประจำปี" link style={{ height: '2.5em', width: '2.5em' }} onClick={() => history.push({ pathname: "/home/reportstragic" })} />
    </div>;
  }


  const report1 = (node) => {
    if (node.report_one === 0 && node.status !== 4 && node.status_report1 === 0) {
      return <Tooltip placement="bottom" title={<span>รายงานความก้าวหน้าไตรมาส 1</span>} ><Button type="button" icon="pi pi-search" className="p-button-secondary" style={{ height: '2.5em', width: '2.5em' }} disabled /></Tooltip>
    } else if (node.status === 4 && node.report_one === 0 && node.open_reportone === 0) {
      return <Tooltip placement="bottom" title={<span>รายงานความก้าวหน้าไตรมาส 1</span>} ><Button type="button" icon="pi pi-search" className="p-button-secondary" style={{ height: '2.5em', width: '2.5em' }} onClick={() => history.push({ pathname: "/home/managerreportone", state: node })} /></Tooltip>
    } else {
      return <Tooltip placement="bottom" title={<span>รายงานความก้าวหน้าไตรมาส 1</span>} ><Button type="button" icon="pi pi-search" className="p-button-secondary" style={{ height: '2.5em', width: '2.5em' }} onClick={() => history.push({ pathname: "/home/reportone", state: node })} /></Tooltip>
    }
  }

  return (
    <>
      <Header onMenuClick={(value) => toggleMobileMenu()} />
      <Sidebar />
      <div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>
        <div className="page-wrapper">
          <Card>
            <Panel header='จัดการรายงาน'>
              <div className="text-left">
                <h4>
                  <Button label="จัดการรายงานโครงการในปีงบประมาณ" link style={{ height: '2.5em' }} onClick={() => history.push({ pathname: "/home/reportstragic" })} />
                </h4>
                <h4>
                  <Button label="จัดการรายงานแผนปฏิบัติการประจำปี" link style={{ height: '2.5em' }} onClick={() => history.push({ pathname: "/home/reportplan" })} />
                </h4>
                <h4>
                  <Button label="จัดการรายงานสถาณะโครงการรายไตรมาส" link style={{ height: '2.5em' }} onClick={() => history.push({ pathname: "/home/reportquater" })} />
                </h4>
                 <h4>
                  <Button label="จัดการรายงานผลการดำเนินงานตามแผนปฏิบัติการประจำปี" link style={{ height: '2.5em' }} onClick={() => history.push({ pathname: "/home/reportplanonly" })} />
                </h4>
                <h4>
                  <Button label="จัดการรายงานความก้าวหน้าผลการดำเนินงานตามแผนปฏิบัติการรายไตรมาส" link style={{ height: '2.5em' }} onClick={() => history.push({ pathname: "/home/reportplanQ" })} />
                </h4>
              </div>
            </Panel>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Datareportmanager