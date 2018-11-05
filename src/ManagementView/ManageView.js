import React, { Component } from 'react'
import styled from 'styled-components';
import Colors from '../Colors';
import { FaUserPlus, FaUserMinus, FaUserEdit  } from 'react-icons/fa';
import GraphPanel from './GraphPanel';
import TabelPanel from './TablePanel';
import TablePanel from './TablePanel';
// import AddPanel from './AddPanel';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  height: ${props => props.height ? props.height : '%100'};
  & > div {
    margin: ${props => props.margin ? props.margin : '30px 10px 0 10px'};
  }
`

const Panel = styled.div`
  flex: 1;
  border-radius: 3px;
  background-color: ${Colors.grey};
  border: 3px solid ${Colors.darkGrey}40;
`

export const ButtonPanel = styled(Panel)`
  cursor: pointer;
  user-select: none;
  min-height: 100px;
  height: 15vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.color ? props.color : Colors.grey}10;
  border: 5px solid ${props => props.color ? props.color : Colors.grey}B0;
  color: ${props => props.color ? props.color : Colors.grey};
  padding: 0 10px 10px 10px;
  font-size: 20px;
  font-weight: bold;
  :hover {
    background-color: ${props => props.color ? props.color : Colors.grey}80;
    color: ${Colors.grey} ;
    & > svg {
       fill: ${Colors.grey};
     }
  }
  :visited:active,
  :active {
    background-color: ${props => props.color ? props.color : Colors.grey}E0;
  }
`

export const LargePanel = styled(Panel)`
  min-height: 400px;
  height: 60vh;
  min-width:400px;
  margin-bottom: 20px;
`

export default class ManageView extends Component {
  render() {
    return (
      <PageContainer>
        <Row>
          <ButtonPanel  color={Colors.green}>
            Add User
            <FaUserPlus
              color={Colors.green}
              style={{marginTop: '10px', height: '80%', width:'80%'}}/>
          </ButtonPanel>
          <ButtonPanel color={Colors.red} >
            Remove User
            <FaUserMinus
              style={{marginTop: '10px', height: '80%', width:'80%'}}/>
          </ButtonPanel><ButtonPanel color={Colors.orange} >
            Edit User
            <FaUserEdit
              style={{marginTop: '10px', height: '80%', width:'80%'}}/>
          </ButtonPanel>
        </Row>
        <Row>
          <GraphPanel />
          <TablePanel />
        </Row>
      </PageContainer>
    )
  }
}
