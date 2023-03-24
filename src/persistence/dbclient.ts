
export interface DbClient {
    /*BASIC CRUD FUNCTIONALITY*/
    save(object :any) :Promise<any>,
    update(id :string | number, object :any) :Promise<any>,
    delete(id :string | number) :Promise<any>,
    getObjects() :Promise<any[]>,
    getObject(id: string | number) :Promise<any>,
    /*FIELDS SHOULD HAVE LOOK LIKE:
    * {
    *  field1: value1,
    *  field2: value2
    * }*/
    getObjectByFields(fields :any) :Promise<any>,


    /*RELATIONS*/
    /*NOTE: IN CASE OF RELATIONAL DATABASES, AN INTERMEDIATE TABLE
    * SHOULD BE CREATED, THIS ONE SHOULD BE NAMED WITH THE FOLLOWING
    * NAMING CONVENTION:
    * 'FIRST TABLE NAME' + 'SECOND TABLE NAME' + ... + 'relation'
    * AND IT'S COLUMNS SHOULD BE:
    * 'TABLE NAME' + ID
    * NOTE: IN CASE OF NON RELATIONAL DATABASES, THE DOCUMENT THAT HOLDS
    * THE RELATION SHOULD HAVE AN ATTRIBUTE WITH THE NAME:
    * 'COLLECTION NAME' + '_ids'
    * THAT HOLDS AN ID OR ARRAY OF IDS DEPENDING OF THE TYPE OF RELATION*/

    addOneToOneRelation(
        /*ID OF THE DOCUMENT/REGISTRY HOLDING THE RELATION*/
        id :string | number,
        /*NAME OF THE TABLE/COLLECTION OF THE RELATED ENTITY*/
        relation :string,
        /*ID OF THE RELATED ENTITY*/
        relatedId :string | number
    ) :Promise<any>,
    addOneToManyRelation(
        /*ID OF THE DOCUMENT/REGISTRY THE MANY ARE RELATED TO*/
        id :string | number,
        /*NAME OF THE TABLE/COLLECTION OF THE RELATED ENTITY*/
        relation :string,
        /*ID OF THE RELATED ENTITY*/
        relatedId :string | number
    ) :Promise<any>,
    addManyToManyRelation(
        /*ID OF THE DOCUMENT/REGISTRY HOLDING THE RELATION*/
        id :string | number,
        /*NAME OF THE TABLE/COLLECTION OF THE RELATED ENTITY*/
        relation :string,
        /*ID OF THE RELATED ENTITY*/
        relatedId :string | number
    ) :Promise<any>,
    getOneToOneRelation(
        /*ID OF THE DOCUMENT/REGISTRY HOLDING THE RELATION*/
        id :string | number,
        /*NAME OF THE TABLE/COLLECTION OF THE RELATED ENTITY*/
        relation :string
    ) :Promise<any>,
    getOneToManyRelation(
        /*ID OF THE DOCUMENT/REGISTRY THE MANY ARE RELATED TO*/
        id :string | number,
        /*NAME OF THE TABLE/COLLECTION OF THE RELATED ENTITY*/
        relation :string
    ) :Promise<any>,
    getManyToManyRelation(
        /*ID OF THE DOCUMENT/REGISTRY HOLDING THE RELATION*/
        id :string | number,
        /*NAME OF THE TABLE/COLLECTION OF THE RELATED ENTITY*/
        relation :string
    ) :Promise<any>,
    deleteOneToOneRelation(
        /*ID OF THE DOCUMENT/REGISTRY HOLDING THE RELATION*/
        id :string | number,
        /*NAME OF THE TABLE/COLLECTION OF THE RELATED ENTITY*/
        relation :string,
        /*ID OF THE RELATED ENTITY*/
        relatedId :string | number
    ) :Promise<any>,
    deleteOneToManyRelation(
        /*ID OF THE DOCUMENT/REGISTRY THE MANY ARE RELATED TO*/
        id :string | number,
        /*NAME OF THE TABLE/COLLECTION OF THE RELATED ENTITY*/
        relation :string,
        /*ID OF THE RELATED ENTITY*/
        relatedId :string | number
    ) :Promise<any>,
    deleteManyToManyRelation(
        /*ID OF THE DOCUMENT/REGISTRY HOLDING THE RELATION*/
        id :string | number,
        /*NAME OF THE TABLE/COLLECTION OF THE RELATED ENTITY*/
        relation :string,
        /*ID OF THE RELATED ENTITY*/
        relatedId :string | number
    ) :Promise<any>
}
