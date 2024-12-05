module.exports = (sequelize, Sequelize) => {
    const user = sequelize.define("user", {
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING(100),
        unique: {
          args: true,
          msg: 'User already exists with the same email ID',
        },
      },
      password: {
        type: Sequelize.STRING(100)
      },
      dob: {
        type: Sequelize.DATEONLY, // Storing only the date (YYYY-MM-DD)
        allowNull: false, // Making this field required
        validate: {
          isDate: true, // Ensures the value is a valid date
          notEmpty: {
            msg: 'Date of birth cannot be empty',
          },
        }
      }
    });

    return user;
};
