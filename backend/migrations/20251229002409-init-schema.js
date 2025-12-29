'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true
      },
      firstName: Sequelize.STRING,
      lastName: Sequelize.STRING,
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      passwordHash: Sequelize.STRING,
      role: Sequelize.STRING,
      avatarUrl: Sequelize.STRING,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });

    await queryInterface.createTable('Categories', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true
      },
      name: Sequelize.STRING,
      color: Sequelize.STRING,
      icon: Sequelize.STRING,
      isActive: Sequelize.BOOLEAN,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });

    await queryInterface.createTable('Incidents', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true
      },
      userId: Sequelize.UUID,
      categoryId: Sequelize.UUID,
      title: Sequelize.STRING,
      description: Sequelize.TEXT,
      latitude: Sequelize.FLOAT,
      longitude: Sequelize.FLOAT,
      address: Sequelize.STRING,
      incidentDate: Sequelize.DATE,
      severity: Sequelize.STRING,
      status: Sequelize.STRING,
      validatedBy: Sequelize.UUID,
      validatedAt: Sequelize.DATE,
      rejectionReason: Sequelize.STRING,
      viewCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Incidents');
    await queryInterface.dropTable('Categories');
    await queryInterface.dropTable('Users');
  }
};
