	
function compartilhar(){

    table = $("<table class='table table-sm'></table>")

    $(".modal-body").html(table.append($("#tbl_checklist").html()));
}

var diaDeHoje = new Date();
    

$('#field_meses').on('change', function(){
    
    swal({
        html: 'Carregando',
        toast: true,
        onBeforeOpen: () => {
            Swal.showLoading();
        }
    })

    $('#checklist').html("");
    
    field_meses = $(this).val();
    
    carregaAnoMesDiaSemanas($("#field_ano").val(), field_meses, 1);
    
    headerTableChecklist($("#field_ano").val(),field_meses)
    
    fdb.ref('itens').orderByChild('nome').once('value', (snapshot)=> {
        snapshot.forEach(function(child){
            
            carregaChecklist(child, $("#field_ano").val(),field_meses);
            
        });
    }).then((resolve, reject) => {

        console.log( resolve)
        //return;
        swal.close();
    });
    
    var txt = "";
    $("#field_semana").html("");
    for (var i = 1; i < weekend.length; i++) {
        $("#field_semana").append("<option value='"+i+"'>Semana "+ i  + "</option>")
    }	
});

$("#field_semana").on('change', function(){
    
});

var myUserId;

function marcaCheckList(ev){
    
    urlCheckList = myUserId + '/' +$(ev).attr('item') +'/' + $(ev).attr('ano') + '/' + $(ev).attr('mes') + '/' + $(ev).attr('dia');
    
    if($(ev).html() == ""){			
        firebase.database().ref('users-cliente/' + urlCheckList).set(true, function(erro){
            if(erro){
                swal({								
                    html : "<b>Não foi possivel efetuar a operação</b>",
                    toast : true,
                    type : 'error',
                    timer: 1200
                });
            }
            else{
                swal({
                    
                    html : "<b>Hábito registrado</b>",
                    toast : true,
                    type : 'success',
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1200
                });						
            }
        });
        $(ev).html("<span style='color:green' class='fas fa-check'></span>");
    }
    else{
        firebase.database().ref('users-cliente/' + urlCheckList).set(false, function(erro){
            if(erro){
            
                swal({
                    
                    html : "<b>Não foi possivel efetuar a operação</b>",
                    toast : true,
                    type : 'error',
                    timer: 1200
                });
            }
            else{
                
                swal({
                    
                    html : "<b>Hábito desmarcado com sucesso</b>",
                    toast : true,
                    type : 'success',
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1200
                });
            
            }
        });
        $(ev).html("");
    }
}
    
function createTd(item, ano, mes, dia, x){

    if(dia == diaDeHoje.getDate() && mes == (diaDeHoje.getMonth() +1) && diaDeHoje.getFullYear() == ano){
        return "<td style='width:27px;background:#eee' onclick='marcaCheckList(this)' align='center' item="+ item +" ano="+ ano +" mes="+ mes +" dia="+ dia +">" + x + "</td>";	
    }

    return "<td style='width:27px' onclick='marcaCheckList(this)' align='center' item="+ item +" ano="+ ano +" mes="+ mes +" dia="+ dia +">" + x + "</td>";
}

var days = [];
var weekend = [];
    
function headerTableChecklist(anoSel, mesSel, semanal = false){
    
    var trHeader = $("<tr></tr>");
    
    trHeader.append("<th width='120px'>Hábito</th>");	


    if(!semanal){

        for(var i = 0; i < days.length; i++){
        
            trHeader.append("<td align='center' ano="+ anoSel +" mes='" + mesSel  +"' dia='" + days[i]  +"'>" + days[i] +"</td>");
        }
    }
    else{
    
        for(var i = 0; i < weekend[$('#field_semana').val()].length; i++){
            trHeader.append("<td align='center' ano="+ anoSel +" mes='" + mesSel  +"' dia='" + weekend[$('#field_semana').val()][i]  +"'>" +  weekend[$('#field_semana').val()][i]  +"</td>");
        }
    }

    $("#headChecklist").html(trHeader);
}
                
function carregaChecklist(item, ano, mes){
        
    var anoSel = parseInt(ano);
    var mesSel = parseInt(mes) + 1;
    
    firebase.database().ref('users-cliente/' + myUserId).once('value').then(function(snap){
        
        if(!snap.exists()){
            firebase.database().ref('users-cliente/' +  myUserId + '/'+item.key+'/'+anoSel+'/'+mesSel ).set('');
        }
    });
    
    var tBody = $("<tr></tr>");
    
    tBody.append("<td width='90px' style='font-size:10pt'>"+item.val().nome+"</td>");				
    
    firebase.database().ref('users-cliente/'+ myUserId+'/'+item.key+'/'+ anoSel + '/' + mesSel).once("value").then(function(snapshot){
        
        for (var i = 0; i < days.length; i++) {
            if(snapshot.child(i+1).val()){									
                //teste = 'treinoperna_' + anoSel + '_' + mesSel + '_' + (i+1);									
                tBody.append(createTd(item.key, anoSel, mesSel, (i+1), "<span style='color:green' class='fas fa-check'></span>"));									
            }
            else{
                tBody.append(createTd(item.key, anoSel, mesSel, (i+1), '' ));
            }
        }
                
    });
                    
    $("#checklist").append(tBody);
                    
    $("td[dia='"+diaDeHoje.getDate()+"'][mes='"+(diaDeHoje.getMonth())+"'][ano='"+diaDeHoje.getFullYear()+"']").css({
        color: "gold",
        fontWeight:"bold"
    });				
}
    
firebase.auth().onAuthStateChanged(function(user) {

    if (user) {
        
        myUserId = firebase.auth().currentUser.uid;
        
        init();
    } 
    else {

        //window.location.href = 'login.html';
    }
});
    
function init(){
    swal({
        html: 'Carregando',
        toast: true,
        onBeforeOpen: () => {
            Swal.showLoading();
        }
    })
    $("#field_ano").val(diaDeHoje.getFullYear())
    $("#field_meses").val(diaDeHoje.getMonth())
    
    carregaAnoMesDiaSemanas(diaDeHoje.getFullYear(), diaDeHoje.getMonth(), 1);
    
    headerTableChecklist($("#field_ano").val(),$("#field_meses").val())
    
    fdb.ref('itens').orderByChild('nome').once('value', (snapshot) => {
        
        snapshot.forEach(function(child){						
            carregaChecklist(child, diaDeHoje.getFullYear(),diaDeHoje.getMonth());						
        });
        
    }).then((resolve, reject) => {
        swal.close();
    });
    
    var txt = "";
    $("#field_semana").html("");
    for (var i = 1; i < weekend.length; i++) {
        $("#field_semana").append("<option value='"+i+"'>Semana "+i+"</option>")
    }							
}

function carregaAnoMesDiaSemanas(ano, mes, dia){
    
    var date = new Date(ano, mes, 1);
                
    weekend = [];
    days = [];
    
    var contWeekend = 1;
    
    var c = 0;
    
    weekend[1] = [];
    
    while (date.getMonth() === parseInt(mes)) {
        
        days.push(date.getDate());									
        
        c++;
        
        weekend[contWeekend].push(date.getDate());									
        
        date.setDate(date.getDate() + 1);
        
        if(c == 7 && date.getMonth() === parseInt(mes)){
            contWeekend++;
            
            weekend[contWeekend] = [];
            
            c=0;
        }
    }	
}
			
		