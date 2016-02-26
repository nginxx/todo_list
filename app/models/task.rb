class Task < ActiveRecord::Base
  belongs_to :project
  validates :name, presence: true,length: { minimum: 5 }

  def self.get_max_position
    self.maximum(:position)
  end
end
