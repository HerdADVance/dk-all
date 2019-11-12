function showSlates(){
	let output = '';
	
	_.forEach(gameTypes[selectedGameType].slates, function(slate){
		output += '<button data-slate=>' + slate.name + '</button>';
	});

	$('.gametype-select').fadeOut();
	$('.slate-select').append(output).fadeIn();
}