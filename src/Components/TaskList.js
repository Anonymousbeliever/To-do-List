import { useState, useEffect } from "react";
import axios from "axios";
import { Container, ListGroup, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

const TaskList = () => {
    const [tasks, setTasks] = useState([]); //Initializes tasks as an empty array.
    const [searchDate, setSearchDate] = useState("");

    // Fetch tasks from json server 
    const fetchTasks = () => {
        axios
            .get("http://localhost:4000/tasks") //get request to the url using axios
            .then((res) => {
                setTasks(res.data); //res.data contains the list of tasks retrieved from the server
                //setTasks updates the tasks
            })
            .catch((err) => {
                toast.error("Error fetching tasks"); //if request fails, an error is displayed using the toast
            });
    };

    // Run fetchTasks when the component mounts
    useEffect(() => {
        fetchTasks();
    }, []);

    // Toggle task completion 
    // Each task has a Complete/Undo button. Clicking it updates the task's completed status.
    const toggleComplete = (id, completed) => {
        axios
            .patch(`http://localhost:4000/tasks/${id}`, { completed: !completed })//sends a patch request to update the completed field. i.e true or false
            .then(() => {
                fetchTasks(); //calling fetchTask to refresh the updated list
            })
            .catch((err) => {
                toast.error("Error updating task");
            });
    };

    // Delete task 
    // Each task has a Delete button. Clicking it removes the task.
    const deleteTask = (id) => {
        if (window.confirm("Are you sure you want to delete this task?")) { //asks confirmation 
            axios
                .delete(`http://localhost:4000/tasks/${id}`) //if confirmed it sends a delete request to the url
                .then(() => {
                    toast.success("Task deleted successfully"); //if successful a success notification is displayed and fetches the updated lists
                    fetchTasks();
                })
                .catch((err) => {
                    toast.error("Error deleting task");
                });
        }
    };

    // Search tasks by date 
    const searchTasks = () => {
        axios
            .get("http://localhost:4000/tasks")//sends a get request to the url to fetch all the tasks from json server

            .then((res) => {
                const filtered = res.data.filter((t) => t.date === searchDate); //t is a parameter representing each task. 
                //filter() loops through all tasks and only leaves the ones that t.date === searchDate
                setTasks(filtered); //updates tasks to show only the filtered tasks
            })
            .catch((err) => {
                toast.error("Error searching tasks");
            });
    };

    return (
        <Container className="mt-4">
            <h2>All Tasks</h2>
            <Form.Group>
                <Form.Label>Search by Date</Form.Label>
                <Form.Control
                    type="date"
                    value={searchDate}
                    onChange={(e) => setSearchDate(e.target.value)} //When the user selects a date, setSearchDate(e.target.value) updates the state.
                />
                <Button className="mt-2" onClick={searchTasks} variant="info">
                    Search
                </Button>
            </Form.Group>


            <ListGroup className="mt-3">
                {tasks.length === 0 ? (  //checks if the task array is empty
                    <p className="text-center">No tasks found.</p> //if no task exixts, it displys no tasks found
                ) : (

                    //if tasks exists, the map() function loops through and displys them
                    tasks.map((t) => (
                        <ListGroup.Item key={t.id} className="d-flex justify-content-between">
                            <span>
                                {t.task} - {t.date}
                            </span>


                            <div>
                                <Button variant={t.completed ? "secondary" : "success"} size="sm" //If task is completed (t.completed === true) the Button is gray (secondary) and Shows "Undo".
                                //f task is not completed the Button is green (success) and Shows "Complete".
                                 onClick={() => toggleComplete(t.id, t.completed)} //if you click, this calls the toggleComplete() function with the t.id and t.completed()
                                >
                                    {t.completed ? "Undo" : "Complete"} 
                                </Button>

                                <Button
                                    variant="danger"
                                    size="sm"
                                    className="ms-2"
                                    onClick={() => deleteTask(t.id)} //if you click the delete it calls the deleteTask
                                    > 
                                    Delete
                                </Button>
                            </div>

                        </ListGroup.Item>
                    ))
                )}
            </ListGroup>
        </Container>
    );
};

export default TaskList;
