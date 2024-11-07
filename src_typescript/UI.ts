import express, {Application, Request, Response, NextFunction} from "express";
import helmet from "helmet"
import * as bodyParser from "body-parser";

import routes from "./routes/routes";

import LogginHandler from "./middlewares/loggingHandler"

class UI {
  public ui: Application;

  constructor() {
    this.ui = express(); 
    this.config();

    //Root
    this.ui.use("/", routes);
  }

  private config(): void {
  
    //helmet secure
    this.ui.use(helmet())

    //bodyParser
    this.ui.use(bodyParser.urlencoded({ extended: false }));
    this.ui.use(bodyParser.json());

    //loggin incoming requests
    if( Boolean(process.env.CONSOLE_LOG_REQUESTS) ) {
      this.ui.use("*", LogginHandler.requestLogging);
    } else {
      console.info("Request logging off")
    }

    //Static Files
    this.ui.use("/favicon.ico", express.static("static/images/favicon.ico"));
  }
};

export default new UI().ui;