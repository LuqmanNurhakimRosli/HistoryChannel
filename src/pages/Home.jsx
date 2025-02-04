import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
        <h1>Home</h1>
        <p>This is the Home page.</p>
        <Link to="/about">About</Link>
    </div>
  )
}

export default Home