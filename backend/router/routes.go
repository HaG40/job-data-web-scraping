package router

import (
	"job-scraping-project/controller"
	"job-scraping-project/middleware"
	"net/http"
)

func SetUpRoutes() {
	// Job Search Route
	http.Handle("/api/jobs", middleware.JobSearchMiddleware(http.HandlerFunc(controller.JobsHandler)))
	http.Handle("/api/jobs/favorite/add", middleware.JobSearchMiddleware(http.HandlerFunc(controller.AddFavoriteJobHandler)))
	http.Handle("/api/jobs/favorite/delete", middleware.JobSearchMiddleware(http.HandlerFunc(controller.DeleteFavoriteJobHandler)))
	http.Handle("/api/jobs/favorite", middleware.JobSearchMiddleware(http.HandlerFunc(controller.GetFavoriteJobsHandler)))
	http.Handle("/api/jobs/favorite/check", middleware.JobSearchMiddleware(http.HandlerFunc(controller.CheckFavoriteJobHandler)))

	// Authentication Routes
	http.HandleFunc("/api/register", controller.Register)
	http.HandleFunc("/api/login", controller.Login)
	http.Handle("/api/protected", middleware.AuthMiddleware(http.HandlerFunc(controller.ProtectedHandler)))
	http.Handle("/api/user", middleware.AuthMiddleware(http.HandlerFunc(controller.User)))
	http.Handle("/api/user/edit", middleware.AuthMiddleware(http.HandlerFunc(controller.EditUser)))
	http.Handle("/api/logout", middleware.AuthMiddleware(http.HandlerFunc(controller.Logout)))

}
