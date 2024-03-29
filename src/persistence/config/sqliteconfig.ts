import { Knex } from "knex"
import path from "path"


export const sqliteconfig :Knex.Config = {
	client: "sqlite",
	connection: {
		filename: path.join(__dirname, "../db/db.sqlite")
	},
    useNullAsDefault: true
}
