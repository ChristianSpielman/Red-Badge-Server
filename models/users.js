module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("users", {
      email: {
        type: DataTypes.STRING,
        required: true,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      admin: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      }
    });
    return Users;
}