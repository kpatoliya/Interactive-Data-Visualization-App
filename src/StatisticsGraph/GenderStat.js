import React, {Component} from 'react';
import nyData from './data.json';
import Chart from 'chart.js';

class GenderStat extends Component {

  componentDidMount() {
      const myChartRef = document.getElementById('GenderChart').getContext("2d");
      
      new Chart(myChartRef, {
          type: 'bar',
          data: {
              labels: this.getData().Jurisdiction,
              datasets: [
                  {
                    label: 'Total Participants',
                    data: this.getData().Participants,
                    backgroundColor: 'antiquewhite'
                  },
                  {
                    label: 'Females',
                    data: this.getData().Females,
                    backgroundColor: 'chocolate'
                  },
                  {
                    label: 'Males',
                    data: this.getData().Males,
                    backgroundColor: 'aqua'
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
              text:'Demographics by Gender',
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
    const Males = [];
    const Females = [];
    Jurisdiction.push(nyData.data[this.props.rowIndex][8]);
    Participants.push(nyData.data[this.props.rowIndex][9]);
    Females.push(nyData.data[this.props.rowIndex][10]);
    Males.push(nyData.data[this.props.rowIndex][12]);

    return { 
      Jurisdiction, 
      Participants, 
      Males, 
      Females 
    };
  };

  render() {
      return (
          <div > 
              <canvas id="GenderChart" width="400" height="100"></canvas>    
          </div>
      )
  }
}

export default GenderStat;