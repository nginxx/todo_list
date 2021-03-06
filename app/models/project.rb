class Project < ActiveRecord::Base
  has_many :tasks, -> { order 'position asc' }, dependent: :destroy
  validates :name, presence: true,length: { minimum: 2 }

  def self.get_user_projects(user_id)
    self.where(user_id: user_id)
  end
end
