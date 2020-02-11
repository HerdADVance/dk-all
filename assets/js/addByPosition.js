function searchLineups(pos, num, skip){

	addPlayer(pos, num, skip)

}

function searchLineupsToRemove(pos, num){
	removeRegular(pos, num)
}

function addPlayer(pos, numLineups, numSkip){

	var addedTo = [] // Lineup Id's that fit our criteria. We'll use this at the end of this function

	let i = 0
	if(numSkip) i = numSkip - 1;

	// Looping through global lineups
	for(i; i < lineups.length; i++){

		let alreadyInLineup = isClickedPlayerInLineup(lineups[i].id)
		if(alreadyInLineup) continue

		let added = false
		switch(pos){
			case 'QB': 
				added = checkQB(lineups[i])
				break
			case 'RB':
				added = checkRB(lineups[i])
				break
			case 'WR':
				added = checkWR(lineups[i])
				break
			case 'TE':
				added = checkTE(lineups[i])
				break
			case 'DST':
				added = checkDST(lineups[i])
				break
			default:
				console.log("ERROR")
				break
		}

		if(added) addedTo.push(lineups[i].id)
		else continue

		// Stop because we've reached the number to add
		if(addedTo.length == numLineups) break

	}

	addLineupsToPlayer(addedTo)

}

function addLineupsToPlayer(toAdd){

	let lineupsIn = clickedPlayerLineups
	
	if(lineupsIn.length == 0){
		
		// Create the player in SelectedPlayers 
		selectedPlayers.push({
			'ID': clickedPlayer.ID,
			'lineupsIn': toAdd
		})

		// Set global to update slider view
		clickedPlayerLineups = toAdd

	} else{

		// Player is already selected so find him and merge newlineups with existing lineups
		let foundPlayer = selectedPlayers.findIndex(x => x.ID == clickedPlayer.ID)
		let merged = _.concat(lineupsIn, toAdd);
		selectedPlayers[foundPlayer].lineupsIn = merged

		// Set global to update slider view
		clickedPlayerLineups = merged

		console.log(clickedPlayerLineups)
	}
}

function addPlayerToHighlightedLineups(){

	let rows = eligibleHighlightedRowsToAdd // global
	let toAdd = [] // collecting lineup id's for selected players
	
	for(var i = 0; i < rows.length; i++){

		let position = rows[i].position
		let slot = rows[i].slot
		
		// find the index of each highlighted lineup
		let foundLineupIndex = lineups.findIndex(x => x.id == rows[i].lineup)
		
		// insert as captain or regular
		lineups[foundLineupIndex].roster[position][slot] = clickedPlayer

		// Add to our collection to send to selected players
		toAdd.push(lineups[foundLineupIndex].id)
		
	}

	// Update the player's lineups in selected players
	addLineupsToPlayer(toAdd)

}


function checkQB(lineup){
	if(!lineup.roster['QB'][0].ID){
		lineup.roster['QB'][0] = clickedPlayer
		return true
	}

	if(selectedGameType == 'college'){
		if(!lineup.roster['SF'][0].ID){
			lineup.roster['SF'][0] = clickedPlayer
			return true
		}
	}
	return false
}

function checkRB(lineup){
	for (var i=0; i < 1; i++){
		if(!lineup.roster['RB'][i].ID){
			lineup.roster['RB'][i] = clickedPlayer
			return true
		}
	}
	if(!lineup.roster['FX'][0].ID){
		lineup.roster['FX'][0] = clickedPlayer
		return true
	}
	if(!lineup.roster['FX'][1].ID){
		lineup.roster['FX'][1] = clickedPlayer
		return true
	}

	if(selectedGameType == 'college'){
		if(!lineup.roster['SF'][0].ID){
			lineup.roster['SF'][0] = clickedPlayer
			return true
		}
	}

	return false
}

function checkWR(lineup){
	for (var i=0; i < 2; i++){
		if(!lineup.roster['WR'][i].ID){
			lineup.roster['WR'][i] = clickedPlayer
			return true
		}
	}
	if(!lineup.roster['FX'][0].ID){
		lineup.roster['FX'][0] = clickedPlayer
		return true
	}
	if(!lineup.roster['FX'][1].ID){
		lineup.roster['FX'][1] = clickedPlayer
		return true
	}

	if(selectedGameType == 'college'){
		if(!lineup.roster['SF'][0].ID){
			lineup.roster['SF'][0] = clickedPlayer
			return true
		}
	}

	return false
}

function checkTE(lineup){
	if(!lineup.roster['TE'][0].ID){
		lineup.roster['TE'][0] = clickedPlayer
		return true
	}
	if(!lineup.roster['FX'][0].ID){
		lineup.roster['FX'][0] = clickedPlayer
		return true
	}

	return false
}

function checkDST(lineup){
	if(!lineup.roster['DST'][0].ID){
		lineup.roster['DST'][0] = clickedPlayer
		return true
	}
	return false
}



function isClickedPlayerInLineup(lid){
	return _.includes(clickedPlayerLineups, lid)
}

function checkPlayerLineups(pid){
	let player = _.find(selectedPlayers, {'ID': pid })
	if(player) return player.lineupsIn
		else return []
}


