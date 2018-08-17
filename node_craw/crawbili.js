//b站网址 `https://bangumi.bilibili.com/web_api/season/index_global?page=1&page_size=20&version=0&is_finish=0&start_year=0&tag_id=&index_type=1&index_sort=0&quarter=


// const http=require('superagent');
const http = require('https');

module.exports={
    crawbili(){
        let targetUrl='https://bangumi.bilibili.com/web_api/season/index_global?page=1&page_size=20&version=0&is_finish=0&start_year=0&tag_id=&index_type=1&index_sort=0&quarter=';
        // http.get(targetUrl).end((err,res)=>{
        //     if(err){
        //         console.log(err); 
        //         return;
        //     }
        //     console.log(res,'检测b站接口返回数据')
        // })
        http.get(targetUrl, (res) => {
            var data = '';  //接口数据
         
            res.on('data', (chunk) => {
                data += chunk;    //拼接数据块
            });
            res.on('end', function() {
                let json = JSON.parse(data); //解析json
               
                console.log(json.result.list[0]);  //打印json
            })
        }).on('error', () => 
            console.log('获取数据出错!')
        );        
    }
}