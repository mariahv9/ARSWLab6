client = (function () {
    function getFunctionsByCinema (cinema, callback) {
        $.ajax ({
            dataType: "json",
            url: "http://localhost:8080/cinemas/" + cinema,
            success: function(data){
                callback(data)
            }
        });
    }

    function getFunctionsByCinemaAndDate (cinema, dateF, callback) {
        $.ajax ({
            dataType: "json",
            url: "http://localhost:8080/cinemas/" + cinema + "/" + dateF,
            success: function(data){
            callback(data)
            }
        });
    }

    function getFunctionByNameAndDateAndMovieName (cinema, dateF, movie, callback){
        $.ajax ({
            dataType: "json",
            url: "http://localhost:8080/cinemas/" + cinema + "/" + dateF + "/" + movie,
            success: function(data){
            callback(data)
            }
        });
    }

    return {
        getFunctionsByCinema: getFunctionsByCinema,
        getFunctionsByCinemaAndDate: getFunctionsByCinemaAndDate,
        getFunctionByNameAndDateAndMovieName: getFunctionByNameAndDateAndMovieName
    }
})();