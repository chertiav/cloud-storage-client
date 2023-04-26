import { extColor } from '@/utils/extColor';

export type Extension = keyof typeof extColor;
export type Color = (typeof extColor)[Extension];

export const getColorByExtension = (ext: string): Color => {
	// @ts-ignore
	return extColor[ext];
};
