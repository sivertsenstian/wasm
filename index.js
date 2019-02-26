import React, { Component } from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider, connect } from "react-redux";
import rust from "./crate/Cargo.toml";

// ACTIONS
const actionTypes = {
  RUST_INCREMENT: "[RUST] Increment",
  INCREMENT: "[WASM] Increment",
  DECREMENT: "[WASM] Decrement",
  SET_NAME: "[WASM] Set Name",
  ALERT: "[WASM] Alert",
  RESET_ALERT: "[WASM] Reset alert"
};

const increment = () => {
  return { type: actionTypes.INCREMENT };
};
const decrement = () => {
  return { type: actionTypes.DECREMENT };
};
const setName = name => {
  return { type: actionTypes.SET_NAME, payload: name };
};

const redAlert = name => {
  return { type: actionTypes.ALERT, payload: name };
};

const resetAlert = () => {
  return { type: actionTypes.RESET_ALERT };
};

// STORE
const initialState = {
  name: "Jensen",
  count: 0,
  alert: null
};

const wasmReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RUST_INCREMENT: {
      return { ...state, count: rust.inc(state.count * 2) };
    }
    case actionTypes.INCREMENT: {
      return { ...state, count: rust.inc(state.count) };
    }
    case actionTypes.DECREMENT: {
      return { ...state, count: rust.dec(state.count) };
    }
    case actionTypes.SET_NAME: {
      return { ...state, name: rust.greet(action.payload) };
    }
    case actionTypes.ALERT: {
      return { ...state, alert: action.payload };
    }
    case actionTypes.RESET_ALERT: {
      return { ...state, alert: null };
    }
    default: {
      return state;
    }
  }
};
const store = createStore(wasmReducer, initialState);

// COMPONENT
const mapStateToProps = ({ count, name, alert }) => {
  return {
    count,
    name,
    alert
  };
};

const mapDispatchToProps = {
  increment,
  decrement,
  setName,
  redAlert,
  resetAlert
};

class AppComponent extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.alert !== null) {
      rust.red_alert(nextProps.alert);
      this.props.resetAlert();
    }
  }

  render() {
    return (
      <div>
        <h1>Hello WASM => {this.props.name}</h1>
        <h2>THE COUNT IS: {this.props.count}</h2>
        <button onClick={this.props.increment}>increment</button>
        <button onClick={this.props.decrement}>decrement</button>
        <input
          type="text"
          defaultValue={this.props.name}
          onInput={e => this.props.setName(e.target.value)}
        />
        <button onClick={() => this.props.redAlert(this.props.name)}>
          Red alert!
        </button>
      </div>
    );
  }
}

// APP BOOTSTRAP
const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppComponent);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
