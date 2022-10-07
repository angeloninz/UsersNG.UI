import { User } from '../models/user.model';

export interface UserResponse {
  //data: User[];
  data: any;
  message: string;
  success: boolean;
}
