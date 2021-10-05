module.exports = (sequelize, DataTypes) => {
    const Planning = sequelize.define('planning', {
        photo: {
			type: DataTypes.STRING,
			allowNull: true,
		},
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        toDo: {
            type: DataTypes.STRING(2000),
            allowNull: true,
        },
    });
    
    return Planning;
}