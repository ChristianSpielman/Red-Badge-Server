module.exports = (sequelize, DataTypes) => {
	const Vacation = sequelize.define("vacation", {
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
		description: {
			type: DataTypes.STRING(2000),
			allowNull: true,
		},
	});
	
	return Vacation;
}