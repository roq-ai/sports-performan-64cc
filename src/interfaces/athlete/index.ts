import { UserInterface } from 'interfaces/user';
import { TeamInterface } from 'interfaces/team';
import { GetQueryInterface } from 'interfaces';

export interface AthleteInterface {
  id?: string;
  effort: number;
  recovery: number;
  sleep_quality: number;
  training_perception: number;
  user_id?: string;
  team_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  team?: TeamInterface;
  _count?: {};
}

export interface AthleteGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  team_id?: string;
}
