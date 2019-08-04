import React, { useEffect, useState } from 'react';
import axios from 'axios';

import HeaderBar from './HeaderBar';
import ModalDialog from './ModalDialog';
import PageWrapper from './PageWrapper';
import TodoList from './TodoList';

import Date from '../classes/Date';
import TaskGroup from '../classes/TaskGroup';

function App() {
    const [date, setDate] = useState(new Date());
    const [totalTasks, setTotalTasks] = useState(null);
    const [remainingTasks, setRemainingTasks] = useState(null);
    const [taskGroups, setTaskGroups] = useState([]);
    const [showAddGroup, setShowAddGroup] = useState(false);

    useEffect(() => {
        fetchTasks(date);
    }, [date]);

    const nextDay = () => {
        setDate(date.nextDay());
    }

    const prevDay = () => {
        setDate(date.prevDay());
    }

    const displayAddGroup = () => {
        setShowAddGroup(true);
    }

    const hideAddGroup = () => {
        setShowAddGroup(false);
    }

    const addGroup = (groupName) => {
        console.log(`addGroup() ${groupName}`);
        axios.post('/api/task-groups/', { name: groupName }).then(() => {
            fetchTasks(date);
        }).catch(error => {
            console.log(error);
            alert(`Unable to create task group: ${groupName}`);
        });
    }

    const fetchTasks = (date) => {
        axios.get(`/api/tasks?date=${date.formatRequest()}`).then(response => {
            const summary = response.data;
            setTotalTasks(summary.TotalTasks);
            setRemainingTasks(summary.RemainingTasks);
            const newTaskGroups = TaskGroup.fromRequest(summary.TaskGroups);
            setTaskGroups(newTaskGroups);
        }).catch(error => {
            console.log(error);
            alert('Unable to fetch to-do tasks');
        });
    }

    const completeTask = (id, isComplete) => {
        axios.put(`/api/tasks?id=${id}&complete=${isComplete}`).then(repsonse => {
            fetchTasks(date);
        }).catch(error => {
            console.log(error);
            alert(`Unable to mark task complete=${isComplete}`);
        })
    }

    return (
        <>
            <PageWrapper>
                <HeaderBar date={date} nextDay={nextDay} prevDay={prevDay} addGroup={displayAddGroup} totalTasks={totalTasks} remainingTasks={remainingTasks} />
                <TodoList taskGroups={taskGroups} completeTask={completeTask} />
            </PageWrapper>
            <ModalDialog show={showAddGroup} title="Create Task Group" cancel={hideAddGroup} okay={addGroup} />
        </>
    );
}

export default App;
