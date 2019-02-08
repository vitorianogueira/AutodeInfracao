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

$(document).ready(function () {
    for (var i = 1; i <= 5000; i++) {
        var res = web3.eth.getBlock(i);
        for (var j = 0; j <= res.transactions.length; j++) {
            if (res.transactions[j]) {
                var transaction = web3.eth.getTransaction(res.transactions[j]);
                if (transaction.to != null) {
                    // dados de decodificação do input
                    var abi = ([{ "constant": true, "inputs": [], "name": "count", "outputs": [{ "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "nroInfracao", "type": "uint256" }, { "name": "campos", "type": "string" }], "name": "add", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [{ "name": "nroInfracao", "type": "uint256" }], "name": "get", "outputs": [{ "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }]);
                    abiDecoder.addABI(abi);
                    var decodedData = abiDecoder.decodeMethod(transaction.input);
                    var decodedInput = transaction.input
                    dados = ''
                    if (decodedData) {
                        decodedInput = decodedData.params[1].value;
                        textoFormatado = JSON.parse(decodedInput);

                        dados =
                            "<textarea readonly id= reviewText rows=6 cols=145>" +
                            "Nro da Infração: " + textoFormatado.nrAutoInfracao + " " + "|" + " " +
                            "Data: " + textoFormatado.dataInfracao + " " + "|" + " " +
                            "Hora: " + textoFormatado.horaInfracao + " " + "|" + " " +
                            "Código: " + textoFormatado.codInfracao + " " + "|" + " " +
                            "Infrator: " + textoFormatado.infrator + " " + "|" + " " +
                            'Gravidade: ' + textoFormatado.gravidade + " " + "|" + " " +
                            'Valor: ' + textoFormatado.valorInfracao + " " + "|" + " " +
                            'Pontos na Cnh: ' + textoFormatado.pontoCnh + " " + "|" + " " +
                            'Descrição da infração: ' + textoFormatado.descInfracao + " " + "|" + " " +
                            'Placa: ' + textoFormatado.placa + " " + "|" + " " +
                            'Chassi: ' + textoFormatado.chassi + " " + "|" + " " +
                            'Marca: ' + textoFormatado.marca + " " + "|" + " " +
                            'Modelo: ' + textoFormatado.modelo + " " + "|" + " " +
                            'Cor: ' + textoFormatado.cor + " " + "|" + " " +
                            'Tipo: ' + textoFormatado.tipo + " " + "|" + " " +
                            'CPF/CNPJ: ' + textoFormatado.cpfcnpj + " " + "|" + " " +
                            'Nome do Infrator:  ' + textoFormatado.nomeInfrator + " " + "|" + " " +
                            'CEP: ' + textoFormatado.cep + " " + "|" + " " +
                            'Logradouro: ' + textoFormatado.logradouro + " " + "|" + " " +
                            "Numero: " + textoFormatado.numero + " " + "|" + " " +
                            "Complemento: " + textoFormatado.complemento + " " + "|" + " " +
                            "Bairro: " + textoFormatado.bairro + " " + "|" + " " +
                            "Estado: " + textoFormatado.estado + " " + "|" + " " +
                            "Município: " + textoFormatado.municipio + " " + "|" + " " +
                            "CPF do Condutor: " + textoFormatado.cpfCondutor +
                            "</textarea>" 

                    }

                    $('#tabela').append(
                        '<tr><td>' + res.transactions[j] +
                        '</td><td>' + res.number +
                        '</td><td>' + new Date(res.timestamp * 1000).toLocaleString() +
                        '</td><td>' + transaction.from +
                        '</td><td>' + transaction.to +
                        '</td><td>' + web3.fromWei(transaction.value) + ' Ether' +
                        '</td><td>' + dados +
                        '</td></tr>'

                    );

                }

            }

        }

    }
    $(function () {
        $(".btn-toggle").click(function (e) {
            e.preventDefault();
            el = $(this).data('element');
            $(el).toggle();
        });
    });
    $(document).ready(function () {
        var activeSystemClass = $('.list-group-item.active');
        //something is entered in search form
        $('#system-search').keyup(function () {
            var that = this;
            var tableBody = $('.table tbody');
            var tableRowsClass = $('.table tbody tr');
            $('.search-sf').remove();
            tableRowsClass.each(function (i, val) {
                var rowText = $(val).text().toLowerCase();
                var inputText = $(that).val().toLowerCase();
                if (inputText != '') {
                    $('.search-query-sf').remove();
                    tableBody.prepend('<tr class="search-query-sf"><td colspan="6"><strong>Pesquisando por: "'
                        + $(that).val()
                        + '"</strong></td></tr>');
                }
                else {
                    $('.search-query-sf').remove();
                }

                if (rowText.indexOf(inputText) == -1) {
                    tableRowsClass.eq(i).hide();

                }
                else {
                    $('.search-sf').remove();
                    tableRowsClass.eq(i).show();
                }
            });
            if (tableRowsClass.children(':visible').length == 0) {
                tableBody.append('<tr class="search-sf"><td class="text-muted" colspan="6">Nenhum resultado encontrado.</td></tr>');
            }
        });
    });


});

