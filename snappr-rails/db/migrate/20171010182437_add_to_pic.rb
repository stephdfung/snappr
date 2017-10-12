class AddToPic < ActiveRecord::Migration[5.1]
  def change
    add_column :pics, :canvas_img, :string
    add_column :pics, :user_id, :integer
  end
end
