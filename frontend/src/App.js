
import ipfsClient from 'ipfs-http-client'
import { useEffect, useState } from 'react'
import { Jumbotron, Container } from 'react-bootstrap'
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
  const [ yourFiles, setYourFiles ] = useState([])
  const [ skejjFiles, setSkejjFiles ] = useState([])
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
    setYourFiles([...yourFiles, fileData])
    try{
      const result = await ipfs.add(buffer)
      fileData.ipfsHash = result.path
      setYourFiles([...yourFiles, fileData])
    } catch (err){
      console.error('Error uploading to IPFS', err)
      fileData.ipfsHash = 'error'
      setYourFiles([...yourFiles, fileData])
    }
  }

  const filteredFiles = yourFiles.filter(file => JSON.stringify(file).includes(searchTerm))

  return (
    <div className="App">
      <header className="App-header">
          <NavigationBar searchIPFS={searchIPFS} searchTerm={searchTerm} toggleUploadModal={toggleUploadModal}></NavigationBar>
      </header>
      <UploadModal uploadFileToIPFS={uploadFileToIPFS} showModal={showModal} toggleUploadModal={toggleUploadModal}></UploadModal>
      <main >
        <div className={showModal? 'modal_overlay' : ''}></div>
        <EthAccountBar userAccount={userAccount}></EthAccountBar>
        <Jumbotron fluid>
          <Container className="media_window">
            <h2>LISTED CONTENT ON SKEJJ</h2>
            <div className="gallery">
            {filteredFiles && filteredFiles.length? 
              filteredFiles.map((file, idx) =>(
                <MediaCard file={file} idx={idx}></MediaCard>
              )):
              <p>
                Currently no media to display from IPFS, please feel free to upload some of your own!.
              </p>}
            </div>
          </Container>
          <Container className="media_window">
          <h2>YOUR IPFS MEDIA</h2>
            {yourFiles && yourFiles.length? 
              yourFiles.map((file, idx) =>(
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
