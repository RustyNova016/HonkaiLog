import {
	Model, Table, Column, DataType, Index, Sequelize, ForeignKey, BelongsTo 
} from "sequelize-typescript";
import { material } from "./material";
import { user } from "./user";

export interface material_logsAttributes {
    id?: number;
    quantity: number;
    log_date: Date;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    materialId: number;
}

@Table({
	tableName: "material_logs",
	timestamps: false 
})
export class material_logs extends Model<material_logsAttributes, material_logsAttributes> implements material_logsAttributes {

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
    	type: DataType.INTEGER 
    })
    	quantity!: number;

    @Column({
    	type: DataType.DATE 
    })
    	log_date!: Date;

    @Column({
    	type: DataType.DATE 
    })
    	createdAt!: Date;

    @Column({
    	type: DataType.DATE 
    })
    	updatedAt!: Date;

    @ForeignKey(() => user)
    @Column({
    	type: DataType.CHAR(36) 
    })
    @Index({
    	name: "material_logs_ibfk_2",
    	using: "BTREE",
    	order: "ASC",
    	unique: false 
    })
    	userId!: string;

    @ForeignKey(() => material)
    @Column({
    	type: DataType.INTEGER 
    })
    @Index({
    	name: "material_logs_ibfk_10",
    	using: "BTREE",
    	order: "ASC",
    	unique: false 
    })
    	materialId!: number;

    @BelongsTo(() => material)
    	material?: material;

    @BelongsTo(() => user)
    	user?: user;

}