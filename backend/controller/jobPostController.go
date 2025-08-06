package controller

import (
	"encoding/json"
	"errors"
	"job-scraping-project/database"
	"job-scraping-project/models"
	"net/http"

	"gorm.io/gorm"
)

func PostFindJob(w http.ResponseWriter, r *http.Request) {

	if DB == nil {
		db := database.Connect()
		DB = db
	}

	if r.Method == http.MethodPost {
		var PostFindJob models.FindPost
		if err := json.NewDecoder(r.Body).Decode(&PostFindJob); err != nil {
			http.Error(w, "Invalid JSON: "+err.Error(), http.StatusBadRequest)
			return
		}

		if PostFindJob.Title == "" || PostFindJob.Description == "" || PostFindJob.Type == "" {
			http.Error(w, "โปรดกรอกข้อมูลที่จำเป็นให้ครบถ้วน", http.StatusBadRequest)
			return
		}

		if PostFindJob.Contact.Email == "" && PostFindJob.Contact.Tel == "" && PostFindJob.Contact.Line == "" && PostFindJob.Contact.Instagram == "" && PostFindJob.Contact.FaceBook == "" && PostFindJob.Contact.LinkedIn == "" {
			http.Error(w, "โปรดกรอกข้อมูลติดต่ออย่างน้อย 1 ชนิด", http.StatusBadRequest)
			return
		}

		getUserId := DB.Where("Id = ?", PostFindJob.PostedByID).First(&PostFindJob.PostedBy)
		if getUserId.Error != nil {
			if errors.Is(getUserId.Error, gorm.ErrRecordNotFound) {
				http.Error(w, "ไม่พบชื่อผู้ใช้", http.StatusNotFound)
				return
			} else {
				http.Error(w, "เกิดข้อผิดพลาด", http.StatusInternalServerError)
				return
			}
		}

		if PostFindJob.PostedByID == 0 {
			http.Error(w, "ไม่พบบัญชีผู้ใข้", http.StatusBadRequest)
			return
		}

		if err := DB.Create(&PostFindJob).Error; err != nil {
			http.Error(w, "Database error: "+err.Error(), http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(PostFindJob)
		w.WriteHeader(http.StatusOK)

	} else {
		http.Error(w, "Only POST allowed", http.StatusMethodNotAllowed)
		return
	}
}

func PostHireJob(w http.ResponseWriter, r *http.Request) {
	if DB == nil {
		db := database.Connect()
		DB = db
	}

	if r.Method == http.MethodPost {
		var PostHireJob models.HirePost
		if err := json.NewDecoder(r.Body).Decode(&PostHireJob); err != nil {
			http.Error(w, "Invalid JSON: "+err.Error(), http.StatusBadRequest)
			return
		}
		if PostHireJob.Title == "" || PostHireJob.Description == "" || PostHireJob.Type == "" {
			http.Error(w, "โปรดกรอกข้อมูลที่จำเป็นให้ครบถ้วน", http.StatusBadRequest)
			return
		}

		if PostHireJob.Type != "find" && PostHireJob.Type != "hire" {
			http.Error(w, "ประเภทของโพสต์ไม่ถูกต้อง", http.StatusBadRequest)
		}

		if PostHireJob.Contact.Email == "" && PostHireJob.Contact.Tel == "" && PostHireJob.Contact.Line == "" && PostHireJob.Contact.Instagram == "" && PostHireJob.Contact.FaceBook == "" && PostHireJob.Contact.LinkedIn == "" {
			http.Error(w, "โปรดกรอกข้อมูลติดต่ออย่างน้อย 1 ชนิด", http.StatusBadRequest)
			return
		}

		getUserId := DB.Where("Id = ?", PostHireJob.PostedByID).First(&PostHireJob.PostedBy)
		if getUserId.Error != nil {
			if errors.Is(getUserId.Error, gorm.ErrRecordNotFound) {
				http.Error(w, "ไม่พบชื่อผู้ใช้", http.StatusNotFound)
				return
			} else {
				http.Error(w, "เกิดข้อผิดพลาด", http.StatusInternalServerError)
				return
			}
		}

		if PostHireJob.PostedByID == 0 {
			http.Error(w, "ไม่พบบัญชีผู้ใข้", http.StatusBadRequest)
			return
		}

		if err := DB.Create(&PostHireJob).Error; err != nil {
			http.Error(w, "Database error: "+err.Error(), http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(PostHireJob)
		w.WriteHeader(http.StatusOK)
	} else {
		http.Error(w, "Only POST allowed", http.StatusMethodNotAllowed)
		return
	}
}

func GetFindJob(w http.ResponseWriter, r *http.Request) {
	if DB == nil {
		db := database.Connect()
		DB = db
	}

	if r.Method == http.MethodGet {
		var findPosts []models.FindPost

		err := DB.Preload("PostedBy").Find(&findPosts).Error
		if err != nil {
			http.Error(w, "Database error", http.StatusInternalServerError)
			return
		}

		if len(findPosts) == 0 {
			http.Error(w, "ไม่พบโพสต์", http.StatusNotFound)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(findPosts)
		return

	} else {
		http.Error(w, "Only GET allowed", http.StatusMethodNotAllowed)
		return
	}
}

func GetHireJob(w http.ResponseWriter, r *http.Request) {
	if DB == nil {
		db := database.Connect()
		DB = db
	}

	if r.Method == http.MethodGet {
		var hirePosts []models.HirePost

		err := DB.Preload("PostedBy").Find(&hirePosts).Error
		if err != nil {
			http.Error(w, "Database error", http.StatusInternalServerError)
			return
		}

		if len(hirePosts) == 0 {
			http.Error(w, "ไม่พบโพสต์", http.StatusNotFound)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(hirePosts)
		return

	} else {
		http.Error(w, "Only GET allowed", http.StatusMethodNotAllowed)
		return
	}
}
