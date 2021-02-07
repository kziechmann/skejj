import './EthAccountBar.css'
import Identicon from 'react-identicons';
import { Alert }  from 'react-bootstrap'

export const EthAccountBar = function ({ userAccount }){
    return (
        <div className="eth_account">
            <Alert variant={!userAccount? 'danger' : 'light'}>
                 {userAccount ? 
                 <span className="account_details">
                     ETH ACCOUNT:     
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