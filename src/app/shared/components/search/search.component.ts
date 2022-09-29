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
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
    @Input() placeHolder = 'Search gif ...';

    @Output() updateSearchTerm = new EventEmitter<string>();

    searchTerm = new FormControl<string>('');

    private completed$ = new Subject();

    ngOnInit(): void {
        this.searchTerm.valueChanges.pipe(
            debounceTime(500),
            distinctUntilChanged(),
            takeUntil(this.completed$)
        ).subscribe(newSearchTerm => this.updateSearchTerm.emit(newSearchTerm || ''));
    }

    ngOnDestroy(): void {
        this.completed$.next(true);
        this.completed$.complete();
    }

}
