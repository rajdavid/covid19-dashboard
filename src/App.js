import React,{Component} from 'react';
import './App.css';

//import HomePage from './Service/HomePage';
import DataFetch from './components/DataFetch';

class App extends Component {
//<HomePage />
  render() {
    return (
      <div>
        <h1>Hello </h1>
        <DataFetch/>
      </div>
    )
    
  }
}
export default App;
