// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/NumStore.sol";

contract TestNum {
    function testInitialStateValue() public {
        NumStore instance = NumStore(DeployedAddresses.NumStore());
        uint expected = 3;
        Assert.equal(instance.getNum(),expected,"expected result is 3!");
    }
}