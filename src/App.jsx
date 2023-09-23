// import { useEffect, useState } from "react";
import * as C from './styles'
import { Input } from "./components/input";
import { Button } from "./components/button";
import { Score } from './components/score';
import { ActionsGame } from './components/actions-games';
import { Modal } from './components/modal';
import { useEffect, useState } from 'react';

const messages = {
  rules:{
    title: 'Regras',
    message: 
    'Jo ken pô, é um jogo em que as pessoas jogam com as mãos, escolhendo entre pedra (mão fechada), papel (mão espalmada) e tesoura (dois dedos a frente). O jogo é similar ao "par ou ímpar", porém com uma variável a mais. E funciona assim: Cada jogador escolhe uma opção. A tesoura corta o papel, mas quebra com a pedra; o papel embrulha a pedra, mas é cortado pela tesoura e a pedra quebra a tesoura e é embrulhada pelo papel. O desafio aqui é vencer o computador 10 vezes! Faça a sua escolha e boa sorte!',
  },
  user:{
    title: 'Usuário',
    message: 'Preencha o nome do jogador!',
  }, 
  computerWin:{
    title: 'Que pena!',
    message: 'Não foi dessa vez, tente novamente.',
  },
  playWin: {
    title: 'Vitória!',
    message: 'Você venceu, joque novamente.'
  }
}

const valueTypeEnum = {
  ROCK: 1, 
  PAPER: 2,
  SCISSORS: 3,
}

const actions = [
  {
    value: 1,
    label: '👊🏽',
    description: "Rock"
  },
  {
    value: 2,
    label: '🖐🏽',
    description: "Paper"
  },
  {
    value: 3,
    label: '✌🏽',
    description: "Scissors"
  }
]

function App() {
  const [titleModal, setTitleModal] = useState('')
  const [messageModal, setMessageModal] = useState('')
  const [open, setOpen] = useState(false)
  const [scorePlayerValue, setScorePlayerValue] = useState(0);
  const [scorePcValue, setScorePcValue] = useState(0);
  const [userName, setUsername] = useState('JOGADOR')
  const [playGame, setPlayGame] = useState(false)
  const [UserAction, setUserAction] = useState('❓')
  const [PcAction, setPcAction] = useState('❓')
  const [textGame, setTextGame] = useState("Inicar jogo!")
  const scoreToWin = 3;

  const handleOpenModal = (type) => {
    if(!type){
      setOpen(false);
      setTitleModal('');
      setMessageModal('');
      return
    }
    setTitleModal(messages?.[type]?.title)
    setMessageModal(messages?.[type]?.message)
    setOpen(true)
  }

  const handleUserName = (value) => {
    if (!value){
      setUsername("JOGADOR")
      return
    }
    setUsername(value)
  }
  
  const randomPc = () => {
    const number = Math.floor(Math.random() *  actions.length)
    return actions[number]
  }

  const handleClick = (value) => {
    setUserAction(value.label)
    const actionPC =  randomPc()
    setPcAction(actionPC.label)
    checkWinner(value.value, actionPC.value)
  }

  const checkWinner = (playerValue, computerValue) => {
    const playerRockWin = playerValue === valueTypeEnum.ROCK && computerValue === valueTypeEnum.SCISSORS
    const playerPaperWin = playerValue === valueTypeEnum.PAPER && computerValue === valueTypeEnum.ROCK
    const playerScissors = playerValue === valueTypeEnum.SCISSORS && computerValue === valueTypeEnum.PAPER
    const drawerResult = playerValue === computerValue
    const playerWin = playerPaperWin || playerRockWin || playerScissors;
    if(drawerResult) return setTextGame("Empate joque novamente!")
    if(playerWin){
      setScorePlayerValue((state) => state +1)
      return setTextGame("Vitória continue jogando!")
    }
    setScorePcValue((state) => state +1)
    return setTextGame("Derrota continue jogando!")
     
  } 


  const StartGame = () => {
    if(userName === "JOGADOR"){
      handleOpenModal("user")
      return
    }
    if(playGame) return resetValues()
    setPlayGame(true)
  }

  const resetValues = () => {
    setTextGame('Iniciar jogo!')
    setPlayGame(false);
    setScorePlayerValue(0)
    setScorePcValue(0)
    setUserAction('❓')
    setPcAction('❓')
  }

  useEffect(() => {
    const checkVitoria = () => {
      const playerWin = scorePlayerValue === scoreToWin
      const pcWin = scorePcValue === scoreToWin
      if (playerWin) return handleOpenModal("playWin")
      if (pcWin) return handleOpenModal("computerWin")
    }

    checkVitoria()
  }, [scorePcValue, scorePlayerValue])

  return (
   <C.Conteiner>
      <C.Flex direction="column"> 
        <C.Tipografia fontWeight="400" size="32px" lineHeight="48px"> 
          JO KEN PÔ
        </C.Tipografia>
        <Input placecholder="Digite o nome do jogador" onChange={
          (value) => handleUserName(value)
        }/>
        <Button onClick={StartGame}>{
          playGame ? 'Parar' : "Iniciar"
        }
        </Button>
        <Score 
        userName={userName}
        scorePlayer={scorePlayerValue}
        scorerPc={scorePcValue}
        />
        <C.Spacer margin="10px"/>

        <C.Flex justify="space-around">
          <C.Tipografia size="32px"> {UserAction} </C.Tipografia> 
          <C.Tipografia size="32px"> {PcAction } </C.Tipografia>
        </C.Flex>

        <C.Flex direction="column" gap="0px">

          <C.Tipografia> {textGame} </C.Tipografia> 
          <C.Rules onClick={() => handleOpenModal('rules')}>Regras</C.Rules>

        </C.Flex>
        
        <ActionsGame actions={actions}
        onClick={(value) => handleClick(value)}
        disabled={!playGame}
        />

        <Modal
        open={open}
        titleModal={titleModal} 
        messageModal={messageModal}
        handleOpenModal={() => handleOpenModal(null)}
        />

      </C.Flex>
   </C.Conteiner>
  )
}

export default App
