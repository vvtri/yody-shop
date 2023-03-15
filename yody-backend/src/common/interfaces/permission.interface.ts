import { ActionAbility } from "../enums/action-ability.enum";
import { Action } from "../enums/action.enum";
import { Resource } from "../enums/resource.enum";

export interface Permission {
  action: Action
  resource: Resource
  actionAbility: ActionAbility
}