'use client'

export async function KakaoGeocode(address:string) {

  const searchAddress = (address: string) => {
    if (!window.kakao) {
      console.error("Kakao SDK not loaded");
      return;
    }

    return window.kakao.maps.load(() => {
      const geocoder = new window.kakao.maps.services.Geocoder();

      const xy = geocoder.addressSearch(address, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const { x, y } = result[0];
          console.log(`주소: ${address}`);
          console.log(`경도(x): ${x}, 위도(y): ${y}`);

          return {x,y}
        } else {
          console.error("주소 검색 실패:", status);
        }
      });

      return xy
    });
  }

  return searchAddress(address)
}