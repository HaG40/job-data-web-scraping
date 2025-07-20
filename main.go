package main

import (
	"job-scraping-project/controller"
	"job-scraping-project/scrapers"
)

func main() {
	jobCards := scrapers.ScrapingJobbkk("Software engineer")

	controller.HandlerInit(jobCards)
	// controller.MiddlewareHandler()

	// http.HandleFunc("/api/jobs", controller.JobsHandler)
	// http.HandleFunc("/api/jobs/", controller.JobsKeywrdHandler)
	// http.ListenAndServe(":8888", nil)
}
