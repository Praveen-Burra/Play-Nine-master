import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const Stars = (props) => {
  //const no = 1+ Math.floor(Math.random()*9); IF WE WRITE HERE, EVERY TIME WE SELECT A NUMBER, THE STATE OF COMPONENT GAME CHANGES AND 
  let stars= [];
  for(let i=0; i<props.no; i++){
    stars.push(<i key={i} className="fa fa-star"></i>);
  }
  return(
    <div className="col-5">
      {stars}
    </div>
  );
}

const Answer = (props) => {
  return(
    <div className="col-5">
      {props.selectedNumbers.map((number, i)=>
        <span  key={i} onClick={()=>props.unselectNo(number)} >
          {number}
        </span>
      )}
    </div>
  );
}

const Button = (props) => {
  let button;
  switch(props.answerIsCorrect){
    case true:
    button=
            <button className="btn btn-success">
            <i className="fa fa-check"/>
            </button>
    break;
    case false:
    button=
            <button className="btn btn-danger">
            <i className="fa fa-times"/>
            </button>
    break;
    default:
    button = <button 
              disabled={props.selectedNumbers.length === 0} 
              className="btn btn-primary"
              onClick={props.checkAnswer}
            >
        =
        </button>
    break;
  }

  return(
    <div align="center">
      {button}
    </div>
  );
}

const Numbers = (props) => {
  const fn= (number) =>{
    if(props.selectedNumbers.indexOf(number) >= 0){
      return 'selected';
    }
    //else {return '';}
  };
  let display =[];
  for(let i=1; i<10; i++){
    display.push(<span key={i} className={fn(i)} onClick={()=>props.selectNo(i) }>
      {i}
    </span>);
  };
  
  return (
    <div className="card text-center">
      <div>
       {display}
      </div>
    </div>
  );
}

class Game extends Component {
  state = {
    selectedNumbers: [],
    no: 1+ Math.floor(Math.random()*9),
    answerIsCorrect: null
  };
  //const no = 1+ Math.floor(Math.random()*9);
  selectNo = (clickedNumber) => {
    if(this.state.selectedNumbers.indexOf(clickedNumber)>=0){
      alert("Number already used, You can use only existing numbers");
      return;
    }
    this.setState(prevState =>({
      answerIsCorrect: null,
      selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
    })); 
  };

  unselectNo = (clickedNumber) => {
    this.setState(prevState => ({
      answerIsCorrect: null,
      selectedNumbers: prevState.selectedNumbers
                      .filter(number=> number !== clickedNumber)
    }));
  };

  checkAnswer = ()=> {
    this.setState(prevState=>({
      answerIsCorrect: prevState.no === 
        prevState.selectedNumbers.reduce((acc, n)=> acc + n, 0)
    }));
  };
  
  render(){
    return (
      <div align="center"> 
        <div  align="center">
          <Stars no={this.state.no}/>
          <Button selectedNumbers={this.state.selectedNumbers}
          checkAnswer={this.checkAnswer}
          answerIsCorrect={this.state.answerIsCorrect}
          />
          <Answer selectedNumbers={this.state.selectedNumbers}
                  unselectNo={this.unselectNo}
          />
        </div>
        <Numbers selectedNumbers={this.state.selectedNumbers}
        selectNo={this.selectNo}
        />
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App" >
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Play Nine Game in React !</h1>
        </header>
        <p className="App-intro">
          When the game starts, you get a random number of stars between 1 and 9 and you have the set of numbers in the bottom frame that you can use. You can select one or more numbers that would sum up to the value of the random stars. The objective is to use all the numbers in the bottom frame. If you end up with a number of stars that has no possible correct combination then you get to redraw and you can do that five times. After that, if you still end up with a number of stars that has no possible correct combination out of all the remaining numbers, then you lose the game.
        </p>
        <Game />
      </div>
    );
  }
}
export default App;