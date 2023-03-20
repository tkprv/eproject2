// import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css';


// import Admindashboard from './Page/admindashboard';
// import Header from './initialpage/Sidebar/header';
// import Sidebar from './initialpage/Sidebar/sidebar';
// import Navbar from './Page/Navbar';
// import Login from './Page/login'
// import Managesys from './Page/managesys'
// import Manageuser from './Page/manageuser'
// import Strategicplan from './Page/strategicplan'
// import Strategicissues from './Page/strategicissues'
// import Goaldetail from './Page/goaldetail'
// import Newproject from './Page/newproject'

// const App = () => {

//   return (
//       <Router>
//           <Switch>
            //   <Route exact path="/Page/login" render={(props) => (<Login/>)}></Route>
            //   <Route path="/Page/admindashboard" render={(props) => (<Admindashboard/>)}></Route>
            //   <Route path="/Page/header" render={(props) => (<Header/>)}></Route>
            //   <Route path="/Page/sidebar" render={(props) => (<Sidebar/>)}></Route>
            //   <Route path="/Page/navbar" render={(props) => (<Navbar/>)}></Route>
            //   <Route path="/manage" render={(props) => (<Managesys/>)}></Route>
            //   <Route path="/Page/manageUser" render={(props) => (<Manageuser/>)}></Route>
            //   <Route path="/Page/strategicplan" render={(props) => (<Strategicplan/>)}></Route>
            //   <Route path="/Page/strategicissues" render={(props) => (<Strategicissues/>)}></Route>
            //   <Route path="/home/goaldetail" render={(props) => (<Goaldetail/>)}></Route>
//               <Route path="/Page/Newproject" render={(props) => (<Newproject/>)}></Route>


    
//               <Redirect to={{pathname: '/Page/login'}}/>
//           </Switch>
//       </Router>

//   )
// }

//  export default App

import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


import Admindashboard from './Page/admindashboard';
import Header from './initialpage/Sidebar/header';
import Sidebar from './initialpage/Sidebar/sidebar';
import Navbar from './Page/Navbar';
import Login from './Page/login'
import Managesys from './Page/managesys'
import Manageuser from './Page/manageuser'
import Strategicplan from './Page/strategicplan'
import Strategicissues from './Page/strategicissues'
import Goaldetail from './Page/goaldetail'
import Datamanager from './Page/datamanager'
import Reportone from './Page/reportone'
import Reporttwo from './Page/reporttwo'
import Reportthree from './Page/reportthree'
import Reportfour from './Page/reportfour';
import Project from './Page/newproject'
import Dataleader from './Page/dataleader';
import Detailmanager from './Page/detailmanager'
import Detailleader from './Page/detailleader';
import Datadirector from './Page/datadirector';
import Detaildirector from './Page/detaildirector';
import Datasupplies from './Page/datasupplies';
import Detailsupplies from './Page/detailsupplies'
import Datastatuspurchase from './Page/datastatuspurchase';
import Dataproject from './Page/dataproject';
import Detailproject from './Page/detailproject';
import Detailprojectevaluation from './Page/detailprojectevaluation';
import Detailshowprojectevaluation from './Page/detailshowprojectevaluation';
import Editproject from './Page/editproject';
import Datareport from './Page/datareport';
import Addreportone from './Page/addreportone';
import Addreporttwo from './Page/addreporttwo';
import Addreportthree from './Page/addreportthree';
import Addreportfour from './Page/addreportfour';
import Editreportone from './Page/editreportone';
import Editreporttwo from './Page/editreporttwo';
import Editreportthree from './Page/editreportthree';
import Editreportfour from './Page/editreportfour';
import Editdatastg from './Page/editdatastg';
import Managerreportone from './Page/managerreportone';
import Managerreporttwo from './Page/managerreporttwo';
import Managerreportthree from './Page/managerreportthree';
import Managerreportfour from './Page/managerreportfour';
import ReportstPDF from './Page/pdf'
const App = () => {

  return (
      <Router>
          <Switch>
          <Route exact path="/Page/login" render={(props) => (<Login/>)}></Route>
              <Route path="/Page/admindashboard" render={(props) => (<Admindashboard/>)}></Route>
              <Route path="/Page/header" render={(props) => (<Header/>)}></Route>
              <Route path="/Page/sidebar" render={(props) => (<Sidebar/>)}></Route>
              <Route path="/Page/navbar" render={(props) => (<Navbar/>)}></Route>
              <Route path="/manage" render={(props) => (<Managesys/>)}></Route>
              <Route path="/Page/manageUser" render={(props) => (<Manageuser/>)}></Route>
              <Route path="/Page/strategicplan" render={(props) => (<Strategicplan/>)}></Route>
              <Route path="/Page/strategicissues" render={(props) => (<Strategicissues/>)}></Route>
              <Route path="/home/goaldetail" render={(props) => (<Goaldetail/>)}></Route>
              <Route path="/Page/datamanager" render={(props) => (<Datamanager/>)}></Route> 
              <Route path="/home/reportone" render={(props) => (<Reportone/>)}></Route> 
              <Route path="/home/reporttwo" render={(props) => (<Reporttwo/>)}></Route>
              <Route path="/home/reportthree" render={(props) => (<Reportthree/>)}></Route>
              <Route path="/home/reportfour" render={(props) => (<Reportfour/>)}></Route>
              <Route path="/Page/dataleader" render={(props) => (<Dataleader/>)}></Route>
              <Route path="/home/detailmanager" render={(props) => (<Detailmanager/>)}></Route>
              <Route path="/home/detailleader" render={(props) => (<Detailleader/>)}></Route>
              <Route path="/Page/datadirector" render={(props) => (<Datadirector/>)}></Route>
              <Route path="/home/detaildirector" render={(props) => (<Detaildirector/>)}></Route>
              <Route path="/Page/Datasupplies" render={(props) => (<Datasupplies/>)}></Route> 
              <Route path="/home/detaildirector" render={(props) => (<Detaildirector/>)}></Route>
              <Route path="/home/detailsupplies" render={(props) => (<Detailsupplies/>)}></Route>
              <Route path="/Page/datastatuspurchase" render={(props) => (<Datastatuspurchase/>)}></Route>
              <Route path="/Page/dataproject" render={(props) => (<Dataproject/>)}></Route>
              <Route path="/Page/newproject" render={(props) => (<Project/>)}></Route>
              <Route path="/home/detailproject" render={(props) => (<Detailproject/>)}></Route>
              <Route path="/home/detailprojectevaluation" render={(props) => (<Detailprojectevaluation/>)}></Route>
              <Route path="/home/detailshowprojectevaluation" render={(props) => (<Detailshowprojectevaluation/>)}></Route>
              <Route path="/home/editproject" render={(props) => (<Editproject/>)}></Route>
              <Route path="/Page/datareport" render={(props) => (<Datareport/>)}></Route>
              <Route path="/home/addreportone" render={(props) => (<Addreportone/>)}></Route> 
              <Route path="/home/addreporttwo" render={(props) => (<Addreporttwo/>)}></Route>
              <Route path="/home/addreportthree" render={(props) => (<Addreportthree/>)}></Route>
              <Route path="/home/addreportfour" render={(props) => (<Addreportfour/>)}></Route>
              <Route path="/home/editreportone" render={(props) => (<Editreportone/>)}></Route> 
              <Route path="/home/editreporttwo" render={(props) => (<Editreporttwo/>)}></Route>
              <Route path="/home/editreportthree" render={(props) => (<Editreportthree/>)}></Route>
              <Route path="/home/editreportfour" render={(props) => (<Editreportfour/>)}></Route>
              <Route path="/home/edit" render={(props) => (<Editdatastg/>)}></Route>
              <Route path="/home/managerreportone" render={(props) => (<Managerreportone/>)}></Route>
              <Route path="/home/managerreporttwo" render={(props) => (<Managerreporttwo/>)}></Route>
              <Route path="/home/managerreportthree" render={(props) => (<Managerreportthree/>)}></Route>
              <Route path="/home/managerreportfour" render={(props) => (<Managerreportfour/>)}></Route>
              <Route path="/Page/ReportstPDF" render={(props) => (<ReportstPDF/>)}></Route>
              <Redirect to={{pathname: '/Page/login'}}/>
          </Switch>
      </Router>

  )
}

 export default App
 