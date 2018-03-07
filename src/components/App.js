import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import blueGrey from 'material-ui/colors/blueGrey';
import lightBlue from 'material-ui/colors/lightBlue';
import red from 'material-ui/colors/red';
import Grid from 'material-ui/Grid';

import NavBar from './NavBar';
import Main from './Main';
import Footer from './Footer';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
});

const theme = createMuiTheme({
  palette: {
    primary: { main: lightBlue[900] },
    secondary: { main: blueGrey[900] },
    error: red,
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

class App extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <NavBar />
          <div style={{ padding: '95px 5% 25px 5%' }}>
            <Grid container className={classes.root}>
              <Grid item xs={12}>
                <Main />
              </Grid>
            </Grid>
          </div>
          <Footer />
        </MuiThemeProvider>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
