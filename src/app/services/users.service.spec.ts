

import { TestBed } from "@angular/core/testing";
import { HttpClientModule } from "@angular/common/http";
import { UsersService } from "./users.service";


describe('UsersService', () => {
    let service: UsersService;

    beforeEach(() => {
        TestBed.configureTestingModule({ imports: [HttpClientModule], });
        service = TestBed.inject(UsersService);
    })

    it("should be created", () => {
        expect(service).toBeTruthy();
    })
})