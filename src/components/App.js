import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Subject } from 'rxjs';
import Child from './Child';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.subject$ = new Subject();
    // add log in console of last value and also I update redex state
    this.unsubscribe = this.subject$.asObservable().subscribe((value) => {
      this.props.dispatch({ type: 'LAST_VALUE', value });
    });
  }
  dispatchValue() {
    // I emit the new value
    this.subject$.next(Math.random());    
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    const {lastValue} = this.props;
    // define childList and also the config of each one
    const childList = [
      { min: 0.2, max: 0.3 },
      { min: 0.4, max: 0.5 },
      { min: 0.6, max: 0.8 },
    ];
    // I pass the observable in every child for recive the stream of data -> .subscribe()
    const childs = childList.map((config, index) =>
      <Child key={index} min={config.min} max={config.max} observable={this.subject$.asObservable()}></Child>
    );
    return (
      <div>
        <p>
          <button className="button" onClick={this.dispatchValue.bind(this)}>
            Random Value
          </button>          
        </p>
        {childs}
        <p>Last Value: {lastValue}</p>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { lastValue: state.lastValue }
}

export default connect(mapStateToProps)(Counter);
