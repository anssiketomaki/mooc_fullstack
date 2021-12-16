import React from 'react'
const Hello = (kakk) => {
  return (
    <div>
      <p>
        Hello {kakk.name}, you are {kakk.age} years old
      </p>
    </div>
  )
}

const App = () => {
  const nimi = 'Pekka'
  const ika = 10
  console.log(<p>trollolo</p>)

  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Maya" age={29 + 100} />
      <Hello name={nimi} age={ika} />
    </div>
  )
}
export default App
