
const User = require('./model')
const md5Change = require('../../utils/md5-change').md5Change
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const successResponse = (user, ctx) => {
  let payload = {
    name: user.fullName
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
    var mailTransport = nodemailer.createTransport({
      host: 'smtp.qq.com',
      secureConnection: true, // 使用SSL方式（安全方式，防止被窃取信息）
      auth: {
        user: process.env.MAIL,
        pass: process.env.MAILPWD
      },
    });
    var options = {
      from: `"admin" <${process.env.MAIL}>`,
      to: `"user" <${data.email}>`,
      // cc         : ''  //抄送
      // bcc      : ''    //密送
      subject: '一封来自Node Mailer的邮件',
      text: '一封来自Node Mailer的邮件',
      html: `<h1>你好，这是一封来自NodeMailer的邮件！</h1>
            <p>请点击下方链接重设密码</p>
            <a  href="pref.html" target="view_window"></a>`,
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
      result
    }
  } catch (error) {
    console.error(error)
  }
}
