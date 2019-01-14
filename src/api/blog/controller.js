const Blog = require('./model')
const toggle = (arr,username)=>{
    console.log('arr',arr,username)
    if (arr.includes(username)) {
        const temp = arr.filter(name => name !== username)
     return temp
      } else {
        return [...arr, username];
      }
      
}
const errorResponse = (errorInfo, ctx) => {
    ctx.status = 403
    //console.log('errorinfo',errorInfo)
    ctx.body = {
        success: false,
        errorInfo: errorInfo
    }
}
const successResponse = (payload, ctx) => {
    ctx.status = 200
    ctx.body = {
        success: true,
        payload,
        errorInfo: ''
    }
}
exports.uploadBlog = async (ctx, { data = {} } = {}) => {
    if (!data || !data.filename || !data.dir || !data.description) {
        errorResponse('信息缺失', ctx)
        return
    }
    try {
        const blog = await Blog.create(data)
        successResponse(blog, ctx)
    } catch (error) {
        errorResponse('服务器抽风', ctx)
    }
}
exports.viewlist = async (ctx, { data = {} } = {}) => {
    if (!data || !data.dir) {
        errorResponse('信息缺失', ctx)
        return
    }
    try {
        const bloglist = await Blog.find({ dir: data.dir })

        if (bloglist.length === 0) {
            const tmen = await Blog.find()
            errorResponse(JSON.stringify(tmen.map(v => v.dir)), ctx)
            return
        }
        const _bloglist = bloglist.map(v => ({ id: v._id, filename: v.filename, description: v.description, created_on: v.created_on }))
        successResponse(_bloglist, ctx)
    } catch (error) {
        errorResponse('服务器抽风', ctx)
    }
}
exports.viewContent = async (ctx, { data = {} } = {}) => {
    if (!data || !data.id) {
        errorResponse('信息缺失', ctx)
        return
    }
    try {
        const blogContent = await Blog.findById(data.id)
        if (!blogContent) {
            errorResponse('没找到', ctx)
            return
        }
        successResponse(blogContent, ctx)
    } catch (error) {
        errorResponse('服务器抽风', ctx)
    }
}
exports.editContent = async (ctx, { data = {} } = {}) => {
    if (!data || !data.id) {
        errorResponse('信息缺失', ctx)
        return
    }
    try {
        const blogContent = await Blog.findById(data.id)
        if (!blogContent) {
            errorResponse('没找到', ctx)
            return
        }
        blogContent.content = data.content;
        await blogContent.save();
        successResponse(blogContent, ctx)
    } catch (error) {
        errorResponse(err, ctx)
    }
}
exports.addComment = async (ctx, { data = {} } = {}) => {
    if (!data) {
        errorResponse('信息缺失', ctx)
        return
    }
    try {
        const blog = await Blog.findById(data.blogId)
        const temp = {
                message: data.message,
                username: data.username,
                created_on: Date.now()
        }
        if (!blog) {
            errorResponse('没找到', ctx)
            return
        }

        if (data.level.main === -1) {
          
            if (blog.comments) {
                blog.comments.push({main:temp})
            } else{
                blog.comments = [{main:temp}]
            }

        } else {
            if( blog.comments[data.level.main].sub){
                blog.comments[data.level.main].sub.push(temp)
            } else{
                blog.comments[data.level.main].sub = [temp]
            }
           
        } 
       
        await blog.save();
        successResponse(blog, ctx)
    } catch (error) {
        errorResponse(err, ctx)
    }
}
exports.toggleHeart = async (ctx, { data = {} } = {}) => {
    if (!data) {
        errorResponse('信息缺失', ctx)
        return
    }
    try {
        const blog = await Blog.findById(data.blogId)
        const temp = {
                username: data.username,
                created_on: Date.now()
        }
        if (!blog) {
            errorResponse('没找到', ctx)
            return
        }
        if(data.level.sub === -1) {
            if(!blog.comments[data.level.main].main.like){
                blog.comments[data.level.main].main.like = [data.username]
            } else{

                blog.comments[data.level.main].main.like = toggle( blog.comments[data.level.main].main.like,data.username)
               console.log(blog.comments[data.level.main].main.like)
            }
        } else{
            if(!blog.comments[data.level.main].sub[data.level.sub].like){
                blog.comments[data.level.main].sub[data.level.sub].like = [data.username]

            } else{
                blog.comments[data.level.main].sub[data.level.sub].like = toggle(blog.comments[data.level.main].sub[data.level.sub].like,data.username)
            }
        }
        
       
        await blog.save();
        successResponse(blog, ctx)
    } catch (error) {
        
        errorResponse(JSON.stringify(error), ctx)
    }
}


