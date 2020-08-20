import React,{Component} from 'react';
import './App.css';
import AppHeader from './components/AppHeader';
import MetricsCard from './components/CaseMetrics';
import Grid from '@material-ui/core/Grid';
import DataTable from './components/MetricsTable';
import axios from 'axios';

class App extends Component {

  constructor() {
    super()
    this.state = {
      data: [],
      testingData: [],
      mergedData: [],
      testedData:[],
      }
  }
  componentDidMount() {
    this.getPatientData()
    this.getWholeCountryTestingData()

  }
  mergeData = () => { 
    let mergeData = []
    let i = 0;
    let j = 0;
    
    if (this.state.data !== undefined && this.state.testingData !== undefined) {
      
      for (i = 0; i < this.state.data.length; i++) {
        
        for (j = 0; j < this.state.testingData.length; j++) {
        
          if (this.state.data[i].state === this.state.testingData[j].state) {
            let obj = {}
        
            obj.state = this.state.data[i].state
            obj.confirmed = this.state.data[i].confirmed
            obj.active = this.state.data[i].active
            obj.recovered = this.state.data[i].recovered
            obj.deaths = this.state.data[i].deaths
            obj.testspermillion = this.state.testingData[j].testspermillion
            obj.numicubeds = this.state.testingData[j].numicubeds
            mergeData.push(obj);
          }
        }
      }
    } 
            this.setState({ mergedData: mergeData })
  }
    
  
  getTestingData = () => { 
    let self=this;
    axios.get('https://api.covid19india.org/state_test_data.json')
        .then(function (response) {
          
          let tData = response.data.states_tested_data;
            self.setState({ testingData: tData.filter(obj => obj.updatedon === "08/08/2020") },
              () => {
                self.mergeData()
              })
        })
    .catch(function (error) {
        console.log("from error ",error);
    })
    .finally(function () {
    });
  }
  
  
  getPatientData = () => {
    var self=this
    axios.get('https://api.covid19india.org/data.json')
      .then(response => {
        
          self.setState({ data: response.data.statewise }, () => {
            self.getTestingData()
          
          })
    })
    .catch(function (error) {
        
    })
    .finally(function () {
    });
  }
 
     getWholeCountryTestingData = () => { 
     
       let td = this
      
       axios.get('https://api.covid19india.org/data.json')
            .then(function (response) {
                  
              let tData = response.data.tested;
              tData = tData[tData.length - 1]
              td.setState({ testedData: tData })

     })
      .catch(function (error) {
        })
      .finally(function () {

      });
      
     }
render() {
    return (
      <div className="App">
        
        <AppHeader />
      
        <br />
        <div id="cases" className="Card-Padding">
        
          <Grid container spacing={4} className="Grid-padding" boxShadow={3}>
            
            <Grid item xs={12} sm={6} md={2}>
              <MetricsCard  text={"Confirmed"}
                val={
                  this.state.data[0]!==undefined ?
                  this.state.data[0].confirmed :""
                } />
            </Grid>
          
            <Grid item xs={12} sm={6} md={2}>
            <MetricsCard text={"Active"}
                val={
                  this.state.data[0]!==undefined ?
                  this.state.data[0].active :""
                } />
            </Grid>
          
            <Grid item xs={12} sm={6} md={2}>
            <MetricsCard text={"Recovered"}
                val={
                  this.state.data[0]!==undefined ?
                  this.state.data[0].recovered :""
                } />
            </Grid>
          
            <Grid item xs={12} sm={6} md={2}>
            <MetricsCard text={"Deaths"}
                val={
                  this.state.data[0]!==undefined ?
                  this.state.data[0].deaths :""
                }  onclick="https//google.com" />
            </Grid>

            <Grid item xs={12} sm={6} md={2}>
            <MetricsCard text={"Tested"}
                val={
                  this.state.testedData.totalsamplestested!==undefined ?
                  this.state.testedData.totalsamplestested :""
                } 
                />
            </Grid>

            <Grid item xs={12} sm={6} md={2}>
            <MetricsCard text={"Test Per Mill."}
                val={
                  this.state.testedData.testspermillion!==undefined ?
                  this.state.testedData.testspermillion :""
                } />
            </Grid>


          </Grid>
        </div>
        <div className="Table-Padding">
          <DataTable val={this.state.mergedData}/>
        </div>
      </div>
    );
  }
}
export default App;
