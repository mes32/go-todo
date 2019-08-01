import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import TaskGroup from '../classes/TaskGroup';
import TodoListGroup from './TodoListGroup';

const color = (() => {
    let index = -1;
    const colorCycle = ['#8A4F7D', '#EE5D6C', '#FB9062', '#593F62'];

    return {
        next: function() {
            index = (index + 1) % colorCycle.length;
            return colorCycle[index];
        },
        reset: function() {
            index = -1;
        }
    };
})();

function TodoList({ taskGroups, completeTask }) {
    color.reset();
    return (
        <ScrollDiv>
            <ContentDiv>
                {taskGroups.map(
                    group => <TodoListGroup key={group.id} group={group} color={color.next()} completeTask={completeTask} />
                )}
            </ContentDiv>
        </ScrollDiv>
    );
}

TodoList.propTypes = {
    taskGroups: PropTypes.arrayOf(PropTypes.instanceOf(TaskGroup)),
    completeTask: PropTypes.func.isRequired
};

const ScrollDiv = styled.div`
    overflow: scroll;
    height: 80%;
`;

const ContentDiv = styled.div`
    width: 608px;
    margin: 0 auto;
    padding-bottom: 100px;
`;


export default TodoList;
