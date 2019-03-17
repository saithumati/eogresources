import * as actions from "../actions";

const initialState = {
  loading: false,
  timestamp: "",
  metric: "",
  latitude: null,
  longitude: null,
  data: {}
};

const startLoading = (state, action) => {
  return { ...state, loading: true };
};

const droneDataRecevied = (state, action) => {
  const { data } = action;
  if (!data["data"]) return state;
  const drone = data.data[0];
  const { timestamp, metric, latitude, longitude } = drone;
 
  return {
    ...state,
    loading: false,
    timestamp,
    metric,
    latitude,
    longitude,
    data: action.data
  };
};

const handlers = {
  [actions.FETCH_DRONE_DATA]: startLoading,
  [actions.DRONE_DATA_RECEIVED]: droneDataRecevied
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === "undefined") return state;
  return handler(state, action);
};
