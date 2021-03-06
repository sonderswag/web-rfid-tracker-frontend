import React, { Component } from 'react';
import styled from 'styled-components';
import { FaUserEdit } from 'react-icons/fa';
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

export default class EditNamePanel extends Component {
  constructor(props, context) {
    super(props, context);
    this.color = Colors.orange;
    this.state = {
      show: false,
      userName: '',
      password: '',
    };
  }

  handleFormClose = () => {
    this.setState({ show: false, userName: '', password: '' });
  }

  handleFormShow = () => {
    this.setState({ show: true });
  }
  
  handleUsername = (e) => {
    this.setState({ userName: e.target.value });
  }
  handlePassword = (e) => {
    this.setState({ password: e.target.value });
  }

  render() {
    const { show, userName, password } = this.state;
    return (
      <React.Fragment>
          <ButtonPanel color={this.color} onClick={this.handleFormShow}>
            Edit User's Name
            <FaUserEdit
              color={this.color}
              style={{marginTop: '10px', height: '80%', width:'80%'}}/>
          </ButtonPanel>
        <FormModal show={show} onHide={this.handleFormClose} color={this.color}>
          <Modal.Header closeButton>
            <Modal.Title>Edit User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form>
            <FormGroup
              controlId="UserName"
            >
              <ControlLabel>UserName</ControlLabel>
              <FormControl
                type="text"
                value={userName}
                placeholder="Enter text"
                onChange={this.handleUsername}
              />
              <FormControl.Feedback />
            </FormGroup>
            <FormGroup
              controlId="Password"
            >
              <ControlLabel>Password</ControlLabel>
              <FormControl
                type="password"
                placeholder="Password"
                value={password}
                placeholder="Enter text"
                onChange={this.handlePassword}
              />
              <FormControl.Feedback />
              <HelpBlock>Validation is based on string length.</HelpBlock>
            </FormGroup>
          </form>
          </Modal.Body>
          <Modal.Footer>
            <FormButton
              color={Colors.orange}
              type="submit"
              onClick={this.handleFormSubmit}
            >
                Update
            </FormButton>
            <FormButton
              color={Colors.red}
              onClick={this.handleFormClose}
            >
              Close
            </FormButton>
          </Modal.Footer>
        </FormModal>
      </React.Fragment>
    )
  }
}