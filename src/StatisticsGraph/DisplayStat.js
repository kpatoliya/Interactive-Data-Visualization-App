import React,{ Component } from 'react';
import nyData from './data.json';
import GenderStat from './GenderStat';
import RaceStat from './RaceStat';
import ResidenceStat from './ResidenceStat';
import PublicAssistStat from './PublicAssistStat';
import {Nav, Navbar} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';


class DisplayStat extends Component{
    constructor(props) {
        super(props);

        this.state = {
            rowIndex: this.getRowIndex()
          }
    }

    getRowIndex = () => {
        for (const row in nyData.data) {
            if( nyData.data[row][8] === this.props.zip ){
                 return row;
            }       
        }
      };

    render(){
        return(
            <div>
                <Navbar bg="light" expand="lg">
                    <Nav className="mr-auto">
                    <a href="/" > 
                    <button className='backButton'>
                        <span>Go Back</span>
                    </button> 
                    </a>
                    </Nav>   
                <Navbar.Brand > Demographics Statistics for Zip: {this.props.zip}  </Navbar.Brand>
                </Navbar>
                
                <hr />
                <div>
                    <GenderStat rowIndex = {this.state.rowIndex} />
                </div>
                <hr />
                <div >
                    <RaceStat rowIndex = {this.state.rowIndex} />
                </div>
                <hr />
                <div >
                    <ResidenceStat rowIndex = {this.state.rowIndex} />
                </div>
                <hr />
                <div >
                    <PublicAssistStat rowIndex = {this.state.rowIndex} />
                </div>
            </div>
        );
    }
}

export default DisplayStat;
