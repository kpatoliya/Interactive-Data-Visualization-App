import React from 'react';
import nyData from './data.json';
import {Bar} from 'react-chartjs-2';


const Genderstat = () => {
  
    const state ={
        labels: getData().JURISDICTION,

        datasets: [
        
            {
            label: 'People',
            data: getData().PEOPLE,
            borderColor: 'red',
            borderWidth: 1
            },
            {
            label: 'Females',
            data: getData().FEMALES,
            borderColor: 'yellow',
            borderWidth: 1
            },
            {
            label: 'Males',
            data: getData().MALES,
            borderColor: 'blue',
            borderWidth: 1
            }
        ]
    };


    function getData() {
        
    const JURISDICTION = [];
    const PEOPLE = [];
    const MALES = [];
    const FEMALES = [];
    JURISDICTION.push(nyData.data[0][8]);
    PEOPLE.push(nyData.data[0][9]);
    FEMALES.push(nyData.data[0][10]);
    MALES.push(nyData.data[0][11]);

    return { JURISDICTION, PEOPLE, MALES, FEMALES };
    };


    return (
      <div>
        <Bar
          data={state}
          options={{
            title:{
              display:true,
              text:'Demographics by Gender',
              fontSize:20
            },
            legend:{
              display:true,
              position:'top'
            }
          }}
        />
      </div>
    );
};

export default Genderstat;