const DB = require('./db')

class HelpHouse {
	/* Sql connectors related to the user autentication */ 

	static get_users =  async (id = null) => {
		let sql;
		if(id !== null){
			sql = `select * from users WHERE id=${id}`;
		}
		else{
			sql = `select * from users`;
		}
		
		return await DB.Select(sql)
	}

	static post_user =  async (email, username, userphone, hash_password, price, longitude, latitude) => {
		const sql = `INSERT INTO users (email, username, userphone, hash_password, price, longitude, latitude) 
		VALUES ("${email}", "${username}", "${userphone}" , "${hash_password}", "${price}", 
			"${longitude}", "${latitude}");`		

		const results = await DB.Insert(sql);

		return results
	}

	static edit_user =  async (id, password) => {
		
		const sql = `UPDATE users SET hash_password="${password}"
		 WHERE id=${id};`

		const results = await DB.Update(sql)
		return results
	}

	static delete_user =  async (id) => {
		const sql = `DELETE FROM users WHERE id=${id}`

		const results = await DB.Delete(sql)
		return results
	}


	// ---------- services -------------

	static get_services =  async (id = null) => {
		let sql;
		if(id !== null){
			sql = `select * from service WHERE id=${id}`;
		}
		else{
			sql = `select * from service`;
		}
		
		return await DB.Select(sql)
	}

	static get_services_category =  async (id = null) => {
		let sql;
		if(id !== null){
			sql = `select * from _categoria_service WHERE id=${id}`;
		}
		else{
			sql = `select * from _categoria_service`;
		}
		
		return await DB.Select(sql)
	}

	static post_service =  async (description, data, horas, id_prestador, id_requsitador, id_categoria) => {
		const sql = `INSERT INTO service (description, data, horas, id_prestador, id_requsitador, id_categoria, status) 
		VALUES ("${description}", '${data}', "${horas}" , "${id_prestador}", "${id_requsitador}", 
			"${id_categoria}", 1);`		

		const results = await DB.Insert(sql);

		return results
	}

	static post_service_category =  async (name, description) => {
		const sql = `INSERT INTO _categoria_service (name, description) 
		VALUES ("${name}", "${description}");`		

		const results = await DB.Insert(sql);

		return results
	}

	static update_service_state = async (id, state) => {
		const sql = `UPDATE service
		SET status = ${state} 
		WHERE id=${id};`

		const results = await DB.Insert(sql);

		return results
	}

	static delete_service =  async (id) => {
		const sql = `DELETE FROM service WHERE id=${id}`

		const results = await DB.Delete(sql)
		return results
	}

	static delete_service_category =  async (id) => {
		const sql = `DELETE FROM _categoria_service WHERE id=${id}`

		const results = await DB.Delete(sql)
		return results
	}
}

module.exports = HelpHouse
