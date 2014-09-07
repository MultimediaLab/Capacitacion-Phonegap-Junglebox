/*$(document).ready(function () {
	// body...
})

$('#boton').click(funtion(){
	
})
*/


$(document).on("ready", paginaCargada);

function paginaCargada () {
	$('footer').load("footer.html");
	$('#bloque_1').addClass("animated bounceIn");
}

