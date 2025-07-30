package models

import "gorm.io/gorm"

type JobPost struct {
	Title       string
	Description string
	Type        string
	PostedByID  uint
	PostedBy    User
}

type ForHirePost struct {
	gorm.Model

	JobPost
}

type RecruitPost struct {
	gorm.Model

	JobPost
	CompanyName string
	Location    string
	Salary      string
}
