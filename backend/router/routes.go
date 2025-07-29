package router

import (
	"job-scraping-project/controller"
	"job-scraping-project/middleware"
	"net/http"
)

func SetUpRoutes() {
	// Job Search Route
	jobsController := http.HandlerFunc(controller.JobsHandler)
	http.Handle("/api/jobs", middleware.JobMiddleware(jobsController))

	// Authentication Routes
	http.HandleFunc("/auth/register", controller.Register)
	http.HandleFunc("/auth/login", controller.Login)
	http.Handle("/auth/protected", middleware.AuthMiddleware(http.HandlerFunc(controller.ProtectedHandler)))
	http.Handle("/auth/user", middleware.AuthMiddleware(http.HandlerFunc(controller.User)))

}
