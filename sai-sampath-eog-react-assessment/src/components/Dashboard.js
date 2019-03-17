import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardHeaderRaw from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import * as actions from "../store/actions";

const cardStyles = theme => ({
  root: {
    background: theme.palette.primary.main
  },
  title: {
    color: "white",
    fontFamily: "serif"
  }
});
const CardHeader = withStyles(cardStyles)(CardHeaderRaw);

const styles = {
  card: {
    margin: "5% 25%",
    fontFamily: "serif"
  },
  table: {
    width: "100%"
  },
  progress: {
    position: "relative"
  },
  circular: {
    position: "absolute",
    top: 0,
    right: 0
  }
};

class Dashboard extends Component {
  componentDidMount() {
    this.props.onLoad();
    this.interval = setInterval(() => {
      this.props.onLoad();
    }, 4000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  formatTime = timestamp => {
    const date = new Date(timestamp);
    return `${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()} @${date.getHours()}:${date.getMinutes()}`;
  };

  render() {
    const {
      classes,
      loading,
      timestamp,
      metric,
      latitude,
      longitude
    } = this.props;
    const dateTime = this.formatTime(timestamp);
    return (
      <Card className={classes.card}>
        <CardHeader title="Dashboard" />
        <CardContent>
          <div className={classes.progress}>
            {loading && <CircularProgress className={classes.circular} />}
          </div>
          {timestamp && (
            <table className={classes.table}>
              <tbody>
                <tr>
                  <td>Temperature</td>
                  <td>:</td>
                  <td>{metric}</td>
                </tr>
                <tr>
                  <td>Latitude</td>
                  <td>:</td>
                  <td>{latitude}</td>
                </tr>
                <tr>
                  <td>Longitude</td>
                  <td>:</td>
                  <td>{longitude}</td>
                </tr>
                <tr>
                  <td>Last Received On</td>
                  <td>:</td>
                  <td>{dateTime}</td>
                </tr>
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    );
  }
}

const mapState = (state, ownProps) => {
  const { loading, timestamp, metric, latitude, longitude } = state.drone;
  return {
    loading,
    timestamp,
    metric,
    latitude,
    longitude
  };
};

const mapDispatch = dispatch => ({
  onLoad: () =>
    dispatch({
      type: actions.FETCH_DRONE_DATA
    })
});

export default withStyles(styles)(
  connect(
    mapState,
    mapDispatch
  )(Dashboard)
);
