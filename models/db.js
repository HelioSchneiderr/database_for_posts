const Sequelize = require(`sequelize`);

//Server conection
const sequelize = new Sequelize(`postapp`, `root`, `Luffy2781`, {
    host: "localhost",
    dialect: `mysql`,
    query:{raw:true}
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize,
}