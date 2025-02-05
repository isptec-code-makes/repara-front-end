import {TabViewChangeEvent} from "primeng/tabview";

export interface TabIndexComponent {
    // variaveis para controlar a tab activa
    activeIndexTab: number;

    // Método para carregar o index da tab activa a partir da URL
    loadIndexTab(): void;

    // Método para salvar o index da tab activa na URL
    changeIndexTab(event: TabViewChangeEvent): void

}