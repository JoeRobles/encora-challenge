import { NameUrlInterface } from './name-url.interface';
import { VersionGroupDetailInterface } from './version-group-detail.interface';

export interface MoveInterface {
  move: NameUrlInterface;
  version_group_details: VersionGroupDetailInterface[];
}
