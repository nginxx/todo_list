class Project < ActiveRecord::Base
  has_many :tasks, dependent: :destroy
  validates :name, presence: true,length: { minimum: 5 }

  def self.get_user_projects(user_id)
    self.where(user_id: user_id)
  end
end
