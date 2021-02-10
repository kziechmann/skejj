    
import { Modal, Form, Alert, Spinner, Badge } from 'react-bootstrap'
import { useState } from 'react'
import './UploadModal.css'

export const UploadModal = ({ showModal, toggleUploadModal, uploadFileToIPFS }) =>{
    const [ fileName, setFileName ] = useState('')
    const [ fileType, setFileType ] = useState('')
    const [ fileDescription, setFileDescription ] = useState('')
    const [ fileToUpload, setFileToUpload ] = useState(null)
    const [ buffer, setBufferToUpload ] = useState(null)
    const [tags, setTags] = useState([]);

    const changefileDescription = (e) =>{
        const description = e.target.value
        if(description && description.length < 150){
            setFileDescription(description)
        }
    }

    const changefileName = (e) =>{
        const name = e.target.value
        if(name.length < 50){
            setFileName(name)
        }
    }

    const getFileType = name =>{
        if(!name) return ''
        if(name.match(/(\.jpg|\.jpeg|\.bmp|\.gif|\.png)$/i)){
            return 'image'
        } else if(name.match(/(\.avi|\.wmv|\.flv|\.mpg|\.mpeg|\.mp4)$/i)){
            return 'video';
        } else if(name.match(/(\.wav|\.mp3)$/i)){
            return 'audio'
        }
        return ''
    }

    const handleFileSelect = (event)=>{
        const [ file ] = event.target && event.target.files || []
        const typeOfFile = getFileType(file && file.name)
        if(file && typeOfFile){
            setFileToUpload(file)
            setFileType(typeOfFile)
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
        const tag = event.target.value.trim()
        if (event.key === "Enter" && tag !== "" && !tags.includes(tag)) {
            setTags([...tags, tag]);
            event.target.value = "";
        } else if (tags.includes(tag)){
            event.target.value = "";
        }
    };

    const removeTags = index => {
        setTags([...tags.filter(tag => tags.indexOf(tag) !== index)]);
    };

    const handleFileUpload = (e)=>{
        e.preventDefault()
        const fileData = {
            fileName,
            fileType,
            fileDescription,
            fileToUpload,
            buffer,
            tags
        }
        toggleUploadModal()
        setFileName('')
        setFileType('')
        setFileDescription('')
        setFileToUpload(null)
        setBufferToUpload(null)
        setTags([])
        uploadFileToIPFS(fileData)
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
                        <Form.Control onChange={changefileName}  type="text" placeholder="File Name" />
                        {/* File Description*/}
                        <Form.Label className="input_label">File Description:</Form.Label>
                        <textarea  onChange={changefileDescription} value={fileDescription}  type="text" placeholder="File Description" />
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
                        {/* File Browser Input */}
                        <Form.Label className="input_label">File To Upload:</Form.Label>
                        <label className="file_input">
                            <Form.File accept="audio/*,video/*,image/*" onChange={handleFileSelect} style={{display: 'none'}} label=""/>
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
    