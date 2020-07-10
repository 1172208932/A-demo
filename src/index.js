import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './board'


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tArray: Array(7).fill(Array(7).fill('')),
    };


    this.wall = [
      [4, 3],
      [3, 1],
      [3, 3],
      [2, 3],
      [1, 3],
      [4, 1],
      [0, 3]
    ];
    this.beginPoint = [2, 1];
    this.endPoint = [4, 5];
    this.closed = [...this.wall];
    this.open = [];

    for (let k = 0; k < 6; k++) {
      this.state.tArray[k] = []
      for (let j = 0; j < 7; j++) {
        this.state.tArray[k][j] = ''
      }
    }

    for (let i = 0; i < this.wall.length; i++) {
      this.state.tArray[this.wall[i][0]][this.wall[i][1]] = 'x'
    }

    this.state.tArray[this.beginPoint[0]][this.beginPoint[1]] = '0';

    this.state.tArray[this.endPoint[0]][this.endPoint[1]] = 'p';

  }

  next(point, item) {
    setTimeout(() => {
      var newTarray = this.state.tArray
      newTarray[point[0]][point[1]] = '';
      newTarray[item[0]][item[1]] = '0';

      this.setState((prevState) => {
        delete prevState.tArray;
        return prevState;
      })

      this.setState({
        tArray: newTarray,
      })
      this.begin(item)
    }, 1000)
  }


  begin(point) {

    if (point.toString() === this.endPoint.toString()) { return }

    this.closed.push(point)

    let closedString = Array.from(this.closed, x => x.toString());

    let around = [
      [point[0] + 1, point[1]], [point[0] - 1, point[1]], [point[0], point[1] + 1], [point[0], point[1] - 1]
    ].filter(item => {
      return closedString.indexOf(item.toString()) === -1
    })

    let fList = []

    around.forEach(item => {
      fList.push(this.getF(item))
    })

    around.some(item => {
      if (this.getF(item) === Math.min(...fList)) {
        this.next(point, item)
        return true
      } else return false
    })
  }

  getF(point) {
    if (point.toString() === this.endPoint.toString() || point.toString() === this.beginPoint.toString()) return 0
    return Math.abs(point[0] - this.beginPoint[0]) + Math.abs(point[1] - this.beginPoint[1]) + Math.abs(point[0] - this.endPoint[0]) + Math.abs(point[1] - this.endPoint[1])
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={this.state.tArray}
          />
        </div>
        <div className="game-info">
          <div
            onClick={() => { this.begin(this.beginPoint) }}
          >开始</div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);