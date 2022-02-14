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

	static get_all_prestadores =  async () => {
		const sql = `select * from users WHERE user_type=1`;
		return await DB.Select(sql)
	}

	static post_user =  async (email, username, userphone, hash_password, price, longitude, latitude, user_type) => {
		const sql = `INSERT INTO users (email, username, userphone, hash_password, price, longitude, latitude, user_type) 
		VALUES ("${email}", "${username}", "${userphone}" , "${hash_password}", "${price}", 
			"${longitude}", "${latitude}", ${user_type});`		

		const results = await DB.Insert(sql);

		return results
	}


	static edit_user =  async (id, password) => {
		
		const sql = `UPDATE users SET hash_password="${password}"
		 WHERE id=${id};`

		const results = await DB.Update(sql)
		return results
	}

	static edit_user_contact_price =  async (id, userphone, price) => {
		
		const sql = `UPDATE users SET userphone="${userphone}", price='${price}'
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
			sql = `select * from service WHERE id_prestador=${id} or id_requsitador=${id} and status=1`;
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

	static add_category_user = async (id_user, id_category) =>{
		const sql = `INSERT INTO user_service_category (id_user, id_category) VALUES ('${id_user}', '${id_category}');`;

		const results = await DB.Insert(sql);

		return results
	}

	static get_user_categorys =  async (id_category = null) => {
		let sql;
		if(id_category !== null){
			sql = `SELECT x.username, x.email, x.userphone, x.price, x.id, y.id_user, y.id_category
			FROM users x, user_service_category y WHERE y.id_category=${id_category} and x.id=y.id_user;`;
		}
		else{
			sql = `select * from user_service_category`;
		}
		
		return await DB.Select(sql)
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
		console.log(id, state)

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
