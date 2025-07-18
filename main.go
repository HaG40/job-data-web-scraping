package main

import (
	"job-scraping-project/controller"
	"job-scraping-project/scrapers"
)

func main() {
	jobCards := scrapers.ScrapingJobFinFin("Software engineer")

	controller.HandlerInit(jobCards)
	// controller.MiddlewareHandler()

	// http.HandleFunc("/api/jobs/", controller.JobsHandler)
	// http.ListenAndServe(":8888", nil)
}
