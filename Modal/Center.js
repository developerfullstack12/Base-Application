module.exports = (sequelize, Sequelize) => {
    const Center = sequelize.define("Center", {
          work_center_type: {
              type: Sequelize.STRING
         }
       
    });

    return Center;
};