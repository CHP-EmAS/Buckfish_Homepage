import express,  { Router, Request, Response} from "express";
import path from "path";

const routes = Router();

routes.use('/css', express.static('static/css'));
routes.use('/fonts', express.static('static/fonts'));
routes.use('/js', express.static('static/js'));
routes.use('/img', express.static('static/img'));
routes.use('/languages', express.static('static/languages'));

routes.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + '/../../static/html/homepage.html'));
});

routes.get("/files/TWLA-Installer.exe", function(req, res) {
    res.sendFile(path.join(__dirname + '/../../static/files/TWLA-Installer.exe'));
});

routes.use("*", function(request: Request, response: Response) {
    response.status(404).sendFile(path.join(__dirname + '/../../static/html/404.html'));
});

export default routes;