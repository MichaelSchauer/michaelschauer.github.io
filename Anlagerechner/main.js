var mychart = ""

function drawChart(){
    const ctx = document.getElementById('myChart');
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            //labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'green', 'Orange', 'Orange'],
            labels: [''],
            datasets: [{
                label: 'Alt',
                //data: [12, 19, 3, 5, 2, 3, 5, 10, 100],
                data: [],
                backgroundColor: [
                    //'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 0
            },
            {
                label: 'Neu',
                //data: [12, 19, 3, 5, 2, 3, 5, 10, 100],
                data: [],
                backgroundColor: [
                    //'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 0
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}



function calculate(){
    removeData(myChart);

    var startkapital = Number(document.getElementById("startkapital").value);
    var monatsrate = Number(document.getElementById("monatsrate").value);
    var laufzeit = Number(document.getElementById("laufzeit").value);
    var prozent = 1+ Number(document.getElementById("prozent").value/100);
    //console.log(startkapital + " " + monatsrate + " " + laufzeit + " " + prozent);

    var ergebnis = 0;

    //var startwert = startkapital + monatsrate * 12//Startwert = Startkapital + Monatliche Rate
    var Jahreszwischenwert = startkapital;
    var UNVJahreszwischenwert = startkapital;

    var ergebnis = 0;


    $('#ergebnis').empty();
    $('#endergebnis').empty();
    $("#ergebnis").append("<div class='auswertungsline'><div class='auswertungsjahr'>Jahr</div><div class='auswertungsjahreswertunv'>Mit Zinsen</div> <div class='auswertungsjahreswertverz'>Ohne Zinsen</div><div class= 'auswertungzinsen'>Zinsen</div></div>");
    for (var i = 1; i <= laufzeit; i++){

        //mitZinsen
        Jahreszwischenwert = Jahreszwischenwert + monatsrate * 12;
        Jahreszwischenwert = Jahreszwischenwert * prozent;
        

        //ohneZinsen
        UNVJahreszwischenwert = UNVJahreszwischenwert + monatsrate * 12;
        
        //console.log(Math.round(Jahreszwischenwert + " " + UNVJahreszwischenwert));
        //Chartvariables
        var charJahreszwischenwert = Math.round(Jahreszwischenwert);
        var charUNVJahreszwischenwert = Math.round(UNVJahreszwischenwert);
        var zinsen = (Jahreszwischenwert - UNVJahreszwischenwert).toFixed(0);
        var charyear = new Date().getFullYear() + i;
        $("#ergebnis").append("<div class='auswertungsline'><div class='auswertungsjahr'>" + charyear +"</div><div class='auswertungsjahreswertunv'>" + Jahreszwischenwert.toFixed(0) + " €</div> <div class='auswertungsjahreswertverz'>"+ UNVJahreszwischenwert.toFixed(0) + " €</div><div class= 'auswertungzinsen'>"+ zinsen + " € </div></div>");
        
        addLabel(myChart, charyear)
        addData(myChart, 0 , charJahreszwischenwert);
        addData(myChart, 1 , charUNVJahreszwischenwert);
        //console.log(charyear)
        $('#endergebnis').html("Endsumme: " + Jahreszwischenwert.toFixed(0) + " €")
        //$("#ergebnis").append(charyear + " : " + Jahreszwischenwert.toFixed(2) + " €  "+ UNVJahreszwischenwert.toFixed(2) + " €</br>")
        //$("#ergebnis").append("<div class='auswertungsline'><div class='auswertungsjahr'>" + charyear + " € </div><div class='auswertungsjahreswertunv'>" + Jahreszwischenwert.toFixed(2) + " €</div><div class='auswertungsjahreswertverz'>"+ UNVJahreszwischenwert.toFixed(2) + "€ <div>" + Jahreszwischenwert.toFixed(2) - UNVJahreszwischenwert.toFixed(2) + " € </div></div>")
    }

    //ergebnis = Math.pow(startkapital + monatsrate * 12 * prozent, laufzeit);

    //document.getElementById("ergebnis").innerHTML=Jahreszwischenwert;

}

function addLabel(chart, label){
    chart.data.labels.push(label);
    chart.update();
}

function addData(chart, dataset, data) {
    chart.data.datasets[dataset].data.push(data);
    chart.update();
}

function removeData(chart) {
    chart.data.labels = [];
    chart.data.datasets[0].data = []
    chart.data.datasets[1].data = []
    chart.update();
}

//initialized = 1;