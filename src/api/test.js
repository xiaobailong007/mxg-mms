
import requset from '@/utils/request'

const BASE_URI = process.env.VUE_APP_BASE_API
//测试2，以对象配置的方式进行指定请求方式
requset({
    method:'get',
    // url:BASE_URI+'/db.json'
    url:'/db.json'
}).then(
    response =>{
        console.log('get2',response.data)
    }
)


requset({
    method:'get',
    url:'/db.json'
})

export default{
    getList(){
        const req = requset({
            method:'get',
            url:'/db.json'
        })
        return req
    }
}