const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((maxLikesBlog, currentBlog) =>{
        return currentBlog.likes > maxLikesBlog.likes
            ? currentBlog
            : maxLikesBlog 
    })
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}