package router

import (
	"job-scraping-project/controller"
	"job-scraping-project/middleware"
	"net/http"
)

func SetUpRoutes() {
	// Job Search Route
	http.Handle("/api/jobs", middleware.JobsMiddleware(http.HandlerFunc(controller.JobsHandler)))
	http.Handle("/api/jobs/favorite/add", middleware.JobsMiddleware(http.HandlerFunc(controller.AddFavoriteJobHandler)))
	http.Handle("/api/jobs/favorite/delete", middleware.JobsMiddleware(http.HandlerFunc(controller.DeleteFavoriteJobHandler)))
	http.Handle("/api/jobs/favorite", middleware.JobsMiddleware(http.HandlerFunc(controller.GetFavoriteJobsHandler)))
	http.Handle("/api/jobs/favorite/check", middleware.JobsMiddleware(http.HandlerFunc(controller.CheckFavoriteJobHandler)))

	// Job Post Route
	http.Handle("/api/jobs/post/find", middleware.JobsMiddleware(http.HandlerFunc(controller.PostFindJob)))
	http.Handle("/api/jobs/post/hire", middleware.JobsMiddleware(http.HandlerFunc(controller.PostHireJob)))
	http.Handle("/api/jobs/get/find", middleware.JobsMiddleware(http.HandlerFunc(controller.GetFindJob)))
	http.Handle("/api/jobs/get/hire", middleware.JobsMiddleware(http.HandlerFunc(controller.GetHireJob)))
	// Authentication Routes
	http.HandleFunc("/api/register", controller.Register)
	http.HandleFunc("/api/login", controller.Login)
	http.Handle("/api/protected", middleware.AuthMiddleware(http.HandlerFunc(controller.ProtectedHandler)))
	http.Handle("/api/user", middleware.AuthMiddleware(http.HandlerFunc(controller.User)))
	http.Handle("/api/user/edit", middleware.AuthMiddleware(http.HandlerFunc(controller.EditUser)))
	http.Handle("/api/logout", middleware.AuthMiddleware(http.HandlerFunc(controller.Logout)))

}
