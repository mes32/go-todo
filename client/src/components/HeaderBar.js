import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from './Button';
import DateScrollButton from './DateScrollButton';

import Date from '../classes/Date';

function HeaderBar(props) {
    const renderRemaining = () => {
        if (props.totalTasks && props.remainingTasks) {
            return (<h3>{props.remainingTasks} of {props.totalTasks} Tasks Remain</h3>);
        } else {
            return (<h3>? of ? Tasks Remain</h3>);
        }
    }

    return (
        <StyledHeader props={props}>
            <ContentDiv>
                <h1>
                    <DateScrollButton value="◀" onClick={function () { }} />
                </h1>
                <CenterDiv>
                    <h1>{props.date.formatHeader()}</h1>
                    {renderRemaining()}
                    <p><Button value="+ Task Group" onClick={function () { }} /></p>
                </CenterDiv>
                <h1>
                    <DateScrollButton value="▶" onClick={function () { }} />
                </h1>
            </ContentDiv>
        </StyledHeader>
    );
}

HeaderBar.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    nextDay: PropTypes.func.isRequired,
    prevDay: PropTypes.func.isRequired,
    totalTasks: PropTypes.number,
    remainingTasks: PropTypes.number
};

const StyledHeader = styled.header`
    position: sticky;
`;

const ContentDiv = styled.div`
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    padding: 10px;

    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;

    color: #cdc5cf;
    background-color: #584061;
    
    text-align: center;
    h1 {
        margin-top: 0;
    }
`;

const CenterDiv = styled.div`

`;

export default HeaderBar;
