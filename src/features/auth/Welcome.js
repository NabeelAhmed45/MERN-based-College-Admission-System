import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import useTitle from '../../hooks/useTitle'
import '../../index.css'

const Welcome = () => {
    useTitle('Home')

    const { username, isManager, isAdmin } = useAuth()

    
    

    const content = (
        <section className="welcome">
  
            

            <h1>Welcome {username}!</h1>

            {(isManager || isAdmin) &&<p><Link to="/dash/users/new">Add New User</Link></p>}

            {(isManager || isAdmin) &&<p><Link to="/dash/users">View User Settings</Link></p>}

            <p><Link to="/dash/notes/new">Add New Note</Link></p>

            <p><Link to="/dash/notes">View Employee Notes</Link></p>
            {(isManager || isAdmin) &&<p><Link to="/formlist">Form List</Link></p>}
            

            

            

        </section>
    )

    return content
}
export default Welcome