import React, { useState } from 'react'

const Header = (props) => {
  return(
    <div>
      <h1>
        {props.header}
      </h1>
    </div>
  )
}
const StatsHeader = (props) => {
  return(
    <div>
      <h1>
      {props.statisticsheader}
      </h1>
    </div>
  )
}
const Statistics = (props) => {
  const all = (props.data.good + props.data.neutral + props.data.bad)
  if (all === 0) {
    return(
      <div>
        No feedback given
      </div>
    )
  }
  return(
    <div>
      <table>
        <tr>
          <StatisticLine text="good" value = {props.data.good} />
        </tr>
        <tr>
          <StatisticLine text="neutral" value = {props.data.neutral}/>
        </tr>
        <tr>
          <StatisticLine text="bad" value = {props.data.bad}/>
        </tr>
        <tr>
          <StatisticLine text="all" value = {all}/>
        </tr>
        <tr>
          <StatisticLine text="average" value = {Math.round(((props.data.good - props.data.bad)/all)*100)/100}/>
        </tr>
        <tr>
          <StatisticLine text="positive" value = {Math.round((props.data.good / (all))*1000)/10} end = "%"/>  
        </tr>
      </table>
    </div>
  )
}
const StatisticLine = (props) => {
  return(
    <div>
      <td style={{width: "55px", textAlign: "left"}}> {props.text} </td>
      <td> {props.value} {props.end} </td>
    </div>
    
  )
}
const History = (props) => {
  if (props.allClicks.length === 0){
    return
  }
  return(
    <div>
    
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const head = 'give feedback'
  const sheader = 'statistics'
  const [clicks, setClicks] = useState({
    good: 0, neutral: 0, bad: 0
  })
  const handleGoodClick = () => {
    setClicks({...clicks, good: clicks.good + 1})
  }
  const handleNeutralClick = () => {
    setClicks ({...clicks, neutral: clicks.neutral + 1})
  }
  const handleBadClick = () => {
    setClicks({...clicks, bad: clicks.bad + 1})
  }
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header header = {head}/>
      <div>
        <button onClick={handleGoodClick}>good</button>
        <button onClick={handleNeutralClick}>neutral</button>
        <button onClick={handleBadClick}>bad</button>
      </div>
      <StatsHeader statisticsheader = {sheader}/>
      <Statistics data = {clicks}/>

    </div>
  )
}

export default App