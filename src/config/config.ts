import { config as dotenv} from "dotenv"
dotenv()
export const config = {
    admin : true,
    database: 'Mongo',
    filesystem: {
	cartsFile: "",
	productsFile: ""
    },
    mongo: {
        ulr: process.env.DB_MONGO_url
    },
}
