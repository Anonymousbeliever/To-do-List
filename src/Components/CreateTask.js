import { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const CreateTask = () => {
    const [task, setTask] = useState("");
    const [date, setDate] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!task.trim() || !date.trim()) {//the trim removes extra space
            setError("Please fill out all fields!"); //if strings are empty we set an error message using the setError
            return;
        }

        axios.post("http://localhost:4000/tasks", { task, date, completed: false }) //sends a post request to the url with the task data 
        //by default, new tasks are marked not complete
            .then(() => {
                toast.success("Task added successfully!"); //if request is successful
                setTask("");
                setDate("");
                setError("");
            })
            .catch((err) => {
                toast.error("Failed to add task."); //if request is not successful
            });
    };

    return (
        <Container className="mt-4">
            <h2>Add New Task</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>Task</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter task"
                        value={task}
                        onChange={(e) => setTask(e.target.value)} //onChange it updates the task with setTask
                    />
                </Form.Group>

                <Form.Group className="mt-2">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)} //onChange it updates the date with the setDate
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
