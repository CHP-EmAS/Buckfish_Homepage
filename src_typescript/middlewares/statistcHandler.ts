import { readFileSync, writeFileSync } from 'fs';


class StatisticHandler {

    private static hompage_visits : number = 0;
    private static twla_downloads : number = 0;
    private static error_page_visits : number = 0;

    public static initStatistics() {
        console.log("Loading Statistics...");

        let file: string;

        try {
            file = readFileSync("./statistics.txt", "utf8");
        } catch {
            console.log("Error while reading statistics.txt!");
            return;
        }

        const statistics = JSON.parse(file);

        if(statistics.hp_visits)
            this.hompage_visits = statistics.hp_visits;

        if(statistics.twla_downloads)
            this.twla_downloads = statistics.twla_downloads;

        if(statistics.error_pg_visits)
            this.error_page_visits = statistics.error_pg_visits;

        console.log("Hompage Visits   : " + this.hompage_visits);
        console.log("TWLA Downloads   : " + this.twla_downloads);
        console.log("Error Page Visits: " + this.error_page_visits);

    }


    public static addHomepageVisit() {
        StatisticHandler.hompage_visits += 1;
        
        this.writeToFile();
    }

    public static addTWLADownlaod() {
        StatisticHandler.twla_downloads += 1;
        
        this.writeToFile();
    }

    public static add404Visit() {
        StatisticHandler.error_page_visits += 1;
        
        this.writeToFile();
    }

    private static writeToFile() {
        writeFileSync("./statistics.txt", JSON.stringify({hp_visits: this.hompage_visits, twla_downloads: this.twla_downloads, error_pg_visits: this.error_page_visits}));
    }

}

export default StatisticHandler;