import Fuse, { type IFuseOptions } from "fuse.js";
import type { KedaiKopi } from "@/types/kedai";

const searchOptions: IFuseOptions<KedaiKopi> = {
  keys: [
    { name: "name", weight: 0.6 },
    { name: "location.city", weight: 0.3 },
    { name: "location.state", weight: 0.2 },
    { name: "specialties", weight: 0.4 },
    { name: "type", weight: 0.1 },
  ],
  threshold: 0.4,
  includeScore: true,
  minMatchCharLength: 2,
};

export function createKedaiSearch(kedaiList: KedaiKopi[]) {
  return new Fuse(kedaiList, searchOptions);
}

export function searchKedai(
  kedaiList: KedaiKopi[],
  query: string
): KedaiKopi[] {
  if (!query.trim()) return kedaiList;
  
  const fuse = createKedaiSearch(kedaiList);
  const results = fuse.search(query);
  
  return results.map(result => result.item);
}