app = (function () {
    var cinema;
    var dateF;
    var module = "js/apimock.js";

    function setCinemaName() {
        cinema = newCinema;
    }

    function setDate() {
        dateF = newDate;
    }

    function getFunctionsByCinemaAndDate() {
        cinema = $("#cinema").val();
        dateF = $("#dateF").val();
        client.getFunctionsByCinemaAndDate(cinema, dateF, changeData);
    }

    function changeData(functions) {
        if(functions != null){
            var mapFunctions = functions.map(
            function (functions) {
                var nameOfMovie = functions.movie.name;
                var generMovie = functions.movie.genre;
                var date = functions.date.substring (0, 10);
                var hourDate = functions.date.substring(11, 16);
                return {movieName: nameOfMovie, gener: generMovie, hour: hourDate};
            })
        }
        setTable(mapFunctions);
    }

    function setTable(mapFunctions) {
        clearTable();
        var table = document.getElementById("table");
        if (table.rows.length > 1) for(var i = table.rows.length - 1; i > 0; i--) {table.deleteRow(i);}
        $("#cinemaName").text("Function cinema selected: "+cinema);
        $("#movieSelected").text("Availability of Functions: ");
        if(mapFunctions!=null){
            mapFunctions.map(function (film) {
                var onclick = "app.consultFunctionBySeats(\""+cinema+"\",\""+dateF+"\",\""+film.hour+"\",\""+film.movieName+"\")";
                var boton = "<input type='button' class='show' value='Consult seats' onclick='" + onclick + "'></input>";
                var row = '<tr><td>' + film.movieName + '</td><td>' + film.gener + '</td><td>' + film.hour + '</td><td>' + boton + '</td></tr>';
                $("#table").append(row);
            })
        }
    }

    function  consultFunctionBySeats (nameOfCinema,dateF,hour,movieName) {
        clearTable();
        var dateTarget = dateF.concat(" ",hour);
        $("#movieSelected").text("Availability of Functions: "+ movieName);
        $.getScript(module, function(){
            client.getFunctionByNameAndDateAndMovieName(nameOfCinema,dateTarget,movieName,drawSeats);
        });
    }

    function clearTable(){
        var pool = document.getElementById("canvas");
        var count = pool.getContext("2d");
        count.clearRect(0, 0, pool.width, pool.height);
        count.beginPath();
    }

    function drawSeats(functionToSeats) {
        var seats = functionToSeats.seats;
        var c = document.getElementById("canvas");
        var count = c.getContext("2d");
        count.fillStyle = "deepskyblue";
        count.fillRect (140, 50, 600, 50);
        var d = document.getElementById("canvas");
        var dtx = d.getContext("2d");
        var sumPosition = 0;
        for (var x = 0; x < seats[0].length; x++) {
            for (var y = 0; y < seats.length; y++) {
                if(seats[y][x] == false){
                    dtx.fillStyle = "firebrick";
                } else{
                    dtx.fillStyle = "grey";
                }
                dtx.fillRect(x*50 + 30 +sumPosition, y*40 +120 , 30, 30);
            }
            sumPosition+=20;
        }
    }

    return {
        setCinemaName: setCinemaName,
        setDate: setDate,
        getFunctionsByCinemaAndDate: getFunctionsByCinemaAndDate,
        consultFunctionBySeats : consultFunctionBySeats
    }
})();