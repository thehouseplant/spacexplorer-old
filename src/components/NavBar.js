import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Drawer from 'material-ui/Drawer';
import Hidden from 'material-ui/Hidden';
import IconButton from 'material-ui/IconButton';
import List, { ListItem, ListItemText } from 'material-ui/List';
import MenuIcon from 'material-ui-icons/Menu';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  fullList: {
    width: 'auto',
  },
  list: {
    width: 250,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class NavBar extends Component {
  state = {
    left: false,
  };

  toggleDrawer = (open) => () => {
    this.setState({
      left: open,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Hidden mdUp>
              <IconButton className={classes.menuButton} onClick={this.toggleDrawer(true)} color="inherit" aria-label="Menu">
                <MenuIcon />
              </IconButton>
              <Drawer open={this.state.left} onClose={this.toggleDrawer(false)}>
                <div tabIndex={0} role="button" onClick={this.toggleDrawer(false)} onKeyDown={this.toggleDrawer(false)}>
                  <div className={classes.list}>
                    <List>
                      <ListItem button component={Link} to="/">
                        <ListItemText primary="Home" />
                      </ListItem>
                      <ListItem button component={Link} to="/launches">
                        <ListItemText primary="Launches" />
                      </ListItem>
                      <ListItem button component={Link} to="/rockets">
                        <ListItemText primary="Rockets" />
                      </ListItem>
                      <ListItem button component={Link} to="/launchpads">
                        <ListItemText primary="Launch Pads" />
                      </ListItem>
                      <ListItem button component={Link} to="/capsules">
                        <ListItemText primary="Capsules" />
                      </ListItem>
                      <ListItem button component={Link} to="/cores">
                        <ListItemText primary="Cores" />
                      </ListItem>
                    </List>
                  </div>
                </div>
              </Drawer>
            </Hidden>
            <Typography variant="title" color="inherit" className={classes.flex}>
              SpaceXplorer
            </Typography>
            <Hidden smDown>
              <Button component={Link} to="/" color="inherit">
                Home
              </Button>
              <Button component={Link} to="/launches" color="inherit">
                Launches
              </Button>
              <Button component={Link} to="/rockets" color="inherit">
                Rockets
              </Button>
              <Button component={Link} to="/launchpads" color="inherit">
                Launch Pads
              </Button>
              <Button component={Link} to="/capsules" color="inherit">
                Capsules
              </Button>
              <Button component={Link} to="/cores" color="inherit">
                Cores
              </Button>
            </Hidden>
          </Toolbar>
        </AppBar>
      </div>
    );
  };
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);
