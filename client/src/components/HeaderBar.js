import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import DateScrollButton from './DateScrollButton';
import HeaderButton from './HeaderButton';

import Date from '../classes/Date';

function HeaderBar(props) {
    const renderRemaining = () => {
        if (props.totalTasks && typeof props.remainingTasks === 'number' && !isNaN(props.remainingTasks)) {
            return (<h3>{props.remainingTasks} of {props.totalTasks} Tasks Remain</h3>);
        } else {
            return (<h3>? of ? Tasks Remain</h3>);
        }
    }

    return (
        <StyledHeader props={props}>
            <ContentDiv>
                <DateScrollButton direction="left" onClick={props.prevDay} />
                <CenterDiv>
                    <h1>{props.date.formatHeader()}</h1>
                    {renderRemaining()}
                    <HeaderButton value="+ Task Group" onClick={props.addGroup} />
                </CenterDiv>
                <DateScrollButton direction="right" onClick={props.nextDay} />
            </ContentDiv>
        </StyledHeader>
    );
}

HeaderBar.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    nextDay: PropTypes.func.isRequired,
    prevDay: PropTypes.func.isRequired,
    addGroup: PropTypes.func.isRequired,
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
        font-size: 2rem;
    }

    @media (max-width: 34em) {
        padding: 3px;
        h1 {
            font-size: 1.4rem;
        }
    }
`;

const CenterDiv = styled.div`

`;

export default HeaderBar;
