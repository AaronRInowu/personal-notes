import { IpaginationMeta } from "./general.interface";

export interface ItestChat {
  success: boolean;
  message: string;
  data: {
    id: number;
    title?: string;
    type: string;
    messages: {
      docs: {
        id: number;
        sender: number;
        chat: number;
        content: string;
        updatedAt: string;
        createdAt: string;
      }[];
      hasNextPage: boolean;
    };
    updatedAt: string;
    createdAt: string;
    members: {
      id: 1;
      firstName: string;
      lastName: string;
      image: null | string;
    }[];
  }[];
  meta: IpaginationMeta;
  timestamp: string;
}
