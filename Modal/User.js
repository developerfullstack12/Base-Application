module.exports = (sequelize, Sequelize) => {
     const User = sequelize.define("User", {
          name: {
               type: Sequelize.STRING
          },
          email: {
               type: Sequelize.STRING
          },
          password: {
               type: Sequelize.STRING
          },
          status: {
               type: Sequelize.BOOLEAN,
               defaultValue: 1
          },
          contact:{
               type: Sequelize.STRING 
          },
          role: {
               type: Sequelize.INTEGER,
               defaultValue:0
          },
          profile: {
               type: Sequelize.STRING
          }
        
     });

     return User;
};