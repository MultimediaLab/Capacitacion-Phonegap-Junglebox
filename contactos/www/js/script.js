$(document).on("ready", mobileReady);

var db;
var usuario;
function mobileReady () {
	$('#save').on("click", saveClick);
	db = window.openDatabase("contactos", "1.0", "Base de datos WebSQL", 2*1024);
	db.transaction(initDB, errorDB, successDB);

}

function initDB (tx) {
	tx.executeSql('DROP TABLE IF EXISTS Contacts');
	tx.executeSql('CREATE TABLE IF NOT EXISTS Contacts (id integer primary key, name, phone, gender, mail, notifications)');
	tx.executeSql('INSERT INTO Contacts (name, phone, gender, mail, notifications) VALUES ("jose", "3129388383", "M", "correo@correo.com", "Si")');
}
function saveInDB (tx) {
	tx.executeSql('INSERT INTO Contacts (name, phone, gender, mail, notifications) VALUES ("'+usuario.name+'", "'+usuario.phone+'", "'+usuario.genero+'", "'+usuario.mail+'", "'+usuario.notification+'")');
}
function successDB () {
	alert("Transaccion Correcta");
}
function errorDB (err) {
	alert("Error procesando SQL: " +err.code);
}

function saveClick () {
	usuario = $('#form_registro').serializeJSON();
	db.transaction(saveInDB, errorDB, successDB);
	return false;
}