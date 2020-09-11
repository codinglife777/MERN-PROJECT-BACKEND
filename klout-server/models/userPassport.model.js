const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Campos que vamos a guardar en la base de datos
const UserPassportSchema = new Schema({
	name				: String, // Nombre del usuario
	provider		: String, // Cuenta del usuario (Twitter o Facebook en este ejemplo)
	provider_id : {type: String, unique: true}, // ID que proporciona Twitter o Facebook
	photo			 : String, // Avatar o foto del usuario
	createdAt	 : {type: Date, default: Date.now} // Fecha de creación
});

// Exportamos el modelo 'User' para usarlo en otras
// partes de la aplicación
const Userpasport = mongoose.model('UserPassport', UserPassportSchema);