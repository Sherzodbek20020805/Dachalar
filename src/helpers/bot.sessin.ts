import { Context } from "telegraf";

export interface ISessin {
  dachaName: string;
  dachalar: any;
  dacha: never[];
  price: string | null;
  name: string | null;
  description: string | null;
  image: string | null
  id: string | null

  stepAdmin?: string
  stepUser?: string
  menuName?: string | null;
  dachaqlar: number[]
  SS: string | null


  data: {name?: string | null, price?: number | null, description?: string | null, image?: string | null} | null
}

export interface IMyContext extends Context {
  session: ISessin;
  match: RegExpExecArray | string[];
}


export interface CerateInterface {
  name?: string
  price?: number
  description?: string
  image?:string
}
