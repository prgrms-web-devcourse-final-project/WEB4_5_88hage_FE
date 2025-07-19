//프록시 서버
import axios from "axios";

const getAddressXYCoordinate = async(address:string)=>{
    try{
      const data = await axios.get('/api/kakao',{
            params: {
                query: address,
            },
        });
        console.log('카카오맵 response', data);
        return data;
    } catch(error){
        console.log('kakao map api 통신에 실패 했습니다 :', error);
    }
}

export default getAddressXYCoordinate;