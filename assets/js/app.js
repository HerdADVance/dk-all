// GLOBALS

let gameTypes = {

	college: {
		roster: [
	 		['QB', 1],
			['RB', 2],
			['WR', 3],
			['FX', 1],
			['SF', 1]
	 	],
	 	//slates: collegeSlates,
	 	spots: 8,
	 	needToFilterPlayers: false,
	 	csvHeader: 'QB,RB,RB,WR,WR,WR,FLEX,S-FLEX\n'

	},
	pro: {
		roster: [
	 		['QB', 1],
			['RB', 1],
			['WR', 2],
			['FX', 2],
			['DST', 1]
	 	],
	 	//slates: proSlates,
	 	spots: 7,
	 	needToFilterPlayers: false,
	 	csvHeader: 'QB,RB,WR,WR,FLEX,FLEX,DST\n'

	},
	soccer: {
		roster: [
	 		['F', 2],
			['M', 2],
			['D', 2],
			['GK', 1],
			['UTIL', 1]
	 	],
	 	slates: soccerSlates,
	 	spots: 8,
	 	needToFilterPlayers: false,
	 	csvHeader: 'F,F,M,M,D,D,GK,UTIL\n'

	},
	showdown: {
		roster: [
	 		['CPT', 1],
			['FX', 6]
	 	],
	 	//slates: showdownSlates,
	 	spots: 6,
	 	needToFilterPlayers: true
	}
};

selectedGameType = false;
hasOwnership = false;

allPlayers = [];
//allPlayers = _.filter(playersData, function (f) { return f['Roster Position'] !== 'CPT'; });

games = []

selectedPlayers = []

selectedPosition = 'ALL'
selectedGame = 'ALL'

newLineupId = 0
numberOfLineups = 20
lineups = []

clickedPlayer = null
clickedPlayerLineups = []

clickedLineupRows = []
eligibleHighlightedRows = []

clickedSwapRow = []

slider = null



// INITIALIZE
//printSortedPlayers(allPlayers)
//createLineups(numberOfLineups)
//printLineups(lineups)
//printTeamNames()




