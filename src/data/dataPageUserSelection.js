import React from "react";
import TinyLineChart from '../TinyLineCharts'
import Avatar from 'react-avatar'

export const testData = [
  {"id":1,"code":"ERA","utilisateur":"information@dataturf.fr","requete":"Driver.Nom\u003d\"E. RAFFIN\"","description":"Les engagements du driver E. RAFFIN","creation":"15/11/2019","backtestDTO":[{"id":1,"idSelection":1,"creation":"2019-11-23 11:18","pari":"SIMPLE_PLACE","gestion":"MASSE_EGALE","nombreTicket":"16.0","pourcentageReussite":"50.0","solde":"5.8","rendement":"136.0","evolution":{"bilan":[{"gains":"-272.41"},{"gains":"-271.88"},{"gains":"-270.64"},{"gains":"-271.64"},{"gains":"-272.64"},{"gains":"-273.64"},{"gains":"-274.64"},{"gains":"-275.64"},{"gains":"-274.81"},{"gains":"-275.81"},{"gains":"-271.66"},{"gains":"-270.76"},{"gains":"-271.76"},{"gains":"-271.04"},{"gains":"-272.04"},{"gains":"-273.04"},{"gains":"-274.04"},{"gains":"-273.76"},{"gains":"-274.76"},{"gains":"-274.26"},{"gains":"-275.26"},{"gains":"-273.52"},{"gains":"-268.94"},{"gains":"-269.94"},{"gains":"-269.05"}]}}]},
  {"id":1,"code":"WTA","utilisateur":"information@dataturf.fr","requete":"Driver.Nom\u003d\"E. RAFFIN\"","description":"Les engagements du driver E. RAFFIN","creation":"15/11/2019","backtestDTO":[{"id":1,"idSelection":1,"creation":"2019-11-23 11:18","pari":"SIMPLE_PLACE","gestion":"MASSE_EGALE","nombreTicket":"16.0","pourcentageReussite":"50.0","solde":"5.8","rendement":"-110.0","evolution":{"bilan":[{"gains":"-100.41"},{"gains":"-271.88"},{"gains":"-270.64"},{"gains":"-150.64"},{"gains":"-272.64"},{"gains":"-273.64"},{"gains":"-200.64"},{"gains":"-275.64"},{"gains":"-274.81"},{"gains":"-275.81"},{"gains":"-271.66"},{"gains":"-270.76"},{"gains":"-271.76"},{"gains":"-271.04"},{"gains":"-272.04"},{"gains":"-273.04"},{"gains":"-274.04"},{"gains":"-273.76"},{"gains":"-274.76"},{"gains":"-274.26"},{"gains":"-275.26"},{"gains":"-273.52"},{"gains":"-268.94"},{"gains":"-269.94"},{"gains":"-269.05"}]}}]},
  {"id":1,"code":"PBZ","utilisateur":"information@dataturf.fr","requete":"Driver.Nom\u003d\"E. RAFFIN\"","description":"Les engagements du driver E. RAFFIN","creation":"15/11/2019","backtestDTO":[{"id":1,"idSelection":1,"creation":"2019-11-23 11:18","pari":"SIMPLE_PLACE","gestion":"MASSE_EGALE","nombreTicket":"16.0","pourcentageReussite":"50.0","solde":"5.8","rendement":"-200.0","evolution":{"bilan":[{"gains":"-120.41"},{"gains":"-271.88"},{"gains":"-300.64"},{"gains":"-271.64"},{"gains":"-272.64"},{"gains":"-300.64"},{"gains":"-274.64"},{"gains":"-275.64"},{"gains":"-220.81"},{"gains":"-275.81"},{"gains":"-271.66"},{"gains":"-270.76"},{"gains":"-150.76"},{"gains":"-271.04"},{"gains":"-272.04"},{"gains":"-273.04"},{"gains":"-274.04"},{"gains":"-273.76"},{"gains":"-274.76"},{"gains":"-274.26"},{"gains":"-275.26"},{"gains":"-273.52"},{"gains":"-268.94"},{"gains":"-269.94"},{"gains":"-269.05"}]}}]},
  {"id":1,"code":"TUX","utilisateur":"information@dataturf.fr","requete":"Driver.Nom\u003d\"E. RAFFIN\"","description":"Les engagements du driver E. RAFFIN","creation":"15/11/2019","backtestDTO":[{"id":1,"idSelection":1,"creation":"2019-11-23 11:18","pari":"SIMPLE_PLACE","gestion":"MASSE_EGALE","nombreTicket":"16.0","pourcentageReussite":"50.0","solde":"5.8","rendement":"257.0","evolution":{"bilan":[{"gains":"-272.41"},{"gains":"-271.88"},{"gains":"-128.64"},{"gains":"-271.64"},{"gains":"-150.64"},{"gains":"-180.64"},{"gains":"-120.64"},{"gains":"-275.64"},{"gains":"-274.81"},{"gains":"-275.81"},{"gains":"-271.66"},{"gains":"-270.76"},{"gains":"-271.76"},{"gains":"-271.04"},{"gains":"-272.04"},{"gains":"-273.04"},{"gains":"-274.04"},{"gains":"-273.76"},{"gains":"-274.76"},{"gains":"-274.26"},{"gains":"-275.26"},{"gains":"-273.52"},{"gains":"-268.94"},{"gains":"-269.94"},{"gains":"-269.05"}]}}]}
  ];

  export const columns = [
    {
      label: "Strategie",
      name: "code",
      options: {
        filter: true,
        sort: true,
        customHeadRender: (data) => {
          return (<h3></h3>)
        },
        customBodyRender: (data) => {
          return (
            <div>
            <Avatar name={data[0] + " " + data[1] + " " + data[2]} size="50" textSizeRatio="1.75"/>
            </div>
          )
      }
    }
    },
    {
      label: "Description",
      name: "description",
      options: {
        filter: true,
        sort: true,
        customHeadRender: (data) => {
          return (<h3></h3>)
        },
        customBodyRender: (data) => {
          return (
            <div>
            <h4>{data}</h4>
            </div>
          )
      }
    }
    },
    {
      label: "Pari",
      name: "backtestDTO",
      options: {
        filter: true,
        sort: true,
        customHeadRender: (data) => {
          return (<div><h3></h3></div>)
        },
        customBodyRender: (data) => {
          return (
            <div>
            <h4>{data[0].pari}</h4>
            </div>
          )
      }
    }
    },
    {
      label: "Rendement",
      name: "backtestDTO",
      options: {
        filter: true,
        sort: true,
        customHeadRender: (data) => {
          return (<div><h3></h3></div>)
        },
        customBodyRender: (data) => {
          if (data[0].rendement > 0) {
          return (
            <h3 style= {{color:"green"}}> {data[0].rendement}%</h3>
          )}
          else {
            return (
              <h3 style= {{color:"red"}}> {data[0].rendement}%</h3>
            ) 
          }
      }
      }
    },
    {
      label: "Evolution",
      name: "backtestDTO",
      options: {
        filter: false,
        sort: false,
        customHeadRender: (data) => {
          return (<div><h3></h3></div>)
        },
        customBodyRender: (data) => {
            var color = "url(#colorUp)"
            if ( data[0].rendement < 0) {
             color = "url(#colorDo)" 
            }
          return (
            <TinyLineChart data={data[0].evolution.bilan} color={color}/>
          )
        }
      }
    }
  ];

 