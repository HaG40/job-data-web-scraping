package main

import (
	"job-scraping-project/controller"
	"net/http"
)

func main() {
	http.HandleFunc("/api/jobs", controller.JobsHandler)
	http.ListenAndServe(":8888", nil)
}
