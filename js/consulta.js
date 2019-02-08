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

$("#nroAuto").keypress(function (e) {
    if (e.which == 13) $('#btn_search_auto').click();
  
});
$("#input_search").keypress(function (e) {
    if (e.which == 13) $('#btn_pesquisa').click();
  
});

$("#btn_search_auto").click(function (e) {

    var password = ('inova');
    var resultadoBusca = autodeinfracao.get($("#nroAuto").val());
    var textoFormatado = JSON.parse(resultadoBusca);

    criptografar = CryptoJS.AES.encrypt(textoFormatado.nomeInfrator.toString(), password)
    var descriptografar = CryptoJS.AES.decrypt(criptografar, password);
    var resultDescriptografado = descriptografar.toString(CryptoJS.enc.Utf8)

    $("#divDados").html(
        //Auto de infração
        '<b>Auto de infração</b><hr>' +
        '<div class="form-group row">' +
        '<div class="col-sm-4">' +
        '<input type="text" readonly class="form-control-plaintext" disabled>' + "Nro da Infração: " + textoFormatado.nrAutoInfracao +
        '</div>' +
        '<div class="col-sm-4">' +
        '<input type="text" readonly class="form-control-plaintext" disabled>' + "Data da Infração: " + new Date(textoFormatado.dataInfracao).toLocaleDateString('pt-BR') +
        '</div>' +
        '<div class="col-sm-4">' +
        '<input type="text" readonly class="form-control-plaintext" disabled>' + "Hora: " + textoFormatado.horaInfracao +
        '</div>' + '</div>' + '<br> '+

        //Infração Cometida
        '<b>Infração Cometida</b><hr>' +
        '<div class="form-group row">' +
        '<div class="col-sm-4">' +
        '<input type="text" readonly class="form-control-plaintext" disabled>' + "Código da Infração: " + textoFormatado.codInfracao +
        '</div>' +
        '<div class="col-sm-4">' +
        '<input type="text" readonly class="form-control-plaintext" disabled>' + "Infrator: " + textoFormatado.infrator  +
        '</div>' +
        '<div class="col-sm-4">' +
        '<input type="text" readonly class="form-control-plaintext" disabled>' + "Gravidade: " + textoFormatado.gravidade +
        '</div>' +
        '<div class="col-sm-4">' +
        '<input type="text" readonly class="form-control-plaintext" disabled>' + "Valor: " + textoFormatado.valorInfracao +
        '</div>' +
        '<div class="col-sm-4">' +
        '<input type="text" readonly class="form-control-plaintext" disabled>' + "Pontos na Cnh: " + textoFormatado.pontoCnh +
        '</div>' +
        '<div class="col-sm-4">' +
        '<input type="text" readonly class="form-control-plaintext" disabled>' + "Descrição da infração: " + textoFormatado.descInfracao +
        '</div>' + '</div>' + '<br> '+

        //Dados do veículo
        '<b>Dados do veículo</b><hr>' +
        '<div class="form-group row">' +
        '<div class="col-sm-4">' +
        '<input type="text" readonly class="form-control-plaintext" disabled>' + "Placa: " + textoFormatado.placa +
        '</div>' +
        '<div class="col-sm-4">' +
        '<input type="text" readonly class="form-control-plaintext" disabled>' + "Chassi: " + textoFormatado.chassi  +
        '</div>' +
        '<div class="col-sm-4">' +
        '<input type="text" readonly class="form-control-plaintext" disabled>' + "Marca: " + textoFormatado.marca +
        '</div>' +
        '<div class="col-sm-4">' +
        '<input type="text" readonly class="form-control-plaintext" disabled>' + "Modelo: " + textoFormatado.modelo +
        '</div>' +
        '<div class="col-sm-4">' +
        '<input type="text" readonly class="form-control-plaintext" disabled>' + "Cor: " + textoFormatado.cor +
        '</div>' +
        '<div class="col-sm-4">' +
        '<input type="text" readonly class="form-control-plaintext" disabled>' + "Tipo: " + textoFormatado.tipo +
        '</div>' + '</div>' + '<br> '+

        //Proprietário do veículo
        '<b>Proprietário do veículo</b><hr>' +
        '<div class="form-group row">' +
        '<div class="col-sm-4">' +
        '<input type="text" readonly class="form-control-plaintext" disabled>' + "CPF/CNPJ: " + textoFormatado.cpfcnpj +
        '</div>' +
        '<div class="col-sm-4">' +
        '<input type="text" readonly class="form-control-plaintext" disabled>' + "Nome do Infrator: " + criptografar +
        '</div>' + '<button class="fas fa-key" id="descriptografar"></button>' 
         + '</div>' + '<br> '+ 
         
         //Local da infração
        '<b>Local da infração</b><hr>' +
        '<div class="form-group row">' +
        '<div class="col-sm-4">' +
        '<input type="text" readonly class="form-control-plaintext" disabled>' + "CEP: " + textoFormatado.cep +
        '</div>' +
        '<div class="col-sm-4">' +
        '<input type="text" readonly class="form-control-plaintext" disabled>' + "Logradouro: " + textoFormatado.logradouro  +
        '</div>' +
        '<div class="col-sm-4">' +
        '<input type="text" readonly class="form-control-plaintext" disabled>' + "Numero: " + textoFormatado.numero +
        '</div>' +
        '<div class="col-sm-4">' +
        '<input type="text" readonly class="form-control-plaintext" disabled>' + "Complemento: " + textoFormatado.complemento +
        '</div>' +
        '<div class="col-sm-4">' +
        '<input type="text" readonly class="form-control-plaintext" disabled>' + "Bairro: " + textoFormatado.bairro +
        '</div>' +
        '<div class="col-sm-4">' +
        '<input type="text" readonly class="form-control-plaintext" disabled>' + "Estado: " + textoFormatado.estado +
        '</div>' +
        '<div class="col-sm-4">' +
        '<input type="text" readonly class="form-control-plaintext" disabled>' + "Município: " + textoFormatado.municipio +
        '</div>' + '</div>' + '<br> '+

        //Identificação do Condutor Infrator
        '<b>Identificação do Condutor Infrator</b><hr>' +
        '<div class="form-group row">' +
        '<div class="col-sm-4">' +
       '<input type="text" readonly class="form-control-plaintext" disabled>' + "CPF do Condutor: " + textoFormatado.cpfCondutor +
        '</div>' + '</div>' + '<br> ' 
    )



    $("#descriptografar").click(function () {
        alert('Nome completo do infrator: ' + resultDescriptografado)

    });
});
