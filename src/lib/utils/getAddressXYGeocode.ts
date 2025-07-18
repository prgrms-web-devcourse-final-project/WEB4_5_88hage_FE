type XY = { x: number; y: number };

export function searchAddress(address: string): Promise<XY | null> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !window.kakao) {
      reject(new Error("Kakao SDK not loaded"));
      return;
    }

    // SDK 준비 보장
    window.kakao.maps.load(() => {
      const geocoder = new window.kakao.maps.services.Geocoder();

      geocoder.addressSearch(address, (result: any, status: any) => {
        if (status === window.kakao.maps.services.Status.OK && result?.length) {
          const { x, y } = result[0]; // 문자열로 옴
          console.log(`주소: ${address}`);
          console.log(`경도(x): ${x}, 위도(y): ${y}`);
          resolve({ x: parseFloat(x), y: parseFloat(y) });
        } else {
          console.error("주소 검색 실패:", status, result);
          resolve(null); // 실패 시 null 반환
        }
      });
    });
  });
}