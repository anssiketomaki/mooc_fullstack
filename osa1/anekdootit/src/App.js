import React, { useState } from 'react'

const Header = (props) => {
  return (
    <div>
      <h2>
        {props.head}
      </h2>
    </div>
  )
}
const Anecdote = (props) => {
  const monesko = props.rndm
  return (
    <div>
      {props.anecd[monesko]}
      <VoteCount votes = {props.votecount} random = {props.rndm}/>
    </div>
  )
}
const VoteCount = (props) => {
  const monesko = props.random
  return (
    <div>
      <p>
        has {props.votes[monesko]} votes
      </p>
    </div>
  )
}
const MostVoted = (props) =>{
  return(
    <div>
      <h2>
        {props.title}
      </h2>
      <FindMostVoted votesTable = {props.votecount} anecdoteList = {props.anecd}/>
    </div>
  )
}
const FindMostVoted = (props) =>{
  const most = Math.max(...props.votesTable)
  const iOfMax = props.votesTable.indexOf(most)
  return(
    <div>
      {props.anecdoteList[iOfMax]}
      <div>
      has {most} votes
      </div>      
    </div>

  )
}

const App = () => {
  //text items
  const headtitle = 'Anecdote of the day'
  const mostVotedTitle = 'Anecdote with most votes'
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
  
  //button handling

  const [random, newRandom] = useState([Math.floor(Math.random() * 7)])
      
  const [votes, updateVotes] = useState([
    0,0,0,0,0,0,0
  ])
  
  const handleNextClick = () => {
    newRandom(Math.floor(Math.random() * 7))
  }
  const handleVoteClick = () => {
    const copy = [...votes]
    copy[random] += 1
    updateVotes(copy)
  }

  return(
    <div>
      <Header head = {headtitle}/>
      <Anecdote anecd = {anecdotes} votecount = {votes} rndm = {random}/>
      <div>
        <button onClick = {handleVoteClick}>vote</button>
        <button onClick = {handleNextClick}>next anecdote</button>
      </div>
      <MostVoted title ={mostVotedTitle} votecount = {votes} anecd = {anecdotes}/>  
      
    </div>
  )
}

export default App
