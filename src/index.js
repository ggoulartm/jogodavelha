import React, { useState } from "https://cdn.skypack.dev/react";
import ReactDOM from "https://cdn.skypack.dev/react-dom";
import useStateInCustomProperties from "https://cdn.skypack.dev/use-state-in-custom-properties";
import './index.css';

let historico = Array(9).fill(" ")
let historia = Array(9).fill(null)
let limpar = 'Alternar Jogador'

    function nextplayer(player){
      let nextPlayer='X';
      if(player === 'X'){nextPlayer = 'O'}
      return nextPlayer;
    }

  function vencedor(board){
      const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c] && (board[a]==='X'||board[a]==='O')) {
      return board[a];
    }
  }
  return 0;
  }

const App = () => {
  let array=[]; 
  const [player, setPlayer] = useState("X");
  const [jogadas, setjogadas] = useState(0);
  const [board, setBoard] = useState(Array(9).fill(" "));
  const CustomPropertiesWrapper = useStateInCustomProperties("box", {
    player
  });

    function botao(n){
      if(historico[n]==" "){  historia[jogadas] = n;
      historico[n]=player;
      setPlayer(nextplayer(player));
      setBoard(historico);
      setjogadas(jogadas + 1);
    limpar = 'Reiniciar Jogo'}
    }

    function retornar_jogada(jogadas, jogo, historia){
      for(var j=jogo;j<=jogadas; j++){
        historico[historia[j]] = " ";
        historia[j]=null;}
      setBoard(historico);
      if(jogo%2==0){setPlayer('X');}
      else{setPlayer('O')}
      setjogadas(jogo);
      if(jogo == 0){limpar = 'Alternar Jogador'}
    }

        function botao(n) {
            if (historico[n] === " ") {
                historia[jogadas] = n;
                historico[n] = player;
                setPlayer(nextplayer(player));
                setBoard(historico);
                setjogadas(jogadas + 1);
                limpar = 'Reiniciar Jogo'
            }
        }

        function retornar_jogada(jogadas, jogo, historia) {
            for (var j = jogo; j <= jogadas; j++) {
                historico[historia[j]] = " ";
                historia[j] = null;
            }
            setBoard(historico);
            if (jogo % 2 === 0) { setPlayer('X'); } else { setPlayer('O') }
            setjogadas(jogo);
            if (jogo === 0) { limpar = 'Alternar Jogador' }
        }


    function limpar_historico(){
      historico = Array(9).fill(" ");
      historia = Array(9).fill(null)
      setBoard(historico); 
      setPlayer(nextplayer(player));
      setjogadas(0);
      limpar = 'Alternar Jogador'
    }


  let retornar = [];
  if(jogadas > 0){
  retornar = [<h3 class="is-size-4">Historico:</h3>]
  for(var j = 0; j<jogadas; j++){
  let jogo = j;
  retornar = [retornar, <button onClick={() => retornar_jogada(jogadas, jogo, historia)}>Retornar jogada #{j}</button>, <br></br>]}
  }

  for(var i=0; i<3; i++){
    for(var j=0; j<3; j++){
                      let n=3*i+j
                      array = [array, <button class="button" onClick={() => botao(n)}>{board[n]}</button>];
                          } array = [array, <br></br>]}

if(!vencedor(board)){
  return(
    <CustomPropertiesWrapper>
      <h1 class="titulo">Jogo da Velha</h1>  
      <h2 class="is-size-4">Jogador: {player}</h2>
      {array}<p></p>    
      <button onClick={() => limpar_historico()}>{limpar}</button> <br></br><p></p>
      {retornar}<p></p>
    </CustomPropertiesWrapper>
  );
}
  else{
return ( 
    <CustomPropertiesWrapper>
    <h1 class="titulo">Jogo da Velha</h1>  
    <h1 class="is-size-4">Vencedor: {vencedor(board)}</h1>
    </CustomPropertiesWrapper>
  );}
};
ReactDOM.render( < App / > , document.getElementById("root"));