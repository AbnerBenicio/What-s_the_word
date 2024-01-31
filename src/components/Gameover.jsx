/* eslint-disable react/prop-types */
import "./Gameover.css"
const Gameover = ({retry, currentScore}) => {
  return (
    <div>
      <h1>Fim de Jogo</h1>
      <h2>Sua pontuação foi: <span>{currentScore} pontos</span></h2>
      <button onClick={retry}>Recomeçar o jogo</button>
    </div>
    
  )
}

export default Gameover