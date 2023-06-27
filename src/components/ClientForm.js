import { useState } from "react"
import { useParams } from "react-router-dom"

const ClientForm = () => {
    const { id } = useParams()
    const clientData = JSON.parse(localStorage.getItem('clients')).data
    const client = clientData.find(({_id}) => _id === id)
    
    const [name, setName] = useState('')
    const [idNumber, setIdNumber] = useState('')
    const [bank, setBank] = useState('')
    const [accNumber, setAccNumber] = useState('')
    const [salaryDate, setSalaryDate] = useState('')
    const [phone, setPhone] = useState('')
    const [office, setOffice] = useState('')
    const [address, setAddress] = useState('')
    const [industry, setIndustry] = useState('')
    const [notes, setNotes] = useState('')
    const [badLender, setBadLender] = useState(client.badLender || false)

    const handleCheckboxClick = async (e) => {
      const { checked } = e.target
      setBadLender(checked)
    }

    // if Edit return this
    if(id && clientData) {
        return (
            <div>
              <form className="mt-8 grid grid-cols-[1fr_3fr]">

                  <label className="text-right mr-3 ">Name: </label>
                  <input className="border-b w-40" type="text" placeholder={client.name}
                  value={name}
                  onChange={(ev) => setName(ev.target.value)}
                  />

                  <label className="text-right mr-3 ">ID Number: </label>
                  <input className="border-b w-40" type="text" placeholder={client.idNumber}
                  value={idNumber}
                  onChange={(ev) => setIdNumber(ev.target.value)}
                  />

                  <label className="text-right mr-3 ">Bank: </label>
                  <input className="border-b w-40" type="text" placeholder={client.bank}
                  value={bank}
                  onChange={(ev) => setBank(ev.target.value)}
                  />

                  <label className="text-right mr-3 ">Account Number: </label>
                  <input className="border-b w-40" type="text" placeholder={client.accNumber}
                  value={accNumber}
                  onChange={(ev) => setAccNumber(ev.target.value)}
                  />

                  <label className="text-right mr-3 ">Salary Date: </label>
                  <input className="border-b w-40" type="text" placeholder={client.salaryDate}
                  value={salaryDate}
                  onChange={(ev) => setSalaryDate(ev.target.value)}
                  />

                  <label className="text-right mr-3 ">Phone: </label>
                  <input className="border-b w-40" type="text" placeholder={client.phone}
                  value={phone}
                  onChange={(ev) => setPhone(ev.target.value)}
                  />

                  <label className="text-right mr-3 ">Office: </label>
                  <input className="border-b w-40" type="text" placeholder={client.office}
                  value={office}
                  onChange={(ev) => setOffice(ev.target.value)}
                  />

                  <label className="text-right mr-3 ">Address: </label>
                  <input className="border-b w-40" type="text" placeholder={client.address}
                  value={address}
                  onChange={(ev) => setAddress(ev.target.value)}
                  />

                  <label className="text-right mr-3 ">Industry: </label>
                  <input className="border-b w-40" type="text" placeholder={client.industry}
                  value={industry}
                  onChange={(ev) => setIndustry(ev.target.value)}
                  />

                  <label className="text-right mr-3 ">Notes: </label>
                  <textarea className="border-b w-40 mb-3" type="text" placeholder={client.notes}
                  value={notes}
                  onChange={(ev) => setNotes(ev.target.value)}
                  />
                  
                  <label className="text-right mr-3">Bad Lender: </label>
                  <input className="border-b w-40 pt-3" type="checkbox" name="badLender" checked={badLender}
                  onChange={handleCheckboxClick}
                  />
                  
                  <div></div>
                  <button className="mt-2 rounded-2xl p-3 bg-green-500 w-40">Save</button>

              </form>
            </div>
        )  
    }
}

export default ClientForm