import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import Navigation from "./Components/Navbar";
import TaskList from "./Components/TaskList";
import CreateTask from "./Components/CreateTask";

function App() {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route exact path="/" component={TaskList} />
        <Route path="/create" component={CreateTask} />
      </Switch>
      <ToastContainer/>
    </Router>
  );
}

export default App;

