import React from 'react';
import axios from 'axios';

class Form extends React.Component {

state={
date: "",
score: ""
}

handleChange = event => {
    //graps from event.target see the callback you're passing is targe
     const {id, value} = event.target;
  this.setState({[id]: value})
}

submitForm = event => {
    event.preventDefault();
    const endpoint = 'http://localhost:5000/scores';

    axios
    .post(endpoint, this.state)
    .then(res=>{
        console.log(res);
      
        this.props.history.push('/Chart');
    })
    .catch(err=>{
        console.error('Add Score Error', err);
    });
};

render() {

    return(

<div>
<h2>Score Form</h2>
<form onSubmit={this.submitForm}>
    <div>
        <label htmlFor="date"/>
        <input 
        id="date" 
        placeholder="mm/dd/yy"
    onChange={this.handleChange} 
    value={this.state.date} 
    type="text"/>
    </div>

    <div>
        <label htmlFor="score"/>
<input id="score" 
placeholder="00"
        onChange={this.handleChange} 
        value={this.state.score} 
        type="text"/>
        </div>
   
    <div><button type="submit">Add Score</button></div>
</form>




</div>



    )
}





}

export default Form;