import { Interface } from 'readline';

export interface UserInfoModel {
  objetivos: string[];
  enfermedades: string[];
  ciudad?: string;
  email?: string;
  estado?: string;
  id?: string;
  nacionalidad?: string;
  nombreCompleto?: string;
  registroFinalizado?: boolean;
  sexo?: string;
  registerIp?: any;
  peso: number;
  estatura: number;
}
export interface InitialUserInfo {
  email: string;
  nombreCompleto: string;
  registerDate: Date;
  registerIp: any;
}
