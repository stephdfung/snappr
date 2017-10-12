class PostsController < ApplicationController
  def index
    @posts = Post.all
  end

  def new
  end

  def create
    post = Post.new(post_params)
    post.user = current_user
    post.save!
    redirect_to posts_url
  end

  private

  def post_params
    params.require(:post).permit(:title, :body)
  end
end