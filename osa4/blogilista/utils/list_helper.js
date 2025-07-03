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

const mostBlogs = (blogs) => {
    // Count blogs for each author
    const countsByName = blogs.reduce((acc, blog) => {
        acc[blog.author] = (acc[blog.author] || 0) + 1
        return acc
    }, {})
    
    // Find (one of) the author(s) that have the most blogs
    const mostBlogs = Object.keys(countsByName).reduce((a, b) =>{
        return countsByName[a] > countsByName[b]
            ? a
            : b
    })

    return {
        author: mostBlogs,
        blogs: countsByName[mostBlogs],
    }
}

const mostLikes = (blogs) => {
    // Count all likes from the blogs for each author
    const countsByName = blogs.reduce((acc, blog) => {
        acc[blog.author] = (acc[blog.author] || 0) + blog.likes
        return acc
    }, {})
    
    // Find (one of) the author(s) that have the most overall likes
    const mostLiked = Object.keys(countsByName).reduce((a, b) =>{
        return countsByName[a] > countsByName[b]
            ? a
            : b
    })

    return {
        author: mostLiked,
        likes: countsByName[mostLiked],
    }

}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}