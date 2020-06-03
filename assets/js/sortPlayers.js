function printSortedPlayers(arr, sortType){

	if(sortType){
		if(sortType == 'sal'){
			arr = _.orderBy(allPlayers, ['Salary'],['desc']);
		}
		if(sortType == 'own'){
			arr = _.orderBy(allPlayers, ['DKOwnership'],['desc']);
		}
	}

	let output = '<tr class="players-headers">'
		output += '<th>Pos</th>'
		output += '<th>Name</th>'
		output += '<th>Team</th>'
		output += '<th class="players-headers-sal">Sal</th>'
		output += '<th class="players-headers-own">Own</th>'
	output += '</tr>'

	_.forEach(arr, function(value){
		output += '<tr class="player" id="' + value.ID + '">'
			output += '<td class="position">' + value.Position + '</td>'
			output += '<td class="name">' + value.Name + '</td>'
			output += '<td class="team ' + value.TeamAbbrev + '">' + value.TeamAbbrev + '</td>'
			output += '<td class="team">' + value.Salary + '</td>'
			output += '<td class="team">'
				if(value.DKOwnership) output += value.DKOwnership + '%'
				else output += "---" 
			output += '</td>'
		output += '</tr>'
	})

	$('.players').html(output)
}

function printSelectedPlayers(game){
	
	let output = ''

	for(var i=0; i<selectedPlayers.length; i++){

		let player = selectedPlayers[i]
		let foundPlayer = findPlayerById(player.ID)

		console.log(foundPlayer)

		output += '<tr class="player" id="' + player.ID + '">'
			output += '<td class="position">' + foundPlayer.Position + '</td>'
			output += '<td class="name">' + foundPlayer.Name + '</td>'
			output += '<td class="team">' + foundPlayer.TeamAbbrev + '</td>'
			output += '<td class="pct-lineups">' + player.lineupsIn.length  + '</td>'
			output += '<td class="pct-lineups">' + (player.lineupsIn.length/numberOfLineups*100).toFixed(1) + '%' + '</td>'
		output += '</tr>'
	}

	$('.players').html(output)
}

function sortPlayers(pos, game){
	let players = allPlayers
	players = sortPlayersByPosition(players, pos)
	players = sortPlayersByGame(players, game)
	return players
}

function sortPlayersByGame(players, game){

	let matching = players

	switch(game){
		
		case 'ALL':
			break
		
		default:

			matching =_.filter(players,function(item){
		    	return item.TeamAbbrev == game
		    })

			break
	}

	return matching
}

function sortPlayersByPosition(players, pos){
	
	let matching = players

	switch(pos){
		
		case 'ALL':
			break

		case 'F':
			matching = players.filter(e => ['F', 'M/F'].includes(e.Position))
			break

		case 'M':
			matching = players.filter(e => ['M', 'M/F'].includes(e.Position))
			break

		case 'M/F':
			matching = players.filter(e => ['F', 'M', 'M/F'].includes(e.Position))
			break
		
		case 'UTIL':
			matching = players.filter(e => ['F', 'M', 'M/F', 'D'].includes(e.Position))
			break
		
		default:
			matching = _.filter(players, { 'Position': pos })
			break
	}

	return matching
}

