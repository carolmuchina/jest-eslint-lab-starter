const { capitalizeWords, filterActiveUsers, logAction } = require('../index');

describe('capitalizeWords', () => {
    test('capitalizes the first letter of each word', () => {
        expect(capitalizeWords('hello world')).toBe('Hello World');
    });
    test('returns an empty string when input is empty', () => {
        expect(capitalizeWords('')).toBe('');
    });
    test('handles special characters', () => {
        expect(capitalizeWords('hello-world')).toBe('Hello-World');
    });
    test('capitalizes a single word', () => {
        expect(capitalizeWords('hello')).toBe('Hello');
    });
});
describe('filterActiveUsers', () => {
    test('returns only active users', () => {
        const users = [
            {name: 'Carol', isActive: true },
            {name: 'Mukami', isActive: false },
            {name: 'Muchina', isActive: true }
        ];
        expect(filterActiveUsers(users)).toEqual([
            {name: 'Carol', isActive: true },
            {name: 'Muchina', isActive: true }
        ]);
    });
    test('returns an empty array when all users are inactive', () => {
        const users = [
            {name:'Carol', isActive: false },
            {name:'Mukami', isActive: false }
        ];
        expect(filterActiveUsers(users)).toEqual([]);
    });
    test('returns an empty array when given an empty array', () => {
        expect(filterActiveUsers([])).toEqual([]);
    });
});
describe('logAction', () => {
    test('generates the correct log string', () => {
        const result = logAction('login', 'Carol');
        expect(result).toContain('User Carol');
        expect(result).toContain('performed login at ');
        expect(result).toMatch(
            /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
        );
    });
    test('handles empty action and username', () => {
        expect(logAction('', '')).toMatch(
            /^User {2}performed {2}at \d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
        );
    });
    test('handles missing action or username', () => {
        expect(logAction(undefined, 'Carol')).toMatch(
            /^User Carol performed undefined at \d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
        );
        expect(logAction('login', undefined)).toMatch(
            /^User undefined performed login at \d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
        );
    });
});

