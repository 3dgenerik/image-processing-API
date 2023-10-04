import {  Request, Response } from "express";
import { controller, get} from "./decorators";

@controller('/')
class RootController{
    @get('/')
    getRoot(req: Request, res: Response){
        const example = "/api/images?filename=fjord&width=200&height=200"
        res.send(`
        <p>Please go to <a href="/api/images">/api/images</a> and use correct filename with correct width and height.</p><br>
        <div>
            <h4>Example: </h4>
            <a href = ${example}>${example}</a>
        </div>
        `)
    }
}