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

  //Código de pesquisa para o hash
  $("#btn_pesquisa").click(function (e) {
    if ($("#input_search").val() != "") {
        // Retornar todos os dados da transação usando a função getTransaction.               
        var transaction = web3.eth.getTransaction($("#input_search").val());
        $('#blockHash').val(transaction.blockHash);
        $('#block').val(transaction.blockNumber);
        $('#from').val(transaction.from);
        $('#to').val(transaction.to);
        $('#gas').val(transaction.gas);
        $('#gasprice').val(transaction.gasPrice);
        $('#hash').val(transaction.hash);
        $('#input').val(transaction.input);
        $('#nonce').val(transaction.nonce);
        $('#value').val(web3.fromWei(transaction.value));
        
        if ($("#value").val() != 0) {
            $("#ddecode").hide();
            $('#dinput').hide();
        }
        if ($("#value").val() == 0) {
            $("#dvalue").hide();
        }
        // Retornar a hora da transação usando a função getBlock.
        var info = web3.eth.getBlock($("#block").val());
        var time = $('#TimeStamp').val(new Date(info.timestamp * 1000).toLocaleString());

        // dados de decodificação do input
        var abi = ([{ "constant": true, "inputs": [], "name": "count", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "nroInfracao", "type": "uint256" }, { "name": "campos", "type": "string" }], "name": "add", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [{ "name": "nroInfracao", "type": "uint256" }], "name": "get", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }]);
        abiDecoder.addABI(abi);
        var txData = $("#input").val();
        var decodedData = abiDecoder.decodeMethod(txData);
        var textoFormatado  = decodedData.params[1].value;
        obj = JSON.parse(textoFormatado);
        
        $('#decode').val("Nro do Auto de Infração: " + obj.nrAutoInfracao + " "  + "|" + " " +
                    "Data da Infração: " + obj.dataInfracao + " "  + "|" + " " +  
                    "Hora da Infração: " + obj.horaInfracao + " "  + "|" + " "  +
                    "Código da Infração: " + obj.codInfracao  + " "  + "|" + " " +
                    "Infrator: " + obj.infrator + " "  + "|" + " " +
                    "Gravidade: " + obj.gravidade + " "  + "|" + " " +
                    "Valor da Infração: " + obj.valorInfracao + " "  + "|" + " " +
                    "Pontos na CNH: " + obj.pontoCnh  + " "  + "|" + " " +
                    "Descrição da Infração: " + obj.descInfracao + " "  + "|" + " " +
                    "Placa do Veículo: " + obj.placa + " "  + "|" + " " +
                    "Chassi: " + obj.chassi + " "  + "|" + " " +
                    "Marca: " + obj.marca + " "  + "|" + " " +
                    "Modelo: " + obj.modelo + " "  + "|" + " " +
                    "cor: " + obj.cor   + " "  + "|" + " " +                    
                    "Tipo: " + obj.tipo  + " "  + "|" + " " +
                    "CPF/CNPJ: " + obj.cpfcnpj  + " "  + "|" + " " +
                    "Nome Completo: " + obj.nomeInfrator  + " "  + "|" + " " +
                    "CEP: " + obj.cep + " "  + "|" + " " +
                    "Logradouro: " + obj.logradouro + " "  + "|" + " " +                  
                    "Numero: " + obj.numero + " "  + "|" + " " +
                    "Complemento: " + obj.complemento + " "  + "|" + " " +
                    "Bairro: " + obj.bairro  + " "  + "|" + " " +
                    "Estado: " + obj.estado  + " "  + "|" + " " +
                    "Município: " + obj.municipio  + " "  + "|" + " " +
                    "CPF do Condutor: " + obj.cpfCondutor 
                    ) 

    } else {
        alert("Favor colocar o seu hash no campo para pesquisar");

    }    

});



