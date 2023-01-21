import { config as dotenv} from "dotenv"
dotenv()
export const config = {
    admin : true,
    database: 'fs',
    mongo: {
        ulr: process.env.DB_MONGO_url
    },
}
