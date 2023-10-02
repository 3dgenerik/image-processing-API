import express from 'express';
import { RouterSingleton } from './RouterSingleton';
import { constants } from './constants';
import { errorHandler } from './controllers/utils/middlewares/errorMiddleware';
import './controllers/RootController'
import './controllers/ImagesController'

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(constants.publicPath));
app.use(RouterSingleton.getInstance())
app.use(errorHandler)

app.listen(PORT, ()=>{
    console.log(`...listening port ${PORT}`);
})

export default app;