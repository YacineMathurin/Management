import { CardHeader } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExtensionIcon from '@material-ui/icons/Extension';
import NotificationsActiveOutlinedIcon from '@material-ui/icons/NotificationsActiveOutlined';
import React from 'react';
import TableMonDossier from './TableMonDossier';
import Alert from '@material-ui/lab/Alert';




class PageMonDossier extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiKey : props.apiKey,
      synthese : null,
     
    }
  }



  componentDidMount() {
  } 

  handleCallRetourDetails = (requete) => {
    localStorage.setItem("lastQuery", requete.requeteDTF);
    localStorage.setItem("lastTypePari", requete.typePari);
    
    this.props.callbackRetourDetails(requete)
  } 

  classes = makeStyles((theme: Theme) =>
    createStyles({
    }),
  );

 

  render() {
  return (
    <div className={this.classes.root}>
     
    {/* Section recherche  */}
    <Container style={{minWidth:'1200px', maxWidth:'1200px', backgroundColor: '#FAFBFC',height: '100%' }}>
    
    
    <Card>
    <CardContent>
  
    <Typography color="textSecondary" gutterBottom variant="h5" style={{color:"#454E54", lineHeight:"0.5em"}}>Mes sélections</Typography>
    <div style={{marginTop:"1em"}}></div>
    <Typography color="textSecondary" gutterBottom variant="body1">Retrouvez l'ensemble de vos sélections de jeu.</Typography>
    
    <div style={{marginTop:"1em"}}>
    <TableMonDossier  apiKey = { this.props.apiKey } callbackRetourDetails = { this.handleCallRetourDetails }></TableMonDossier>
    
    </div>
    <div style={{marginTop:"1em"}}>
     <Alert severity="info"><span>Vos sélections sont automatiquement mise à jour quotidiennement à 07h00.</span></Alert>
  </div>

    </CardContent>
    </Card>
    </Container>
    </div>
  )}
}

export default PageMonDossier;