//SPDX-License-Identifier:MIT
pragma solidity ^0.8.17;

contract Daomeet {

    dao[] public daos;

    event newDaoRegister(
        bytes32 id,
        address indexed owner,
        string[] members,
        string name,
        string roomid,
        uint256 timestap,
        uint256 meettime,
        string description
    );


    struct dao {
        bytes32 id;
        address owner;
        string[] members;
        string name;
        string roomid;
        uint256 timestap;
        uint256 meettime;
        string description;
    }

    
    function register(string[] memory _members, string calldata _name, string calldata _roomid, uint256 _meettime, string memory _description) external {
        daos.push(dao(
            hash(_name),
            msg.sender,
            _members,
            _name,
            _roomid,
            block.timestamp,
            _meettime,
            _description
        ));

        emit newDaoRegister(
            hash(_name),
            msg.sender,
            _members,
            _name,
            _roomid,
            block.timestamp,
            _meettime,
            _description
        );
    }

    function newMeet(string calldata _roomid, uint256 _time, string memory _description) external {
        for (uint256 i = 0; i < daos.length; i++) {
            require(daos[i].owner == msg.sender, "Not the owner");
            daos[i].roomid = _roomid;
            daos[i].meettime = _time;
            daos[i].description = _description;
        }
    }

    function hash(string memory _address) public pure returns(bytes32){
        return keccak256(abi.encodePacked(_address));
    }

    function getDao(string memory _owner) public view returns(dao[] memory _daos)  {
        for (uint256 i = 0; i < daos.length; i++) {
            for (uint256 k = 0; k < daos[i].members.length; k++){
            if (daos[i].owner == msg.sender || hash(daos[i].members[k]) == hash(_owner)){
                return daos;
            }
          }
        }
    }
}
