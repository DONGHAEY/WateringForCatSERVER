import axios from "axios";
import React, { Component } from "react";
import Chart from "react-apexcharts";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: ['ready', '...', '...', '...', '...', '...', '...', '...']
        }
      },
      series: [
        {
          name: "series-1",
          data: ['...', '...', '...', '...', '...', '...', '...', '...']
        }
      ]
    };
  }
  
  async componentDidMount () {
      const second=[], date =[]
      await axios.post("/api/chart")
      .then(response => {
          for(let i=0; i<4; i++) {
            second.push(response.data.second[i]);
            date.push(response.data.date[i]);
          }
          this.setState({
            options: {
              chart: {
                id: "d-bar"
              },
              xaxis: {
                categories: date
              }
            },
            series: [
              {
                name: "series-1",
                data: second
              }
            ]
          })
      }

    )}

  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="line"
              width="500"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;