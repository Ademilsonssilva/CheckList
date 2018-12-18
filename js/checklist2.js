$(document).ready(function () {

    // function getAddress () { 
    //     console.log('GetAddress chamada');
    //     return new Promise ((resolve, reject)=>{ 
    //         setTimeout(resolve, 2000); 
    //     }); 
    // }
    
    // function getUser () { 
    //     return new Promise((resolve, reject)=>{ 
    //         console.log('GetUser chamada');
    //         setTimeout(_=>resolve(getAddress()), 1000); 
    //     }); 
    // }
    
    // getUser().then( result=>console.log('Done') ); 


    // return false;


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
            mostraSemana(somador);
        });
        
    });

    function mostraSemana(somador)
    {
        data.day(somador);
			
        arr = [];
			
        for( i = 0; i < 7; i++ ) {

            data.day(i);
				
            $('#dia-'+i).html(data.format('DD/MM'));  
				
            arr.push({date1:data.format('DD/MM/YYYY')});
    
        }
        
        new Promise((resolve, reject) => {
            resolve(carregaSemana()).then(() => {
                alert('oi');
            })
        })
        

    }
	
	
	function carregaSemana(){
    
        return new Promise( (resolve, reject) => {

            return fdb.ref('itens').on('value', (snapshot) => {
                $('#tbody').html('');
                snapshot.forEach((child) => {
                        
                        var trItem = $("<tr></tr>");
                        
                        nome = child.val().nome;
                            
                        tdItem = $("<td></td>");
                        
                        tdItem.append(nome);
                        
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
                                    
                                    td = $("<td class='item' dia="+day+" mes="+month+" ano="+year+" evento="+evento+"></td>");
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
            })

        });
    }

});