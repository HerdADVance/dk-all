function printTeamNames(){
	
	let games = [];

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

		games.push(game);
	});

	games = _.uniqBy(games, 'away');
	console.log(games);

	// let info = allPlayers[0]['Game Info']
	// let awayTeam = info.substr(0, info.indexOf('@'));
	// info = info.substring(info.indexOf("@") + 1);
	// let homeTeam = info.substr(0, info.indexOf(' '));

	// $('.away-team').text(awayTeam)
	// $('.home-team').text(homeTeam)
}