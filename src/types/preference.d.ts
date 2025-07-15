export type Preference = string[];

export interface PreferenceUpdateRequest {
  preferences: Preference;
  // 상세 스키마 수정 필요
}
