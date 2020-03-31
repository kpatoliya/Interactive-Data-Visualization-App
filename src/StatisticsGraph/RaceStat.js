import React, {Component} from 'react';
import nyData from './data.json';
import Chart from 'chart.js';

class RaceStat extends Component {

  componentDidMount() {
      const myChartRef = document.getElementById('RaceChart').getContext("2d");
      
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
                  label: 'Pacific Islander',
                  data: this.getData().PacificIslander,
                  backgroundColor: 'firebrick',
                },
                {
                  label: 'Hispanic Latino',
                  data: this.getData().HispanicLatino,
                  backgroundColor: 'yellow',
                },
                {
                  label: 'American Indian',
                  data: this.getData().AmericanIndian,
                  backgroundColor: 'orange',
                },
                {
                  label: 'Asian Non-Hispanic',
                  data: this.getData().AsianNHispanic,
                  backgroundColor: 'honeydew',
                },
                {
                  label: 'White Non-Hispanic',
                  data: this.getData().WhiteNHispanic,
                  backgroundColor: 'goldenrod',
                },
                {
                  label: 'Black Non-Hispanic',
                  data: this.getData().BlackNHispanic,
                  backgroundColor: 'red',
                },
                {
                  label: 'Other Ethnicity',
                  data: this.getData().OtherEthnicity,
                  backgroundColor: 'lightpink',
                },
                {
                  label: 'Ethnicity Unknown',
                  data: this.getData().EthnicityUnknown,
                  backgroundColor: 'blue',
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
              text:'Demographics by Race',
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
    const PacificIslander = [];
    const HispanicLatino = [];
    const AmericanIndian = [];
    const AsianNHispanic = [];
    const WhiteNHispanic = [];
    const BlackNHispanic =[];
    const OtherEthnicity = [];
    const EthnicityUnknown = [];
    Jurisdiction.push(nyData.data[this.props.rowIndex][8]);
    Participants.push(nyData.data[this.props.rowIndex][9]);
    PacificIslander.push(nyData.data[this.props.rowIndex][18]);
    HispanicLatino.push(nyData.data[this.props.rowIndex][20]);
    AmericanIndian.push(nyData.data[this.props.rowIndex][22]);
    AsianNHispanic.push(nyData.data[this.props.rowIndex][24]);
    WhiteNHispanic.push(nyData.data[this.props.rowIndex][26]);
    BlackNHispanic.push(nyData.data[this.props.rowIndex][28]);
    OtherEthnicity.push(nyData.data[this.props.rowIndex][30]);
    EthnicityUnknown.push(nyData.data[this.props.rowIndex][32]);

    return { 
      Jurisdiction, 
      Participants, 
      PacificIslander, 
      HispanicLatino,
      AmericanIndian, 
      AsianNHispanic, 
      WhiteNHispanic,
      BlackNHispanic, 
      OtherEthnicity, 
      EthnicityUnknown };
  };

  render() {
      return (
          <div > 
              <canvas id="RaceChart" width="400" height="100"></canvas>
          </div>
      )
  }
}

export default RaceStat;
