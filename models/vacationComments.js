module.exports = (sequelize, DataTypes) => {
    const VacationComments = sequelize.define("vacationComments", {
        user: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        comment: {
            type: DataTypes.STRING(2000),
            allowNull: false,
        }
    })
    return VacationComments;
}