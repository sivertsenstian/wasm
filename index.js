import React, { Component } from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider, connect } from "react-redux";

// ACTIONS
const actionTypes = {
  INCREMENT: "[WASM] Increment",
  DECREMENT: "[WASM] Decrement",
  SET_NAME: "[WASM] Set Name"
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

// STORE
const initialState = {
  name: "Jensen",
  count: 0
};

const wasmReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INCREMENT: {
      return { ...state, count: state.count + 1 };
    }
    case actionTypes.DECREMENT: {
      return { ...state, count: state.count - 1 };
    }
    case actionTypes.SET_NAME: {
      return { ...state, name: action.payload };
    }
    default: {
      return state;
    }
  }
};
const store = createStore(wasmReducer, initialState);

// COMPONENT
const mapStateToProps = state => {
  return {
    count: state.count,
    name: state.name
  };
};

const mapDispatchToProps = { increment, decrement, setName };

class AppComponent extends Component {
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
