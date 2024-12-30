module.exports = (sequelize, DataTypes) => {
    const transHistory = sequelize.define( "transaction_history", {
        invoice_number: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        transaction_type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        total_amount: {
            type: DataTypes.STRING,
            allowNull: false
        },
        created_on: {
            type: DataTypes.STRING,
            allowNull: false
        }
    } )
    return transHistory
    
 }