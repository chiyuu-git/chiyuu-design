export default async function myFetch(
  url = null,
  method = 'GET',
  params = {},
){
  console.log(url,params,method)

  let result = null
  let response = null

  // 返回一个promise，外部可以通过then在获取到数据后再继续操作
  // 使用async就不需要包一层promise了，因为返回的是同步的

  // 无论是GET还是POST都需要拼接参数
  let query = ''
  for(const key in params){
    query += `${key}=${params[key]}&`
  }
  if(query) query = query.slice(0,query.length-1)
  if(method === 'GET') {
    if(query) url += `?${query}`
  }

  // 不同的请求不同的fetch
  try {
    switch(method){
      case 'GET':
        console.log('GET',url)
        response = await fetch(url,)
      break
      case 'POST':
        response = await fetch(url, {
          method,
          headers: {
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
          },
          body: query,
          mode:'cors'
        })
      break
    }
  }
  catch (error) {
    console.log('Request Error: ', error)
  }
  result = response.json()
  return result
}