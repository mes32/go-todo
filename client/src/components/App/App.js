import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

import Date from '../../classes/Date';
import HeaderBar from '../HeaderBar';
import PageWrapper from '../PageWrapper';
import TodoList from '../TodoList/TodoList';

import TaskGroup from '../../classes/TaskGroup';

function App() {
    const [date, setDate] = useState(new Date());
    const [totalTasks, setTotalTasks] = useState(null);
    const [remainingTasks, setRemainingTasks] = useState(null);
    const [taskGroups, setTaskGroups] = useState([]);

    useEffect(() => {
        axios.get(`/api/tasks?date=${date.formatRequest()}`).then(response => {
            const summary = response.data;
            setTotalTasks(summary.TotalTasks);
            setRemainingTasks(summary.RemainingTasks);
            const newTaskGroups = TaskGroup.fromRequest(summary.TaskGroups);
            setTaskGroups(newTaskGroups);
        }).catch(error => {
            console.log(error);
        })
    }, [date]);

    const nextDay = () => {
        setDate(date.nextDay());
    }

    const prevDay = () => {
        setDate(date.prevDay());
    }

    return (
        <PageWrapper>
            <HeaderBar date={date} nextDay={nextDay} prevDay={prevDay} totalTasks={totalTasks} remainingTasks={remainingTasks} />
            <TodoList taskGroups={taskGroups} />
        </PageWrapper>
    );
}

export default App;
