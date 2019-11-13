function showSlates(){
	let output = '';
	
	_.forEach(gameTypes[selectedGameType].slates, function(slate){
		output += '<button>' + slate.name + '</button>';
	});

	$('.gametype-select').fadeOut();
	$('.slate-select').append(output).fadeIn();
}

function initialize(){
	printSortedPlayers(allPlayers);
	createLineups(numberOfLineups);
	printLineups(lineups);
	sortTeams();
	printTeams();
}