require('./utils/dateFormat.js')
const {PVUV,UV_STATID} = require('./model.js')
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
      success: true,
      errorInfo: '',
      payload
    }
  }
exports.mergePvUv = async (ctx, { data = {} } = {}) => {
    if(!data || !data.name || !data.statId){
        errorResponse('pvuv信息不全',ctx)
        return
    }
    try {
        const statId = data.statId
        const hereComesVisitors = await UV_STATID.find({statId});
        if(!hereComesVisitors || hereComesUsers.length === 0){
            const accessData = [{
                accessDate:new Date().Format('yyyy/MM/dd'),
                accessCnt:1
            }]
            
            const newVisitor = await UV_STATID.create({statId,accessData})
            successResponse(newVisitor,ctx)
            return
        } else {
            const today = new Date().Format('yyyy/MM/dd')
            const oldVisitor = hereComesVisitors[0]
            const todayAccess = oldVisitor.accessData.find(v => v.accessDate === today)
            if(todayAccess) {
                
            }
        }
    } catch (error) {
        
    }
    

}
