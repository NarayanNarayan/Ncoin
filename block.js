const crypto=require("crypto-js")

const hashf=crypto.SHA256

class Block{
    constructor(previous_hash,data){
        this.previous_hash=previous_hash;
        this.data=data;
        this.nonce=0;
        this.hash=this.calculateHash();
    }
    calculateHash(){
        return hashf(this.previous_hash.toString()+this.data.toString()+this.nonce.toString());
    }
    mineBlock(hardness){
        while(this.hash.substring(0,hardness)!=="0".repeat(hardness)){
            this.nonce++;
            this.hash=this.calculateHash();
        }
    }
}


class BlockChain{
    constructor(hardness){
        this.chain=[];
        this.chain.push(new Block("",null));
        this.#hardness=hardness;
    }
    addBlock(data){
        let block=new Block(getLatestHash(),data);
        block.mineBlock(this.hardness);
        this.chain.push(block);
    }
}