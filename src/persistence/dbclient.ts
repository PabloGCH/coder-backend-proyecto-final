
export interface DbClient {
    save(object :any) :Promise<any>,
    update(id :string | number, object :any) :Promise<any>,
    delete(id :string | number) :Promise<any>,
    getObjects() :Promise<any[]>,
    getObject(id: string | number) :Promise<any>
}
