import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  CartesianGrid,
  Legend
} from 'recharts';
import { LargePanel } from './ManageView';
import Colors from '../Colors';
import Settings from '../Settings';
import DataMonitor from '../dataRetrieval';

export default class GraphPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    }
  }

  componentWillMount() {
    this.updateData();
  }

  componentDidMount() {
    DataMonitor.subscribe(this.updateData);
  }

  updateData = async () => {
    const res = await axios.get(`${Settings.backend}/log/hours`);
    console.log(res.data);
    const currentTime = moment(new Date()).millisecond(0).second(0).minute(0).add(2, 'hours');
    const newData = res.data.map((item) => {
      const data = {
        time: currentTime.subtract(1, 'hours').format('HH:mm'),
        insideID: [],
        inside: 0,
        outsideID: [],
        outside: 0,
      };

      const inside = item.filter((el) => el._id === 'inside');
      if (inside.length !== 0) {
        data.insideID = inside[0].ID;
        data.inside = inside[0].ID.length;
      }
      const outside = item.filter((el) => el._id === 'outside');
      if (outside.length !== 0) {
        data.outsideID = outside[0].ID;
        data.outside = outside[0].ID.length;
      }
      return data;
    })
    console.log(newData);
    this.setState({ data: newData.reverse() })
  }

  render() {
    return (
      <LargePanel>
        <ResponsiveContainer>
          <LineChart width={600} height={400} data={this.state.data}
                margin={{top: 10, right: 30, left: 0, bottom: 0}}  style={{color:Colors.lightGrey}}>
            <CartesianGrid strokeDasharray="3 3"/>
            <Legend verticalAlign="top" height={36}/>
            <XAxis dataKey="time"/>
            <YAxis/>
            <Tooltip/>
            <Line type='monotone' dataKey='inside' stroke={Colors.green} />
            <Line type='monotone' dataKey='outside' stroke={Colors.red} />
          </LineChart>
        </ResponsiveContainer>
      </LargePanel>
    )
  }
}
