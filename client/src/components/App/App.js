import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

import Date from '../../classes/Date';
import HeaderBar from '../HeaderBar';
import PageWrapper from '../PageWrapper';
import TodoList from '../TodoList/TodoList';

function App() {
    const [date, setDate] = useState(new Date());
    const [totalTasks, setTotalTasks] = useState(null);
    const [remainingTasks, setRemainingTasks] = useState(null);
    const [taskGroups, setTaskGroups] = useState({});

    useEffect(() => {
        axios.get(`/api/tasks?date=${date.formatRequest()}`).then(response => {
            const res = response.data;
            console.log(res);
            setTotalTasks(res.TotalTasks);
            setRemainingTasks(res.RemainingTasks);

            // const taskGroups = TaskGroup. res.TaskGroups;
            setTaskGroups(res.TaskGroups);
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
