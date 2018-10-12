require('./utils/dateFormat.js')
const PVUV = require('./model.js')
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
  exports.addPvUvCnt = async (ctx,{statId,name,brower='',browerLanguage='',platform='',searchId=''})=>{
    if(!statId || !name){
        errorResponse('pvuv信息不全',ctx)
        return
    }
    const _accessData = {
        accessDate:new Date().Format('yyyy/MM/dd'),
        brower,
        browerLanguage,
        platform,
        pv:1,
        uv:1,
        statIds:[statId]
    }
    const page = await PVUV.find({name})
    
    if(!page || page.length === 0) {
        const newPage = await PVUV.create({name,searchId,accessData:[_accessData]})
        successResponse(newPage,ctx)
        return
    }
    if(page.length>1){
        errorResponse(`duplicate page name ${name} for uv pv,this name is registed`,ctx)
        return
    }
    const registedPage = page[0]
    const accessData = registedPage.accessData
    const todayAccess =  accessData.find(v => v.accessDate === new Date().Format('yyyy/MM/dd'))
    if(todayAccess){
        todayAccess.pv++
        if(!todayAccess.statIds.find(v => v===statId)) {
            todayAccess.uv++
            todayAccess.statIds.push(statId)
        }
       const updateUvPv =  await accessData.save()
        successResponse(updateUvPv,ctx)
        return
    } else{
        accessData.push(_accessData)
        const updateUvPv =  await accessData.save()
        successResponse(updateUvPv,ctx)
        return
    }
  }
  exports.getPagePvUv = async (ctx,{name})=>{
    if(!name){
        errorResponse('pageName is required')
        return
    }
    try {
        const PvUvdata = await PVUV.find({name})
        if(!PvUvdata || PvUvdata === 0){
            errorResponse('can not find this page did you registed it?')
            return
        }
        successResponse(PvUvdata,ctx)
    } catch (error) {
        
    }

    
  }

