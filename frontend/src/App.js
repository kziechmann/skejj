
import ipfsClient from 'ipfs-http-client'
import { useEffect, useState } from 'react'
import { Jumbotron, Container, Button } from 'react-bootstrap'
import { UploadModal } from './components/UploadModal'
import { NavigationBar } from './components/NavigationBar'
import { EthAccountBar } from './components/EthAccountBar'
import { MediaCard } from './components/MediaCard'
import { seedList } from './Seed_IPFS_List.js'
import {loadWeb3, getAccount, getFileTransferContract, getInbox } from './web3-helpers.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

//Declare IPFS
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

function App() {
  const [ userAccount, setAccount ] = useState('')
  const [ fileTransferContract, setContract ] = useState(null)
  const [ yourFiles, setYourFiles ] = useState([])
  const [ skejjFiles, setSkejjFiles ] = useState(seedList)
  const [ searchTerm, setSearchTerm ] = useState('')
  const [ inbox, setInbox ] = useState({})
  const [ showModal, setShowModal ] = useState(false)

  // Initial application state
  useEffect(async () => {
    await loadWeb3()
    const account = await getAccount()
    const contract = await getFileTransferContract()
    const ipfsInbox =  await getInbox()
    setAccount(account)
    setContract(contract)
    setContract(ipfsInbox)
  }, [window.web3]);

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

  const sendToSkejj = () =>{
    console.log(JSON.stringify(yourFiles[0]))
    setSkejjFiles([...yourFiles, ...skejjFiles])
    setYourFiles([])
  } 

  const filteredFiles = skejjFiles.filter(
    file => Object.values(file).some(value => {
      return typeof value == 'object'? Object.values(value).join(" ").includes(searchTerm) : value.includes(searchTerm)
    }))

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
            <h2>CONTENT LISTED ON SKEJJ</h2>
            <div className="gallery">
            {filteredFiles && filteredFiles.length? 
              filteredFiles.map((file, idx) =>(
                <MediaCard file={file} idx={idx}></MediaCard>
              )):
              <p>
                {searchTerm? `displaying media related to '${searchTerm}'` 
                : 'Currently no media to display from IPFS, please feel free to upload some of your own!.'}
              </p>}
            </div>
          </Container>
          <Container className="media_window" style={{maxWidth: 300}}>
          <h2>YOUR IPFS MEDIA</h2>
          <button disabled={!yourFiles.length} style={!yourFiles.length ? {backgroundColor:  'grey' }: { marginBottom: 10 }} onClick={sendToSkejj}>List with Skejj</button>
            {yourFiles && yourFiles.length? 
              yourFiles.map((file, idx) =>(
                <MediaCard file={file} idx={idx}></MediaCard>
              )):
              <div style={{margin: 15}}>
                Currently no media to display from IPFS, please feel free to upload some of your own!.
              </div>}
          </Container>
        </Jumbotron>
        </main>
    </div>
  );
}

export default App;
