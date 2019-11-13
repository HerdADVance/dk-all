function checkLineupForCaptain(lineup){
	if(lineup.roster['CAP'][0].ID == clickedPlayer.ID) return true
	else return false
}

function checkLineupForRegularPlayer(lineup){

	// Check the main position
	for(var i = 0; i < 5; i++){
		if(lineup.roster['REG'][i].ID == clickedPlayer.ID) return true
	}

	return false
}

function removeCaptain(pos, numLineups){

	var removeFrom = []

	// Looping through global lineups
	for(var i=0; i < lineups.length; i++){

		// Checking to see if player is captain in this lineup
		let isCaptain = checkLineupForCaptain(lineups[i])
		
		// Player is the captain so remove them and add to counter
		if(isCaptain){
			lineups[i].roster['CAP'][0] = {}
			removeFrom.push(lineups[i].id)
		}

		// Stop because we've reached the number to remove
		if(removeFrom.length == Math.abs(numLineups)) break

	}

	//removeLineupsFromPlayer(clickedPlayer.ID, removeFrom)

}