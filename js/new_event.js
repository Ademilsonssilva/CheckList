$(document).ready(function () {

    $('.dia').hide();

    $('#todos_dias_semana').on('change', function () {

        if($(this).is(':checked')) {

            $('.dia').attr('checked', 'true');
            $('.dia').hide();

        }

        else {

            $('.dia').removeAttr('checked');
            $('.dia').show();

        }

    })

    $('#salvar').on('click', function () {

        if($('#nome').val() == '') {
            swal({
                title: 'Ops',
                html: 'Preencha o nome do evento',
                type: 'error',
            });
            return false;
        }

        evento = {
            nome: $('#nome').val(),
            descricao: $('#descricao').val(),
            ativo: $('#ativo').val() == 'sim' ? true : false,
        }

        dias = [];
        $('.dia_input').each(function () {
            if($(this).is(':checked')) {
                dias.push($(this).prop('id'));
            }
        });

        if(dias.length < 1) {
            dias = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'];
        }

        evento.dias = dias;

        firebase.database().ref('itens').push(evento);

    })

    swal({
        html: 'Carregando',
        toast: true,
        onBeforeOpen: () => {
            Swal.showLoading();
        }
    })

    firebase.database().ref('itens').once("value", function(snapshot) {
        dados = [];
        snapshot.forEach(function (childSnapshot) {
            dados.push(childSnapshot);
        });

        montaTable(dados);

    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    }).then(()=>{
        swal.close();
    });

})

function montaTable(array)
{
    $('#table_body').html('');

    for(i = 0; i < array.length; i++) {

        nome = array[i].val().nome;
        key  = array[i].key;

        tbody = `
            <tr>
                <td> ${nome} </td>
                <td> <button class='btn btn-danger btn-sm fas fa-trash' onclick='remover_evento($(this))' ev_key='${key}'> Remover</button> </td>
            </tr>
        `;

        $('#table_body').append(tbody);

    }

    if($('#table_body').html() == '') {
        $('#table_body').append('<tr><td colspan="2"><i>Nenhuma informação encontrada!</i></td></td>');
    }
    
}

function remover_evento(btn)
{
    key = btn.attr('ev_key');

    firebase.database().ref('itens/' + key).remove();
}