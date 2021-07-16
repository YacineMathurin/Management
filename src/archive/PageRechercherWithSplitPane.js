import AppBar from '@material-ui/core/AppBar'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Fab from '@material-ui/core/Fab'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import CloseIcon from '@material-ui/icons/Close'
import SearchIcon from '@material-ui/icons/Search'
import React from 'react'
import ReactFilterBox from "react-filter-box"
import "react-filter-box/lib/react-filter-box.css"
import RGL, { WidthProvider } from "react-grid-layout"
import { BrowserRouter, Link, Route, Switch } from "react-router-dom"
import '../node_modules/react-grid-layout/css/styles.css'
import '../node_modules/react-resizable/css/styles.css'
import data from "./data/data"
import GraphSelection from './GraphSelection'
import TableDetailsCourse from './TableDetailsCourse'
import TablePariHistorique from './TablePariHistorique'
import TableSelections from './TableSelections'





const ReactGridLayout = WidthProvider(RGL);

export default class PageRecherche extends React.Component {
 
  constructor(props){
    super(props);
    this.state = {
        data: data,
        searchStatus: 'busy',
        userSelection: {"id":0,"code":"0","utilisateur":"0","backtestDTO":[{"id":0,"idSelection":0,"progression":"","exp":"0","pari":"","pourcentageReussite":0,"solde":"0","rendement":"","evolution":{"bilan":[{"date":"0", "solde":"0", "course":"0", "win":"0", "gain":"0"}]}}]},
        offsetLayout: 0
    }

     this.options = [
        {
            columnField: "Hippodrome.Nom",
            type:"selection"
        },
        {
            columnField: "Course.Nom",
            type:"selection"
        },
        {
            columnField: "Driver.Nom",
            type:"selection"
        },
    ];
}

componentDidMount() {
  console.log('I was triggered during componentDidMount')
  console.log(this.state.userSelection.backtestDTO[0].evolution.bilan.length)
}

onParseOk(expressions){
    this.setState( { searchStatus: 'Parse OK' } )
}
onChange(expressions){
    this.setState( { searchStatus: 'Changing' } )
}
onParseError(expressions){
    this.setState( { searchStatus: 'Parse Error' } )
}

onSearchBoxClick = () => {
  console.info('user clicked on onSearchBoxClick');
};

onSearchBoxClose = () => {
  console.info('user clicked on onSearchBoxClose');
  this.setState( { offsetLayout: 0 })
};

callbackFromSelectionTableChoose = (selection) => {
    console.log('callback from SelectionTable : selection = ' + selection.id + " -- " + selection.code)
    this.setState( { userSelection: selection })
  }

  callbackFromSelectionTableSearch = () => {
    console.log('user requested selection search')
    if ( this.state.offsetLayout > 0) {
      this.setState( { offsetLayout: 0 })
    } else {
      this.setState( { offsetLayout: 4 })
    }
  }

render(){

    const layout = [
      // for the selection table
      {i: 'a', x: 0, y: 0, w: 3, h: 3, static: true},
      // for  the search filter box 
      {i: 'a1', x: 3.05, y: 0, w: 8.95, h: 1, static: true},
      // for the graph
      {i: 'b', x: 3.05, y: this.state.offsetLayout, w: 6.1, h: 1, static: true},
      // for the course details
      {i: 'c', x: 9.2, y: this.state.offsetLayout, w: 2.8, h: 1, static: true},
      // for the tab view
      {i: 'd', x: 3.05, y: 7.5 + this.state.offsetLayout, w: 8.95, h: 1, static: true}
    ];
  
    return <div className="main-container"> 

    <ReactGridLayout  preventCollision={true} isDraggable={false} isResizeable={false} layout={layout} cols={12} rowHeight={30}  >
      <div key="a">

  <TableSelections callbackFunctionSelectionChoose={ this.callbackFromSelectionTableChoose }
              callbackFunctionSelectionSearch={this.callbackFromSelectionTableSearch }
  />

      {/*<TableSyntheseSelection/>*/}

        </div>
      <div key="a1">
      {(this.state.offsetLayout > 0) && (
      <Box display="flex">
        <Box flexGrow={1}>
       <ReactFilterBox 
                query={this.state.query}
                data={data}
                options={this.options}
                onParseOk={this.onParseOk.bind(this)}
                onChange={this.onChange.bind(this)}
                onParseError={this.onParseError.bind(this)}
             /></Box>
        <Box flexDirection="column" alignSelf="flex-center">
         <Box m={1}>    
         <Fab aria-label="search" size='small' color='primary' onClick={ this.onSearchBoxClick }>
          <SearchIcon />
        </Fab></Box>
        <Box m={1}>  
          <Fab aria-label="close" size='small' color='secondary' onClick={ this.onSearchBoxClose }>
          <CloseIcon />
        </Fab>
        </Box>
                </Box>
                </Box>
      )}
       </div>
           <div key="b">
           {(this.state.userSelection.backtestDTO[0].evolution.bilan.length > 1) && (
        <GraphSelection width = {0} height = {0} userSelection= { this.state.userSelection } />
      )}
           {(this.state.userSelection.backtestDTO[0].evolution.bilan.length < 2) && (
            <Box display="flex" flexDirection="column" justifyContent="center">
              <Button disabled> </Button><Button disabled> </Button><Button disabled> </Button>
              <Button disabled>Pas de donnees</Button>
              <Button disabled>Chossissez ou recherchez une selection a partir du tableau de droite...</Button>
            </Box>
      )}</div>
            <div key="c">
            <Box component="div" overflow="hidden">
         <TableDetailsCourse></TableDetailsCourse>
         </Box>
      </div>
            {/* <div key="b"><GraphSelection  userSelection= { this.state.userSelection } /></div> */}
      <div key="d">
      <Box component="div" overflow="scroll">
<BrowserRouter>
<AppBar position="static">
<Tabs 
// onChange={handleChange}
value={0}
indicatorColor="primary"
textColor="white"
centered
>
<Tab label="Informations" component= { Link } to= '/one' />
<Tab label="Pronostics" component= { Link } to= '/two' />
<Tab label="Historique des paris" component= { Link } to= '/three' />

</Tabs>
</AppBar>
<Switch>
<Route path='/two' component={TablePariHistorique} />
<Route path='/three' component={TablePariHistorique} />

</Switch>
</BrowserRouter>
</Box>
      </div>
      </ReactGridLayout>
    </div>

}
}
