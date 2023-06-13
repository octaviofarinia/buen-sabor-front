export interface NavigationProps{
    user: boolean;
}
export interface DropdownProps{
    routes: RoutesProps[];
    
}
export interface RoutesProps {
    name: string;
    imagen: string;
    interface: string;
  }