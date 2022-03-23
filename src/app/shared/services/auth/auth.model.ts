export interface EmailPasswordModel {
  email: string;
  password: string;
  nombreCompleto?: string;
  registerDate?: Date;
  registerIp?: string;
}
export interface ExternalOptionInput {
  external: string;
  ip: string;
}
