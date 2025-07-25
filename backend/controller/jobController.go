package controller

import (
	"encoding/json"
	"job-scraping-project/scrapers"
	"log"
	"math/rand"
	"net/http"
	"strconv"
	"time"
)

func contains(slice []string, value string) bool {
	for _, v := range slice {
		if v == value {
			return true
		}
	}
	return false
}

func shuffle(data []scrapers.JobCard) {
	randomizer := rand.New(rand.NewSource(time.Now().UnixNano()))
	randomizer.Shuffle(len(data), func(i, j int) {
		data[i], data[j] = data[j], data[i]
	})
}

func JobsHandler(w http.ResponseWriter, r *http.Request) {
	// GET method
	if r.Method == http.MethodGet {

		// check error
		w.Header().Set("Content-type", "application/json")

		keyword := r.URL.Query().Get("keyword")
		pageStr := r.URL.Query().Get("page")
		source := r.URL.Query()["source"]
		bkkOnly := r.URL.Query().Get("bkk")
		if pageStr == "" {
			pageStr = "1"
		}
		page, err := strconv.Atoi(pageStr)
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		bkkOnlyBool, err := strconv.ParseBool(bkkOnly)
		if err != nil {
			bkkOnlyBool = false
		}

		var jobbkkData, jobthaiData, jobthData []scrapers.JobCard
		var scrapeErr int

		scraperFuncs := []func(string, int, bool) ([]scrapers.JobCard, error){
			scrapers.ScrapingJobbkk,
			scrapers.ScrapingJobthai,
			scrapers.ScrapingJobTH,
		}

		var jobs []scrapers.JobCard
		for i, scrape := range scraperFuncs {
			jobs = nil
			jobs, err = scrape(keyword, page, bkkOnlyBool)
			if err != nil {
				log.Printf("Error scraping source #%d: %v", i+1, err)
				scrapeErr++
				continue
			}

			if i == 0 {
				jobbkkData = append(jobbkkData, jobs...)
			}
			if i == 1 {
				jobthaiData = append(jobthaiData, jobs...)
			}
			if i == 2 {
				jobthData = append(jobthData, jobs...)
			}
		}

		if scrapeErr >= len(scraperFuncs) {
			w.WriteHeader(http.StatusNotFound)
		}

		// collect data
		var data []scrapers.JobCard
		if contains(source, "all") {
			data = append(data, jobbkkData...)
			data = append(data, jobthaiData...)
			data = append(data, jobthData...)
			shuffle(data)
		}
		if contains(source, "jobbkk") {
			data = append(data, jobbkkData...)
		}
		if contains(source, "jobthai") {
			data = append(data, jobthaiData...)
		}
		if contains(source, "jobth") {
			data = append(data, jobthData...)
		}

		// convert to json
		if len(data) == 0 {
			w.Write([]byte("No data available"))
			w.WriteHeader(http.StatusNoContent)
			return
		} else {
			json.NewEncoder(w).Encode(data)
			w.WriteHeader(http.StatusOK)
			return
		}

	}
}
