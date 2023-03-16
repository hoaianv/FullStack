'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // statusId: DataTypes.STRING,
    //   doctorId: DataTypes.INTEGER,
    //   patientId: DataTypes.INTEGER,
    //   date: DataTypes.DATE,
    //   timeType: DataTypes.STRING,
    await queryInterface.createTable('histories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      patienId: {
        type: Sequelize.INTEGER,
      },
      doctorId: {
        type: Sequelize.INTEGER,
      },
      discription: {
        type: Sequelize.TEXT,
      },
      files: {
        type: Sequelize.TEXT,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('histories')
  },
}
