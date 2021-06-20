import { AbstractControl, ValidationErrors } from "@angular/forms";

export function minWordsValidators(minWords: number): (control: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl) => {
        if(controlValidator(control)) return null;
        
        let words = String(control.value).split(' ').filter(word => word);

        if(words.length >= minWords) return null;

        return {
            'minWords': {
                actual: words.length,
                minimum: minWords
            }
        };
    }
}

export function maxLettersValidators(maxLetters: number): (control: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl) => {
        if(controlValidator(control)) return null;
        
        let words = String(control.value).replace(" ", "");

        if(words.length <= maxLetters) return null;

        return {
            'maxLetters': {
                actual: words.length,
                maximum: maxLetters
            }
        };
    }
}

function controlValidator(control: AbstractControl): boolean {
    if (!control) return true;
    if (!control.value) return true;
    if (typeof(control.value) !== 'string') return true;

    return false;
}