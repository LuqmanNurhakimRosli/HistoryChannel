import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div>
        <h1>Welcome toDashboard ! {user? user.email : "guest"} </h1>
        <p>This is the Dashboard page.</p>
        <Link to="/about">About</Link>
    </div>
  )
}
