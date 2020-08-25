import React, { Component } from 'react'

class DataFetch extends Component {

    constructor() {
        super()
        this.state = {
            loading: true,
            statewise:[]
        }
   }

    async componentDidMount() {
        const url = "https://api.covid19india.org/data.json";
        const response = await fetch(url);
        const data = await response.json();
        let arr = data.statewise
        console.log('arrr is ',arr)
        console.log(typeof arr)
        this.setState({ statewise: arr, loading: false });
      
    }
    render() {
        console.log('from sate statewise data',this.state.statewise)
        if (this.state.loading) {
            return <div>loading...</div>;
        }
        return (
            <div>
                {this.state.statewise[0].recovered}
            </div>
        )
    }
}

export default DataFetch
