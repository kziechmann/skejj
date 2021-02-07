
import { Form, FormControl} from 'react-bootstrap'
import './NavigationBar.css'

export const NavigationBar = function (){
    return (
        <nav>
            {/* <a href="#" class="logo">
                <img src="images/logo.png"/>
            </a> */}
            <h1> SKEJJ </h1>
            <input class="menu-btn" type="checkbox" id="menu-btn"/>
            <Form className="search_box" inline>
                <FormControl type="text" placeholder="Search IPFS..." />
                <button className="search_btn" variant="outline-primary">SEARCH</button>
            </Form>
            <label class="menu-icon" for="menu-btn">
                <span class="nav-icon"></span>
            </label>
            <ul class="menu">
                <li><a href="#">Images</a></li>
                <li><a href="#">Video</a></li>
                <li><a href="#">Music</a></li>
                <li><a href="upload.html">UPLOAD</a></li>
            </ul>
        </nav>
  )
}