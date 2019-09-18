import React, { Component } from 'react';

import AppBar from '../components/navigation/AppBar';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../style/theme';
import Presentacion from '../components/navigation/Presentation';
import CertificatesForm from '../components/certificates/certificatesForm';


export default class Certificates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {

  }

  render() {
    return(
      <div>
        <MuiThemeProvider theme={theme}>
          <AppBar/>
          <CertificatesForm/>
        </MuiThemeProvider>
      </div>
    )
  }
}
