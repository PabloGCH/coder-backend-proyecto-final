import { Model, Types } from "mongoose";
import { DbClient } from "../dbclient";


export class MongoClient implements DbClient{
    private model :Model<any>;
    constructor(model :Model<any>) {
        this.model = model ;
    }
    public async save(object :any) :Promise<any> {
        let newObject :any = await this.model.create(object);
        return newObject;
    }
    public async delete(id: number) :Promise<void> {
        let object = await this.model.findByIdAndDelete(id);
        return object;

    }
    public async getObjects() :Promise<any[]> {
        let objects = await this.model.find({});
        return objects;
    }
    public async getObject(id: string | number) :Promise<any> {
        let object = await this.model.findById(id);
        return object;
    }
    public async update(id: string | number, object: any) :Promise<any> {
        let updatedObject = await this.model.findByIdAndUpdate(id, object);
        return updatedObject;
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
