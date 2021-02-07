import './EthAccountBar.css'
import { Alert }  from 'react-bootstrap'

export const EthAccountBar = function ({ userAccount }){
    return (
        <div className="eth_account">
            <Alert variant={!userAccount? 'danger' : 'light'}>
                 {userAccount ? 
                 `ETH ACCOUNT: ${userAccount}` :
                 <span>
                    Not connected to ETH blockchain try 
                    <a href="https://metamask.io"> Metamask </a>
                 </span>                   
                 }
            </Alert> 
        </div>
  )
}