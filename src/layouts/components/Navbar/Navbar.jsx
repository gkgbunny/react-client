import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import LockOpen from '@material-ui/icons/LockOpen';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  grow: {
    flexGrow: 1,
  },
  leftIcon: {
    marginLeft: theme.spacing.unit,
  },
});

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  linkButton = (name, path) => (
    <Link
      component={RouterLink}
      color="inherit"
      underline="none"
      to={path}
    >
      <Button color="inherit">{name}</Button>
    </Link>
  )

  render() {
    const { classes } = this.props;
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Trainee Portal
            </Typography>
            {this.linkButton('TRAINEE', '/')}
            {this.linkButton('TEXTFIELD DEMO', '/textfielddemo')}
            {this.linkButton('INPUT DEMO', '/inputdemo')}
            {this.linkButton('CHILDREN DEMO', '/childrendemo')}
            <Button color="inherit">
              <LockOpen className={classes.leftIcon} />
              LOGOUT
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.objectOf.isRequired,
};
export default withStyles(styles)(Navbar);
