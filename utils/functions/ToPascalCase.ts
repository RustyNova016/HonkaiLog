export function toPascalCase(str: string) {
    return (str.match(/[a-zA-Z0-9]+/g) || []).map((w: string) => `${w.charAt(0).toUpperCase()}${w.slice(1)}`).join('');
}