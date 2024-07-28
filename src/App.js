import './App.css';
import {useEffect, useState} from 'react'
import axios from 'axios'
import TransactionModal from './components/TransactionModal';

function App() {

  const [transactions, setTransactions] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);


  // using useEffect hook to fetch the data from backend and show 
  const fetchData=async()=>{
    try{
      const response = await axios.get('/api/v1/transactions/get-transaction')
      setTransactions(response.data)
    }catch(error){
      console.error("Error fetching transaction:", error)
    }
    
  }


  useEffect(()=>{
    fetchData()
  }, [])

  // handling the inputs from the using and adding to the database by post method
  const handleAddTransaction = async (newTransaction) => {
    try {
      const newTransactionWithDate = {...newTransaction, date: new Date().toISOString()}
        const response = await axios.post('/api/v1/transactions/add-transaction', newTransactionWithDate);
        setTransactions(prevTransactions => [...prevTransactions, response.data]);
        fetchData()
        console.log(response.data)
    } catch (error) {
        console.error('Error adding transaction:', error);
    }
};

// saving data in database by clicking save button in modal
const handleSave = (formData) => {
  handleAddTransaction(formData);
  console.log(formData)
  setIsModalOpen(false);
};

  // Sort transactions by date
  const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));
  // Calculate the running balance
  let balance = 0;
  const transactionsWithBalance = sortedTransactions.reverse().map(transaction => {
    if (transaction.type === 'Credit') {
      balance += transaction.amount;
    } else if (transaction.type === 'Debit') {
      balance -= transaction.amount;
    }
    return { ...transaction, balance };
  });

  return (
    <div className='main-container'>
            <TransactionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
            />
      <h1 className='heading'>Office Transactions</h1>
      <button onClick={() => setIsModalOpen(true)} className="open-modal-btn">
                New Transaction + 
            </button>
      <table>
      <thead>
        <tr>
            <td>Transaction Date</td>
            <td>Description</td>
            <td>Credit</td>
            <td>Debit</td>
            <td>Balance Amount</td>
        </tr>
        </thead>

        <tbody>
        
            {transactionsWithBalance.map(transaction=>{
              return(
                <tr key={transaction._id}>
                  <td>{new Date(transaction.date).toLocaleDateString()}</td>
                  <td>{transaction.description}</td>
                  <td>{transaction.type==="Credit" && transaction.amount}</td>
                  <td>{transaction.type==="Debit" && transaction.amount}</td>
                  <td>{transaction.balance}</td>
              </tr>
              )
            })}
         </tbody>
        
        
      </table>
    </div>
  );
}

export default App;
