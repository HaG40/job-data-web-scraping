package scrapers

import (
	"strconv"
	"strings"

	"github.com/gocolly/colly"
)

type JobCard struct {
	Title    string `json:"title"`
	Company  string `json:"company"`
	Location string `json:"location"`
	Salary   string `json:"salary"`
	URL      string `json:"url"`
	Source   string `json:"source"`
}

var jobbkkCards []JobCard

func getJobUrl(url string) string {
	segments := strings.Split(url, "/")
	if len(segments) < 2 {
		return ""
	}
	s := strings.Join(segments[len(segments)-6:], "/")
	s = s[:len(s)-1]
	return s
}

func ScrapingJobbkk(keywrd string, page int) []JobCard {

	if jobbkkCards != nil {
		jobbkkCards = nil
	}

	keywrd = strings.Join((strings.Split(strings.TrimSpace(keywrd), " ")), "+")
	pageStr := strconv.Itoa(page)

	var scrapeURL string
	if keywrd == "" {
		scrapeURL = "https://www.jobbkk.com/jobs/lists/" + pageStr + "/หางาน"
	} else {
		scrapeURL = "https://www.jobbkk.com/jobs/lists/" + pageStr + "/หางาน," + keywrd
	}

	c := colly.NewCollector(colly.AllowedDomains("www.jobbkk.com", "jobbkk.com"))

	c.OnHTML("div.joblist-detail-device", func(h *colly.HTMLElement) {
		selection := h.DOM
		var tmpCard JobCard
		tmpCard.Title = strings.TrimSpace(selection.Find("div.joblist-ur-com-name div.joblist-name-urgent").Text())
		tmpCard.Company = strings.TrimSpace(selection.Find("div.joblist-ur-com-name div.joblist-company-name").Text())
		tmpCard.Location = strings.TrimSpace(selection.Find("div.joblist-loc-sal div.position-location").Text())
		tmpCard.Salary = strings.TrimSpace(selection.Find("div.joblist-loc-sal div.position-salary").Text())

		scrapedAttribute := h.Attr("onclick")
		tmpCard.URL = "https:/" + getJobUrl(scrapedAttribute)
		tmpCard.Source = "jobbkk.com"

		// fmt.Println(tmpCard.Title + "\n" + tmpCard.Company + "\n" + tmpCard.Location + "\n" + tmpCard.Salary + "\n" + tmpCard.URL + "\n" + tmpCard.Source + "\n")

		jobbkkCards = append(jobbkkCards, tmpCard)
	})

	c.Visit(scrapeURL)

	return jobbkkCards
}
