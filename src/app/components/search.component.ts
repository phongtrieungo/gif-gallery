import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from "rxjs";

@Component({
    standalone: true,
    selector: 'gg-search',
    imports: [ReactiveFormsModule],
    template: `
        <input type="text" name="search-gif" id="search-gif" [placeholder]="placeHolder" [formControl]="searchTerm">
    `,
    styles: [
        `
            input[type=text] {
                border: none;
                padding: 15px;
                cursor: pointer;
                width: 100%;
                margin-bottom: 15px;
                box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
            }
            input[type=text]:focus {
                border: none;
                outline: none;
            }
        `
    ],
})
export class SearchComponent implements OnInit, OnDestroy {
    @Input() placeHolder = 'Search gif ...';

    @Output() updateSearchTerm = new EventEmitter<string>();

    searchTerm = new FormControl<string>('');

    private completed$ = new Subject();

    ngOnInit(): void {
        this.searchTerm.valueChanges.pipe(
            debounceTime(250),
            distinctUntilChanged(),
            takeUntil(this.completed$)
        ).subscribe(newSearchTerm => this.updateSearchTerm.emit(newSearchTerm || ''));
    }

    ngOnDestroy(): void {
        this.completed$.next(true);
        this.completed$.complete();
    }

}
