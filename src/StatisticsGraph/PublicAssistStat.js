import React, {Component} from 'react';
import nyData from './data.json';
import Chart from 'chart.js';

class PublicAssistStat extends Component {

  componentDidMount() {
      const myChartRef = document.getElementById('PublicAChart').getContext("2d");
      
      new Chart(myChartRef, {
          type: 'bar',
          data: {
              labels: this.getData().Jurisdiction,
              datasets: [
                  {
                    label: 'Total Participants',
                    data: this.getData().Participants,
                    backgroundColor: 'antiquewhite',
                  },
                  {
                    label: 'Recieves Public Assistance',
                    data: this.getData().RecievPublicAssist,
                    backgroundColor: 'cadetblue',
                  },
                  {
                    label: 'Not Recieves Public Assistance',
                    data: this.getData().NRecievPublicAssist,
                    backgroundColor: 'darkkhaki',
                  },
                  {
                    label: 'Public Assistance Unknown',
                    data: this.getData().UnknownPublicAssist,
                    backgroundColor: 'coralsilk',
                  }
              ]
          },
          options: {
            layout: {
              padding: {
                  left: 50,
                  right: 50,
                  top: 0,
                  bottom: 10
              }
            },
            scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }],
              xAxes: [{
                ticks: {
                  fontSize: 15
                }
              }]
            },
            title: {
              display:true,
              text:'Demographics by People Recieving Public Assistance',
              fontSize:25
            },
            legend: {
              display:true,
              position:'top'
            }
          }
      });
  }

  getData() {

    const Jurisdiction = [];
    const Participants = [];
    const RecievPublicAssist = [];
    const NRecievPublicAssist = [];
    const UnknownPublicAssist = [];
    Jurisdiction.push(nyData.data[this.props.rowIndex][8]);
    Participants.push(nyData.data[this.props.rowIndex][9]);
    RecievPublicAssist.push(nyData.data[this.props.rowIndex][46]);
    NRecievPublicAssist.push(nyData.data[this.props.rowIndex][48]);
    UnknownPublicAssist.push(nyData.data[this.props.rowIndex][50]);

    return { 
      Jurisdiction, 
      Participants, 
      RecievPublicAssist, 
      NRecievPublicAssist, 
      UnknownPublicAssist 
    };
  };

  render() {
      return (
          <div > 
              <canvas id="PublicAChart" width="400" height="100"></canvas>
          </div>
      )
  }
}

export default PublicAssistStat;
