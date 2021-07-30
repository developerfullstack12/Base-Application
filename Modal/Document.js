module.exports = (sequelize, Sequelize) => {
     const Document = sequelize.define("Document", {
          reason_code: {
               type: Sequelize.INTEGER,
          },
          name: {
               type: Sequelize.STRING
          },
          tags: {
               type: Sequelize.STRING
          },
          catalog_dimension: {
               type: Sequelize.STRING
          },
          status: {
               type: Sequelize.BOOLEAN,
               defaultValue: 1
          },
          url: {
               type: Sequelize.STRING
          }

     });

     return Document;
};