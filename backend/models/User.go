package models

import "gorm.io/gorm"

type User struct {
	gorm.Model

	Username    string `json:"username" gorm:"not null"`
	Email       string `json:"email" gorm:"uniqueIndex;not null"`
	Password    string `json:"password" gorm:"not null"`
	Description string `json:"description"`
}
