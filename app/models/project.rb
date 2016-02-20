class Project < ActiveRecord::Base
  has_many :tasks, dependent: :destroy
  validates :name, presence: true,length: { minimum: 5 }

  def self.get_user_projects(user_id)
      # self.joins('LEFT JOIN Tasks
      # ON Tasks.project_id = Projects.id').where(user_id: user_id).select(
      # "projects.id as project_id","projects.name as project_name",:user_id,:completed,"tasks.id as task_id","tasks.name as task_name")
    self.where(user_id: user_id)
  end
end
