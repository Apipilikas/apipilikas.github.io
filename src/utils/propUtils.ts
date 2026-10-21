export function joinProps(...props: any[]) {
    return props.filter(item => item != null).join(" ");
}