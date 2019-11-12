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
	 	needToFilterPlayers: false

	},
	pro: {
		roster: [
	 		['QB', 1],
			['RB', 2],
			['WR', 3],
			['TE', 1],
			['FX', 1],
			['DEF', 1]
	 	],
	 	slates: proSlates,
	 	needToFilterPlayers: false

	},
	showdown: {
		roster: [
	 		['CPT', 1],
			['FX', 6]
	 	],
	 	//slates: showdownSlates,
	 	needToFilterPlayers: true
	}
};

allPlayers = [];
//allPlayers = _.filter(playersData, function (f) { return f['Roster Position'] !== 'CPT'; });


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




