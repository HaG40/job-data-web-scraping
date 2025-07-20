package router

import (
	"job-scraping-project/controller"
	"job-scraping-project/middleware"
	"net/http"
)

func SetUpRoutes() {
	jobsController := http.HandlerFunc(controller.JobsHandler)
	http.Handle("/api/jobs", middleware.JobMiddleware(jobsController))
}
