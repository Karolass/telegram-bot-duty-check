import app from './app'
import { sequelize, testDBConnection } from './models'

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server start on port ${process.env.PORT || 3000}...`)
  testDBConnection(sequelize)
})
