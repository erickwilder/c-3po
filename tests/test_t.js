import { expect } from 'chai';
import { t, useLocale } from '../src/index';
import { loadLocale } from '../src/loader';

describe('t', () => {
    before(() => {
        loadLocale('en', 'tests/fixtures/test-loader.mo');
        useLocale('en');
    });

    it('should resolve translation', () => {
        expect(t`test`).to.eql('test [translation]');
    });

    it('should resolve translation with expressions', () => {
        expect(t`test ${1} test`).to.eql('test 1 test [translation]');
    });

    it('should use the same str if no translation found', () => {
        expect(t`not found`).to.eql('not found');
    });

    it('should use the same str with expressions if no translation found', () => {
        expect(t`not found ${0}`).to.eql('not found 0');
    });

    it('should use the same str if locale is not found', () => {
        useLocale('unknown');
        expect(t`not found`).to.eql('not found');
        useLocale('en');
    });
    it('should dedent multiline', () => {
        const result = t`multi
        line
        example`;
        expect(result).to.eql('multi\nline\nexample');
    });
    it('should not dedent single line', () => {
        const result = t`     single line`;
        expect(result).to.eql('     single line');
    })
});
