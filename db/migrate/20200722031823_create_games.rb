class CreateGames < ActiveRecord::Migration[6.0]
  def change
    create_table :games do |t|
      t.string :title
      t.string :image_url
      t.string :description
      t.string :score
      t.belongs_to :account, null: false, foreign_key: true

      t.timestamps
    end
  end
end
