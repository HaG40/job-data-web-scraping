package main

import (
	"job-scraping-project/database"
	"job-scraping-project/router"
	"net/http"
)

func main() {
	database.Connect()
	router.SetUpRoutes()
	http.ListenAndServe(":8888", nil)
}
