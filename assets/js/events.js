// GAMETYPE AND SLATE SELECT TO INITIALIZE
$('.gametype-select button').click(function(event){
	if(!event.detail || event.detail == 1){ // prevents double clicks
		selectedGameType = $(this).attr('data-gametype');
		showSlates();
	}
});
$('.slate-select').delegate("button", "click", function(event){
	if(!event.detail || event.detail == 1){ // prevents double clicks
		$('.initial-select').fadeOut();
		$('.overlay').fadeOut();

		let slateName = $(this).text();
		let slate = _.find(gameTypes[selectedGameType].slates, function (f) { return f['name'] == slateName; });
		
		allPlayers = slate.players;
		hasOwnership = slate.hasOwnership;

		let chosenNumberLineups = $('#select-number-lineups').val();
		if(chosenNumberLineups) numberOfLineups = chosenNumberLineups

		initialize(numberOfLineups);
	}
});

// SORTING PLAYERS BY COLUMN HEADER
$('.players').delegate('.players-headers-sal', 'click', function(){
	printSortedPlayers(allPlayers, 'sal');
})
$('.players').delegate('.players-headers-own', 'click', function(){
	printSortedPlayers(allPlayers, 'own');
})



// SORTING PLAYERS BY CLICKING POSITIONS OR TEAMS
$('.list').delegate('.sort-players li', 'click', function(){

	// Change highlighted selection
	$(this).addClass('selected').siblings().removeClass('selected');

	// Update correct global variable
	if($(this).parent().hasClass('sort-positions')) selectedPosition = $(this).text()
		else selectedGame = $(this).text()

	// Selected players requires different type of printing
	if(selectedPosition == 'SEL'){
		printSelectedPlayers(selectedGame)
	} else{ // Sort & Print
		let players = sortPlayers(selectedPosition, selectedGame)
		printSortedPlayers(players)
	}
	

});


// CLICKING ON A PLAYER FROM PLAYER SELECT TABLE
$(".players").delegate(".player", "click", function(){

	$('.players tr').removeClass('clicked-player')
	$(this).addClass('clicked-player')
	
	// Find Clicked Player & set globals for clickedPlayer and clickedPlayerLineups
	let clickedPlayerId = parseInt($(this).attr('id'))
	clickedPlayer = findPlayerById(clickedPlayerId)
	clickedPlayerLineups = checkPlayerLineups(clickedPlayerId)

	// Build Player Select Bar and place it after clicked row
	let selectBar = buildPlayerSelectBar(clickedPlayer, clickedPlayerLineups.length)
	$(this).after(selectBar)

	// Create Slider into Player Select Bar
	if(clickedLineupRows.length < 1) createSlider(clickedPlayerLineups.length)

})


// CLICKING ADD/SUBTRACT FROM LINEUPS ON SLIDER BUTTON
$(".players").delegate(".player-select-add", "click", function(){

	let random = $('#random').is(":checked");
	let numberToChange = parseInt(($('.player-select-delta').text()))
	let startFrom = parseInt($('#start-from').val());

	// Shuffle the lineups if random is selected
	if(random) lineups = _.shuffle(lineups);

	// Start from this lineup if selected
	let numberToSkip = undefined
	if(startFrom) numberToSkip = startFrom 

	// The main functions reponsible for adding or removing players
	if(numberToChange < 0) searchLineupsToRemove(clickedPlayer.Position, numberToChange)
	else searchLineups(clickedPlayer.Position, numberToChange, numberToSkip)

	// Reorder the lineups by their original ID's before printing. Otherwise keep sorted by salary/whatever
	if(random) lineups = _.orderBy(lineups, ['id'],['asc'])

	printLineups(lineups)

	updateSlider()

})


// CLICKING ON ADD PLAYER TO HIGHLIGHTED LINEUPS BUTTON
$(".players").delegate(".player-select-add-highlighted", "click", function(){

	addPlayerToHighlightedLineups()
	printLineups(lineups)

	// Reset globals and unhighlight rows
	clickedLineupRows = []
	eligibleHighlightedRows = []

	let selectBar = buildPlayerSelectBar(clickedPlayer, clickedPlayerLineups.length)
	$('.player-select-bar').remove()
	$('.clicked-player').after(selectBar)
	if(clickedLineupRows.length < 1) createSlider(clickedPlayerLineups.length)

	

})


// CLICKING ANY LINEUP ROW
$(".lineups").delegate("td", "click", function(){
	
	var lineupId = parseInt($(this).parent().parent().parent().attr('id'))
	var playerId = $(this).parent().attr('data-pid')
	
	var position = $(this).parent().attr('data-pos')
	var slot = $(this).parent().attr('data-slot')


	if(playerId){ // This row has a player so remove him from lineup and update his selected lineups OR make swap available
		
		let swapObject = {
			lineup: lineupId,
			player: findPlayerById(playerId),
			position: position,
			slot: slot
		}		

		console.log(swapObject);

		if($(this).hasClass('swap')){

			if(clickedSwapRow.length < 1){ // Swapped row is empty so add in info for spot clicked
				$(this).parent().addClass('player-swappable');
				clickedSwapRow.push(swapObject);
			} 
			else{ // Swap with previously selected
				swapPlayerWithPlayer(clickedSwapRow[0], swapObject);
				printLineups(lineups);
				clickedSwapRow = [];
			}

		} else{
			removePlayerFromOneLineup(playerId, lineupId, position, slot)
		} 
		

	} else{ // No player in row so highlight row background and add next clicked player to row

		var wasSelected = $(this).parent().hasClass('player-selectable')

		if(wasSelected){ // Row was already selected so remove from the global array
			
			clickedLineupRows = _.filter(clickedLineupRows, function(row) {
			    return row.lineup != lineupId
			});

			$(this).parent().removeClass('player-selectable')

		} else { // Row wasn't selected so add to the global array (and remove other row in same lineup)
			
			// Remove row from same lineup from global
			clickedLineupRows = _.filter(clickedLineupRows, function(row) {
			    return row.lineup != lineupId
			});

			// Add row to global
			clickedLineupRows.push({
				lineup: lineupId,
				position: position,
				slot: slot
			})

			$(this).parent().siblings().removeClass('player-selectable')
			$(this).parent().addClass('player-selectable')
	
		}
	
	}

	// Remake player select bar
	let selectBar = buildPlayerSelectBar(clickedPlayer, clickedPlayerLineups.length)
	$('.player-select-bar').remove()
	$('.clicked-player').after(selectBar)
	if(clickedLineupRows.length < 1) createSlider(clickedPlayerLineups.length)
})



// VARIOUS ACTION BUTTONS FOR SORTING LINEUPS
$('.show-over-cap').click(function(){
	$('.lineup').hide();
	$('.lineup').each(function(){
		if ($(this).children('tbody').children('.salary-status').hasClass('neg')) $(this).show();
	});
});

$('.show-all').click(function(){
	$('.lineup').show();
});

$('.sort-high').click(function(){
	sortLineupsBySalary('high');
	printLineups(lineups);
});

$('.sort-low').click(function(){
	sortLineupsBySalary('low');
	printLineups(lineups);
});

$('.sort-id').click(function(){
	sortLineupsById();
	printLineups(lineups);
});


// SWITCHING TO EXPOSURES
$('.show-exposures').click(function(){
	$('.optimizer').hide()
	$('.exposures').show()
})


// SAVING IMPORT FILE
$('.prepare-csv').click(function(){

	let output = gameTypes[selectedGameType].csvHeader

	_.forEach(lineups, function(lineup){

		for(var key in lineup.roster){
			
			let position = lineup.roster[key]

			_.forEach(position, function(slot){
				output += slot.ID + ','
			})

		}

		output = output.substring(0, output.length - 1)
		output += '\n'

	})

	$('#csv-data').val(output)

	document.getElementById('create-csv').submit();
})
