package auth

type User struct {
	UserId   uint
	Username string
	Email    string `gorm:"unique"`
	Password string
}
