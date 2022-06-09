import {Identifier, Model, ModelCtor} from "sequelize";
import {NextApiRequest, NextApiResponse} from "next";

export class SequelizeCRUD<model extends ModelCtor<Model<any, any>>> {
    protected table: model;

    constructor(table: model) {
        this.table = table;
    }

    public static getRouteHandlerFromModel<sequeModel extends ModelCtor<Model<any, any>>>(SeqModel: any) {
        const CRUD = new this<sequeModel>(SeqModel);
        return CRUD.generateRouteHandler();
    }

    public static getIDRouteHandlerFromModel<sequeModel extends ModelCtor<Model<any, any>>>(SeqModel: any, idName: string = "id") {
        const CRUD = new this<sequeModel>(SeqModel);
        return CRUD.generateIDRouteHandler();
    }

    public static getNextApiRouteId(req: NextApiRequest, idName: string = "id") {
        let queryElement = req.query[idName];
        if (typeof queryElement !== "string") {
            throw new Error(`The ID value must be a string, but it is ${typeof queryElement}. Check the IdName parameter.`);
        }
        return queryElement;
    }

    public findAll() {
        return this.table.findAll();
    }

    public findById(id: Identifier) {
        return this.table.findByPk(id);
    }

    public deleteById(id: Identifier) {
        return this.table.destroy({
            where: {
                [this.table.primaryKeyAttribute]: id
            }
        });
    }

    public create(data: any) {
        return this.table.create(data);
    }

    async updateById(data: any, id: Identifier) {
        return this.table.update(data, {
            where: {
                [this.table.primaryKeyAttribute]: id
            }
        });
    }

    public GET(req: NextApiRequest, res: NextApiResponse) {
        this.findAll().then(
            data => {
                res.json(data);
            }
        ).catch((e) => {
            res.status(500).json(e);
        });
    }

    public GET_WITH_ID(req: NextApiRequest, res: NextApiResponse) {
        this.findById(SequelizeCRUD.getNextApiRouteId(req)).then(
            data => {
                res.json(data);
            }
        ).catch((e) => {
            console.error(e);
            res.status(500).json(e);
        });
    }

    public DELETE_WITH_ID(req: NextApiRequest, res: NextApiResponse) {
        this.deleteById(SequelizeCRUD.getNextApiRouteId(req)).then(
            data => {
                res.json(data);
            }
        ).catch((e) => {
            res.status(500).json(e);
        });
    }

    public POST(req: NextApiRequest, res: NextApiResponse) {
        this.create(req.body).then(
            data => {
                res.json(data);
            }
        ).catch((e) => {
            res.status(500).json(e);
        });
    }

    public PUT_WITH_ID(req: NextApiRequest, res: NextApiResponse) {
        this.updateById(req.body, SequelizeCRUD.getNextApiRouteId(req)).then(
            data => {
                res.json(data);
            }
        ).catch((e) => {
            res.status(500).json(e);
        });
    }

    public generateIDRouteHandler() {
        return (req: NextApiRequest, res: NextApiResponse) => {
            switch (req.method) {
                case 'GET':
                    this.GET_WITH_ID(req, res);
                    break;
                case 'PUT':
                    this.PUT_WITH_ID(req, res);
                    break;
                case 'DELETE':
                    this.DELETE_WITH_ID(req, res);
                    break;
                default:
                    res.status(404).json({error: 'Not found'});
            }
        };
    }

    public generateRouteHandler() {
        return (req: NextApiRequest, res: NextApiResponse) => {
            switch (req.method) {
                case 'GET':
                    this.GET(req, res);
                    break;
                case 'POST':
                    this.POST(req, res);
                    break;
                default:
                    res.status(404).json({error: 'Not found'});
            }
        };
    }
}