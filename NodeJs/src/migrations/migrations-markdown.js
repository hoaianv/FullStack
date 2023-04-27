'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // statusId: DataTypes.STRING,
    //   doctorId: DataTypes.INTEGER,
    //   patientId: DataTypes.INTEGER,
    //   date: DataTypes.DATE,
    //   timeType: DataTypes.STRING,
    await queryInterface.createTable('MarkDown', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
       //   contentHTML: DataTypes.TEXT('LONG'),
    //   contentMarkDown: DataTypes.TEXT('LONG'),
    //   discription: DataTypes.TEXT('LONG '),
    //   doctorId: DataTypes.INTEGER,
    //   specialtyId: DataTypes.INTEGER,
    //   clinicId: DataTypes.INTEGER
    contentHTML: {
        type: Sequelize.TEXT('long'),
      },
      contentMarkDown: {
        type: Sequelize.TEXT('long'),
      },
      discription: {
        type: Sequelize.TEXT('long'),
      },
      doctorId: {
        type: Sequelize.INTEGER,
      },
      specialtyId: {
        type: Sequelize.INTEGER,
      },
      clinicId: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('MarkDown')
  },
}
