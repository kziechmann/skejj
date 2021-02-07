import './EthAccountBar.css'

export const EthAccountBar = function ({ userAccount }){
    return (
        <div className="eth_account">
            ETH ACCOUNT: {userAccount || "Not connected to ETH blockchain try Metamask.io"} 
        </div>
  )
}