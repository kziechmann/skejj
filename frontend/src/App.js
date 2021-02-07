
import ipfsClient from 'ipfs-http-client'
import { useEffect, useState } from 'react'
import {loadWeb3, getAccount, getFileTransferContract, getInbox } from 'web3-helpers'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

//Declare IPFS
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

function App() {
  const [ userAccount, setAccount ] = useState('')
  const [ fileTransferContract, setContract ] = useState(null)
  const [ inbox, setInbox ] = useState({})

  // Initial application state
  useEffect(async () => {
    await loadWeb3()
    const account = await getAccount()
    const contract = await getFileTransferContract()
    const ipfsInbox =  await getInbox()
    setAccount(account)
    setContract(contract)
    setContract(ipfsInbox)
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        
      </header>
    </div>
  );
}

export default App;
