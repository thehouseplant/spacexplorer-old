import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';

import NavBar from './NavBar';
import Main from './Main';
import Footer from './Footer';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
});

class App extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <NavBar />
        <div style={{ padding: '95px 5% 25px 5%' }}>
          <Grid container className={classes.root}>
            <Grid item xs={12}>
              <Main />
            </Grid>
          </Grid>
        </div>
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
