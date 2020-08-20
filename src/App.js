import React,{Component} from 'react';
import './App.css';
import AppHeader from './components/AppHeader';
import MetricsCard from './components/CaseMetrics';
import Grid from '@material-ui/core/Grid';
import DataTable from './components/MetricsTable';
import axios from 'axios';
//import { shadows } from '@material-ui/system';

class App extends Component {

  constructor() {
    super()
    this.state = {
      data: [],
      testingData: [],
      mergedData: [],
      testedData:[],
  }
  //this.patientDataApi=this.patientDataApi.bind(this)
  }
  componentDidMount() {
    this.getPatientData()
    this.getWholeCountryTestingData()

  }
  mergeData = () => { 
    let mergeData = []
    let i = 0;
    let j = 0;
    //console.log('len state data', this.state.data.length)
    //console.log('len testing  data',this.state.testingData.length)
    if (this.state.data !== undefined && this.state.testingData !== undefined) {
      for (i = 0; i < this.state.data.length; i++) {
        //console.log('len state data', i)
        for (j = 0; j < this.state.testingData.length; j++) {
          //console.log('testing state data', j)
          if (this.state.data[i].state === this.state.testingData[j].state) {
            let obj = {}
            //console.log('dada')
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
    //console.log('merged data',mergeData)
    this.setState({mergedData:mergeData})
  }
    getTestingData = () => { 
    let self=this;
    axios.get('https://api.covid19india.org/state_test_data.json')
        .then(function (response) {
          //console.log(response)
          let tData = response.data.states_tested_data;
          if (tData !== undefined &&
            response !== undefined &&
            response.data.sresponse.data.states_tested_data > 0) {
            self.setState({ testingData: tData.filter(obj => obj.updatedon === "08/08/2020") },
              () => {
                self.mergeData()
              })
          }
        })
    .catch(function (error) {
        console.log("from error ",error);
    })
    .finally(function () {
    });
  }
  getPatientData =() =>  {
    
    /**
     * added fetch for getting data from api
    */
    // fetch('https://api.covid19india.org/data.json')
    //   .then(response => {
    //     response.json()
    //   })
    //   .then(data => {
    //     this.setState({ data: data.statewise },
    //       () => {
    //       this.getTestingData()
    //     })
    //   })
    //   .catch(function (error) {
    //         console.log("error from main api" , error);
    //      })

    var self=this
    axios.get('https://api.covid19india.org/data.json')
      .then(response => {
        if (response !== undefined  && response.data.statewise.length>0) {
          self.setState({ data: response.data.statewise }, () => {
            self.getTestingData()
          })
        }
    })
    .catch(function (error) {
        //console.log(error);
    })
    .finally(function () {
    });
  }

  /*
    Getting testing data for whole country 
  */
   getWholeCountryTestingData =()=>{ 
     let td = this
     axios.get('https://api.covid19india.org/data.json')
     .then(function (response) {
       if (response !== undefined &&
        response.data.tested.length>0) {
         //console.log('from whole country data',response)
         let tData = response.data.tested;
         tData = tData[tData.length - 1]
         //console.log("testted Data", tData);
         //console.log("length of tested data",tData.length)
         td.setState({ testedData: tData })
       }
     })
      .catch(function (error) {
          console.log(error);
       })
      .finally(function () {

      });
      //console.log('after filtering data', this.testedData);
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
