// GLOBALS

let selectedGameType = false;
let gameTypes = {

	college: {
		roster: {
	 		QB: [{}],
			RB: [{}, {}],
			WR: [{}, {}, {}],
			FX: [{}],
			SF: [{}]
	 	},
	 	slates: collegeSlates,
	 	needToFilterPlayers: false

	},
	pro: {
		roster: {
	 		QB: [{}],
			RB: [{}, {}],
			WR: [{}, {}, {}],
			TE: [{}],
			FX: [{}],
			DEF: [{}]
	 	},
	 	//slates: proSlates,
	 	needToFilterPlayers: false

	},
	showdown: {
		roster: {
	 		CPT: [{}],
			FX: [{}, {}, {}, {}, {}]
	 	},
	 	//slates: showdownSlates,
	 	needToFilterPlayers: true
	}
};

//let allPlayers = playersData;
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




