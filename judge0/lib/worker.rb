require "sidekiq"
require "json"

class Worker
  include Sidekiq::Worker

  def perform(job)
    puts "🧠 Processing job: #{job}"
    # Here you could later link this to Django or debugging output
  end
end
