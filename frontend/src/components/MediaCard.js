import { Card, Badge, Spinner } from 'react-bootstrap'
import { useState } from 'react'
import './MediaCard.css'
 
export const MediaCard = ({ file, idx }) =>{
    const [showCopiedToClipboard, setC2Clipboard] = useState(false)

    const media = (
        file.fileType === 'image'?
            <Card.Img variant="top" 
                src={`https://ipfs.infura.io/ipfs/${file.ipfsHash}`}
                onClick={() => {window.open(`https://ipfs.infura.io/ipfs/${file.ipfsHash}`)}}    
            /> :
        file.fileType === 'video'?
            <video width="320" height="240" controls
                onClick={() => {window.open(`https://ipfs.infura.io/ipfs/${file.ipfsHash}`)}}
            >
            <source src={`https://ipfs.infura.io/ipfs/${file.ipfsHash}`} type={`video/${file.fileToUpload.name.split('.')[1]}`}/>
            Your browser does not support the video tag.
            </video>: 
        file.fileType === 'audio'?
        <div className="audio_card">
            <img height="150"
                src="https://ipfs.infura.io/ipfs/QmZd37ntfCcK5ap6Hk7fyEY4KMWmghogwiTudYnZaTvXeV" 
                alt="audio_file_icon"
                onClick={() => {window.open(`https://ipfs.infura.io/ipfs/${file.ipfsHash}`)}}
            >
            </img>
            <audio controls>
                <source src={`https://ipfs.infura.io/ipfs/${file.ipfsHash}`} type={`audio/${file.fileToUpload.name.split('.')[1]}`}/>
                Your browser does not support the audio element.
            </audio>
        </div>
        : '')

     
    const loading = (<div>
            <img height="250" width="250" src="https://ipfs.infura.io/ipfs/QmXCr2VdA11tDTfULQH8i6xsGrHsYH5KqNgaXHMTsFhu2v"></img>
            <h4>Uploading {file.fileName} to IPFS!</h4>
            <Spinner animation="border" role="status"></Spinner>
        </div>)

    const error = (
        (<div className="upload_error">
            <img height="250" width="250" src="https://ipfs.infura.io/ipfs/QmXCr2VdA11tDTfULQH8i6xsGrHsYH5KqNgaXHMTsFhu2v"></img>
            <h4>Error uploading to IPFS!</h4>
        </div>)
    )

    const cardContent = !file.ipfsHash? loading : file.ipfsHash === 'error'? error : media

    const copyToClipboard = () => {
        setC2Clipboard(true)
        window.setTimeout(() => { setC2Clipboard(false)}, 2000)
        navigator.clipboard.writeText(file.ipfsHash)
    }
        

    return <Card style={{ width: '18rem', cursor: 'pointer' }} key={idx} >
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
            <li className="ipfs_cid" onClick={copyToClipboard} >
                <img height="15" width="15" src="https://ipfs.infura.io/ipfs/QmXCr2VdA11tDTfULQH8i6xsGrHsYH5KqNgaXHMTsFhu2v"></img>
                <b>IPFS CID: </b> 
                <span id={`${file.fileName}-cid`} >
                    {file.ipfsHash}
                </span>
            </li>
            <div style={{ color: '#5976FD', fontSize:'small'}}> {showCopiedToClipboard? "copied to clipboard!" : ''}</div>
           
        </ul>
    </Card>}