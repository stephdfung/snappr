class PicsController < ApplicationController

  before_action :authenticate_user!, only: [:create]

  def index
    @pics = Pic.all 
    render json: @pics
  end

  def show
    @pic = Pic.find(params[:id])
    render json: @pic
  end

  def create
    @pic = Pic.new(pic_params)
    @pic.user_id = current_user.id

    if @pic.save
      puts "Ok"
      render json: @pic
    else
      raise "Err!"
    end
  end

  def edit
    @pic = Pic.find(params[:id])
  end

  def update
    @pic = Pic.find(params[:id])
    @pic.update(pic_params)
  end

  def view
    image = Pic.find(params[:id])
    png = Base64.decode64(image.canvas_img["data:image/png;base64,".length .. -1])
    send_data png, type: "image/png", disposition: "inline"
  end

  def destroy
    @pic = Pic.find(params[:id])

    if @pic.destroy
      puts "Ok"
      render json: Pic.all
    else
      raise "Err!"
    end
  end

  private

  def pic_params
    params.permit(:canvas_img, :user_id)
  end
end