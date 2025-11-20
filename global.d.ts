declare namespace NodeJS {
  interface ProcessEnv {
    MONGO_URI: string;
    PORT?: string;
    ACCESS_LIST_CSV_PATH?: string;
  }
}