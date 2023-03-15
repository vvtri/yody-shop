import { TimeModified } from "../../common/interfaces/time-modified.interface";

export interface IColor extends TimeModified {
  id: number
  name: string
  hexCode: string
}