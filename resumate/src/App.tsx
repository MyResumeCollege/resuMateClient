import { useState } from 'react'
import './App.css'

function App() {
  const [name, setName] = useState<string>('')
  const [job, setJob] = useState<string>('')
  const [experience, setExperience] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(name, job, experience, description)
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        gap: '1rem',
      }}
    >
      <label />
      What is your name?
      <input
        type="text"
        style={{
          backgroundColor: 'white',
        }}
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <label />
      What job are you looking for?
      <input
        type="text"
        style={{
          backgroundColor: 'white',
        }}
        value={job}
        onChange={e => setJob(e.target.value)}
      />
      <label />
      What is your experience?
      <textarea
        style={{
          height: '5rem',
          backgroundColor: 'white',
        }}
        value={experience}
        onChange={e => setExperience(e.target.value)}
      />
      <label />
      Describe yourself in a few words.
      <textarea
        style={{
          height: '10rem',
          width: '20rem',
          backgroundColor: 'white',
        }}
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <button type="submit">Generate Resume</button>
    </form>
  )
}

export default App
