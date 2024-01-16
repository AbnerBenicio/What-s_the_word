/* eslint-disable react/prop-types */
const Gameover = ({retry}) => {
  return (
    <div>
      <h1>Gameover</h1>
      <button onClick={retry}>Recomeçar o jogo</button>
    </div>
    
  )
}

export default Gameover