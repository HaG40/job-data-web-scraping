package router

import (
	"job-scraping-project/controller"
	"net/http"
)

func setUpRoutes() {
	http.HandleFunc("/api/jobs", controller.JobsHandler)
}
