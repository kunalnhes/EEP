import { TestBed } from '@angular/core/testing';

import { PlayingGameService } from './playing-game.service';

describe('PlayingGameService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlayingGameService = TestBed.get(PlayingGameService);
    expect(service).toBeTruthy();
  });
});
