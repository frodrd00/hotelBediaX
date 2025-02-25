export interface destination {
  id: number;
  name: string;
  description: string;
  cc: string;
  type: TypeEnum;
  lastModif: Date;
}

export enum TypeEnum {
  familiar,
  ocio,
}
