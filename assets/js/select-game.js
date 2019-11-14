function initialize(){
	
	if(hasOwnership){
		mergeOwnership();
		formatOwnership();
	}
	
	printSortedPlayers(allPlayers);
	createLineups(numberOfLineups);
	printLineups(lineups);
	printPositions();
	sortTeams();
	printGames();
}

function formatOwnership(){ // converting to float
	_.forEach(allPlayers, function(p){

		let formatted = false

		if(p.DKOwnership) formatted = parseFloat(p.DKOwnership.slice(0, -2));

		p.DKOwnership = formatted;

	});
}

function mergeOwnership(){
	var merged = _.merge(_.keyBy(allPlayers, 'ID'), _.keyBy(proMainOwnership, 'ID'));
	merged = _.orderBy(merged, ['Salary'],['desc'])
	allPlayers = merged;
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
		if(pos[0] != 'SF') output += '<li>' + pos[0] + '</li>';
	});

	output += '<li class="selected">ALL</li>';

	$('.sort-positions').html(output);

}

function showSlates(){
	
	let output = '<p>Number of Lineups: <input id="select-number-lineups" type="number" min="1" max="150" placeholder="20"></p>';
	
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
	games = _.orderBy(games, ['time'],['asc'])

}

