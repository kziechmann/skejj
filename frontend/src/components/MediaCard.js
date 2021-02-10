import { Card, Badge, Spinner } from 'react-bootstrap'
import './MediaCard.css'
 
export const MediaCard = ({ file, idx }) =>{
    const media = (
        file.fileType === 'image'?
            <Card.Img variant="top" src={`https://ipfs.infura.io/ipfs/${file.ipfsHash}`}/> :
        file.fileType === 'video'?
            <video width="320" height="240" controls>
            <source src={`https://ipfs.infura.io/ipfs/${file.ipfsHash}`} type={`video/${file.fileToUpload.name.split('.')[1]}`}/>
            Your browser does not support the video tag.
            </video>: 
        file.fileType === 'audio'?
        <div className="audio_card">
            <img height="150"src="https://ipfs.infura.io/ipfs/QmZd37ntfCcK5ap6Hk7fyEY4KMWmghogwiTudYnZaTvXeV" alt="audio_file_icon">
            </img>
            <audio controls>
                <source src={`https://ipfs.infura.io/ipfs/${file.ipfsHash}`} type={`audio/${file.fileToUpload.name.split('.')[1]}`}/>
                Your browser does not support the audio element.
            </audio>
        </div>
        : '')

    const cardContent = file.ipfsHash? media : <div><h4>Uploading {file.fileName} to IPFS!</h4><Spinner animation="border" role="status"></Spinner></div>

    return <Card style={{ width: '18rem' }} key={idx}>
        
        
        <ul style={{padding: 10}}>
            {cardContent}
            <li><b>Name: </b> {file.fileName} </li>
            <li><b>Description: </b> {file.fileDescription} </li>
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
    </Card>}