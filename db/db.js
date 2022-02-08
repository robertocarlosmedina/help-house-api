const mysql = require('mysql')

const connectionPool = mysql.createPool({
	connectionLimit: process.env.DB_CONNECTION_LIMIT,
	timezone: '+00:00',
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_CENTRAL_DATABASE,
	insecureAuth: true,
})

class DB {
	static GetConnection = () => {
		return new Promise((resolve, reject) => {
			connectionPool.getConnection((error, connection) => {
				if (error) {
					return reject(error)
				}

				return resolve(connection)
			})
		})
	}

	static Query = (sqlQuery) => {
		return new Promise((resolve, reject) => {
			DB.GetConnection()
				.then((connection) => {
					connection.query(sqlQuery, (error, results, fields) => {
						connection.release()
						if (error) return reject(error)

						return resolve({ results, fields })
					})
				})
				.catch((error) => {
					console.log(error)

					reject(error)
				})
		})
	}

	/**
	 *
	 * @param {*} selectQuery A select query
	 * @returns an array when successful (it might be empty) or null when errors occur.
	 */
	static Select = async (selectQuery) => {
		try {
			const { results } = await DB.Query(selectQuery)
			return results
		} catch (error) {
			console.log(error)
			return null
		}
	}

	/**
	 *
	 * @param {*} insertQuery An insert query
	 * @returns an object containing 'insertId', 'affectedRows' or null when errors occur.
	 */
	static Insert = async (insertQuery) => {
		try {
			const { results } = await DB.Query(insertQuery)
			return results
		} catch (error) {
			console.log(error)

			return null
		}
	}

	/**
	 *
	 * @param {*} updateQuery An update query
	 * @returns an object containing 'affectedRows' and 'changedRows' or null when errors occur.
	 */
	static Update = async (updateQuery) => {
		try {
			const { results } = await DB.Query(updateQuery)
			return results
		} catch (error) {
			console.log(error)

			return null
		}
	}

	/**
	 *
	 * @param {*} deleteQuery
	 * @returns null when deleting is forbidden due to foreign key constraints, or the number of affected rows
	 */
	static Delete = async (deleteQuery) => {
		try {
			const { results } = await DB.Query(deleteQuery)
			return results.affectedRows
		} catch (error) {
			console.log(error)

			return null
		}
	}

	
	static EscapeId = (identifier) => {
		return mysql.escapeId(identifier)
	}

	static Escape = (value) => {
		return mysql.escape(value)
	}

	static Format = (sqlQuery, values) => {
		return mysql.format(sqlQuery, values)
	}
}

module.exports = DB