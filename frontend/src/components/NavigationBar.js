
import { InputGroup, FormControl} from 'react-bootstrap'
import { useState } from 'react'
import './NavigationBar.css'

export const NavigationBar = function ({ searchIPFS, toggleUploadModal }){
    const [ searchText, setSearchText ] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        setSearchText('')
        searchIPFS(searchText)
    }

    return (
        <nav className="nav">
            {/* <a href="#" class="logo">
                <img src="images/logo.png"/>
            </a> */}
            <h1> SKEJJ </h1>
            <input className="menu-btn" type="checkbox" id="menu-btn"/>
            <InputGroup className="search_box" inline>
                <FormControl 
                    onChange={e => setSearchText(e.target.value)} 
                    value={searchText} type="text"
                    className="search_input" 
                    placeholder="Search IPFS..." />
                <InputGroup.Append >
                   <button
                    onClick={handleSubmit} 
                    className="search_btn" 
                    variant="outline-primary">
                        SEARCH
                   </button>
                </InputGroup.Append>
            </InputGroup>
            <label className="menu-icon" htmlFor="menu-btn">
                <span className="nav-icon"></span>
            </label>
            <ul className="menu">
                <li><button >Images</button></li>
                <li><button >Video</button></li>
                <li><button >Music</button></li>
                <li><button >All Media</button></li>
                <li ><button className="upload_button" onClick={toggleUploadModal}>UPLOAD</button></li>
            </ul>
        </nav>
  )
}