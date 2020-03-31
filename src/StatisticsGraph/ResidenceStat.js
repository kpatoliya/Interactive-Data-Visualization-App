import React, {Component} from 'react';
import nyData from './data.json';
import Chart from 'chart.js';

class ResidenceStat extends Component {

  componentDidMount() {
      const myChartRef = document.getElementById('ResidenceChart').getContext("2d");
      
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
                  label: 'Permanent Resident Alien',
                  data: this.getData().PermanentAlien,
                  backgroundColor: 'azure',
                },
                {
                  label: 'US Citizen',
                  data: this.getData().UsCitizen,
                  backgroundColor: 'greenyellow',
                },
                {
                  label: 'Other Citizen Status',
                  data: this.getData().OtherStatus,
                  backgroundColor: 'lightblue',
                },
                {
                  label: 'Unknown Citizen Status',
                  data: this.getData().UnknownStatus,
                  backgroundColor: 'forestgreen',
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
              text:'Demographics by Residency Status',
              fontSize:25
            },
            legend: {
              display:true,
              position:'top'
            },
          }
      });
  }

  getData() {

    const Jurisdiction = [];
    const Participants = [];
    const PermanentAlien = [];
    const UsCitizen = [];
    const OtherStatus = [];
    const UnknownStatus = [];
    Jurisdiction.push(nyData.data[this.props.rowIndex][8]);
    Participants.push(nyData.data[this.props.rowIndex][9]);
    PermanentAlien.push(nyData.data[this.props.rowIndex][36]);
    UsCitizen.push(nyData.data[this.props.rowIndex][38]);
    OtherStatus.push(nyData.data[this.props.rowIndex][40]);
    UnknownStatus.push(nyData.data[this.props.rowIndex][42]);

    return { 
      Jurisdiction, 
      Participants, 
      PermanentAlien, 
      UsCitizen, 
      OtherStatus, 
      UnknownStatus 
    };
  };

  render() {
      return (
          <div > 
              <canvas id="ResidenceChart" width="400" height="100"></canvas>
          </div>
      )
  }
}

export default ResidenceStat;

