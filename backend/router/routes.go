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
	http.HandleFunc("/api/register", controller.Register)
	http.HandleFunc("/api/login", controller.Login)
	http.Handle("/api/protected", middleware.AuthMiddleware(http.HandlerFunc(controller.ProtectedHandler)))
	http.Handle("/api/user", middleware.AuthMiddleware(http.HandlerFunc(controller.User)))
	http.Handle("/api/logout", middleware.AuthMiddleware(http.HandlerFunc(controller.Logout)))

}
