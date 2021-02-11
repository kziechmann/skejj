
import { InputGroup, FormControl} from 'react-bootstrap'
import { useState } from 'react'
import './NavigationBar.css'

export const NavigationBar = function ({ searchIPFS, toggleUploadModal, searchTerm }){
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
                    onChange={e => {setSearchText(e.target.value)}} 
                    value={searchText} type="text"
                    className="search_input" 
                    placeholder="Search IPFS..." />
                <InputGroup.Append onClick={handleSubmit} >
                   <button
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
                <li >
                    <button 
                        onClick={() => {searchIPFS('image')}} 
                        className={searchTerm ==='image'? 'search_filter' :''}>
                            Images
                    </button>
                </li>
                <li>
                    <button 
                        className={searchTerm ==='video'? 'search_filter' :''} 
                        onClick={() => {searchIPFS('video')}}>
                        Video
                    </button>
                </li>
                <li>
                    <button onClick={() => {searchIPFS('music')}}
                     className={searchTerm ==='music'? 'search_filter' :''}>
                        Music
                    </button>
                </li>
                <li >
                    <button 
                        onClick={() => {searchIPFS('')}} 
                        className={searchTerm ==='' ? 'search_filter' :''}>
                            All media
                    </button>
                </li>
                <li ><button className="upload_button" onClick={toggleUploadModal}>UPLOAD</button></li>
            </ul>
        </nav>
  )
}