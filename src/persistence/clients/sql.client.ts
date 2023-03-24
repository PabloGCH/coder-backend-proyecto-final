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
            const newObjectID = await this.database(this.tableName).insert(object);
            const newObject = await this.database(this.tableName).where({id: newObjectID[0]}).first();
            return newObject;
        } catch (error) {
            errorLogger.error(error);
            return null;
        }
    }
    public async update(id: string | number, object: any): Promise<any> {
        try {
            const newObjectID :any = await this.database(this.tableName).where({id: id}).update(object);
            const newObject = await this.database(this.tableName).where({id: newObjectID}).first();
            return newObject;
        } catch (error) {
            errorLogger.error(error);
            return null;
        }
    }
    public async delete(id: number): Promise<any> {
        try {
            const deletedObject = await this.database(this.tableName).where({id: id}).first();
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
            const objects = await this.database(this.tableName).select();
            return objects;
        } catch (error) {
            errorLogger.error(error);
            return [];
        }
    }
    public async getObject(id: string | number): Promise<any> {
        try {
            const object = await this.database(this.tableName).where({id: id}).first();
            return object;
        } catch (error) {
            errorLogger.error(error);
            return null;
        }
    }

    public async getObjectsByIds(ids: string[] | number[]): Promise<any[]> {
        const objects = await this.database(this.tableName).whereIn('id', ids);
        return objects || [];
    }

    public async getObjectByFields(fields: any) :Promise<any> {
        const object = await this.database(this.tableName).where(fields).first();
        console.log(object);
        return object || null;
    }



    public async addOneToOneRelation(id: string | number, relation: string, relatedId: string | number): Promise<any> {}
    public async addOneToManyRelation(id: string | number, relation: string, relatedId: string | number): Promise<any> {}

    public async addManyToManyRelation(id: string | number, relation: string, relatedId: string | number): Promise<any> {
        await this.database(this.tableName + '_' + relation + '_relation').insert({
            [this.tableName + '_id']: id,
            [relation + '_id']: relatedId
        });
        const object = await this.database(this.tableName).where({id: id}).first();
        return object;
    }


    public async getOneToOneRelation(id: string | number, relation: string): Promise<any> {}
    public async getOneToManyRelation(id: string | number, relation: string): Promise<any> {}
    public async getManyToManyRelation(id: string | number, relation: string): Promise<any> {
        const objects = await this.database(this.tableName + '_' + relation + '_relation')
        .where(this.tableName + '_id', id)
        .select(relation + '_id');
        const ids = objects.map((object: any) => object[relation + '_id']);

        //const relatedObjects = await this.database(relation).whereIn('id', ids);
        return ids;

    }
    public async deleteOneToOneRelation(id: string | number, relation: string, relatedId: string | number): Promise<any> {}
    public async deleteOneToManyRelation(id: string | number, relation: string, relatedId: string | number): Promise<any> {}



    public async deleteManyToManyRelation(id: string | number, relation: string, relatedId: string | number): Promise<any> {
        const relationRow = await this.database(this.tableName + '_' + relation + '_relation').where({
            [this.tableName + '_id']: id,
            [relation + '_id']: relatedId
        }).first();
        if (relationRow) {
            await this.database(this.tableName + '_' + relation + '_relation').where('id', relationRow.id).first().del();
        }
        const object = await this.database(this.tableName).where({id: id}).first();

        return object;
    }
}



/*
         await this.database(this.tableName + '_' + relation + '_relation').where({
            [this.tableName + '_id']: id,
            [relation + '_id']: relatedId
        }).first().del();
        const object = await this.database(this.tableName).where({id: id}).first();
        return object;
 
 * */
