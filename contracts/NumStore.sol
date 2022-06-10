// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
contract NumStore {
    uint private num;
    constructor() {
        num = 3;
    }
    function setNumber(uint _num) public {
        num = _num;

    }

    function getNum() public view returns(uint){
        return num;
    }
}