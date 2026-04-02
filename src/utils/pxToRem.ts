/** Root font size (px) — matches fch-app html `font-size` convention for rem scale. */
export const ROOT_FONT_SIZE_PX = 14;

/**
 * Convert a px value at design spec to `rem` for scalable layout.
 * Same formula as fch-app `sharedUtils.pxToRem`.
 */
export function pxToRem(px: number): string {
  return `${px / ROOT_FONT_SIZE_PX}rem`;
}
