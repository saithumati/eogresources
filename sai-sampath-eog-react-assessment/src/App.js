import React from "react";
import createStore from "./store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import {
  MuiThemeProvider,
  createMuiTheme,
  withStyles
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Wrapper from "./components/Wrapper";
import Dashboard from "./components/Dashboard";
import MapVisualization from "./components/MapVisualization";
import Button from "@material-ui/core/Button";

const store = createStore();
const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      main: "rgb(39,49,66)"
    },
    secondary: {
      main: "rgb(197,208,222)"
    },
    background: {
      main: "rgb(226,231,238)"
    }
  }
});

class App extends React.Component {
  state = {
    visualizationType: "dashboard"
  };

  showDashboard = () => {
    this.setState({
      visualizationType: "dashboard"
    });
  };

  showMap = () => {
    this.setState({
      visualizationType: "map"
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <Wrapper>
            <Header />
            <div className={classes.buttonContainer}>
              <Button
                onClick={this.showDashboard}
                variant="contained"
                color="secondary"
                className={classes.button}
              >
                Show Dashboard
              </Button>
              <Button
                onClick={this.showMap}
                variant="contained"
                color="secondary"
                className={classes.button}
              >
                Show Map
              </Button>
            </div>
            {this.state.visualizationType === "dashboard" && <Dashboard />}
            {this.state.visualizationType === "map" && <MapVisualization />}
            <ToastContainer />
          </Wrapper>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

const styles = theme => ({
  buttonContainer: {
    margin: "5% 25%"
  },
  button: {
    marginRight: 16
  }
});

export default withStyles(styles)(App);
