import express,  { Router, Request, Response} from "express";
import path from "path";
import StatisticHandler from "../middlewares/statistcHandler";

const routes = Router();

routes.use('/css', express.static('static/css'));
routes.use('/fonts', express.static('static/fonts'));
routes.use('/js', express.static('static/js'));
routes.use('/img', express.static('static/img'));

routes.get("/", function(req, res) {
    StatisticHandler.addHomepageVisit();
    res.sendFile(path.join(__dirname + '/../../static/html/homepage.html'));
});

routes.get("/files/TWLA-Installer.exe", function(req, res) {
    StatisticHandler.addTWLADownlaod();
    res.sendFile(path.join(__dirname + '/../../static/files/TWLA-Installer.exe'));
});

routes.use("*", function(request: Request, response: Response) {
    StatisticHandler.add404Visit();
    response.status(404).sendFile(path.join(__dirname + '/../../static/html/404.html'));
});

export default routes;