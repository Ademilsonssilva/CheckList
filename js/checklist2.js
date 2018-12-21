$(document).ready(function () {

    data = moment();

    somador = 0;

    mostraSemana(somador);

    $('.navegacao').on('click', function () {
        if( $(this).hasClass('proximo') ) {
            somador = 7;
        }
        else {
            somador = -7;
        }
			
        mostraSemana(somador);
    })

    $(document).on('click', 'td.item', (event) => {

        ano = $(event.currentTarget).attr('ano');
        mes = $(event.currentTarget).attr('mes');
        dia = $(event.currentTarget).attr('dia');
        evento = $(event.currentTarget).attr('evento');

        marcado = !$(event.currentTarget).hasClass('marcado');

        url = `users-cliente/${logged_user}/${evento}/${ano}/${mes}/${dia}`;

        fdb.ref(url).set(marcado, () => {
            mostraSemana();
        });
        
    });

    function mostraSemana(somador)
    {

        swal({
            html: 'Carregando',
            toast: true,
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        })

        data.day(somador);
			
        arr = [];
			
        for( i = 0; i < 7; i++ ) {

            data.day(i);

            if ( moment(moment().format('YYYY-MM-DD')).isSame(data.format('YYYY-MM-DD')) ) {

                $('.dia-'+i).closest('th').css('background-color', '#DCFCDC');

            }
            else {
                $('.dia-'+i).closest('th').css('background-color', '');
            }
				
            $('.dia-'+i).html(data.format('DD/MM'));  
				
            arr.push({date1:data.format('DD/MM/YYYY')});
    
        }
        
        carregaSemana();
        
    }
	
	
	function carregaSemana(){

        hoje = moment();
    
        fdb.ref('itens').once('value', (snapshot) => {
            $('#tbody').html('');
            snapshot.forEach((child) => {
                    
                var trItem = $("<tr></tr>");
                
                nome = child.val().nome;
                    
                tdItem = $("<td></td>");
                
                tdItem.append(`
                    <span class='d-block d-sm-none very-sm-text'>
                        ${nome}
                    </span>
                    <span class='d-none d-sm-block'>
                        ${nome}
                    </span>
                `);
                
                trItem.append(tdItem);
                
                for( i = 0; i < arr.length ; i++ ) {

                    xxx = moment(arr[i].date1, 'DD/MM/YYYY');
                    
                    var ano = xxx.format("YYYY");
                    var mes = xxx.format("MM");
                    var dia = xxx.format("DD");
                    

                    gerar(child.key, dia, mes, ano);

                    function gerar(evento, day, month, year) {

                
                        fdb.ref('users-cliente/'+ logged_user+'/'+evento+'/'+ year + '/' + month + '/' + day).once("value").then(function(snapshot){
                            
                            tem = snapshot.val();

                            console.log(hoje);

                            if(moment(hoje.format('YYYY-MM-DD')).isSame(moment(`${year}-${month}-${day}`))){
                                bg = '#DCFCDC';
                            }
                            else {
                                bg = '';
                            }
                            
                            td = $("<td class='item' dia="+day+" mes="+month+" ano="+year+" evento="+evento+" "+ (bg != '' ? "style='background-color: "+bg : '' ) +";'></td>");
                            td.append((tem == true ? "<span style='color:green' class='fas fa-check'></span>" : ""));
                            if(tem){
                                td.addClass('marcado');
                            }
                            trItem.append(td);
                            
                        });
                    
                    }
    
                }
                
                $('#tbody').append(trItem);					
                
            })
        }).then((resolve, reject) => {

            console.log( resolve)
            //return;
            swal.close();
        });

    }

});