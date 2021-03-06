set :application, "u.nazone.info"
set :repository,  "git@github.com:nazo/urawazajs.git"

 set :scm, :git # You can set :scm explicitly or Capistrano will make an intelligent guess based on known version control directory names
# Or: `accurev`, `bzr`, `cvs`, `darcs`, `git`, `mercurial`, `perforce`, `subversion` or `none`

role :web, "nazone.info"                          # Your HTTP server, Apache/etc
role :app, "nazone.info"                          # This may be the same as your `Web` server
# role :db,  "nazone.info", :primary => true # This is where Rails migrations will run
# role :db,  "nazone.info"

set :deploy_to, '/var/www/u.nazone.info/'
default_run_options[:pty] = true
set :keep_releases, 10

# if you want to clean up old releases on each deploy uncomment this:
# after "deploy:restart", "deploy:cleanup"

# if you're still using the script/reaper helper you will need
# these http://github.com/rails/irs_process_scripts

# If you are using Passenger mod_rails uncomment this:
# namespace :deploy do
#   task :start do ; end
#   task :stop do ; end
#   task :restart, :roles => :app, :except => { :no_release => true } do
#     run "#{try_sudo} touch #{File.join(current_path,'tmp','restart.txt')}"
#   end
# end
