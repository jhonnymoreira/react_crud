# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require_relative 'config/application'

Rails.application.load_tasks

Rake::TestTask.new("test:all") do |t|
  t.libs << 'test'
  t.pattern = ["test/**/*_test.rb"]
  t.warning = false
  t.verbose = false
end
