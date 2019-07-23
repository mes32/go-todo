import React from 'react';
import './App.css';
import HeaderBar from '../HeaderBar';
import TodoList from '../TodoList/TodoList';

function App() {
    return (
        <div className="App">
            <HeaderBar />
            <TodoList />
        </div>
    );
}

export default App;
