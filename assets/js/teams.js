function sortTeams(){
	
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

}

function printTeams(){
	// printin here
}