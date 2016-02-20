class Task < ActiveRecord::Base
  belongs_to :project
  validates :name, presence: true,length: { minimum: 5 }
end
