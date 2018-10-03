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
            errorResponse(JSON.stringify(tmen),ctx)
            return
        }
        successResponse(bloglist,ctx)
    } catch (error) {
        errorResponse('服务器抽风',ctx)
    }
}

