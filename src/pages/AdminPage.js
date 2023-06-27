import { useDispatch, useSelector } from "react-redux"
import { setClients } from '../redux/clientsSlice'
import { setLoans } from '../redux/loansSlice'
import axios from 'axios'

const AdminPage = () => {
  const dispatch = useDispatch()

  const clientData = useSelector((state) => state.clients.data)
  const loanData = useSelector((state) => state.loans.data)

  const handleUpdateData = async () => {
    const clientResponse = await axios.get('/clients')
    const loanResponse = await axios.get('/loans')
    dispatch(setClients(clientResponse.data))
    dispatch(setLoans(loanResponse.data))
    alert("Data Updated")
  }

  const handleSaveToLocalStorage = () => {
    localStorage.setItem('clients', JSON.stringify(clientData))
    localStorage.setItem('loans', JSON.stringify(loanData))
    alert('Data Stored to Local Storage')
  }

  const handleDeleteFromLocalStorage = () => {
    localStorage.removeItem('clients');
    localStorage.removeItem('loans');
    alert('Data Deleted from Local Storage!')
  }

  return (
    <div>
      <div className="flex flex-col gap-2">
        AdminPage
        
        <button 
        onClick={handleUpdateData}
        className="max-w-xs p-4 bg-gray-500 rounded-xl">Update Data from Database</button>
        
        <button 
        onClick={handleSaveToLocalStorage}
        className="max-w-xs p-4 bg-blue-500 rounded-xl">Save Data to Local Storage</button>
        
        <button 
        onClick={handleDeleteFromLocalStorage}
        className="max-w-xs p-4 bg-red-500 rounded-xl">Delete Data from Local Storage</button>
        
      </div>
    </div>
  )
}

export default AdminPage