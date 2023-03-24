import { DbClient } from "../dbclient";
import { Knex } from "knex";
import { SQLDatabaseConnection } from "../config/knex.config";
import { errorLogger } from "../../services/logger.service";



export class SQLClient implements DbClient {
    private tableName :string;
    private database:Knex;
    constructor(tableName: string) {
        this.tableName = tableName;
        this.database = SQLDatabaseConnection.getInstance().getDatabase();
    }
    public async save(object: any): Promise<any> {
        try {
            let newObjectID = await this.database(this.tableName).insert(object);
            let newObject = await this.database(this.tableName).where({id: newObjectID[0]}).first();
            return newObject;
        } catch (error) {
            errorLogger.error(error);
            return null;
        }
    }
    public async update(id: string | number, object: any): Promise<any> {
        try {
            let newObjectID :any = await this.database(this.tableName).where({id: id}).update(object);
            console.log("OBJECT ID", newObjectID);
            let newObject = await this.database(this.tableName).where({id: newObjectID}).first();
            console.log("OBJECT", newObject);
            return newObject;
        } catch (error) {
            errorLogger.error(error);
            return null;
        }
    }
    public async delete(id: number): Promise<any> {
        try {
            let deletedObject = await this.database(this.tableName).where({id: id}).first();
            if (deletedObject) {
                await this.database(this.tableName).where({id: id}).first().del();
                return deletedObject;
            } else {
                return null;
            }
        } catch (error) {
            errorLogger.error(error);
            return null;
        }
    }
    public async getObjects(): Promise<any[]> {
        try {
            let objects = await this.database(this.tableName).select();
            return objects;
        } catch (error) {
            errorLogger.error(error);
            return [];
        }
    }
    public async getObject(id: string | number): Promise<any> {
        try {
            let object = await this.database(this.tableName).where({id: id}).first();
            return object;
        } catch (error) {
            errorLogger.error(error);
            return null;
        }
    }
    public async getObjectsByIds(ids: string[] | number[]): Promise<any[]> {
        return [];
    }

    public async getObjectByFields(fields: any) :Promise<any> {
        return null;
    }



    public async addOneToOneRelation(id: string | number, relation: string, relatedId: string | number): Promise<any> {}
    public async addOneToManyRelation(id: string | number, relation: string, relatedId: string | number): Promise<any> {}
    public async addManyToManyRelation(id: string | number, relation: string, relatedId: string | number): Promise<any> {}
    public async getOneToOneRelation(id: string | number, relation: string): Promise<any> {}
    public async getOneToManyRelation(id: string | number, relation: string): Promise<any> {}
    public async getManyToManyRelation(id: string | number, relation: string): Promise<any> {}
    public async deleteOneToOneRelation(id: string | number, relation: string, relatedId: string | number): Promise<any> {}
    public async deleteOneToManyRelation(id: string | number, relation: string, relatedId: string | number): Promise<any> {}
    public async deleteManyToManyRelation(id: string | number, relation: string, relatedId: string | number): Promise<any> {}
}
