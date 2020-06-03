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
			case 'GK': 
				added = checkGK(lineups[i])
				break
			case 'D':
				added = checkD(lineups[i])
				break
			case 'M':
				added = checkM(lineups[i])
				break
			case 'F':
				added = checkF(lineups[i])
				break
			case 'M/F':
				added = checkMF(lineups[i])
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


function checkGK(lineup){
	if(!lineup.roster['GK'][0].ID){
		lineup.roster['GK'][0] = clickedPlayer
		return true
	}

	return false
}

function checkD(lineup){
	for (var i=0; i < 2; i++){
		if(!lineup.roster['D'][i].ID){
			lineup.roster['D'][i] = clickedPlayer
			return true
		}
	}
	if(!lineup.roster['UTIL'][0].ID){
		lineup.roster['UTIL'][0] = clickedPlayer
		return true
	}

	return false
}

function checkM(lineup){
	for (var i=0; i < 2; i++){
		if(!lineup.roster['M'][i].ID){
			lineup.roster['M'][i] = clickedPlayer
			return true
		}
	}
	if(!lineup.roster['UTIL'][0].ID){
		lineup.roster['UTIL'][0] = clickedPlayer
		return true
	}

	return false
}

function checkF(lineup){
	for (var i=0; i < 2; i++){
		if(!lineup.roster['F'][i].ID){
			lineup.roster['F'][i] = clickedPlayer
			return true
		}
	}
	if(!lineup.roster['UTIL'][0].ID){
		lineup.roster['UTIL'][0] = clickedPlayer
		return true
	}

	return false
}

function checkMF(lineup){
	for (var i=0; i < 2; i++){
		if(!lineup.roster['F'][i].ID){
			lineup.roster['F'][i] = clickedPlayer
			return true
		}
	}
	for (var i=0; i < 2; i++){
		if(!lineup.roster['M'][i].ID){
			lineup.roster['M'][i] = clickedPlayer
			return true
		}
	}
	if(!lineup.roster['UTIL'][0].ID){
		lineup.roster['UTIL'][0] = clickedPlayer
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


