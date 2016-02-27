# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

@user = User.create(password:123,email:'user@mail.ru')

@project = Project.create(name: 'My first project', user_id: @user.id)
for i in 1..5
  Task.create(name: "Task #{i}",project_id: @project.id, position: i)
end
