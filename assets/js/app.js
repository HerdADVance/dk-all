// GLOBALS

let selectedGameType = false;
let gameTypes = {

	college: {
		roster: [
	 		['QB', 1],
			['RB', 2],
			['WR', 3],
			['FX', 1],
			['SF', 1]
	 	],
	 	slates: collegeSlates,
	 	spots: 8,
	 	needToFilterPlayers: false,
	 	csvHeader: 'QB,RB,RB,WR,WR,WR,FLEX,S-FLEX\n'

	},
	pro: {
		roster: [
	 		['QB', 1],
			['RB', 2],
			['WR', 3],
			['TE', 1],
			['FX', 1],
			['DST', 1]
	 	],
	 	slates: proSlates,
	 	spots: 9,
	 	needToFilterPlayers: false,
	 	csvHeader: 'QB,RB,RB,WR,WR,WR,TE,FLEX,DST\n'

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




