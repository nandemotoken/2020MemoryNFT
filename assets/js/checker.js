let web3tr;
let torus;
let web3mm;
let mode;

window.onload = function(){
    $('#WalletModal').modal('show');
}

async function register(){
    window.location.href = "https://ethaddresscorrector.onrender.com/?address=" + document.getElementById('UserAddress').value;
}

async function checkNFT() {
    address = document.getElementById('UserAddress').value;
    checked = await fetch('https://blockscout.com/poa/xdai/api/?module=account&action=tokenbalance&contractaddress=0x8C0ead2011191edA54c57d67a5ACFaBb3b9148A6&address=' + address);
    json = await checked.json();
    console.log(json.result)
    if (json.result != 0 ) {
        window.alert("2020年ふりかえりNFTを持っています。\nエクスプローラーで確認してみましょう");
        window.open("https://blockscout.com/poa/xdai/tokens/0x8C0ead2011191edA54c57d67a5ACFaBb3b9148A6/inventory", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400");
        } 
    else {
        window.alert("2020年ふりかえりNFTを持っていないようです");
        }
}


async function connectmetamask(){
    console.log("metamask");
    $('#WalletModal').modal('hide')
    ethereum.enable();
    web3mm = new Web3(web3.currentProvider);
    mmaddress = await web3mm.eth.getAccounts();
    console.log(mmaddress)
    document.getElementById('UserAddress').value = mmaddress[0];
}

async function connecttorus(){
    console.log("torus");
    mode = "torus";
    $('#WalletModal').modal('hide')
    
torus = new Torus({
  buttonPosition: "top-right" // default: bottom-left
});
await torus.init({
  buildEnv: "production", // default: production
  enableLogging: true, // default: false
  network: {
    host: "mainnet", // default: mainnet
    chainId: 1, // default: 1
    networkName: "Main Ethereum Network" // default: Main Ethereum Network
  },
loginConfig: {
    'google': {
      showOnModal: false,
    },
    'facebook': {
      showOnModal: false,
    },
    'discord': {
      showOnModal: false,
    },
},
  showTorusButton: true // default: true
});
await torus.login(); // await torus.ethereum.enable()
web3tr = await new Web3(torus.provider);

let useraddress = await web3tr.eth.getAccounts();
console.log(useraddress[0]);
document.getElementById('UserAddress').value = useraddress[0];    

    
}
