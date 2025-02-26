export interface destination {
  _id: string | null;
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
