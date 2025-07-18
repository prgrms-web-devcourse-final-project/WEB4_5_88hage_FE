export enum ContentPreference {
  THEATER = "THEATER",
  DANCE = "DANCE",
  POP_DANCE = "POP_DANCE",
  CLASSIC = "CLASSIC",
  GUKAK = "GUKAK",
  POP_MUSIC = "POP_MUSIC",
  MIX = "MIX",
  MAGIC = "MAGIC",
  MUSICAL = "MUSICAL",
  TOUR = "TOUR",
  CULTURE = "CULTURE",
  SPORTS = "SPORTS",
}

export enum GroupPreference {
  ART = "ART",
  TRAVEL = "TRAVEL",
  FOOD = "FOOD",
  GAME = "GAME",
  CULTURE = "CULTURE",
  SPORT = "SPORT",
  STUDY = "STUDY",
  MOVIE = "MOVIE",
}

export interface PreferenceRequest {
  contentPreferences: ContentPreference[];
  groupPreferences: GroupPreference[];
}
