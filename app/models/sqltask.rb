class Sqltask < ActiveRecord::Base

  def self.query_1
    query = 'SELECT DISTINCT status FROM tasks ORDER BY status'
  end

  def self.query_2
    query = 'SELECT COUNT(id) AS tasks_cnt FROM tasks GROUP BY project_id ORDER BY tasks_cnt DESC'
  end

  def self.query_3
    query =  'SELECT COUNT(tasks.id) AS tasks_cnt FROM tasks
             LEFT JOIN projects ON tasks.project_id = projects.id
             GROUP BY tasks.project_id ORDER BY projects.name DESC'
  end

  def self.query_4
    query =  "SELECT * FROM tasks WHERE name like 'N%' "
  end

  def self.query_5
    query =  "SELECT COUNT(tasks.id) AS tasks_cnt,projects.name FROM tasks
             LEFT JOIN projects ON tasks.project_id = projects.id
             WHERE projects.name LIKE '%a%' AND tasks.project_id IS NOT NULL
             GROUP BY tasks.project_id"
  end

  def self.query_6
    query = 'SELECT COUNT(id) AS tasks_cnt, name FROM tasks GROUP BY project_id
             HAVING BY tasks_cnt > 1 ORDER BY name'
  end

  def self.query_7
    query = "SELECT COUNT(tasks.id) as matches, tasks.name FROM tasks
             LEFT JOIN projects ON tasks.project_id = projects.id
             WHERE projects.name = 'Garage' GROUP BY tasks.name,tasks.status
             ORDER BY matches DESC"
  end

  def self.query_8
    query = "SELECT COUNT(tasks.id) as cnt, project.name FROM tasks
             LEFT JOIN projects ON tasks.project_id = projects.id
             WHERE tasks.status = 'completed'
             GROUP BY tasks.project_id HAVING BY cnt > 10 ORDER BY tasks.project_id"
  end

end