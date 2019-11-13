function initialize(){
	printSortedPlayers(allPlayers);
	createLineups(numberOfLineups);
	printLineups(lineups);
	printPositions();
	sortTeams();
	printGames();
}

function printGames(){
	
	let output = '';

	_.forEach(games, function(game){
		output += '<li>' + game.away + '</li>';
		output += '<li>' + game.home + '</li>';
	})

	output += '<li class="selected">ALL</li>';

	$('.sort-games').html(output);

}

function printPositions(){

	let output = '';

	_.forEach(gameTypes[selectedGameType].roster, function(pos){
		output += '<li>' + pos[0] + '</li>';
	});

	output += '<li class="selected">ALL</li>';

	$('.sort-positions').html(output);

}

function showSlates(){
	let output = '';
	
	_.forEach(gameTypes[selectedGameType].slates, function(slate){
		output += '<button>' + slate.name + '</button>';
	});

	$('.gametype-select').fadeOut();
	$('.slate-select').append(output).fadeIn();
}

function sortTeams(){
	
	let sortedGames = [];

	_.forEach(allPlayers, function(player){
		let game = {};
		let info = player['Game Info'];
		game['away'] = info.substr(0, info.indexOf('@'));

		info = info.substring(info.indexOf("@") + 1);
		game['home'] = info.substr(0, info.indexOf(' '));

		info = info.substring(info.indexOf(" ") + 1);
		info = info.substring(info.indexOf(" ") + 1);
		info = info.substring(0, info.indexOf(' '));
		info = info.slice(0, -2); 
		game['time'] = info

		sortedGames.push(game);
	});

	games = _.uniqBy(sortedGames, 'away');

}

