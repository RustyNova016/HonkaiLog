import {
	Model, Table, Column, DataType, Index, Sequelize, ForeignKey, HasMany, Scopes
} from "sequelize-typescript";
import { material_logs } from "./material_logs";

@Scopes(() => ({
  movies: {
    include: [
      {
        model: Movie,
        through: {attributes: []},
      },
    ],
  },
}))

export interface materialAttributes {
    id?: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

@Table({
	tableName: "material",
	timestamps: false 
})
export class material extends Model<materialAttributes, materialAttributes> implements materialAttributes {

    @Column({
    	primaryKey: true,
    	autoIncrement: true,
    	type: DataType.INTEGER 
    })
    @Index({
    	name: "PRIMARY",
    	using: "BTREE",
    	order: "ASC",
    	unique: true 
    })
    	id?: number;

    @Column({
    	type: DataType.STRING(255) 
    })
    	name!: string;

    @Column({
    	type: DataType.DATE 
    })
    	createdAt!: Date;

    @Column({
    	type: DataType.DATE 
    })
    	updatedAt!: Date;

    @HasMany(() => material_logs, {
    	sourceKey: "id" 
    })
    	material_logs?: material_logs[];

}