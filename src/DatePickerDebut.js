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



export default class DatePickerDebut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: new Date("2020-01-01"),
      maxDate: new Date()
    }
  }

  handleDateDebut = (date) => {
    this.setState({ selectedDate: date })
    this.props.callbackHandleDateDebut(date)
  } 
  
  render() {
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={frLocale}>

      <KeyboardDatePicker
          size="small"
          autoOk
          minDate={new Date("2013-01-01")}
          maxDate={this.state.maxDate}
          fullWidth= "true"
          variant="inline"
          inputVariant="outlined"
          label="Début"
          format="dd/MM/yyyy"
          value={this.state.selectedDate}
          InputAdornmentProps={{ position: "start" }}
          onChange={date => this.handleDateDebut(date)}
          cancelLabel="Annuler"
          okLabel="Valider"
        />
       
      </MuiPickersUtilsProvider>
    );
  }
}