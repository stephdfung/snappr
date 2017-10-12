class PicsController < ApplicationController

  # before_action :autneticate_user!, only: [:create, :destroy]

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

    if @pic.save
      puts "Ok"
      render json: @pic
    else
      raise "Err!"
    end
  end

  def destroy
    @pic = Pic.find(paramds[:id])

    if @pic.destroy
      puts "Ok"
      render json: Pic.all
    else
      raise "Err!"
    end
  end

  private

  def pic_params
    params.permit(:canvas_img)
  end
end