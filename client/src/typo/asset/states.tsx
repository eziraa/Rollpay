import { BaseState } from "../utils/state";
import { Asset } from "./response";

export interface AssetState extends BaseState {
  curr_asset: Asset | undefined;
  assets: Asset[];
  task_error: string | undefined;
}
