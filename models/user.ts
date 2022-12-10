import {
	Model, Table, Column, DataType, Index, Sequelize, ForeignKey, HasMany 
} from "sequelize-typescript";
import { material_logs } from "./material_logs";

export interface userAttributes {
    id: string;
    name?: string;
    email?: string;
    emailVerified?: Date;
    image?: string;
    createdAt: Date;
    updatedAt: Date;
}

@Table({
	tableName: "user",
	timestamps: false 
})
export class user extends Model<userAttributes, userAttributes> implements userAttributes {

    @Column({
    	primaryKey: true,
    	type: DataType.CHAR(36) 
    })
    @Index({
    	name: "PRIMARY",
    	using: "BTREE",
    	order: "ASC",
    	unique: true 
    })
    	id!: string;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(255) 
    })
    	name?: string;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(255) 
    })
    @Index({
    	name: "email",
    	using: "BTREE",
    	order: "ASC",
    	unique: true 
    })
    	email?: string;

    @Column({
    	allowNull: true,
    	type: DataType.DATE 
    })
    	emailVerified?: Date;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(255) 
    })
    	image?: string;

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