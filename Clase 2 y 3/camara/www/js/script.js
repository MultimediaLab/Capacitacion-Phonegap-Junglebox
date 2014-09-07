//Browser
//$(document).on("ready", paginaCargada);

//Phonegap
$(document).on("deviceready", paginaCargada);

$(document).on("pagecreate", "#acelerometro", cargarAcelerometro);

$(document).on("pagecreate", "#gps", cargarGps);


var pictureSource; //La fuente de la Imagen
var destinationType; //Definir el formato de la imagen que se retorna

function cargarGps(){
	var defaultLatLng = new google.maps.LatLng(6.23592, -75.5751);
	if(navigator.geolocation){
		function exitoGps(pos){
			var ubicacion = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
			alert(ubicacion);
			drawMap(ubicacion);
		}
		function errorGps(error){
			alert(error);
			drawMap(defaultLatLng);
		}
		navigator.geolocation.getCurrentPosition(exitoGps, errorGps);
	}else{
		alert("sensor no existe");

		drawMap(defaultLatLng);
	}
	function drawMap(latlng){
		var opcionesMap = {
			zoom: 18,
			center: latlng,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		var map = new google.maps.Map(document.getElementById("map-canvas"), opcionesMap);
		var marker = new google.maps.Marker({
			position: latlng,
			map: map,
			title: "Aqui estamos!!!"
		});
	}
}

function cargarAcelerometro(){
	if (navigator.accelerometer) {
		function exitoAcel (acceleration)
		{
			$('#accelerometer').html('acelX: '+acceleration.x+'<br>acelY: '+acceleration.y+'<br>acelZ: '+acceleration.z+'<br>');
		}
		function errorAcel (error)
		{
			alert(error);
		}
		var option = {frequency: 1000}

		navigator.accelerometer.watchAcceleration(exitoAcel, errorAcel, option);

	}else{
		alert("Sensor no disponible");
	}
}

function paginaCargada () {
	pictureSource = navigator.camera.PictureSourceType;
	destinationType = navigator.camera.DestinationType;
	$('#tomarFoto').on("click", capturarFotoClick);
	$('#tomarFotoEditable').on("click", capturarFotoEditableClick);
	
	$('#libreriaFotos').on("click", capturaLibreria);
	$('#albumFotos').on("click", capturaAlbum);	

	$('footer').load("footer.html");
	$('#bloque_1').addClass("animated bounceIn");
}


function capturaExitosaArchivo(image){
	$('#largePhoto').attr("src", image);
}
function capturaLibreria () {
	navigator.camera.getPicture(capturaExitosaArchivo, capturaError, {quality: 90, destinationType: destinationType.FILE_URI, sourceType: pictureSource.PHOTOLIBRARY});
}
function capturaAlbum (argument) {
	navigator.camera.getPicture(capturaExitosaArchivo, capturaError, {quality: 90, destinationType: destinationType.FILE_URI, sourceType: pictureSource.SAVEDPHOTOALBUM});
}

function capturarFotoClick(){

	//Base 64
	navigator.camera.getPicture(capturaExitosa,capturaError,{quality:50, destinationType: destinationType.DATA_URL});
	alert("Foto Capturada");

}

function capturarFotoEditableClick(){

	//Base 64
	navigator.camera.getPicture(capturaExitosa,capturaError,{quality:50, allowEdit: true, destinationType: destinationType.DATA_URL});
	alert("Foto Capturada");

}
function capturaExitosa(imagen){

	alert("Exitoso");
	$('#smallPhoto').attr("src", "data:image/jpg;base64,"+imagen);

}
function capturaError(message){
	alert("Error: "+message);

}

