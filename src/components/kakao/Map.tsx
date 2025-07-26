import { Map, MapMarker } from 'react-kakao-maps-sdk';

type Props = {
    lat:number,
    lng:number,
    width:string,
    height:string
}

export default function kakaoMap({lat = 37.55465000468857,lng = 126.97059787494679,width,height}:Props){
  return (
    <>
      <Map center={{ lat, lng }} style={{ width: `${width}`, height: `${height}` }}>
        <MapMarker position={{ lat, lng }}></MapMarker>
      </Map>
    </>
  );
};