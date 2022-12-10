import {
	Model, Table, Column, DataType, Index, Sequelize, ForeignKey 
} from "sequelize-typescript";

export interface sessionAttributes {
    id: string;
    expires: Date;
    session_token: string;
    user_id?: string;
}

@Table({
	tableName: "session",
	timestamps: false 
})
export class session extends Model<sessionAttributes, sessionAttributes> implements sessionAttributes {

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
    	type: DataType.DATE 
    })
    	expires!: Date;

    @Column({
    	type: DataType.STRING(255) 
    })
    @Index({
    	name: "sessionToken",
    	using: "BTREE",
    	order: "ASC",
    	unique: true 
    })
    	session_token!: string;

    @Column({
    	allowNull: true,
    	type: DataType.CHAR(36) 
    })
    @Index({
    	name: "user_id",
    	using: "BTREE",
    	order: "ASC",
    	unique: false 
    })
    	user_id?: string;

}