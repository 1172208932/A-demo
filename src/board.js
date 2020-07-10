import React from 'react';
import './index.css';

function Square(props) {
    return (
      <button className="square" >
        {props.value}
      </button>
    )
  }
  
 export default class Board extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        tArray: props.squares
      }
    }
  
    renderSquare(val, i) {
      return <Square key={i} value={val}
      />;
    }
  
    render() {
      var tArray = this.state.tArray;
      var res = [];
  
      tArray.map((items, indexj) => (
        res.push(
          <div key={indexj} className="board-row">
            {
              items.map((item, index) => (
                this.renderSquare(tArray[indexj][index], index)
              ))
            }
          </div>
        )
      ))
  
  
      return (
        <div>
          {res}
        </div>
      );
    }
  }