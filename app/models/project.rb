class Project < ActiveRecord::Base
  has_many :tasks, dependent: :destroy
  validates :name, presence: true,length: { minimum: 5 }
end
