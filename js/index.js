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

$("#btn_envio").click(function () {
    let dados = {}
    dados.nrAutoInfracao = $("#nroAuto").val()
    dados.dataInfracao = $("#dataInfracao").val(),
        dados.horaInfracao = $("#hrInfracao").val(),
        dados.codInfracao = $("#codInfracao").val(),
        dados.infrator = $("#infrator").val(),
        dados.gravidade = $("#gravidade").val(),
        dados.valorInfracao = $("#valorInfracao").val(),
        dados.pontoCnh = $("#pontoCnh").val(),
        dados.descInfracao = $("#descInfracao").val(),
        dados.placa = $("#placa").val(),
        dados.chassi = $("#chassi").val(),
        dados.marca = $("#marca").val(),
        dados.modelo = $("#modelo").val(),
        dados.cor = $("#cor").val(),
        dados.tipo = $("#tipo").val(),
        dados.cpfcnpj = $("#cpfcnpj").val(),
        dados.nomeInfrator = $("#nomeInfrator").val(),
        dados.cep = $("#cep").val(),
        dados.logradouro = $("#logradouro").val(),
        dados.numero = $("#numero").val(),
        dados.complemento = $("#complemento").val(),
        dados.bairro = $("#bairro").val(),
        dados.estado = $("#estado").val(),
        dados.municipio = $("#municipio").val(),
        dados.cpfCondutor = $("#cpfCondutor").val()

    // Código que ocorre a transação
    var transaction = autodeinfracao.add($("#nroAuto").val(), JSON.stringify(dados),
        { from: web3.eth.accounts[0], gas: 3000000 });
    $('#hash').val(transaction);

});









