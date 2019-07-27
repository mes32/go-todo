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

    useEffect(() => {
        axios.get(`/api/tasks?date=${date.formatRequest()}`).then(response => {
            const tasks = response.data;
            setTotalTasks(tasks.TotalTasks);
            setRemainingTasks(tasks.RemainingTasks);
        }).catch(error => {
            console.log(error);
        })
    });

    const nextDay = () => {
        setDate(date.nextDay());
    }

    const prevDay = () => {
        setDate(date.prevDay());
    }

    return (
        <PageWrapper>
            <HeaderBar date={date} nextDay={nextDay} prevDay={prevDay} totalTasks={totalTasks} remainingTasks={remainingTasks} />
            <TodoList />
        </PageWrapper>
    );
}

export default App;
