import React from 'react';
import './App.css';

import PageTopSelections from './PageTopSelections'
import PageDetailsSelection from './PageDetailsSelection';
import Dashboard2 from './Dashboard2';
import LoginPage from './LoginPage'
import PageRechercheSelection from './PageRechercheSelection'
import PageClassementTrotteur from './PageClassementTrotteur'

const AppContext = React.createContext();

// function App() {
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiKey: null,
      showDetailsSelection: -1,
      editDetailsSelection: -1
    }
  }

  handleCallbackLogin = (data) => {
    console.log('callback : data = ' + data)
    this.setState( { 'apiKey': data } )
  }

  handleCallbackDetails = (data) => {
    console.log('callback details wants to view = ' + data)
    this.setState( { 'showDetailsSelection': data } )
  }

  handleCallbackEdit = (data) => {
    console.log('callback details wants to edit = ' + data)
    this.setState( { 'editDetailsSelection': data } )
  }
  
  handleCallbackRetourDetails = () => {
    console.log('user wants to return to selection page')
    this.setState( { 'showDetailsSelection': -1, 'editDetailsSelection': -1 } )
  }

  render() {
    return (
      <div className="App">
     
        
      { (this.state.apiKey == null) && (<LoginPage callbackFunction = { this.handleCallbackLogin }/>) } 
      { (this.state.showDetailsSelection == -1) && (this.state.editDetailsSelection == -1) && (this.state.apiKey != null) && (<Dashboard2 callbackViewEdit = { this.handleCallbackEdit } callbackViewDetails = { this.handleCallbackDetails } apiKey = { this.state.apiKey }/>) } 
      { (this.state.showDetailsSelection > -1) && (this.state.apiKey != null) && (<PageDetailsSelection callbackRetourDetails = { this.handleCallbackRetourDetails } apiKey = { this.state.apiKey } showDetailsSelection = { this.state.showDetailsSelection }/>) } 
      { (this.state.editDetailsSelection > -1) && (this.state.apiKey != null) && (<PageRechercheSelection callbackRetourDetails = { this.handleCallbackRetourDetails } apiKey = { this.state.apiKey } editDetailsSelection = { this.state.editDetailsSelection }/>) } 
      </div>
    );
  }
}
export default App;
