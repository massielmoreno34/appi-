import app from './app.js'



app.listen(app.get('port'))


console.log ('server on port 4000', app.get('port'))
