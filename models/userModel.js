module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define( "users", {
        email: {
            type: DataTypes.STRING,
            unique: true,
            isEmail: true, //checks for email format
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        registered_at: {
            type: DataTypes.STRING,
            allowNull: false
        }
    } )
    return User
    
 }