export interface NavigationProps{
    user: boolean;
}
export interface DropdownProps{
    routes: Route[];
}
export interface Route{
    name: string,
    imagen: string,
    dropdown: string;
    route: string,
    type: string,
  }