import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const Cell = (props) => {
  // console.log(props);
  const className = `cell 
  ${props.food ? "cell--food" : ""} 
  ${props.snake ? "cell--snake" : ""}
  `;

  return (
    <div className={className} style={{ width: '15px', height: '15px'}}>

    </div>
  );
}

class Ground extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snake: [],
      food: [],
      status: 'Initialized',
      direction: 40,
      speed: 130
    };
    this.moveToward = this.moveToward.bind(this);
    this.startGame = this.startGame.bind(this);
    this.moveSnake = this.moveSnake.bind(this);
    this.moveFood = this.moveFood.bind(this);
    this.stopGame = this.stopGame.bind(this);
    this.removeTimers = this.removeTimers.bind(this);
    this.selfBitten = this.selfBitten.bind(this);
  }

  startGame() {
    this.setState({
      snake: [
        [5,7]
      ],
      food: [10,10],
      status: 'Running',
      speed: 130
    });

    this.moveSnakeInterval = setInterval(this.moveSnake, this.state.speed);

    this.el.focus();
  }

  moveSnake() {
    const newPostion = [];
    switch (this.state.direction) {
      case 38:
        newPostion[0] = [this.state.snake[0][0], this.state.snake[0][1] - 1];
        break;
      case 40:
        newPostion[0] = [this.state.snake[0][0], this.state.snake[0][1] + 1];
        break;
      case 37:
        newPostion[0] = [this.state.snake[0][0] - 1, this.state.snake[0][1]];
        break;
      case 39:
        newPostion[0] = [this.state.snake[0][0] + 1, this.state.snake[0][1]];
        break;
    
      default:
        break;
    }

    if (!newPostion[0]) {
      return;
    }

    if (this.isCollide(newPostion[0]) || this.selfBitten(newPostion[0])) {
      console.log("Game Over");
      console.log(this.state.snake.length);
      this.stopGame()
      return;
    }

    [].push.apply(
      newPostion,
      this.state.snake.slice(1).map((s, i) => {
        return this.state.snake[i];
      })
    );

    this.setState({ snake: newPostion });
    // console.log(newPostion);

    this.eatFood(newPostion[0]);
  }

  moveFood() {
    if (this.moveFoodTimeout) clearTimeout(this.moveFoodTimeout)
    const x = parseInt(Math.random() * this.props.size);
    const y = parseInt(Math.random() * this.props.size);
    this.setState({ food: [x, y] });
    this.moveFoodTimeout = setTimeout(this.moveFood, 6000)
  }

  eatFood(snakeHead){
    if (snakeHead[0]==this.state.food[0] && snakeHead[1]==this.state.food[1]) {
      let newSnake = this.state.snake;
      newSnake.push([-1,1]);
      this.setState({
        snake: newSnake
      });
      this.moveFood();
      
      this.setState(prevState => ({
        speed: prevState.speed-1
      }));
      if (this.moveSnakeInterval) clearInterval(this.moveSnakeInterval);
      this.moveSnakeInterval = setInterval(this.moveSnake, this.state.speed);

    }
  };

  stopGame(){
    this.removeTimers();
    this.setState({
      status : 'Game Over'
    })
  }

  removeTimers() {
    if (this.moveSnakeInterval) clearInterval(this.moveSnakeInterval);
    if (this.moveFoodTimeout) clearTimeout(this.moveFoodTimeout)
  }

  selfBitten(snakeHead){
    let bitten = false;
    this.state.snake.forEach(element => {
      if( element[0] === snakeHead[0] && element[1] === snakeHead[1] ){
        console.log("Oops self bitten");
        // console.log(snakeHead);
        bitten = true;
      }
    });
    return bitten;
  }

  isCollide(snakeHead){
    
    if( snakeHead[0] < 0 || snakeHead[0] >= 20 || snakeHead[1] < 0 || snakeHead[1] >= 20 ){
      // console.log(snakeHead)
      return true;
    }else{
      return false;
    }
  }

  moveToward({ keyCode }) {
    let changeDirection = true;
    [[38, 40], [37, 39]].forEach(dir => {
      if (dir.indexOf(this.state.direction) > -1 && dir.indexOf(keyCode) > -1) {
        changeDirection = false;
      }
    });

    if (changeDirection) {
      setTimeout(() => {
        this.setState({ direction: keyCode });
      }, 70);
    }
  }

  render() {
    const ground = [...Array(this.props.size)].map((_,i) => i);
    const cells = ground.map(y => {
      return ground.map(x => {
        const isFood = this.state.food[0] === x && this.state.food[1] === y;
        let isSnake = this.state.snake.filter(b => b[0] === x && b[1] === y);
        // console.log(isSnake);
        isSnake = isSnake.length && isSnake[0];

        return (
          <Cell snake={isSnake} food={isFood} key={x+","+y} />
        );
      });
    });

    return (
      <div>
        <button onClick={this.startGame}>Start</button>
        <span> Score: {this.state.snake.length}</span>
        <span> Status: {this.state.status}</span>
        <div className="ground"
        onKeyDown={this.moveToward}
        style={{
          width: this.props.size*15 + "px",
          height: this.props.size*15 + "px"
        }}
        ref={el => (this.el = el)}
        tabIndex={-1}>
          {cells}
        </div>
      </div>
      
    );
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <Ground size={20}/>
      </div>
      
    );
  }
}

export default App;
