    
import { Modal, Form, Alert, Spinner, Badge } from 'react-bootstrap'
import { useState } from 'react'
import './UploadModal.css'

export const UploadModal = ({ showModal, toggleUploadModal, uploadFileToIPFS }) =>{
    const [ fileName, setfileName ] = useState('')
    const [ fileType, setFileType ] = useState('')
    const [ fileToUpload, setFileToUpload ] = useState(null)
    const [ buffer, setBufferToUpload ] = useState(null)
    const [tags, setTags] = useState([]);

    const changeFileType = (type) =>{
        const newType = fileType === type ? '' : type
        setFileType(newType)
    }

    const handleFileSelect = (event)=>{
        const [ file ] = event.target && event.target.files
        if(file){
            setFileToUpload(file)
            const reader = new window.FileReader()
            reader.readAsArrayBuffer(file)
            reader.onloadend = () => {
                setBufferToUpload(Buffer(reader.result))
            }
        } else {
            setFileToUpload(null)
            setBufferToUpload(null)
        }
    }

    const addTags = event => {
        if (event.key === "Enter" && event.target.value !== "") {
            setTags([...tags, event.target.value]);
            event.target.value = "";
        }
    };

    const removeTags = index => {
        setTags([...tags.filter(tag => tags.indexOf(tag) !== index)]);
    };

    const handleFileUpload = async (e)=>{
        e.preventDefault()
        const fileData = {
            fileName,
            fileType,
            fileToUpload,
            buffer,
            tags
        }
        toggleUploadModal()
        setfileName('')
        setFileType('')
        setFileToUpload(null)
        setBufferToUpload(null)
        setTags([])
        await uploadFileToIPFS(fileData)
    }


    return showModal ? 
        <Modal.Dialog className="upload_modal">
            <Modal.Header closeButton onHide={toggleUploadModal}>
                <Modal.Title>Upload File to IPFS!</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group>
                        {/* File Name Input */}
                        <Form.Label className="input_label">File Name:</Form.Label>
                        <Form.Control onChange={e =>{ setfileName(e.target.value.trim())}}  type="text" placeholder="File Name" />
                        {/* Tags Input */}
                        <Form.Label className="input_label">Add Tags:</Form.Label>
                        <div className="tags-input">
                            <ul className="tag_list">
                                {tags.map((tag, index) => (
                                    <li key={index} className="tag">
                                    <Badge  variant="secondary"> 
                                        {tag}
                                        <span className="remove_tag" onClick={() => removeTags(index)} >(x)</span>
                                    </Badge>
                                    </li>
                                ))}
                            </ul>
                            <input
                                type="text"
                                disabled={tags && tags.length > 10}
                                style={tags && tags.length > 10? {border: '1px solid grey'} : {}}
                                onKeyUp={event => event.key === "Enter" ? addTags(event) : null}
                                placeholder="Press enter to add tags"
                            />
                        </div>
                        {
                            tags && tags.length > 10?
                            <Alert style={{marginTop: 10}} variant={'warning'}>
                                only ten tags allowed per file
                            </Alert>   
                            : ''
                        } 
                        {/* File Type Input */}
                        <Form.Label className="input_label">File Type:</Form.Label>
                        <Form.Check inline label="Video" onChange={e =>{ changeFileType('video')}} disabled={fileType && fileType !=='video'} type="checkbox" id='check_input_video' />
                        <Form.Check inline label="Audio" onChange={e =>{ changeFileType('audio')}} disabled={fileType && fileType !=='audio'}type="checkbox" id='check_input_audio' />
                        <Form.Check inline label="Image" onChange={e =>{ changeFileType('image')}} disabled={fileType && fileType !=='image'}type="checkbox" id='check_input_image' />
                        {/* File Browser Input */}
                        <Form.Label className="input_label">File To Upload:</Form.Label>
                        <label className="file_input">
                            <Form.File onChange={handleFileSelect} style={{display: 'none'}} label="" />
                            <div role="button" className="select_file"> SELECT FILE </div>
                            { fileToUpload && fileToUpload.name && !buffer ?
                            <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner> : ''
                            }
                            <div className='file_input_name'> {fileToUpload && fileToUpload.name || "NO FILE SELECTED"} </div>
                        </label>
                    </Form.Group>
                </Form>

                {
                !fileName ||!fileName.length > 8 || !buffer || !buffer.length?
                 <Alert variant={'warning'}>
                    Please add name and select file before uploading!
                 </Alert>   
                 : ''
                } 
            </Modal.Body>

            <Modal.Footer>
                <button onClick={toggleUploadModal} className="close_btn">Close</button>
                <button 
                    onClick={handleFileUpload}
                    disabled={!fileName ||!fileName.length > 8 || !buffer || !buffer.length}
                    style={!fileName ||!fileName.length > 8 || !buffer || !buffer.length? { backgroundColor: 'lightgrey'} : {}}
                    className="secondary">Upload
                </button>
            </Modal.Footer>
        </Modal.Dialog> :
        ''
}
    