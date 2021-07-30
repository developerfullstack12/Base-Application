module.exports = (sequelize, Sequelize) => {
     const Issue = sequelize.define("Issue", {
          work_center_type: {
               type: Sequelize.INTEGER
          },
          work_sub_center_type: {
               type: Sequelize.INTEGER
          },
          stop_reason_code: {
               type: Sequelize.INTEGER
          },
          stoppage_start_time: {
               type: Sequelize.DATE,
          },
          stoppage_end_time: {
               type: Sequelize.DATE
          },
          isRejected: {
               type: Sequelize.BOOLEAN
          },
          feedback: {
               type: Sequelize.STRING
          }

     });

     return Issue;
};