import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function ModalDialog(props) {
    const [groupName, setGroupName] = useState('');

    const addGroup = () => {
        if (groupName) {
            props.okay(groupName);
            props.cancel();
        }
    }

    const handleInputChange = (event) => {
        setGroupName(event.target.value);
    }

    if (!props.show) {
        return null;
    }
    return (
        <Backdrop>
            <ModalWindow>
                <h2>{props.title}</h2>
                <form>
                    <ModalInput type="text" placeholder="Group Name" value={groupName} onChange={handleInputChange} />
                    <CancelButton type="button" value="Cancel" onClick={props.cancel} />
                    <OkayButton type="button" value="Add Group" onClick={addGroup} />
                </form>
            </ModalWindow>
        </Backdrop>
    );
}

ModalDialog.propTypes = {
    show: PropTypes.bool.isRequired,
    cancel: PropTypes.func.isRequired,
    okay: PropTypes.func.isRequired
};

const Backdrop = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 50;
    background-color: rgba(0, 0, 0, 0.6);
`;

const ModalWindow = styled.div`
    box-sizing: border-box;
    margin: 4rem auto;
    padding: 2rem 30px;
    width: 550px;
    max-width: 90vw;

    background-color: ghostwhite;
    border: 2px solid rgba(0, 0, 0, 0.1);
    border-radius: 10px;

    -webkit-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.3);
    box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.3);

    h2 {
        color: #584061;
        margin: 0;
    }

    input {
        font-size: 1rem;
    }
`;

const ModalInput = styled.input`
    display: block;
    margin: 1.2rem 0;
    padding: 0.2rem 5px;

    outline: none;
    border: 2px solid #584061;
    color: #584061;
`;

const AbstractButton = styled.input`
    cursor: pointer;
    outline: none;
    
    padding: 0.2rem 15px;
    margin-right: 10px;
    border-radius: 4px;
`;

const CancelButton = styled(AbstractButton)`    
    background-color: #f8f8f8;
    color: #373D3F;
    border: 1px solid #373D3F;

    &:active {
        background-color: white;
    }
`;

const OkayButton = styled(AbstractButton)`
    background-color: #584061;
    color: white;
    border: 1px solid #584061;

    &:active {
        background-color: #3a2d3f;
    }
`;

export default ModalDialog;