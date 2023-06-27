import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

const ClientPage = () => {
  const { id } = useParams()
  const clientData = useSelector((state) => state.clients.data)

  const client = clientData.find(({_id}) => _id === id)

  return (
    <div>
      <Link to='/' className='bg-gray-300 rounded-xl p-4'>Go Back</Link>
      {client.name}
    </div>
  )
}

export default ClientPage