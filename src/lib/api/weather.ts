import axios from "axios";
import { monthStringFormatting } from '@/lib/utils/dateFormatting';

axios.defaults.timeout = 5000;

const weatherApiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

const getWeather = async () => {
    const today = new Date();
    const nowYear = today.getFullYear().toString();
    const nowMonth = monthStringFormatting(today.getMonth() + 1);
    const nowDate = today.getDate().toString();

    const hours = ('0' + today.getHours()).slice(-2); 
    const minutes = ('0' + today.getMinutes()).slice(-2).toString();

    const todayStringInfo = `${nowYear + nowMonth + nowDate}`;
    const nowStringInfo = `${hours}${minutes}`

    try{
      const {data} = await axios.get(`http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=${weatherApiKey}&numOfRows=13&pageNo=1&base_date=${todayStringInfo}&base_time=${nowStringInfo}&nx=62&ny=125&dataType=JSON`);
      const item = data.response.body.items.item;
      const precipitation = item.filter((info:WeatherInfo) => info.category === "PTY");

      if(precipitation[0].obsrValue === undefined) throw new Error('api 형식을 참고 해주세요');
      
      return +precipitation[0].obsrValue;
    } catch(e){
      console.log('날씨 api 통신하는대 실패 했습니다.', e)
    }
}

export default getWeather;

