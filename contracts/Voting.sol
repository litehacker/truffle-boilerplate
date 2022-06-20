// https://eips.ethereum.org/EIPS/eip-20
// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;


interface Token {

    /// @param _owner The address from which the balance will be retrieved
    /// @return balance the balance
    function balanceOf(address _owner) external view returns (uint256 balance);

    /// @notice send `_value` token to `_to` from `msg.sender`
    /// @param _to The address of the recipient
    /// @param _value The amount of token to be transferred
    /// @return success Whether the transfer was successful or not
    function transfer(address _to, uint256 _value)  external returns (bool success);

    /// @notice send `_value` token to `_to` from `_from` on the condition it is approved by `_from`
    /// @param _from The address of the sender
    /// @param _to The address of the recipient
    /// @param _value The amount of token to be transferred
    /// @return success Whether the transfer was successful or not
    function transferFrom(address _from, address _to, uint256 _value) external returns (bool success);

    /// @notice `msg.sender` approves `_addr` to spend `_value` tokens
    /// @param _spender The address of the account able to transfer the tokens
    /// @param _value The amount of wei to be approved for transfer
    /// @return success Whether the approval was successful or not
    function approve(address _spender  , uint256 _value) external returns (bool success);

    /// @param _owner The address of the account owning tokens
    /// @param _spender The address of the account able to transfer the tokens
    /// @return remaining Amount of remaining tokens allowed to spent
    function allowance(address _owner, address _spender) external view returns (uint256 remaining);

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);
}

contract ERC20token is Token {
    uint256 constant private MAX_UINT256 = 2**256 - 1;
    mapping (address => uint256) public balances;
    mapping (address => mapping (address => uint256)) public allowed;
    uint256 public totalSupply;
    /*
    NOTE:
    The following variables are OPTIONAL vanities. One does not have to include them.
    They allow one to customise the token contract & in no way influences the core functionality.
    Some wallets/interfaces might not even bother to look at this information.
    */
    string public name;                   //fancy name: eg Simon Bucks
    uint8 public decimals;                //How many decimals to show.
    string public symbol;                 //An identifier: eg SBX

    constructor(uint256 _initialAmount, string memory _tokenName, uint8 _decimalUnits, string  memory _tokenSymbol) {
        balances[msg.sender] = _initialAmount;               // Give the creator all initial tokens
        totalSupply = _initialAmount;                        // Update total supply
        name = _tokenName;                                   // Set the name for display purposes
        decimals = _decimalUnits;                            // Amount of decimals for display purposes
        symbol = _tokenSymbol;                               // Set the symbol for display purposes
    }

    function transfer(address _to, uint256 _value) public override returns (bool success) {
        require(balances[msg.sender] >= _value, "token balance is lower than the value requested");
        balances[msg.sender] -= _value;
        balances[_to] += _value;
        emit Transfer(msg.sender, _to, _value); //solhint-disable-line indent, no-unused-vars
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public override returns (bool success) {
        uint256 _allowance = allowed[_from][msg.sender];
        require(balances[_from] >= _value && _allowance >= _value, "token balance or allowance is lower than amount requested");
        balances[_to] += _value;
        balances[_from] -= _value;
        if (_allowance < MAX_UINT256) {
            allowed[_from][msg.sender] -= _value;
        }
        emit Transfer(_from, _to, _value); //solhint-disable-line indent, no-unused-vars
        return true;
    }

    function balanceOf(address _owner) public override view returns (uint256 balance) {
        return balances[_owner];
    }

    function approve(address _spender, uint256 _value) public override returns (bool success) {
        allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value); //solhint-disable-line indent, no-unused-vars
        return true;
    }

    function allowance(address _owner, address _spender) public override view returns (uint256 remaining) {
        return allowed[_owner][_spender];
    }
}
contract Sender {
    function recieveProjectData(string memory _codeHash, string memory _authorName) external {

    }
}


contract Voting {
    /* mapping field below is equivalent to an associative array or hash.
    The key of the mapping is candidate name stored as type bytes32 and value is
    an unsigned integer to store the vote count
    */
    uint voters;
    uint256 initialBudget;
    ERC20token  token;
    address owner;

    modifier onlyOwner(){
        require(owner == msg.sender,"You are not owner");
        _;
    }

    struct TopMistakes {
        uint mistakes;
        address addr;
    }
    TopMistakes[10] public topMistakes;


    function retrieveVoters() public view returns (uint256){
        return voters;
    }

    mapping (address => int) public votesReceived;

    /* Solidity doesn't let you pass in an array of strings in the constructor (yet).
    We will use an array of bytes32 instead to store the list of candidates
    */

    address[] public candidateList;

    /* This is the constructor which will be called once when you
    deploy the contract to the blockchain. When we deploy the contract,
    we will pass an array of candidate Wallets who will be contesting in the election
    */
    constructor(address[] memory candidateWallets, uint256 votersAmount,  ERC20token _token)  {
        voters =votersAmount;
        candidateList = candidateWallets;
        initialBudget = candidateWallets.length*1000;
        token = _token;
        owner = msg.sender;
    }

    // This function returns the total votes a candidate has received so far
    function totalVotesFor(address candidate) view public returns (int) {
        require(validCandidate(candidate));
        return votesReceived[candidate];
    }

    // This function increments the vote count for the specified candidate. This
    // is equivalent to casting a vote
    function voteForCandidate(address candidate) public {
        require(validCandidate(candidate));
        voters -=1;
        initialBudget-=1000;
        // spend money - transacting to not existing (unclear) addresses
        
        elaborateTopX(candidate, 1);
        
        if(voters == 0){
            // pay to the winner
            token.transfer(topMistakes[0].addr, initialBudget);
        }
        votesReceived[candidate] -= 1;
    }

    function validCandidate(address candidate) view public returns (bool) {
        for(uint i = 0; i < candidateList.length; i++) {
            if (candidateList[i] == candidate) {
                return true;
            }
        }
        return false;
    }

    function elaborateTopX(address addr, uint currentValue) private {
        uint i = 0;
        /** get the index of the current max element **/
        for(i; i < topMistakes.length; i++) {
            if(topMistakes[i].mistakes < currentValue) {
                break;
            }
        }
        /** shift the array of position (getting rid of the last element) **/
        for(uint j = topMistakes.length - 1; j > i; j--) {
            topMistakes[j].mistakes = topMistakes[j - 1].mistakes;
            topMistakes[j].addr = topMistakes[j - 1].addr;
        }
        /** update the new max element **/
        topMistakes[i].mistakes = currentValue;
        topMistakes[i].addr = addr;
    }    
    event ProjectSubmitted(string _codeHash, string _authorName, address _sendHashTo);

    function projectSubmitted(string memory _codeHash, string memory _authorName, address _sendHashTo) external onlyOwner {
        Sender s = Sender(_sendHashTo);
        s.recieveProjectData(_codeHash, _authorName);
        emit ProjectSubmitted(_codeHash,_authorName, _sendHashTo);
    }

}

