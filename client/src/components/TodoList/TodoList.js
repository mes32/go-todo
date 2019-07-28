import React from 'react';
import PropTypes from 'prop-types';

import TaskGroup from '../../classes/TaskGroup';
import TodoListGroup from '../TodoListGroup';

const color = (() => {
    let index = -1;
    const colorCycle = ['#8A4F7D', '#EE5D6C', '#FB9062', '#593F62'];
    const increment = () => {
        index = (index + 1) % colorCycle.length;
    }

    return {
        next: function() {
            increment();
            return colorCycle[index];
        }
    };
})();

function TodoList(props) {
    return (
        <div>
            {props.taskGroups.map(
                group => <TodoListGroup key={group.id} group={group} color={color.next()} />
            )}
        </div>
    );
}

TodoList.propTypes = {
    taskGroups: PropTypes.arrayOf(PropTypes.instanceOf(TaskGroup))
};

export default TodoList;
