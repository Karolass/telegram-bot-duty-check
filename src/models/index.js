import Sequelize from 'sequelize'

export const sequelize = new Sequelize('database', 'username', 'password', {
  dialect: 'sqlite',
  storage: 'db.sqlite',
})

export const BaseModel = {
  isValid: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
}

// test connection
export const testDBConnection = async seql => {
  try {
    await seql.authenticate()
    console.log('Database connection has been established successfully.')
  } catch (err) {
    console.error('Unable to connect to the database:', err)
  }
}
