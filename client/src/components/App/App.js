import React from 'react';
import './App.css';
import HeaderBar from '../HeaderBar';
import PageWrapper from '../PageWrapper';
import TodoList from '../TodoList/TodoList';

function App() {
    return (
        <PageWrapper>
            <HeaderBar />
            <TodoList />
        </PageWrapper>
    );
}

export default App;
