import './EthAccountBar.css'
import Identicon from 'react-identicons';
import { useState } from 'react'
import { Alert }  from 'react-bootstrap'

export const EthAccountBar = function ({ userAccount }){
    const [showCopiedToClipboard, setC2Clipboard] = useState(false)
    const copyToClipboard = () => {
        setC2Clipboard(true)
        window.setTimeout(() => { setC2Clipboard(false)}, 2000)
        navigator.clipboard.writeText(userAccount)
    }

    return (
        <div className="eth_account" onClick={copyToClipboard} >
            {showCopiedToClipboard? <Alert className="hide-mobile" style={{ color: 'white', fontSize:'small', fontWeight: 'bold'}}>copied to clipboard!</Alert> : ''}
            <Alert variant={!userAccount? 'danger' : 'light'}>
                 {userAccount ? 
                 <span className="account_details">
                    <span className="account_label">ETH ACCOUNT:</span>     
                    <Identicon size="15" string={userAccount}/>
                     {userAccount}
                 </span> :
                 <span>
                    Not connected to ETH blockchain try 
                    <a href="https://metamask.io"> Metamask </a>
                 </span>                   
                 }
            </Alert> 
        </div>
  )
}