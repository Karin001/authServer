
const User = require('./model')
const md5Change = require('../../utils/md5-change').md5Change
const jwt = require('../../../node_modules/jsonwebtoken')
const nodemailer = require('nodemailer')
const enDecode = require('../../utils/simpleEndecode')
const successResponse = (user, ctx) => {
  let payload = {
    name: user.fullName,
    role:'user',
    permissionPoint:2
  }
  let token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.EXPRIRESIN })
  ctx.body = {
    success: true,
    token,
    email: user.email,
    name: user.fullName,
  }
}
const errorResponse = (errorInfo, ctx) => {
  ctx.status = 403
  ctx.body = {
    success: false,
    errorInfo: errorInfo
  }
}
exports.login = async (ctx, { data = {} } = {}) => {
  try {
    if (!data || !data.password || !data.email) {
      errorResponse("登录信息缺失", ctx)
      return
    }
    const findUsers = await User.find({ email: data.email })
    if (findUsers.length === 0 || findUsers[0].password !== md5Change(data.password)) {
      errorResponse("登录信息错误", ctx)
      return
    }
    const user = findUsers[0]
    successResponse(user, ctx)
    return
  } catch (error) {

  }

}

exports.signup = async (ctx, { data = {} } = {}) => {
  try {
    if (!data || !data.password || !data.fullName || !data.email) {
      console.log(324234123123)
      errorResponse("注册信息缺失", ctx)
      return
    }
    data.password = md5Change(data.password)

    const duplicateEmail = await User.find({ email: data.email })
    const duplicateName = await User.find({ fullName: data.fullName })
    if (duplicateEmail.length > 0 || duplicateName.length > 0) {
      const errorInfo = duplicateEmail.length > 0 && duplicateName.length > 0 ? "邮箱已注册,用户名已存在" : duplicateEmail.length > 0 ? "邮箱已注册" : "用户名已存在"
      errorResponse(errorInfo, ctx)
      return
    }
    const user = await User.create(data)
    successResponse(user, ctx)
  } catch (error) {
    console.error(error)
  }
}

exports.requestPassword = async (ctx, { data = {} } = {}) => {
  try {
    if (!data || !data.email) {
      errorResponse("信息缺失", ctx)
      return
    }
    const findUser = await User.find({ email: data.email })
    if (findUser.length === 0) {
      errorResponse("邮箱未注册", ctx)
      return
    }
    const mailTransport = nodemailer.createTransport({
      host: 'smtp.qq.com',
      secureConnection: true, // 使用SSL方式（安全方式，防止被窃取信息）
      auth: {
        user: process.env.MAIL,
        pass: process.env.MAILPWD
      },
    });
    const payload = {
      email:data.email,
      expiresTime: Date.now() + 1000 *60 *60
    }
    
    const token = enDecode.Encrypt(JSON.stringify(payload), process.env.SIMPLE_SECRET)
    const url = `${process.env.RESET_PWD_URL}${token}`
    const options = {
      from: `"admin" <${process.env.MAIL}>`,
      to: `"user" <${data.email}>`,
      // cc         : ''  //抄送
      // bcc      : ''    //密送
      subject: '一封来自Node Mailer的邮件',
      text: '一封来自Node Mailer的邮件',
      html: `<h1>你好，这是一封来自NodeMailer的邮件！</h1>
            <p>请点击下方链接重设密码</p>
            <a  href=${url} target="view_window">${url}</a>`,
      // attachments:
      //   [
      //     {
      //       filename: 'img1.png',            // 改成你的附件名
      //       path: 'public/images/img1.png',  // 改成你的附件路径
      //       cid: '00000001'                 // cid可被邮件使用
      //     },
      //     {
      //       filename: 'img2.png',            // 改成你的附件名
      //       path: 'public/images/img2.png',  // 改成你的附件路径
      //       cid: '00000002'                 // cid可被邮件使用
      //     },
      //   ]
    };

    const result = await mailTransport.sendMail(options)
    ctx.body = {
      clc:"213123",
      result
    }
  } catch (error) {
    console.error(error)
  }
}
exports.getJwt = async (ctx, { data = {} } = {})=>{
  console.log('data123213123123123123123123')
  try {
    if(!data || !data.token) {
      console.log('data123213123123123123123123',data)
      errorResponse("信息缺失",ctx)
      return 
    }
    const emailToken =JSON.parse(enDecode.Decrypt(data.token, process.env.SIMPLE_SECRET))
    if(Date.now() > emailToken.expiresTime) {
      errorResponse("已过期",ctx)
      return
    }

    const findUsers = await User.find({ email: emailToken.email })
    if (findUsers.length === 0) {
      errorResponse("信息错误", ctx)
      return
    }
    const payload = {
      email:findUsers[0].email,
      name:'lockUser',
      role:'lockUser',
      permissionPoint:1
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.EXPRIRESIN })
    ctx.body = {
    success: true,
    token
  }
  } catch (error) {
    
  }
}
exports.resetPassword = async (ctx, { data = {} } = {})=>{
  try {
    if(!data || !data.password) {
      errorResponse("信息缺失", ctx)
      return
    }
    if(!ctx.state.user){
      errorResponse("失效",ctx)
      return
    }
    const findUsers = await User.find({ email: ctx.state.user.email})
    if (findUsers.length === 0) {
      errorResponse("未找到该用户", ctx)
      return
    }
    
    findUsers[0].password = md5Change(data.password)
    await User.findOneAndUpdate({ email: ctx.state.user.email},{password: md5Change(data.password)})
    ctx.body={
      success:true
    }
  } catch (error) {
    
  }
}
exports.logout = async (ctx, { data = {} } = {})=>{
  ctx.body = {
    success:true
  }
}
