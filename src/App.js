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
      mergedData :[],
  }
  //this.patientDataApi=this.patientDataApi.bind(this)
  }
  componentDidMount() {
    this.getPatientData()

  }
  mergeData = () => { 
    let mergeData = []
    let i = 0;
    let j = 0;
    console.log('len state data', this.state.data.length)
    console.log('len testing  data',this.state.testingData.length)
    for (i = 0; i < this.state.data.length; i++){
      console.log('len state data',i)
      for (j = 0; j < this.state.testingData.length; j++) { 
        console.log('testing state data',j)
        if (this.state.data[i].state === this.state.testingData[j].state) {
          let obj = {}
          console.log('dada')
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
    console.log('merged data',mergeData)
    this.setState({mergedData:mergeData})
  }
  getTestingData = () => { 
    let self=this;
    axios.get('https://api.covid19india.org/state_test_data.json')
        .then(function (response) {
          //console.log(response.data.states_tested_data);
          let tData = response.data.states_tested_data;
          self.setState({ testingData: tData.filter(obj => obj.updatedon === "08/08/2020") },
            () => {
            self.mergeData()
          })
          
        })
    .catch(function (error) {
        console.log(error);
    })
    .finally(function () {

    });
  }

  getPatientData =() =>  {
    var self=this
    axios.get('https://api.covid19india.org/data.json')
        .then(function (response) {
          self.setState({ data: response.data.statewise }, () => {
            self.getTestingData()
          })
    })
    .catch(function (error) {
        console.log(error);
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
        
          <Grid container >
            <Grid item md={3}>
              <MetricsCard text={"Confirmed"}
                val={
                  this.state.data[0]!==undefined ?
                  this.state.data[0].confirmed :""
                } />
            </Grid>
          
            <Grid item md={3}>
            <MetricsCard text={"Active"}
                val={
                  this.state.data[0]!==undefined ?
                  this.state.data[0].active :""
                } />
            </Grid>
          
            <Grid item md={3}>
            <MetricsCard text={"Recovered"}
                val={
                  this.state.data[0]!==undefined ?
                  this.state.data[0].recovered :""
                } />
            </Grid>
          
            <Grid item md={3}>
            <MetricsCard text={"Deaths"}
                val={
                  this.state.data[0]!==undefined ?
                  this.state.data[0].deaths :""
                } />
            </Grid>

          </Grid>
        </div>
        <div style={{ padding: '15px' }}>
          <DataTable val={this.state.mergedData}/>
        </div>
      </div>
    );
  }
}
export default App;
