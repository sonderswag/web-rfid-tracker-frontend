import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FaUserPlus, FA } from 'react-icons/fa';
import {
  Modal,
  Button,
  FormGroup,
  FormControl,
  HelpBlock,
  ControlLabel,
} from 'react-bootstrap';
import { ButtonPanel } from './ManageView';
import Colors from '../Colors';
import { FormModal, FormButton } from '../components/Login';
import Settings from '../Settings';
import DataMonitor from '../dataRetrieval';


export const MessageBox = styled.div`
display: flex;
width: 100%;
height: 100%;
flex-direction: column;
align-items: center;
justify-content: center;
background-color: ${props => props.color}10;
border-top: 3px solid ${props => props.color};
border-left: 5px solid ${props => props.color}01;
border-right: 5px solid ${props => props.color}01;
font-size: 25px;
color: ${props => props.color};
margin-bottom: 20px;
`

MessageBox.defaultProps = {
  color: Colors.red,
}


export default class AddUserPanel extends Component {
  constructor(props, context) {
    super(props, context);
    this.selectRef = React.createRef();
    this.color = Colors.green;
    this.state = {
      show: false,
      submitFail: false,
      submitSuccess: false,
      firstName: '',
      lastName: '',
      id: '',
      TIDs: [],
    };
  }

  componentWillMount() {
    this.updateData();
  }
  
  componentDidMount() {
    DataMonitor.subscribe(this.updateData);
  }

  updateData = async () => {
    const res = await  axios.get(`${Settings.backend}/personnel/un-name`);
    const newData = res.data.map((item) => item.TID)

    this.setState({ TIDs: newData });
  }

  handleFormSubmit = async () => {
    const TID = this.selectRef.current.value;
    const { firstName, lastName, id } = this.state;
    const argument = `personnel/add/${TID}/?first=${firstName}&last=${lastName}&ID=${id}`;
    axios.put(`${Settings.backend}/${argument}`)
      .then((res) => { this.setState({ submitSuccess: true })})
      .catch((err) => { this.setState({ submitFail: true }) })
    
  }

  handleFormClose = () => {
    this.setState({ show: false, submitFail: false, submitSuccess: false });
  }

  handleFormShow = () => {
    this.setState({ show: true });
  }
  
  handleFirstName = (e) => {
    this.setState({ firstName: e.target.value });
  }

  handleLastName = (e) => {
    this.setState({ lastName: e.target.value });
  }

  handleId = (e) => {
    this.setState({ id: e.target.value });
  }

  generateOptions = (e) => {
    return this.state.TIDs.map(id => <option value={id}>{id}</option>);
  }

  validateFirst = () => {
    const length = this.state.firstName.length
    if (length > 2) return 'success';
    else if (length === 0) return 'error';
    return null;
  }

  validateLast = () => {
    const length = this.state.firstName.length
    if (length > 2) return 'success';
    else if (length < 2) return 'error';
    return null;
  }

  validateId = () => {
    const length = this.state.id.length
    if (length > 2) return 'success';
    else if (length < 2) return 'error';
    return null;
  }




  render() {
    const { show, firstName, lastName, id, submitFail, submitSuccess } = this.state;
    return (
      <React.Fragment>
        <ButtonPanel color={this.color} onClick={this.handleFormShow}>
          Add User
          <FaUserPlus
            style={{marginTop: '10px', height: '80%', width:'80%'}}/>
        </ButtonPanel>
        <FormModal show={show} onHide={this.handleFormClose} color={this.color}>
          <Modal.Header closeButton>
            <Modal.Title>Add User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          { submitFail && (
            <MessageBox color={Colors.red}>
              Failed to add user, make sure ID is unique
            </MessageBox>
          )}
          { submitSuccess && (
            <MessageBox color={Colors.green}>
              Success!!
            </MessageBox>
          )}
          <form>
            <FormGroup
              controlId="FirstName"
              validationState={this.validateFirst()}
            >
              <ControlLabel>First Name</ControlLabel>
              <FormControl
                type="text"
                placeholder="Enter Name"
                value={firstName}
                onChange={this.handleFirstName}
              />
              <FormControl.Feedback />
            </FormGroup>
            <FormGroup
              controlId="LastName"
              validationState={this.validateLast()}
            >
              <ControlLabel>Last Name</ControlLabel>
              <FormControl
                value={lastName}
                placeholder="Enter Name"
                onChange={this.handleLastName}
              />
              <FormControl.Feedback />
            </FormGroup>
            <FormGroup
              controlId="User Id"
              validationState={this.validateId()}
            >
              <ControlLabel>User ID</ControlLabel>
              <FormControl
                value={id}
                placeholder="Enter id"
                onChange={this.handleId}
              />
              <FormControl.Feedback />
            </FormGroup>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Select Unassigned TID</ControlLabel>
              <FormControl
                componentClass="select"
                placeholder="select"
                inputRef={this.selectRef}
              >
                {this.generateOptions()}
              </FormControl>
            </FormGroup>
          </form>
          </Modal.Body>
          <Modal.Footer>
            <FormButton
              color={Colors.green}
              type="submit"
              onClick={this.handleFormSubmit}
            >
                Submit 
            </FormButton>
          </Modal.Footer>
        </FormModal>
      </React.Fragment>
    )
  }
}