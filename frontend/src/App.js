
import ipfsClient from 'ipfs-http-client'
import { useEffect, useState } from 'react'
import { Jumbotron, Container, Card, Badge } from 'react-bootstrap'
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
    console.log('Uploading file to IPFS....', 'file name:', fileData.fileName, buffer)
    const result = await ipfs.add(buffer)
    if(!result){
      console.error('Error uploading to IPFS')
    } else {
      console.log(result)
      fileData.ipfsHash = result.path
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
          <Container style={{display: 'flex', justifyContent: 'space-evenly'}}>
            {files && files.length? 
              files.map((file, idx) =>(
                <Card style={{ width: '18rem' }} key={idx}>
                  <Card.Img variant="top" src={`https://ipfs.infura.io/ipfs/${file.ipfsHash}`}/>
                  <ul style={{padding: 10}}>
                      <li><b>File Name: </b> {file.fileName} </li>
                      <li><b>File Type: </b> {file.fileType} </li>
                      <ul className="tag_list">
                        {file.tags.map((tag, index) => (
                          <li className="tag">
                          <Badge key={index} variant="secondary"> 
                              {tag}
                          </Badge>
                          </li>
                        ))}
                      </ul>
                      <li style={{fontSize: 'x-small'}}><b>IPFS CID: </b> {file.ipfsHash}</li>
                  </ul>
                </Card>
              )) :
                <div>
                <h1>Photos</h1>
                              <p>
                  This is a modified jumbotron that occupies the entire horizontal space of
                  its parent.
                </p>
                </div>
            }
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
