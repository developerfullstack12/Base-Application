module.exports = (sequelize, Sequelize) => {
     const SubCenter = sequelize.define("SubCenter", {
          work_sub_center_type: {
               type: Sequelize.STRING
          },
          work_center: {
               type: Sequelize.INTEGER
          }

     });

     return SubCenter;
};