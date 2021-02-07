// import FileTransferContract from './ABIs/FileTransfer.json'
import Web3 from  'web3'

export const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      return false
    }
    return true
  }

export const getAccount = async () =>{
    const web3 = window.web3
    // Load account
    const [ account ] = await web3.eth.getAccounts()
    return account
}

export const getFileTransferContract = async () => {
    // const web3 = window.web3
    // const networkId = await web3.eth.net.getId()
    // const networkData = FileTransferContract.networks[networkId]
    // if(networkData) {
    //   const fileTransferContract = new web3.eth.Contract(FileTransferContract.abi, networkData.address)
    //   return fileTransferContract
    // } else {
    //   return null
    // }
}

export const getInbox = async (contract) =>{
}
