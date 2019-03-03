import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import trainees from './data/trainee';
import { NoMatch } from '../index';

const styles = theme => ({
  card: {
    display: 'flex',
    marginTop: theme.spacing.unit * 5,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  button: {
    marginTop: theme.spacing.unit,
  },
});

const getDateFormated = date => moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a');

const TraineeDetail = (props) => {
  const { classes, match } = props;
  if (trainees.some(trainee => trainee.id === match.params.id)) {
    const item = trainees.filter(trainee => trainee.id === match.params.id);
    return (
      <>
        <Card className={classes.card}>
          <CardMedia
            className={classes.cover}
            image="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22288%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20288%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_164edaf95ee%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_164edaf95ee%22%3E%3Crect%20width%3D%22288%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2296.32500076293945%22%20y%3D%22118.8%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" // eslint-disable-line max-len
            title="Image title"
          />
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h5" variant="h5">
                {item[0].name}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {getDateFormated(item[0].createdAt)}
              </Typography>
              <Typography variant="subtitle1">
                {item[0].email}
              </Typography>
            </CardContent>
          </div>
        </Card>
        <Typography align="center">
          <Link component={RouterLink} to="/trainee" underline="none">
            <Button className={classes.button} variant="outlined">
              BACK
            </Button>
          </Link>
        </Typography>
      </>
    );
  }
  return <NoMatch />;
};
TraineeDetail.propTypes = {
  classes: PropTypes.objectOf.isRequired,
  match: PropTypes.objectOf,
};
TraineeDetail.defaultProps = {
  match: {},
};
export default withStyles(styles)(TraineeDetail);
