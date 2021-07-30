module.exports = (sequelize, Sequelize) => {
     const ReasonCode = sequelize.define("ReasonCode", {
          reason_code: {
               type: Sequelize.STRING
          },
          found_count: {
               type: Sequelize.INTEGER
          },
          not_found_count: {
               type: Sequelize.INTEGER
          }

     });

     return ReasonCode;
};