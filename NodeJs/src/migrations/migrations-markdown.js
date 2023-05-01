'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // statusId: DataTypes.STRING,
    //   doctorId: DataTypes.INTEGER,
    //   patientId: DataTypes.INTEGER,
    //   date: DataTypes.DATE,
    //   timeType: DataTypes.STRING,
    await queryInterface.createTable('markdowns', {
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
      allowNull: true,

        type: Sequelize.TEXT('long'),
      },
      contentMarkDown: {
        allowNull: true,

        type: Sequelize.TEXT('long'),
      },
      description: {
        allowNull: true,

        type: Sequelize.TEXT('long'),
      },
      doctorId: {
        allowNull: true,

        type: Sequelize.INTEGER,
      },
      specialtyId: {
        allowNull: true,

        type: Sequelize.INTEGER,
      },
      clinicId: {
        allowNull: true,

        type: Sequelize.INTEGER,
      },

      createdAt: {
          allowNull: true,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('markdowns')
  },
}
