export interface SwitcherAction {
    previous: string | null | undefined;
    current: string | null | undefined;
    go_next: boolean;
}
