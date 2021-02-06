pragma solidity ^0.5.0;

contract FileTransfer{

    address public owner = msg.sender;
    //Structure
    mapping (string=>string) public ipfsInbox;
    
    //Events
    event ipfsSent(string _ipfsHash, string _address);
    event inboxResponse(string response);
    
    //Modifiers
    modifier notFull (string memory _string) {
    bytes memory stringTest = bytes(_string); 
    require(stringTest.length==0); 
    _;
    }
    modifier restricted() {
    require(
      msg.sender == owner,
      "This function is restricted to the contract's owner"
    );
    _;
    }
    
    // An empty constructor that creates an instance of the conteact
    constructor() public{}
    
    //takes in receiver's address and IPFS address. Places the IPFSadress in the receiver's inbox
    function sendIPFS(string _address, string memory _ipfsHash) notFull(ipfsInbox[_address]) public{
        ipfsInbox[_address] = _ipfsHash;
        emit ipfsSent(_ipfsHash, _address);
    }
    
    //check your inbox and empties it afterwards
    function checkInbox() public restricted{
        string memory ipfs_hash=ipfsInbox[msg.sender];
        if(bytes(ipfs_hash).length==0){
            emit inboxResponse("Empty Inbox");
        }else{
            ipfsInbox[msg.sender]="";
            emit inboxResponse(ipfs_hash);
        }
    }

    //retrieves hash
    function getHash(string _address) public{
        string memory ipfs_hash=ipfsInbox[_address];
        emit inboxResponse(ipfs_hash);
    }
    
}