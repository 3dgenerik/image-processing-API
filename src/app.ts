import express from 'express';
import { RouterSingleton } from './RouterSingleton';

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(RouterSingleton.getInstance())

app.listen(PORT, ()=>{
    console.log(`...listening port ${PORT}`);
})