export type Socket = {
    id: string, 
    name: string
}
export type SocketResponse = {
  code: number;
  success: boolean;
  details: {
    offset: number;
    limit: number;
    totalRecords: number;
    totalPage: number;
    records: Socket[]; 
  };
  timestamp: string;
}