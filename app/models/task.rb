class Task < ActiveRecord::Base
  belongs_to :project
  validates :name, presence: true,length: { minimum: 2 }

  def self.get_max_position
    self.maximum(:position)
  end

  def self.update_task_position(data1,data2)
      self.update(data1[0], position: data1[1])
      self.update(data2[0], position: data2[1])
  end
end
