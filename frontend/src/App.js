
import ipfsClient from 'ipfs-http-client'
import { useEffect, useState } from 'react'
import { Jumbotron, Container, Card, Badge } from 'react-bootstrap'
import { UploadModal } from './components/UploadModal'
import { NavigationBar } from './components/NavigationBar'
import { EthAccountBar } from './components/EthAccountBar'
import { MediaCard } from './components/MediaCard'
import {loadWeb3, getAccount, getFileTransferContract, getInbox } from './web3-helpers.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

//Declare IPFS
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

function App() {
  const [ userAccount, setAccount ] = useState('')
  const [ fileTransferContract, setContract ] = useState(null)
  const [ files, setFiles ] = useState([])
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

  const uploadFileToIPFS = async (fileData) => {
    const { buffer } = fileData
    console.log('Uploading file to IPFS....', 'file name:', fileData.fileName)
    // add ui elements to show this is happening behind the scenes
    setFiles([...files, fileData])
    try{
      const result = await ipfs.add(buffer)
      fileData.ipfsHash = result.path
      setFiles([...files, fileData])
    } catch (err){
      console.error('Error uploading to IPFS', err)
      fileData.ipfsHash = 'error'
      setFiles([...files, fileData])
    }
  }

  return (
    <div className="App">
      <header className="App-header">
          <NavigationBar searchIPFS={searchIPFS} toggleUploadModal={toggleUploadModal}></NavigationBar>
      </header>
      <UploadModal uploadFileToIPFS={uploadFileToIPFS} showModal={showModal} toggleUploadModal={toggleUploadModal}></UploadModal>
      <main >
        <div className={showModal? 'modal_overlay' : ''}></div>
        <EthAccountBar userAccount={userAccount}></EthAccountBar>
        <Jumbotron fluid>
          <h1>Media</h1>
          <Container className="gallery">
            {files && files.length? 
              files.map((file, idx) =>(
                <MediaCard file={file} idx={idx}></MediaCard>
              )):
              <p>
                Currently no media to display from IPFS, please feel free to upload some of your own!.
              </p>}
          </Container>
        </Jumbotron>
        </main>
    </div>
  );
}

export default App;
