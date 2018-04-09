import React, { Component } from 'react';
import './App.css';

class App extends Component {
    getInitialState: function() {
    return {
      inputValue: ''
    };
  },
  
  render() {
    return (
       <input value={this.state.inputValue} onChange={this.updateInputValue}/>
       <div>
         Please enter {this.state.inputValue}s that you have watched before. Remember, the more entries you include, the more accurate your predictions will be!
       </div>
    );
  },
    updateInputValue: function(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }
}

export default App;
