export function splitMetaLine(meta: string): string[] {
  return meta.split('•').map((s) => s.trim()).filter(Boolean);
}
