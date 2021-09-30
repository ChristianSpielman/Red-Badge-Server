module.exports = (sequelize, DataTypes) => {
    const Planning = sequelize.define('planning', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        itinerary : {
            type: DataTypes.STRING,
            allowNull: true,
        },
        toDo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        description: {
            type: DataTypes.STRING(2000),
            allowNull: true,
        }
    })
    return Planning;
}