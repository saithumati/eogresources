import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardHeaderRaw from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { compose, withProps } from "recompose";
import * as actions from "../store/actions";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

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

const MyMapComponent = compose(
  withProps({
    /**
     * Note: create and replace your own key in the Google console.
     * https://console.developers.google.com/apis/dashboard
     * The key "AIzaSyBkNaAGLEVq0YLQMi-PYEMabFeREadYe1Q" can be ONLY used in this sandbox (no forked).
     */
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyABeMwe9COAlChfgKDUYApP48vXWybwyc4&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={8} defaultCenter={{ lat: props.lat, lng: props.lon }}>
    <Marker position={{ lat: props.lat, lng: props.lon }} />
  </GoogleMap>
));

class MapVisualization extends Component {
  componentDidMount() {
    this.props.onLoad();
    this.interval = setInterval(() => {
      this.props.onLoad();
    }, 4000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const {
      classes,
      loading,
      latitude,
      longitude
    } = this.props;
    return (
      <Card className={classes.card}>
        <CardHeader title="Map Visualization" />
        <CardContent>
          <div className={classes.progress}>
            {loading && <CircularProgress className={classes.circular} />}
          </div>
          {latitude && <MyMapComponent lat={latitude} lon={longitude} />}
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
  )(MapVisualization)
);
