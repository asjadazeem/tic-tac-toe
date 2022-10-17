import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Square(props) {
  return (
    <button
      type="button"
      className="square"
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  getRender() {
    let rows = [];
    for (let i=0; i<3; i++) {
      let column = [];

      for (let j=0; j<3; j++) {
        column.push(this.renderSquare((3*i) + j));
      }

      rows.push(<div className="board-row" key={i}>{column}</div>);
    }

    return rows;
  }

  render() {
    return (
      <div>
        {this.getRender()}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      xIsNext: true,
      history: [{
        squares: Array(9).fill(null),
        location: null,
        isSelected: false,
      }],
      stepNumber: 0,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    const location = `(${i%3}, ${Math.floor(i/3)})`;

    this.setState({
      history: history.concat([{ squares, location }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
  }

  jumpTo(move) {
    let history = this.state.history.slice();
    history.map(x => x.isSelected = false);
    history[move].isSelected = true;

    this.setState({
      history,
      stepNumber: move,
      xIsNext: (move % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? `Go to move #${move} ${step.location}` : 'Go to Start Index';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>
            <>
            </>
            {step.isSelected && <b>{desc}</b>}
            {!step.isSelected && <span>{desc}</span>}
          </button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = `Winner is player: ${winner}`;
    } else {
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Game />);

function calculateWinner(squares) {
  const combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < combinations.length; i++) {
    const [a, b, c] = combinations[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}
