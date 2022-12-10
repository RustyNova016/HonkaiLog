import {
	Model, Table, Column, DataType, Index, Sequelize, ForeignKey 
} from "sequelize-typescript";

export interface accountAttributes {
    id: string;
    type: string;
    provider: string;
    provider_account_id: string;
    refresh_token?: string;
    access_token?: string;
    expires_at?: number;
    token_type?: string;
    scope?: string;
    id_token?: string;
    session_state?: string;
    user_id?: string;
}

@Table({
	tableName: "account",
	timestamps: false 
})
export class account extends Model<accountAttributes, accountAttributes> implements accountAttributes {

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
    	type: DataType.STRING(255) 
    })
    	type!: string;

    @Column({
    	type: DataType.STRING(255) 
    })
    	provider!: string;

    @Column({
    	type: DataType.STRING(255) 
    })
    	provider_account_id!: string;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(255) 
    })
    	refresh_token?: string;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(255) 
    })
    	access_token?: string;

    @Column({
    	allowNull: true,
    	type: DataType.INTEGER 
    })
    	expires_at?: number;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(255) 
    })
    	token_type?: string;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(255) 
    })
    	scope?: string;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(255) 
    })
    	id_token?: string;

    @Column({
    	allowNull: true,
    	type: DataType.STRING(255) 
    })
    	session_state?: string;

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