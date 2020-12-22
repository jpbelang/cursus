import {defaultFromNetwork} from "../../../main/js/resources/utilities";
import {Expose} from "class-transformer";

describe('in the utilities', () => {

    describe('defaultFromNetwork', () => {

        class SomeThing {
            @Expose()
            name: string
        }

        it('should read a json string but only exposed', () => {

            expect(defaultFromNetwork(`{"name": "Dave", "quad": "left"}`, SomeThing))
                .toEqual({
                    name: "Dave"
                })
        });

        it('should read a plain JS object but only exposed', () => {

            expect(defaultFromNetwork({"name": "Dave", "quad": "left"}, SomeThing))
                .toEqual({
                    name: "Dave"
                })
        });

        it('should fail when reading crap', () => {

            expect(() => defaultFromNetwork("crap", SomeThing))
                .toThrowError()
        });
    });
});