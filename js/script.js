// Script de mascara CpfCnj

var options = {
    onKeyPress: function (cpf, ev, el, op) {
        var masks = ['000.000.000-000', '00.000.000/0000-00'];
        $('#cpfcnpj').mask((cpf.length > 14) ? masks[1] : masks[0], op);
    }
}

$('#cpfcnpj').length > 11 ? $('#cpfcnpj').mask('00.000.000/0000-00', options) : $('#cpfcnpj').mask('000.000.000-00#', options);

// Script de mascara Cpf

$("#cpfCondutor").keydown(function () {
    try {
        $("#cpf").unmask();
    } catch (e) { }
    $("#cpfCondutor").mask("999.999.999-99");
    // ajustando foco
    var elem = this;
    setTimeout(function () {
        // mudo a posição do seletor
        elem.selectionStart = elem.selectionEnd = 10000;
    }, 0);
    // reaplico o valor para mudar o foco
    var currentValue = $(this).val();
    $(this).val('');
    $(this).val(currentValue);
});

//SCRIPT DE MASCARA PARA DINHEIRO
$("#valorInfracao").maskMoney({
    prefix: "R$ ",
    decimal: ",",
    thousands: "."
});
$("#cep").focusout(function(){
	//Início do Comando AJAX
    $.ajax({
        //O campo URL diz o caminho de onde virá os dados
        //É importante concatenar o valor digitado no CEP
        url: 'https://viacep.com.br/ws/'+$(this).val()+'/json/unicode/',
        //Aqui você deve preencher o tipo de dados que será lido,
        //no caso, estamos lendo JSON.
        dataType: 'json',
        //SUCESS é referente a função que será executada caso
        //ele consiga ler a fonte de dados com sucesso.
        //O parâmetro dentro da função se refere ao nome da variável
        //que você vai dar para ler esse objeto.
        success: function(resposta){
            //Agora basta definir os valores que você deseja preencher
            //automaticamente nos campos acima.
            $("#logradouro").val(resposta.logradouro);
            $("#numero").val(resposta.complemento);
            $("#bairro").val(resposta.bairro);
            $("#estado").val(resposta.uf);
            $("#municipio").val(resposta.localidade);
          
            
            //Vamos incluir para que o Número seja focado automaticamente
            //melhorando a experiência do usuário
            $("#numero").focus();
        }
    });	
	});