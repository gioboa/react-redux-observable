import React, { Component } from 'react';
import { filter } from 'rxjs/operators';

class Child extends Component {
  constructor(props) {
    super(props);
    this.state = { value: 0, times: 0 };
    // I subscribe the component and I filter the value
    // there are more then 120 operators have a look -> https://gist.github.com/btroncone/d6cf141d6f2c00dc6b35#filter
    let newObservable = this.props.observable
      .pipe(
        filter((value)=> value >= this.props.min && value <= this.props.max )
      );
    this.unsubscribe = newObservable.subscribe((value)=> this.setState({times: this.state.times + 1}));
  }
  componentWillUnmount() {
    // prevent memory leak
    this.unsubscribe();
  }
  render() {
    return (
      <div className="border">
        <h3>Range: {this.props.min}-{this.props.max}</h3>
        <h4>Times: {this.state.times}</h4>
      </div>
    )
  }
}

export default Child;
