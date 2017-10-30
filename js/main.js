/*eslint-env browser*/
/*eslint "no-console" : "off"*/
/*global $ data*/
console.log(data);

///////// Create Logo Links //////////////

function createLogo(team) {
    var $linkLogo = $('<a href="#gamesPage" data-teamCode ="' + team.code + '"/>'); /* code represents de index of this team in the array of teams*/
    var $divLogo = $('<div class="logo"/>');
    var $imgLogo = $('<img/>').attr("src", team.logo).attr("alt", "logo of " + team.name);
    $divLogo.append($imgLogo);
    $linkLogo.append($divLogo);
    return $linkLogo; // so our link is a div with an image(logo) inside
}

////////// Create Games Links ///////////

function createGame(game) {
    /* we give classes to the eldest parent correspondind to the team.code of the teams that are playing so we can use it in the filter*/
    var $gameAccordion = $('<div class="accordion-item ' + game.teams[0] + ' ' + game.teams[1] + '"/>');
    var $divGame = $('<div class="game accordion-item-toggle"/>');// div containing the visible
    var $divContent = $('<div class="accordion-item-content"/>');// div containing the hidden
    var $divgameInfo = $('<div class="game-info"/>');// hidden div to containg all the game info
    var $gameInfo = "<p>Location: " + data.locations[game.location].place + " Elementary</p><p>Time: " +
        game.time + "</p><p>Address: " + data.locations[game.location].address + "</p><div class='app-map-parent'><iframe class='app-map' src='" +
        data.locations[game.location].map + "'></iframe></div>";
    /* we create the first team logo*/
    $divGame.append(createLogo(data.teams[game.teams[0]]));
    var $divVS = $('<div class="vs-container"/>');
    var $vsGif = $('<img class="fl-gif"/>').attr("src", "/img/flame.gif");
    var $vsImg = $('<img class="fl-image"/>').attr("src", "/img/v2.png");
    var $vsDate = $('<p class="vs-date">');
    $vsDate.html(game.date);
    $divVS.append($vsGif).append($vsImg).append($vsDate);
    $divGame.append($divVS);
    $divGame.append(createLogo(data.teams[game.teams[1]]));
    $divContent.append($divgameInfo);
    $divgameInfo.append($gameInfo);
    $gameAccordion.append($divGame).append($divContent);
    return $gameAccordion

}

function filterGames(teamcode) {
    $(".accordion-item").each(function () {
        var myClasses = this.classList;

        if (teamcode === myClasses[1] || teamcode === myClasses[2]) {
            $(this).toggle(true);
        } else {
            $(this).toggle(false);
        }
    });
}

$(document).ready(function () {

    for (var h = 0; h < data.teams.length; h++) {

        $(".teams-container").append(createLogo(data.teams[h]));
    }
    for (var x = 0; x < data.games.length; x++) {
        $(".games-container").append(createGame(data.games[x]));
    }

    $(".teams-container > a").click(function () {
        var $logoClass = $(this).attr("data-teamCode");
        $(".games-container").attr("data-teamCode", $logoClass);
        filterGames($(".games-container").attr("data-teamCode"));

    });
    $(".app-back").click( function(){
        if ($(".label-switch > input").is(":checked")) {
//            $(".label-switch > input").attr("checked","false");
            $(".label-switch > input").prop("checked", false);
                                        
            console.log("holfeera")
        }
    
        console.log("hola")
    });
    $(".label-switch > input").change(function () {
        console.log($(this).is(":checked"));
        if ($(this).is(":checked")) {
            $(".accordion-item").each(function () {
                $(this).toggle(true);
            });
        } else {
            filterGames($(".games-container").attr("data-teamCode"));
        }



    });
});
