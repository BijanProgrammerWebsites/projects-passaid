import {Component, OnInit} from '@angular/core';
import {Clipboard} from '@angular/cdk/clipboard';

interface Strength {
    value: number;
    text: string;
    color: string;
}

interface Settings {
    includeLowercaseLetters: boolean;
    includeUppercaseLetters: boolean;
    includeNumbers: boolean;
    includeSymbols: boolean;
}

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    public password: string = '';
    public characterLength: number = 16;

    public strength: Strength = {
        value: 0,
        text: '',
        color: 'white',
    };

    public settings: Settings = {
        includeLowercaseLetters: true,
        includeUppercaseLetters: true,
        includeNumbers: true,
        includeSymbols: true,
    };

    public isGenerateButtonDisabled: boolean = false;
    public showCopiedNotice: boolean = false;

    public constructor(private clipboard: Clipboard) {}

    public ngOnInit(): void {
        this.updateStrength();
        this.password = this.generatePassword();
    }

    public settingsChangeHandler(): void {
        this.updateStrength();
    }

    public copyButtonClickHandler(): void {
        if (this.showCopiedNotice) return;

        this.clipboard.copy(this.password);

        this.showCopiedNotice = true;
        setTimeout(() => (this.showCopiedNotice = false), 1000);
    }

    public generateButtonClickHandler(): void {
        this.password = this.generatePassword();
    }

    private updateStrength(): void {
        const enabledSettingsIndices = this.generateEnabledSettingsIndices();
        this.isGenerateButtonDisabled = enabledSettingsIndices.length <= 0;
        this.strength = this.generateStrength(enabledSettingsIndices.length);
    }

    private generatePassword(): string {
        const enabledSettingsIndices = this.generateEnabledSettingsIndices();
        if (enabledSettingsIndices.length <= 0) {
            this.isGenerateButtonDisabled = true;
            return 'password :/';
        }

        let password = '';
        for (let i = 0; i < this.characterLength; i++) {
            const settingsIndex = this.generateRandomItem(enabledSettingsIndices);
            password += this.generateRandomCharacter(settingsIndex);
        }

        return password;
    }

    private generateEnabledSettingsIndices(): number[] {
        const enabledSettingsIndices = [];
        if (this.settings.includeLowercaseLetters) enabledSettingsIndices.push(0);
        if (this.settings.includeUppercaseLetters) enabledSettingsIndices.push(1);
        if (this.settings.includeNumbers) enabledSettingsIndices.push(2);
        if (this.settings.includeSymbols) enabledSettingsIndices.push(3);

        return enabledSettingsIndices;
    }

    private generateRandomItem<T>(items: T[]): T {
        const index = this.generateRandomInteger({max: items.length});
        return items[index];
    }

    private generateRandomInteger(options: {min?: number; max?: number}): number {
        const {min = 0, max = 4} = options;
        return Math.floor(Math.random() * (max - min) + min);
    }

    private generateRandomCharacter(settingsIndex: number): string {
        switch (settingsIndex) {
            case 0:
                return this.generateRandomLowercaseLetter();
            case 1:
                return this.generateRandomUppercaseLetter();
            case 2:
                return this.generateRandomNumber();
            case 3:
                return this.generateRandomSymbol();
            default:
                return '';
        }
    }

    private generateRandomLowercaseLetter(): string {
        return String.fromCharCode(this.generateRandomInteger({min: 97, max: 122 + 1}));
    }

    private generateRandomUppercaseLetter(): string {
        return String.fromCharCode(this.generateRandomInteger({min: 65, max: 90 + 1}));
    }

    private generateRandomNumber(): string {
        return String.fromCharCode(this.generateRandomInteger({min: 48, max: 57 + 1}));
    }

    private generateRandomSymbol(): string {
        return this.generateRandomItem([...'!@#$%^&*']);
    }

    private generateStrength(value: number): Strength {
        return {
            value,
            text: this.convertStrengthValueToText(value),
            color: this.convertStrengthValueToColor(value),
        };
    }

    private convertStrengthValueToText(value: number): string {
        switch (value) {
            case 1:
                return 'Weak';
            case 2:
                return 'Medium';
            case 3:
                return 'Strong';
            case 4:
                return 'Perfect';
            default:
                return '';
        }
    }

    private convertStrengthValueToColor(value: number): string {
        switch (value) {
            case 1:
                return 'hsl(0deg 100% 80%)';
            case 2:
                return 'hsl(30deg 100% 80%)';
            case 3:
                return 'hsl(60deg 100% 80%)';
            case 4:
                return 'hsl(130deg 100% 80%)';
            default:
                return '';
        }
    }
}
