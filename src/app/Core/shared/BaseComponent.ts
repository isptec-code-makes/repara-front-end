import {MessageService} from "primeng/api";
import {AbstractControl, Validators} from "@angular/forms";
import {TableLazyLoadEvent} from "primeng/table";

export type pageType = { rows: number, first: number };

export abstract class BaseComponent {
    abstract messageService: MessageService;
    totalRecords: number = 100;

    getPageNumber($event: TableLazyLoadEvent) {
        return ($event.first / $event.rows) + 1;
    }

    handleHttpErrorResponse(errorResponse: any, model?: any): void {
        if (errorResponse.error) {
            const errorData = errorResponse.error;

            // Verifica se 'errors' é um array (erros genéricos)
            if (Array.isArray(errorData.errors)) {
                errorData.errors.forEach((message: string) => {
                    //console.log(`Error: ${message}`);
                    this.messageService.add(
                        {
                            severity: 'error',
                            summary: "Erro",
                            detail: message,
                            life: 3000
                        }
                    );
                });
            }
            // Verifica se 'errors' é um objeto (erros específicos de campos)
            else if (typeof errorData.errors === 'object') {
                for (const key in errorData.errors) {
                    if (errorData.errors.hasOwnProperty(key)) {
                        errorData.errors[key].forEach((message: string) => {
                            //console.log(`${key}: ${message}`);
                            this.messageService.add(
                                {
                                    severity: 'error',
                                    summary: key,
                                    detail: message,
                                    life: 3000
                                }
                            );
                        });
                    }
                }
            }
            // Verifica se há uma mensagem geral de erro
            if (errorData.message) {
                this.messageService.add(
                    {
                        severity: 'error',
                        summary: "Erro",
                        detail: errorData.message,
                        life: 3000
                    }
                );
            }

            // Pode adicionar mais verificações conforme necessário para outros campos
        } else {
            console.error("Formato de erro inesperado:", errorResponse);
        }
    }

    emailValidator() {
        return (control: AbstractControl) => {
            if (!control.value) {
                return null; // Retorna nulo se o campo estiver vazio (sem erro)
            }
            return Validators.email(control); // Aplica validação de email apenas se houver valor
        };
    }


    /*
    handleHttpErrorResponse(errorResponse: any, model: any): void {
        const isStringArray = Array.isArray(errorResponse.error.errors) && errorResponse.error.errors.every(item => typeof item === 'string');
        console.log(errorResponse);
        console.log(isStringArray);

        if (isStringArray) {
            errorResponse.error.errors.forEach(item => {
                this.messageService.add(
                    {
                        severity: 'error',
                        summary: "Erro",
                        detail: item,
                        life: 3000
                    }
                );
            });
        }

        if (errorResponse.error && errorResponse.error.message) {
            this.messageService.add(
                {
                    severity: 'error',
                    summary: "Erro",
                    detail: errorResponse.error.message,
                    life: 3000
                }
            );
        }

        // Verifica se o objeto de erro existe e contém o campo 'errors'
        if (errorResponse.error && errorResponse.error.errors) {
            const errors = errorResponse.error.errors;

            // Percorre os erros retornados pela API
            for (const key in errors) {
                if (errors.hasOwnProperty(key)) {
                    // Verifica se o campo existe no modelo
                    if (model.hasOwnProperty(key)) {
                        // Adiciona a mensagem de erro ao campo correspondente
                        errors[key].forEach((message: string) => {
                            this.messageService.add(
                                {
                                    severity: 'error',
                                    summary: key,
                                    detail: message,
                                    life: 3000
                                }
                            );
                        });
                    }
                }
            }
        }
    }
     */
}
