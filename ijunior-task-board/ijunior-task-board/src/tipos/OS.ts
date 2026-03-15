 export interface OS{
   id: number;
   client_id: number;
   device: string;
   issue: string;
   status: string;
   created_at: string;
 }
 export interface CreateOsData{
  clientId: number;
  device: string;
  issue: string;
 }