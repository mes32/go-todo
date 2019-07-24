import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

import Date from '../../classes/Date';
import HeaderBar from '../HeaderBar';
import PageWrapper from '../PageWrapper';
import TodoList from '../TodoList/TodoList';

function App() {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        // axios.get()
    }, []);

    const nextDay = () => {
        setDate(date.nextDay());
    }

    const prevDay = () => {
        setDate(date.prevDay());
    }

    return (
        <PageWrapper>
            <HeaderBar date={date} nextDay={nextDay} prevDay={prevDay} />
            <TodoList />
        </PageWrapper>
    );
}

export default App;
