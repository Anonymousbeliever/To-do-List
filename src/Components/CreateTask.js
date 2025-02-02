import { useState } from "react"; //usestate is used to keep track of user input and error messages
import { Form, Button, Container} from "react-bootstrap";
import axios from "axios"; //axios helps to make API calls to the server
import {  toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';//for styling toastify
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'; // useHistory allows redirection after a successful operation 


const CreateTask = () => {
    const [task, setTask] = useState(""); //initialy empty string
    const [date, setDate] = useState("");
   

    const history = useHistory();//useHistory gives the component access to the history instance provided by React Router.

    const handleSubmit = (e) => {
        e.preventDefault(); //prevents form from reloading

        //Form validation
        if (!task.trim() || !date.trim()) {
            toast.warn("Please fill out all fields!", { //if inputs are empty the error message is displayed
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 3000,
            });
            return;
          }

            axios.post("http://localhost:4000/tasks", { task, date, completed: false }) //axios.post sends a POST request with an object containing the task, date and completed property to the server.
            .then(res => {
              toast.success(`Added successfuly`, { //if request is successful, a succes message is displayed
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
              });

              history.push('/') //rediraction to home page after successfuly adding a task
      
            })
            .catch(err => {
              toast.error(`Unable to copmlete request`, { //if request fails
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 3000,
              });
            });
    };

    return (
        <Container className="mt-4">
            <h2>Add New Task</h2>
          
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Task</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter task"
                        value={task} //The input is controlled by state (task).
                        onChange={(e) => setTask(e.target.value)} //the onChange it updates the task with setTask if a user types a task
                        //e.target.value retrieves the new value entered by the user in the task input.
                    />
                </Form.Group>

                <Form.Group className="mt-2">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                        type="date"
                        value={date} //The input is controlled by state (date).
                        onChange={(e) => setDate(e.target.value)} //the onChange it updates the date with the setDate if a user selects a date.
                        //e.target.value retrieves the new value entered by the user in the date input.
                    />
                </Form.Group>

                <Button className="mt-3" type="submit" variant="primary">
                    Add Task
                </Button>
            </Form>
        </Container>
    );
};

export default CreateTask;
