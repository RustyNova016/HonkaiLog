import {InferAttributes, InferCreationAttributes, Model} from "sequelize";

export class DBModel<modeltype extends Model> extends Model<InferAttributes<modeltype>, InferCreationAttributes<modeltype>> {
    static associate(models: any) {
    }
}