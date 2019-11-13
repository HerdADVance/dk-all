function buildPlayerSelectBar(player, numLineups){
	$('.player-select-bar').remove()

	if(!numLineups) numLineups = 0

	let notDupes, dupes
	if(clickedLineupRows.length > 0){
		notDupes = checkForDuplicates()
		eligibleHighlightedRowsToAdd = notDupes // global
		dupes = clickedLineupRows.length - notDupes.length
	}

	var output = '<tr class="player-select-bar">'
		output += '<td colspan="6">'
			output += '<p>'
				output += '<span class="player-select-name">' + player.Name + '</span> '
				output += 'is currently in <span class="player-select-current-lineups">' + numLineups + '</span> lineups'
			output += '</p>'
			output += '<div class="player-select-slider"></div>'

			if(clickedLineupRows.length > 0){
				output += '<button class="player-select-add-highlighted">Add to <span>' + notDupes.length + '</span> highlighted lineups</button>'
				if(dupes > 0) output += '<p class="player-select-dupes">Player is already in ' + dupes + ' of the ' + clickedLineupRows.length + ' highlighted lineups</p>'
			} else{
				output += '<button class="player-select-add">Add to <span class="player-select-delta"></span> lineups</button><br/>'
				output += '<table class="player-select-add-options">';
					output += '<tr><th>Random</th><th>Start From</th></tr>';
					output += '<tr>'
						output += '<td><input id="random" type="checkbox"></td>';
						output += '<td><input id="start-from"></input></td>';
					output += '</tr>';
				output += '</table>'
			}
			
		output += '</td>'
	output += '</tr>'

	return output
}

function findPlayerById(id){
	id = parseInt(id);
	let player = _.find(allPlayers, {'ID': id })
	return player
}

function checkForDuplicates(){

	return _.filter(clickedLineupRows, (v) => _.indexOf(clickedPlayerLineups, v.lineup) === -1) 

}



// <p class="player-add-currently-in"><span class="player-add-name"></span> is currently in <span class="player-add-number-lineups"></span> of <span class="player-add-total-lineups"></span> lineups.</p>
// <div class="player-add-slider"></div>
// <p><input class="player-add-slider-number" />(<span class="player-add-slider-pct"></span>%)</p>
// <p><button class="player-add-button" id="delta-plus">Add to <span class="player-add-delta"></span> more lineups.</button></p>
// <p><button class="player-add-button" id="delta-minus">Remove from <span class="player-add-delta"></span> lineups.</button></p>