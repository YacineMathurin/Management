import React, { useState, Component } from 'react';
import frLocale from "date-fns/locale/fr";
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';



export default class DatePickerPronostics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: new Date()
      
    }
  }

  handleDatePronostics = (date) => {
    this.setState({ selectedDate: date })
    this.props.callbackHandleDatePronostics(date)
  } 
  
  render() {
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={frLocale}>

      <KeyboardDatePicker
          autoOk
          minDate={new Date("2018-01-01")}
          size="small"
          fullWidth= "true"
          variant="inline"
          inputVariant="outlined"
          label="Date"
          format="dd/MM/yyyy"
          value={this.state.selectedDate}
          InputAdornmentProps={{ position: "start" }}
          onChange={date => this.handleDatePronostics(date)}
          cancelLabel="Annuler"
          okLabel="Valider"
        />
       
      </MuiPickersUtilsProvider>
    );
  }
}