    
import { Modal, Form } from 'react-bootstrap'
import './UploadModal.css'

export const UploadModal = ({ showModal, toggleUploadModal }) =>{
    const fileInputName = 'NO FILE SELECTED'

    return showModal ? 
        <Modal.Dialog className="upload_modal">
            <Modal.Header closeButton onHide={toggleUploadModal}>
                <Modal.Title>Upload File to IPFS!</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label className="input_label">File Name:</Form.Label>
                        <Form.Control type="text" placeholder="File Name" />
                        <Form.Label className="input_label">File Type:</Form.Label>
                        <Form.Check inline label="Video" type="checkbox" id='check_input_video' />
                        <Form.Check inline label="Audio" type="checkbox" id='check_input_audio' />
                        <Form.Check inline label="Image" type="checkbox" id='check_input_image' />
                        <Form.Label className="input_label">File To Upload:</Form.Label>
                        <label style={{display: 'flex'}}>
                            <Form.File style={{display: 'none'}} label="" />
                            <button onClick={e => e.preventDefault()} role="button" className="select_file"> SELECT FILE </button>
                            <div className='file_input_name'> {fileInputName} </div>
                        </label>
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <button onClick={toggleUploadModal} className="close_btn">Close</button>
                <button className="secondary">Upload</button>
            </Modal.Footer>
        </Modal.Dialog> :
        ''
}
    