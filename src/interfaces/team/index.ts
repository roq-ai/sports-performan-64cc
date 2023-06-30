import { AthleteInterface } from 'interfaces/athlete';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface TeamInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  athlete?: AthleteInterface[];
  user?: UserInterface;
  _count?: {
    athlete?: number;
  };
}

export interface TeamGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
