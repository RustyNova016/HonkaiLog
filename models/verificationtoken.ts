import {
	Model, Table, Column, DataType, Index, Sequelize, ForeignKey 
} from "sequelize-typescript";

export interface verificationtokenAttributes {
    token: string;
    identifier: string;
    expires: Date;
}

@Table({
	tableName: "verificationtoken",
	timestamps: false 
})
export class verificationtoken extends Model<verificationtokenAttributes, verificationtokenAttributes> implements verificationtokenAttributes {

    @Column({
    	primaryKey: true,
    	type: DataType.STRING(255) 
    })
    @Index({
    	name: "PRIMARY",
    	using: "BTREE",
    	order: "ASC",
    	unique: true 
    })
    	token!: string;

    @Column({
    	type: DataType.STRING(255) 
    })
    	identifier!: string;

    @Column({
    	type: DataType.DATE 
    })
    	expires!: Date;

}