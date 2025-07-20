package main

import (
	"job-scraping-project/router"
	"net/http"
)

func main() {
	router.SetUpRoutes()
	http.ListenAndServe(":8888", nil)
}
