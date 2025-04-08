import { DatePipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { PokemonBorderDirective } from '../../pokemon-border.directive';
import { Pokemon } from '../../pokemon.model';
import { PokemonService } from '../../pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  imports: [PokemonBorderDirective, DatePipe, RouterLink],
  templateUrl: './pokemon-list.component.html',
  styles: `.pokemon-card {cursor: pointer}`,
})
export class PokemonListComponent {
  readonly pokemonService = inject(PokemonService);
  readonly pokemonList = toSignal(this.pokemonService.getPokemonList(), {
    initialValue: [],
  });
  readonly searchTerm = signal('');

  readonly pokemonListFiltered = computed(() => {
    return this.pokemonList().filter((pokemon) =>
      pokemon.name
        .toLowerCase()
        .includes(this.searchTerm().trim().toLowerCase())
    );
  });

  readonly loading = computed(() => this.pokemonList().length === 0);

  size(pokemon: Pokemon) {
    if (pokemon.life <= 15) {
      return 'Petit';
    }
    if (pokemon.life >= 25) {
      return 'Grand';
    }

    return 'Moyen';
  }
}
