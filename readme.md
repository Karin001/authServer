### first install node_modules
npm i
### write your own .env file in rootdir
PORT = [your port number]
MONGO_DATABASE_NAME = [your DATABASE name]
MONGO_URL= [your mongodb url]
JWT_SECRET = [your json web token secret]
EXPRIRESIN = [jwt token valid time]
MAIL = [your email addr]
MAILPWD = [your email Authorization Code ]
### restApi
- url: /api/users/login
- method: post
- request.body:
    email:string 
    password:string
- success response.body:
    success: true
    token: string
    email: user.email
    name: user.fullName
- error response.body:
    success: false
    errorInfo: string
------------
