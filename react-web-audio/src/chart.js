import React from 'react';
import ReactDOM from 'react-dom';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack } from 'victory';
import axios from 'axios';


const data2014 = [
  {date: "06/04/19", score: 70},
  {date: "06/11/19", score: 60},
  {date: "06/15/19", score: 75},
  {date: "06/19/19", score: 80}
];


class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state={
  scores: [],
  error: ""


    }
}

componentDidMount(){
  axios
  .get('http://localhost:5000/scores')
  .then(res=> {
    console.log("resolved", res.data)

    this.setState({
      scores: res.data,
      error:""
    })
  })
  .catch(err=> {
    console.log("error", err)
    this.setState({error:"scores not found"})
  });
}

    render() {
    console.log(this.state.scores);
    { this.state.scores.map(score=> 
      {console.log("in render():", score.score, score.date) }
      )};
      return (
     
        <div>
              { this.state.scores.map(score=> 
      {console.log("in return():", score.score, score.date) }
      )};



          <h1>Victory Tutorial!</h1>
           <VictoryChart
            domainPadding={20}

            theme={VictoryTheme.material}
            domain={{ y: [0, 100] }}
          >
            <VictoryAxis
              // tickValues={["06/01", "06/02", "06/03", "06/04", "06/05", "06/06"]}
              tickValues={this.state.scores.map(score =>{
                return (
                  `${score.date}`
                )})}
              // tickValues={score.date}
            />
           
            <VictoryAxis
              dependentAxis
              // tickFormat={(x) => (`${x / 10}`)}
              // tickFormat={(`${score.score}`) => (`$${score.score} / 10}`)
              // this.state.scores.map(score=> {
              //   return (
              // ( `${score.score}pt`)
              //    )
              //  })
               tickFormat={ 
                (x) => (`
                ${x}`)
              }
            />
       {/* <VictoryStack
              colorScale={"warm"}
            > */}
      
          
                   <VictoryBar
                data={this.state.scores}
                x={'date'}
                y={'score'}
                style={{ data: { fill: "#c43a31", stroke: "black", strokeWidth: 2 }}}
                labels={(d) => `${d.score}`}
              />
            {/* </VictoryStack>
       */}
            
         </VictoryChart>
       
        </div>
      );
    }
  }

  export default Chart;
