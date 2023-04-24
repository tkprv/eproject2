import React, { useState, useEffect } from 'react'
import { TabView, TabPanel } from 'primereact/tabview';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column'
import { Dialog } from 'primereact/dialog';
import { DataTable } from 'primereact/datatable'
import { InputTextarea } from 'primereact/inputtextarea';
import axios from 'axios'
import moment from "moment";
import { useLocation } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { Card } from "primereact/card";
import { Dropdown } from 'primereact/dropdown';
import { Form } from 'antd';
import { InputText } from 'primereact/inputtext';
import { Calendar } from "primereact/calendar";
import { RadioButton } from "primereact/radiobutton";
import Header from '../initialpage/Sidebar/header';
import Sidebar from '../initialpage/Sidebar/sidebar';
import { Panel } from 'primereact/panel';
import { ExclamationCircleFilled } from "@ant-design/icons"
import { Modal } from "antd"
const { confirm } = Modal

const Editproject = () => {
  const location = useLocation();
  const [form] = Form.useForm();
  const [year, setYear] = useState();
  const [userproject, setUserproject] = useState([]);
  const [datauser, setDatauser] = useState();
  const [userid, setUserid] = useState();
  const [user, setUser] = useState();
  const [Selecteduser, setSelecteduser] = useState(null);
  const [fiscalyearandplanname, setFiscalyearandplanname] = useState([]);
  const [stopen, setStopen] = useState();
  const [stselectfill, setStselectfill] = useState([]);
  const [section, setSection] = useState();
  const [Selectedsection, setSelectedsection] = useState(null);
  const [edittype, setEdittype] = useState();
  const [editkind, setEditkind] = useState();
  const [integration, setIntegration] = useState();
  const [Selectedintegration, setSelectedintegration] = useState(null);
  const [editintegrasubject, setEditintegrasubject] = useState();
  const [objectiveproject, setObjectiveproject] = useState([]);
  const [editobjective, setEditobjective] = useState();
  const [dataobjective, setDataobjective] = useState();
  const [objectiveid, setObjectiveid] = useState();
  const [indicproject, setIndicproject] = useState([]);
  const [editindic, setEditindic] = useState();
  const [dataindic, setDataindic] = useState();
  const [indicid, setIndicid] = useState();
  const [editunit, setEditunit] = useState();
  const [editcost, setEditcost] = useState();
  const [stepproject, setStepproject] = useState([]);
  const [editstep, setEditstep] = useState();
  const [datastep, setDatastep] = useState();
  const [stepid, setStepid] = useState();
  const [editdatest, setEditdatest] = useState();
  const [editdatesp, setEditdatesp] = useState();
  const [selectedbutget, setSelectedbutget] = useState(null)
  const [editrationale, setEditrationale] = useState();
  const [edittargetgroup, setEdittargetgroup] = useState();
  const { ThaiBaht } = require('thai-baht-text-ts');
  const [editmoney, setEditmoney] = useState();
  const pie = parseFloat(editmoney, 10);
  const moneyText = ThaiBaht(pie);
  const [workplan, setWorkplan] = useState();
  const [Selectedworkplan, setSelectedworkplan] = useState(null);
  const [chargesproject, setChargesproject] = useState([]);
  const [chargesid, setChargesid] = useState();
  const [editchargeshead, setEditchargeshead] = useState();
  const [editcharges, setEditcharges] = useState();
  const [datacharges, setDatacharges] = useState();
  const [editcharges1, setEditcharges1] = useState();
  const [editcharges2, setEditcharges2] = useState();
  const [editcharges3, setEditcharges3] = useState();
  const [editcharges4, setEditcharges4] = useState();
  const [benefitproject, setBenefitproject] = useState([]);
  const [editbenefit, setEditbenefit] = useState();
  const [databenefit, setDatabenefit] = useState();
  const [benefitid, setBenefitid] = useState();
  const [edittor, setEdittor] = useState();
  const [strategicplanproject, setStrategicplanproject] = useState([]);
  const [strategicproject, setStrategicproject] = useState([]);
  const [goalproject, setGoalproject] = useState([]);
  const [tacticproject, setTacticproject] = useState([]);
  const [plan, setPlan] = useState();
  const [Selectedplanname, setSelectedplanname] = useState(null);
  const [strategicplan, setStrategicplan] = useState();
  const [planid, setPlanid] = useState();
  const [strategic, setStrategic] = useState([])
  const [Selectedstrategic, setSelectedstrategic] = useState(null);
  const [goal, setGoal] = useState([])
  const [Selectedgoal, setSelectedgoal] = useState(null);
  const [tactic, setTactic] = useState([]);
  const [Selectedtactic, setSelectedtactic] = useState(null);
  const [pro, setPro] = useState();
  const [displayBasic, setDisplayBasic] = useState(false)
  const [displayBasic1, setDisplayBasic1] = useState(false)
  const [displayBasic2, setDisplayBasic2] = useState(false)
  const [displayBasic3, setDisplayBasic3] = useState(false)
  const [displayBasic4, setDisplayBasic4] = useState(false)
  const [displayBasic5, setDisplayBasic5] = useState(false)
  const [displayBasic6, setDisplayBasic6] = useState(false)
  const [displayBasic7, setDisplayBasic7] = useState(false)
  const [displayBasic8, setDisplayBasic8] = useState(false)
  const [displayBasic9, setDisplayBasic9] = useState(false)
  const [displayBasic10, setDisplayBasic10] = useState(false)
  const [menu, setMenu] = useState(false);
  let history = useHistory();

  console.log('44', location.state)

  useEffect(() => {
    showproject()
    Strategicdata()
    getfiscalyearandplanname()
    getstrategicplan()
    getstrategic()
    getgoal()
    gettactic()
    getuser()
    selectsection()
    selectuser()
    selectstrategicplan()
    selectstrategic()
    selectgoal()
    selecttactic()
    selectintegration()
    getobjective()
    getindic()
    getstep()
    selectworkplan()
    getcharges()
    getbenefit()
  }, []);

  const toggleMobileMenu = () => {
    setMenu(!menu)
  }

  const onHide1 = () => {
    setDisplayBasic1(false)
    form.resetFields()
  }

  const onHide2 = () => {
    setDisplayBasic2(false)
    form.resetFields()
  }
  const onHide3 = () => {
    setDisplayBasic3(false)
    form.resetFields()
  }

  const onHide4 = () => {
    setDisplayBasic4(false)
    form.resetFields()
  }

  const onHide5 = () => {
    setDisplayBasic5(false)
    form.resetFields()
  }

  const onHide6 = () => {
    setDisplayBasic6(false)
    form.resetFields()
  }

  const onHide7 = () => {
    setDisplayBasic7(false)
    form.resetFields()
  }

  const onHide8 = () => {
    setDisplayBasic8(false)
    form.resetFields()
  }

  const onHide9 = () => {
    setDisplayBasic9(false)
    form.resetFields()
  }

  const onHide10 = () => {
    setDisplayBasic10(false)
    form.resetFields()
  }

  const onHide = () => {
    setDisplayBasic(false)
    form.resetFields()
  }

  const editdatauser = (node) => {
    return (
      <div>
        <Button
          type="button"
          icon="pi pi-pencil"
          label='แก้ไขผู้รับผิดชอบโครงการ'
          className="p-button-warning"
          style={{ textAlign: 'center', width: '16.5em', height: '2.5em' }}
          onClick={() => showuser(node)}
        ></Button>
      </div>
    );
  }

  const editdatastrategicplan = (node) => {
    return (
      <div>
        <Button
          type="button"
          icon="pi pi-pencil"
          label='แก้ไขแผนยุทธศาสตร์'
          className="p-button-warning"
          style={{ textAlign: 'center', width: '14em', height: '2.5em' }}
          onClick={() => showplan(node)}
        ></Button>
      </div>
    );
  }

  const editdatastrategic = (node) => {
    return (
      <div>
        <Button
          type="button"
          icon="pi pi-pencil"
          label='แก้ไขประเด็นยุทธยุทธศาสตร์'
          className="p-button-warning"
          style={{ textAlign: 'center', width: '18em', height: '2.5em' }}
          onClick={() => showstrategic(node)}
        ></Button>
      </div>
    );
  }

  const editdatagoal = (node) => {
    return (
      <div>
        <Button
          type="button"
          icon="pi pi-pencil"
          label='แก้ไขเป้าประสงค์'
          className="p-button-warning"
          style={{ textAlign: 'center', width: '12em', height: '2.5em' }}
          onClick={() => showgoal(node)}
        ></Button>
      </div>
    );
  }

  const editdatatactic = (node) => {
    return (
      <div>
        <Button
          type="button"
          icon="pi pi-pencil"
          label='แก้ไขกลยุทธ์'
          className="p-button-warning"
          style={{ textAlign: 'center', width: '10em', height: '2.5em' }}
          onClick={() => showtactic(node)}
        ></Button>
      </div>
    );
  }

  const editdataobjective = (node) => {
    return (
      <div>
        <Button
          type="button"
          icon="pi pi-pencil"
          label='แก้ไขวัตถุประสงค์'
          className="p-button-warning"
          style={{ textAlign: 'center', width: '13.5em', height: '2.5em' }}
          onClick={() => showobjective(node)}
        ></Button>
      </div>
    );
  }

  const editdataindic = (node) => {
    return (
      <div>
        <Button
          type="button"
          icon="pi pi-pencil"
          label='แก้ไขตัวชี้วัดความสำเร็จ หน่วยนับ ค่าเป้าหมาย'
          className="p-button-warning"
          style={{ textAlign: 'center', width: '25em', height: '2.5em' }}
          onClick={() => showindic(node)}
        ></Button>
      </div>
    );
  }

  const editdatachargeshead = (node) => {
    return (
      <div>
        <Button
          type="button"
          icon="pi pi-pencil"
          label='แก้ไขประเภทค่าใช้จ่าย'
          className="p-button-warning"
          style={{ textAlign: 'center', width: '15em', height: '2.5em' }}
          onClick={() => showchargeshead(node)}
        ></Button>
      </div>
    );
  }

  const editdatabenefit = (node) => {
    return (
      <div>
        <Button
          type="button"
          icon="pi pi-pencil"
          label='แก้ไขประโยชน์ที่คาดว่าจะได้รับ'
          className="p-button-warning"
          style={{ textAlign: 'center', width: '19em' }}
          onClick={() => showbenefit(node)}
        ></Button>
      </div>
    );
  }

  const editdatastep = (node) => {
    return (
      <div>
        <Button
          type="button"
          icon="pi pi-pencil"
          label='แก้ไขขั้นตอนการดำเนินการ'
          className="p-button-warning"
          style={{ textAlign: 'center', width: '16.5em', height: '2.5em' }}
          onClick={() => showstep(node)}
        ></Button>
      </div>
    );
  }

  const showproject = () => {
    axios
      .get(`http://localhost:3001/dataproject/pro/${location.state.project_id}`, {})
      .then((res) => {
        console.log(res.data)
        setPro(res.data)
        setYear(res.data[0].fiscalyear)
        setEditintegrasubject(res.data[0].integra_subject)
        setEditrationale(res.data[0].rationale)
        setEdittargetgroup(res.data[0].target_group)
        setEditmoney(res.data[0].butget)
      }).catch((error) => {
        console.log(error)
      });
  }
  console.log('22', pro)


  const Strategicdata = () => {
    axios
      .get("http://localhost:3001/editproject/strategic", {})
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

  const onFiscalyear = (e) => {
    //setSelectedSt(e.value);
    setYear(e.value)
    const setst = strategic.filter(
      (strategic) => strategic.fiscalyear_id === e.value.fiscalyear_id
    );
    setStselectfill(setst);
  };

  const selectsection = () => {
    axios
      .get(`http://localhost:3001/editproject/sectionpro`, {})
      .then((res) => {
        console.log(res.data)
        setSection(res.data)
      }).catch((error) => {
        console.log(error)
      });
  }

  const onsetSection = (e) => {
    setSelectedsection(e.target.value);
  }

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

  const showuser = (item) => {
    setDisplayBasic1(true)
    setUserid(item.user_project_id)
    axios
      .get(`http://localhost:3001/editproject/showuserpro/${item.user_project_id}`, {})
      .then((res) => {
        setDatauser(res.data[0].user_project_id)
      })
      .catch((error) => {
        console.log(error)
      });
  };

  const selectuser = () => {
    axios
      .get(`http://localhost:3001/editproject/userpro`, {})
      .then((res) => {
        console.log(res.data)
        setUser(res.data)
      }).catch((error) => {
        console.log(error)
      });
  }

  const onsetUser = (e) => {
    setSelecteduser(e.target.value);
  }

  const updateuser = (id, Selecteduser) => {
    axios.put(`http://localhost:3001/editproject/updateuserproject/${userid}`, {
      user_id: Selecteduser.user_id
    })
    onHide1()
    getuser()
  };

  const getfiscalyearandplanname = async () => {
    await axios
      .get(`http://localhost:3001/dataproject/fiscalyearandplannameproject/${location.state.fiscalyear_id}`)
      .then((res) => {
        console.log(res.data.fiscalyear)
        setFiscalyearandplanname(res.data)
      }).catch((error) => {
        console.log(error)
      });
  }
  console.log('11', fiscalyearandplanname?.plan_name)

  const handlType = (e) => {
    const choice = e.target.value
    setEdittype(choice)
    form.setFieldsValue({ edittype: choice })
  }

  const handlKind = (e) => {
    const choice = e.target.value
    setEditkind(choice)
    form.setFieldsValue({ editkind: choice })

  }

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

  const selectintegration = () => {
    axios
      .get(`http://localhost:3001/editproject/integrationpro`, {})
      .then((res) => {
        console.log(res.data)
        setIntegration(res.data)
      }).catch((error) => {
        console.log(error)
      });
  }

  const onsetIntegration = (e) => {
    setSelectedintegration(e.target.value);
  }

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

  const showobjective = (item) => {
    setDisplayBasic6(true)
    setObjectiveid(item.objective_id)
    axios
      .get(`http://localhost:3001/editproject/showobjective/${item.objective_id}`, {})
      .then((res) => {
        setDataobjective(res.data[0].objective_id)
        setEditobjective(res.data[0].objective_name)
      })
      .catch((error) => {
        console.log(error)
      });
  };

  const updateobjective = (id, editobjective) => {
    axios.put(`http://localhost:3001/editproject/updateobjective/${objectiveid}`, {
      objective_name: editobjective
    })
    onHide6()
    getobjective()
  };

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

  const showindic = (item) => {
    setDisplayBasic7(true)
    setIndicid(item.indic_project_id)
    axios
      .get(`http://localhost:3001/editproject/showindicpro/${item.indic_project_id}`, {})
      .then((res) => {
        setDataindic(res.data[0].indic_project_id)
        setEditindic(res.data[0].indic_project)
        setEditunit(res.data[0].unit)
        setEditcost(res.data[0].cost)
      })
      .catch((error) => {
        console.log(error)
      });
  };

  const updateindic = (id, editindic, editunit, editcost) => {
    axios.put(`http://localhost:3001/editproject/updateindicpro/${indicid}`, {
      indic_project: editindic,
      unit: editunit,
      cost: editcost
    })
    onHide7()
    getindic()
  };

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

  const showstep = (item) => {
    setDisplayBasic8(true)
    setStepid(item.step_id)
    axios
      .get(`http://localhost:3001/editproject/showstep/${item.step_id}`, {})
      .then((res) => {
        setDatastep(res.data[0].step_id)
        setEditstep(res.data[0].step_name)
        setEditdatest(res.data[0].start)
        setEditdatesp(res.data[0].stop)
      })
      .catch((error) => {
        console.log(error)
      });
  };

  const updatestep = (id, editstep, editdatest, editdatesp) => {
    const datest = moment(editdatest).add(543, 'year').format('YYYY-MM-DD')
    const datesp = moment(editdatesp).add(543, 'year').format('YYYY-MM-DD')
    axios.put(`http://localhost:3001/editproject/updatestep/${stepid}`, {
      step_name: editstep,
      start: datest,
      stop: datesp
    })
    onHide8()
    getstep()
  };

  const butget = [
    { name: 'งบประมาณรายได้มหาลัย' },
    { name: 'งบประมาณรายได้ของส่วนงาน' },
    { name: 'งบประมาณรายได้ของแผ่นดิน' },
    { name: 'งบอื่นๆ' },
    { name: 'ไม่ได้ใช้งบประมาณ' }
  ]

  const handleMoney = (e) => {
    setEditmoney(e.target.value)
    form.setFieldsValue({ amount: e.target.value.replace(/[^0-9]*$/, '') })
  }

  const selectworkplan = () => {
    axios
      .get(`http://localhost:3001/editproject/workplanpro`, {})
      .then((res) => {
        console.log(res.data)
        setWorkplan(res.data)
      }).catch((error) => {
        console.log(error)
      });
  }

  const onsetWorkolan = (e) => {
    setSelectedworkplan(e.target.value);
  }

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

  const showchargeshead = (item) => {
    setDisplayBasic9(true)
    setChargesid(item.charges_id)
    axios
      .get(`http://localhost:3001/editproject/showchargeshead/${item.charges_id}`, {})
      .then((res) => {
        setDatacharges(res.data[0].charges_id)
        setEditchargeshead(res.data[0].charges_name_head)
        setEditcharges(res.data[0].charges_name)
        setEditcharges1(res.data[0].quarter_one)
        setEditcharges2(res.data[0].quarter_two)
        setEditcharges3(res.data[0].quarter_three)
        setEditcharges4(res.data[0].quarter_four)
      })
      .catch((error) => {
        console.log(error)
      });
  };

  const updatechrageshead = (id, editchargeshead, editcharges, editcharges1, editcharges2, editcharges3, editcharges4) => {
    axios.put(`http://localhost:3001/editproject/updatechargeshead/${chargesid}`, {
      charges_name_head: editchargeshead,
      charges_name: editcharges,
      quarter_one: editcharges1,
      quarter_two: editcharges2,
      quarter_three: editcharges3,
      quarter_four: editcharges4
    })
    onHide9()
    getcharges()
  };

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

  const showbenefit = (item) => {
    setDisplayBasic10(true)
    setBenefitid(item.benefit_id)
    axios
      .get(`http://localhost:3001/editproject/showbenefit/${item.benefit_id}`, {})
      .then((res) => {
        setDatabenefit(res.data[0].benefit_id)
        setEditbenefit(res.data[0].benefit_name)
      })

      .catch((error) => {
        console.log(error)
      });
  };

  const updatebenefit = (id, editbenefit) => {

    axios.put(`http://localhost:3001/editproject/updatebenefit/${benefitid}`, {
      benefit_name: editbenefit
    })
    onHide10()
    getbenefit()
  };

  const handlTor = (e) => {
    const choice = e.target.value
    setEdittor(choice)
    form.setFieldsValue({ edittor: choice })

  }

  const showplan = (item) => {
    setDisplayBasic2(true)
    setPlanid(item.strategic_project_id)
    axios
      .get(`http://localhost:3001/editmanager/showplan/${item.strategic_project_id}`, {})
      .then((res) => {
        setPlan(res.data[0].strategic_project_id)
      })
      .catch((error) => {
        console.log(error)
      });
  };

  const selectstrategicplan = () => {
    axios
      .get(`http://localhost:3001/editmanager/strategicplanpro`, {})
      .then((res) => {
        console.log(res.data)
        setStrategicplan(res.data)
      }).catch((error) => {
        console.log(error)
      });

  }

  const onsetStrategicplan = (e) => {
    setSelectedplanname(e.value);
  }

  const updatestrategicplan = (id, Selectedplanname) => {
    axios
      .put(`http://localhost:3001/editmanager/updatestrategicplan/${planid}`, {
        plan_id: Selectedplanname.fiscalyear_id
      })
    onHide2()
    getstrategicplan()
  }

  const showstrategic = (item) => {
    setDisplayBasic3(true)
    setPlanid(item.strategic_project_id)
    axios
      .get(`http://localhost:3001/editmanager/showplan/${item.strategic_project_id}`, {})
      .then((res) => {
        setPlan(res.data[0].strategic_project_id)
      })
      .catch((error) => {
        console.log(error)
      });
  };

  const selectstrategic = () => {
    axios
      .get(`http://localhost:3001/editmanager/strategicpro`, {})
      .then((res) => {
        console.log(res.data)
        setStrategic(res.data)
      }).catch((error) => {
        console.log(error)
      });

  }

  const onsetStrategic = (e) => {
    setSelectedstrategic(e.value);
  }

  const updatestrategic = (id, Selectedstrategic) => {
    axios
      .put(`http://localhost:3001/editmanager/updatestrategic/${planid}`, {
        strategic_id: Selectedstrategic.strategic_id
      })
    onHide3()
    getstrategic()
  }

  const showgoal = (item) => {
    setDisplayBasic4(true)
    setPlanid(item.strategic_project_id)
    axios
      .get(`http://localhost:3001/editmanager/showplan/${item.strategic_project_id}`, {})
      .then((res) => {
        setPlan(res.data[0].strategic_project_id)
      })
      .catch((error) => {
        console.log(error)
      });
  };

  const selectgoal = () => {
    axios
      .get(`http://localhost:3001/editmanager/goalpro`, {})
      .then((res) => {
        console.log(res.data)
        setGoal(res.data)
      }).catch((error) => {
        console.log(error)
      });

  }

  const onsetGoal = (e) => {
    setSelectedgoal(e.value);
  }

  const updategoal = (id, Selectedgoal) => {
    axios
      .put(`http://localhost:3001/editmanager/updategoal/${planid}`, {
        goal_id: Selectedgoal.goal_id
      })
    onHide4()
    getgoal()
  }

  const showtactic = (item) => {
    setDisplayBasic5(true)
    setPlanid(item.strategic_project_id)
    axios
      .get(`http://localhost:3001/editmanager/showplan/${item.strategic_project_id}`, {})
      .then((res) => {
        setPlan(res.data[0].strategic_project_id)
      })
      .catch((error) => {
        console.log(error)
      });
  };

  const selecttactic = () => {
    axios
      .get(`http://localhost:3001/editmanager/tacticpro`, {})
      .then((res) => {
        console.log(res.data)
        setTactic(res.data)
      }).catch((error) => {
        console.log(error)
      });

  }

  const onsetTactic = (e) => {
    setSelectedtactic(e.value);
  }

  const updatetactic = (id, Selectedtactic) => {
    axios
      .put(`http://localhost:3001/editmanager/updatetactic/${planid}`, {
        tactic_id: Selectedtactic.tactic_id
      })
    onHide5()
    gettactic()
  }

  const updateproject = (id, year, Selectedsection, Selectedintegration, Selectedworkplan, editkind, editintegrasubject, editrationale, edittargetgroup, editmoney, moneyText, edittor, selectedbudget, edittype) => {
    onHide()
    axios
      .put(`http://localhost:3001/editproject/updateproject/${id}`, {
        fiscalyear: year.fiscalyear,
        section_id: Selectedsection.section_id,
        integration_id: Selectedintegration.integration_id,
        workplan_id: Selectedworkplan.workplan_id,
        type: editkind,
        integra_name: Selectedintegration.integration_name,
        integra_subject: editintegrasubject,
        rationale: editrationale,
        target_group: edittargetgroup,
        butget: editmoney,
        butget_char: moneyText,
        tor: (edittor === 'มี') ? 1 : 0,
        source_name: (selectedbudget === 'ไม่ได้ใช้งบประมาณ') ? null : selectedbudget.name,
        out_plan: (edittype === 'โครงการนอกแผน') ? 1 : 0,
        status: 0
      })
  }

  const showConfirm1 = (value) => {
    confirm({
      title: "ต้องการแก้ไขโครงการใช่มั้ย?",
      icon: <ExclamationCircleFilled />,
      okText: 'ตกลง',
      cancelText: 'ยกเลิก',
      onOk() {
        console.log("ตกลง");
        updateproject(value, year, Selectedsection, Selectedintegration, Selectedworkplan, editkind, editintegrasubject, editrationale, edittargetgroup, editmoney, moneyText, edittor, selectedbutget, edittype)
      },
      onCancel() {
        console.log("ยกเลิก");
      },
    });
  }

  return (
    <>
      <Header onMenuClick={(value) => toggleMobileMenu()} />
      <Sidebar />
      <div className={`main-wrapper ${menu ? 'slide-nav' : ''}`}>
        <div className="page-wrapper">
          <Card>
            <Panel header='รายละเอียดโครงการ'>
              <div className="fit" style={{ marginLeft: '1.5em' }}>
                <div className="grid p-fluid">
                  <div className="col-12 md:col-3">
                    <h4>ปีงบประมาณ :</h4>
                  </div>
                  <div className="col-12 md:col-9">
                    <Dropdown value={year} options={stopen} onChange={onFiscalyear} style={{ width: '10em' }} optionLabel="fiscalyear" placeholder="ปีงบประมาณ" />
                  </div>
                </div>
              </div>
              <div className="fit" style={{ marginLeft: '1.5em' }}>
                <div className="grid p-fluid">
                  <div className="col-12 md:col-3">
                    <h4>ชื่อโครงการ :</h4>
                  </div>
                  <div className="col-12 md:col-9">
                    <h4> {location.state.project_name} </h4>
                  </div>
                </div>
              </div>
              <div className="fit" style={{ marginLeft: '1.5em' }}>
                <div className="grid p-fluid">
                  <div className="col-12 md:col-3">
                    <h4>หน่วยงานที่รับผิดชอบโครงการ :</h4>
                  </div>
                  <div className="col-12 md:col-9">
                    <Dropdown value={Selectedsection} options={section} style={{ width: '30em' }} onChange={onsetSection} optionLabel="section_name" placeholder="หน่วยงานที่รับผิดชอบโครงการ" />
                  </div>
                </div>
              </div>
              <div className="fit" style={{ marginLeft: '1.5em' }}>
                <div className="grid p-fluid">
                  <div className="col-12 md:col-3">
                    <h4>ผู้รับผิดชอบโครงการ :</h4>
                  </div>
                  <div className="col-12 md:col-9">
                    <DataTable value={userproject} columnResizeMode="fit" showGridlines responsiveLayout="scroll" rows={10}>
                      <Column field="fname" header="ชื่อผู้รับผิดชอบโครงการ" />
                      <Column field="lname" header="นามสกุลผู้รับผิดชอบโครงการ" />
                      <Column body={editdatauser} header="จัดการ" style={{ textAlign: 'center', width: '17em' }} />
                    </DataTable>
                  </div>
                </div>
              </div>
              <div className="fit" style={{ marginLeft: '1.5em', marginTop: '1em' }}>
                <div className="grid p-fluid">
                  <div className="col-12 md:col-3">
                    <h4>ชื่อแผนยุทธ์ศาสตร์ :</h4>
                  </div>
                  <h4>
                    <DataTable value={strategicplanproject} columnResizeMode="fit" showGridlines responsiveLayout="scroll" rows={10}>
                      <Column field="plan_name" header="แผนยุทธศาสตร์" />
                      <Column body={editdatastrategicplan} header="จัดการ" style={{ textAlign: 'center' }} />
                    </DataTable>
                  </h4>
                  <div className="col-12 md:col-9">
                    <h4>
                      {fiscalyearandplanname?.plan_name}
                    </h4>
                  </div>
                </div>
              </div>
              <div className="fit" style={{ marginLeft: '1.5em' }}>
                <div className="grid p-fluid">
                  <div className="col-12 md:col-4">
                    <h4 style={{ marginLeft: "9.5em" }}>ประเด็นยุทธ์ศาสตร์ :</h4>
                  </div>
                  <div className="col-12 md:col-8">
                    <h4>
                      <DataTable value={strategicproject} columnResizeMode="fit" showGridlines responsiveLayout="scroll" rows={10}>
                        <Column field="strategic_name" header="ประเด็นยุทธศาสตร์" />
                        <Column body={editdatastrategic} header="จัดการ" style={{ textAlign: 'center' }} />
                      </DataTable>
                    </h4>
                  </div>
                </div>
              </div>
              <div className="fit" style={{ marginLeft: '1.5em' }}>
                <div className="grid p-fluid">
                  <div className="col-12 md:col-4">
                    <h4 style={{ marginLeft: "9.5em" }}>เป้าประสงค์ :</h4>
                  </div>
                  <div className="col-12 md:col-8">
                    <h4>
                      <DataTable value={goalproject} columnResizeMode="fit" showGridlines responsiveLayout="scroll" rows={10}>
                        <Column field="goal_name" header="เป้าประสงค์" />
                        <Column body={editdatagoal} header="จัดการ" style={{ textAlign: 'center' }} />
                      </DataTable>
                    </h4>
                  </div>
                </div>
              </div>
              <div className="fit" style={{ marginLeft: '1.5em' }}>
                <div className="grid p-fluid">
                  <div className="col-12 md:col-4">
                    <h4 style={{ marginLeft: "9.5em" }}>กลยุทธ์ :</h4>
                  </div>
                  <div className="col-12 md:col-8">
                    <h4>
                      <DataTable value={tacticproject} columnResizeMode="fit" showGridlines responsiveLayout="scroll" rows={10}>
                        <Column field="tactic_name" header="กลยุทธ์" />
                        <Column body={editdatatactic} header="จัดการ" style={{ textAlign: 'center' }} />
                      </DataTable>
                    </h4>
                  </div>
                </div>
              </div>
              <div className="fit" style={{ marginLeft: '1.5em' }}>
                <div className="grid p-fluid">
                  <div className="col-12 md:col-3">
                    <h4>ประเภทของโครงการ :</h4>
                  </div>
                  <div className="col-12 md:col-9">
                    <h4>
                      <RadioButton
                        inputId="edittype1"
                        name="edittype"
                        value="โครงการในแผน"
                        onChange={handlType}
                        checked={edittype === "โครงการในแผน"}
                        style={{ marginRight: '.5em' }}
                      />
                      <label htmlFor="edittype1" style={{ marginRight: '1em' }}>โครงการในแผน</label>
                      <RadioButton
                        inputId="edittype2"
                        name="edittype"
                        value="โครงการนอกแผน"
                        onChange={handlType}
                        checked={edittype === "โครงการนอกแผน"}
                        style={{ marginRight: '.5em' }}
                      />
                      <label htmlFor="edittype2">โครงการนอกแผน</label>
                    </h4>
                  </div>
                </div>
              </div>
              <div className="fit" style={{ marginLeft: '1.5em' }}>
                <div className="grid p-fluid">
                  <div className="col-12 md:col-3">
                    <h4>ลักษณะโครงการ :</h4>
                  </div>
                  <div className="col-12 md:col-9">
                    <h4>
                      <RadioButton
                        inputId="editkind1"
                        name="editkind"
                        value="โครงการใหม่"
                        onChange={handlKind}
                        checked={editkind === "โครงการใหม่"}
                        style={{ marginRight: '.5em' }}
                      />
                      <label htmlFor="editkind1" style={{ marginRight: '2em' }}>โครงการใหม่</label>
                      <RadioButton
                        inputId="editkind2"
                        name="editkind"
                        value="โครงการต่อเนื่อง"
                        onChange={handlKind}
                        checked={editkind === "โครงการต่อเนื่อง"}
                        style={{ marginRight: '.5em' }}
                      />
                      <label htmlFor="editkind2" style={{ marginRight: '2em' }}>โครงการต่อเนื่อง</label>
                      <RadioButton
                        inputId="editkind3"
                        name="editkind"
                        value="งานประจำ"
                        onChange={handlKind}
                        checked={editkind === "งานประจำ"}
                        style={{ marginRight: '.5em' }}
                      />
                      <label htmlFor="editkind3" style={{ marginRight: '2em' }}>งานประจำ</label>
                      <RadioButton
                        inputId="editkind4"
                        name="editkind"
                        value="งานพัฒนา"
                        onChange={handlKind}
                        checked={editkind === "งานพัฒนา"}
                        style={{ marginRight: '.5em' }}
                      />
                      <label htmlFor="editkind4">งานพัฒนา</label>
                    </h4>
                  </div>
                </div>
              </div>
              <div className="fit" style={{ marginLeft: '1.5em' }}>
                <div className="grid p-fluid">
                  <div className="col-12 md:col-3">
                    <h4>การบูรณาการโครงการ :</h4>
                  </div>
                  <div className="col-12 md:col-9">
                    <h4>
                      <Dropdown value={Selectedintegration} options={integration} onChange={onsetIntegration} style={{ width: '30em' }} optionLabel="integration_name" placeholder="หัวข้อการบูรณาการโครงการ" />
                    </h4>
                    <InputTextarea value={editintegrasubject} onChange={(e) => setEditintegrasubject(e.target.value)} placeholder='การบูรณาการโครงการ' rows={5} cols={30} />
                  </div>
                </div>
              </div>
              <div className="fit" style={{ marginLeft: '1.5em' }}>
                <div className="grid p-fluid">
                  <div className="col-12 md:col-3">
                    <h4>หลักการและเหตุผล :</h4>
                  </div>
                  <div className="col-12 md:col-9">
                    <InputTextarea value={editrationale} onChange={(e) => setEditrationale(e.target.value)} placeholder='หลักการและเหตุผล' rows={8} cols={50} />
                  </div>
                </div>
              </div>
              <div className="fit" style={{ marginLeft: '1.5em' }}>
                <div className="grid p-fluid">
                  <div className="col-12 md:col-3">
                    <h4>วัตถุประสงค์ :</h4>
                  </div>
                  <div className="col-12 md:col-9">
                    <h4>
                      <DataTable value={objectiveproject} columnResizeMode="fit" showGridlines responsiveLayout="scroll" rows={10}>
                        <Column field="objective_name" header="วัตถุประสงค์" />
                        <Column body={editdataobjective} header="จัดการ" style={{ textAlign: 'center' }} />
                      </DataTable>
                    </h4>
                  </div>
                </div>
              </div>
              <div className="fit" style={{ marginLeft: '1.5em' }}>
                <div className="grid p-fluid">
                  <div className="col-12 md:col-3">
                    <h4>ตัวชี้วัดความสำเร็จระดับโครงการ :</h4>
                  </div>
                  <div className="col-12 md:col-9">
                    <h4>
                      <DataTable value={indicproject} columnResizeMode="fit" showGridlines responsiveLayout="scroll" rows={10}>
                        <Column field="indic_project" header="ตัวชี้วัดความสำเร็จ" />
                        <Column field="unit" header="หน่วยนับ" style={{ textAlign: 'center', width: '6em' }} />
                        <Column field="cost" header="ค่าเป้าหมาย" style={{ textAlign: 'center', width: '7.5em' }} />
                        <Column body={editdataindic} header="จัดการ" style={{ textAlign: 'center', width: '15em' }} />
                      </DataTable>
                    </h4>
                  </div>
                </div>
              </div>
              <div className="fit" style={{ marginLeft: '1.5em' }}>
                <div className="grid p-fluid">
                  <div className="col-12 md:col-3">
                    <h4>กลุ่มเป้าหมาย :</h4>
                  </div>
                  <div className="col-12 md:col-9">
                    <InputText value={edittargetgroup} onChange={(e) => setEdittargetgroup(e.target.value)} style={{ width: '35em' }} placeholder="กลุ่มเป้าหมาย" />
                  </div>
                </div>
              </div>
              <div className="fit" style={{ marginLeft: '1.5em' }}>
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
                        <Column body={editdatastep} header="จัดการ" style={{ textAlign: 'center', width: '17em' }} />
                      </DataTable>
                    </h4>
                  </div>
                </div>
              </div>
              <div className="fit" style={{ marginLeft: '1.5em' }}>
                <div className="grid p-fluid">
                  <div className="col-12 md:col-3">
                    <h4>แหล่งเงิน/ประเภทงบประมาณที่ใช้ :</h4>
                  </div>
                  <div className="col-12 md:col-9">
                    <Dropdown value={selectedbutget} onChange={(e) => setSelectedbutget(e.target.value)} options={butget} optionLabel="name" placeholder="แหล่งเงิน/ประเภทงบประมาณที่ใช้" style={{ width: '30em' }} />
                  </div>
                </div>
              </div>
              <div className="fit" style={{ marginLeft: '1.5em' }}>
                <div className="grid p-fluid">
                  <div className="col-12 md:col-3">
                    <h4>ปริมาณการงบประมาณที่ใช้ :</h4>
                  </div>
                  <div className="col-12 md:col-3">
                    <InputText value={editmoney} onChange={handleMoney} style={{ width: '20em' }} placeholder="ปริมาณการงบประมาณที่ใช้ " />
                  </div>
                  <div className="col-12 md:col-3">
                    <div className="p-inputgroup">
                      {editmoney && <h4 style={{ marginLeft: '2em', marginTop: '.6em' }}>{moneyText}</h4>}
                    </div>
                  </div>
                </div>
              </div>
              <div className="fit" style={{ marginLeft: '1.5em' }}>
                <div className="grid p-fluid">
                  <div className="col-12 md:col-3">
                    <h4>แผนงาน :</h4>
                  </div>
                  <div className="col-12 md:col-9">
                    <Dropdown value={Selectedworkplan} options={workplan} style={{ width: '30em' }} onChange={onsetWorkolan} optionLabel="workplan_name" placeholder="แผนงาน" />
                  </div>
                </div>
              </div>
              <div className="fit" style={{ marginLeft: '1.5em' }}>
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
                        <Column body={editdatachargeshead} header="จัดการ" style={{ textAlign: 'center', width: '17em' }} />
                      </DataTable>
                    </h4>
                  </div>
                </div>
              </div>
              <div className="fit" style={{ marginLeft: '1.5em' }}>
                <div className="grid p-fluid">
                  <div className="col-12 md:col-3">
                    <h4>ประโยชน์ที่คาดว่าจะได้รับ :</h4>
                  </div>
                  <div className="col-12 md:col-9">
                    <h4>
                      <DataTable value={benefitproject} columnResizeMode="fit" showGridlines responsiveLayout="scroll" rows={10}>
                        <Column field="benefit_name" header="ประโยชน์ที่ควาดว่าจะได้รับ" />
                        <Column body={editdatabenefit} header="จัดการ" style={{ textAlign: 'center', width: '15em' }} />
                      </DataTable>
                    </h4>
                  </div>
                </div>
              </div>
              <div className="fit" style={{ marginLeft: '1.5em' }}>
                <div className="grid p-fluid">
                  <div className="col-12 md:col-3">
                    <h4>เอกสาร TOR :</h4>
                  </div>
                  <div className="col-12 md:col-9">
                    <h4>
                      <RadioButton
                        inputId="edittor1"
                        name="edittor"
                        value="มี"
                        onChange={handlTor}
                        checked={edittor === "มี"}
                        style={{ marginRight: '.5em' }}
                      />
                      <label htmlFor="edittor1" style={{ marginRight: '2em' }}>มี</label>
                      <RadioButton
                        inputId="edittor"
                        name="edittor"
                        value="ไม่มี"
                        onChange={handlTor}
                        checked={edittor === "ไม่มี"}
                        style={{ marginRight: '.5em' }}
                      />
                      <label htmlFor="edittor2">ไม่มี</label>
                    </h4>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: '2em', marginLeft: '70em' }} >
                <Button label="บันทึก" className="p-button-success" style={{ height: '2.5em' }} onClick={() => showConfirm1(location.state.project_id)} />
              </div>
            </Panel>
          </Card>

          <div>
            <Modal
              title={<p className="m-0">{'แก้ไขข้อมูลผู้รับผิดชอบโครงการ'}</p>}
              open={displayBasic1}
              onCancel={onHide1}
              footer={null}
              width={700}
            >
              <div className="fit" style={{ marginLeft: '1.5em' }}>
                <div className="grid p-fluid">
                  <div className="col-12 md:col-5">
                    <h4 style={{ marginTop: '.5em' }}>ชื่อผู้รับผิดชอบโครงการ</h4>
                  </div>
                  <div className="col-12 md:col-1">
                    <Dropdown value={Selecteduser} options={user} onChange={onsetUser} style={{ width: '21.5em' }} optionLabel="fname" placeholder="ชื่อผู้รับผิดชอบโครงการ" />
                  </div>
                </div>
              </div>
              <div className="fit" style={{ marginLeft: '1.5em' }}>
                <div className="grid p-fluid">
                  <div className="col-12 md:col-5">
                    <h4>นามสกุลผู้รับผิดชอบโครงการ</h4>
                  </div>
                  <div className="col-12 md:col-1">
                    <Dropdown value={Selecteduser} options={user} onChange={onsetUser} style={{ width: '21.5em' }} optionLabel="lname" placeholder="นามสกุลผู้รับผิดชอบโครงการ" />
                  </div>
                </div>
              </div>
              <div className="text-right mt-4">
                <Button label="ยกเลิก" icon="pi pi-times" className="p-button-danger" style={{ marginRight: '.5em', height: '2.5em' }} onClick={onHide1} />
                <Button label="บันทึก" icon="pi pi-check" className="p-button-success" style={{ height: '2.5em' }} onClick={() => updateuser(userid, Selecteduser)} autoFocus />
              </div>
            </Modal>
          </div>
          <div>
            <Modal
              title={<p className="m-0">{'แก้ไขข้อมูลแผนยุทธศาสตร์'}</p>}
              open={displayBasic2}
              onCancel={onHide2}
              footer={null}
              width={700}
            >
              <div className="fit" style={{ marginLeft: '1.5em' }}>
                <div className="grid p-fluid">
                  <div className="col-12 md:col-3">
                    <h4 style={{ marginTop: '.5em' }}>แผนยุทธศาสตร์</h4>
                  </div>
                  <div className="col-12 md:col-1">
                    <Dropdown value={Selectedplanname} options={strategicplan} onChange={onsetStrategicplan} style={{ width: '28.5em' }} optionLabel="plan_name" placeholder="แผนยุทธศาสตร์" />
                  </div>
                </div>
              </div>
              <div className="text-right mt-4">
                <Button label="ยกเลิก" icon="pi pi-times" className="p-button-danger" style={{ marginRight: '.5em', height: '2.5em' }} onClick={onHide2} />
                <Button label="บันทึก" icon="pi pi-check" className="p-button-success" style={{ height: '2.5em' }} onClick={() => updatestrategicplan(planid, Selectedplanname)} autoFocus />
              </div>
            </Modal>
          </div>
          <div>
            <Modal
              title={<p className="m-0">{'แก้ไขข้อมูลประเด็นยุทธศาสตร์'}</p>}
              open={displayBasic3}
              onCancel={onHide3}
              footer={null}
              width={700}
            >
              <div className="fit" style={{ marginLeft: '1.5em' }}>
                <div className="grid p-fluid">
                  <div className="col-12 md:col-3">
                    <h4 style={{ marginTop: '.5em' }}>ประเด็นยุทธศาสตร์</h4>
                  </div>
                  <div className="col-12 md:col-1">
                    <Dropdown value={Selectedstrategic} options={strategic} onChange={onsetStrategic} style={{ width: '28.5em' }} optionLabel="strategic_name" placeholder="ประเด็นยุทธศาสตร์" />
                  </div>
                </div>
              </div>
              <div className="text-right mt-4">
                <Button label="ยกเลิก" icon="pi pi-times" className="p-button-danger" style={{ marginRight: '.5em', height: '2.5em' }} onClick={onHide3} />
                <Button label="บันทึก" icon="pi pi-check" className="p-button-success" style={{ height: '2.5em' }} onClick={() => updatestrategic(planid, Selectedstrategic)} autoFocus />
              </div>
            </Modal>
          </div>
          <div>
            <Modal
              title={<p className="m-0">{'แก้ไขข้อมูลเป้าประสงค์'}</p>}
              open={displayBasic4}
              onCancel={onHide4}
              footer={null}
              width={700}
            >
              <div className="fit" style={{ marginLeft: '1.5em' }}>
                <div className="grid p-fluid">
                  <div className="col-12 md:col-2">
                    <h4 style={{ marginTop: '.5em' }}>เป้าประสงค์</h4>
                  </div>
                  <div className="col-12 md:col-1">
                    <Dropdown value={Selectedgoal} options={goal} onChange={onsetGoal} style={{ width: '32em' }} optionLabel="goal_name" placeholder="เป้าประสงค์" />
                  </div>
                </div>
              </div>
              <div className="text-right mt-4">
                <Button label="ยกเลิก" icon="pi pi-times" className="p-button-danger" style={{ marginRight: '.5em', height: '2.5em' }} onClick={onHide4} />
                <Button label="บันทึก" icon="pi pi-check" className="p-button-success" style={{ height: '2.5em' }} onClick={() => updategoal(planid, Selectedgoal)} autoFocus />
              </div>
            </Modal>
          </div>
          <div>
            <Modal
              title={<p className="m-0">{'แก้ไขข้อมูลกลยุทธ์'}</p>}
              open={displayBasic5}
              onCancel={onHide5}
              footer={null}
              width={700}
            >
              <div className="fit" style={{ marginLeft: '1.5em' }}>
                <div className="grid p-fluid">
                  <div className="col-12 md:col-2">
                    <h4 style={{ marginTop: '.5em' }}>กลยุทธ์</h4>
                  </div>
                  <div className="col-12 md:col-1">
                    <Dropdown value={Selectedtactic} options={tactic} onChange={onsetTactic} style={{ width: '32em' }} optionLabel="tactic_name" placeholder="กลยุทธ์" />
                  </div>
                </div>
              </div>
              <div className="text-right mt-4">
                <Button label="ยกเลิก" icon="pi pi-times" className="p-button-danger" style={{ marginRight: '.5em', height: '2.5em' }} onClick={onHide5} />
                <Button label="บันทึก" icon="pi pi-check" className="p-button-success" style={{ height: '2.5em' }} onClick={() => updatetactic(planid, Selectedtactic)} autoFocus />
              </div>
            </Modal>
          </div>
          <div>
            <Modal
              title={<p className="m-0">{'แก้ไขข้อมูลวัตถุประสงค์'}</p>}
              open={displayBasic6}
              onCancel={onHide6}
              footer={null}
              width={700}
            >
              <div className="fit" style={{ marginLeft: '1.5em' }}>
                <div className="grid p-fluid">
                  <div className="col-12 md:col-2">
                    <h4 style={{ marginTop: '.5em' }}>วัตถุประสงค์</h4>
                  </div>
                  <div className="col-12 md:col-5">
                    <InputText
                      value={editobjective}
                      onChange={(e) => setEditobjective(e.target.value)}
                      style={{ width: '31.5em' }}
                      placeholder="วัตถุประสงค์"
                    />
                  </div>
                </div>
              </div>
              <div className="text-right mt-4">
                <Button label="ยกเลิก" icon="pi pi-times" className="p-button-danger" style={{ marginRight: '.5em', height: '2.5em' }} onClick={onHide6} />
                <Button label="บันทึก" icon="pi pi-check" className="p-button-success" style={{ height: '2.5em' }} onClick={() => updateobjective(objectiveid, editobjective)} autoFocus />
              </div>
            </Modal>
          </div>
          <div>
            <Modal
              title={<p className="m-0">{'แก้ไขข้อมูลตัวชี้วัด หน่วยนับ และค่าเป้าหมาย'}</p>}
              open={displayBasic7}
              onCancel={onHide7}
              footer={null}
              width={700}
            >
              <div className="fit" style={{ marginLeft: '1.5em' }}>
                <div className="grid p-fluid">
                  <div className="col-12 md:col-3">
                    <h4 style={{ marginTop: '.5em' }}>ตัวชี้วัดความสำเร็จ</h4>
                  </div>
                  <div className="col-10 md:col-1">
                    <InputText
                      value={editindic}
                      onChange={(e) => setEditindic(e.target.value)}
                      style={{ width: '28.5em' }}
                      placeholder="ตัวชี้วัดความสำเร็จ"
                    />
                  </div>
                </div>
              </div>
              <div className="fit" style={{ marginLeft: '1.5em' }}>
                <div className="grid p-fluid">
                  <div className="col-12 md:col-3">
                    <h4>หน่วยนับ</h4>
                  </div>
                  <div className="col-10 md:col-1">
                    <InputText
                      value={editunit}
                      onChange={(e) => setEditunit(e.target.value)}
                      style={{ width: '28.5em' }}
                      placeholder="หน่วยนับ"
                    />
                  </div>
                </div>
              </div>
              <div className="fit" style={{ marginLeft: '1.5em' }}>
                <div className="grid p-fluid">
                  <div className="col-12 md:col-3">
                    <h4>ค่าเป้าหมาย</h4>
                  </div>
                  <div className="col-10 md:col-1">
                    <InputText
                      value={editcost}
                      onChange={(e) => setEditcost(e.target.value)}
                      style={{ width: '28.5em' }}
                      placeholder="ค่าเป้าหมาย"
                    />
                  </div>
                </div>
              </div>
              <div className="text-right mt-4">
                <Button label="ยกเลิก" icon="pi pi-times" className="p-button-danger" style={{ marginRight: '.5em', height: '2.5em' }} onClick={onHide7} />
                <Button label="บันทึก" icon="pi pi-check" className="p-button-success" style={{ height: '2.5em' }} onClick={() => updateindic(indicid, editindic, editunit, editcost)} autoFocus />
              </div>
            </Modal>
          </div>
          <div>
            <Modal
              title={<p className="m-0">{'แก้ไขข้อมูลขั้นตอนดำเนินการ'}</p>}
              open={displayBasic8}
              onCancel={onHide8}
              footer={null}
              width={700}
            >
              <div className="fit" style={{ marginLeft: '1.5em' }}>
                <div className="grid p-fluid">
                  <div className="col-12 md:col-4">
                    <h4 style={{ marginTop: '.5em' }}>ขั้นตอนการดำเนินการ</h4>
                  </div>
                  <div className="col-10 md:col-1">
                    <InputText
                      value={editstep}
                      onChange={(e) => setEditstep(e.target.value)}
                      style={{ width: '25em' }}
                      placeholder="ขั้นตอนการดำเนินการ"
                    />
                  </div>
                </div>
              </div>
              <div className="fit" style={{ marginLeft: '1.5em' }}>
                <div className="grid p-fluid">
                  <div className="col-12 md:col-4">
                    <h4>เริ่มต้น</h4>
                  </div>
                  <div className="col-12 md:col-8">
                    <Calendar
                      id="basic"
                      placeholder="เลือกวันที่เริ่มต้น"
                      value={editdatest}
                      onChange={(e) => setEditdatest(e.target.value)}
                      style={{ width: '25em' }}
                    />
                  </div>
                </div>
              </div>
              <div className="fit" style={{ marginLeft: '1.5em' }}>
                <div className="grid p-fluid">
                  <div className="col-12 md:col-4">
                    <h4>สิ้นสุด</h4>
                  </div>
                  <div className="col-12 md:col-8">
                    <Calendar
                      id="basic"
                      placeholder="เลือกวันที่สิ้นสุด"
                      value={editdatesp}
                      onChange={(e) => setEditdatesp(e.target.value)}
                      style={{ width: '25em' }}
                    />
                  </div>
                </div>
              </div>
              <div className="text-right mt-4">
                <Button label="ยกเลิก" icon="pi pi-times" className="p-button-danger" style={{ marginRight: '.5em', height: '2.5em' }} onClick={onHide8} />
                <Button label="บันทึก" icon="pi pi-check" className="p-button-success" style={{ height: '2.5em' }} onClick={() => updatestep(stepid, editstep, editdatest, editdatesp)} autoFocus />
              </div>
            </Modal>
          </div>
          <div>
            <Modal
              title={<p className="m-0">{'แก้ไขข้อมูลประเภทค่าใช้จ่าย'}</p>}
              open={displayBasic9}
              onCancel={onHide9}
              footer={null}
              width={700}
            >
              <div className="fit" style={{ marginLeft: '1.5em' }}>
                <div className="grid p-fluid">
                  <div className="col-12 md:col-4">
                    <h4 style={{ marginTop: '.5em' }}>หัวข้อค่าใช้จ่าย</h4>
                  </div>
                  <div className="col-12 md:col-1">
                    <InputText
                      value={editchargeshead}
                      onChange={(e) => setEditchargeshead(e.target.value)}
                      style={{ width: '25em' }}
                      placeholder="หัวข้อค่าใช้จ่าย"
                    />
                  </div>
                </div>
              </div>
              <div className="fit" style={{ marginLeft: '1.5em' }}>
                <div className="grid p-fluid">
                  <div className="col-12 md:col-4">
                    <h4>ประเภทค่าใช้จ่าย</h4>
                  </div>
                  <div className="col-10 md:col-1">
                    <InputText
                      value={editcharges}
                      onChange={(e) => setEditcharges(e.target.value)}
                      style={{ width: '25em' }}
                      placeholder="ประเภทค่าใช้จ่าย"
                    />
                  </div>
                </div>
              </div>
              <div className="fit" style={{ marginLeft: '1.5em' }}>
                <div className="grid p-fluid">
                  <div className="col-12 md:col-4">
                    <h4>แผนการใช้จ่ายไตรมาส 1</h4>
                  </div>
                  <div className="col-10 md:col-1">
                    <InputText
                      value={editcharges1}
                      onChange={(e) => setEditcharges1(e.target.value)}
                      style={{ width: '25em' }}
                      placeholder="แผนการใช้จ่ายไตรมาส 1"
                    />
                  </div>
                </div>
              </div>
              <div className="fit" style={{ marginLeft: '1.5em' }}>
                <div className="grid p-fluid">
                  <div className="col-12 md:col-4">
                    <h4>แผนการใช้จ่ายไตรมาส 2</h4>
                  </div>
                  <div className="col-10 md:col-1">
                    <InputText
                      value={editcharges2}
                      onChange={(e) => setEditcharges2(e.target.value)}
                      style={{ width: '25em' }}
                      placeholder="แผนการใช้จ่ายไตรมาส 2"
                    />
                  </div>
                </div>
              </div>
              <div className="fit" style={{ marginLeft: '1.5em' }}>
                <div className="grid p-fluid">
                  <div className="col-12 md:col-4">
                    <h4>แผนการใช้จ่ายไตรมาส 3</h4>
                  </div>
                  <div className="col-10 md:col-1">
                    <InputText
                      value={editcharges3}
                      onChange={(e) => setEditcharges3(e.target.value)}
                      style={{ width: '25em' }}
                      placeholder="แผนการใช้จ่ายไตรมาส 3"
                    />
                  </div>
                </div>
              </div>
              <div className="fit" style={{ marginLeft: '1.5em' }}>
                <div className="grid p-fluid">
                  <div className="col-12 md:col-4">
                    <h4>แผนการใช้จ่ายไตรมาส 4</h4>
                  </div>
                  <div className="col-10 md:col-1">
                    <InputText
                      value={editcharges4}
                      onChange={(e) => setEditcharges4(e.target.value)}
                      style={{ width: '25em' }}
                      placeholder="แผนการใช้จ่ายไตรมาส 4"
                    />
                  </div>
                </div>
              </div>
              <div className="text-right mt-4">
                <Button label="ยกเลิก" icon="pi pi-times" className="p-button-danger" style={{ marginRight: '.5em', height: '2.5em' }} onClick={onHide9} />
                <Button label="บันทึก" icon="pi pi-check" className="p-button-success" style={{ height: '2.5em' }} onClick={() => updatechrageshead(chargesid, editchargeshead, editcharges, editcharges1, editcharges2, editcharges3, editcharges4)} autoFocus />
              </div>
            </Modal>
          </div>
          <div>
            <Modal
              title={<p className="m-0">{'แก้ไขข้อมูลประโยช์ที่คาดว่าจะได้รับ'}</p>}
              open={displayBasic10}
              onCancel={onHide10}
              footer={null}
              width={700}
            >
              <div className="fit" style={{ marginLeft: '1.5em' }}>
              <div className="grid p-fluid">
                <div className="col-12 md:col-4">
                  <h4 style={{ marginTop: '.5em' }}>ประโยช์ที่คาดว่าจะได้รับ</h4>
                </div>
                <div className="col-12 md:col-1">
                  <InputText
                    value={editbenefit}
                    onChange={(e) => setEditbenefit(e.target.value)}
                    style={{ width: '25em' }}
                    placeholder="ประโยช์ที่คาดว่าจะได้รับ"
                  />
                </div>
              </div>
            </div>
              <div className="text-right mt-4">
                <Button label="ยกเลิก" icon="pi pi-times" className="p-button-danger" style={{ marginRight: '.5em', height: '2.5em' }} onClick={onHide10} />
                <Button label="บันทึก" icon="pi pi-check" className="p-button-success" style={{ height: '2.5em' }} onClick={() => updatebenefit(benefitid, editbenefit)} autoFocus />
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}

export default Editproject