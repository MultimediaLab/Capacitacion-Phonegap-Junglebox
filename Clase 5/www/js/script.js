$(document).on("ready", mobileReady);

var db;
var usuario;
var usuario_loggin;
var results_query;
function mobileReady () {
	$('#save').on("click", saveClick);
	$('#login_user').on("click", loginUser);
	db = window.openDatabase("contactos", "1.0", "Base de datos WebSQL", 2*1024);
	db.transaction(initDB, errorDB, successDB);

}
function loginUser () {
	usuario_loggin = $('#login_form').serializeJSON();
	selectInDB("SELECT * FROM Contacts WHERE mail ='"+usuario_loggin.correo_login+"'", function (data) {
		console.log(data);
		if (usuario_loggin.correo_login == data.id && usuario_loggin.password_login == data.pass) {
			alert("Login Exitoso");
		}else{
			alert("Usuario o clave incorrecta, Por favor registrese");
			$.mobile.navigate('#registro', {transition: "slide"});
		}
	})
	return false;
}
function selectInDB (query, callback) {
	results_query = [];
	db.transaction(function(tx){
		tx.executeSql(query, [], function (tx, rs) {
			for (var i = 0; i <  rs.rows.length; i++) {
				var row = rs.rows.item(i);
				results_query = {id:row['mail'], pass:row['password']};
			};
			callback(results_query);
		},errorDB);
	});
}
function initDB (tx) {
	tx.executeSql('DROP TABLE IF EXISTS Contacts');
	tx.executeSql('CREATE TABLE IF NOT EXISTS Contacts (id integer primary key, name, password, phone, gender, mail, notifications)');
	tx.executeSql('INSERT INTO Contacts (name, password, phone, gender, mail, notifications) VALUES ("jose", "1234" ,"3129388383", "M", "correo@correo.com", "Si")');
}
function saveInDB (tx) {
	tx.executeSql('INSERT INTO Contacts (name, password, phone, gender, mail, notifications) VALUES ("'+usuario.name+'", "'+usuario.password+'", "'+usuario.phone+'", "'+usuario.genero+'", "'+usuario.mail+'", "'+usuario.notification+'")');
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
	$.mobile.navigate('#login', {transition: "flip"});
	return false;
}