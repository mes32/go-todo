import styled from 'styled-components';

const TodoListGroup = styled.div`
    margin: 0 20px;
    h3 {
        color: ${props => props.color};
        border-bottom: 2px solid ${props => props.color};
        padding-left: 4px;
    }
`;

export default TodoListGroup;