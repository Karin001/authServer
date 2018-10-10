const Blog = require('./model')
const errorResponse = (errorInfo, ctx) => {
    ctx.status = 403
    ctx.body = {
        success: false,
        errorInfo: errorInfo
    }
}
const successResponse = (payload, ctx) => {
    ctx.status = 200
    ctx.body = {
        success:true,
        payload,
        errorInfo:''
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
        errorResponse('服务器抽风',ctx)
    }
}
exports.viewlist = async (ctx, { data = {} } = {}) => {
    if(!data || !data.dir) {
        errorResponse('信息缺失',ctx)
        return
    }
    try {
        const bloglist = await Blog.find({dir:data.dir})
       
        if(bloglist.length === 0 ) {
            const tmen = await Blog.find()
            errorResponse(JSON.stringify(tmen.map(v => v.dir)),ctx)
            return
        }
        const _bloglist = bloglist.map(v => ({id:v._id,filename:v.filename,description:v.description,created_on:v.created_on}))
        successResponse(_bloglist,ctx)
    } catch (error) {
        errorResponse('服务器抽风',ctx)
    }
}
exports.viewContent = async (ctx, { data = {} } = {}) => {
    if(!data || !data.id) {
        errorResponse('信息缺失',ctx)
        return
    }
    try {
        const blogContent = await Blog.findById(data.id)
        if(!blogContent) {
            errorResponse('没找到',ctx)
            return
        }
        successResponse(blogContent,ctx)
    } catch (error) {
        errorResponse('服务器抽风',ctx)
    }
}

