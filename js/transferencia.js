if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.27.147:8545"));

}

if (web3.isConnected()) {
    console.log("Conectado");
} else {
    console.log("Não conectado")
}

web3.eth.getBalance(web3.eth.accounts[0], (err, balance) => {
    const balanceInEth = web3.fromWei(balance, "ether");
    var balance = $('#saldo').val(balanceInEth + " ether");
});


var contaContrato = $('#conta').val(web3.eth.accounts[0]);

web3.eth.defaultAccount = web3.eth.accounts[0];

var autodeinfracaoContract = web3.eth.contract([{ "constant": true, "inputs": [], "name": "count", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "nroInfracao", "type": "uint256" }, { "name": "campos", "type": "string" }], "name": "add", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [{ "name": "nroInfracao", "type": "uint256" }], "name": "get", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }]);

var autodeinfracao = autodeinfracaoContract.at('0xfB293fA8843B4153bc02802e2890322D75bCba63');


$("#btn_transfer").click(function () {
    if ($("#contaTranfer").val() != "", $("#valor").val() != "") {
        var envio = web3.eth.sendTransaction({
            from: web3.eth.accounts[0],
            to: $("#contaTranfer").val(),
            value: 1000000000000000000 * ($("#valor")[0].value),
            gas: 3000000

        })
        var txenvio = $('#txhash').val(envio);
        var hashEnvio = web3.eth.getTransaction($("#txhash").val());
    } else {
        alert("Favor preencher todos os dados!")
    }

});