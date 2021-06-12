import { AbstractControl, ValidationErrors } from "@angular/forms";

export function wordsValidators(minWords: number): (control: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl) => {
        if(controlValidator(control)) return null;
        
        let words = String(control.value).split(' ').filter(word => word);

        if(words.length >= minWords) return null;

        return {
            'words': {
                actual: words.length,
                minimum: minWords
            }
        };
    }
}

export function lettersValidators(maxLetters: number): (control: AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl) => {
        if(controlValidator(control)) return null;
        
        let words = String(control.value).replace(" ", "");

        if(words.length <= maxLetters) return null;

        return {
            'words': {
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