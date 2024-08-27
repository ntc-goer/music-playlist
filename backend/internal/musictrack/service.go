package musictrack

type Service struct {
	Repository *Repository
}

func NewService() *Service {
	return &Service{}
}
