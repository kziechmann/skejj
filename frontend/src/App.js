
import ipfsClient from 'ipfs-http-client'
import { useEffect, useState } from 'react'
import { Jumbotron, Container } from 'react-bootstrap'
import { UploadModal } from './components/UploadModal'
import { NavigationBar } from './components/NavigationBar'
import { EthAccountBar } from './components/EthAccountBar'
import {loadWeb3, getAccount, getFileTransferContract, getInbox } from './web3-helpers.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

//Declare IPFS
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

function App() {
  const [ userAccount, setAccount ] = useState('')
  const [ fileTransferContract, setContract ] = useState(null)
  const [ searchTerm, setSearchTerm ] = useState('')
  const [ inbox, setInbox ] = useState({})
  const [ showModal, setShowModal ] = useState(true)

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

  const searchIPFS = (searchTerm) => {
    setSearchTerm(String(searchTerm).trim())
  }

  const toggleUploadModal = () => {
    setShowModal(!showModal)
  }

  return (
    <div className="App">
      <header className="App-header">
          <NavigationBar searchIPFS={searchIPFS} toggleUploadModal={toggleUploadModal}></NavigationBar>
      </header>
      <UploadModal showModal={showModal} toggleUploadModal={toggleUploadModal}></UploadModal>
      <main >
        <div className={showModal? 'modal_overlay' : ''}></div>
        <EthAccountBar userAccount={userAccount}></EthAccountBar>
        <Jumbotron fluid>
          <Container>
            <h1>Videos</h1>
            <p>
              This is a modified jumbotron that occupies the entire horizontal space of
              its parent.
            </p>
          </Container>
        </Jumbotron>
        <Jumbotron fluid>
          <Container>
            <h1>Photos</h1>
            <p>
              This is a modified jumbotron that occupies the entire horizontal space of
              its parent.
            </p>
          </Container>
        </Jumbotron>
        </main>
    </div>
  );
}

export default App;
