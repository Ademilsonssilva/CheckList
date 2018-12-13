$(document).ready(function () {

    dias_do_mes = getDiasDoMes();

    hoje = new Date().getDate();

    dias = getSeteDias(30, dias_do_mes);

    console.log(moment().format('DD/MM/YYYY'));

    for(i = 0; i < dias_do_mes.length; i++) {

        date = new Date();
        date.setDate(i+1);
        // $('.content').append(`${dias_do_mes[i]} - ${diaSemanaExtenso(date.getDay())}<br>`);

    }

    // mostraSemana(new Date());

    function mostraSemana(date)
    {
        date = inicioSemana(date);

        for(i=0; i < 7; i++) {
            $('.content').append(`${date.getDate()} - ${diaSemanaExtenso(date.getDay())} ${date.format('d/m/Y')}<br>`);
            date.setDate(date.getDate()+1);
        }
    }

    

    console.log(dias);


    // alert(startOfWeek( new Date()));

    fdb.ref('users-cliente/'+logged_user).on('value', function (snapshot) {
        console.log(snapshot.val());
    })

    function inicioSemana(date)
    {
        var diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
    
        return new Date(date.setDate(diff));
    
    }

    function getSeteDias(data, dias_do_mes)
    {
        dias = [];
        for(i = data-3; i < data+4; i++) {

            if (dias_do_mes.includes(i) ) {

                dias.push(i);

            }

        }

        return dias;
    }

    function diaSemanaExtenso(dia)
    {
        switch(dia) {
            case 0: return 'Domingo';
            case 1: return 'Segunda';
            case 2: return 'Terça';
            case 3: return 'Quarta';
            case 4: return 'Quinta';
            case 5: return 'Sexta';
            case 6: return 'Sábado';
        }
    }

    function getDiasDoMes(date = null)
    {
        if(date == null) {
            date = new Date();
        }

        date.setDate(1);

        mes = date.getMonth();

        var days = [];
        
        while (date.getMonth() === (mes) /* && date.getDate() != 8*/) {
            days.push(date.getDate());
            date.setDate(date.getDate() + 1);
        }

        return days;
    }

});