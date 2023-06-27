import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div>
        <nav className="flex justify-between items-center">
          <div>
            <Link to="/">
              <h1 className='text-white text-4xl my-4'>LMG</h1>
            </Link>
          </div>
          <ul className="text-white flex gap-3">
            <li><Link to="/admin">Admin</Link></li>
          </ul>
        </nav>
    </div>
  )
}

export default Header