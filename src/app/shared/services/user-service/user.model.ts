import { Interface } from 'readline';

export interface UserInfoModel {
  actividadEconomica: string;
  ciudad: string;
  discapacidad: string;
  email: string;
  esEmpresario: string;
  esEstudiante: string;
  esEstudianteEn: string;
  esEstudianteEnEspecificar: string;
  esProfesor: string;
  esProfesorEn: string;
  esProfesorEnEspecificar: string;
  estado: string;
  id: string;
  nacionalidad: string;
  nombreCompleto: string;
  nombreDeEmpresa: string;
  numeroEmpleados: string;
  registroFinalizado: boolean;
  rol: string;
  sectorEconomico: string;
  sectorEconomicoEspecificar: string;
  sexo: string;
  tipoPersona: string;
  registerIp: any;
}
export interface InitialUserInfo {
  email: string;
  nombreCompleto: string;
  registerDate: Date;
  registerIp: any;
}
