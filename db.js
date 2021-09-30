const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL,{
    dialect: 'postgres'
})

sequelize.authenticate().then(
    function(){
        console.log("connected to the Red-Badge database");
    },
    function(err){
        console.log(err);
    }
)

Users = sequelize.import('./models/users')
Vacation = sequelize.import('./models/vacation')
Planning = sequelize.import('./models/planning')
VacationComment = sequelize.import('./models/vacationComments')

Users.hasMany(Vacation);
Vacation.belongsTo(Users);

Vacation.hasMany(VacationComment);
VacationComment.belongsTo(Vacation);

Users.hasMany(Planning);
Planning.belongsTo(Users);


module.exports = sequelize;