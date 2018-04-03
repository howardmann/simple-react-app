import React, { Component } from 'react';

class AddUser extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: '',
      value: 'type here'
    }
  }

  ping(){
    return fetch('http://localhost:8080/ping')
      .then(response => response.json())
      .then(json => {
        let data = json.data
        this.setState({data: data})
      })
  }

  handleChange(e){
    let text = e.target.value
    this.setState({value: text})
  }
  
  addUser(){
    console.log(this.state.value);
    this.setState({value: '...loading'})
    return fetch('http://localhost:8080/user/add',{
      method: 'POST',
      headers: {
        Accept: 'application/json', 'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        value: this.state.value
      })
    })
    .then(response => response.json())
    .then(json => {
      console.log(json);
      let value = json.result.toString()
      this.setState({value})
    })    
  }

  _handleKeyPress(e){
    if (e.key === 'Enter') {
      this.addUser()
    }    
  }

  render() {
    return (
      <div className="AddUser">
        <p>
          Welcome: {this.props.message}
        </p>
        <button onClick={this.ping.bind(this)}>Ping</button>
        <p>Response: {this.state.data}</p>
        <input placeholder={this.state.value} onChange={(e) => { this.handleChange(e) }} onKeyPress={(e) => this._handleKeyPress(e)}/>
        <input type="submit" value="addUser" onClick={() => this.addUser()}/>
        <p>{this.state.value}</p>
      </div>
    );
  }
}

export default AddUser;
