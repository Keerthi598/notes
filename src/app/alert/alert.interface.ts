import { AlertEnum } from "./alert.enum";

export interface AlertInterface {
    type : AlertEnum;
    text : string;
}